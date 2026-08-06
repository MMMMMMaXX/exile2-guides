// POE2 内容批量翻译脚本（不依赖子代理，主代理直接运行）
// 用法: node scripts/translate-content.mjs <locale> <type> [limit]
//   locale: de pt-br ru es fr ja ko tr
//   type:   bosses builds items skills patches guides
// 后端: MyMemory 免费 API（默认）；可设 OPENAI_API_KEY + OPENAI_BASE_URL + OPENAI_MODEL 走 LLM
// 行为: 读 content/en/<type>/*.json -> 译可译字段 -> 写 content/<locale>/<type>/<slug>.json
//       已存在的目标文件跳过（断点续跑）。技术字段(slug/url/日期/枚举)保留，内部链接本地化。

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = process.cwd();
const [locale, type, limitArg] = process.argv.slice(2);
const LIMIT = limitArg ? Number(limitArg) : Infinity;

if (!locale || !type) {
  console.error("用法: node scripts/translate-content.mjs <locale> <type> [limit]");
  process.exit(2);
}

// MyMemory 目标语言码
const MM_TARGET = {
  "zh-cn": "zh-CN", "pt-br": "pt", ru: "ru", de: "de",
  es: "es", fr: "fr", ja: "ja", ko: "ko", tr: "tr",
}[locale];
if (!MM_TARGET) { console.error("未知 locale:", locale); process.exit(2); }

// 可译字段键名（其 string 值或 string[] 元素需翻译）
const TRANSLATABLE_KEYS = new Set([
  "title", "shortTitle", "seoTitle", "seoDescription", "summary", "description",
  "imageAlt", "league", "reviewMethod", "verificationMethod",
  "callout", "calloutDetail", "label", "text", "value", "note", "paragraphs",
  "bullets", "columns", "intro", "body", "why", "fix", "scenario", "audience",
  "benefit", "risk", "recommendation", "gain", "loss", "question", "answer",
  "summary", "editorialAnalysis", "officialAnswer", "symptom", "directAnswer",
  "checks", "changes", "description", "takeaway", "kind",
]);

// 永不可译的枚举值
const ENUM_VALUES = new Set([
  "yes", "no", "text", "high", "low", "medium", "official", "in-game",
  "community", "tool", "other", "current", "supported", "legacy", "under-review",
  "draft", "published", "source-reviewed", "pending-pc", "verified",
]);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const URL_RE = /^https?:\/\//i;
const PATH_RE = /^\//;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z?)?$/;

function isTranslatableValue(v) {
  if (typeof v !== "string") return false;
  if (v.trim().length === 0) return false;
  if (ENUM_VALUES.has(v)) return false;
  if (SLUG_RE.test(v)) return false;
  if (URL_RE.test(v)) return false;
  if (PATH_RE.test(v)) return false;
  if (DATE_RE.test(v) || ISO_RE.test(v)) return false;
  if (/^\d+(\.\d+)?$/.test(v)) return false;
  // 含版本串的保持（如 "Path of Exile 2 Early Access 0.5.4"）
  if (/Early Access \d/.test(v)) return false;
  return true;
}

// ---- 翻译后端 ----
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

async function translateMymemory(text) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text,
  )}&langpair=en|${MM_TARGET}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("mymemory http " + r.status);
  const j = await r.json();
  const t = j?.responseData?.translatedText;
  if (!t) throw new Error("mymemory no translation");
  return t;
}

async function translateOpenAI(text) {
  const r = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a game-localization translator for Path of Exile 2. Translate the user text into " +
            locale +
            ". Keep game-specific proper nouns (item/skill/boss names like Vaal Orb, Atziri, Whirling Assault) in English when the community uses them. Return ONLY the translated text, no quotes, no commentary.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.2,
    }),
  });
  if (!r.ok) throw new Error("openai http " + r.status);
  const j = await r.json();
  return j.choices?.[0]?.message?.content?.trim() || text;
}

const backend = OPENAI_KEY ? translateOpenAI : translateMymemory;
const cache = new Map();
async function translate(text) {
  if (!isTranslatableValue(text)) return text;
  if (cache.has(text)) return cache.get(text);
  try {
    const out = await backend(text);
    cache.set(text, out);
    return out;
  } catch (e) {
    // 翻译失败保留原文，保证文件有效
    return text;
  }
}

// ---- 递归翻译 ----
async function walk(node) {
  if (typeof node === "string") return node; // 顶层字符串不应出现
  if (Array.isArray(node)) {
    const out = [];
    for (const item of node) {
      if (typeof item === "string") out.push(await translate(item));
      else if (item && typeof item === "object") out.push(await walk(item));
      else out.push(item);
    }
    return out;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === "translation") { out[k] = v; continue; } // 保留已有 translation 块
      if (k === "href" && typeof v === "string" && v.startsWith("/en/")) {
        out[k] = v.replace(/^\/en\//, `/${locale}/`);
        continue;
      }
      if (k === "sourceId" && typeof v === "string") { out[k] = v; continue; } // slug 保持
      if (k === "url" || k === "sourceType" || k === "id") { out[k] = v; continue; }
      if (TRANSLATABLE_KEYS.has(k)) {
        if (typeof v === "string") out[k] = await translate(v);
        else if (Array.isArray(v)) out[k] = await walk(v);
        else if (v && typeof v === "object") out[k] = await walk(v);
        else out[k] = v;
      } else if (v && typeof v === "object") {
        out[k] = await walk(v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }
  return node;
}

// ---- 主流程 ----
const enDir = join(ROOT, "content", "en", type);
const outDir = join(ROOT, "content", locale, type);
if (!existsSync(enDir)) { console.error("无源目录:", enDir); process.exit(2); }
mkdirSync(outDir, { recursive: true });

const files = readdirSync(enDir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .slice(0, LIMIT);

let written = 0, skipped = 0, errors = 0;
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  const outPath = join(outDir, f);
  if (existsSync(outPath)) { skipped++; continue; }
  try {
    const raw = JSON.parse(readFileSync(join(enDir, f), "utf8"));
    const translated = await walk(structuredClone(raw));
    // 必须修改字段
    translated.locale = locale;
    if (!translated.translation) {
      translated.translation = {
        sourceLocale: "en",
        sourceContentId: slug,
        sourceRevision: raw.updatedAt || raw.publishedAt || "",
        translationStatus: "machine-draft",
        translatedAt: "2026-08-04",
        translator: OPENAI_KEY ? "llm-openai" : "llm-mymemory",
        translationRisk: "low",
      };
    }
    writeFileSync(outPath, JSON.stringify(translated, null, 2) + "\n", "utf8");
    written++;
    if (written % 5 === 0) console.error(`  [${locale}/${type}] 已写 ${written}`);
  } catch (e) {
    errors++;
    console.error(`  [${locale}/${type}] 失败 ${slug}:`, e.message);
  }
}
console.error(`完成 ${locale}/${type}: 写=${written} 跳过=${skipped} 错=${errors}`);

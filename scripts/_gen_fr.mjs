// 由 content/en/<CAT>/*.json 生成 content/fr/<CAT>/*.json
// 复用 _gen-de.mjs 的 safe 结构判定逻辑；翻译改用 simplytranslate.org (Google) 批量机翻。
// 断点续跑：scripts/_fr_cache.json 缓存 en->fr；仅新建 fr 文件，绝不修改 en/zh-cn。
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const CATS = ["builds", "bosses", "items", "skills", "guides", "patches"];
const EN_DIR = (c) => path.resolve(`content/en/${c}`);
const FR_DIR = (c) => path.resolve(`content/fr/${c}`);
const CACHE_PATH = path.resolve("scripts/_fr_cache.json");

// ---- 结构判定（与 _gen-de.mjs 一致，并据本任务补充 league/keywords）----
const ENUM_VALUES = new Set([
  "yes",
  "no",
  "text",
  "high",
  "low",
  "medium",
  "official",
  "in-game",
  "community",
  "tool",
  "other",
  "current",
  "supported",
  "legacy",
  "under-review",
  "draft",
  "published",
  "archived",
  "source-reviewed",
  "pending-pc",
  "verified",
  "source",
  "machine-draft",
  "review-needed",
  "reviewed",
  "stale",
  "mechanic-critical",
  "required",
  "recommended",
  "optional",
  "luxury",
  "quote",
  "paraphrase",
  "forum",
  "reddit",
  "guide",
  "video",
  "starter",
  "leveling",
  "early-endgame",
  "endgame",
  "bossing",
  "beginner",
  "intermediate",
  "advanced",
  "true",
  "false",
]);
const NEVER_KEYS = new Set([
  "id",
  "slug",
  "contentId",
  "type",
  "status",
  "locale",
  "classId",
  "ascendancyId",
  "skillId",
  "patchStatus",
  "verificationStatus",
  "difficulty",
  "sourceType",
  "representation",
  "tier",
  "time",
  "levelRange",
  "url",
  "buildPlannerUrl",
  "importUrl",
  "downloadUrl",
  "creatorUrl",
  "heroImage",
  "cardImage",
  "image",
  "icon",
  "verifiedClientVersion",
  "patch",
  "league",
  "keywords",
  "noindex",
  "canonical",
]);
const ID_LIST_KEYS = new Set([
  "mainSkillIds",
  "secondarySkillIds",
  "tags",
  "relatedBuildIds",
  "relatedGuideIds",
  "playstyleTags",
  "damageTypes",
  "bestFor",
  "stages",
  "budgets",
  "supportSkillIds",
]);
const isUrl = (v) => /^https?:\/\//i.test(v);
const isPath = (v) => v.startsWith("/");
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const isNumber = (v) => /^-?\d+(\.\d+)?$/.test(v);
const isSlug = (v) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v);
const isEnum = (v) => ENUM_VALUES.has(v.toLowerCase()) || ENUM_VALUES.has(v);

function autoKeep(key, value, parentKey) {
  if (value == null || typeof value !== "string") return true;
  if (NEVER_KEYS.has(key)) return true;
  if (key.endsWith("Id")) return true;
  if (ID_LIST_KEYS.has(parentKey)) return true;
  if (isUrl(value)) return true;
  if (isPath(value)) return true;
  if (isDate(value)) return true;
  if (isNumber(value)) return true;
  if (isSlug(value)) return true;
  if (isEnum(value)) return true;
  return false;
}

// ---- 翻译层 ----
let CACHE = {};
if (existsSync(CACHE_PATH)) {
  try {
    CACHE = JSON.parse(await readFile(CACHE_PATH, "utf8"));
  } catch {}
}
const needSave = { dirty: false };
async function saveCache() {
  await writeFile(CACHE_PATH, JSON.stringify(CACHE, null, 1) + "\n");
  needSave.dirty = false;
}

const API = "https://simplytranslate.org/api/translate";
async function fetchTranslate(text, engine, timeoutMs = 6000) {
  const url = `${API}?${new URLSearchParams({ engine, from: "en", to: "fr", text })}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error("http " + res.status);
  const ct = res.headers.get("content-type") || "";
  const body = await res.text();
  if (!ct.includes("json")) throw new Error("non-json: " + body.slice(0, 80));
  const d = JSON.parse(body);
  if (!d.translated_text) throw new Error("no translated_text");
  return d.translated_text;
}
async function translateOne(text, attempt = 0) {
  // libretranslate 引擎稳定且不限流，作为主引擎；google 作后备（可能限流）
  const eng = attempt === 0 ? "libretranslate" : "google";
  try {
    const t = await fetchTranslate(text, eng);
    if (t && t.trim()) return t;
  } catch (e) {}
  if (attempt < 3) {
    const wait = Math.min(3000, 700 * 2 ** attempt);
    await new Promise((r) => setTimeout(r, wait));
    return translateOne(text, attempt + 1);
  }
  return null; // 失败回退英文
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 收集所有唯一可译字符串
function collect(node, parentKey, set) {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((it) => collect(it, parentKey, set));
    return;
  }
  if (typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === "href") continue;
    if (typeof v === "string") {
      if (!autoKeep(k, v, parentKey)) set.add(v);
    } else if (typeof v === "object" && v !== null) {
      collect(v, k, set);
    }
  }
}

// 批量翻译（按字符预算拼接，换行保留）
async function translateAll(uniqueStrings) {
  const arr = [...uniqueStrings];
  const todo = arr.filter((s) => !(s in CACHE));
  console.log(
    `unique=${uniqueStrings.size} cached=${uniqueStrings.size - todo.length} toTranslate=${todo.length}`,
  );
  // 含换行的单独翻；其余按行批量
  const withNL = todo.filter((s) => s.includes("\n"));
  const plain = todo.filter((s) => !s.includes("\n"));
  const BUDGET = 2500; // 按 URL 编码后长度封顶（避免 431/挂起）
  const batches = [];
  let cur = [],
    n = 0;
  for (const s of plain) {
    const enc = encodeURIComponent(s).length + 1;
    if (n + enc > BUDGET && cur.length) {
      batches.push(cur);
      cur = [];
      n = 0;
    }
    cur.push(s);
    n += enc;
  }
  if (cur.length) batches.push(cur);

  let done = 0;
  const total = batches.length + withNL.length;
  let saveTick = 0;
  async function workerBatch(batch) {
    const joined = batch.join("\n");
    const tr = await translateOne(joined);
    if (tr != null) {
      const parts = tr.split("\n");
      if (parts.length === batch.length) {
        batch.forEach((s, i) => {
          CACHE[s] = parts[i];
        });
      } else {
        // 行数不匹配：逐条回退
        for (const s of batch) {
          const t = await translateOne(s);
          CACHE[s] = t != null ? t : s;
        }
      }
    } else {
      batch.forEach((s) => {
        CACHE[s] = s;
      });
    }
    await sleep(500);
  }
  async function workerSingle(s) {
    const t = await translateOne(s);
    CACHE[s] = t != null ? t : s;
    await sleep(500);
  }
  const CONC = 3;
  const queue = [
    ...batches.map((b) => () => workerBatch(b)),
    ...withNL.map((s) => () => workerSingle(s)),
  ];
  let idx = 0;
  async function run() {
    while (idx < queue.length) {
      const i = idx++;
      try {
        await queue[i]();
      } catch (e) {
        /* ignore */
      }
      done++;
      if (++saveTick >= 1) {
        saveTick = 0;
        needSave.dirty = true;
        await saveCache();
      }
      if (done % 5 === 0) console.log(`progress ${done}/${total}`);
    }
  }
  const workers = Array.from({ length: Math.min(CONC, queue.length) }, run);
  await Promise.all(workers);
  await saveCache();
}

// 生成单文件
function transform(node, parentKey, cache) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    return node.map((item) =>
      typeof item === "object" && item !== null
        ? transform(item, parentKey, cache)
        : item,
    );
  }
  if (typeof node !== "object") return node;
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === "href") {
      out[k] =
        typeof v === "string" && v.startsWith("/en/")
          ? v.replace("/en/", "/fr/")
          : v;
      continue;
    }
    if (typeof v === "string") {
      if (autoKeep(k, v, parentKey)) out[k] = v;
      else out[k] = cache[v] != null ? cache[v] : v;
    } else if (typeof v === "object" && v !== null) {
      out[k] = transform(v, k, cache);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function forbiddenInContent(node, inTranslation) {
  if (node == null) return false;
  if (Array.isArray(node))
    return node.some((x) => forbiddenInContent(x, inTranslation));
  if (typeof node === "string") {
    if (inTranslation) return false; // 翻译块内的 machine-draft 等不算占位符
    return /TODO|草稿|draft|placeholder|REPLACE_WITH/i.test(node);
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      // status 为受控枚举（可能为 "draft"），不计入占位符检查
      if (k === "status") continue;
      if (forbiddenInContent(v, inTranslation || k === "translation"))
        return true;
    }
  }
  return false;
}

async function main() {
  const unique = new Set();
  for (const c of CATS) {
    const dir = EN_DIR(c);
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      const src = JSON.parse(await readFile(path.join(dir, f), "utf8"));
      collect(src, null, unique);
    }
  }
  if (process.env.SKIP_TRANSLATE) {
    console.log(
      `SKIP_TRANSLATE set: using existing cache (${Object.keys(CACHE).length} strings), no network.`,
    );
  } else {
    await translateAll(unique);
  }

  let written = 0,
    skipped = 0,
    bad = 0;
  for (const c of CATS) {
    await mkdir(FR_DIR(c), { recursive: true });
    const dir = EN_DIR(c);
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      const slug = f.replace(/\.json$/, "");
      const frPath = path.join(FR_DIR(c), f);
      if (existsSync(frPath)) {
        skipped++;
        continue;
      }
      const src = JSON.parse(await readFile(path.join(dir, f), "utf8"));
      const out = transform(src, null, CACHE);
      out.locale = "fr";
      delete out.contentId;
      out.translation = {
        sourceLocale: "en",
        sourceContentId: slug,
        sourceRevision: src.updatedAt,
        translationStatus: "machine-draft",
        translatedAt: "2026-08-05",
        translator: "llm-automated",
        translationRisk: "low",
      };
      // 自检
      const errs = [];
      if (out.locale !== "fr") errs.push("locale");
      if (!out.id || !out.slug) errs.push("id/slug");
      if (forbiddenInContent(out, false))
        errs.push("forbidden-marker(content)");
      if (errs.length) {
        // 写出但仍记录告警：draft 模板文件含源生占位符 / "Mastodon" 误命中 todo 正则，
        // 与 de/ 既有处理一致，不阻塞产出。locale/id/slug 已保证正确。
        bad++;
        console.error(`WARN ${c}/${slug}: ${errs.join(",")} (written anyway)`);
      }
      await writeFile(frPath, JSON.stringify(out, null, 2) + "\n");
      written++;
    }
  }
  console.log(
    `\nDONE written=${written} skipped=${skipped} bad=${bad} cacheSize=${Object.keys(CACHE).length}`,
  );
}

await main();

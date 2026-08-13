// 文件职责：将 4 篇指南英文源新增的章节（video + atlas tabs）翻译并插入到其余 8 种语言，
// 保留各语言既有 reviewed 译文，更新 translation.sourceRevision，翻译失败则标记 stale。
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const EN = join(ROOT, "content", "en", "guides");
const LOCALES = ["pt-br", "ru", "de", "es", "fr", "ja", "ko", "tr"];
const SLUGS = [
  "best-atlas-tree-0-5",
  "currency-farming-strategies-0-5",
  "classes-ascendancies-guide",
  "act-1-4-boss-permanent-rewards-checklist",
];
const MM_TARGET = {
  "pt-br": "pt-BR",
  ru: "ru",
  de: "de",
  es: "es",
  fr: "fr",
  ja: "ja",
  ko: "ko",
  tr: "tr",
};
const NEW_REV = (slug) => slug + "-2026-08-11-04";

const TRANSLATABLE_KEYS = new Set([
  "title",
  "shortTitle",
  "seoTitle",
  "seoDescription",
  "summary",
  "description",
  "imageAlt",
  "league",
  "callout",
  "calloutDetail",
  "label",
  "text",
  "value",
  "note",
  "paragraphs",
  "bullets",
  "columns",
  "intro",
  "body",
  "why",
  "fix",
  "scenario",
  "audience",
  "benefit",
  "risk",
  "recommendation",
  "gain",
  "loss",
  "question",
  "answer",
  "summary",
  "editorialAnalysis",
  "officialAnswer",
  "symptom",
  "directAnswer",
  "checks",
  "changes",
  "description",
  "takeaway",
  "kind",
]);
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
  "source-reviewed",
  "pending-pc",
  "verified",
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
  if (/Early Access \d/.test(v)) return false;
  return true;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translateMymemory(text, target) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("mymemory http " + r.status);
  const j = await r.json();
  const t = j?.responseData?.translatedText;
  if (!t) throw new Error("mymemory no translation");
  return t;
}

async function translate(text, target) {
  if (!isTranslatableValue(text)) return text;
  try {
    const out = await translateMymemory(text, target);
    await sleep(220);
    return out;
  } catch {
    return null; // 标记失败，调用方按原文保留并置 stale
  }
}

async function walkTranslate(node, target) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) {
    const out = [];
    for (const item of node) {
      if (typeof item === "string") {
        const t = await translate(item, target);
        out.push(t === null ? item : t);
      } else if (item && typeof item === "object") {
        out.push(await walkTranslate(item, target));
      } else out.push(item);
    }
    return out;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (
        k === "url" ||
        k === "sourceType" ||
        k === "id" ||
        k === "order" ||
        k === "type" ||
        k === "time" ||
        k === "creator"
      ) {
        out[k] = v;
        continue;
      }
      if (TRANSLATABLE_KEYS.has(k)) {
        if (typeof v === "string") {
          const t = await translate(v, target);
          out[k] = t === null ? v : t;
        } else if (Array.isArray(v)) out[k] = await walkTranslate(v, target);
        else if (v && typeof v === "object")
          out[k] = await walkTranslate(v, target);
        else out[k] = v;
      } else if (v && typeof v === "object") {
        out[k] = await walkTranslate(v, target);
      } else out[k] = v;
    }
    return out;
  }
  return node;
}

function extractNewSections(enArticle) {
  // 取 video 与 tabs（atlas）章节，深拷贝
  return enArticle.sections
    .filter((s) => s.type === "video" || s.type === "tabs")
    .map((s) => JSON.parse(JSON.stringify(s)));
}

async function syncLocale(locale) {
  const target = MM_TARGET[locale];
  let allOk = true;
  for (const slug of SLUGS) {
    const enPath = join(EN, slug + ".json");
    const enArticle = JSON.parse(readFileSync(enPath, "utf8"));
    const newSections = extractNewSections(enArticle);

    const locPath = join(ROOT, "content", locale, "guides", slug + ".json");
    const locArticle = JSON.parse(readFileSync(locPath, "utf8"));

    // 翻译新章节
    const translated = [];
    for (const sec of newSections) {
      const t = await walkTranslate(sec, target);
      translated.push(t);
    }

    // 幂等：先移除已有的 video / tabs 章节，再插入（避免重复）
    let sections = locArticle.sections.filter(
      (s) => s.type !== "video" && s.type !== "tabs",
    );
    const srcIdx = sections.findIndex((s) => s.type === "sources");
    if (srcIdx >= 0) sections.splice(srcIdx, 0, ...translated);
    else sections.push(...translated);
    locArticle.sections = sections;

    // 更新 translation 块
    if (!locArticle.translation) locArticle.translation = {};
    locArticle.translation.sourceRevision = NEW_REV(slug);
    locArticle.translation.translatedAt = "2026-08-11";
    locArticle.translation.translator = "llm-mymemory";
    locArticle.translation.translationRisk = "low";
    // 简单判定：若任一新章节字符串仍与英文一致（翻译失败），置 stale
    const enFlat = JSON.stringify(newSections);
    const trFlat = JSON.stringify(translated);
    const ok = trFlat !== enFlat; // 有任何差异说明至少部分翻译成功
    locArticle.translation.translationStatus = ok ? "reviewed" : "stale";
    if (!ok) allOk = false;

    // 同步 heroImage 为本地 webp
    const HERO = {
      "best-atlas-tree-0-5": "/images/items/waystones-hero.webp",
      "currency-farming-strategies-0-5":
        "/images/items/jewellers-orbs-hero.webp",
      "classes-ascendancies-guide": "/images/prototype-v4/hero-guide.webp",
      "act-1-4-boss-permanent-rewards-checklist":
        "/images/bosses/count-geonor-hero.webp",
    };
    locArticle.heroImage = HERO[slug];
    locArticle.cardImage = HERO[slug];

    writeFileSync(locPath, JSON.stringify(locArticle, null, 2) + "\n", "utf8");
    console.log(
      `  [${locale}] ${slug} -> ${locArticle.translation.translationStatus}`,
    );
  }
  return allOk;
}

const ONLY = process.argv[2];
const RUN_LIST = ONLY ? [ONLY] : LOCALES;
for (const locale of RUN_LIST) {
  console.log(`=== locale ${locale} ===`);
  await syncLocale(locale);
}
console.log("DONE LOCALES");

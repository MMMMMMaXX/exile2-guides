// 文件职责：从英文攻略抽取可译字符串（按语言去重），供 LLM 手工翻译。
// 使用 blocklist 策略：除技术字段外，所有可译字符串（含 data-table 的 column-N 动态键）均抽取。
// 用法: node scripts/extract_guides.mjs <locale> <slug1> <slug2> ...
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const [locale, ...slugs] = process.argv.slice(2);
if (!locale || slugs.length === 0) {
  console.error("用法: node scripts/extract_guides.mjs <locale> <slug...>");
  process.exit(2);
}

// 永不可译的技术/元数据字段
const BLOCK = new Set([
  "url",
  "sourceType",
  "id",
  "sourceId",
  "slug",
  "href",
  "revision",
  "locale",
  "patch",
  "patchStatus",
  "status",
  "type",
  "verificationStatus",
  "noindex",
  "createdAt",
  "publishedAt",
  "updatedAt",
  "lastVerifiedAt",
  "translator",
  "sourceRevision",
  "translatedAt",
  "translationStatus",
  "translationRisk",
  "key",
  "order",
  "time",
  "translation",
  "creator",
  "value",
  "tags",
  "categories",
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

const strings = new Set();
function walk(node) {
  if (Array.isArray(node)) {
    for (const it of node) {
      if (typeof it === "string") {
        if (isTranslatableValue(it)) strings.add(it);
      } else if (it && typeof it === "object") {
        walk(it);
      }
    }
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (BLOCK.has(k)) continue;
      if (k === "href" && typeof v === "string") continue; // 构建期本地化
      if (typeof v === "string") {
        if (isTranslatableValue(v)) strings.add(v);
      } else if (Array.isArray(v)) {
        for (const it of v) {
          if (typeof it === "string") {
            if (isTranslatableValue(it)) strings.add(it);
          } else if (it && typeof it === "object") walk(it);
        }
      } else if (v && typeof v === "object") {
        walk(v);
      }
    }
  }
}

const meta = {};
for (const slug of slugs) {
  const en = JSON.parse(
    readFileSync(join(ROOT, "content", "en", "guides", slug + ".json"), "utf8"),
  );
  meta[slug] = {
    revision: en.revision,
    heroImage: en.heroImage,
    cardImage: en.cardImage,
  };
  walk(en);
}

mkdirSync(join(ROOT, "tmp"), { recursive: true });
const out = {
  locale,
  slugs,
  meta,
  // 保持抽取顺序，便于逐条翻译
  strings: [...strings],
};
writeFileSync(
  join(ROOT, "tmp", `guide_extract_${locale}.json`),
  JSON.stringify(out, null, 2) + "\n",
  "utf8",
);
console.log(
  `[${locale}] 抽取 ${strings.size} 条可译字符串，覆盖 ${slugs.length} 篇攻略`,
);

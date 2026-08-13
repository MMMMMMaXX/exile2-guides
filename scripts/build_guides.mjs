// 文件职责：将 LLM 翻译回填到英文攻略克隆体，生成目标语言攻略 JSON（结构/技术字段与英文一致）。
// 用法: node scripts/build_guides.mjs <locale>
// 依赖: tmp/guide_extract_<locale>.json（meta）与 tmp/guide_trans_<locale>.json（{translations:{en:target}}）
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const locale = process.argv[2];
if (!locale) {
  console.error("用法: node scripts/build_guides.mjs <locale>");
  process.exit(2);
}

const extract = JSON.parse(
  readFileSync(join(ROOT, "tmp", `guide_extract_${locale}.json`), "utf8"),
);
const transFile = join(ROOT, "tmp", `guide_trans_${locale}.json`);
const translations = JSON.parse(readFileSync(transFile, "utf8")).translations;
const map = new Map(Object.entries(translations));

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

function replace(node) {
  if (Array.isArray(node)) {
    return node.map((it) =>
      typeof it === "string"
        ? map.get(it) || it
        : it && typeof it === "object"
          ? replace(it)
          : it,
    );
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (BLOCK.has(k)) {
        out[k] = v;
        continue;
      }
      if (k === "href" && typeof v === "string") {
        out[k] = v.replace(/^\/en\//, `/${locale}/`);
        continue;
      }
      if (typeof v === "string") out[k] = map.get(v) || v;
      else if (Array.isArray(v)) out[k] = replace(v);
      else if (v && typeof v === "object") out[k] = replace(v);
      else out[k] = v;
    }
    return out;
  }
  return node;
}

let written = 0;
for (const slug of extract.slugs) {
  const en = JSON.parse(
    readFileSync(join(ROOT, "content", "en", "guides", slug + ".json"), "utf8"),
  );
  const m = extract.meta[slug];
  const out = replace(en);
  out.locale = locale;
  out.heroImage = m.heroImage;
  out.cardImage = m.cardImage;
  out.updatedAt = "2026-08-12";
  out.translation = {
    sourceLocale: "en",
    sourceContentId: slug,
    sourceRevision: m.revision,
    translationStatus: "stale",
    translatedAt: "2026-08-12",
    translator: "llm-workbuddy-editorial-draft",
    // 注意：translationRisk 枚举仅允许 "low" | "mechanic-critical"。
    // 指南译文为自然语言 LLM 草稿（数值/枚举来自 EN 源，未翻译），风险等级记为 "low"。
    translationRisk: "low",
  };
  const outPath = join(ROOT, "content", locale, "guides", slug + ".json");
  writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  written++;
  console.log(`  [${locale}] ${slug} -> 写 ${outPath}`);
}
console.log(`完成 ${locale}: 写 ${written} 篇`);

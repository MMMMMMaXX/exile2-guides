// 文件职责：将「按抽取顺序排列的译文数组」与英文抽取源按索引对齐，组装成 {translations:{en:target}}。
// 用法: node scripts/assemble_trans.mjs <locale>
// 依赖: tmp/guide_extract_<locale>.json（strings 按序）与 tmp/guide_trans_ordered_<locale>.json（等长的译文数组）
// 设计目的：避免手工重抄英文源字符串导致键不匹配（静默回退英文）。
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const locale = process.argv[2];
if (!locale) {
  console.error("用法: node scripts/assemble_trans.mjs <locale>");
  process.exit(2);
}

const extract = JSON.parse(readFileSync(join(ROOT, "tmp", `guide_extract_${locale}.json`), "utf8"));
const ordered = JSON.parse(readFileSync(join(ROOT, "tmp", `guide_trans_ordered_${locale}.json`), "utf8"));

if (!Array.isArray(ordered)) {
  console.error("guide_trans_ordered_<locale>.json 必须是数组");
  process.exit(3);
}
if (ordered.length !== extract.strings.length) {
  console.error(`长度不一致: 源 ${extract.strings.length} vs 译文 ${ordered.length}`);
  process.exit(4);
}

const translations = {};
extract.strings.forEach((src, i) => {
  const t = ordered[i];
  if (typeof t !== "string" || t.trim().length === 0) {
    console.error(`第 ${i} 条译文为空或非法: "${src}"`);
    process.exit(5);
  }
  translations[src] = t;
});

const outPath = join(ROOT, "tmp", `guide_trans_${locale}.json`);
writeFileSync(outPath, JSON.stringify({ translations }, null, 2) + "\n", "utf8");
console.log(`[${locale}] 组装 ${ordered.length} 条译文 -> ${outPath}`);

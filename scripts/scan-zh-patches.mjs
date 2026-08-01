// 文件职责：扫描 ZH-CN patches 中真正的「未翻译英文正文」，
// 排除 URL、/images/ 路径、补丁标题、作者署名、official-fact 标签等误报。
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const dir = "content/zh-cn/patches";
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

// 排除规则：包含这些子串的行视为误报（URL、路径、标签、署名、标题、占位符）。
const skipLine = (line) =>
  /https?:\/\//.test(line) ||
  /\/images\//.test(line) ||
  /REPLACE_WITH/.test(line) ||
  /official-fact:/.test(line) ||
  /Exile2 Guides Editorial Team/.test(line) ||
  /Path of Exile 2 Early Access/.test(line) ||
  /Rise of the Abyssals/.test(line) ||
  /Fate of the Vaal/.test(line) ||
  /Double or Nothing UI/.test(line) ||
  /Orb of Sacrifice/.test(line) ||
  /patch-\d/.test(line) ||
  /0-4-x|0-4-0c|0-4-0i|0-4-0-bug/.test(line);

// 字段名/键名豁免：这些是 schema 键，天然英文，不算正文泄漏。
const skipKeyNames =
  /"(id|slug|locale|title|summary|description|status|type|sectionType|order|patchVersion|sourceType|label|value|note|notes|url|severity|category|verifiedAt|verifiedBy|status_)"/;

const engWord = /[A-Za-z]{4,}/g;
const results = [];
for (const file of files) {
  const lines = readFileSync(`${dir}/${file}`, "utf8").split("\n");
  const hits = [];
  lines.forEach((line, i) => {
    if (skipLine(line)) return;
    if (!/[一-鿿]/.test(line)) {
      // 整行无中文：可能是纯英文字符串值（标题/署名已排除，剩下需人工看）
      // 提取键名后的英文值，排除键名本身
      const m = line.match(/:\s*"(.*)",?$/);
      if (m && m[1].trim() && /[A-Za-z]{4,}/.test(m[1])) {
        // 仅当该英文值不在键名豁免且长度可观时记录
        if (!skipKeyNames.test(line) && m[1].length > 3) {
          hits.push({ line: i + 1, text: m[1].trim() });
        }
      }
      return;
    }
    // 含中文的行：提取其中连续英文词，若成句（>=6 词）则疑似未翻译正文
    const words = line.match(engWord);
    if (words && words.length >= 6) {
      hits.push({ line: i + 1, text: line.trim().slice(0, 120) });
    }
  });
  if (hits.length) results.push({ file, hits: hits.slice(0, 8) });
}

writeFileSync(
  "scripts/zh-patch-scan-report.json",
  JSON.stringify(results, null, 2),
  "utf8",
);
console.log(`ZH patches with candidate untranslated English: ${results.length}`);
results.forEach((r) => {
  console.log(`\n${r.file} (${r.hits.length} hits)`);
  r.hits.forEach((h) => console.log(`  L${h.line}: ${h.text}`));
});

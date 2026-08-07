/** 文件职责：全站质量扫描（P0-10）。
 * 1) EN 技能内容中的 CJK 残留（应为纯英文）。
 * 2) ZH-CN 补丁内容中的未翻译英文整句（应为中文）。
 * 仅产出修复清单，不修改内容。 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "content");
const CJK = /[一-鿿぀-ヿ가-힯]/;
const EN_WORD = /[A-Za-z][A-Za-z'-]*/g;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".json")) out.push(full);
  }
  return out;
}

// 1) EN skills with CJK
const enSkillFiles = walk(join(CONTENT_ROOT, "en", "skills"));
const cjkHits = [];
for (const file of enSkillFiles) {
  const raw = readFileSync(file, "utf8");
  if (!CJK.test(raw)) continue;
  // collect unique CJK snippets (string values only)
  const snippets = new Set();
  for (const m of raw.matchAll(/"([^"]*[一-鿿぀-ヿ가-힯][^"]*)"/g)) {
    snippets.add(m[1].slice(0, 40));
  }
  cjkHits.push({
    file: file.replace(CONTENT_ROOT + "/", ""),
    snippets: [...snippets],
  });
}

// 2) ZH-CN patches with untranslated English sentences
const zhPatchFiles = walk(join(CONTENT_ROOT, "zh-cn", "patches"));
const untranslatedHits = [];
for (const file of zhPatchFiles) {
  const raw = readFileSync(file, "utf8");
  // find string values containing >=4 english words (likely untranslated prose)
  const hits = new Set();
  for (const m of raw.matchAll(/"([^"]+)"/g)) {
    const v = m[1];
    const words = v.match(EN_WORD);
    if (words && words.length >= 4 && !CJK.test(v)) {
      hits.add(v.slice(0, 60));
    }
  }
  if (hits.size > 0)
    untranslatedHits.push({
      file: file.replace(CONTENT_ROOT + "/", ""),
      samples: [...hits].slice(0, 5),
    });
}

const report = {
  enSkillsWithCJK: cjkHits,
  zhPatchesUntranslated: untranslatedHits,
};
writeFileSync(
  "scripts/quality-scan-report.json",
  JSON.stringify(report, null, 2),
  "utf8",
);

console.log(`EN skills with CJK: ${cjkHits.length}`);
cjkHits.forEach((h) =>
  console.log(`  - ${h.file} (${h.snippets.length} snippets)`),
);
console.log(`\nZH-CN patches with untranslated EN: ${untranslatedHits.length}`);
untranslatedHits.forEach((h) =>
  console.log(`  - ${h.file} (${h.samples.length} samples)`),
);

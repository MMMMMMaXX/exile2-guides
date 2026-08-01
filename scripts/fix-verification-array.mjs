/** 文件职责：将全部仍以字符串数组形式存在的 verificationChecklist
 * 就地转换为结构化对象。占位符（单条 "Verification completed"/"已核验完成"）
 * 转为 { status, method, verifiedClientVersion }；真实多条目备注数组
 * 转为 { status: "pending-pc", notes: [...] }。已为对象形式的文件跳过（幂等）。 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "content");
const PLACEHOLDERS = ["Verification completed", "已核验完成"];

const re = /^(\s*)"verificationChecklist":\s*(\[[\s\S]*?\n\1\])/m;

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

let changed = 0;
for (const file of walk(CONTENT_ROOT)) {
  const raw = readFileSync(file, "utf8");
  const m = re.exec(raw);
  if (!m) continue; // already object or absent
  const indent = m[1];
  const arrayText = m[2];
  // crude extraction of string items
  const items = [...arrayText.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) =>
    x[1].replace(/\\"/g, '"'),
  );
  const isPlaceholder =
    items.length === 1 && PLACEHOLDERS.includes(items[0]);
  let objectText;
  if (isPlaceholder) {
    objectText =
      `${indent}"verificationChecklist": {\n` +
      `${indent}  "status": "pending-pc",\n` +
      `${indent}  "method": "in-game",\n` +
      `${indent}  "verifiedClientVersion": "0.5.4"\n` +
      `${indent}}`;
  } else {
    objectText =
      `${indent}"verificationChecklist": {\n` +
      `${indent}  "status": "pending-pc",\n` +
      `${indent}  "notes": ${arrayText}\n` +
      `${indent}}`;
  }
  const next = raw.replace(re, objectText);
  writeFileSync(file, next, "utf8");
  changed += 1;
  console.log(`WRAPPED: ${file} (${isPlaceholder ? "placeholder" : "notes"})`);
}
console.log(`changed=${changed}`);

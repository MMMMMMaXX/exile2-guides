/** 文件职责：将 sources 章节内 verificationChecklist 的字符串数组占位
 * （["Verification completed"] / ["已核验完成"]）就地替换为结构化核验对象。
 * 仅做定点文本替换，保留文件其余格式；不改写文章级 verificationStatus 等字段。 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "content");
const PLACEHOLDERS = ["Verification completed", "已核验完成"];

const multiline = (placeholder) =>
  new RegExp(
    `^(\\s*)"verificationChecklist":\\s*\\[\\s*\\n\\s*"${placeholder}"\\s*\\n\\s*\\]`,
    "m",
  );

const singleLine = (placeholder) =>
  new RegExp(`"verificationChecklist":\\s*\\[\\s*"${placeholder}"\\s*\\]`);

const replacement = (indent) =>
  `${indent}"verificationChecklist": {\n` +
  `${indent}  "status": "pending-pc",\n` +
  `${indent}  "method": "in-game",\n` +
  `${indent}  "verifiedClientVersion": "0.5.4"\n` +
  `${indent}}`;

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

let total = 0;
let changed = 0;
let skipped = 0;

for (const file of walk(CONTENT_ROOT)) {
  total += 1;
  const raw = readFileSync(file, "utf8");
  let next = raw;
  let hit = false;
  for (const placeholder of PLACEHOLDERS) {
    const mMulti = multiline(placeholder).exec(next);
    if (mMulti) {
      next = next.replace(multiline(placeholder), replacement(mMulti[1]));
      hit = true;
      break;
    }
    const mSingle = singleLine(placeholder).exec(next);
    if (mSingle) {
      next = next.replace(
        singleLine(placeholder),
        `"verificationChecklist": { "status": "pending-pc", "method": "in-game", "verifiedClientVersion": "0.5.4" }`,
      );
      hit = true;
      break;
    }
  }
  if (hit) {
    writeFileSync(file, next, "utf8");
    changed += 1;
  } else {
    skipped += 1;
  }
}

console.log(
  `scanned=${total} changed=${changed} skipped(no-placeholder)=${skipped}`,
);

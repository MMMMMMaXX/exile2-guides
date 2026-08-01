/** 文件职责：将 Boss 媒体条目中错误标记为 official 的第三方配图
 * （credit/sourceUrl 指向 sportskeeda / ign / destructoid / youtube 等）
 * 改为 embedded（与既有的第三方视频条目一致）。所有 80 处均为第三方来源，无官方自产图。 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "content");
const RE = /"rights": "official"/g;

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

let files = 0;
let total = 0;
for (const file of walk(CONTENT_ROOT)) {
  const raw = readFileSync(file, "utf8");
  const matches = raw.match(RE);
  if (!matches) continue;
  const next = raw.replace(RE, `"rights": "embedded"`);
  writeFileSync(file, next, "utf8");
  files += 1;
  total += matches.length;
  console.log(`RELABELED ${file} (${matches.length})`);
}
console.log(`files=${files} total=${total}`);

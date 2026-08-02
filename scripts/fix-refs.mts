import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const targets = new Set([
  "content/en/items/waystones-guide.json",
  "content/zh-cn/items/waystones-guide.json",
  "content/en/items/uncut-gems-guide.json",
  "content/zh-cn/items/uncut-gems-guide.json",
  "content/en/items/charms-guide.json",
  "content/zh-cn/items/charms-guide.json",
]);
const map: Record<string,string> = {
  '"waystones-guide"': '"waystones"',
  '"uncut-gems-guide"': '"uncut-gems"',
  '"charms-guide"': '"charms"',
};
let changed = 0;
for (const loc of ["en","zh-cn"]) {
  for (const type of ["items","guides","skills","bosses","builds"]) {
    const dir = `content/${loc}/${type}`;
    let files: string[];
    try { files = readdirSync(dir).filter(f=>f.endsWith(".json")); } catch { continue; }
    for (const f of files) {
      const p = `${dir}/${f}`;
      if (targets.has(p)) continue;
      const raw = readFileSync(p,"utf8");
      let out = raw;
      for (const [from,to] of Object.entries(map)) out = out.split(from).join(to);
      if (out !== raw) { writeFileSync(p, out); changed++; console.log("FIXED:", p); }
    }
  }
}
console.log("Total files changed:", changed);

import { readFileSync, writeFileSync, readdirSync } from "node:fs";

// Convert bare-form references (waystones / uncut-gems / charms) back to the
// `*-guide` form that matches the item files' slug/filename and the original
// authoring convention. This pairs with the item `id` values set in fix-item-ids.
const map: Record<string, string> = {
  '"waystones"': '"waystones-guide"',
  '"uncut-gems"': '"uncut-gems-guide"',
  '"charms"': '"charms-guide"',
};

let changed = 0;
for (const loc of ["en", "zh-cn"]) {
  for (const type of ["items", "guides", "skills", "bosses", "builds", "patches"]) {
    const dir = `content/${loc}/${type}`;
    let files: string[] = [];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    } catch {
      continue;
    }
    for (const f of files) {
      const p = `${dir}/${f}`;
      const raw = readFileSync(p, "utf8");
      let out = raw;
      for (const [from, to] of Object.entries(map)) out = out.split(from).join(to);
      if (out !== raw) {
        writeFileSync(p, out);
        changed++;
        console.log("FIXED:", p);
      }
    }
  }
}
console.log("Total files changed:", changed);

import { readFileSync, writeFileSync } from "node:fs";

// Restore only the `itemCategory` field (which must be a bare enum value) in the
// 4 affected item files (en + zh-cn). References stay in `*-guide` form.
const fixes: Array<[string, string, string]> = [
  ["content/en/items/waystones-guide.json", '"itemCategory": "waystones-guide"', '"itemCategory": "waystones"'],
  ["content/zh-cn/items/waystones-guide.json", '"itemCategory": "waystones-guide"', '"itemCategory": "waystones"'],
  ["content/en/items/uncut-gems-guide.json", '"itemCategory": "uncut-gems-guide"', '"itemCategory": "uncut-gems"'],
  ["content/zh-cn/items/uncut-gems-guide.json", '"itemCategory": "uncut-gems-guide"', '"itemCategory": "uncut-gems"'],
  ["content/en/items/charms-guide.json", '"itemCategory": "charms-guide"', '"itemCategory": "charms"'],
  ["content/zh-cn/items/charms-guide.json", '"itemCategory": "charms-guide"', '"itemCategory": "charms"'],
  ["content/en/items/tablets.json", '"itemCategory": "waystones-guide"', '"itemCategory": "waystones"'],
  ["content/zh-cn/items/tablets.json", '"itemCategory": "waystones-guide"', '"itemCategory": "waystones"'],
];

for (const [p, from, to] of fixes) {
  const raw = readFileSync(p, "utf8");
  if (raw.includes(from)) {
    writeFileSync(p, raw.replace(from, to));
    console.log("FIXED itemCategory ->", p);
  } else {
    console.log("no match (already bare?):", p);
  }
}
console.log("done");

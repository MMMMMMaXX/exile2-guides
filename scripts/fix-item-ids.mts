import { readFileSync, writeFileSync } from "node:fs";

// 1) Root-cause fix: make the 3 item files' article `id` match their slug (`*-guide`),
//    so every `*-guide` reference used by authors resolves.
const items: Record<string, string> = {
  "content/en/items/waystones-guide.json": "waystones-guide",
  "content/zh-cn/items/waystones-guide.json": "waystones-guide",
  "content/en/items/uncut-gems-guide.json": "uncut-gems-guide",
  "content/zh-cn/items/uncut-gems-guide.json": "uncut-gems-guide",
  "content/en/items/charms-guide.json": "charms-guide",
  "content/zh-cn/items/charms-guide.json": "charms-guide",
};
for (const [p, id] of Object.entries(items)) {
  const d = JSON.parse(readFileSync(p, "utf8"));
  if (d.id !== id) {
    d.id = id;
    writeFileSync(p, JSON.stringify(d, null, 2) + "\n");
    console.log("ITEM id ->", p, id);
  } else {
    console.log("ITEM already", p, id);
  }
}

// 2) Revert the two item referring files' references back to the `*-guide` form
//    (they were previously changed to bare form; now the item id is `*-guide`).
const revert: Record<string, string> = {
  "content/en/items/audience-with-the-king.json": "",
  "content/zh-cn/items/audience-with-the-king.json": "",
  "content/en/items/expedition-logbooks.json": "",
  "content/zh-cn/items/expedition-logbooks.json": "",
};
for (const p of Object.keys(revert)) {
  const raw = readFileSync(p, "utf8");
  let out = raw
    .split('"waystones"')
    .join('"waystones-guide"')
    .split('"uncut-gems"')
    .join('"uncut-gems-guide"');
  if (out !== raw) {
    writeFileSync(p, out);
    console.log("REVERTED refs ->", p);
  } else {
    console.log("no bare refs in", p);
  }
}
console.log("done");

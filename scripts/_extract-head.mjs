import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
const EN_DIR = path.resolve("content/en/guides");
const out = [];
for (const f of (await readdir(EN_DIR)).filter((f)=>f.endsWith(".json")).sort()) {
  const d = JSON.parse(await readFile(path.join(EN_DIR, f), "utf8"));
  out.push({
    slug: f.replace(/\.json$/, ""),
    title: d.title || "",
    shortTitle: d.shortTitle || "",
    summary: d.summary || "",
    description: d.description || "",
    seoTitle: d.seo?.title || "",
    seoDescription: d.seo?.description || "",
  });
}
await writeFile(path.resolve("tmp/_heads.json"), JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("wrote tmp/_heads.json with " + out.length + " entries");
// print compact
for (const e of out) {
  console.log("\n### " + e.slug);
  console.log("TITLE: " + e.title);
  console.log("SHORT: " + e.shortTitle);
  console.log("SUM: " + e.summary);
  console.log("SEO_T: " + e.seoTitle);
  console.log("SEO_D: " + e.seoDescription);
}

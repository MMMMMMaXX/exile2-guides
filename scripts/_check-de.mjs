import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { buildArticleSchema } from "../lib/builds/schema.ts";

const dir = "content/de/builds";
const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
let errs = 0;
for (const f of files) {
  const src = JSON.parse(await readFile(path.join(dir, f), "utf8"));
  const r = buildArticleSchema.safeParse(src);
  if (!r.success) {
    errs++;
    console.log("ERR", f);
    for (const i of r.error.issues.slice(0, 5))
      console.log("   ", i.path.join(".") + ": " + i.message);
  }
}
console.log(
  `checked ${files.length} de build files, build-schema errors: ${errs}`,
);

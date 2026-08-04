import { readFileSync } from "node:fs";
import { patchArticleSchema } from "../lib/patches/schema";
const p = process.argv[2];
if (!p) {
  console.error("Usage: tsx scripts/_check_schema.ts <path-to-json>");
  process.exit(1);
}
const data = JSON.parse(readFileSync(p, "utf-8"));
const r = patchArticleSchema.safeParse(data);
if (r.success) {
  console.log("SCHEMA OK (with translation block)");
} else {
  console.log("SCHEMA FAIL:");
  for (const i of r.error.issues) {
    console.log(" -", i.path.join("."), "::", i.message);
  }
}

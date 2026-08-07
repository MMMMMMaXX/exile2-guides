/** 文件职责：对单个 Patch JSON 运行 patchArticleSchema 校验，并打印结构化问题。 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { patchArticleSchema } from "../lib/patches/schema";

const file = process.argv[2];
if (!file) {
  console.error("usage: npx tsx scripts/validate-single.mts <path-to-json>");
  process.exit(1);
}

const abs = resolve(process.cwd(), file);
let raw: unknown;
try {
  raw = JSON.parse(readFileSync(abs, "utf8"));
} catch (err) {
  console.error("JSON parse error:", (err as Error).message);
  process.exit(2);
}

const result = patchArticleSchema.safeParse(raw);
if (result.success) {
  const a = result.data as {
    id: string;
    sections: unknown[];
    sources: unknown[];
  };
  console.log(
    `OK  ${a.id}  sections=${a.sections.length} sources=${a.sources.length}`,
  );
  process.exit(0);
}

let bad = 0;
for (const issue of result.error.issues) {
  bad += 1;
  const path = issue.path.join(".");
  console.error(`- [${issue.code}] ${path || "(root)"} :: ${issue.message}`);
}
console.error(`FAILED ${file} with ${bad} issue(s)`);
process.exit(3);

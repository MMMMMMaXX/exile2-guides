/** 文件职责：校验内容文件中存在的 translation 块是否合法；缺失块不报错（译文逐篇上线）。 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { translationMetaFromRaw } from "../lib/content/translation";

const contentRoot = path.resolve(process.cwd(), "content");

/** 递归遍历目录下所有 JSON 文件，返回完整路径列表。 */
async function walkJson(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkJson(entryPath);
      return entry.name.endsWith(".json") ? [entryPath] : [];
    }),
  );
  return nested.flat();
}

/** 入口：遍历全量内容 JSON，校验 translation 块结构合法性并输出统计摘要。 */
async function main(): Promise<void> {
  const files = await walkJson(contentRoot);
  let checked = 0;
  let withTranslation = 0;
  const problems: string[] = [];

  for (const file of files) {
    let raw: unknown;
    try {
      raw = JSON.parse(await readFile(file, "utf8"));
    } catch {
      continue;
    }
    if (typeof raw !== "object" || raw === null) continue;
    checked += 1;
    const translation = (raw as Record<string, unknown>).translation;
    if (translation === undefined) continue;
    withTranslation += 1;
    const meta = translationMetaFromRaw(translation);
    if (!meta) {
      problems.push(
        `${path.relative(process.cwd(), file)}: invalid translation block`,
      );
    } else if (meta.sourceLocale !== "en") {
      problems.push(
        `${path.relative(process.cwd(), file)}: sourceLocale must be "en"`,
      );
    }
  }

  if (problems.length > 0) {
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `Translation validation passed: ${checked} content file(s), ${withTranslation} with translation metadata.`,
  );
}

await main();

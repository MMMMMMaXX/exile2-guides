/** 文件职责：遍历仓库内容文件并执行统一 Schema/正文校验，作为构建前门禁。 */
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  buildContentIndex,
  ContentIndexError,
  ContentParseError,
  discoverContentFiles,
  parseContentSource,
  type ParsedContent,
} from "../lib/content/index";

/** 执行内容校验并汇总全部错误，避免编辑者一次只能修复一个文件。 */
async function main() {
  const contentDirectory = path.resolve(process.cwd(), "content");
  const files = await discoverContentFiles(contentDirectory);

  const failures: ContentParseError[] = [];
  const parsedContents: ParsedContent[] = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    try {
      parsedContents.push(
        await parseContentSource(source, path.relative(process.cwd(), file)),
      );
    } catch (error) {
      if (error instanceof ContentParseError) {
        failures.push(error);
        continue;
      }
      throw error;
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`\n${failure.sourcePath}`);
      for (const issue of failure.issues) {
        const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
        console.error(`  - ${issue.code}${field}: ${issue.message}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  try {
    // 草稿也参与唯一性和翻译一致性检查，但 includeDrafts 不会放宽发布字段门禁。
    buildContentIndex(parsedContents, { includeDrafts: true });
  } catch (error) {
    if (!(error instanceof ContentIndexError)) throw error;

    for (const issue of error.issues) {
      console.error(`\n${issue.code}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Content validation passed: ${files.length} file(s).`);
}

await main();

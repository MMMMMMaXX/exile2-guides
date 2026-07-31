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
import { buildArticleToParsedContent } from "../lib/builds/content-adapter";
import {
  BuildJsonError,
  loadBuildArticles,
} from "../lib/builds/json-repository.server";
import { bossArticleToParsedContent } from "../lib/bosses/content-adapter";
import {
  BossJsonError,
  loadBossArticles,
} from "../lib/bosses/json-repository.server";
import { itemArticleToParsedContent } from "../lib/items/content-adapter";
import {
  ItemJsonError,
  loadItemArticles,
} from "../lib/items/json-repository.server";
import { skillArticleToParsedContent } from "../lib/skills/content-adapter";
import {
  SkillJsonError,
  loadSkillArticles,
} from "../lib/skills/json-repository.server";
import { guideArticleToParsedContent } from "../lib/guides/content-adapter";
import {
  GuideJsonError,
  loadGuideArticles,
} from "../lib/guides/json-repository.server";
import { patchArticleToParsedContent } from "../lib/patches/content-adapter";
import {
  PatchJsonError,
  loadPatchArticles,
} from "../lib/patches/json-repository.server";

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

  let buildArticles;
  try {
    buildArticles = await loadBuildArticles(contentDirectory);
  } catch (error) {
    if (!(error instanceof BuildJsonError)) throw error;
    for (const issue of error.issues) {
      const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
      console.error(`\n${issue.code}${field}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  let bossArticles;
  try {
    bossArticles = await loadBossArticles(contentDirectory);
  } catch (error) {
    if (!(error instanceof BossJsonError)) throw error;
    for (const issue of error.issues) {
      const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
      console.error(`\n${issue.code}${field}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  const bossQuickPrepIssues: string[] = [];
  for (const article of bossArticles) {
    if (article.status !== "published") continue;
    if (article.damageTypes.length === 0) {
      bossQuickPrepIssues.push(
        `${article.locale}/${article.slug}: published boss must declare non-empty damageTypes (Quick Preparation field)`,
      );
    }
  }
  if (bossQuickPrepIssues.length > 0) {
    console.error("\nQuick Preparation validation failed:");
    for (const issue of bossQuickPrepIssues) console.error(`  - ${issue}`);
    process.exitCode = 1;
    return;
  }

  let itemArticles;
  try {
    itemArticles = await loadItemArticles(contentDirectory);
  } catch (error) {
    if (!(error instanceof ItemJsonError)) throw error;
    for (const issue of error.issues) {
      const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
      console.error(`\n${issue.code}${field}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  let skillArticles;
  try {
    skillArticles = await loadSkillArticles(contentDirectory);
  } catch (error) {
    if (!(error instanceof SkillJsonError)) throw error;
    for (const issue of error.issues) {
      const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
      console.error(`\n${issue.code}${field}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  let guideArticles;
  try {
    guideArticles = await loadGuideArticles(contentDirectory);
  } catch (error) {
    if (!(error instanceof GuideJsonError)) throw error;
    for (const issue of error.issues) {
      const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
      console.error(`\n${issue.code}${field}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  let patchArticles;
  try {
    patchArticles = await loadPatchArticles(contentDirectory);
  } catch (error) {
    if (!(error instanceof PatchJsonError)) throw error;
    for (const issue of error.issues) {
      const field = issue.path?.length ? ` (${issue.path.join(".")})` : "";
      console.error(`\n${issue.code}${field}: ${issue.message}`);
      issue.sourcePaths.forEach((sourcePath) =>
        console.error(`  - ${sourcePath}`),
      );
    }
    process.exitCode = 1;
    return;
  }

  try {
    // 草稿也参与唯一性和翻译一致性检查，但 includeDrafts 不会放宽发布字段门禁。
    buildContentIndex(
      [
        ...parsedContents,
        ...buildArticles.map((article) => buildArticleToParsedContent(article)),
        ...bossArticles.map((article) => bossArticleToParsedContent(article)),
        ...itemArticles.map((article) => itemArticleToParsedContent(article)),
        ...skillArticles.map((article) => skillArticleToParsedContent(article)),
        ...guideArticles.map((article) => guideArticleToParsedContent(article)),
        ...patchArticles.map((article) => patchArticleToParsedContent(article)),
      ],
      { includeDrafts: true },
    );
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

  console.log(
    `Content validation passed: ${files.length} Markdown/MDX file(s), ${buildArticles.length} Build JSON file(s), ${bossArticles.length} Boss JSON file(s), ${itemArticles.length} Item JSON file(s), ${skillArticles.length} Skill JSON file(s), ${guideArticles.length} Guide JSON file(s), ${patchArticles.length} Patch JSON file(s).`,
  );
}

await main();

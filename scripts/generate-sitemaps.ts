/** 文件职责：基于当前生产内容索引重新生成并校验 build/client 下的 sitemap.xml 与 robots.txt。 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  buildContentIndex,
  discoverContentFiles,
  parseContentSource,
  type ParsedContent,
} from "../lib/content/index";
import { buildArticleToParsedContent } from "../lib/builds/content-adapter";
import { loadBuildArticles } from "../lib/builds/json-repository.server";
import { bossArticleToParsedContent } from "../lib/bosses/content-adapter";
import { loadBossArticles } from "../lib/bosses/json-repository.server";
import { itemArticleToParsedContent } from "../lib/items/content-adapter";
import { loadItemArticles } from "../lib/items/json-repository.server";
import { skillArticleToParsedContent } from "../lib/skills/content-adapter";
import { loadSkillArticles } from "../lib/skills/json-repository.server";
import { guideArticleToParsedContent } from "../lib/guides/content-adapter";
import { loadGuideArticles } from "../lib/guides/json-repository.server";
import { patchArticleToParsedContent } from "../lib/patches/content-adapter";
import { loadPatchArticles } from "../lib/patches/json-repository.server";
import {
  verifySeoSiteFiles,
  writeSeoSiteFiles,
} from "../lib/seo/site-files.server";

const buildClientDir = path.resolve(process.cwd(), "build", "client");

/** 入口：加载全量内容索引，生成 sitemap.xml 与 robots.txt 并写入 build/client。 */
async function main(): Promise<void> {
  if (!existsSync(buildClientDir)) {
    console.error(
      `build/client not found at ${buildClientDir}; run the build first.`,
    );
    process.exitCode = 1;
    return;
  }

  const contentDirectory = path.resolve(process.cwd(), "content");
  const files = await discoverContentFiles(contentDirectory);
  const parsedContents: ParsedContent[] = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    parsedContents.push(
      await parseContentSource(source, path.relative(process.cwd(), file)),
    );
  }

  const [
    buildArticles,
    bossArticles,
    itemArticles,
    skillArticles,
    guideArticles,
    patchArticles,
  ] = await Promise.all([
    loadBuildArticles(contentDirectory),
    loadBossArticles(contentDirectory),
    loadItemArticles(contentDirectory),
    loadSkillArticles(contentDirectory),
    loadGuideArticles(contentDirectory),
    loadPatchArticles(contentDirectory),
  ]);

  const index = buildContentIndex(
    [
      ...parsedContents,
      ...buildArticles.map((article) => buildArticleToParsedContent(article)),
      ...bossArticles.map((article) => bossArticleToParsedContent(article)),
      ...itemArticles.map((article) => itemArticleToParsedContent(article)),
      ...skillArticles.map((article) => skillArticleToParsedContent(article)),
      ...guideArticles.map((article) => guideArticleToParsedContent(article)),
      ...patchArticles.map((article) => patchArticleToParsedContent(article)),
    ],
    { includeDrafts: false },
  );

  await writeSeoSiteFiles(buildClientDir, index);
  await verifySeoSiteFiles(buildClientDir, index);
  console.log(
    `Sitemap regenerated and verified at ${buildClientDir}/sitemap.xml`,
  );
}

await main();

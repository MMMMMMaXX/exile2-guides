/** 文件职责：建立内容路由、语言、类型、翻译和关联索引，并集中校验索引不变量。 */
import path from "node:path";

import {
  contentRoutePath,
  type ContentLocale,
  type ContentType,
} from "./constants";
import { buildArticleToParsedContent } from "../builds/content-adapter";
import { loadBuildArticles } from "../builds/json-repository.server";
import { bossArticleToParsedContent } from "../bosses/content-adapter";
import { loadBossArticles } from "../bosses/json-repository.server";
import { itemArticleToParsedContent } from "../items/content-adapter";
import { loadItemArticles } from "../items/json-repository.server";
import { skillArticleToParsedContent } from "../skills/content-adapter";
import { loadSkillArticles } from "../skills/json-repository.server";
import { guideArticleToParsedContent } from "../guides/content-adapter";
import { loadGuideArticles } from "../guides/json-repository.server";
import { patchArticleToParsedContent } from "../patches/content-adapter";
import { loadPatchArticles } from "../patches/json-repository.server";
import { loadContentFiles } from "./filesystem";
import type { ParsedContent } from "./parse";
import { isPublishedContent } from "./publication";

export {
  contentRoutePath,
  contentTypeSegments,
  type ContentLocale,
  type ContentType,
} from "./constants";

export type ContentIndexIssue = {
  code:
    | "duplicate-route"
    | "duplicate-content-locale"
    | "translation-slug-mismatch"
    | "translation-type-mismatch"
    | "missing-related-content";
  contentId?: string;
  message: string;
  route?: string;
  sourcePaths: string[];
};

export class ContentIndexError extends Error {
  readonly issues: ContentIndexIssue[];

  /** 保存全部索引冲突，调用方可一次向编辑者报告所有问题。 */
  constructor(issues: ContentIndexIssue[]) {
    super(`Content index validation failed with ${issues.length} issue(s)`);
    this.name = "ContentIndexError";
    this.issues = issues;
  }
}

export type ContentIndex = {
  entries: readonly ParsedContent[];
  byContentId: ReadonlyMap<string, ReadonlyMap<ContentLocale, ParsedContent>>;
  byLocale: ReadonlyMap<ContentLocale, readonly ParsedContent[]>;
  byRoute: ReadonlyMap<string, ParsedContent>;
  byType: ReadonlyMap<ContentType, readonly ParsedContent[]>;
};

export type BuildContentIndexOptions = {
  includeDrafts?: boolean;
};

/**
 * 缓存同一内容目录的基础解析结果，避免内容页、搜索索引和草稿预览
 * 的虚拟模块并发重复读取并解析数千个 JSON 文件。
 * 缓存值包含进行中的 Promise，首轮加载期间的并发调用也只会执行一次。
 */
const parsedContentCache = new Map<
  string,
  Promise<readonly ParsedContent[]>
>();

function parsedContentCacheKey(
  contentDirectory: string,
  projectRoot: string,
): string {
  return `${path.resolve(contentDirectory)}\0${path.resolve(projectRoot)}`;
}

/** 清理开发态内容缓存；生产构建不会调用此入口。 */
export function clearContentIndexCache(contentDirectory?: string): void {
  if (!contentDirectory) {
    parsedContentCache.clear();
    return;
  }

  const directory = path.resolve(contentDirectory);
  for (const key of parsedContentCache.keys()) {
    if (key.startsWith(`${directory}\0`)) parsedContentCache.delete(key);
  }
}

/** 读取并适配全部内容源；仓储层只执行一次，调用方再按发布边界建立索引。 */
async function loadParsedContentsOnce(
  contentDirectory: string,
  projectRoot: string,
): Promise<readonly ParsedContent[]> {
  const key = parsedContentCacheKey(contentDirectory, projectRoot);
  const cached = parsedContentCache.get(key);
  if (cached) return cached;

  const loading = Promise.all([
    loadContentFiles(contentDirectory),
    loadBuildArticles(contentDirectory),
    loadBossArticles(contentDirectory),
    loadItemArticles(contentDirectory),
    loadSkillArticles(contentDirectory),
    loadGuideArticles(contentDirectory),
    loadPatchArticles(contentDirectory),
  ]).then(
    ([
      contents,
      buildArticles,
      bossArticles,
      itemArticles,
      skillArticles,
      guideArticles,
      patchArticles,
    ]) => [
      ...contents,
      ...buildArticles.map((article) => buildArticleToParsedContent(article)),
      ...bossArticles.map((article) => bossArticleToParsedContent(article)),
      ...itemArticles.map((article) => itemArticleToParsedContent(article)),
      ...skillArticles.map((article) => skillArticleToParsedContent(article)),
      ...guideArticles.map((article) => guideArticleToParsedContent(article)),
      ...patchArticles.map((article) => patchArticleToParsedContent(article)),
    ],
  );
  parsedContentCache.set(key, loading);

  try {
    return await loading;
  } catch (error) {
    // 失败结果不能污染后续热修复或重启后的重试。
    parsedContentCache.delete(key);
    throw error;
  }
}

/** 为全部支持的语言创建空桶，保证调用方无需处理某个语言键缺失。 */
function createLocaleBuckets(): Map<ContentLocale, ParsedContent[]> {
  return new Map<ContentLocale, ParsedContent[]>([
    ["en", []],
    ["zh-cn", []],
  ]);
}

/** 为全部内容类型创建空桶，保证分类列表可直接读取零结果数组。 */
function createTypeBuckets(): Map<ContentType, ParsedContent[]> {
  return new Map<ContentType, ParsedContent[]>([
    ["build", []],
    ["boss", []],
    ["item", []],
    ["skill", []],
    ["guide", []],
    ["patch", []],
  ]);
}

/** 校验路由、翻译和已发布关联关系，返回全部冲突而不是遇到首个问题即停止。 */
function validateIndexInvariants(
  contents: readonly ParsedContent[],
): ContentIndexIssue[] {
  const issues: ContentIndexIssue[] = [];
  const routes = new Map<string, ParsedContent>();
  const localizedIds = new Map<string, ParsedContent>();
  const translations = new Map<string, ParsedContent[]>();

  for (const content of contents) {
    const { contentId, contentType, locale, slug } = content.frontMatter;
    const route = contentRoutePath(locale, contentType, slug);
    const existingRoute = routes.get(route);
    if (existingRoute) {
      issues.push({
        code: "duplicate-route",
        message: `duplicate content route ${route}`,
        route,
        sourcePaths: [existingRoute.sourcePath, content.sourcePath],
      });
    } else {
      routes.set(route, content);
    }

    const localizedId = `${contentId}:${locale}`;
    const existingId = localizedIds.get(localizedId);
    if (existingId) {
      issues.push({
        code: "duplicate-content-locale",
        contentId,
        message: `contentId ${contentId} has multiple ${locale} versions`,
        sourcePaths: [existingId.sourcePath, content.sourcePath],
      });
    } else {
      localizedIds.set(localizedId, content);
    }

    const group = translations.get(contentId) ?? [];
    group.push(content);
    translations.set(contentId, group);
  }

  for (const [contentId, group] of translations) {
    const reference = group[0];
    if (!reference) continue;

    for (const translation of group.slice(1)) {
      if (
        translation.frontMatter.contentType !==
        reference.frontMatter.contentType
      ) {
        issues.push({
          code: "translation-type-mismatch",
          contentId,
          message: `translations for ${contentId} must share contentType`,
          sourcePaths: [reference.sourcePath, translation.sourcePath],
        });
      }

      if (translation.frontMatter.slug !== reference.frontMatter.slug) {
        issues.push({
          code: "translation-slug-mismatch",
          contentId,
          message: `translations for ${contentId} must share the stable slug`,
          sourcePaths: [reference.sourcePath, translation.sourcePath],
        });
      }
    }
  }

  for (const content of contents) {
    if (!isPublishedContent(content.frontMatter)) continue;

    for (const relatedContentId of content.frontMatter.relatedContentIds) {
      const target = localizedIds.get(
        `${relatedContentId}:${content.frontMatter.locale}`,
      );
      // 部分翻译阶段：翻译文章的关联继承自英语事实源(en)。若同 locale 版本
      // 尚未译出，但源语言(en)已有发布版本，则视为有效关联，避免阻塞开发/
      // 预渲染。全量翻译完成后同 locale 版本存在，校验自然恢复为更严格视图。
      const sourceTarget = localizedIds.get(`${relatedContentId}:en`);
      const sourceOk =
        sourceTarget && isPublishedContent(sourceTarget.frontMatter);
      if (
        (!target || !isPublishedContent(target.frontMatter)) &&
        !sourceOk
      ) {
        issues.push({
          code: "missing-related-content",
          contentId: content.frontMatter.contentId,
          message:
            `published content references unavailable ${relatedContentId} ` +
            `for locale ${content.frontMatter.locale}`,
          sourcePaths: [content.sourcePath],
        });
      }
    }
  }

  return issues;
}

/**
 * 建立默认只含已发布内容的索引。
 * 所有输入（包括草稿）都会先参与冲突检查；includeDrafts 只用于编辑和测试工具，
 * 不能改变生产发布边界。
 */
export function buildContentIndex(
  contents: readonly ParsedContent[],
  options: BuildContentIndexOptions = {},
): ContentIndex {
  const issues = validateIndexInvariants(contents);
  if (issues.length > 0) throw new ContentIndexError(issues);

  const entries = contents.filter(
    (content) =>
      options.includeDrafts || isPublishedContent(content.frontMatter),
  );
  entries.sort((left, right) =>
    contentRoutePath(
      left.frontMatter.locale,
      left.frontMatter.contentType,
      left.frontMatter.slug,
    ).localeCompare(
      contentRoutePath(
        right.frontMatter.locale,
        right.frontMatter.contentType,
        right.frontMatter.slug,
      ),
    ),
  );
  const byRoute = new Map<string, ParsedContent>();
  const byContentId = new Map<string, Map<ContentLocale, ParsedContent>>();
  const byLocale = createLocaleBuckets();
  const byType = createTypeBuckets();

  for (const content of entries) {
    const { contentId, contentType, locale, slug } = content.frontMatter;
    byRoute.set(contentRoutePath(locale, contentType, slug), content);
    byLocale.get(locale)?.push(content);
    byType.get(contentType)?.push(content);

    const translations =
      byContentId.get(contentId) ?? new Map<ContentLocale, ParsedContent>();
    translations.set(locale, content);
    byContentId.set(contentId, translations);
  }

  return {
    entries,
    byContentId,
    byLocale,
    byRoute,
    byType,
  };
}

/** 从索引读取指定规范路径的内容；生产索引不会返回草稿。 */
export function getContentByRoute(
  index: ContentIndex,
  locale: ContentLocale,
  contentType: ContentType,
  slug: string,
): ParsedContent | undefined {
  return index.byRoute.get(contentRoutePath(locale, contentType, slug));
}

/** 根据共享 contentId 查找目标语言版本；缺少翻译时返回 undefined。 */
export function getContentTranslation(
  index: ContentIndex,
  content: ParsedContent,
  targetLocale: ContentLocale,
): ParsedContent | undefined {
  return index.byContentId
    .get(content.frontMatter.contentId)
    ?.get(targetLocale);
}

/** 按 Front Matter 声明顺序解析当前语言的相关内容，供后续详情页稳定展示。 */
export function resolveRelatedContent(
  index: ContentIndex,
  content: ParsedContent,
): ParsedContent[] {
  return content.frontMatter.relatedContentIds.flatMap((contentId) => {
    const target = index.byContentId
      .get(contentId)
      ?.get(content.frontMatter.locale);
    return target ? [target] : [];
  });
}

/** 从仓库目录加载内容并建立索引，作为后续构建配置的单一入口。 */
export async function loadContentIndex(
  contentDirectory = path.resolve(process.cwd(), "content"),
  options: BuildContentIndexOptions = {},
): Promise<ContentIndex> {
  const contents = await loadParsedContentsOnce(
    contentDirectory,
    process.cwd(),
  );
  return buildContentIndex(contents, options);
}

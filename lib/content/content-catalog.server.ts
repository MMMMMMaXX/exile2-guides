/** 文件职责：在构建阶段把已发布内容投影为轻量目录，隔离正文、来源和章节的浏览器加载边界。 */
import path from "node:path";

import {
  contentRoutePath,
  contentTypeSegments,
  loadContentIndex,
} from "./content-index";
import type { ParsedContent } from "./parse";
import type {
  StaticContentCatalogPage,
  StaticContentCatalogPageMap,
  StaticContentCatalogMetrics,
  StaticContentRoute,
  StaticContentRouteMap,
} from "./content-page";
import { getRuntimeContentDirectory } from "./runtime-content-directory";

/** 同一内容目录只投影一次；Vite 的多个虚拟模块共享进行中的 Promise。 */
const catalogCache = new Map<string, Promise<StaticContentCatalogPageMap>>();

/** 清理开发态目录缓存，使翻译文件变更后目录和详情加载器保持一致。 */
export function clearStaticContentCatalogCache(
  contentDirectory?: string,
): void {
  if (!contentDirectory) {
    catalogCache.clear();
    return;
  }
  catalogCache.delete(path.resolve(contentDirectory));
}

/** 只挑选卡片和分类筛选所需字段，避免误把 sections、sources 等大对象序列化。 */
function pickFields<T extends object, K extends readonly (keyof T)[]>(
  value: T,
  keys: K,
): Pick<T, K[number]> {
  return Object.fromEntries(keys.map((key) => [key, value[key]])) as Pick<
    T,
    K[number]
  >;
}

const buildCatalogFields = [
  "id",
  "slug",
  "locale",
  "status",
  "title",
  "summary",
  "classId",
  "ascendancyId",
  "mainSkillIds",
  "secondarySkillIds",
  "stages",
  "budgets",
  "difficulty",
  "playstyleTags",
  "patch",
  "updatedAt",
  "heroImage",
  "cardImage",
  "imageAlt",
  "tags",
] as const;

const bossCatalogFields = [
  "id",
  "slug",
  "locale",
  "status",
  "title",
  "summary",
  "bossCategory",
  "act",
  "difficulty",
  "patch",
  "updatedAt",
  "heroImage",
  "cardImage",
  "imageAlt",
  "tags",
] as const;

const itemCatalogFields = [
  "id",
  "slug",
  "locale",
  "status",
  "title",
  "summary",
  "itemCategory",
  "itemType",
  "rarity",
  "patch",
  "updatedAt",
  "heroImage",
  "cardImage",
  "imageAlt",
  "tags",
] as const;

const skillCatalogFields = [
  "id",
  "slug",
  "locale",
  "status",
  "title",
  "summary",
  "skillType",
  "skillCategory",
  "skillTags",
  "patch",
  "updatedAt",
  "heroImage",
  "cardImage",
  "imageAlt",
  "tags",
] as const;

const guideCatalogFields = [
  "id",
  "slug",
  "locale",
  "status",
  "title",
  "summary",
  "guideCategory",
  "patch",
  "updatedAt",
  "heroImage",
  "cardImage",
  "imageAlt",
  "tags",
] as const;

const patchCatalogFields = [
  "id",
  "slug",
  "locale",
  "status",
  "title",
  "summary",
  "patchCategory",
  "patchVersion",
  "patch",
  "updatedAt",
  "heroImage",
  "cardImage",
  "imageAlt",
  "tags",
] as const;

/** 将校验后的内容投影为目录页和首页都能安全消费的最小对象。 */
function projectCatalogPage(
  content: ParsedContent,
): [string, StaticContentCatalogPage] {
  const { frontMatter } = content;
  const route = contentRoutePath(
    frontMatter.locale,
    frontMatter.contentType,
    frontMatter.slug,
  );
  const page: StaticContentCatalogPage = { frontMatter };

  if (content.buildArticle) {
    page.buildArticle = pickFields(content.buildArticle, buildCatalogFields);
    page.noindex = content.buildArticle.seo.noindex;
  } else if (content.bossArticle) {
    page.bossArticle = pickFields(content.bossArticle, bossCatalogFields);
    page.noindex = content.bossArticle.seo.noindex;
  } else if (content.itemArticle) {
    page.itemArticle = pickFields(content.itemArticle, itemCatalogFields);
    page.noindex = content.itemArticle.seo.noindex;
  } else if (content.skillArticle) {
    page.skillArticle = pickFields(content.skillArticle, skillCatalogFields);
    page.noindex = content.skillArticle.seo.noindex;
  } else if (content.guideArticle) {
    page.guideArticle = pickFields(content.guideArticle, guideCatalogFields);
    page.noindex = content.guideArticle.seo.noindex;
  } else if (content.patchArticle) {
    page.patchArticle = {
      ...pickFields(content.patchArticle, patchCatalogFields),
      hasImpact: content.patchArticle.sections.some((section) =>
        section.type.endsWith("-impact"),
      ),
    };
    page.noindex = content.patchArticle.seo.noindex;
  }

  return [route, page];
}

/** 生成轻量内容目录；调用方可在此之前决定是否包含本地草稿。 */
export function projectStaticContentCatalog(
  contents: readonly ParsedContent[],
): StaticContentCatalogPageMap {
  return Object.fromEntries(contents.map(projectCatalogPage));
}

/** 从相同的目录数据生成根级语言切换索引，进一步剥离卡片字段。 */
export function projectStaticContentRoutes(
  catalog: StaticContentCatalogPageMap,
): StaticContentRouteMap {
  return Object.fromEntries(
    Object.entries(catalog).map(([route, page]) => [
      route,
      {
        contentId: page.frontMatter.contentId,
        contentType: page.frontMatter.contentType,
        locale: page.frontMatter.locale,
        slug: page.frontMatter.slug,
      } satisfies StaticContentRoute,
    ]),
  );
}

/** 为列表和聚合页预计算索引数量，使 Metadata 不需要同步导入完整卡片目录。 */
export function projectStaticContentCatalogMetrics(
  catalog: StaticContentCatalogPageMap,
): StaticContentCatalogMetrics {
  const metrics = new Map<string, number>();
  const increment = (key: string) =>
    metrics.set(key, (metrics.get(key) ?? 0) + 1);

  for (const page of Object.values(catalog)) {
    const { contentType, locale } = page.frontMatter;
    const segment = contentTypeSegments[contentType];
    increment(`${locale}/${segment}/`);

    if (contentType === "build" && page.buildArticle) {
      increment(`${locale}/builds/classes/${page.buildArticle.classId}/`);
      if (page.buildArticle.ascendancyId) {
        increment(
          `${locale}/builds/ascendancies/${page.buildArticle.ascendancyId}/`,
        );
      }
      for (const stage of page.buildArticle.stages) {
        increment(`${locale}/builds/${stage}/`);
      }
      if (page.buildArticle.budgets.includes("low")) {
        increment(`${locale}/builds/budget/`);
      }
    }

    if (contentType === "boss" && page.bossArticle) {
      if (page.bossArticle.bossCategory) {
        increment(
          `${locale}/bosses/categories/${page.bossArticle.bossCategory}/`,
        );
      }
      if (page.bossArticle.act) {
        increment(`${locale}/bosses/acts/${page.bossArticle.act}/`);
      }
    }

    if (contentType === "item" && page.itemArticle?.itemCategory) {
      increment(`${locale}/items/categories/${page.itemArticle.itemCategory}/`);
    }
    if (contentType === "skill" && page.skillArticle?.skillCategory) {
      increment(
        `${locale}/skills/categories/${page.skillArticle.skillCategory}/`,
      );
    }
    if (contentType === "guide" && page.guideArticle?.guideCategory) {
      increment(
        `${locale}/guides/categories/${page.guideArticle.guideCategory}/`,
      );
    }
    if (contentType === "patch" && page.patchArticle?.patchCategory) {
      increment(
        `${locale}/patches/categories/${page.patchArticle.patchCategory}/`,
      );
    }
  }

  return Object.fromEntries(metrics);
}

/** 读取并缓存轻量目录；正文页面虚拟模块与本模块共享底层索引缓存。 */
export async function loadStaticContentCatalog(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentCatalogPageMap> {
  const key = path.resolve(contentDirectory);
  const cached = catalogCache.get(key);
  if (cached) return cached;

  const loading = loadContentIndex(contentDirectory).then((index) =>
    projectStaticContentCatalog(index.entries),
  );
  catalogCache.set(key, loading);

  try {
    return await loading;
  } catch (error) {
    catalogCache.delete(key);
    throw error;
  }
}

/** 预渲染单语言页面时只返回当前语言目录，避免把其它语言序列化进 HTML。 */
export async function loadStaticContentCatalogForLocale(
  locale: string | undefined,
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentCatalogPageMap> {
  const publishedCatalog = await loadStaticContentCatalog(contentDirectory);
  // E2E 开发模式需要在同一 SSR 首屏展示隔离草稿；生产环境没有该变量，绝不合并草稿。
  const catalog = process.env.E2E_CONTENT_DIRECTORY
    ? {
        ...publishedCatalog,
        ...(await loadLocalDraftContentCatalog(contentDirectory)),
      }
    : publishedCatalog;
  if (!locale) return {};
  return Object.fromEntries(
    Object.entries(catalog).filter(
      ([, page]) => page.frontMatter.locale === locale,
    ),
  );
}

/** 为本地开发构建与 Boss 草稿生成同样的轻量目录，不将其它草稿暴露到公开路由。 */
export async function loadLocalDraftContentCatalog(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentCatalogPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return projectStaticContentCatalog(
    index.entries.filter(
      (content) =>
        (content.frontMatter.contentType === "build" ||
          content.frontMatter.contentType === "boss") &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

/** 文件职责：定义构建期内容页面数据契约，供虚拟模块与路由共享而不依赖文件系统。 */
import type { ContentFrontMatter } from "./schema";
import type { TableOfContentsItem } from "./table-of-contents";
import type { BuildArticle } from "../builds/schema";
import type { BossArticle } from "../bosses/schema";
import type { ItemArticle } from "../items/schema";
import type { SkillArticle } from "../skills/schema";
import type { GuideArticle } from "../guides/schema";
import type { PatchArticle } from "../patches/schema";

export type StaticContentPage = {
  bodyHtml: string;
  bossArticle?: BossArticle;
  buildArticle?: BuildArticle;
  frontMatter: ContentFrontMatter;
  guideArticle?: GuideArticle;
  itemArticle?: ItemArticle;
  patchArticle?: PatchArticle;
  skillArticle?: SkillArticle;
  tableOfContents: readonly TableOfContentsItem[];
};

export type StaticContentPageMap = Readonly<Record<string, StaticContentPage>>;

/** 根级导航仅需稳定路由字段，禁止把正文或 SEO 资料带入全站共享模块。 */
export type StaticContentRoute = {
  contentId: string;
  contentType: ContentFrontMatter["contentType"];
  locale: ContentFrontMatter["locale"];
  slug: string;
};

export type StaticContentRouteMap = Readonly<
  Record<string, StaticContentRoute>
>;

/** 详情页 Metadata 只保留 SEO、语言替代链和草稿状态，不携带正文或来源。 */
export type StaticContentMeta = Pick<
  ContentFrontMatter,
  | "contentId"
  | "contentType"
  | "locale"
  | "slug"
  | "title"
  | "seoTitle"
  | "seoDescription"
  | "draft"
  | "image"
  | "imageAlt"
  | "relatedContentIds"
> & {
  noindex?: boolean | undefined;
};

/** 分类页使用的 Build 最小字段；正文章节和来源只在详情模块中加载。 */
export type CatalogBuildArticle = Pick<
  BuildArticle,
  | "id"
  | "slug"
  | "locale"
  | "status"
  | "title"
  | "summary"
  | "classId"
  | "ascendancyId"
  | "mainSkillIds"
  | "secondarySkillIds"
  | "stages"
  | "budgets"
  | "difficulty"
  | "playstyleTags"
  | "patch"
  | "updatedAt"
  | "heroImage"
  | "cardImage"
  | "imageAlt"
  | "tags"
>;

/** 分类页使用的 Boss 最小字段；战斗章节仍只在详情模块中加载。 */
export type CatalogBossArticle = Pick<
  BossArticle,
  | "id"
  | "slug"
  | "locale"
  | "status"
  | "title"
  | "summary"
  | "bossCategory"
  | "act"
  | "difficulty"
  | "patch"
  | "updatedAt"
  | "heroImage"
  | "cardImage"
  | "imageAlt"
  | "tags"
>;

/** 分类页使用的 Item 最小字段；物品属性表仍只在详情模块中加载。 */
export type CatalogItemArticle = Pick<
  ItemArticle,
  | "id"
  | "slug"
  | "locale"
  | "status"
  | "title"
  | "summary"
  | "itemCategory"
  | "itemType"
  | "rarity"
  | "patch"
  | "updatedAt"
  | "heroImage"
  | "cardImage"
  | "imageAlt"
  | "tags"
>;

/** 分类页使用的 Skill 最小字段；技能交互矩阵仍只在详情模块中加载。 */
export type CatalogSkillArticle = Pick<
  SkillArticle,
  | "id"
  | "slug"
  | "locale"
  | "status"
  | "title"
  | "summary"
  | "skillType"
  | "skillCategory"
  | "skillTags"
  | "patch"
  | "updatedAt"
  | "heroImage"
  | "cardImage"
  | "imageAlt"
  | "tags"
>;

/** 分类页使用的 Guide 最小字段；长篇正文和章节筛选只在详情模块中加载。 */
export type CatalogGuideArticle = Pick<
  GuideArticle,
  | "id"
  | "slug"
  | "locale"
  | "status"
  | "title"
  | "summary"
  | "guideCategory"
  | "patch"
  | "updatedAt"
  | "heroImage"
  | "cardImage"
  | "imageAlt"
  | "tags"
>;

/** 分类页使用的 Patch 最小字段，额外保留影响章节是否存在这一布尔判定。 */
export type CatalogPatchArticle = Pick<
  PatchArticle,
  | "id"
  | "slug"
  | "locale"
  | "status"
  | "title"
  | "summary"
  | "patchCategory"
  | "patchVersion"
  | "patch"
  | "updatedAt"
  | "heroImage"
  | "cardImage"
  | "imageAlt"
  | "tags"
> & {
  hasImpact: boolean;
};

/** 首页、目录和聚合页共享的轻量卡片页，不含 HTML、目录或完整 JSON 章节。 */
export type StaticContentCatalogPage = {
  bossArticle?: CatalogBossArticle;
  buildArticle?: CatalogBuildArticle;
  frontMatter: ContentFrontMatter;
  guideArticle?: CatalogGuideArticle;
  itemArticle?: CatalogItemArticle;
  noindex?: boolean | undefined;
  patchArticle?: CatalogPatchArticle;
  skillArticle?: CatalogSkillArticle;
};

export type StaticContentCatalogPageMap = Readonly<
  Record<string, StaticContentCatalogPage>
>;

/** 仅保存 Metadata 所需的数量，避免目录路由为统计一个数字加载整份卡片目录。 */
export type StaticContentCatalogMetrics = Readonly<Record<string, number>>;

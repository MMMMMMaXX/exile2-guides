/** 文件职责：渲染 Builds 职业、升华与高价值分类聚合页，并根据真实发布数量控制索引状态。 */
import { useLocation, useParams } from "react-router";

import type { Route } from "./+types/build-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import { buildCategorySlugs, type BuildArticle } from "../../lib/builds/schema";
import {
  type BuildCollection,
  isKnownBuildCollection,
  matchesBuildCollection,
} from "../../lib/builds/taxonomy";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
import { locallyVisibleContentPages as contentPages } from "../../lib/content/runtime-pages";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { getNotFoundMeta } from "../../lib/seo/not-found";

type BuildCollectionRoute = {
  collection: BuildCollection;
  locale: ContentLocale;
  pathAfterLocale: string;
};

/** 从显式静态路由和受控参数解析聚合语义，避免分类词落入文章 slug。 */
function getBuildCollectionRoute(
  params: Record<string, string | undefined>,
  pathname: string,
): BuildCollectionRoute | undefined {
  const locale = params.locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale)) return undefined;

  let collection: BuildCollection;
  let pathAfterLocale: string;
  if (params.class) {
    collection = { kind: "class", value: params.class };
    pathAfterLocale = `builds/classes/${params.class}/`;
  } else if (params.ascendancy) {
    collection = { kind: "ascendancy", value: params.ascendancy };
    pathAfterLocale = `builds/ascendancies/${params.ascendancy}/`;
  } else {
    const value = pathname.split("/").filter(Boolean).at(-1);
    if (!value) return undefined;
    collection = {
      kind: "category",
      value: value as (typeof buildCategorySlugs)[number],
    };
    pathAfterLocale = `builds/${value}/`;
  }

  return isKnownBuildCollection(collection)
    ? { collection, locale, pathAfterLocale }
    : undefined;
}

/** 从运行时页面模块读取当前可见 Build；生产模块仍只包含已发布内容。 */
function getVisibleBuilds(locale: ContentLocale): BuildArticle[] {
  return (Object.values(contentPages) as StaticContentPage[]).flatMap((page) =>
    page.buildArticle?.locale === locale ? [page.buildArticle] : [],
  );
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ location, params }: Route.MetaArgs) {
  const route = getBuildCollectionRoute(params, location.pathname);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  const count = getVisibleBuilds(route.locale).filter((article) =>
    matchesBuildCollection(article, route.collection),
  ).length;
  const label = route.collection.value.replace(/-/g, " ");
  const zh = route.locale === "zh-cn";
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(route.pathAfterLocale),
    description: zh
      ? `${label} Path of Exile 2 Build 聚合与经过审核的攻略。`
      : `${label} Path of Exile 2 Build collection and reviewed guides.`,
    locale: route.locale,
    path: `/${route.locale}/${route.pathAfterLocale}`,
    ...(count < 2 ? { robots: "noindex, follow" } : {}),
    title: `${label} Builds | Exile2 Guides`,
  });
}

/** 渲染由同一 JSON 数据计算出的聚合结果；无内容时不创建虚假详情卡。 */
export default function BuildCollectionRoute() {
  const params = useParams();
  const location = useLocation();
  const route = getBuildCollectionRoute(params, location.pathname);
  if (!route) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }
  const articles = getVisibleBuilds(route.locale)
    .filter((article) => matchesBuildCollection(article, route.collection))
    .sort(
      (left, right) =>
        right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
    );
  const zh = route.locale === "zh-cn";
  const label = route.collection.value.replace(/-/g, " ");
  const hasDraftPreviews = articles.some(
    (article) => article.status === "draft",
  );

  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero
        eyebrow={
          zh
            ? route.collection.kind === "class"
              ? "职业 Build"
              : route.collection.kind === "ascendancy"
                ? "升华 Build"
                : "Build 分类"
            : `${route.collection.kind} Builds`
        }
        title={`${label} Builds`}
      />
      <section className="page-shell v4-module-stack">
        <header>
          <p className="section-kicker">
            {hasDraftPreviews
              ? zh
                ? "本地草稿预览"
                : "Local draft preview"
              : zh
                ? "已发布内容"
                : "Published content"}
          </p>
          <h2>
            {hasDraftPreviews
              ? zh
                ? "Build 草稿与已发布页面"
                : "Build drafts and published pages"
              : zh
                ? "可阅读 Build"
                : "Available Builds"}
          </h2>
        </header>
        {articles.length > 0 ? (
          <div className="content-card-grid">
            {articles.map((article) => (
              <ContentCard
                content={{
                  attributes: [
                    article.classId,
                    ...(article.ascendancyId ? [article.ascendancyId] : []),
                    ...article.stages,
                  ],
                  href: `/${route.locale}/builds/${article.slug}/`,
                  ...(article.cardImage
                    ? { image: article.cardImage }
                    : article.heroImage
                      ? { image: article.heroImage }
                      : {}),
                  ...(article.imageAlt ? { imageAlt: article.imageAlt } : {}),
                  meta: `${article.patch} · ${article.updatedAt}`,
                  summary: article.summary,
                  title: article.title,
                  typeLabel: "Build",
                }}
                footer={
                  article.status === "draft" ? (
                    <span className="local-draft-badge">
                      {zh ? "本地草稿" : "Local draft"}
                    </span>
                  ) : undefined
                }
                key={article.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              zh
                ? "该分类暂时没有经过审核的 Build"
                : "No reviewed Builds are available in this collection"
            }
          />
        )}
      </section>
    </main>
  );
}

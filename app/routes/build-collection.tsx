/** 文件职责：渲染 Builds 职业、升华与高价值分类聚合页，并根据真实发布数量控制索引状态。 */
import { useLocation } from "react-router";

import type { Route } from "./+types/build-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import { buildCategorySlugs } from "../../lib/builds/schema";
import {
  type BuildCollection,
  isKnownBuildCollection,
  matchesBuildCollection,
} from "../../lib/builds/taxonomy";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import type {
  CatalogBuildArticle,
  StaticContentCatalogPageMap,
} from "../../lib/content/content-page";
import {
  contentCatalogMetrics,
  loadContentCatalog,
} from "../../lib/content/content-catalog";
import { loadStaticContentCatalogForLocale } from "../../lib/content/content-catalog.server";
import { getCategoryLabel } from "../../lib/i18n/category-copy";
import { t } from "../../lib/i18n/ui";
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
function getVisibleBuilds(
  catalog: StaticContentCatalogPageMap,
  locale: ContentLocale,
): CatalogBuildArticle[] {
  return Object.values(catalog).flatMap((page) =>
    page.buildArticle?.locale === locale ? [page.buildArticle] : [],
  );
}

/** 聚合页只加载当前语言目录，保留本地草稿预览但不触碰其它语言。 */
export async function loader({ params }: Route.LoaderArgs) {
  return { catalog: await loadStaticContentCatalogForLocale(params.locale) };
}

/** 客户端导航只加载当前语言目录，并保留开发态草稿预览能力。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { catalog: await loadContentCatalog(params.locale) };
}

/** 返回当前聚合维度对应的眉标题案键（class/ascendancy/category）。 */
function buildEyebrowKey(
  kind: BuildCollection["kind"],
):
  | "collection.eyebrowClass"
  | "collection.eyebrowAscendancy"
  | "collection.eyebrowCategory" {
  if (kind === "class") return "collection.eyebrowClass";
  if (kind === "ascendancy") return "collection.eyebrowAscendancy";
  return "collection.eyebrowCategory";
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ location, params }: Route.MetaArgs) {
  const route = getBuildCollectionRoute(params, location.pathname);
  if (!route) return getNotFoundMeta(params.locale as ContentLocale);
  const count =
    contentCatalogMetrics[`${route.locale}/${route.pathAfterLocale}`] ?? 0;
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "build");
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(route.pathAfterLocale),
    description: t(route.locale, "collection.metaDescription", {
      label,
      type: typeLabel,
    }),
    locale: route.locale,
    path: `/${route.locale}/${route.pathAfterLocale}`,
    ...(count < 2 ? { robots: "noindex, follow" } : {}),
    title: `${label} ${typeLabel} | Exile2 Guides`,
  });
}

/** 渲染由同一 JSON 数据计算出的聚合结果；无内容时不创建虚假详情卡。 */
export default function BuildCollectionRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const location = useLocation();
  const route = getBuildCollectionRoute(params, location.pathname);
  if (!route) {
    return <NotFoundPage locale={params.locale as ContentLocale} />;
  }
  const articles = getVisibleBuilds(loaderData.catalog, route.locale)
    .filter((article) => matchesBuildCollection(article, route.collection))
    .sort(
      (left, right) =>
        right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
    );
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "build");
  const hasDraftPreviews = articles.some(
    (article) => article.status === "draft",
  );

  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero
        eyebrow={t(route.locale, buildEyebrowKey(route.collection.kind), {
          type: typeLabel,
        })}
        title={`${label} ${typeLabel}`}
      />
      <section className="page-shell v4-module-stack">
        <header>
          <p className="section-kicker">
            {t(
              route.locale,
              hasDraftPreviews
                ? "collection.localDraftPreview"
                : "collection.publishedContent",
            )}
          </p>
          <h2>
            {t(
              route.locale,
              hasDraftPreviews
                ? "collection.draftAndPublished"
                : "collection.availableContent",
              { type: typeLabel },
            )}
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
                  typeLabel,
                }}
                footer={
                  article.status === "draft" ? (
                    <span className="local-draft-badge">
                      {t(route.locale, "collection.localDraft")}
                    </span>
                  ) : undefined
                }
                key={article.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t(route.locale, "collection.emptyCollection", {
              type: typeLabel,
            })}
          />
        )}
      </section>
    </main>
  );
}

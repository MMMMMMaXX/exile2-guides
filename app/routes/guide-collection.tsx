/** 文件职责：渲染 Guides 分类聚合页，并根据真实发布数量控制索引状态。 */
import type { Route } from "./+types/guide-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import {
  type GuideCollection,
  isKnownGuideCollection,
  matchesGuideCollection,
} from "../../lib/guides/taxonomy";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import type {
  CatalogGuideArticle,
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

type GuideCollectionRoute = {
  collection: GuideCollection;
  locale: ContentLocale;
  pathAfterLocale: string;
};

/** 从显式静态路由和受控参数解析聚合语义，未知分类词进入 404。 */
function getGuideCollectionRoute(
  params: Record<string, string | undefined>,
): GuideCollectionRoute | undefined {
  const locale = params.locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale)) return undefined;
  if (!params.category) return undefined;

  const collection: GuideCollection = {
    kind: "category",
    value: params.category as GuideCollection["value"],
  };
  const pathAfterLocale = `guides/categories/${params.category}/`;

  return isKnownGuideCollection(collection)
    ? { collection, locale, pathAfterLocale }
    : undefined;
}

/** 从运行时页面模块读取当前可见 Guide；生产模块仍只包含已发布内容。 */
function getVisibleGuides(
  catalog: StaticContentCatalogPageMap,
  locale: ContentLocale,
): CatalogGuideArticle[] {
  return Object.values(catalog).flatMap((page) =>
    page.guideArticle?.locale === locale ? [page.guideArticle] : [],
  );
}

/** 聚合页只加载当前语言目录，长篇 Guide 正文不进入分类页首屏。 */
export async function loader({ params }: Route.LoaderArgs) {
  return { catalog: await loadStaticContentCatalogForLocale(params.locale) };
}

/** 客户端导航只加载当前语言目录，长篇 Guide 正文继续按文章拆分。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { catalog: await loadContentCatalog(params.locale) };
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getGuideCollectionRoute(params);
  if (!route) return getNotFoundMeta(params.locale as ContentLocale);
  const count =
    contentCatalogMetrics[`${route.locale}/${route.pathAfterLocale}`] ?? 0;
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "guide");
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
export default function GuideCollectionRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const route = getGuideCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale as ContentLocale} />;
  }
  const articles = getVisibleGuides(loaderData.catalog, route.locale)
    .filter((article) => matchesGuideCollection(article, route.collection))
    .sort(
      (left, right) =>
        right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
    );
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "guide");
  const hasDraftPreviews = articles.some(
    (article) => article.status === "draft",
  );

  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero
        eyebrow={t(route.locale, "collection.eyebrowCategory", {
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
                    ...(article.guideCategory ? [article.guideCategory] : []),
                  ],
                  href: `/${route.locale}/guides/${article.slug}/`,
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

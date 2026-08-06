/** 文件职责：渲染 Items 分类聚合页，并根据真实发布数量控制索引状态。 */
import type { Route } from "./+types/item-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import {
  type ItemCollection,
  isKnownItemCollection,
  matchesItemCollection,
} from "../../lib/items/taxonomy";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import type {
  CatalogItemArticle,
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

type ItemCollectionRoute = {
  collection: ItemCollection;
  locale: ContentLocale;
  pathAfterLocale: string;
};

/** 从显式静态路由和受控参数解析聚合语义，未知分类词进入 404。 */
function getItemCollectionRoute(
  params: Record<string, string | undefined>,
): ItemCollectionRoute | undefined {
  const locale = params.locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale)) return undefined;

  if (!params.category) return undefined;

  const collection: ItemCollection = {
    kind: "category",
    value: params.category as ItemCollection["value"],
  };
  const pathAfterLocale = `items/categories/${params.category}/`;

  return isKnownItemCollection(collection)
    ? { collection, locale, pathAfterLocale }
    : undefined;
}

/** 从运行时页面模块读取当前可见 Item；生产模块仍只包含已发布内容。 */
function getVisibleItems(
  catalog: StaticContentCatalogPageMap,
  locale: ContentLocale,
): CatalogItemArticle[] {
  return Object.values(catalog).flatMap((page) =>
    page.itemArticle?.locale === locale ? [page.itemArticle] : [],
  );
}

/** 聚合页只加载当前语言目录，筛选字段仍来自构建期静态模块。 */
export async function loader({ params }: Route.LoaderArgs) {
  return { catalog: await loadStaticContentCatalogForLocale(params.locale) };
}

/** 客户端导航只加载当前语言目录，筛选字段仍来自构建期投影。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { catalog: await loadContentCatalog(params.locale) };
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getItemCollectionRoute(params);
  if (!route) return getNotFoundMeta(params.locale as ContentLocale);
  const count =
    contentCatalogMetrics[`${route.locale}/${route.pathAfterLocale}`] ?? 0;
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "item");
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
export default function ItemCollectionRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const route = getItemCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale as ContentLocale} />;
  }
  const articles = getVisibleItems(loaderData.catalog, route.locale)
    .filter((article) => matchesItemCollection(article, route.collection))
    .sort(
      (left, right) =>
        right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
    );
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "item");
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
                    ...(article.itemCategory ? [article.itemCategory] : []),
                    ...(article.rarity ? [article.rarity] : []),
                    ...(article.itemType ? [article.itemType] : []),
                  ],
                  href: `/${route.locale}/items/${article.slug}/`,
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

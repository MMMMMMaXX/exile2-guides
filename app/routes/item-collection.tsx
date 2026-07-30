/** 文件职责：渲染 Items 分类聚合页，并根据真实发布数量控制索引状态。 */
import { useParams } from "react-router";

import type { Route } from "./+types/item-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import type { ItemArticle } from "../../lib/items/schema";
import {
  type ItemCollection,
  isKnownItemCollection,
  matchesItemCollection,
} from "../../lib/items/taxonomy";
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
function getVisibleItems(locale: ContentLocale): ItemArticle[] {
  return (Object.values(contentPages) as StaticContentPage[]).flatMap((page) =>
    page.itemArticle?.locale === locale ? [page.itemArticle] : [],
  );
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getItemCollectionRoute(params);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  const count = getVisibleItems(route.locale).filter((article) =>
    matchesItemCollection(article, route.collection),
  ).length;
  const label = route.collection.value.replace(/-/g, " ");
  const zh = route.locale === "zh-cn";
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(route.pathAfterLocale),
    description: zh
      ? `${label} Path of Exile 2 物品聚合与经过审核的资料。`
      : `${label} Path of Exile 2 item collection and reviewed references.`,
    locale: route.locale,
    path: `/${route.locale}/${route.pathAfterLocale}`,
    ...(count < 2 ? { robots: "noindex, follow" } : {}),
    title: `${label} Items | Exile2 Guides`,
  });
}

/** 渲染由同一 JSON 数据计算出的聚合结果；无内容时不创建虚假详情卡。 */
export default function ItemCollectionRoute() {
  const params = useParams();
  const route = getItemCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }
  const articles = getVisibleItems(route.locale)
    .filter((article) => matchesItemCollection(article, route.collection))
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
        eyebrow={zh ? "物品分类" : "category Items"}
        title={`${label} Items`}
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
                ? "物品草稿与已发布页面"
                : "Item drafts and published pages"
              : zh
                ? "可阅读物品"
                : "Available Items"}
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
                  typeLabel: "Item",
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
                ? "该分类暂时没有经过审核的物品"
                : "No reviewed Items are available in this collection"
            }
          />
        )}
      </section>
    </main>
  );
}

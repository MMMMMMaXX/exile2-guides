/** 文件职责：渲染 Patches 分类聚合页，并根据真实发布数量控制索引状态。 */
import { useParams } from "react-router";

import type { Route } from "./+types/patch-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import type { PatchArticle } from "../../lib/patches/schema";
import {
  type PatchCollection,
  isKnownPatchCollection,
  matchesPatchCollection,
} from "../../lib/patches/taxonomy";
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

type PatchCollectionRoute = {
  collection: PatchCollection;
  locale: ContentLocale;
  pathAfterLocale: string;
};

/** 从显式静态路由和受控参数解析聚合语义，未知分类词进入 404。 */
function getPatchCollectionRoute(
  params: Record<string, string | undefined>,
): PatchCollectionRoute | undefined {
  const locale = params.locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale)) return undefined;
  if (!params.category) return undefined;

  const collection: PatchCollection = {
    kind: "category",
    value: params.category as PatchCollection["value"],
  };
  const pathAfterLocale = `patches/categories/${params.category}/`;

  return isKnownPatchCollection(collection)
    ? { collection, locale, pathAfterLocale }
    : undefined;
}

/** 从运行时页面模块读取当前可见 Patch；生产模块仍只包含已发布内容。 */
function getVisiblePatches(locale: ContentLocale): PatchArticle[] {
  return (Object.values(contentPages) as StaticContentPage[]).flatMap((page) =>
    page.patchArticle?.locale === locale ? [page.patchArticle] : [],
  );
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getPatchCollectionRoute(params);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  const count = getVisiblePatches(route.locale).filter((article) =>
    matchesPatchCollection(article, route.collection),
  ).length;
  const label = route.collection.value.replace(/-/g, " ");
  const zh = route.locale === "zh-cn";
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(route.pathAfterLocale),
    description: zh
      ? `${label} Path of Exile 2 补丁摘要聚合与经过审核的改动记录。`
      : `${label} Path of Exile 2 patch summary collection and reviewed change records.`,
    locale: route.locale,
    path: `/${route.locale}/${route.pathAfterLocale}`,
    ...(count < 2 ? { robots: "noindex, follow" } : {}),
    title: `${label} Patches | Exile2 Guides`,
  });
}

/** 渲染由同一 JSON 数据计算出的聚合结果；无内容时不创建虚假详情卡。 */
export default function PatchCollectionRoute() {
  const params = useParams();
  const route = getPatchCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }
  const articles = getVisiblePatches(route.locale)
    .filter((article) => matchesPatchCollection(article, route.collection))
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
        eyebrow={zh ? "补丁分类" : `${route.collection.kind} Patches`}
        title={`${label} Patches`}
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
                ? "补丁草稿与已发布页面"
                : "Patch drafts and published pages"
              : zh
                ? "可阅读补丁摘要"
                : "Available Patch Summaries"}
          </h2>
        </header>
        {articles.length > 0 ? (
          <div className="content-card-grid">
            {articles.map((article) => (
              <ContentCard
                content={{
                  attributes: [
                    ...(article.patchCategory
                      ? [article.patchCategory]
                      : []),
                  ],
                  href: `/${route.locale}/patches/${article.slug}/`,
                  ...(article.cardImage
                    ? { image: article.cardImage }
                    : article.heroImage
                      ? { image: article.heroImage }
                      : {}),
                  ...(article.imageAlt ? { imageAlt: article.imageAlt } : {}),
                  meta: `${article.patch} · ${article.updatedAt}`,
                  summary: article.summary,
                  title: article.title,
                  typeLabel: "Patch",
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
                ? "该分类暂时没有经过审核的补丁摘要"
                : "No reviewed Patch Summaries are available in this collection"
            }
          />
        )}
      </section>
    </main>
  );
}

/** 文件职责：渲染 Bosses 分类与章节聚合页，并根据真实发布数量控制索引状态。 */
import { useParams } from "react-router";

import type { Route } from "./+types/boss-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import type { BossArticle } from "../../lib/bosses/schema";
import {
  type BossCollection,
  isKnownBossCollection,
  matchesBossCollection,
} from "../../lib/bosses/taxonomy";
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

type BossCollectionRoute = {
  collection: BossCollection;
  locale: ContentLocale;
  pathAfterLocale: string;
};

/** 从显式静态路由和受控参数解析聚合语义，未知分类词进入 404。 */
function getBossCollectionRoute(
  params: Record<string, string | undefined>,
): BossCollectionRoute | undefined {
  const locale = params.locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale)) return undefined;

  let collection: BossCollection;
  let pathAfterLocale: string;
  if (params.category) {
    collection = {
      kind: "category",
      value: params.category as BossCollection & { kind: "category" } extends {
        value: infer V;
      }
        ? V
        : never,
    };
    pathAfterLocale = `bosses/categories/${params.category}/`;
  } else if (params.act) {
    collection = {
      kind: "act",
      value: params.act as BossCollection & { kind: "act" } extends {
        value: infer V;
      }
        ? V
        : never,
    };
    pathAfterLocale = `bosses/acts/${params.act}/`;
  } else {
    return undefined;
  }

  return isKnownBossCollection(collection)
    ? { collection, locale, pathAfterLocale }
    : undefined;
}

/** 从运行时页面模块读取当前可见 Boss；生产模块仍只包含已发布内容。 */
function getVisibleBosses(locale: ContentLocale): BossArticle[] {
  return (Object.values(contentPages) as StaticContentPage[]).flatMap((page) =>
    page.bossArticle?.locale === locale ? [page.bossArticle] : [],
  );
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getBossCollectionRoute(params);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  const count = getVisibleBosses(route.locale).filter((article) =>
    matchesBossCollection(article, route.collection),
  ).length;
  const label = route.collection.value.replace(/-/g, " ");
  const zh = route.locale === "zh-cn";
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(route.pathAfterLocale),
    description: zh
      ? `${label} Path of Exile 2 Boss 聚合与经过审核的攻略。`
      : `${label} Path of Exile 2 Boss collection and reviewed guides.`,
    locale: route.locale,
    path: `/${route.locale}/${route.pathAfterLocale}`,
    ...(count < 2 ? { robots: "noindex, follow" } : {}),
    title: `${label} Bosses | Exile2 Guides`,
  });
}

/** 渲染由同一 JSON 数据计算出的聚合结果；无内容时不创建虚假详情卡。 */
export default function BossCollectionRoute() {
  const params = useParams();
  const route = getBossCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }
  const articles = getVisibleBosses(route.locale)
    .filter((article) => matchesBossCollection(article, route.collection))
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
            ? route.collection.kind === "category"
              ? "Boss 分类"
              : "章节 Boss"
            : `${route.collection.kind} Bosses`
        }
        title={`${label} Bosses`}
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
                ? "Boss 草稿与已发布页面"
                : "Boss drafts and published pages"
              : zh
                ? "可阅读 Boss"
                : "Available Bosses"}
          </h2>
        </header>
        {articles.length > 0 ? (
          <div className="content-card-grid">
            {articles.map((article) => (
              <ContentCard
                content={{
                  attributes: [
                    ...(article.bossCategory ? [article.bossCategory] : []),
                    ...(article.act ? [article.act] : []),
                    ...(article.difficulty ? [article.difficulty] : []),
                  ],
                  href: `/${route.locale}/bosses/${article.slug}/`,
                  ...(article.cardImage
                    ? { image: article.cardImage }
                    : article.heroImage
                      ? { image: article.heroImage }
                      : {}),
                  ...(article.imageAlt ? { imageAlt: article.imageAlt } : {}),
                  meta: `${article.patch} · ${article.updatedAt}`,
                  summary: article.summary,
                  title: article.title,
                  typeLabel: "Boss",
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
                ? "该分类暂时没有经过审核的 Boss"
                : "No reviewed Bosses are available in this collection"
            }
          />
        )}
      </section>
    </main>
  );
}

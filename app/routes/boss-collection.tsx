/** 文件职责：渲染 Bosses 分类与章节聚合页，并根据真实发布数量控制索引状态。 */
import type { Route } from "./+types/boss-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import {
  type BossCollection,
  isKnownBossCollection,
  matchesBossCollection,
} from "../../lib/bosses/taxonomy";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import type {
  CatalogBossArticle,
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
function getVisibleBosses(
  catalog: StaticContentCatalogPageMap,
  locale: ContentLocale,
): CatalogBossArticle[] {
  return Object.values(catalog).flatMap((page) =>
    page.bossArticle?.locale === locale ? [page.bossArticle] : [],
  );
}

/** 聚合页只加载当前语言目录，避免把十语言内容一起放入初始依赖。 */
export async function loader({ params }: Route.LoaderArgs) {
  return { catalog: await loadStaticContentCatalogForLocale(params.locale) };
}

/** 客户端导航只加载当前语言目录，避免把十语言内容放入交互等待链。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { catalog: await loadContentCatalog(params.locale) };
}

/** 返回当前聚合维度对应的眉标题案键（category/act）。 */
function bossEyebrowKey(
  kind: BossCollection["kind"],
): "collection.eyebrowCategory" | "collection.eyebrowAct" {
  return kind === "act"
    ? "collection.eyebrowAct"
    : "collection.eyebrowCategory";
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getBossCollectionRoute(params);
  if (!route) return getNotFoundMeta(params.locale as ContentLocale);
  const count =
    contentCatalogMetrics[`${route.locale}/${route.pathAfterLocale}`] ?? 0;
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "boss");
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
export default function BossCollectionRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const route = getBossCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale as ContentLocale} />;
  }
  const articles = getVisibleBosses(loaderData.catalog, route.locale)
    .filter((article) => matchesBossCollection(article, route.collection))
    .sort(
      (left, right) =>
        right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
    );
  const label = route.collection.value.replace(/-/g, " ");
  const typeLabel = getCategoryLabel(route.locale, "boss");
  const hasDraftPreviews = articles.some(
    (article) => article.status === "draft",
  );

  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero
        eyebrow={t(route.locale, bossEyebrowKey(route.collection.kind), {
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

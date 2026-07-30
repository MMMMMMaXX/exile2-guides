/** 文件职责：渲染 Skills 分类聚合页，并根据真实发布数量控制索引状态。 */
import { useParams } from "react-router";

import type { Route } from "./+types/skill-collection";
import { ContentCard } from "../../components/content/content-card";
import { NotFoundPage } from "../../components/content/not-found-page";
import { EmptyState, PageHero } from "../../components/v4/page-primitives";
import type { SkillArticle } from "../../lib/skills/schema";
import {
  type SkillCollection,
  isKnownSkillCollection,
  matchesSkillCollection,
} from "../../lib/skills/taxonomy";
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

type SkillCollectionRoute = {
  collection: SkillCollection;
  locale: ContentLocale;
  pathAfterLocale: string;
};

/** 从显式静态路由和受控参数解析聚合语义，未知分类词进入 404。 */
function getSkillCollectionRoute(
  params: Record<string, string | undefined>,
): SkillCollectionRoute | undefined {
  const locale = params.locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale)) return undefined;
  if (!params.category) return undefined;

  const collection: SkillCollection = {
    kind: "category",
    value: params.category as SkillCollection["value"],
  };
  const pathAfterLocale = `skills/categories/${params.category}/`;

  return isKnownSkillCollection(collection)
    ? { collection, locale, pathAfterLocale }
    : undefined;
}

/** 从运行时页面模块读取当前可见 Skill；生产模块仍只包含已发布内容。 */
function getVisibleSkills(locale: ContentLocale): SkillArticle[] {
  return (Object.values(contentPages) as StaticContentPage[]).flatMap((page) =>
    page.skillArticle?.locale === locale ? [page.skillArticle] : [],
  );
}

/** 为聚合页生成描述；不足两篇时保留访问能力但不进入搜索索引。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getSkillCollectionRoute(params);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  const count = getVisibleSkills(route.locale).filter((article) =>
    matchesSkillCollection(article, route.collection),
  ).length;
  const label = route.collection.value.replace(/-/g, " ");
  const zh = route.locale === "zh-cn";
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(route.pathAfterLocale),
    description: zh
      ? `${label} Path of Exile 2 技能聚合与经过审核的攻略。`
      : `${label} Path of Exile 2 skill collection and reviewed guides.`,
    locale: route.locale,
    path: `/${route.locale}/${route.pathAfterLocale}`,
    ...(count < 2 ? { robots: "noindex, follow" } : {}),
    title: `${label} Skills | Exile2 Guides`,
  });
}

/** 渲染由同一 JSON 数据计算出的聚合结果；无内容时不创建虚假详情卡。 */
export default function SkillCollectionRoute() {
  const params = useParams();
  const route = getSkillCollectionRoute(params);
  if (!route) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }
  const articles = getVisibleSkills(route.locale)
    .filter((article) => matchesSkillCollection(article, route.collection))
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
        eyebrow={zh ? "技能分类" : `${route.collection.kind} Skills`}
        title={`${label} Skills`}
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
                ? "技能草稿与已发布页面"
                : "Skill drafts and published pages"
              : zh
                ? "可阅读技能"
                : "Available Skills"}
          </h2>
        </header>
        {articles.length > 0 ? (
          <div className="content-card-grid">
            {articles.map((article) => (
              <ContentCard
                content={{
                  attributes: [
                    ...(article.skillType ? [article.skillType] : []),
                    ...(article.skillCategory
                      ? [article.skillCategory]
                      : []),
                  ],
                  href: `/${route.locale}/skills/${article.slug}/`,
                  ...(article.cardImage
                    ? { image: article.cardImage }
                    : article.heroImage
                      ? { image: article.heroImage }
                      : {}),
                  ...(article.imageAlt ? { imageAlt: article.imageAlt } : {}),
                  meta: `${article.patch} · ${article.updatedAt}`,
                  summary: article.summary,
                  title: article.title,
                  typeLabel: "Skill",
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
                ? "该分类暂时没有经过审核的技能"
                : "No reviewed Skills are available in this collection"
            }
          />
        )}
      </section>
    </main>
  );
}

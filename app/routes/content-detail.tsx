/** 文件职责：提供六类内容共用的最小静态详情路由，视觉文章模板将在后续任务扩展。 */
import { useParams } from "react-router";

import type { Route } from "./+types/content-detail";
import { ArticleLayout } from "../../components/layout/article-layout";
import { BuildQuickSummary } from "../../components/builds/build-quick-summary";
import {
  BuildMediaNotice,
  BuildSectionRenderer,
} from "../../components/builds/build-section-renderer";
import {
  BossMediaNotice,
  BossSectionRenderer,
} from "../../components/bosses/boss-section-renderer";
import {
  ItemMediaNotice,
  ItemSectionRenderer,
} from "../../components/items/item-section-renderer";
import {
  SkillMediaNotice,
  SkillSectionRenderer,
} from "../../components/skills/skill-section-renderer";
import {
  GuideMediaNotice,
  GuideSectionRenderer,
} from "../../components/guides/guide-section-renderer";
import {
  PatchMediaNotice,
  PatchSectionRenderer,
} from "../../components/patches/patch-section-renderer";
import { BossQuickPreparation } from "../../components/bosses/boss-quick-preparation";
import { ArticleSidebar } from "../../components/content/article-sidebar";
import { ContentFactSummary } from "../../components/content/content-fact-summary";
import { DraftPreviewNotice } from "../../components/content/draft-preview-notice";
import { PatchStatusNotice } from "../../components/content/patch-status-notice";
import { NotFoundPage } from "../../components/content/not-found-page";
import { RelatedContent } from "../../components/content/related-content";
import { SourcesAndVerification } from "../../components/content/sources-and-verification";
import {
  CatalogCard,
  EmptyState,
  FactsRail,
  PageHero,
  StickyToc,
} from "../../components/v4/page-primitives";
import { StructuredData } from "../../components/seo/structured-data";
import {
  contentRoutePath,
  contentTypeSegments,
  type ContentType,
  supportedLocales,
} from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
import { locallyVisibleContentPages as contentPages } from "../../lib/content/runtime-pages";
import type {
  BossFrontMatter,
  BuildFrontMatter,
  ItemFrontMatter,
} from "../../lib/content/schema";
import {
  createBreadcrumbJsonLd,
  type BreadcrumbItem,
} from "../../lib/seo/breadcrumb";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { getNotFoundMeta } from "../../lib/seo/not-found";
import { createArticleJsonLd } from "../../lib/seo/structured-data";
import { isV4Subtype } from "../../lib/content/v4-taxonomy";

const contentTypeBySegment = new Map<string, ContentType>(
  Object.entries(contentTypeSegments).map(([contentType, segment]) => [
    segment,
    contentType as ContentType,
  ]),
);

const contentTypeLabels: Record<ContentType, string> = {
  boss: "Bosses",
  build: "Builds",
  guide: "Guides",
  item: "Items",
  patch: "Patch Notes",
  skill: "Skills",
};

/** 校验动态参数并从构建期虚拟模块读取对应的已发布页面。 */
function getPage(
  params: Record<string, string | undefined>,
): StaticContentPage | undefined {
  const { locale, section, slug } = params;
  const contentType = section ? contentTypeBySegment.get(section) : undefined;
  if (
    !locale ||
    !supportedLocales.includes(locale as (typeof supportedLocales)[number]) ||
    !contentType ||
    !slug
  ) {
    return undefined;
  }

  return contentPages[
    contentRoutePath(
      locale as (typeof supportedLocales)[number],
      contentType,
      slug,
    )
  ];
}

/** 判断两段 URL 是否对应 V4 的受控子类聚合页；真实详情始终优先于骨架聚合页。 */
function getSubtypeRoute(params: Record<string, string | undefined>) {
  const locale = params.locale as (typeof supportedLocales)[number] | undefined;
  const contentType = params.section
    ? contentTypeBySegment.get(params.section)
    : undefined;
  return locale &&
    contentType &&
    params.slug &&
    supportedLocales.includes(locale) &&
    isV4Subtype(contentType, params.slug)
    ? { contentType, locale, subtype: params.slug }
    : undefined;
}

/** 渲染无真实详情时的聚合结构页，避免将分类词误报为可阅读的内容详情。 */
function V4SubtypeSkeleton({
  contentType,
  locale,
  subtype,
}: {
  contentType: ContentType;
  locale: (typeof supportedLocales)[number];
  subtype: string;
}) {
  const title = subtype.replace(/-/g, " ");
  const sections = [
    "Overview",
    "Available entries",
    "Connections",
    "Publication rule",
  ];
  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero eyebrow="Subtype aggregation" title={title} />
      <div className="page-shell v4-subtype-layout">
        <StickyToc
          items={sections.map((label, index) => ({
            href: `#v4-subtype-${index + 1}`,
            label,
          }))}
        />
        <article className="v4-module-stack">
          {sections.map((label, index) => (
            <section
              className="panel"
              id={`v4-subtype-${index + 1}`}
              key={label}
            >
              <p className="section-kicker">Module {index + 1}</p>
              <h2>{label}</h2>
              {index === 1 ? (
                <div className="content-card-grid">
                  <CatalogCard
                    meta="Development index row · no detail page"
                    title={`${title} skeleton row`}
                  />
                </div>
              ) : (
                <EmptyState
                  title={`${label} is ready for reviewed ${contentType} content`}
                />
              )}
            </section>
          ))}
        </article>
        <FactsRail
          facts={[
            { label: "Module", value: contentType },
            { label: "Subtype", value: title },
            { label: "Locale", value: locale },
            { label: "Publishing", value: "No thin details" },
          ]}
        />
      </div>
    </main>
  );
}

/** 按当前内容类型生成可见面包屑与结构化数据共用的稳定层级。 */
function getBreadcrumbs(page: StaticContentPage): BreadcrumbItem[] {
  const { contentType, locale, slug, title } = page.frontMatter;
  const sectionPath = `/${locale}/${contentTypeSegments[contentType]}/`;
  return [
    { label: locale === "zh-cn" ? "首页" : "Home", path: `/${locale}/` },
    { label: contentTypeLabels[contentType], path: sectionPath },
    { label: title, path: `${sectionPath}${slug}/` },
  ];
}

/** 判断详情页是否为 Build，使 Build 专属摘要只读取经过 Schema 校验的字段。 */
function isBuildPage(
  page: StaticContentPage,
): page is StaticContentPage & { frontMatter: BuildFrontMatter } {
  return page.frontMatter.contentType === "build";
}

/** 判断详情页是否为 Boss，使战前摘要仅消费已通过 Boss Schema 的字段。 */
function isBossPage(
  page: StaticContentPage,
): page is StaticContentPage & { frontMatter: BossFrontMatter } {
  return page.frontMatter.contentType === "boss";
}

/** 判断详情页是否为 Item，使物品摘要仅消费已通过 Item Schema 的字段。 */
function isItemPage(
  page: StaticContentPage,
): page is StaticContentPage & { frontMatter: ItemFrontMatter } {
  return page.frontMatter.contentType === "item";
}

/** 从已内联的同语言公开页面派生关联卡片，草稿不会存在于该虚拟模块。 */
function getRelatedCards(page: StaticContentPage) {
  return page.frontMatter.relatedContentIds.flatMap((contentId) => {
    const relatedPage = (
      Object.values(contentPages) as StaticContentPage[]
    ).find(
      (candidate) =>
        candidate.frontMatter.contentId === contentId &&
        candidate.frontMatter.locale === page.frontMatter.locale,
    );
    if (!relatedPage) return [];

    const { frontMatter } = relatedPage;
    return [
      {
        attributes: frontMatter.tags,
        href: contentRoutePath(
          frontMatter.locale,
          frontMatter.contentType,
          frontMatter.slug,
        ),
        meta: `Patch ${frontMatter.patch} · Updated ${frontMatter.updatedAt}`,
        summary: frontMatter.summary,
        title: frontMatter.title,
        typeLabel: contentTypeLabels[frontMatter.contentType],
        ...(frontMatter.image
          ? {
              image: frontMatter.image,
              ...(frontMatter.imageAlt
                ? { imageAlt: frontMatter.imageAlt }
                : {}),
            }
          : {}),
      },
    ];
  });
}

/** 从已校验内容生成静态页面标题和描述。 */
export function meta({ params }: Route.MetaArgs) {
  const page = getPage(params);
  if (!page) {
    const subtype = getSubtypeRoute(params);
    if (subtype) {
      const path = `/${subtype.locale}/${contentTypeSegments[subtype.contentType]}/${subtype.subtype}/`;
      return createSeoMetadata({
        alternatePaths: createBilingualAlternatePaths(
          `${contentTypeSegments[subtype.contentType]}/${subtype.subtype}/`,
        ),
        description: `V4 ${subtype.contentType} aggregation skeleton.`,
        locale: subtype.locale,
        path,
        robots: "noindex, follow",
        title: `${subtype.subtype} | Exile2 Guides`,
      });
    }
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  }
  const alternatePaths = Object.fromEntries(
    (Object.values(contentPages) as StaticContentPage[])
      .filter(
        (candidate) =>
          candidate.frontMatter.contentId === page.frontMatter.contentId,
      )
      .map((candidate) => [
        candidate.frontMatter.locale,
        contentRoutePath(
          candidate.frontMatter.locale,
          candidate.frontMatter.contentType,
          candidate.frontMatter.slug,
        ),
      ]),
  );
  return createSeoMetadata({
    alternatePaths,
    description: page.frontMatter.seoDescription,
    ...(page.frontMatter.image ? { imagePath: page.frontMatter.image } : {}),
    locale: page.frontMatter.locale,
    path: contentRoutePath(
      page.frontMatter.locale,
      page.frontMatter.contentType,
      page.frontMatter.slug,
    ),
    ...(page.frontMatter.draft ||
    page.buildArticle?.seo.noindex ||
    page.bossArticle?.seo.noindex ||
    page.itemArticle?.seo.noindex ||
    page.skillArticle?.seo.noindex ||
    page.guideArticle?.seo.noindex ||
    page.patchArticle?.seo.noindex
      ? { robots: "noindex, follow" }
      : {}),
    title: page.frontMatter.seoTitle,
    type: "article",
  });
}

/** 输出构建期已生成的正文；标记用于阻止空壳 HTML 通过发布门禁。 */
export default function ContentDetailRoute() {
  const params = useParams();
  const page = getPage(params);
  if (!page) {
    const subtype = getSubtypeRoute(params);
    if (subtype) return <V4SubtypeSkeleton {...subtype} />;
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }

  const breadcrumbs = getBreadcrumbs(page);
  const relatedCards = getRelatedCards(page);

  return (
    <>
      <StructuredData data={createBreadcrumbJsonLd(breadcrumbs)} />
      {!page.frontMatter.draft ? (
        <StructuredData data={createArticleJsonLd(page.frontMatter)} />
      ) : null}
      <ArticleLayout
        breadcrumbs={breadcrumbs}
        contentType={contentTypeLabels[page.frontMatter.contentType]}
        {...(page.frontMatter.image
          ? {
              image: page.frontMatter.image,
              ...(page.frontMatter.imageAlt
                ? { imageAlt: page.frontMatter.imageAlt }
                : {}),
            }
          : {})}
        locale={page.frontMatter.locale}
        patch={page.frontMatter.patch}
        rail={
          <ArticleSidebar
            author={page.frontMatter.author}
            categoryHref={`/${page.frontMatter.locale}/${contentTypeSegments[page.frontMatter.contentType]}/`}
            categoryLabel={contentTypeLabels[page.frontMatter.contentType]}
            contentType={page.frontMatter.contentType}
            locale={page.frontMatter.locale}
            patch={page.frontMatter.patch}
            tags={page.frontMatter.tags}
            updatedAt={page.frontMatter.updatedAt}
            {...(page.frontMatter.verificationStatus
              ? {
                  verificationStatus: page.frontMatter.verificationStatus,
                }
              : {})}
          />
        }
        {...(page.frontMatter.contentType === "guide" &&
        typeof page.frontMatter.estimatedReadingMinutes === "number"
          ? {
              readingMinutes: page.frontMatter.estimatedReadingMinutes,
            }
          : {})}
        summary={page.frontMatter.summary}
        tableOfContents={page.tableOfContents}
        title={page.frontMatter.title}
        updatedAt={page.frontMatter.updatedAt}
      >
        <DraftPreviewNotice frontMatter={page.frontMatter} />
        {isBuildPage(page) ? (
          <BuildQuickSummary frontMatter={page.frontMatter} />
        ) : null}
        {isBossPage(page) ? (
          <BossQuickPreparation frontMatter={page.frontMatter} />
        ) : null}
        {isItemPage(page) ? (
          <ContentFactSummary frontMatter={page.frontMatter} />
        ) : null}
        <PatchStatusNotice frontMatter={page.frontMatter} />
        {page.buildArticle ? (
          <BuildSectionRenderer article={page.buildArticle} />
        ) : page.bossArticle ? (
          <BossSectionRenderer article={page.bossArticle} />
        ) : page.itemArticle ? (
          <ItemSectionRenderer article={page.itemArticle} />
        ) : page.skillArticle ? (
          <SkillSectionRenderer article={page.skillArticle} />
        ) : page.guideArticle ? (
          <GuideSectionRenderer article={page.guideArticle} />
        ) : page.patchArticle ? (
          <PatchSectionRenderer article={page.patchArticle} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        )}
        <SourcesAndVerification frontMatter={page.frontMatter} />
        <RelatedContent items={relatedCards} />
        {page.buildArticle ? (
          <BuildMediaNotice locale={page.frontMatter.locale} />
        ) : null}
        {page.bossArticle ? (
          <BossMediaNotice locale={page.frontMatter.locale} />
        ) : null}
        {page.itemArticle ? (
          <ItemMediaNotice locale={page.frontMatter.locale} />
        ) : null}
        {page.skillArticle ? (
          <SkillMediaNotice locale={page.frontMatter.locale} />
        ) : null}
        {page.guideArticle ? (
          <GuideMediaNotice locale={page.frontMatter.locale} />
        ) : null}
        {page.patchArticle ? (
          <PatchMediaNotice locale={page.frontMatter.locale} />
        ) : null}
      </ArticleLayout>
    </>
  );
}

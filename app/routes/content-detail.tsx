/** 文件职责：提供六类内容共用的最小静态详情路由，视觉文章模板将在后续任务扩展。 */
import contentPageLoadersModule from "virtual:content-page-loaders";
import contentRoutesModule from "virtual:content-routes";

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
  type ContentLocale,
  type ContentType,
  supportedLocales,
} from "../../lib/content/constants";
import type {
  StaticContentCatalogPageMap,
  StaticContentMeta,
  StaticContentPage,
  StaticContentRouteMap,
} from "../../lib/content/content-page";
import { loadContentCatalog } from "../../lib/content/content-catalog";
import { loadStaticContentCatalogForLocale } from "../../lib/content/content-catalog.server";
import { loadStaticContentPages } from "../../lib/content/content-page.server";
import { getCategoryLabel } from "../../lib/i18n/category-copy";
import { t } from "../../lib/i18n/ui";
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
import {
  createArticleJsonLd,
  createFaqJsonLd,
  createHowToJsonLd,
} from "../../lib/seo/structured-data";
import { resolveImageAsset } from "../../lib/assets/image-assets";
import { isV4Subtype } from "../../lib/content/v4-taxonomy";

const contentRoutes = contentRoutesModule as StaticContentRouteMap;
const contentPageLoaders = contentPageLoadersModule as Readonly<
  Record<string, () => Promise<{ default: StaticContentPage }>>
>;

const contentTypeBySegment = new Map<string, ContentType>(
  Object.entries(contentTypeSegments).map(([contentType, segment]) => [
    segment,
    contentType as ContentType,
  ]),
);

/** 校验动态参数并生成按文章拆分模块共用的静态路由键。 */
function getContentRoute(
  params: Record<string, string | undefined>,
): string | undefined {
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

  return contentRoutePath(
    locale as (typeof supportedLocales)[number],
    contentType,
    slug,
  );
}

/** 从详情正文和目录卡片提取 Metadata，避免客户端导入全量 Metadata 索引。 */
function getPageMeta(
  page: StaticContentPage,
  catalogPage: StaticContentCatalogPageMap[string] | undefined,
): StaticContentMeta {
  const { frontMatter } = page;
  return {
    contentId: frontMatter.contentId,
    contentType: frontMatter.contentType,
    locale: frontMatter.locale,
    slug: frontMatter.slug,
    title: frontMatter.title,
    seoTitle: frontMatter.seoTitle,
    seoDescription: frontMatter.seoDescription,
    draft: frontMatter.draft,
    ...(frontMatter.image ? { image: frontMatter.image } : {}),
    ...(frontMatter.imageAlt ? { imageAlt: frontMatter.imageAlt } : {}),
    relatedContentIds: frontMatter.relatedContentIds,
    ...(catalogPage?.noindex === undefined
      ? {}
      : { noindex: catalogPage.noindex }),
  };
}

/** 预渲染时在服务端提供正文和关联卡片；浏览器端不把全量正文索引打入共享包。 */
export async function loader({ params }: Route.LoaderArgs) {
  const route = getContentRoute(params);
  const [pages, catalog] = await Promise.all([
    loadStaticContentPages(),
    loadStaticContentCatalogForLocale(params.locale),
  ]);
  const page = route ? pages[route] : undefined;
  const catalogPage = route ? catalog[route] : undefined;
  return {
    meta: page ? getPageMeta(page, catalogPage) : undefined,
    page,
    relatedCards: page ? getRelatedCards(page, catalog) : [],
  };
}

/** 读取当前文章的静态拆分模块；不请求 Markdown、API 或运行时服务。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const route = getContentRoute(params);
  const loadPage = route ? contentPageLoaders[route] : undefined;
  const catalog = await loadContentCatalog(params.locale);
  const page = loadPage ? (await loadPage()).default : undefined;
  const catalogPage = route ? catalog[route] : undefined;
  return {
    meta: page ? getPageMeta(page, catalogPage) : undefined,
    page,
    relatedCards: page ? getRelatedCards(page, catalog) : [],
  };
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
  const typeLabel = getCategoryLabel(locale, contentType);
  const sections = [
    t(locale, "subtype.overview"),
    t(locale, "subtype.availableEntries"),
    t(locale, "subtype.connections"),
    t(locale, "subtype.publicationRule"),
  ];
  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero eyebrow={t(locale, "subtype.eyebrow")} title={title} />
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
              <p className="section-kicker">
                {t(locale, "subtype.module", { n: String(index + 1) })}
              </p>
              <h2>{label}</h2>
              {index === 1 ? (
                <div className="content-card-grid">
                  <CatalogCard
                    meta={t(locale, "subtype.devIndexRow")}
                    title={t(locale, "subtype.skeletonRow", { title })}
                  />
                </div>
              ) : (
                <EmptyState
                  title={t(locale, "subtype.readyForContent", {
                    label,
                    type: typeLabel,
                  })}
                />
              )}
            </section>
          ))}
        </article>
        <FactsRail
          facts={[
            { label: t(locale, "subtype.moduleLabel"), value: contentType },
            { label: t(locale, "subtype.subtypeLabel"), value: title },
            { label: t(locale, "subtype.localeLabel"), value: locale },
            {
              label: t(locale, "subtype.publishingLabel"),
              value: t(locale, "subtype.noThinDetails"),
            },
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
    { label: t(locale, "nav.home"), path: `/${locale}/` },
    { label: getCategoryLabel(locale, contentType), path: sectionPath },
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

/** 从轻量目录派生关联卡片，草稿不会进入生产目录。 */
function getRelatedCards(
  page: StaticContentPage,
  catalog: StaticContentCatalogPageMap,
) {
  return page.frontMatter.relatedContentIds.flatMap((contentId) => {
    const relatedPage = Object.values(catalog).find(
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
        typeLabel: getCategoryLabel(
          frontMatter.locale,
          frontMatter.contentType,
        ),
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
export function meta({ loaderData, params }: Route.MetaArgs) {
  const page = loaderData.meta;
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
    return getNotFoundMeta(params.locale as ContentLocale);
  }
  const alternatePaths = Object.fromEntries(
    Object.values(contentRoutes)
      .filter((candidate) => candidate.contentId === page.contentId)
      .map((candidate) => [
        candidate.locale,
        contentRoutePath(
          candidate.locale,
          candidate.contentType,
          candidate.slug,
        ),
      ]),
  );
  // 已发布详情页使用按 slug 生成的专属 OG 图（脚本：scripts/generate-og-images.mjs），
  // 经 Vite 指纹管线后通过 resolveImageAsset 取得带哈希的 URL；
  // 草稿预览页（仅开发期存在）回退到主视觉指纹 URL或站点默认图，避免引用尚未生成的文件。
  const ogSourcePath = `/images/og/${contentTypeSegments[page.contentType]}/${page.slug}.webp`;
  const ogImagePath = page.draft
    ? page.image
      ? resolveImageAsset(page.image)
      : undefined
    : resolveImageAsset(ogSourcePath);
  return createSeoMetadata({
    alternatePaths,
    description: page.seoDescription,
    ...(ogImagePath ? { imagePath: ogImagePath } : {}),
    locale: page.locale,
    path: contentRoutePath(page.locale, page.contentType, page.slug),
    ...(page.draft || page.noindex ? { robots: "noindex, follow" } : {}),
    title: page.seoTitle,
    type: "article",
  });
}

/** 输出构建期已生成的正文；标记用于阻止空壳 HTML 通过发布门禁。 */
export default function ContentDetailRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const page = loaderData.page;
  if (!page) {
    const subtype = getSubtypeRoute(params);
    if (subtype) return <V4SubtypeSkeleton {...subtype} />;
    return <NotFoundPage locale={params.locale as ContentLocale} />;
  }

  const breadcrumbs = getBreadcrumbs(page);
  const relatedCards = loaderData.relatedCards;

  return (
    <>
      <StructuredData data={createBreadcrumbJsonLd(breadcrumbs)} />
      {!page.frontMatter.draft ? (
        <StructuredData data={createArticleJsonLd(page.frontMatter)} />
      ) : null}
      {/* P1-1: 从可见章节派生 FAQPage / HowTo 富结果结构化数据 */}
      {!page.frontMatter.draft
        ? (() => {
            const article =
              page.buildArticle ??
              page.bossArticle ??
              page.itemArticle ??
              page.skillArticle ??
              page.guideArticle ??
              page.patchArticle;
            if (!article) return null;
            const locale = page.frontMatter.locale;
            const faq = createFaqJsonLd(locale, article.sections);
            const howTo = createHowToJsonLd(locale, article.sections);
            return (
              <>
                {faq ? <StructuredData data={faq} /> : null}
                {howTo ? <StructuredData data={howTo} /> : null}
              </>
            );
          })()
        : null}
      <ArticleLayout
        breadcrumbs={breadcrumbs}
        category={page.frontMatter.contentType}
        contentType={getCategoryLabel(
          page.frontMatter.locale,
          page.frontMatter.contentType,
        )}
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
            categoryHref={`/${page.frontMatter.locale}/${contentTypeSegments[page.frontMatter.contentType]}/`}
            categoryLabel={getCategoryLabel(
              page.frontMatter.locale,
              page.frontMatter.contentType,
            )}
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

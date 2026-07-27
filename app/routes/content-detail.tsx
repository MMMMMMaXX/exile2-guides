/** 文件职责：提供六类内容共用的最小静态详情路由，视觉文章模板将在后续任务扩展。 */
import { useParams } from "react-router";
import contentPages from "virtual:content-pages";

import type { Route } from "./+types/content-detail";
import { ArticleLayout } from "../../components/layout/article-layout";
import { BuildQuickSummary } from "../../components/builds/build-quick-summary";
import { BossQuickPreparation } from "../../components/bosses/boss-quick-preparation";
import { ContentFactSummary } from "../../components/content/content-fact-summary";
import { PatchStatusNotice } from "../../components/content/patch-status-notice";
import { NotFoundPage } from "../../components/content/not-found-page";
import { RelatedContent } from "../../components/content/related-content";
import { SourcesAndVerification } from "../../components/content/sources-and-verification";
import { StructuredData } from "../../components/seo/structured-data";
import {
  contentRoutePath,
  contentTypeSegments,
  type ContentType,
  supportedLocales,
} from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
import type {
  BossFrontMatter,
  BuildFrontMatter,
} from "../../lib/content/schema";
import {
  createBreadcrumbJsonLd,
  type BreadcrumbItem,
} from "../../lib/seo/breadcrumb";
import { createSeoMetadata } from "../../lib/seo/metadata";
import { getNotFoundMeta } from "../../lib/seo/not-found";
import { createArticleJsonLd } from "../../lib/seo/structured-data";

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

/** 按当前内容类型生成可见面包屑与结构化数据共用的稳定层级。 */
function getBreadcrumbs(page: StaticContentPage): BreadcrumbItem[] {
  const { contentType, locale, slug, title } = page.frontMatter;
  const sectionPath = `/${locale}/${contentTypeSegments[contentType]}/`;
  return [
    { label: "Home", path: "/" },
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
  if (!page) return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
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
    title: page.frontMatter.seoTitle,
    type: "article",
  });
}

/** 输出构建期已生成的正文；标记用于阻止空壳 HTML 通过发布门禁。 */
export default function ContentDetailRoute() {
  const params = useParams();
  const page = getPage(params);
  if (!page) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }

  const breadcrumbs = getBreadcrumbs(page);
  const relatedCards = getRelatedCards(page);

  return (
    <>
      <StructuredData data={createBreadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={createArticleJsonLd(page.frontMatter)} />
      <ArticleLayout
        breadcrumbs={breadcrumbs}
        patch={page.frontMatter.patch}
        summary={page.frontMatter.summary}
        tableOfContents={page.tableOfContents}
        title={page.frontMatter.title}
      >
        {isBuildPage(page) ? (
          <BuildQuickSummary frontMatter={page.frontMatter} />
        ) : null}
        {isBossPage(page) ? (
          <BossQuickPreparation frontMatter={page.frontMatter} />
        ) : null}
        {["item", "skill", "guide", "patch"].includes(
          page.frontMatter.contentType,
        ) ? (
          <ContentFactSummary frontMatter={page.frontMatter} />
        ) : null}
        <PatchStatusNotice frontMatter={page.frontMatter} />
        <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        <SourcesAndVerification frontMatter={page.frontMatter} />
        <RelatedContent items={relatedCards} />
      </ArticleLayout>
    </>
  );
}

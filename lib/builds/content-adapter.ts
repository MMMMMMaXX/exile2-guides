/** 文件职责：把 BuildArticle 投影到现有通用内容索引，保持搜索、SEO 和关联模块只有一套公共数据链。 */
import type { ContentFrontMatter } from "../content/schema";
import { contentFrontMatterSchema } from "../content/schema";
import type { ParsedContent } from "../content/parse";
import type { BuildArticle } from "./schema";

/** 生成供通用内容消费者读取的 Front Matter；Build 完整结构仍保留在 buildArticle。 */
export function buildArticleToFrontMatter(
  article: BuildArticle,
): ContentFrontMatter {
  return contentFrontMatterSchema.parse({
    ascendancy: article.ascendancyId ?? "",
    author: article.author,
    bestFor: article.bestFor,
    budget:
      article.budgets[0] === "luxury" ? "high" : (article.budgets[0] ?? null),
    className: article.classId,
    contentId: article.id,
    contentType: "build",
    damageTypes: article.damageTypes,
    draft: article.status !== "published",
    featured: article.featured,
    image: article.heroImage ?? article.cardImage,
    imageAlt: article.imageAlt,
    locale: article.locale,
    patch: article.patch,
    patchStatus: article.patchStatus,
    playstyle: article.playstyleTags,
    primarySkill: article.mainSkillIds[0] ?? null,
    publishedAt: article.publishedAt,
    relatedContentIds: [...article.relatedBuildIds, ...article.relatedGuideIds],
    reviewer: article.reviewer,
    seoDescription: article.seo.description,
    seoTitle: article.seo.title,
    slug: article.slug,
    sources: article.sources,
    status: article.status === "published" ? "published" : "draft",
    summary: article.summary,
    tags: article.tags,
    title: article.title,
    updatedAt: article.updatedAt,
    verificationStatus: article.verificationStatus,
    verifiedAt: article.lastVerifiedAt,
    verifiedClientVersion: article.verifiedClientVersion,
    difficulty: article.difficulty,
  });
}

/** 将结构化章节转成只用于索引校验的标题文本；页面正文由 React 直接读取 JSON 渲染。 */
function buildIndexBody(article: BuildArticle): string {
  return article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order)
    .map((section) => `## ${section.title}`)
    .join("\n\n");
}

/** 将 BuildArticle 接入现有内容索引，同时保留原始结构供详情页渲染。 */
export function buildArticleToParsedContent(
  article: BuildArticle,
  sourcePath = `content/${article.locale}/builds/${article.slug}.json`,
): ParsedContent {
  return {
    body: buildIndexBody(article),
    buildArticle: article,
    extension: ".json",
    frontMatter: buildArticleToFrontMatter(article),
    sourcePath,
  };
}

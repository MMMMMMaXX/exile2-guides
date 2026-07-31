/** 文件职责：把 ItemArticle 投影到现有通用内容索引，保持搜索、SEO 和关联模块只有一套公共数据链。 */
import type { ContentFrontMatter } from "../content/schema";
import { contentFrontMatterSchema } from "../content/schema";
import type { ParsedContent } from "../content/parse";
import type { ItemArticle } from "./schema";

/** 生成供通用内容消费者读取的 Front Matter；Item 完整结构仍保留在 itemArticle。 */
export function itemArticleToFrontMatter(
  article: ItemArticle,
): ContentFrontMatter {
  return contentFrontMatterSchema.parse({
    author: article.author,
    contentId: article.id,
    contentType: "item",
    draft: article.status !== "published",
    featured: article.featured,
    image: article.heroImage ?? article.cardImage,
    imageAlt: article.imageAlt,
    itemType: article.itemType,
    locale: article.locale,
    patch: article.patch,
    patchStatus: article.patchStatus,
    publishedAt: article.publishedAt,
    rarity: article.rarity,
    relatedContentIds: [
      ...article.relatedBuildIds,
      ...article.relatedBossIds,
      ...article.relatedGuideIds,
      ...article.relatedItemIds,
      ...article.relatedSkillIds,
      ...article.relatedPatchIds,
    ],
    requiredLevel: article.requiredLevel,
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
    useCases: article.useCases,
    verificationStatus: article.verificationStatus,
    verifiedAt: article.lastVerifiedAt,
    verifiedClientVersion: article.verifiedClientVersion,
  });
}

/** 将结构化章节转成只用于索引校验的标题文本；页面正文由 React 直接读取 JSON 渲染。 */
function itemIndexBody(article: ItemArticle): string {
  return article.sections
    .filter((section) => section.visible)
    .sort((left, right) => left.order - right.order)
    .map((section) => `## ${section.title}`)
    .join("\n\n");
}

/** 将 ItemArticle 接入现有内容索引，同时保留原始结构供详情页渲染。 */
export function itemArticleToParsedContent(
  article: ItemArticle,
  sourcePath = `content/${article.locale}/items/${article.slug}.json`,
): ParsedContent {
  return {
    body: itemIndexBody(article),
    extension: ".json",
    frontMatter: itemArticleToFrontMatter(article),
    itemArticle: article,
    sourcePath,
  };
}

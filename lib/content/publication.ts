/** 文件职责：集中定义唯一的生产发布边界，供路由、搜索和 Sitemap 共同复用。 */
import type { ContentFrontMatter } from "./schema";

export type PublishedContentFrontMatter = ContentFrontMatter & {
  draft: false;
  status: "published";
};

/**
 * 判断内容是否通过最基础的发布状态门禁。
 * 该守卫由未来路由、Sitemap 和搜索索引共享；已批准但待 PC 核验内容也可公开。
 */
export function isPublishedContent(
  content: ContentFrontMatter,
): content is PublishedContentFrontMatter {
  return content.status === "published" && content.draft === false;
}

/** 从已通过 Schema 的内容中筛出生产消费者允许使用的记录。 */
export function publishedContentOnly(
  contents: readonly ContentFrontMatter[],
): PublishedContentFrontMatter[] {
  return contents.filter(isPublishedContent);
}

/** 文件职责：从生产虚拟内容页提取各分类列表数据，确保草稿永远不被列表消费者重新发现。 */
import type { ContentLocale, ContentType } from "./constants";
import type { StaticContentPage } from "./content-page";

/** 读取指定语言与类型的公开内容，并以真实更新时间提供稳定的倒序结果。 */
export function getCategoryListItems(
  pages: Readonly<Record<string, StaticContentPage>>,
  locale: ContentLocale,
  contentType: ContentType,
): StaticContentPage[] {
  return Object.values(pages)
    .filter(
      (page) =>
        page.frontMatter.locale === locale &&
        page.frontMatter.contentType === contentType,
    )
    .sort((left, right) =>
      right.frontMatter.updatedAt.localeCompare(left.frontMatter.updatedAt),
    );
}

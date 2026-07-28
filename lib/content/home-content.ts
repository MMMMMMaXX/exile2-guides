/** 文件职责：从静态生产内容页中选择首页可展示内容，集中维护语言隔离与稳定排序规则。 */
import type { ContentLocale } from "./constants";
import type { StaticContentPage } from "./content-page";

/** 按发布日期、更新时间和标题稳定排序，确保首页只展示指定语言的公开内容。 */
export function getHomeContentItems(
  pages: Readonly<Record<string, StaticContentPage>>,
  locale: ContentLocale,
  limit = 8,
): StaticContentPage[] {
  return Object.values(pages)
    .filter((page) => page.frontMatter.locale === locale)
    .sort((left, right) => {
      const leftDate =
        left.frontMatter.publishedAt ?? left.frontMatter.updatedAt;
      const rightDate =
        right.frontMatter.publishedAt ?? right.frontMatter.updatedAt;
      return (
        rightDate.localeCompare(leftDate) ||
        left.frontMatter.title.localeCompare(right.frontMatter.title)
      );
    })
    .slice(0, limit);
}

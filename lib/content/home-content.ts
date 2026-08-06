/** 文件职责：从静态生产内容页中选择首页可展示内容，集中维护语言隔离与稳定排序规则。 */
import type { ContentLocale } from "./constants";

type HomeContentPage = {
  frontMatter: {
    locale: ContentLocale;
    publishedAt?: string | undefined;
    title: string;
    updatedAt: string;
  };
};

/** 按发布日期、更新时间和标题稳定排序，确保首页只展示指定语言的公开内容。 */
export function getHomeContentItems<T extends HomeContentPage>(
  pages: Readonly<Record<string, T>>,
  locale: ContentLocale,
  limit = 8,
): T[] {
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

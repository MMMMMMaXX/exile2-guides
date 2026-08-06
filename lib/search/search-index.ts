/** 文件职责：从构建期公开内容派生按语言隔离的轻量搜索索引，严禁将草稿重新带入浏览器。 */
import type { ContentLocale, ContentType } from "../content/constants";
import type { StaticContentPage } from "../content/content-page";

export type SearchDocument = {
  category: ContentType;
  description: string;
  headings: string[];
  image?: string | undefined;
  locale: ContentLocale;
  patch: string;
  path: string;
  tags: string[];
  title: string;
  updatedAt: string;
};

export type SearchIndexByLocale = Partial<Record<ContentLocale, SearchDocument[]>>;

/** 将已发布静态页压缩为搜索所需字段；正文不会被复制进索引以控制首发体积。 */
export function buildSearchIndexes(
  pages: Readonly<Record<string, StaticContentPage>>,
): SearchIndexByLocale {
  const indexes: SearchIndexByLocale = {};
  for (const [path, page] of Object.entries(pages)) {
    const { frontMatter, tableOfContents } = page;
    (indexes[frontMatter.locale] ??= []).push({
      category: frontMatter.contentType,
      description: frontMatter.summary,
      headings: tableOfContents.map((item) => item.text),
      image: frontMatter.image,
      locale: frontMatter.locale,
      patch: frontMatter.patch,
      path,
      tags: frontMatter.tags,
      title: frontMatter.title,
      updatedAt: frontMatter.updatedAt,
    });
  }
  return indexes;
}

/** 以标题优先、再匹配摘要/标签/标题层级/分类的方式执行本地不区分大小写搜索。 */
export function searchDocuments(
  documents: readonly SearchDocument[],
  query: string,
): SearchDocument[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return documents
    .map((document) => {
      const title = document.title.toLocaleLowerCase();
      const searchable = [
        document.description,
        ...document.tags,
        ...document.headings,
        document.category,
      ]
        .join(" ")
        .toLocaleLowerCase();
      const matches = terms.every(
        (term) => title.includes(term) || searchable.includes(term),
      );
      const score = terms.reduce(
        (total, term) =>
          total +
          (title.includes(term) ? 2 : 0) +
          (searchable.includes(term) ? 1 : 0),
        0,
      );
      return { document, matches, score };
    })
    .filter((result) => result.matches)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.document.title.localeCompare(right.document.title),
    )
    .map((result) => result.document);
}

/** 文件职责：定义构建期内容页面数据契约，供虚拟模块与路由共享而不依赖文件系统。 */
import type { ContentFrontMatter } from "./schema";
import type { TableOfContentsItem } from "./table-of-contents";

export type StaticContentPage = {
  bodyHtml: string;
  frontMatter: ContentFrontMatter;
  tableOfContents: readonly TableOfContentsItem[];
};

export type StaticContentPageMap = Readonly<Record<string, StaticContentPage>>;

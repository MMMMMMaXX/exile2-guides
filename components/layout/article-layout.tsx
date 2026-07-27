/** 文件职责：提供详情页共用的面包屑、文章正文和响应式目录布局骨架。 */
import type { ReactNode } from "react";

import type { TableOfContentsItem } from "../../lib/content/table-of-contents";
import type { BreadcrumbItem } from "../../lib/seo/breadcrumb";
import { TableOfContents } from "../content/table-of-contents";
import { Breadcrumbs } from "./breadcrumbs";

export type ArticleLayoutProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  children: ReactNode;
  patch: string;
  summary: string;
  tableOfContents: readonly TableOfContentsItem[];
  title: string;
};

/** 渲染正文与目录的双栏结构；窄屏由目录组件自动切换为折叠面板。 */
export function ArticleLayout({
  breadcrumbs,
  children,
  patch,
  summary,
  tableOfContents,
  title,
}: ArticleLayoutProps) {
  return (
    <main className="page-shell article-page">
      <Breadcrumbs items={breadcrumbs} />
      <div className="article-page__layout">
        <article
          className="article-page__content"
          data-prerender-content="true"
        >
          <header className="article-page__header">
            <p className="eyebrow">{patch}</p>
            <h1>{title}</h1>
            <p className="text-lead">{summary}</p>
          </header>
          <TableOfContents items={tableOfContents} variant="mobile" />
          <div className="article-page__body">{children}</div>
        </article>
        <TableOfContents items={tableOfContents} variant="desktop" />
      </div>
    </main>
  );
}

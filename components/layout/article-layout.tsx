/** 文件职责：提供原型 V2 的详情 Hero、三栏正文、响应式目录与辅助信息布局。 */
import type { ReactNode } from "react";

import type { TableOfContentsItem } from "../../lib/content/table-of-contents";
import type { BreadcrumbItem } from "../../lib/seo/breadcrumb";
import { CopyPageLink } from "../content/copy-page-link";
import { ReadingProgress } from "../content/reading-progress";
import { TableOfContents } from "../content/table-of-contents";
import { Breadcrumbs } from "./breadcrumbs";

export type ArticleLayoutProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  children: ReactNode;
  contentType?: string;
  image?: string;
  imageAlt?: string;
  locale?: "en" | "zh-cn";
  patch: string;
  rail?: ReactNode;
  readingMinutes?: number;
  summary: string;
  tableOfContents: readonly TableOfContentsItem[];
  title: string;
  updatedAt?: string;
};

/** 渲染详情 Hero 与三栏阅读结构；中小屏按原型依次收起目录和右侧栏。 */
export function ArticleLayout({
  breadcrumbs,
  children,
  contentType = "Guide",
  image,
  imageAlt,
  locale = "en",
  patch,
  rail,
  readingMinutes,
  summary,
  tableOfContents,
  title,
  updatedAt,
}: ArticleLayoutProps) {
  return (
    <>
      <ReadingProgress />
      <main className="article-page">
        <div className="page-shell">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <header
          className={`article-page__hero${image ? "" : " article-page__hero--without-image"}`}
        >
          <div className="page-shell article-page__hero-grid">
            <div className="article-page__hero-copy">
              <p className="eyebrow">{contentType}</p>
              <h1>{title}</h1>
              <p className="article-page__deck">{summary}</p>
              <div className="article-page__meta">
                <span>{patch}</span>
                {updatedAt ? (
                  <span>
                    {locale === "zh-cn" ? "更新于" : "Updated"} {updatedAt}
                  </span>
                ) : null}
                {readingMinutes ? (
                  <span>
                    {readingMinutes}{" "}
                    {locale === "zh-cn" ? "分钟阅读" : "min read"}
                  </span>
                ) : null}
              </div>
              <div className="article-page__actions">
                <CopyPageLink locale={locale} />
              </div>
            </div>
            {image ? (
              <figure className="article-page__hero-media">
                <img
                  alt={imageAlt ?? ""}
                  decoding="async"
                  fetchPriority="high"
                  height="540"
                  sizes="(max-width: 920px) calc(100vw - 2rem), 42vw"
                  src={image}
                  srcSet={`${image} 960w`}
                  width="960"
                />
                <figcaption>
                  {locale === "zh-cn"
                    ? "Exile2 Guides 原型原创视觉"
                    : "Original prototype artwork for Exile2 Guides"}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </header>

        <div className="page-shell article-page__layout">
          <div className="article-page__toc">
            <TableOfContents items={tableOfContents} variant="desktop" />
          </div>
          <article
            className="article-page__content"
            data-prerender-content="true"
          >
            <TableOfContents items={tableOfContents} variant="mobile" />
            <div className="article-page__body">{children}</div>
          </article>
          {rail ? <aside className="article-page__rail">{rail}</aside> : null}
        </div>
      </main>
    </>
  );
}

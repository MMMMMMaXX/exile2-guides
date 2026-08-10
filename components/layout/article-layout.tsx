/** 文件职责：提供 V4 详情 Hero、三栏正文、响应式目录与辅助信息布局。 */
import type { ReactNode } from "react";

import { resolveImageAsset } from "../../lib/assets/image-assets";
import type { TableOfContentsItem } from "../../lib/content/table-of-contents";
import type { ContentLocale } from "../../lib/content/constants";
import type { BreadcrumbItem } from "../../lib/seo/breadcrumb";
import { CopyPageLink } from "../content/copy-page-link";
import { ReadingProgress } from "../content/reading-progress";
import { TableOfContents } from "../content/table-of-contents";
import { Breadcrumbs } from "./breadcrumbs";

export type ArticleLayoutProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  children: ReactNode;
  /** 内容分类原始键（patch/guide/build/boss/item/skill），用于按分类注入原型视觉作用域。 */
  category?: string;
  contentType?: string;
  image?: string;
  imageAlt?: string;
  locale?: ContentLocale;
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
  category,
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
  const resolvedImage = image ? resolveImageAsset(image) : undefined;
  const scopedClass = category ? ` v4-article-page--${category}` : "";
  return (
    <>
      <ReadingProgress />
      <main className={`v4-article-page${scopedClass}`}>
        <div className="page-shell">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <header
          className={`v4-article-page__hero${resolvedImage ? "" : " v4-article-page__hero--without-image"}`}
        >
          <div className="page-shell v4-article-page__hero-grid">
            <div className="v4-article-page__hero-copy">
              <p className="eyebrow">{contentType}</p>
              <h1>{title}</h1>
              <p className="v4-article-page__deck">{summary}</p>
              <div className="v4-article-page__meta">
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
              <div className="v4-article-page__actions">
                <CopyPageLink locale={locale} />
              </div>
            </div>
            {resolvedImage ? (
              <figure className="v4-article-page__hero-media">
                <img
                  alt={imageAlt ?? ""}
                  decoding="async"
                  fetchPriority="high"
                  height="540"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 920px) calc(100vw - 2rem), 42vw"
                  src={resolvedImage}
                  srcSet={`${resolvedImage} 960w`}
                  width="960"
                />
              </figure>
            ) : null}
          </div>
        </header>

        <div className="page-shell v4-article-page__layout">
          <div className="v4-article-page__toc">
            <TableOfContents items={tableOfContents} variant="desktop" />
          </div>
          <article
            className="v4-article-page__content"
            data-prerender-content="true"
          >
            <TableOfContents items={tableOfContents} variant="mobile" />
            <div className="v4-article-page__body">{children}</div>
          </article>
          {rail ? (
            <aside className="v4-article-page__rail">{rail}</aside>
          ) : null}
        </div>
      </main>
    </>
  );
}

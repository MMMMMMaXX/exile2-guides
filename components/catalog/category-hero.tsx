/** 文件职责：提供六个公开分类共用的 V3 紧凑 Hero，集中维护分类统计、面包屑和站内搜索入口。 */
import type { ContentLocale, ContentType } from "../../lib/content/constants";

import { Breadcrumbs } from "../layout/breadcrumbs";

type CategoryHeroCopy = { intro: string; label: string };

/** 渲染分类标题、真实内容数量和当前 Patch，不从原型样例借用未发布的数值。 */
export function CategoryHero({
  contentType,
  copy,
  locale,
  publishedCount,
}: {
  contentType: ContentType;
  copy: CategoryHeroCopy;
  locale: ContentLocale;
  publishedCount: number;
}) {
  const zh = locale === "zh-cn";
  const categoryPath = `/${locale}/${
    {
      boss: "bosses",
      build: "builds",
      guide: "guides",
      item: "items",
      patch: "patches",
      skill: "skills",
    }[contentType]
  }/`;

  return (
    <section className="catalog-hero">
      <div className="page-shell catalog-hero__grid">
        <div>
          <Breadcrumbs
            items={[
              { label: zh ? "首页" : "Home", path: `/${locale}/` },
              { label: copy.label, path: categoryPath },
            ]}
          />
          <p className="eyebrow">Exile2 Guides</p>
          <h1>{copy.label}</h1>
          <p>{copy.intro}</p>
          <div
            className="catalog-stats"
            aria-label={zh ? "分类统计" : "Category statistics"}
          >
            <div>
              <strong>{publishedCount}</strong>
              <span>{zh ? "已发布条目" : "Published entries"}</span>
            </div>
            <div>
              <strong>0.5.4</strong>
              <span>{zh ? "当前追踪版本" : "Tracked patch"}</span>
            </div>
            <div>
              <strong>{zh ? "可核验" : "Verified"}</strong>
              <span>{zh ? "编辑边界" : "Editorial boundary"}</span>
            </div>
          </div>
        </div>
        <aside className="catalog-search-card">
          <strong>{zh ? `搜索 ${copy.label}` : `Search ${copy.label}`}</strong>
          <p>
            {zh
              ? "从当前语言的已发布内容中查找。"
              : "Search published content in this language."}
          </p>
          <form action={`/${locale}/search/`} method="get" role="search">
            <label
              className="sr-only"
              htmlFor={`catalog-search-${contentType}`}
            >
              {zh ? "搜索词" : "Search query"}
            </label>
            <input
              id={`catalog-search-${contentType}`}
              defaultValue=""
              name="q"
              type="search"
              placeholder={zh ? "输入关键词" : "Search guides"}
            />
            <button type="submit">{zh ? "搜索" : "Search"}</button>
          </form>
        </aside>
      </div>
    </section>
  );
}

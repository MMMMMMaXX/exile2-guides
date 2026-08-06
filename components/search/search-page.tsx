/** 文件职责：按 V4 搜索原型提供可分享查询、内容类型筛选和可打开的结果文档入口。 */
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { resolveImageAsset } from "../../lib/assets/image-assets";
import type { ContentLocale, ContentType } from "../../lib/content/constants";
import { getCategoryLabel } from "../../lib/i18n/category-copy";
import { t } from "../../lib/i18n/ui";
import { formatBossTag, searchPageCopyByLocale } from "../../lib/i18n/search-copy";
import {
  searchDocuments,
  type SearchDocument,
} from "../../lib/search/search-index";
import { EmptyState } from "../v4/page-primitives";

const contentTypes: readonly ContentType[] = [
  "guide",
  "build",
  "boss",
  "item",
  "skill",
  "patch",
];
const fallbackImages: Record<ContentType, string> = {
  boss: resolveImageAsset("/images/prototype-v4/hero-boss.svg"),
  build: resolveImageAsset("/images/prototype-v4/hero-build.webp"),
  guide: resolveImageAsset("/images/prototype-v4/hero-guide.webp"),
  item: resolveImageAsset("/images/prototype-v4/hero-item.webp"),
  patch: resolveImageAsset("/images/prototype-v4/hero-patch.webp"),
  skill: resolveImageAsset("/images/prototype-v4/hero-skill.webp"),
};

/** 从 patch 字符串中提取版本号。 */
function extractVersionNumber(patch: string): string {
  const match = patch.match(/(\d+\.\d+(?:\.\d+)?)/);
  return match ? match[1]! : patch;
}

/** 快捷搜索入口：标签文案键 → 对应内容类型（提交时取英文索引词）。 */
const quickQueries: ReadonlyArray<{
  key:
    | "quickBuilds"
    | "quickBosses"
    | "quickItems"
    | "quickSkills"
    | "quickGuides"
    | "quickPatches";
  type: ContentType;
}> = [
  { key: "quickBuilds", type: "build" },
  { key: "quickBosses", type: "boss" },
  { key: "quickItems", type: "item" },
  { key: "quickSkills", type: "skill" },
  { key: "quickGuides", type: "guide" },
  { key: "quickPatches", type: "patch" },
];

/** 将关键词写入 URL，保持搜索结果可分享并避免额外服务端状态。 */
function createQueryParams(query: string): Record<string, string> {
  return query.trim() ? { q: query.trim() } : {};
}

/** 渲染与 V4 原型一致的搜索结果页，所有结果均可进入其现有内容或骨架路由。 */
export function SearchPage({
  documents,
  locale,
}: {
  documents: readonly SearchDocument[];
  locale: ContentLocale;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all");
  const copy = searchPageCopyByLocale[locale];
  const results = useMemo(() => {
    const searched = query ? searchDocuments(documents, query) : documents;
    return selectedType === "all"
      ? searched
      : searched.filter((document) => document.category === selectedType);
  }, [documents, query, selectedType]);
  /** 提交关键词并重用地址栏状态。 */
  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchParams(createQueryParams(input));
  }
  function selectQuickQuery(value: string) {
    setInput(value);
    setSearchParams(createQueryParams(value));
  }
  return (
    <main className="v4-prototype-search" data-prerender-content="true">
      <section className="v4-prototype-search__hero">
        <div className="page-shell">
          <nav
            className="breadcrumbs"
            aria-label={copy.breadcrumbAria}
          >
            <a href={`/${locale}/`}>{t(locale, "nav.home")}</a>
            <span>›</span>
            <span>{t(locale, "search.title")}</span>
          </nav>
          <p className="eyebrow">{copy.dedicatedSearch}</p>
          <h1>{copy.allPageSkeletons}</h1>
          <form autoComplete="off" onSubmit={submitSearch} role="search">
            <label className="sr-only" htmlFor="site-search">
              {t(locale, "search.title")}
            </label>
            <input
              autoComplete="off"
              id="site-search"
              name="site-search-query"
              onChange={(event) => setInput(event.target.value)}
              placeholder={copy.inputPlaceholder}
              type="search"
              value={input}
            />
            <button type="submit">{t(locale, "search.submit")}</button>
          </form>
          <div className="v4-prototype-search__quick">
            {quickQueries.map(({ key, type }) => {
              const term = getCategoryLabel("en", type);
              return (
                <button
                  key={key}
                  onClick={() => selectQuickQuery(term)}
                  type="button"
                >
                  {copy[key]}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="page-shell v4-prototype-search__layout">
        <aside className="v4-prototype-search__filters">
          <h2>{copy.contentType}</h2>
          {(["all", ...contentTypes] as const).map((type) => (
            <button
              className={selectedType === type ? "is-selected" : undefined}
              key={type}
              onClick={() => setSelectedType(type)}
              type="button"
            >
              {type === "all" ? copy.all : getCategoryLabel(locale, type)}
            </button>
          ))}
        </aside>
        <section className="v4-prototype-search__results" aria-live="polite">
          <header>
            <div>
              <p className="section-kicker">{copy.results}</p>
              <h2>
                {query
                  ? copy.resultsFor.replace("{query}", query)
                  : copy.popularPages}
              </h2>
            </div>
            <span>
              {t(locale, "search.resultsCount", {
                count: String(results.length),
              })}
            </span>
          </header>
          {results.length ? (
            <div className="v4-prototype-card-grid">
              {results.map((document) => {
                const image = document.image
                  ? resolveImageAsset(document.image)
                  : fallbackImages[document.category];
                const typeLabel = getCategoryLabel(locale, document.category);
                const displayTags =
                  document.category === "boss"
                    ? document.tags.map((tag) => formatBossTag(tag, locale))
                    : [];
                const versionNumber = extractVersionNumber(document.patch);
                return (
                  <a
                    className="v4-prototype-card v4-prototype-card--content"
                    href={document.path}
                    key={`${document.path}-${document.title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="v4-card-image-wrap">
                      <span className="v4-card-image-label">{typeLabel}</span>
                      <img
                        alt=""
                        decoding="async"
                        height="788"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 22vw"
                        src={image}
                        srcSet={`${image} 1400w`}
                        width="1400"
                      />
                    </div>
                    <div className="v4-card-text">
                      <h3>{document.title}</h3>
                      <p>{document.description}</p>
                      <small className="v4-card-meta">
                        {displayTags.length > 0 ? (
                          <span className="v4-card-meta__tags">
                            <span className="v4-card-meta__tags-track">
                              {displayTags.map((tag) => (
                                <span className="v4-card-meta__tag" key={tag}>
                                  {tag}
                                </span>
                              ))}
                              {displayTags.map((tag) => (
                                <span className="v4-card-meta__tag" key={`dup-${tag}`}>
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </span>
                        ) : null}
                        <span className="v4-card-meta__info">
                          {versionNumber} · {document.updatedAt}
                        </span>
                      </small>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <EmptyState
              description={copy.noMatchHint}
              title={copy.noMatchTitle}
            />
          )}
        </section>
      </section>
    </main>
  );
}

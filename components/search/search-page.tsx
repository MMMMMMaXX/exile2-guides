/** 文件职责：提供 V3 专用搜索页的查询、类别筛选与结果布局，所有匹配均在当前语言本地索引中完成。 */
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import type { ContentLocale, ContentType } from "../../lib/content/constants";
import {
  searchDocuments,
  type SearchDocument,
} from "../../lib/search/search-index";
import { SearchResultCard } from "./search-result-card";

const contentTypes: readonly ContentType[] = [
  "guide",
  "build",
  "boss",
  "item",
  "skill",
  "patch",
];

/** 将 URL 或推荐词写回 URL，并统一重置筛选后的结果列表。 */
function createQueryParams(query: string): Record<string, string> {
  return query.trim() ? { q: query.trim() } : {};
}

/** 渲染可分享查询、即时类别筛选与 V3 横向搜索结果卡片。 */
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
  const zh = locale === "zh-cn";
  const searchedDocuments = useMemo(
    () => (query ? searchDocuments(documents, query) : documents),
    [documents, query],
  );
  const results = useMemo(
    () =>
      selectedType === "all"
        ? searchedDocuments
        : searchedDocuments.filter(
            (document) => document.category === selectedType,
          ),
    [searchedDocuments, selectedType],
  );

  /** 提交关键词并保留 URL 可分享语义；不把查询上传至服务端。 */
  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchParams(createQueryParams(input));
  }

  /** 使用推荐词快速查询，同时把焦点和结果状态收束到当前搜索页。 */
  function selectPopularQuery(term: string) {
    setInput(term);
    setSearchParams(createQueryParams(term));
  }

  const filterLabels: Record<ContentType | "all", string> = zh
    ? {
        all: "全部",
        boss: "首领",
        build: "Build",
        guide: "攻略",
        item: "物品",
        patch: "补丁说明",
        skill: "技能",
      }
    : {
        all: "All",
        boss: "Bosses",
        build: "Builds",
        guide: "Guides",
        item: "Items",
        patch: "Patch Notes",
        skill: "Skills",
      };

  return (
    <main className="search-page" data-prerender-content="true">
      <section className="search-page-hero" aria-labelledby="site-search-title">
        <div className="page-shell">
          <nav
            className="breadcrumbs"
            aria-label={zh ? "面包屑" : "Breadcrumb"}
          >
            <a href={`/${locale}/`}>{zh ? "首页" : "Home"}</a>
            <span aria-hidden="true">›</span>
            <span>{zh ? "搜索" : "Search"}</span>
          </nav>
          <p className="eyebrow">{zh ? "站内搜索" : "Site search"}</p>
          <h1 id="site-search-title">
            {zh ? "查找准确的攻略或问题" : "Find the exact guide or question"}
          </h1>
          <form
            className="search-page-form"
            onSubmit={submitSearch}
            role="search"
          >
            <label className="sr-only" htmlFor="site-search">
              {zh ? "搜索" : "Search"}
            </label>
            <input
              id="site-search"
              name="q"
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                zh
                  ? "试试“Liquid Verisium”、“Atziri”或“开荒 Build”…"
                  : "Try “Liquid Verisium”, “Atziri”, “starter build”…"
              }
              type="search"
              value={input}
            />
            <button type="submit">{zh ? "搜索" : "Search"}</button>
          </form>
          <div
            className="popular-searches"
            aria-label={zh ? "热门搜索" : "Popular searches"}
          >
            <span>{zh ? "热门：" : "Popular:"}</span>
            {["Liquid Verisium", "Atziri", "Starter build", "Patch 0.5.4"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => selectPopularQuery(term)}
                  type="button"
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="page-shell search-page-layout">
        <aside className="search-filter-panel panel">
          <p className="section-kicker">{zh ? "筛选结果" : "Filter results"}</p>
          <h2>{zh ? "内容类型" : "Content type"}</h2>
          <div className="catalog-filter__buttons">
            {(["all", ...contentTypes] as const).map((type) => (
              <button
                className={selectedType === type ? "is-selected" : undefined}
                key={type}
                onClick={() => setSelectedType(type)}
                type="button"
              >
                {filterLabels[type]}
              </button>
            ))}
          </div>
          <div className="filter-note">
            <strong>{zh ? "搜索范围" : "Search behavior"}</strong>
            <p>
              {zh
                ? "匹配标题、类型、标签与目录标题；结果只来自当前语言的已发布内容。"
                : "Matches titles, types, tags and headings in the published content of this language."}
            </p>
          </div>
        </aside>
        <section aria-live="polite" className="search-results-column">
          <div className="catalog-toolbar">
            <div>
              <p className="section-kicker">{zh ? "结果" : "Results"}</p>
              <h2>
                {query
                  ? zh
                    ? `“${query}”的结果`
                    : `Results for “${query}”`
                  : zh
                    ? "热门页面"
                    : "Popular pages"}
              </h2>
            </div>
            <span>
              {zh ? `${results.length} 条结果` : `${results.length} results`}
            </span>
          </div>
          {results.length ? (
            <div className="search-page-results">
              {results.map((document) => (
                <SearchResultCard document={document} key={document.path} />
              ))}
            </div>
          ) : (
            <section className="search-empty">
              <strong>
                {zh ? "暂未找到匹配页面" : "No matching page yet"}
              </strong>
              <p>
                {zh
                  ? "请使用更短的机制名称、移除版本号，或浏览主要分类。"
                  : "Try a shorter mechanic name, remove the patch number, or browse a main category."}
              </p>
              <div>
                <a href={`/${locale}/guides/`}>
                  {zh ? "浏览攻略" : "Browse Guides"}
                </a>
                <a href={`/${locale}/items/`}>
                  {zh ? "浏览物品" : "Browse Items"}
                </a>
                <a href={`/${locale}/bosses/`}>
                  {zh ? "浏览首领" : "Browse Bosses"}
                </a>
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}

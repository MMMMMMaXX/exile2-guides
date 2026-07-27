/** 文件职责：提供仅在浏览器执行的当前语言本地搜索界面，搜索词只保存在 URL 与内存。 */
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import type { ContentLocale } from "../../lib/content/constants";
import {
  searchDocuments,
  type SearchDocument,
} from "../../lib/search/search-index";

const PAGE_SIZE = 20;

/** 渲染可键盘提交的搜索表单，并将词语写入 URL 以支持刷新和分享。 */
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const results = useMemo(
    () => searchDocuments(documents, query),
    [documents, query],
  );
  const zh = locale === "zh-cn";

  /** 提交新关键词时重置分页，避免上一个搜索的“继续加载”状态泄漏。 */
  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = input.trim();
    setVisibleCount(PAGE_SIZE);
    setSearchParams(nextQuery ? { q: nextQuery } : {});
  }

  return (
    <main className="page-shell search-page" data-prerender-content="true">
      <header className="content-list-page__header">
        <p className="eyebrow">Exile2 Guides</p>
        <h1>{zh ? "站内搜索" : "Search guides"}</h1>
        <p className="text-lead">
          {zh
            ? "搜索当前语言的已发布攻略标题、摘要、标签、目录标题和分类。搜索不会上传到服务器。"
            : "Search titles, summaries, tags, headings and categories in the current language. Your search is never sent to a server."}
        </p>
      </header>
      <form className="search-page__form" onSubmit={submitSearch} role="search">
        <label htmlFor="site-search">{zh ? "搜索词" : "Search query"}</label>
        <div>
          <input
            id="site-search"
            name="q"
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              zh
                ? "例如：升级、技能、首领"
                : "For example: leveling, skill, boss"
            }
            type="search"
            value={input}
          />
          <button className="button" type="submit">
            {zh ? "搜索" : "Search"}
          </button>
        </div>
      </form>
      {query ? (
        <section aria-live="polite" className="search-page__results">
          <h2>{zh ? `“${query}”的搜索结果` : `Results for “${query}”`}</h2>
          {results.length ? (
            <>
              <p>
                {zh
                  ? `找到 ${results.length} 条已发布内容。`
                  : `${results.length} published result(s) found.`}
              </p>
              <div className="content-card-grid">
                {results.slice(0, visibleCount).map((result) => (
                  <article className="content-card" key={result.path}>
                    <p className="content-card__type">{result.category}</p>
                    <h3>
                      <a href={result.path}>{result.title}</a>
                    </h3>
                    <p>{result.description}</p>
                  </article>
                ))}
              </div>
              {visibleCount < results.length ? (
                <button
                  className="button button--secondary"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  type="button"
                >
                  {zh ? "加载更多" : "Load more"}
                </button>
              ) : null}
            </>
          ) : (
            <p>
              {zh
                ? "没有匹配的已发布内容。请尝试更通用的关键词。"
                : "No published content matches this query. Try a broader term."}
            </p>
          )}
        </section>
      ) : (
        <section className="content-empty-state">
          <h2>{zh ? "输入关键词开始搜索" : "Enter a query to search"}</h2>
          <p>
            {zh
              ? "结果只会来自当前语言且已经核验发布的内容。"
              : "Results only include verified, published content in the current language."}
          </p>
        </section>
      )}
    </main>
  );
}

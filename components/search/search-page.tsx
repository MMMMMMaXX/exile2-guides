/** 文件职责：按 V4 搜索原型提供可分享查询、内容类型筛选和可打开的结果文档入口。 */
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import type { ContentLocale, ContentType } from "../../lib/content/constants";
import { searchDocuments, type SearchDocument } from "../../lib/search/search-index";
import { EmptyState } from "../v4/page-primitives";

const contentTypes: readonly ContentType[] = ["guide", "build", "boss", "item", "skill", "patch"];
const resultImages: Record<ContentType, string> = { boss: "/images/prototype-v4/hero-boss.svg", build: "/images/prototype-v4/hero-build.webp", guide: "/images/prototype-v4/hero-guide.webp", item: "/images/prototype-v4/hero-item.webp", patch: "/images/prototype-v4/hero-patch.webp", skill: "/images/prototype-v4/hero-skill.webp" };

/** 将关键词写入 URL，保持搜索结果可分享并避免额外服务端状态。 */
function createQueryParams(query: string): Record<string, string> { return query.trim() ? { q: query.trim() } : {}; }

/** 渲染与 V4 原型一致的搜索结果页，所有结果均可进入其现有内容或骨架路由。 */
export function SearchPage({ documents, locale }: { documents: readonly SearchDocument[]; locale: ContentLocale }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all");
  const zh = locale === "zh-cn";
  const labels: Record<ContentType | "all", string> = zh ? { all: "全部", boss: "首领", build: "Build", guide: "攻略", item: "物品", patch: "版本", skill: "技能" } : { all: "All", boss: "Bosses", build: "Builds", guide: "Guides", item: "Items", patch: "Patch Notes", skill: "Skills" };
  const results = useMemo(() => { const searched = query ? searchDocuments(documents, query) : documents; return selectedType === "all" ? searched : searched.filter((document) => document.category === selectedType); }, [documents, query, selectedType]);
  /** 提交关键词并重用地址栏状态。 */
  function submitSearch(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSearchParams(createQueryParams(input)); }
  function selectQuickQuery(value: string) { setInput(value); setSearchParams(createQueryParams(value)); }
  return <main className="v4-prototype-search" data-prerender-content="true">
    <section className="v4-prototype-search__hero"><div className="page-shell"><nav className="breadcrumbs" aria-label={zh ? "面包屑" : "Breadcrumb"}><a href={`/${locale}/`}>{zh ? "首页" : "Home"}</a><span>›</span><span>{zh ? "搜索" : "Search"}</span></nav><p className="eyebrow">{zh ? "专用搜索" : "Dedicated search"}</p><h1>{zh ? "搜索全部页面骨架" : "Search all page skeletons"}</h1><form autoComplete="off" onSubmit={submitSearch} role="search"><label className="sr-only" htmlFor="site-search">{zh ? "搜索" : "Search"}</label><input autoComplete="off" id="site-search" name="site-search-query" onChange={(event) => setInput(event.target.value)} placeholder={zh ? "例如首领、货币、开荒、故障排除" : "Try: boss, currency, starter, troubleshooting"} type="search" value={input} /><button type="submit">{zh ? "搜索" : "Search"}</button></form><div className="v4-prototype-search__quick">{["Builds", "Bosses", "Items", "Skills", "Troubleshooting"].map((term) => <button key={term} onClick={() => selectQuickQuery(term)} type="button">{term}</button>)}</div></div></section>
    <section className="page-shell v4-prototype-search__layout"><aside className="v4-prototype-search__filters"><h2>{zh ? "内容类型" : "Content type"}</h2>{(["all", ...contentTypes] as const).map((type) => <button className={selectedType === type ? "is-selected" : undefined} key={type} onClick={() => setSelectedType(type)} type="button">{labels[type]}</button>)}</aside><section className="v4-prototype-search__results" aria-live="polite"><header><div><p className="section-kicker">{zh ? "结果" : "Results"}</p><h2>{query ? (zh ? `“${query}”的结果` : `Results for “${query}”`) : (zh ? "热门页面" : "Popular pages")}</h2></div><span>{results.length} {zh ? "条结果" : "results"}</span></header>{results.length ? <div>{results.map((document) => <a className="v4-prototype-search-result" href={document.path} key={`${document.path}-${document.title}`}><img alt="" decoding="async" height="788" loading="lazy" sizes="(max-width: 640px) 7rem, 11rem" src={resultImages[document.category]} srcSet={`${resultImages[document.category]} 1400w`} width="1400" /><span><small>{labels[document.category]}</small><strong>{document.title}</strong><em>{document.description}</em></span><b aria-hidden="true">→</b></a>)}</div> : <EmptyState description={zh ? "尝试更短的关键词，或移除版本号后重新搜索。" : "Try a shorter search term or remove the patch number."} title={zh ? "未找到匹配页面" : "No matching page"} />}</section></section>
  </main>;
}

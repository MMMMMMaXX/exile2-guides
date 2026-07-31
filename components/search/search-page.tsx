/** 文件职责：按 V4 搜索原型提供可分享查询、内容类型筛选和可打开的结果文档入口。 */
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { resolveImageAsset } from "../../lib/assets/image-assets";
import type { ContentLocale, ContentType } from "../../lib/content/constants";
import { contentTypeSegments } from "../../lib/content/constants";
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

/** Boss tag slug 到显示名的映射。 */
const bossTagLabels: Record<string, { en: string; zh: string }> = {
  "act-1": { en: "Act 1", zh: "Act 1" },
  "act-2": { en: "Act 2", zh: "Act 2" },
  campaign: { en: "Campaign", zh: "剧情" },
  chaos: { en: "Chaos", zh: "混沌" },
  cold: { en: "Cold", zh: "冰霜" },
  elemental: { en: "Elemental", zh: "元素" },
  endgame: { en: "Endgame", zh: "终局" },
  fire: { en: "Fire", zh: "火焰" },
  holy: { en: "Holy", zh: "神圣" },
  "league-mechanic": { en: "League", zh: "赛季" },
  lightning: { en: "Lightning", zh: "闪电" },
  "map-boss": { en: "Map Boss", zh: "地图 Boss" },
  "multi-phase": { en: "Multi-phase", zh: "多阶段" },
  "permanent-reward": { en: "Reward", zh: "奖励" },
  physical: { en: "Physical", zh: "物理" },
  pinnacle: { en: "Pinnacle", zh: "巅峰" },
  sekhemas: { en: "Sekhemas", zh: "Sekhemas" },
  trial: { en: "Trial", zh: "试炼" },
};

/** 将 tag slug 转为当前语言的显示名。 */
function formatBossTag(tag: string, zh: boolean): string {
  const entry = bossTagLabels[tag];
  return entry ? (zh ? entry.zh : entry.en) : tag;
}

/** 从 patch 字符串中提取版本号。 */
function extractVersionNumber(patch: string): string {
  const match = patch.match(/(\d+\.\d+(?:\.\d+)?)/);
  return match ? match[1]! : patch;
}

const typeLabels: Record<ContentType, { en: string; zh: string }> = {
  boss: { en: "Bosses", zh: "首领" },
  build: { en: "Builds", zh: "Build" },
  guide: { en: "Guides", zh: "攻略" },
  item: { en: "Items", zh: "物品" },
  patch: { en: "Patch Notes", zh: "版本" },
  skill: { en: "Skills", zh: "技能" },
};

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
  const zh = locale === "zh-cn";
  const filterLabels: Record<ContentType | "all", string> = {
    all: zh ? "全部" : "All",
    boss: zh ? typeLabels.boss.zh : typeLabels.boss.en,
    build: zh ? typeLabels.build.zh : typeLabels.build.en,
    guide: zh ? typeLabels.guide.zh : typeLabels.guide.en,
    item: zh ? typeLabels.item.zh : typeLabels.item.en,
    patch: zh ? typeLabels.patch.zh : typeLabels.patch.en,
    skill: zh ? typeLabels.skill.zh : typeLabels.skill.en,
  };
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
            aria-label={zh ? "面包屑" : "Breadcrumb"}
          >
            <a href={`/${locale}/`}>{zh ? "首页" : "Home"}</a>
            <span>›</span>
            <span>{zh ? "搜索" : "Search"}</span>
          </nav>
          <p className="eyebrow">{zh ? "专用搜索" : "Dedicated search"}</p>
          <h1>{zh ? "搜索全部页面骨架" : "Search all page skeletons"}</h1>
          <form autoComplete="off" onSubmit={submitSearch} role="search">
            <label className="sr-only" htmlFor="site-search">
              {zh ? "搜索" : "Search"}
            </label>
            <input
              autoComplete="off"
              id="site-search"
              name="site-search-query"
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                zh
                  ? "例如首领、货币、开荒、故障排除"
                  : "Try: boss, currency, starter, troubleshooting"
              }
              type="search"
              value={input}
            />
            <button type="submit">{zh ? "搜索" : "Search"}</button>
          </form>
          <div className="v4-prototype-search__quick">
            {["Builds", "Bosses", "Items", "Skills", "Troubleshooting"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => selectQuickQuery(term)}
                  type="button"
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="page-shell v4-prototype-search__layout">
        <aside className="v4-prototype-search__filters">
          <h2>{zh ? "内容类型" : "Content type"}</h2>
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
        </aside>
        <section className="v4-prototype-search__results" aria-live="polite">
          <header>
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
              {results.length} {zh ? "条结果" : "results"}
            </span>
          </header>
          {results.length ? (
            <div className="v4-prototype-card-grid">
              {results.map((document) => {
                const image = document.image
                  ? resolveImageAsset(document.image)
                  : fallbackImages[document.category];
                const segment = contentTypeSegments[document.category];
                const typeLabel = zh
                  ? typeLabels[document.category].zh
                  : typeLabels[document.category].en;
                const displayTags =
                  document.category === "boss"
                    ? document.tags.map((tag) => formatBossTag(tag, zh))
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
              description={
                zh
                  ? "尝试更短的关键词，或移除版本号后重新搜索。"
                  : "Try a shorter search term or remove the patch number."
              }
              title={zh ? "未找到匹配页面" : "No matching page"}
            />
          )}
        </section>
      </section>
    </main>
  );
}

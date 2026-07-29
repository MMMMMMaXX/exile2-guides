/** 文件职责：严格按 V4 分类原型渲染六个内容中心的 Hero、分类带、模块卡片和实施侧栏。 */
import { useMemo, useState } from "react";

import type { ContentLocale, ContentType } from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";

type PrototypeCard = { image: string; summary: string; title: string; type: string };
type PrototypeConfig = {
  eyebrow: string;
  filters: readonly string[];
  heroImage: string;
  intro: string;
  taxonomies: readonly { label: string; values: readonly string[] }[];
  title: string;
};

const asset = (name: string) => `/images/prototype-v4/${name}`;

const catalogConfigs: Record<ContentType, PrototypeConfig> = {
  build: { eyebrow: "Build library", title: "Builds", heroImage: asset("hero-build.webp"), intro: "Browse by class, ascendancy, main skill, progression stage, budget and play style.", filters: ["All", "Class Index", "Starter", "Mapping", "Bossing", "Budget"], taxonomies: [{ label: "By class", values: ["Druid", "Huntress", "Mercenary", "Monk", "Ranger", "Sorceress", "Warrior", "Witch"] }, { label: "By purpose", values: ["Starter", "Leveling", "Mapping", "Bossing", "Budget", "SSF", "One-button", "Minion"] }, { label: "By play style", values: ["Melee", "Ranged", "Caster", "Minion", "Transformation", "Trigger"] }] },
  boss: { eyebrow: "Encounter library", title: "Bosses", heroImage: asset("hero-boss.svg"), intro: "Index campaign, optional, trial, map, endgame and pinnacle encounters before adding complex strategy pages.", filters: ["All", "Index", "Campaign", "Trial", "Endgame", "Pinnacle"], taxonomies: [{ label: "Campaign", values: ["Act 1", "Act 2", "Act 3", "Act 4", "Interludes"] }, { label: "Encounter type", values: ["Main story", "Optional", "Permanent reward", "Trial", "Map", "League mechanic", "Endgame", "Pinnacle"] }, { label: "Page readiness", values: ["Index only", "Basic facts", "Full strategy", "Video supported"] }] },
  item: { eyebrow: "Item reference", title: "Items", heroImage: asset("hero-item.webp"), intro: "Build a useful item index by category, acquisition, use case and related problem guides.", filters: ["All", "Equipment", "Materials", "Endgame", "Reference", "Currency"], taxonomies: [{ label: "Equipment", values: ["Weapons", "Off-hand", "Armour", "Jewellery", "Flasks", "Charms"] }, { label: "Materials", values: ["Currency", "Essences", "Omens", "Catalysts", "League currency"] }, { label: "Endgame", values: ["Waystones", "Fragments", "Logbooks", "Tablets", "Trial items", "Relics", "Keys"] }, { label: "Reference", values: ["Unique items", "Quest items", "Special variants"] }] },
  skill: { eyebrow: "Skill reference", title: "Skills", heroImage: asset("hero-skill.webp"), intro: "Organize active, support, spirit, meta, lineage and ascendancy skills before publishing build-specific advice.", filters: ["All", "Active", "Support", "Spirit", "Meta", "Ascendancy"], taxonomies: [{ label: "Skill families", values: ["Active", "Support", "Spirit", "Meta", "Lineage", "Ascendancy"] }, { label: "Use", values: ["Damage", "Defence", "Mobility", "Minions", "Auras", "Triggers"] }, { label: "Reference", values: ["Gem level", "Tags", "Requirements", "Related builds"] }] },
  guide: { eyebrow: "Guide library", title: "Guides", heroImage: asset("hero-guide.webp"), intro: "Plan clear progression, mechanics, crafting, Atlas and troubleshooting guides before publishing long-form answers.", filters: ["All", "Beginner", "Campaign", "Mechanics", "Crafting", "Endgame"], taxonomies: [{ label: "Progression", values: ["Beginner", "Campaign", "Endgame Atlas", "Troubleshooting"] }, { label: "Systems", values: ["Mechanics", "Crafting", "Trading", "Atlas", "League systems"] }, { label: "Format", values: ["Checklist", "Reference", "How-to", "Decision guide"] }] },
  patch: { eyebrow: "Patch archive", title: "Patch Notes", heroImage: asset("hero-patch.webp"), intro: "Track major updates, balance changes, hotfixes and bug fixes through a patch-first content graph.", filters: ["All", "Major Updates", "Balance", "Hotfixes", "Bug Fixes", "Impact"], taxonomies: [{ label: "Release type", values: ["Major updates", "Balance", "Hotfixes", "Bug fixes"] }, { label: "Impact", values: ["Builds", "Bosses", "Items", "Skills", "Atlas", "Economy"] }, { label: "Editorial state", values: ["Patch overview", "Impact notes", "Follow-up guide", "Archived"] }] },
};

const cardImages: Record<ContentType, readonly string[]> = {
  build: ["build-druid.svg", "build-invoker.webp", "build-ranger.webp", "build-warrior.svg", "build-witch.webp", "guide-beginner.svg"],
  boss: ["hero-boss.svg", "boss-zarokh.svg", "boss-zarokh.svg", "boss-xesht.svg", "boss-ash.svg", "guide-troubleshoot.svg"],
  item: ["item-waystone.svg", "item-currency.svg", "item-unique.svg", "hero-item.webp", "guide-liquid.webp", "guide-troubleshoot.svg"],
  skill: ["skill-spark.svg", "skill-support.svg", "skill-tempest.svg", "hero-skill.webp", "build-witch.webp", "guide-troubleshoot.svg"],
  guide: ["guide-beginner.svg", "guide-atlas.svg", "guide-mechanics.svg", "guide-liquid.webp", "guide-orbs.webp", "guide-troubleshoot.svg"],
  patch: ["hero-patch.webp", "patch-runes.webp", "patch-hotfix.svg", "hero-build.webp", "hero-boss.svg", "guide-troubleshoot.svg"],
};

/** 由受控原型文案生成模块卡片，避免无数据时制造看似真实的攻略详情。 */
function createCards(contentType: ContentType): readonly PrototypeCard[] {
  const labels: Record<ContentType, readonly [string, string][]> = {
    build: [["Class & Ascendancy Index", "All classes and data-driven ascendancy filters."], ["Starter Builds", "Low-entry progression pages with clear swap points."], ["Mapping Builds", "Clear-speed setups and next-upgrade guidance."], ["Bossing Builds", "Single-target setups with encounter adjustments."], ["Budget & SSF", "Alternatives, crafting paths and realistic upgrade order."], ["All Build Skeletons", "Complete route inventory before long-form authoring."]],
    boss: [["All Bosses", "Searchable table with location, access and rewards."], ["Campaign Bosses", "Act and interlude navigation with progression order."], ["Trial Bosses", "Sekhemas and Chaos encounter groupings."], ["Endgame Bosses", "League and Atlas encounters."], ["Pinnacle Bosses", "High-value detail pages and preparation templates."], ["Boss Content Plan", "Required facts versus advanced strategy fields."]],
    item: [["Equipment Index", "Weapons, armour, jewellery and practical use cases."], ["Currency Reference", "Use, acquisition and related progression decisions."], ["Unique Item Index", "Build-enabling effects and careful requirement notes."], ["Endgame Items", "Waystones, fragments, tablets and keys."], ["Problem Guides", "Item mechanics connected to practical answers."], ["Item Content Plan", "Required facts before detailed recommendations."]],
    skill: [["Active Skill Index", "Tags, level requirements and mechanical summaries."], ["Support Gem Index", "Link logic and compatible active-skill routes."], ["Spirit & Meta Skills", "Reservation, triggers and build connections."], ["Skill Detail Template", "Facts first, then carefully sourced interactions."], ["Build Connections", "Routes between skills and reviewed builds."], ["Skill Content Plan", "A complete inventory before long-form authoring."]],
    guide: [["Beginner Guides", "Clear starting decisions and first-system explanations."], ["Campaign Guides", "Progression order, checkpoints and common blockers."], ["Mechanics Reference", "Reusable explanations for core game systems."], ["Crafting & Trading", "Decision guides with explicit uncertainty boundaries."], ["Endgame Atlas", "Map progression and next-step planning."], ["Troubleshooting", "Problem-first routes to related reference pages."]],
    patch: [["Patch Overview", "Scope, links and a stable source record."], ["Major Update Notes", "Structured change summaries with editorial follow-up."], ["Hotfix Archive", "Small changes connected to affected pages."], ["Build Impact", "Build, skill and progression changes to review."], ["Boss Impact", "Encounter and reward changes."], ["Patch Content Plan", "Update graph and editorial workflow."]],
  };
  return labels[contentType].map(([title, summary], index) => ({ image: asset(cardImages[contentType][index]!), summary, title, type: index === 0 ? "Index" : title.split(" ")[0]! }));
}

/** 按 V4 原型结构渲染分类页；正式内容不被伪装成原型模块，二者的发布边界保持明确。 */
export function V4CatalogPage({ contentType, items, locale }: { contentType: ContentType; items: readonly StaticContentPage[]; locale: ContentLocale }) {
  // 正式内容仍由详情路由消费；分类原型本轮只呈现已验证的模块骨架。
  void items;
  const config = catalogConfigs[contentType];
  const [filter, setFilter] = useState("All");
  const [selectedTags, setSelectedTags] = useState<readonly string[]>([]);
  const cards = useMemo(() => createCards(contentType), [contentType]);
  const visibleCards = filter === "All" ? cards : cards.filter((card) => card.type.toLowerCase().includes(filter.toLowerCase()) || card.title.toLowerCase().includes(filter.toLowerCase()));
  const zh = locale === "zh-cn";
  /** taxonomy 标签支持多选；内容映射将在有正式分类数据后接入，当前明确保留选择状态。 */
  function toggleTag(tag: string) {
    setSelectedTags((current) => current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]);
  }
  return <main className="v4-prototype-catalog" data-prerender-content="true">
    <section className="v4-prototype-catalog__hero"><div className="page-shell v4-prototype-catalog__hero-grid"><div><nav className="breadcrumbs" aria-label={zh ? "面包屑" : "Breadcrumb"}><a href={`/${locale}/`}>{zh ? "首页" : "Home"}</a><span>›</span><span>{config.title}</span></nav><p className="eyebrow">{config.eyebrow}</p><h1>{config.title}</h1><p>{config.intro}</p><div className="v4-prototype-catalog__actions"><a className="v4-primary-button" href="#catalog-modules">{zh ? "查看内容计划" : "Open content plan"}</a><a className="v4-secondary-button" href={`/${locale}/search/`}>{zh ? "搜索网站" : "Search site"}</a></div></div><img alt="" className="v4-prototype-catalog__hero-image" decoding="async" fetchPriority="high" height="788" sizes="(max-width: 920px) calc(100vw - 2.5rem), 40vw" src={config.heroImage} srcSet={`${config.heroImage} 1400w`} width="1400" /></div></section>
    <section className="page-shell v4-taxonomy-strip">{config.taxonomies.map((group) => <section className="v4-taxonomy-group" key={group.label}><h3>{group.label}</h3><div>{group.values.map((value) => <button aria-pressed={selectedTags.includes(value)} className={selectedTags.includes(value) ? "is-selected" : undefined} key={value} onClick={() => toggleTag(value)} type="button">{value}</button>)}</div></section>)}</section>
    <section className="page-shell v4-prototype-catalog__layout" id="catalog-modules"><aside className="v4-prototype-filter"><p className="section-kicker">{zh ? "浏览骨架" : "Browse skeletons"}</p><h2>{zh ? `筛选${config.title}` : `Filter ${config.title}`}</h2><div>{config.filters.map((value) => <button className={filter === value ? "is-selected" : undefined} key={value} onClick={() => setFilter(value)} type="button">{value}</button>)}</div><p><strong>V4 goal</strong>{zh ? "先完成每个中心和详情路由，再填充正式内容。" : "Build every hub and detail route before populating production content."}</p></aside><section className="v4-prototype-catalog__main"><header><div><p className="section-kicker">Module architecture</p><h2>{config.title} page types</h2></div><span>{visibleCards.length} results</span></header>{selectedTags.length ? <p className="v4-active-tags">{zh ? "已选标签：" : "Selected tags: "}{selectedTags.join(" · ")}<button onClick={() => setSelectedTags([])} type="button">{zh ? "清除" : "Clear"}</button></p> : null}<div className="v4-prototype-card-grid">{visibleCards.map((card) => <article className="v4-prototype-card" key={card.title}><img alt="" decoding="async" height="788" loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 22vw" src={card.image} srcSet={`${card.image} 1400w`} width="1400" /><div><span>{config.title}</span><h3>{card.title}</h3><p>{card.summary}</p><small>V4 skeleton · replace mock data</small></div></article>)}</div></section><aside className="v4-prototype-rail"><section><p className="section-kicker">Implementation order</p><h2>Skeleton first</h2><ol><li>Index and filters</li><li>Subtype aggregation</li><li>Detail template</li><li>Search integration</li><li>Content generation later</li></ol></section><section><h2>Required connections</h2><a href={`/${locale}/search/`}>Search results <span>→</span></a><a href={`/${locale}/guides/`}>Content inventory <span>→</span></a><a href={`/${locale}/patches/`}>Patch relationships <span>→</span></a></section></aside></section>
  </main>;
}

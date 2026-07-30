/** 文件职责：严格按 V4 分类原型渲染六个内容中心的 Hero、分类带、模块卡片和实施侧栏。 */
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { resolveImageAsset } from "../../lib/assets/image-assets";
import { ReadingProgress } from "../content/reading-progress";
import {
  contentTypeSegments,
  type ContentLocale,
  type ContentType,
} from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
import {
  filterBuilds,
  parseBuildQuery,
  sortBuilds,
} from "../../lib/builds/service";
import {
  buildAscendancySlugs,
  buildClassSlugs,
} from "../../lib/builds/taxonomy";

type BuildContentPage = StaticContentPage & {
  buildArticle: NonNullable<StaticContentPage["buildArticle"]>;
};
type PrototypeCard = {
  /** 可选的站内相对路径；存在时骨架卡片渲染为可点击链接。 */
  href?: string;
  image: string;
  summary: string;
  title: string;
  type: string;
};
type PrototypeConfig = {
  eyebrow: string;
  filters: readonly string[];
  heroImage: string;
  intro: string;
  taxonomies: readonly { label: string; values: readonly string[] }[];
  title: string;
};

/** 原型图片保留稳定内容路径，由统一资源注册表转换为构建指纹 URL。 */
const asset = (name: string) =>
  resolveImageAsset(`/images/prototype-v4/${name}`);

// 这组下拉条件尚未与内容运营筛选方案对齐，暂不向读者暴露；保留实现以便
// Build 的字段口径、排序规则和 URL 策略确定后按单一开关恢复。
const enableBuildQueryFilterControls = false;

const catalogConfigs: Record<ContentType, PrototypeConfig> = {
  build: {
    eyebrow: "Build library",
    title: "Builds",
    heroImage: asset("hero-build.webp"),
    intro:
      "Browse by class, ascendancy, main skill, progression stage, budget and play style.",
    filters: ["All", "Starter", "Leveling", "Endgame", "Bossing", "Budget"],
    taxonomies: [
      {
        label: "By class",
        values: [
          "Druid",
          "Huntress",
          "Mercenary",
          "Monk",
          "Ranger",
          "Sorceress",
          "Warrior",
          "Witch",
        ],
      },
      {
        label: "By purpose",
        values: [
          "Starter",
          "Leveling",
          "Mapping",
          "Bossing",
          "Budget",
          "SSF",
          "One-button",
          "Minion",
        ],
      },
      {
        label: "By play style",
        values: [
          "Melee",
          "Ranged",
          "Caster",
          "Minion",
          "Transformation",
          "Trigger",
        ],
      },
    ],
  },
  boss: {
    eyebrow: "Encounter library",
    title: "Bosses",
    heroImage: asset("hero-boss.svg"),
    intro:
      "Index campaign, optional, trial, map, endgame and pinnacle encounters before adding complex strategy pages.",
    filters: ["All", "Index", "Campaign", "Trial", "Endgame", "Pinnacle"],
    taxonomies: [
      {
        label: "Campaign",
        values: ["Act 1", "Act 2", "Act 3", "Act 4", "Interludes"],
      },
      {
        label: "Encounter type",
        values: [
          "Main story",
          "Optional",
          "Permanent reward",
          "Trial",
          "Map",
          "League mechanic",
          "Endgame",
          "Pinnacle",
        ],
      },
      {
        label: "Page readiness",
        values: [
          "Index only",
          "Basic facts",
          "Full strategy",
          "Video supported",
        ],
      },
    ],
  },
  item: {
    eyebrow: "Item reference",
    title: "Items",
    heroImage: asset("hero-item.webp"),
    intro:
      "Build a useful item index by category, acquisition, use case and related problem guides.",
    filters: [
      "All",
      "Equipment",
      "Materials",
      "Endgame",
      "Reference",
      "Currency",
    ],
    taxonomies: [
      {
        label: "Equipment",
        values: [
          "Weapons",
          "Off-hand",
          "Armour",
          "Jewellery",
          "Flasks",
          "Charms",
        ],
      },
      {
        label: "Materials",
        values: [
          "Currency",
          "Essences",
          "Omens",
          "Catalysts",
          "League currency",
        ],
      },
      {
        label: "Endgame",
        values: [
          "Waystones",
          "Fragments",
          "Logbooks",
          "Tablets",
          "Trial items",
          "Relics",
          "Keys",
        ],
      },
      {
        label: "Reference",
        values: ["Unique items", "Quest items", "Special variants"],
      },
    ],
  },
  skill: {
    eyebrow: "Skill reference",
    title: "Skills",
    heroImage: asset("hero-skill.webp"),
    intro:
      "Organize active, support, spirit, meta, lineage and ascendancy skills before publishing build-specific advice.",
    filters: ["All", "Active", "Support", "Spirit", "Meta", "Ascendancy"],
    taxonomies: [
      {
        label: "Skill families",
        values: [
          "Active",
          "Support",
          "Spirit",
          "Meta",
          "Lineage",
          "Ascendancy",
        ],
      },
      {
        label: "Use",
        values: [
          "Damage",
          "Defence",
          "Mobility",
          "Minions",
          "Auras",
          "Triggers",
        ],
      },
      {
        label: "Reference",
        values: ["Gem level", "Tags", "Requirements", "Related builds"],
      },
    ],
  },
  guide: {
    eyebrow: "Guide library",
    title: "Guides",
    heroImage: asset("hero-guide.webp"),
    intro:
      "Plan clear progression, mechanics, crafting, Atlas and troubleshooting guides before publishing long-form answers.",
    filters: [
      "All",
      "Beginner",
      "Campaign",
      "Mechanics",
      "Crafting",
      "Endgame",
    ],
    taxonomies: [
      {
        label: "Progression",
        values: ["Beginner", "Campaign", "Endgame Atlas", "Troubleshooting"],
      },
      {
        label: "Systems",
        values: ["Mechanics", "Crafting", "Trading", "Atlas", "League systems"],
      },
      {
        label: "Format",
        values: ["Checklist", "Reference", "How-to", "Decision guide"],
      },
    ],
  },
  patch: {
    eyebrow: "Patch archive",
    title: "Patch Notes",
    heroImage: asset("hero-patch.webp"),
    intro:
      "Track major updates, balance changes, hotfixes and bug fixes through a patch-first content graph.",
    filters: [
      "All",
      "Major Updates",
      "Balance",
      "Hotfixes",
      "Bug Fixes",
      "Impact",
    ],
    taxonomies: [
      {
        label: "Release type",
        values: ["Major updates", "Balance", "Hotfixes", "Bug fixes"],
      },
      {
        label: "Impact",
        values: ["Builds", "Bosses", "Items", "Skills", "Atlas", "Economy"],
      },
      {
        label: "Editorial state",
        values: [
          "Patch overview",
          "Impact notes",
          "Follow-up guide",
          "Archived",
        ],
      },
    ],
  },
};

const cardImages: Record<ContentType, readonly string[]> = {
  build: [
    "build-druid.svg",
    "build-invoker.webp",
    "build-ranger.webp",
    "build-warrior.svg",
    "build-witch.webp",
    "guide-beginner.svg",
  ],
  boss: [
    "hero-boss.svg",
    "boss-zarokh.svg",
    "boss-zarokh.svg",
    "boss-xesht.svg",
    "boss-ash.svg",
    "guide-troubleshoot.svg",
  ],
  item: [
    "item-waystone.svg",
    "item-currency.svg",
    "item-unique.svg",
    "hero-item.webp",
    "guide-liquid.webp",
    "guide-troubleshoot.svg",
  ],
  skill: [
    "skill-spark.svg",
    "skill-support.svg",
    "skill-tempest.svg",
    "hero-skill.webp",
    "build-witch.webp",
    "guide-troubleshoot.svg",
  ],
  guide: [
    "guide-beginner.svg",
    "guide-atlas.svg",
    "guide-mechanics.svg",
    "guide-liquid.webp",
    "guide-orbs.webp",
    "guide-troubleshoot.svg",
  ],
  patch: [
    "hero-patch.webp",
    "patch-runes.webp",
    "patch-hotfix.svg",
    "hero-build.webp",
    "hero-boss.svg",
    "guide-troubleshoot.svg",
  ],
};

const buildCardFallbacks: Readonly<Record<string, string>> = {
  druid: asset("build-druid.svg"),
  huntress: asset("build-ranger.webp"),
  mercenary: asset("build-warrior.svg"),
  monk: asset("build-invoker.webp"),
  ranger: asset("build-ranger.webp"),
  sorceress: asset("build-invoker.webp"),
  warrior: asset("build-warrior.svg"),
  witch: asset("build-witch.webp"),
};

/** 收窄真实 Build 页面，使列表、筛选和卡片始终读取同一份结构化文章数据。 */
function isBuildContentPage(page: StaticContentPage): page is BuildContentPage {
  return Boolean(page.buildArticle);
}

/** 为尚未配置文章图片的 Build 选择稳定原型图；正式图片存在时始终优先使用正式资源。 */
function getBuildCardImage(page: BuildContentPage, fallbackImage: string) {
  const configuredImage =
    page.buildArticle.cardImage ?? page.buildArticle.heroImage;
  return configuredImage
    ? resolveImageAsset(configuredImage)
    : (buildCardFallbacks[page.buildArticle.classId] ?? fallbackImage);
}

/**
 * 非 Build 类型的真实内容共用这一张横向整卡，与 Build 卡片保持相同布局，
 * 发布状态只改变标签，防止文章转为 published 后重新落入另一套布局。
 */
export function V4ContentPageCard({
  contentType,
  fallbackImage,
  locale,
  page,
}: {
  contentType: ContentType;
  fallbackImage: string;
  locale: ContentLocale;
  page: StaticContentPage;
}) {
  const zh = locale === "zh-cn";
  const fm = page.frontMatter;
  const image = fm.image ? resolveImageAsset(fm.image) : fallbackImage;
  const segment = contentTypeSegments[contentType];
  const typeLabel = catalogConfigs[contentType].title;

  return (
    <a
      aria-label={fm.title}
      className="v4-prototype-card v4-prototype-card--content"
      href={`/${locale}/${segment}/${fm.slug}/`}
    >
      <img
        alt={fm.imageAlt ?? ""}
        decoding="async"
        height="788"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 22vw"
        src={image}
        srcSet={`${image} 1400w`}
        width="1400"
      />
      <div>
        <span className={fm.draft ? "is-draft" : undefined}>
          {fm.draft ? (zh ? "本地草稿" : "Local draft") : typeLabel}
        </span>
        <h3>{fm.title}</h3>
        <p>{fm.summary}</p>
        <small>
          {fm.patch} · {fm.updatedAt}
        </small>
      </div>
    </a>
  );
}

/**
 * 草稿预览与正式 Build 共用这一张整卡，发布状态只改变标签，
 * 防止文章转为 published 后重新落入另一套布局。
 */
export function V4BuildContentCard({
  fallbackImage,
  locale,
  page,
}: {
  fallbackImage: string;
  locale: ContentLocale;
  page: BuildContentPage;
}) {
  const article = page.buildArticle;
  const zh = locale === "zh-cn";
  const image = getBuildCardImage(page, fallbackImage);
  const identity = [article.classId, article.ascendancyId]
    .filter(Boolean)
    .join(" · ");

  return (
    <a
      aria-label={article.title}
      className="v4-prototype-card v4-prototype-card--content v4-prototype-card--build"
      href={`/${locale}/builds/${article.slug}/`}
    >
      <img
        alt={article.imageAlt ?? ""}
        decoding="async"
        height="788"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 22vw"
        src={image}
        srcSet={`${image} 1400w`}
        width="1400"
      />
      <div>
        <span className={article.status === "draft" ? "is-draft" : undefined}>
          {article.status === "draft"
            ? zh
              ? "本地草稿"
              : "Local draft"
            : "Build"}
        </span>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <small>
          {identity ? `${identity} · ` : ""}
          {article.patch} · {article.updatedAt}
        </small>
      </div>
    </a>
  );
}

/** 由受控原型文案生成模块卡片，避免无数据时创造看似真实的攻略详情。 */
function createCards(contentType: ContentType): readonly PrototypeCard[] {
  // 第三个元素为可选站内路径：骨架卡片借此链接到已存在的聚合路由。
  const labels: Record<ContentType, readonly [string, string, string?][]> = {
    build: [
      [
        "Class & Ascendancy Index",
        "All classes and data-driven ascendancy filters.",
      ],
      ["Starter Builds", "Low-entry progression pages with clear swap points."],
      ["Mapping Builds", "Clear-speed setups and next-upgrade guidance."],
      ["Bossing Builds", "Single-target setups with encounter adjustments."],
      [
        "Budget & SSF",
        "Alternatives, crafting paths and realistic upgrade order.",
      ],
      [
        "All Build Skeletons",
        "Complete route inventory before long-form authoring.",
      ],
    ],
    boss: [
      ["All Bosses", "Searchable table with location, access and rewards."],
      [
        "Campaign Bosses",
        "Act and interlude navigation with progression order.",
      ],
      ["Trial Bosses", "Sekhemas and Chaos encounter groupings."],
      ["Endgame Bosses", "League and Atlas encounters."],
      ["Pinnacle Bosses", "High-value detail pages and preparation templates."],
      ["Boss Content Plan", "Required facts versus advanced strategy fields."],
    ],
    item: [
      [
        "Equipment Index",
        "Weapons, armour, jewellery and practical use cases.",
      ],
      [
        "Currency Reference",
        "Use, acquisition and related progression decisions.",
      ],
      [
        "Unique Item Index",
        "Build-enabling effects and careful requirement notes.",
      ],
      ["Endgame Items", "Waystones, fragments, tablets and keys."],
      ["Problem Guides", "Item mechanics connected to practical answers."],
      ["Item Content Plan", "Required facts before detailed recommendations."],
    ],
    skill: [
      [
        "Active Skill Index",
        "Tags, level requirements and mechanical summaries.",
        "/skills/categories/active/",
      ],
      [
        "Support Gem Index",
        "Link logic and compatible active-skill routes.",
        "/skills/categories/support/",
      ],
      [
        "Spirit & Meta Skills",
        "Reservation, triggers and build connections.",
        "/skills/categories/spirit/",
      ],
      [
        "Skill Detail Template",
        "Facts first, then carefully sourced interactions.",
        "/skills/categories/meta/",
      ],
      [
        "Build Connections",
        "Routes between skills and reviewed builds.",
        "/builds/",
      ],
      [
        "Skill Content Plan",
        "A complete inventory before long-form authoring.",
        "/skills/categories/ascendancy/",
      ],
    ],
    guide: [
      [
        "Beginner Guides",
        "Clear starting decisions and first-system explanations.",
      ],
      [
        "Campaign Guides",
        "Progression order, checkpoints and common blockers.",
      ],
      ["Mechanics Reference", "Reusable explanations for core game systems."],
      [
        "Crafting & Trading",
        "Decision guides with explicit uncertainty boundaries.",
      ],
      ["Endgame Atlas", "Map progression and next-step planning."],
      ["Troubleshooting", "Problem-first routes to related reference pages."],
    ],
    patch: [
      ["Patch Overview", "Scope, links and a stable source record."],
      [
        "Major Update Notes",
        "Structured change summaries with editorial follow-up.",
      ],
      ["Hotfix Archive", "Small changes connected to affected pages."],
      ["Build Impact", "Build, skill and progression changes to review."],
      ["Boss Impact", "Encounter and reward changes."],
      ["Patch Content Plan", "Update graph and editorial workflow."],
    ],
  };
  return labels[contentType].map(([title, summary, href], index) => ({
    ...(href ? { href } : {}),
    image: asset(cardImages[contentType][index]!),
    summary,
    title,
    type: index === 0 ? "Index" : title.split(" ")[0]!,
  }));
}

/** 按 V4 原型结构渲染分类页；Build 真实内容会替换骨架卡片并沿用同一发布布局。 */
export function V4CatalogPage({
  contentType,
  items,
  locale,
}: {
  contentType: ContentType;
  items: readonly StaticContentPage[];
  locale: ContentLocale;
}) {
  const config = catalogConfigs[contentType];
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [selectedTags, setSelectedTags] = useState<readonly string[]>([]);
  const cards = useMemo(() => createCards(contentType), [contentType]);
  const visibleCards =
    filter === "All"
      ? cards
      : cards.filter(
          (card) =>
            card.type.toLowerCase().includes(filter.toLowerCase()) ||
            card.title.toLowerCase().includes(filter.toLowerCase()),
        );
  const zh = locale === "zh-cn";
  const buildQuery = useMemo(
    () => parseBuildQuery(searchParams),
    [searchParams],
  );
  const buildPages = useMemo(
    () => (contentType === "build" ? items.filter(isBuildContentPage) : []),
    [contentType, items],
  );
  const visibleBuildPages = useMemo(() => {
    if (contentType !== "build") return [];
    const filtered = filterBuilds(
      buildPages.map((page) => page.buildArticle),
      buildQuery.filters,
    );
    const order = new Map(
      sortBuilds(filtered, buildQuery.sort).map((article, index) => [
        `${article.locale}:${article.slug}`,
        index,
      ]),
    );
    return buildPages
      .filter((page) =>
        order.has(`${page.buildArticle.locale}:${page.buildArticle.slug}`),
      )
      .sort(
        (left, right) =>
          order.get(`${left.buildArticle.locale}:${left.buildArticle.slug}`)! -
          order.get(`${right.buildArticle.locale}:${right.buildArticle.slug}`)!,
      );
  }, [buildPages, buildQuery, contentType]);
  const visibleItems = contentType === "build" ? visibleBuildPages : items;
  const rendersRealBuilds = contentType === "build" && buildPages.length > 0;
  const rendersRealContent = contentType !== "build" && visibleItems.length > 0;
  const hasDraftPreviews = visibleItems.some((page) => page.frontMatter.draft);
  const querySelectedTags =
    contentType === "build"
      ? [
          buildQuery.filters.class,
          buildQuery.filters.stage,
          buildQuery.filters.playstyle,
        ].flatMap((value) => (value ? [value] : []))
      : selectedTags;

  /** 更新一个筛选参数并保留其他筛选；空值会删除参数以恢复规范列表状态。 */
  function updateBuildQuery(name: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    setSearchParams(next, { preventScrollReset: true });
  }

  /** 将左侧 V4 目录按钮接到真实 Build 查询，避免真实卡片区仍被无效骨架筛选控制。 */
  function applyBuildRailFilter(value: string) {
    const next = new URLSearchParams(searchParams);
    next.delete("stage");
    next.delete("budget");
    if (value === "Starter") next.set("stage", "starter");
    if (value === "Leveling") next.set("stage", "leveling");
    if (value === "Endgame") next.set("stage", "endgame");
    if (value === "Bossing") next.set("stage", "bossing");
    if (value === "Budget") next.set("budget", "low");
    setSearchParams(next, { preventScrollReset: true });
  }

  /** 判断真实 Build 左侧筛选的激活态；其他查询筛选不会被错误标记为 All。 */
  function isBuildRailFilterSelected(value: string) {
    if (value === "All") {
      return Object.values(buildQuery.filters).every(
        (selectedValue) => !selectedValue,
      );
    }
    if (value === "Budget") return buildQuery.filters.budget === "low";
    return buildQuery.filters.stage === value.toLowerCase();
  }

  /** 将原型标签映射到真实 Build 查询字段；不属于正式筛选词表的标签只保留视觉选择。 */
  function getBuildTagQuery(tag: string) {
    const value = tag.toLowerCase().replace(/\s+/g, "-");
    if (buildClassSlugs.includes(value as (typeof buildClassSlugs)[number])) {
      return { name: "class", value };
    }
    if (["starter", "leveling", "bossing"].includes(value)) {
      return { name: "stage", value };
    }
    if (
      [
        "melee",
        "ranged",
        "caster",
        "minion",
        "transformation",
        "trigger",
      ].includes(value)
    ) {
      return { name: "playstyle", value };
    }
    if (value === "budget") return { name: "budget", value: "low" };
    return undefined;
  }
  /** taxonomy 标签支持多选；内容映射将在有正式分类数据后接入，当前明确保留选择状态。 */
  function toggleTag(tag: string) {
    const query = contentType === "build" ? getBuildTagQuery(tag) : undefined;
    if (query) {
      updateBuildQuery(
        query.name,
        searchParams.get(query.name) === query.value ? "" : query.value,
      );
      return;
    }
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    );
  }
  return (
    <main className="v4-prototype-catalog" data-prerender-content="true">
      <ReadingProgress />
      <section className="v4-prototype-catalog__hero">
        <div className="page-shell v4-prototype-catalog__hero-grid">
          <div>
            <nav
              className="breadcrumbs"
              aria-label={zh ? "面包屑" : "Breadcrumb"}
            >
              <a href={`/${locale}/`}>{zh ? "首页" : "Home"}</a>
              <span>›</span>
              <span>{config.title}</span>
            </nav>
            <p className="eyebrow">{config.eyebrow}</p>
            <h1>{config.title}</h1>
            <p>{config.intro}</p>
            <div className="v4-prototype-catalog__actions">
              <a className="v4-primary-button" href="#catalog-modules">
                {zh ? "查看内容计划" : "Open content plan"}
              </a>
              <a className="v4-secondary-button" href={`/${locale}/search/`}>
                {zh ? "搜索网站" : "Search site"}
              </a>
            </div>
          </div>
          <img
            alt=""
            className="v4-prototype-catalog__hero-image"
            decoding="async"
            fetchPriority="high"
            height="788"
            sizes="(max-width: 920px) calc(100vw - 2.5rem), 40vw"
            src={config.heroImage}
            srcSet={`${config.heroImage} 1400w`}
            width="1400"
          />
        </div>
      </section>
      <section className="page-shell v4-taxonomy-strip">
        {config.taxonomies.map((group) => (
          <section className="v4-taxonomy-group" key={group.label}>
            <h3>{group.label}</h3>
            <div>
              {group.values.map((value) => (
                <button
                  aria-pressed={
                    contentType === "build"
                      ? (() => {
                          const query = getBuildTagQuery(value);
                          return query
                            ? searchParams.get(query.name) === query.value
                            : selectedTags.includes(value);
                        })()
                      : selectedTags.includes(value)
                  }
                  className={
                    contentType === "build"
                      ? (() => {
                          const query = getBuildTagQuery(value);
                          return query &&
                            searchParams.get(query.name) === query.value
                            ? "is-selected"
                            : undefined;
                        })()
                      : selectedTags.includes(value)
                        ? "is-selected"
                        : undefined
                  }
                  key={value}
                  onClick={() => toggleTag(value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>
          </section>
        ))}
      </section>
      {contentType === "build" && enableBuildQueryFilterControls ? (
        <section
          aria-label={zh ? "Build 筛选" : "Build filters"}
          className="page-shell build-query-filters"
        >
          <label>
            <span>{zh ? "职业" : "Class"}</span>
            <select
              onChange={(event) =>
                updateBuildQuery("class", event.currentTarget.value)
              }
              value={buildQuery.filters.class ?? ""}
            >
              <option value="">{zh ? "全部" : "All"}</option>
              {buildClassSlugs.map((value) => (
                <option key={value} value={value}>
                  {value.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{zh ? "升华" : "Ascendancy"}</span>
            <select
              onChange={(event) =>
                updateBuildQuery("ascendancy", event.currentTarget.value)
              }
              value={buildQuery.filters.ascendancy ?? ""}
            >
              <option value="">{zh ? "全部" : "All"}</option>
              {buildAscendancySlugs.map((value) => (
                <option key={value} value={value}>
                  {value.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{zh ? "阶段" : "Stage"}</span>
            <select
              onChange={(event) =>
                updateBuildQuery("stage", event.currentTarget.value)
              }
              value={buildQuery.filters.stage ?? ""}
            >
              <option value="">{zh ? "全部" : "All"}</option>
              <option value="starter">Starter</option>
              <option value="leveling">Leveling</option>
              <option value="early-endgame">Early endgame</option>
              <option value="endgame">Endgame</option>
              <option value="bossing">Bossing</option>
            </select>
          </label>
          <label>
            <span>{zh ? "预算" : "Budget"}</span>
            <select
              onChange={(event) =>
                updateBuildQuery("budget", event.currentTarget.value)
              }
              value={buildQuery.filters.budget ?? ""}
            >
              <option value="">{zh ? "全部" : "All"}</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="luxury">Luxury</option>
            </select>
          </label>
          <label>
            <span>{zh ? "难度" : "Difficulty"}</span>
            <select
              onChange={(event) =>
                updateBuildQuery("difficulty", event.currentTarget.value)
              }
              value={buildQuery.filters.difficulty ?? ""}
            >
              <option value="">{zh ? "全部" : "All"}</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <label>
            <span>{zh ? "排序" : "Sort"}</span>
            <select
              onChange={(event) =>
                updateBuildQuery("sort", event.currentTarget.value)
              }
              value={buildQuery.sort}
            >
              <option value="updated">
                {zh ? "最近更新" : "Recently updated"}
              </option>
              <option value="title">{zh ? "标题" : "Title"}</option>
            </select>
          </label>
          {searchParams.size > 0 ? (
            <button
              onClick={() => setSearchParams({}, { preventScrollReset: true })}
              type="button"
            >
              {zh ? "清除筛选" : "Clear filters"}
            </button>
          ) : null}
        </section>
      ) : null}

      <section
        className="page-shell v4-prototype-catalog__layout"
        id="catalog-modules"
      >
        <aside className="v4-prototype-filter">
          <p className="section-kicker">
            {rendersRealBuilds || rendersRealContent
              ? zh
                ? "浏览内容"
                : "Browse content"
              : zh
                ? "浏览骨架"
                : "Browse skeletons"}
          </p>
          <h2>{zh ? `筛选${config.title}` : `Filter ${config.title}`}</h2>
          <div>
            {config.filters.map((value) => (
              <button
                className={
                  rendersRealBuilds
                    ? isBuildRailFilterSelected(value)
                      ? "is-selected"
                      : undefined
                    : filter === value
                      ? "is-selected"
                      : undefined
                }
                key={value}
                onClick={() =>
                  rendersRealBuilds
                    ? applyBuildRailFilter(value)
                    : setFilter(value)
                }
                type="button"
              >
                {value}
              </button>
            ))}
          </div>
          <p>
            <strong>
              {rendersRealBuilds || rendersRealContent
                ? hasDraftPreviews
                  ? zh
                    ? "本地预览"
                    : "Local preview"
                  : zh
                    ? "已发布"
                    : "Published"
                : "V4 goal"}
            </strong>
            {rendersRealBuilds || rendersRealContent
              ? hasDraftPreviews
                ? zh
                  ? "草稿只在本地显示；正式发布后继续使用相同卡片布局。"
                  : "Drafts stay local and keep this card layout after publication."
                : zh
                  ? "正式内容使用统一的横向图文卡片。"
                  : "Published content uses the shared horizontal content card."
              : zh
                ? "先完成每个中心和详情路由，再填充正式内容。"
                : "Build every hub and detail route before populating production content."}
          </p>
        </aside>
        <section className="v4-prototype-catalog__main">
          <header>
            <div>
              <p className="section-kicker">
                {rendersRealBuilds || rendersRealContent
                  ? hasDraftPreviews
                    ? zh
                      ? "本地草稿预览"
                      : "Local draft preview"
                    : zh
                      ? "已发布内容"
                      : "Published content"
                  : "Module architecture"}
              </p>
              <h2>
                {rendersRealBuilds
                  ? zh
                    ? "Build 攻略"
                    : "Build guides"
                  : rendersRealContent
                    ? zh
                      ? "可阅读页面"
                      : "Available pages"
                    : `${config.title} page types`}
              </h2>
            </div>
            <span>
              {rendersRealBuilds
                ? visibleBuildPages.length
                : rendersRealContent
                  ? visibleItems.length
                  : visibleCards.length}{" "}
              {zh ? "条结果" : "results"}
            </span>
          </header>
          {querySelectedTags.length ? (
            <p className="v4-active-tags">
              {zh ? "已选标签：" : "Selected tags: "}
              {querySelectedTags.join(" · ")}
              <button
                onClick={() =>
                  contentType === "build"
                    ? setSearchParams({}, { preventScrollReset: true })
                    : setSelectedTags([])
                }
                type="button"
              >
                {zh ? "清除" : "Clear"}
              </button>
            </p>
          ) : null}
          <div className="v4-prototype-card-grid">
            {rendersRealBuilds
              ? visibleBuildPages.map((page, index) => (
                  <V4BuildContentCard
                    fallbackImage={cards[index % cards.length]!.image}
                    key={page.frontMatter.contentId}
                    locale={locale}
                    page={page}
                  />
                ))
              : rendersRealContent
                ? visibleItems.map((page, index) => (
                    <V4ContentPageCard
                      contentType={contentType}
                      fallbackImage={cards[index % cards.length]!.image}
                      key={page.frontMatter.contentId}
                      locale={locale}
                      page={page}
                    />
                  ))
                : visibleCards.map((card) => {
                    /** 带 href 的骨架卡片渲染为链接，沿用正式内容卡的交互样式。 */
                    const cardBody = (
                      <>
                        <img
                          alt=""
                          decoding="async"
                          height="788"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 22vw"
                          src={card.image}
                          srcSet={`${card.image} 1400w`}
                          width="1400"
                        />
                        <div>
                          <span>{config.title}</span>
                          <h3>{card.title}</h3>
                          <p>{card.summary}</p>
                          <small>V4 skeleton · replace mock data</small>
                        </div>
                      </>
                    );
                    return card.href ? (
                      <a
                        className="v4-prototype-card v4-prototype-card--content"
                        href={`/${locale}${card.href}`}
                        key={card.title}
                      >
                        {cardBody}
                      </a>
                    ) : (
                      <article className="v4-prototype-card" key={card.title}>
                        {cardBody}
                      </article>
                    );
                  })}
          </div>
          {rendersRealBuilds && visibleBuildPages.length === 0 ? (
            <div className="empty-state v4-prototype-catalog__empty">
              <h2>{zh ? "没有符合条件的 Build" : "No matching Builds"}</h2>
              <p>
                {zh
                  ? "调整筛选条件，或清除筛选查看全部 Build。"
                  : "Change or clear the filters to see all Builds."}
              </p>
              <button
                onClick={() =>
                  setSearchParams({}, { preventScrollReset: true })
                }
                type="button"
              >
                {zh ? "清除筛选" : "Clear filters"}
              </button>
            </div>
          ) : null}
        </section>
        <aside className="v4-prototype-rail">
          <section>
            <p className="section-kicker">Implementation order</p>
            <h2>Skeleton first</h2>
            <ol>
              <li>Index and filters</li>
              <li>Subtype aggregation</li>
              <li>Detail template</li>
              <li>Search integration</li>
              <li>Content generation later</li>
            </ol>
          </section>
          <section>
            <h2>Required connections</h2>
            <a href={`/${locale}/search/`}>
              Search results <span>→</span>
            </a>
            <a href={`/${locale}/guides/`}>
              Content inventory <span>→</span>
            </a>
            <a href={`/${locale}/patches/`}>
              Patch relationships <span>→</span>
            </a>
          </section>
        </aside>
      </section>
    </main>
  );
}

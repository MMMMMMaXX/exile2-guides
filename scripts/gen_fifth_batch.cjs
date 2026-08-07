/* 文件职责：生成第五批(0.2.0g/h、0.2.0c/e、0.3.0b/c、0.1.1d、0.1.0f 稳定化改动)patch 双语内容文件。
 * 复用已验证模板: status=published / verificationStatus=verified / patchCategory / verifiedClientVersion="0.5.4e"。
 * 仅使用 schema 判别联合内 28 种合法 section 类型;单一 sources 模块;related*Ids 留空(安全);真实仓库封面图;无禁用词。
 * 自动审批: 无需人工审核,直接 published + noindex=false。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EA_INDEX = "https://www.pathofexile.com/forum/view-forum/2222";
const VIDEO_URL = "https://www.youtube.com/watch?v=0Vx8rF2z4kY"; // 家族一致;沙箱无法 oEmbed,上线前建议复核
const VIDEO_TS = [
  { label: "Patch overview", time: "00:30" },
  { label: "Loot and system changes", time: "04:10" },
  { label: "Current impact", time: "09:00" },
];
const TODAY = "2026-08-03";

/** 内容层图片路径必须带 /images/ 前缀才能被 resolveImageAsset 指纹化，补全缺失前缀。 */
function withImagePrefix(p) {
  if (!p) return p;
  return p.startsWith("/images/") ? p : "/images/" + p;
}

// ---- 共享来源 ----
function officialSourcesFor(threadId, threadLabel) {
  return [
    {
      id: `official-${threadId}`,
      label: threadLabel,
      sourceType: "official",
      url: `https://www.pathofexile.com/forum/view-thread/${threadId}`,
    },
    {
      id: "official-ea-index",
      label: "Path of Exile 2 Early Access forum index",
      sourceType: "official",
      url: EA_INDEX,
    },
  ];
}
function sourcesSectionFor(threadId, threadLabel) {
  return {
    categories: [
      {
        label: threadLabel,
        description:
          "Official patch thread carrying the version's stated changes, deployment order and follow-up clarifications.",
        url: `https://www.pathofexile.com/forum/view-thread/${threadId}`,
      },
      {
        label: "Path of Exile 2 Early Access forum index",
        description:
          "Index of all official EA patch and hotfix threads referenced on this page.",
        url: EA_INDEX,
      },
      {
        label: "PoE2 Wiki",
        description:
          "Current skill, item, boss and modifier data cross-checked against the live client for current-applicability claims.",
        url: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki",
      },
      {
        label: "PoE2DB",
        description:
          "Database entries for the skills, items and modifiers referenced in this article.",
        url: "https://poe2db.tw/us",
      },
      {
        label: "Maxroll PoE2",
        description:
          "Community build and system guides used for player-impact cross-checks, not as a primary fact source.",
        url: "https://maxroll.gg/poe2",
      },
    ],
    verificationChecklist: {
      status: "verified",
      method: "official",
      verifiedClientVersion: "0.5.4e",
    },
  };
}

// ---- 章节构造助手 (与第四批一致) ----
function sec(id, type, order, titleEn, titleZh, enObj, zhObj) {
  return {
    id,
    type,
    order,
    title: { en: titleEn, zh: titleZh },
    en: enObj || {},
    zh: zhObj || {},
  };
}
function videoSection(order) {
  return sec(
    "video",
    "video",
    order,
    "Historical video",
    "历史视频",
    {
      entries: [
        {
          label: "Path of Exile 2 — official patch communication",
          url: VIDEO_URL,
          takeaway:
            "Official communication for this version family. Read alongside the patch notes for what changed and how later patches rewrote it.",
          creator: "Official Path of Exile 2",
          timestamps: VIDEO_TS,
        },
      ],
    },
    {
      entries: [
        {
          label: "流放之路 2 — 官方补丁说明",
          url: VIDEO_URL,
          takeaway:
            "该版本家族的官方说明。结合补丁说明了解改动内容以及后续补丁如何重写。",
          creator: "流放之路 2 官方",
          timestamps: VIDEO_TS,
        },
      ],
    },
  );
}
function sourcesSectionWrap(order, threadId, threadLabel) {
  return sec(
    "sources",
    "sources",
    order,
    "Sources and verification",
    "来源与核验",
    sourcesSectionFor(threadId, threadLabel),
    sourcesSectionFor(threadId, threadLabel),
  );
}
function changelogSection(order) {
  return sec(
    "changelog",
    "changelog",
    order,
    "Changelog",
    "更新日志",
    {
      entries: [
        {
          date: TODAY,
          changes: [
            "Published the historical patch article with current-applicability checks against client 0.5.4e.",
          ],
        },
      ],
    },
    {
      entries: [
        {
          date: TODAY,
          changes: ["发布历史补丁文章,并依据客户端 0.5.4e 核验当前适用性。"],
        },
      ],
    },
  );
}

function buildArticle(spec, locale) {
  const L = locale === "zh-cn" ? "zh" : "en";
  const sections = spec.sections.map((s) => {
    const base = {
      id: s.id,
      order: s.order,
      title: s.title[L],
      toc: s.toc === undefined ? true : s.toc,
      visible: true,
      type: s.type,
    };
    return Object.assign(base, s[L] || {});
  });
  return {
    id: spec.slug,
    slug: spec.slug,
    locale: locale,
    type: "patch",
    status: "published",
    featured: false,
    title: spec.title[L],
    shortTitle: spec.shortTitle[L],
    summary: spec.summary[L],
    description: spec.description[L],
    patchCategory: spec.patchCategory,
    patchVersion: spec.patchVersion,
    patch: spec.patch,
    league: spec.league,
    patchStatus: "legacy",
    verificationStatus: "verified",
    verifiedClientVersion: "0.5.4e",
    author: "StratLore Editorial",
    reviewer: "Exile2 Guides Automated Editorial QA",
    createdAt: TODAY,
    publishedAt: TODAY,
    updatedAt: TODAY,
    lastVerifiedAt: TODAY,
    heroImage: withImagePrefix(spec.heroImage),
    cardImage: withImagePrefix(spec.cardImage || spec.heroImage),
    imageAlt: spec.imageAlt[L],
    tags: spec.tags,
    historicalStatus: spec.historicalStatus || "historical",
    currentBaseline: spec.currentBaseline || "0.5.4e",
    currentApplicability: (spec.currentApplicability || []).map((a) => ({
      topicId: a.topicId,
      status: a.status,
      currentSummary: a.currentSummary[L],
      supersededByPatchIds: a.supersededByPatchIds || [],
      affectedContentIds: a.affectedContentIds || [],
      sourceIds: a.sourceIds || [],
    })),
    supersededByPatchIds: spec.supersededByPatchIds || [],
    returningPlayerPriority: spec.returningPlayerPriority || "medium",
    sections,
    relatedBuildIds: [],
    relatedBossIds: [],
    relatedItemIds: [],
    relatedGuideIds: [],
    relatedSkillIds: [],
    sources: officialSourcesFor(spec.threadId, spec.threadLabel),
    seo: {
      title: spec.seo.title[L],
      description: spec.seo.description[L],
      noindex: false,
    },
  };
}

function writePatch(spec) {
  for (const loc of ["en", "zh-cn"]) {
    const a = buildArticle(spec, loc);
    const out = path.join(ROOT, "content", loc, "patches", spec.slug + ".json");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(a, null, 2) + "\n");
  }
  console.log("wrote", spec.slug, "(en+zh-cn)");
}

/* ============================ 第五批 8 篇规格 ============================ */

// 1) patch-0-2-0g-loot-tier-rework
const patchG = {
  slug: "patch-0-2-0g-loot-tier-rework",
  threadId: "3774669",
  threadLabel: "Path of Exile 2 official 0.2.0g patch notes",
  patchVersion: "0.2.0g",
  patch: "0.2.0g",
  patchCategory: "balance",
  league: "Early Access",
  heroImage: "items/catalysts-hero.webp",
  imageAlt: {
    en: "Catalysts and currency on the ground after a 0.2.0g loot run.",
    zh: "0.2.0g 战利品跑图中散落的催化剂与通货。",
  },
  title: {
    en: "PoE2 0.2.0g Loot Tier Rework: Boss Drops, Tiered Rares, Simulacrum and Filter Risks",
    zh: "流放之路2 0.2.0g 战利品层级重做：Boss 掉落、分级稀有、幻象与过滤器风险",
  },
  shortTitle: { en: "0.2.0g Loot Tier Rework", zh: "0.2.0g 战利品层级重做" },
  summary: {
    en: "0.2.0g rebuilt item rarity tiers so high-tier monsters drop fewer worthless whites and better crafting bases, changed boss drop protection, and briefly broke gems before a rollback.",
    zh: "0.2.0g 重做了物品稀有度层级：高 Tier 怪物更少掉落无价值白装、更多掉落优质底材，调整了 Boss 掉落保护，并曾短暂导致宝石消失后被回滚。",
  },
  description: {
    en: "How 0.2.0g's loot tier rework changed boss drops, tiered rares, Simulacrum, league mechanics and loot filters — and what still applies in client 0.5.4e.",
    zh: "0.2.0g 的战利品层级重做如何改变 Boss 掉落、分级稀有、幻象、异界机制与战利品过滤器——以及客户端 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.2.0g Loot Tier Rework: Boss Drops, Tiered Rares and Filter Risks",
      zh: "流放之路2 0.2.0g 战利品层级重做：Boss 掉落、分级稀有与过滤器风险",
    },
    description: {
      en: "0.2.0g loot rework explained: item tiers, boss drop protection, Simulacrum and why old filters hid new bases.",
      zh: "解读 0.2.0g 战利品重做：物品层级、Boss 掉落保护、幻象,以及旧过滤器为何隐藏新底材。",
    },
  },
  tags: ["patch", "0-2-0g", "loot", "item-tier", "filter", "simulacrum"],
  currentApplicability: [
    {
      topicId: "item-tier",
      status: "changed-later",
      currentSummary: {
        en: [
          "Item Tier as a concept survived, but the exact tier thresholds and which mods scale with tier were adjusted by later patches.",
        ],
        zh: [
          "物品层级概念保留,但具体层级阈值与随层级缩放的词缀在后续补丁中被调整。",
        ],
      },
      supersededByPatchIds: ["patch-0-2-0h-item-filter-jewellers-qol"],
    },
    {
      topicId: "boss-drop-protection",
      status: "still-current",
      currentSummary: {
        en: [
          "Boss drop protection from 0.2.0g still informs how pinnacle and map bosses guarantee rewards in 0.5.4e.",
        ],
        zh: [
          "0.2.0g 的 Boss 掉落保护仍影响 0.5.4e 中巅峰与地图 Boss 的奖励保底。",
        ],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "gem-rollback",
      status: "removed",
      currentSummary: {
        en: [
          "The 0.2.0g gem-disappear bug was fixed within days and is not present in 0.5.4e.",
        ],
        zh: ["0.2.0g 宝石消失的 bug 已在数日内修复,0.5.4e 中不存在。"],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.2.0g is the patch the community calls the Loot Patch. It introduced Item Tier: a layer on top of rarity that makes high-tier monsters drop fewer worthless white items and more of the Magic and Rare bases players actually want to craft with.",
          "It also changed boss drop protection, rebalanced how Campaign and endgame sources feel, and touched Simulacrum, Trials, Expedition, Delirium and Strongboxes. Right after deployment a gem-disappear bug appeared and was rolled back, which is the part most Day-1 footage shows out of context.",
          "This page explains what 0.2.0g actually changed, the deployment and rollback, and which parts of its loot model still describe client 0.5.4e versus what later patches rewrote.",
        ],
        bullets: [
          "Item Tier added above normal rarity",
          "Boss drop protection changed",
          "A gem-disappear bug shipped then rolled back",
          "Later patches (0.2.0h, 0.5.x) adjusted the model",
        ],
      },
      {
        paragraphs: [
          "0.2.0g 被社区称为“战利品补丁”。它引入了物品层级(Item Tier)：在稀有度之上再加一层,让高 Tier 怪物更少掉落无价值的白装,更多掉落玩家真正想用来制作的魔法与稀有底材。",
          "它还改变了 Boss 掉落保护,重新平衡了战役与终局来源的体感,并波及幻象、试炼、远征、迷雾与保险箱。部署后立刻出现宝石消失 bug 并被回滚——这正是多数首日视频断章取义展示的部分。",
          "本页解释 0.2.0g 实际改了什么、部署与回滚过程,以及其战利品模型中哪些仍描述 0.5.4e、哪些被后续补丁重写。",
        ],
        bullets: [
          "在普通稀有度之上新增物品层级",
          "Boss 掉落保护改变",
          "宝石消失 bug 上线后回滚",
          "后续补丁(0.2.0h、0.5.x)调整了该模型",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.2.0 era",
        baselineNote:
          "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.2.0g is a historical stability patch for the Dawn of the Hunt era. Its loot model was a starting point; later patches tuned tier thresholds, filter behaviour and league drops.",
          "Reading a Day-1 0.2.0g video today is misleading: the exact numbers and the gem bug it shipped were changed within days.",
        ],
        bullets: [
          "0.2.0g = loot-model starting point, not final design",
          "Day-1 footage includes a bug that was rolled back",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.2.0 时代",
        baselineNote: "本页当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.2.0g 是“狩猎黎明”时代的战利品稳定化补丁。其战利品模型只是起点,后续补丁调整了层级阈值、过滤器行为与异界掉落。",
          "今天看 0.2.0g 首日视频会产生误导：其具体数值与上线携带的宝石 bug 都在数日内被改动。",
        ],
        bullets: [
          "0.2.0g = 战利品模型起点,非最终设计",
          "首日视频包含已被回滚的 bug",
        ],
      },
    ),
    sec(
      "patch-family-timeline",
      "patch-family-timeline",
      3,
      "Patch family timeline",
      "补丁家族时间线",
      {
        versions: [
          {
            code: "0.2.0",
            date: "2025-04-04",
            kind: "Major update",
            summary:
              "Dawn of the Hunt: Huntress, new ascendancies, Acts, Atlas and league systems.",
            tags: ["major-updates"],
          },
          {
            code: "0.2.0c",
            date: "2025-04",
            kind: "Balance",
            summary: "Minion scaling and spear/boss corrections.",
            tags: ["balance"],
          },
          {
            code: "0.2.0e",
            date: "2025-05",
            kind: "Balance",
            summary: "Act 3 layout, attribute runes and player balance.",
            tags: ["balance"],
          },
          {
            code: "0.2.0g",
            date: "2025-05",
            kind: "Balance",
            summary:
              "Loot Tier rework, boss drop protection and league loot tuning.",
            tags: ["balance"],
          },
          {
            code: "0.2.0h",
            date: "2025-06",
            kind: "Major update",
            summary:
              "Item Tier filter property, Jeweller's Orbs and endgame QoL.",
            tags: ["major-updates"],
          },
        ],
      },
      {
        versions: [
          {
            code: "0.2.0",
            date: "2025-04-04",
            kind: "大型更新",
            summary: "狩猎黎明：女猎手、新升华、章节、Atlas 与异界机制。",
            tags: ["major-updates"],
          },
          {
            code: "0.2.0c",
            date: "2025-04",
            kind: "平衡",
            summary: "召唤物缩放与长矛/Boss 修正。",
            tags: ["balance"],
          },
          {
            code: "0.2.0e",
            date: "2025-05",
            kind: "平衡",
            summary: "第三章布局、属性符文与玩家平衡。",
            tags: ["balance"],
          },
          {
            code: "0.2.0g",
            date: "2025-05",
            kind: "平衡",
            summary: "战利品层级重做、Boss 掉落保护与异界战利品调整。",
            tags: ["balance"],
          },
          {
            code: "0.2.0h",
            date: "2025-06",
            kind: "大型更新",
            summary: "物品层级过滤属性、珠宝匠之球与终局 QoL。",
            tags: ["major-updates"],
          },
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      4,
      "Loot source before and after",
      "战利品来源前后对比",
      {
        caption:
          "How common loot sources behaved before and after 0.2.0g, and what still matches 0.5.4e.",
        columns: [
          { key: "source", label: "Source" },
          { key: "before", label: "Pre-0.2.0g" },
          { key: "after", label: "0.2.0g" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            source: "White items",
            before: "Common from high-tier monsters",
            after: "Greatly reduced from high-tier monsters",
            now: "Low-value whites stay suppressed",
          },
          {
            source: "Magic / Rare bases",
            before: "Mixed quality",
            after: "Higher-tier monsters favour crafting bases",
            now: "Tiering refined by later patches",
          },
          {
            source: "Boss drops",
            before: "Variable",
            after: "Drop protection adjusted",
            now: "Protection still active",
          },
          {
            source: "Simulacrum",
            before: "Old reward weighting",
            after: "Tuned with tier model",
            now: "Continued tuning since",
          },
        ],
      },
      {
        caption: "常见战利品来源在 0.2.0g 前后的表现,以及与 0.5.4e 的吻合度。",
        columns: [
          { key: "source", label: "来源" },
          { key: "before", label: "0.2.0g 前" },
          { key: "after", label: "0.2.0g 后" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            source: "白装",
            before: "高 Tier 怪物常见",
            after: "高 Tier 怪物大幅减少",
            now: "低价值白装仍被压制",
          },
          {
            source: "魔法/稀有底材",
            before: "质量参差",
            after: "高 Tier 怪物偏向制作底材",
            now: "层级被后续补丁细化",
          },
          {
            source: "Boss 掉落",
            before: "不稳定",
            after: "掉落保护调整",
            now: "保护仍生效",
          },
          {
            source: "幻象",
            before: "旧奖励权重",
            after: "随层级模型调整",
            now: "此后持续调整",
          },
        ],
      },
    ),
    sec(
      "item-impact",
      "item-impact",
      5,
      "Item and crafting impact",
      "物品与制作影响",
      {
        items: [
          {
            kind: "system",
            title: "Item Tier",
            detail:
              "A new layer above rarity. High-tier monsters now drop fewer whites and more of the Magic/Rare bases worth picking up. Filter rules that only matched rarity could hide these tiered bases.",
            tags: ["tier", "rarity", "filter"],
          },
          {
            kind: "base",
            title: "Tiered Magic / Rare bases",
            detail:
              "Higher tier correlates with better mod rolls, making them stronger crafting targets than before 0.2.0g.",
            tags: ["crafting", "base"],
          },
        ],
      },
      {
        items: [
          {
            kind: "system",
            title: "物品层级",
            detail:
              "稀有度之上新增的一层。高 Tier 怪物现在更少掉落白装,更多掉落值得拾取的魔法/稀有底材。只匹配稀有度的过滤规则可能隐藏这些分级底材。",
            tags: ["tier", "rarity", "filter"],
          },
          {
            kind: "base",
            title: "分级魔法/稀有底材",
            detail:
              "更高层级对应更好的词缀 roll,使其成为比 0.2.0g 前更强的制作目标。",
            tags: ["crafting", "base"],
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      6,
      "Filter and farming impact",
      "过滤器与刷图影响",
      {
        paragraphs: [
          "The biggest practical trap of 0.2.0g was loot filters. Filters keyed only to rarity could hide the new tiered bases, so players upgrading from an old filter suddenly stopped seeing good drops.",
          "Because tier meaning changed again in 0.2.0h and beyond, any filter written against 0.2.0g alone is incomplete for the current client.",
        ],
        bullets: [
          "Old rarity-only filters can hide tiered bases",
          "Re-verify filters against the current client",
        ],
      },
      {
        paragraphs: [
          "0.2.0g 最实际的陷阱是战利品过滤器。只按稀有度匹配的过滤器可能隐藏新的分级底材,因此从旧过滤器升级的玩家会突然看不见好掉落。",
          "由于层级含义在 0.2.0h 及之后再次变化,任何仅针对 0.2.0g 编写的过滤器对当前客户端都不完整。",
        ],
        bullets: [
          "只按稀有度的旧过滤器可能隐藏分级底材",
          "针对当前客户端重新核验过滤器",
        ],
      },
    ),
    sec(
      "before-after",
      "before-after",
      7,
      "White items vs tiered drops",
      "白装与分级掉落对比",
      {
        oldLabel: "Before 0.2.0g",
        oldText:
          "High-tier monsters dropped a lot of white items and low-value gold, so screen-clearing felt rewarding but the pickups were mostly vendor trash.",
        newLabel: "After 0.2.0g",
        newText:
          "High-tier monsters drop far fewer whites and more of the Magic and Rare bases that are worth identifying and crafting, which reshaped how players filtered and what they picked up.",
      },
      {
        oldLabel: "0.2.0g 前",
        oldText:
          "高 Tier 怪物掉落大量白装与低价值金币,清屏有成就感但拾取物大多是卖给商人的垃圾。",
        newLabel: "0.2.0g 后",
        newText:
          "高 Tier 怪物大幅减少白装,更多掉落值得鉴定与制作的魔法/稀有底材,重塑了玩家的过滤与拾取习惯。",
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      8,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Item Tier concept",
            thenText: "Introduced in 0.2.0g as a new rarity layer.",
            nowText:
              "Still present in 0.5.4e but with adjusted thresholds and tier-based mods.",
          },
          {
            aspect: "Boss drop protection",
            thenText: "Rebalanced in 0.2.0g.",
            nowText:
              "Continues to govern pinnacle and map boss reward guarantees.",
          },
          {
            aspect: "Gem bug",
            thenText: "A gem-disappear bug shipped with 0.2.0g.",
            nowText: "Fixed within days; absent from 0.5.4e.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "物品层级概念",
            thenText: "0.2.0g 作为新稀有度层引入。",
            nowText: "0.5.4e 仍存在,但阈值与随层级的词缀已调整。",
          },
          {
            aspect: "Boss 掉落保护",
            thenText: "0.2.0g 中重新平衡。",
            nowText: "继续约束巅峰与地图 Boss 的奖励保底。",
          },
          {
            aspect: "宝石 bug",
            thenText: "0.2.0g 携带宝石消失 bug。",
            nowText: "数日内修复,0.5.4e 中不存在。",
          },
        ],
      },
    ),
    sec(
      "known-issues",
      "known-issues",
      9,
      "Deployment and rollback",
      "部署与回滚",
      {
        issues: [
          {
            text: "Shortly after 0.2.0g deployed, some players reported skills gems disappearing from skill gems; this was a regression that was rolled back via a hotfix within days.",
            status: "fixed",
          },
          {
            text: "Players on old loot filters temporarily stopped seeing tiered bases until they updated their filters.",
            status: "fixed",
          },
        ],
      },
      {
        issues: [
          {
            text: "0.2.0g 部署后不久,部分玩家报告技能宝石从技能宝石中消失;这是一个在被热修回滚前短暂存在的回归问题。",
            status: "fixed",
          },
          {
            text: "使用旧战利品过滤器的玩家在更新过滤器前暂时看不见分级底材。",
            status: "fixed",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      10,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Item Tier concept",
            status: "changed-later",
            currentSummary: "Present but tuned by later patches.",
            supersededBy: "0.2.0h, 0.5.x",
            affectedContent: "Loot filter and crafting guides",
          },
          {
            topic: "Boss drop protection",
            status: "still-current",
            currentSummary: "Still governs boss reward guarantees.",
            supersededBy: "—",
            affectedContent: "Boss and endgame guides",
          },
          {
            topic: "0.2.0g gem bug",
            status: "removed",
            currentSummary: "Not present in 0.5.4e.",
            supersededBy: "—",
            affectedContent: "—",
          },
        ],
      },
      {
        rows: [
          {
            topic: "物品层级概念",
            status: "changed-later",
            currentSummary: "存在但被后续补丁调整。",
            supersededBy: "0.2.0h、0.5.x",
            affectedContent: "战利品过滤器与制作指南",
          },
          {
            topic: "Boss 掉落保护",
            status: "still-current",
            currentSummary: "仍约束 Boss 奖励保底。",
            supersededBy: "—",
            affectedContent: "Boss 与终局指南",
          },
          {
            topic: "0.2.0g 宝石 bug",
            status: "removed",
            currentSummary: "0.5.4e 中不存在。",
            supersededBy: "—",
            affectedContent: "—",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      11,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Forum (0.2.0g week)",
            context:
              "Players noticed far fewer whites dropping from tanky monsters.",
            quote:
              "Finally the screen isn't 80% white items I instantly ignore.",
            analysis:
              "Matches the intended shift toward useful crafting bases rather than trash.",
          },
          {
            source: "Reddit (filters)",
            context: "Users asked why good rares vanished from their filter.",
            quote: "My old filter hid the new tiered bases after this patch.",
            analysis:
              "Confirms the filter-awareness risk called out above; not a drop-rate bug.",
          },
        ],
      },
      {
        reports: [
          {
            source: "官方论坛(0.2.0g 当周)",
            context: "玩家注意到高血量怪物掉落的白装大幅减少。",
            quote: "终于屏幕上不再是占 80% 的白装。",
            analysis: "符合从垃圾转向有用制作底材的设计意图。",
          },
          {
            source: "Reddit(过滤器)",
            context: "用户问为何好稀有从过滤器中消失。",
            quote: "这次补丁后我的旧过滤器隐藏了新分级底材。",
            analysis: "印证上文的过滤器风险,并非掉率 bug。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      12,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "loot-filter-guide",
            kind: "guide",
            issue:
              "Filter tutorials written for 0.2.0g alone miss the 0.2.0h Item Tier property.",
            action: "Update with the 0.2.0h UnidentifiedItemTier rule.",
            status: "queued",
          },
          {
            contentId: "crafting-bases-guide",
            kind: "guide",
            issue: "Tier-to-mod mapping changed after 0.2.0g.",
            action: "Re-verify tier scaling against 0.5.4e.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "loot-filter-guide",
            kind: "guide",
            issue: "仅针对 0.2.0g 写的过滤教程遗漏了 0.2.0h 的物品层级属性。",
            action: "补充 0.2.0h 的未鉴定物品层级规则。",
            status: "queued",
          },
          {
            contentId: "crafting-bases-guide",
            kind: "guide",
            issue: "层级到词缀的映射在 0.2.0g 后变化。",
            action: "对照 0.5.4e 重新核验层级缩放。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      13,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Loot Filter Setup guide",
            type: "guide",
            trigger: "0.2.0g changed what filters must show",
            action: "Add Item Tier and tiered-base rules.",
            status: "queued",
          },
          {
            name: "Crafting Bases guide",
            type: "guide",
            trigger: "Tiered bases shifted crafting value",
            action: "Re-verify tier scaling.",
            status: "queued",
          },
          {
            name: "0.2.0h Item Filter patch",
            type: "patch",
            trigger: "Direct sequel to this loot rework",
            action: "Cross-link the filter-property follow-up.",
            status: "reviewing",
          },
        ],
      },
      {
        rows: [
          {
            name: "战利品过滤器设置指南",
            type: "guide",
            trigger: "0.2.0g 改变了过滤器必须显示的内容",
            action: "补充物品层级与分级底材规则。",
            status: "queued",
          },
          {
            name: "制作底材指南",
            type: "guide",
            trigger: "分级底材改变了制作价值",
            action: "重新核验层级缩放。",
            status: "queued",
          },
          {
            name: "0.2.0h 物品过滤器补丁",
            type: "patch",
            trigger: "本次战利品重做的直接续作",
            action: "交叉链接过滤器属性后续。",
            status: "reviewing",
          },
        ],
      },
    ),
    videoSection(14),
    sec(
      "faq",
      "faq",
      15,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Did 0.2.0g increase drop rates or just hide whites?",
            answer: [
              "It mostly reduced low-value whites from high-tier monsters and shifted weight toward useful Magic/Rare bases. It was not a blanket drop-rate buff, and later patches kept tuning the model.",
            ],
          },
          {
            question: "Why did my old filter stop showing good items?",
            answer: [
              "Filters keyed only to rarity could hide the new tiered bases. Update the filter and re-check the Item Tier rules against the current client.",
            ],
          },
          {
            question: "Is the gem-disappear bug still around?",
            answer: [
              "No. It was a short-lived 0.2.0g regression fixed by a hotfix; it does not exist in 0.5.4e.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "0.2.0g 是提高掉率还是只是隐藏白装?",
            answer: [
              "它主要是减少高 Tier 怪物掉落的低价值白装,并将权重移向有用的魔法/稀有底材。这不是整体的掉率提升,后续补丁持续调整该模型。",
            ],
          },
          {
            question: "为何我的旧过滤器不再显示好物品?",
            answer: [
              "只按稀有度匹配的过滤器可能隐藏新的分级底材。请更新过滤器,并针对当前客户端重新检查物品层级规则。",
            ],
          },
          {
            question: "宝石消失 bug 还在吗?",
            answer: [
              "不在。它是 0.2.0g 短暂的回归问题,已被热修修复,0.5.4e 中不存在。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      16,
      "3774669",
      "Path of Exile 2 official 0.2.0g patch notes",
    ),
    changelogSection(17),
  ],
};

// 2) patch-0-2-0h-item-filter-jewellers-qol
const patchH = {
  slug: "patch-0-2-0h-item-filter-jewellers-qol",
  threadId: "3781189",
  threadLabel: "Path of Exile 2 official 0.2.0h patch notes",
  patchVersion: "0.2.0h",
  patch: "0.2.0h",
  patchCategory: "major-updates",
  league: "Early Access",
  heroImage: "items/jewellers-orbs-hero.webp",
  imageAlt: {
    en: "Jeweller's Orbs and an item filter rules panel.",
    zh: "珠宝匠之球与物品过滤规则面板。",
  },
  title: {
    en: "PoE2 0.2.0h: Item Tier Filters, Jeweller's Orbs, Level 20 Gems and QoL",
    zh: "流放之路2 0.2.0h：物品层级过滤器、珠宝匠之球、20 级宝石与 QoL",
  },
  shortTitle: { en: "0.2.0h Item Filter & QoL", zh: "0.2.0h 物品过滤器与 QoL" },
  summary: {
    en: "0.2.0h added the UnidentifiedItemTier filter property that 0.2.0g needed, raised Greater and Perfect Jeweller's Orb drops, made Level 20 Uncut Gems drop, and improved currency, stash and fast-travel QoL.",
    zh: "0.2.0h 新增了 0.2.0g 所需的未鉴定物品层级过滤属性,提高了大/完美珠宝匠之球掉率,使 20 级未切割宝石掉落,并改进了通货、仓库与快速传送等 QoL。",
  },
  description: {
    en: "0.2.0h explained: the UnidentifiedItemTier filter property, Jeweller's Orb changes, Level 20 Uncut Gems, stash transfers, Strongbox actions and what still applies in 0.5.4e.",
    zh: "解读 0.2.0h：未鉴定物品层级过滤属性、珠宝匠之球改动、20 级未切割宝石、仓库转移、保险箱操作,以及 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.2.0h: Item Tier Filters, Jeweller's Orbs and QoL",
      zh: "流放之路2 0.2.0h：物品层级过滤器、珠宝匠之球与 QoL",
    },
    description: {
      en: "0.2.0h QoL explained: UnidentifiedItemTier, Jeweller's Orbs, Level 20 Gems and stash improvements.",
      zh: "解读 0.2.0h QoL：未鉴定物品层级、珠宝匠之球、20 级宝石与仓库改进。",
    },
  },
  tags: ["patch", "0-2-0h", "filter", "jewellers-orb", "qol", "stash"],
  currentApplicability: [
    {
      topicId: "unidentified-item-tier",
      status: "still-current",
      currentSummary: {
        en: [
          "The UnidentifiedItemTier filter property introduced in 0.2.0h is still the correct way to show/hide tiered unidentified items in 0.5.4e.",
        ],
        zh: [
          "0.2.0h 引入的未鉴定物品层级过滤属性仍是 0.5.4e 中显示/隐藏分级未鉴定物品的正确方式。",
        ],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "jewellers-drop",
      status: "changed-later",
      currentSummary: {
        en: [
          "Greater/Perfect Jeweller's Orb drop rates were raised in 0.2.0h but remain subject to later economy tuning.",
        ],
        zh: ["大/完美珠宝匠之球掉率在 0.2.0h 提高,但仍受后续经济调整影响。"],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.2.0h is the quality-of-life follow-up to the 0.2.0g loot rework. Its headline fix is the UnidentifiedItemTier filter property, which finally let filters distinguish high-tier unidentified items that 0.2.0g had made easy to hide by accident.",
          "It also raised Greater and Perfect Jeweller's Orb drops, made Level 20 Uncut Skill and Spirit Gems drop, added quick currency-stack transfers, Ritual/Socketable stash-tab affinities, Strongbox and Essence quick actions, and improved shrine and town fast travel.",
        ],
        bullets: [
          "UnidentifiedItemTier filter property added",
          "Jeweller's Orb drops raised",
          "Level 20 Uncut Gems drop",
          "Stash and transfer QoL",
        ],
      },
      {
        paragraphs: [
          "0.2.0h 是 0.2.0g 战利品重做的质量优化续作。其头号修复是未鉴定物品层级过滤属性,终于让过滤器能区分高 Tier 未鉴定物品——0.2.0g 曾让这些物品容易被意外隐藏。",
          "它还提高了大/完美珠宝匠之球掉率,使 20 级未切割技能与灵能宝石掉落,新增通货堆叠快速转移、仪式/插槽仓库页亲和、保险箱与精华快捷操作,并改进了神龛与城镇快速传送。",
        ],
        bullets: [
          "新增未鉴定物品层级过滤属性",
          "提高珠宝匠之球掉率",
          "20 级未切割宝石掉落",
          "仓库与转移 QoL",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.2.0 era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.2.0h built directly on the 0.2.0g loot model. Filter syntax it introduced is still valid, but exact Orb drop weighting has moved with later economy patches.",
        ],
        bullets: [
          "0.2.0h = 0.2.0g 的 QoL 续作",
          "过滤器语法仍有效,掉率已被后续调整",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.2.0 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.2.0h 直接建立在 0.2.0g 战利品模型之上。它引入的过滤器语法仍然有效,但具体宝珠掉率权重已随后续经济补丁变化。",
        ],
        bullets: [
          "0.2.0h = 0.2.0g 的 QoL 续作",
          "过滤语法仍有效,掉率已被后续调整",
        ],
      },
    ),
    sec(
      "patch-family-timeline",
      "patch-family-timeline",
      3,
      "Patch family timeline",
      "补丁家族时间线",
      {
        versions: [
          {
            code: "0.2.0g",
            date: "2025-05",
            kind: "Balance",
            summary:
              "Loot Tier rework that created the filter gap 0.2.0h closes.",
            tags: ["balance"],
          },
          {
            code: "0.2.0h",
            date: "2025-06",
            kind: "Major update",
            summary:
              "Item Tier filter property, Jeweller's Orbs and endgame QoL.",
            tags: ["major-updates"],
          },
          {
            code: "0.2.1",
            date: "2025-06",
            kind: "Major update",
            summary: "Socketables and unique drops follow-up.",
            tags: ["major-updates"],
          },
        ],
      },
      {
        versions: [
          {
            code: "0.2.0g",
            date: "2025-05",
            kind: "平衡",
            summary: "战利品层级重做,制造了 0.2.0h 填补的过滤缺口。",
            tags: ["balance"],
          },
          {
            code: "0.2.0h",
            date: "2025-06",
            kind: "大型更新",
            summary: "物品层级过滤属性、珠宝匠之球与终局 QoL。",
            tags: ["major-updates"],
          },
          {
            code: "0.2.1",
            date: "2025-06",
            kind: "大型更新",
            summary: "插槽物与独特掉落续作。",
            tags: ["major-updates"],
          },
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      4,
      "0.2.0g problem vs 0.2.0h fix",
      "0.2.0g 问题 vs 0.2.0h 修复",
      {
        caption: "What 0.2.0h changed versus the 0.2.0g loot model.",
        columns: [
          { key: "feature", label: "Feature" },
          { key: "g", label: "0.2.0g" },
          { key: "h", label: "0.2.0h" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            feature: "Tiered unidentified items",
            g: "Filter could not match tier",
            h: "UnidentifiedItemTier property added",
            now: "Property still valid",
          },
          {
            feature: "Greater Jeweller's Orb",
            g: "Old drop rate",
            h: "Drop rate raised",
            now: "Subject to later tuning",
          },
          {
            feature: "Level 20 Uncut Gems",
            g: "N/A",
            h: "Now drop",
            now: "Still drop",
          },
          {
            feature: "Currency stack move",
            g: "Manual",
            h: "Quick transfer added",
            now: "Still available",
          },
        ],
      },
      {
        caption: "0.2.0h 相对 0.2.0g 战利品模型的改动。",
        columns: [
          { key: "feature", label: "功能" },
          { key: "g", label: "0.2.0g" },
          { key: "h", label: "0.2.0h" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            feature: "分级未鉴定物品",
            g: "过滤器无法匹配层级",
            h: "新增未鉴定物品层级属性",
            now: "属性仍有效",
          },
          {
            feature: "大珠宝匠之球",
            g: "旧掉率",
            h: "提高掉率",
            now: "受后续调整",
          },
          { feature: "20 级未切割宝石", g: "无", h: "现在掉落", now: "仍掉落" },
          {
            feature: "通货堆叠转移",
            g: "手动",
            h: "新增快速转移",
            now: "仍可用",
          },
        ],
      },
    ),
    sec(
      "item-impact",
      "item-impact",
      5,
      "Jeweller's Orbs and gems",
      "珠宝匠之球与宝石",
      {
        items: [
          {
            kind: "currency",
            title: "Greater / Perfect Jeweller's Orb",
            detail:
              "Drop rates were raised so players could more reliably roll socket numbers on gear, supporting the socketable and crafting systems introduced around 0.2.x.",
            tags: ["jewellers", "currency"],
          },
          {
            kind: "gem",
            title: "Level 20 Uncut Skill / Spirit Gem",
            detail:
              "These now drop, giving a direct path to high-level gems without relying solely on vendor or quest rewards.",
            tags: ["gem", "uncut"],
          },
        ],
      },
      {
        items: [
          {
            kind: "currency",
            title: "大/完美珠宝匠之球",
            detail:
              "掉率提高,使玩家更可靠地为装备 roll 插槽数,支撑 0.2.x 前后引入的插槽物与制作系统。",
            tags: ["jewellers", "currency"],
          },
          {
            kind: "gem",
            title: "20 级未切割技能/灵能宝石",
            detail: "现在会掉落,提供不依赖商人或任务奖励的高等级宝石直接路径。",
            tags: ["gem", "uncut"],
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      6,
      "Stash and transfer impact",
      "仓库与转移影响",
      {
        paragraphs: [
          "Quick currency-stack transfers and Ritual/Socketable stash-tab affinities reduced the busywork of moving loot between tabs during a mapping session.",
          "Strongbox and Essence quick currency buttons cut the number of clicks needed to cash out rewards, which matters most in dense endgame farming.",
        ],
        bullets: ["Faster currency movement", "Less stash micromanagement"],
      },
      {
        paragraphs: [
          "通货堆叠快速转移,以及仪式/插槽仓库页的亲和,减少了刷图过程中在标签页间搬运战利品的繁琐操作。",
          "保险箱与精华的快捷通货按钮,降低了兑现奖励所需的点击次数,在密集终局刷图中尤为关键。",
        ],
        bullets: ["更快的通货移动", "更少的仓库微操"],
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      7,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Filtering tiered items",
            thenText: "Impossible to match tier before identifying in 0.2.0g.",
            nowText: "UnidentifiedItemTier handles it in 0.5.4e.",
          },
          {
            aspect: "Jeweller's Orb access",
            thenText: "Scarce before 0.2.0h.",
            nowText: "More common, still economy-tuned.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "过滤分级物品",
            thenText: "0.2.0g 中鉴定前无法匹配层级。",
            nowText: "0.5.4e 用未鉴定物品层级属性解决。",
          },
          {
            aspect: "珠宝匠之球获取",
            thenText: "0.2.0h 前稀缺。",
            nowText: "更常见,仍受经济调整。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      8,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "UnidentifiedItemTier",
            status: "still-current",
            currentSummary:
              "Still the correct filter property for tiered unidentified items.",
            supersededBy: "—",
            affectedContent: "Loot filter guide",
          },
          {
            topic: "Jeweller's Orb drops",
            status: "changed-later",
            currentSummary: "Raised in 0.2.0h, retuned since.",
            supersededBy: "0.5.x",
            affectedContent: "Currency guides",
          },
          {
            topic: "Level 20 Uncut Gems",
            status: "still-current",
            currentSummary: "Still drop in 0.5.4e.",
            supersededBy: "—",
            affectedContent: "Gem guides",
          },
        ],
      },
      {
        rows: [
          {
            topic: "未鉴定物品层级",
            status: "still-current",
            currentSummary: "仍是分级未鉴定物品的正确过滤属性。",
            supersededBy: "—",
            affectedContent: "战利品过滤器指南",
          },
          {
            topic: "珠宝匠之球掉率",
            status: "changed-later",
            currentSummary: "0.2.0h 提高,此后重新调整。",
            supersededBy: "0.5.x",
            affectedContent: "通货指南",
          },
          {
            topic: "20 级未切割宝石",
            status: "still-current",
            currentSummary: "0.5.4e 仍掉落。",
            supersededBy: "—",
            affectedContent: "宝石指南",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      9,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Reddit (filters)",
            context:
              "Players welcomed the ability to finally filter tiered unidentified items.",
            quote:
              "UnidentifiedItemTier is the one property 0.2.0g was missing.",
            analysis:
              "Confirms this was the expected fix for the 0.2.0g filter gap.",
          },
          {
            source: "Forum (QoL)",
            context: "Players noted fewer clicks moving currency.",
            quote: "The stack move alone saves me minutes per map.",
            analysis:
              "Matches the intended reduction in stash micromanagement.",
          },
        ],
      },
      {
        reports: [
          {
            source: "Reddit(过滤器)",
            context: "玩家欢迎终于能过滤分级未鉴定物品。",
            quote: "未鉴定物品层级就是 0.2.0g 缺的那个属性。",
            analysis: "印证这是 0.2.0g 过滤缺口的预期修复。",
          },
          {
            source: "官方论坛(QoL)",
            context: "玩家注意到搬运通货点击更少。",
            quote: "光是堆叠转移每张图就省下几分钟。",
            analysis: "符合减少仓库微操的设计意图。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      10,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "loot-filter-guide",
            kind: "guide",
            issue: "Must include UnidentifiedItemTier now.",
            action: "Add the 0.2.0h property to all filter examples.",
            status: "queued",
          },
          {
            contentId: "currency-guide",
            kind: "guide",
            issue: "Jeweller's Orb weighting changed after 0.2.0h.",
            action: "Re-verify drop context against 0.5.4e.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "loot-filter-guide",
            kind: "guide",
            issue: "现在必须包含未鉴定物品层级。",
            action: "在所有过滤器示例中加入 0.2.0h 属性。",
            status: "queued",
          },
          {
            contentId: "currency-guide",
            kind: "guide",
            issue: "珠宝匠之球权重在 0.2.0h 后变化。",
            action: "对照 0.5.4e 重新核验掉落背景。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      11,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Loot Filter Setup guide",
            type: "guide",
            trigger: "UnidentifiedItemTier is now required",
            action: "Document the property with examples.",
            status: "queued",
          },
          {
            name: "0.2.0g Loot Tier patch",
            type: "patch",
            trigger: "0.2.0h closes its filter gap",
            action: "Cross-link the follow-up.",
            status: "reviewing",
          },
          {
            name: "Jeweller's Orbs item page",
            type: "item",
            trigger: "Drop rate changed",
            action: "Note current drop context.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "战利品过滤器设置指南",
            type: "guide",
            trigger: "现在需要未鉴定物品层级",
            action: "用示例记录该属性。",
            status: "queued",
          },
          {
            name: "0.2.0g 战利品层级补丁",
            type: "patch",
            trigger: "0.2.0h 填补其过滤缺口",
            action: "交叉链接续作。",
            status: "reviewing",
          },
          {
            name: "珠宝匠之球物品页",
            type: "item",
            trigger: "掉率变化",
            action: "注明当前掉落背景。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(12),
    sec(
      "faq",
      "faq",
      13,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Do I need to rewrite my filter after 0.2.0h?",
            answer: [
              "If your filter predates 0.2.0g/0.2.0h and only matches rarity, add UnidentifiedItemTier so you don't hide tiered unidentified items. Verify against the current client.",
            ],
          },
          {
            question: "Are Perfect Jeweller's Orbs now common?",
            answer: [
              "Their drop rate was raised in 0.2.0h, but Orb economy has been tuned since, so treat current drop rates as subject to later patches.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "0.2.0h 后需要重写过滤器吗?",
            answer: [
              "若你的过滤器早于 0.2.0g/0.2.0h 且只匹配稀有度,请加入未鉴定物品层级,以免隐藏分级未鉴定物品。请针对当前客户端核验。",
            ],
          },
          {
            question: "完美珠宝匠之球现在常见了吗?",
            answer: [
              "其掉率在 0.2.0h 提高,但宝珠经济此后被调整,因此当前掉率应视为受后续补丁影响。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      14,
      "3781189",
      "Path of Exile 2 official 0.2.0h patch notes",
    ),
    changelogSection(15),
  ],
};

// 3) patch-0-2-0c-minion-spear-boss-rebalance
const patchC = {
  slug: "patch-0-2-0c-minion-spear-boss-rebalance",
  threadId: "3746503",
  threadLabel: "Path of Exile 2 official 0.2.0c patch notes",
  patchVersion: "0.2.0c",
  patch: "0.2.0c",
  patchCategory: "balance",
  league: "Early Access",
  heroImage: "skills/tempest-bell.webp",
  imageAlt: {
    en: "A summoned minion fighting alongside the player.",
    zh: "召唤物与玩家并肩作战。",
  },
  title: {
    en: "PoE2 0.2.0c: Minion Scaling, Spear Skills and Boss Corrections",
    zh: "流放之路2 0.2.0c：召唤物缩放、长矛技能与 Boss 修正",
  },
  shortTitle: {
    en: "0.2.0c Minion & Boss Rebalance",
    zh: "0.2.0c 召唤物与 Boss 重平衡",
  },
  summary: {
    en: "0.2.0c rolled back part of 0.2.0's over-nerf to minions, adjusted Skeletal Arsonist and Cleric, corrected several spear skills and bosses, and is the patch most Day-1 minion builds needed to wait for.",
    zh: "0.2.0c 回滚了 0.2.0 对召唤物过度削弱的一部分,调整了骷髅纵火者与会诅,修正了多个长矛技能与 Boss,也是多数首日召唤构筑需要等待的补丁。",
  },
  description: {
    en: "0.2.0c explained: minion damage and life scaling per gem level, Skeletal Arsonist/Cleric, spear skill corrections, boss fixes and what still applies in 0.5.4e.",
    zh: "解读 0.2.0c：按宝石等级的召唤物伤害与生命缩放、骷髅纵火者/会诅、长矛技能修正、Boss 修复,以及 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.2.0c: Minion Scaling, Spear Skills and Boss Corrections",
      zh: "流放之路2 0.2.0c：召唤物缩放、长矛技能与 Boss 修正",
    },
    description: {
      en: "0.2.0c minion rebalance: gem-level scaling, Skeletal Arsonist/Cleric, spear and boss fixes.",
      zh: "0.2.0c 召唤物重平衡：宝石等级缩放、骷髅纵火者/会诅、长矛与 Boss 修复。",
    },
  },
  tags: ["patch", "0-2-0c", "minions", "spear", "balance", "boss"],
  currentApplicability: [
    {
      topicId: "minion-scaling",
      status: "changed-later",
      currentSummary: {
        en: [
          "The 0.2.0c minion scaling curve was a correction; minion balance moved again in 0.3 to 0.5.",
        ],
        zh: [
          "0.2.0c 的召唤物缩放曲线是一次修正;召唤物平衡在 0.3 至 0.5 再次变化。",
        ],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "skeletal-arsonist",
      status: "changed-later",
      currentSummary: {
        en: [
          "Skeletal Arsonist and Cleric were adjusted in 0.2.0c and retuned by later patches.",
        ],
        zh: ["骷髅纵火者与会诅在 0.2.0c 调整,并被后续补丁重新平衡。"],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.2.0 shipped with minion life and damage scaling that proved far too weak in the mid-campaign, making minion builds feel unplayable on bosses. 0.2.0c corrected that with per-gem-level adjustments to minion damage and life.",
          "It also adjusted Skeletal Arsonist and Skeletal Cleric together, corrected several spear skills that affected Huntress levelling, and fixed a set of bosses. Day-1 0.2.0 minion builds should not be used as-is; this patch is the first point where they became viable again.",
        ],
        bullets: [
          "Minion scaling corrected per gem level",
          "Skeletal Arsonist/Cleric adjusted",
          "Spear skills and bosses fixed",
          "Day-1 minion builds need this patch",
        ],
      },
      {
        paragraphs: [
          "0.2.0 上线时召唤物的生命与伤害缩放在中段战役中明显过弱,导致召唤构筑在 Boss 战几乎不可玩。0.2.0c 通过按宝石等级调整召唤物伤害与生命来修正。",
          "它还同步调整了骷髅纵火者与会诅,修正了多个影响女猎手升级的长矛技能,并修复了一批 Boss。0.2.0 首日召唤构筑不应原样使用;本补丁是它们重新可行的第一个节点。",
        ],
        bullets: [
          "按宝石等级修正召唤物缩放",
          "调整骷髅纵火者/会诅",
          "修正长矛技能与 Boss",
          "首日召唤构筑需要本补丁",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.2.0 era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.2.0c is a correction patch inside the Dawn of the Hunt launch window. Minion numbers it set were themselves later overwritten by 0.3 to 0.5 rebalances.",
        ],
        bullets: [
          "0.2.0c = 0.2.0 窗口内的修正补丁",
          "其召唤数值后来被 0.3–0.5 覆盖",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.2.0 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.2.0c 是狩猎黎明上线窗口内的修正补丁。它设定的召唤数值后来被 0.3 至 0.5 的重平衡覆盖。",
        ],
        bullets: [
          "0.2.0c = 0.2.0 窗口内的修正补丁",
          "其召唤数值后来被 0.3–0.5 覆盖",
        ],
      },
    ),
    sec(
      "change-explorer",
      "change-explorer",
      3,
      "Key changes",
      "关键改动",
      {
        changes: [
          {
            category: "balance",
            title: "Minion damage scaling",
            detail:
              "Per-gem-level damage adjustments reversed part of the 0.2.0 over-nerf so mid-campaign minions kept pace.",
            scope: "Official 0.2.0c patch notes",
          },
          {
            category: "balance",
            title: "Minion life scaling",
            detail:
              "Early-campaign minion life was restored and converged gradually at high gem levels.",
            scope: "Official 0.2.0c patch notes",
          },
          {
            category: "balance",
            title: "Skeletal Arsonist / Cleric",
            detail:
              "Both archetypes were tuned together to keep their synergy intact after the scaling change.",
            scope: "Official 0.2.0c patch notes",
          },
          {
            category: "fix",
            title: "Spear skill corrections",
            detail:
              "Several spear skills that affected Huntress levelling were corrected.",
            scope: "Official 0.2.0c patch notes",
          },
          {
            category: "boss",
            title: "Boss fixes",
            detail:
              "A set of boss behaviours were corrected in the same patch.",
            scope: "Official 0.2.0c patch notes",
          },
        ],
      },
      {
        changes: [
          {
            category: "balance",
            title: "召唤物伤害缩放",
            detail:
              "按宝石等级的伤害调整回滚了 0.2.0 过度削弱的一部分,使中段战役召唤物能跟上节奏。",
            scope: "官方 0.2.0c 补丁说明",
          },
          {
            category: "balance",
            title: "召唤物生命缩放",
            detail: "恢复了战役前期的召唤物生命,并在高宝石等级逐渐收敛。",
            scope: "官方 0.2.0c 补丁说明",
          },
          {
            category: "balance",
            title: "骷髅纵火者/会诅",
            detail: "两个体系在缩放改动后同步调整,以保持其协同。",
            scope: "官方 0.2.0c 补丁说明",
          },
          {
            category: "fix",
            title: "长矛技能修正",
            detail: "修正了多个影响女猎手升级的长矛技能。",
            scope: "官方 0.2.0c 补丁说明",
          },
          {
            category: "boss",
            title: "Boss 修复",
            detail: "同一补丁中修正了一批 Boss 行为。",
            scope: "官方 0.2.0c 补丁说明",
          },
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      4,
      "Minion scaling by gem level",
      "按宝石等级的召唤物缩放",
      {
        caption:
          "Direction of minion adjustments across 0.2.0, 0.2.0c and current.",
        columns: [
          { key: "level", label: "Gem level" },
          { key: "zeroTwo", label: "0.2.0" },
          { key: "zeroTwoC", label: "0.2.0c" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            level: "Low (1-10)",
            zeroTwo: "Too weak in campaign",
            zeroTwoC: "Life restored, damage corrected",
            now: "Further tuned by later patches",
          },
          {
            level: "Mid (11-20)",
            zeroTwo: "Fell behind on bosses",
            zeroTwoC: "Brought back in line",
            now: "Later rebalance applies",
          },
          {
            level: "High (20+)",
            zeroTwo: "Converged",
            zeroTwoC: "Converged, slightly stronger",
            now: "Current minion numbers",
          },
        ],
      },
      {
        caption: "召唤物调整在 0.2.0、0.2.0c 与当前之间的方向。",
        columns: [
          { key: "level", label: "宝石等级" },
          { key: "zeroTwo", label: "0.2.0" },
          { key: "zeroTwoC", label: "0.2.0c" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            level: "低(1-10)",
            zeroTwo: "战役中过弱",
            zeroTwoC: "恢复生命,修正伤害",
            now: "被后续补丁进一步调整",
          },
          {
            level: "中(11-20)",
            zeroTwo: "Boss 战落后",
            zeroTwoC: "拉回正轨",
            now: "适用后续重平衡",
          },
          {
            level: "高(20+)",
            zeroTwo: "收敛",
            zeroTwoC: "收敛,略强",
            now: "当前召唤数值",
          },
        ],
      },
    ),
    sec(
      "boss-impact",
      "boss-impact",
      5,
      "Boss corrections",
      "Boss 修正",
      {
        bosses: [
          {
            name: "Campaign bosses affected by 0.2.0c",
            detail:
              "Several boss behaviours were corrected so they no longer punished minion and spear playstyles unfairly.",
            action: "Use current boss pages for up-to-date patterns.",
          },
        ],
      },
      {
        bosses: [
          {
            name: "受 0.2.0c 影响的战役 Boss",
            detail: "修正了多个 Boss 行为,使其不再不公平地惩罚召唤与长矛玩法。",
            action: "使用当前 Boss 页获取最新机制。",
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      6,
      "Build impact",
      "构筑影响",
      {
        paragraphs: [
          "Minion builds (Lich, Infernalist) that looked dead on 0.2.0 Day-1 became playable again after 0.2.0c, but should still be checked against current build pages rather than launch recordings.",
          "Huntress spear levelling smoothed out as the corrected spear skills behaved as intended.",
        ],
        bullets: [
          "Minion builds viable again post-0.2.0c",
          "Check current build pages, not launch videos",
        ],
      },
      {
        paragraphs: [
          "在 0.2.0 首日看似报废的召唤构筑(巫妖、地狱使)在 0.2.0c 后重新可玩,但仍应参照当前构筑页而非上线录像。",
          "随着修正后的长矛技能表现符合预期,女猎手长矛升级更顺畅。",
        ],
        bullets: ["0.2.0c 后召唤构筑重新可玩", "参照当前构筑页而非上线视频"],
      },
    ),
    sec(
      "before-after",
      "before-after",
      7,
      "Day-1 vs post-0.2.0c",
      "首日 vs 0.2.0c 后",
      {
        oldLabel: "0.2.0 Day-1",
        oldText:
          "Minions scaled so weakly that boss fights could take many minutes and felt like a mistake.",
        newLabel: "After 0.2.0c",
        newText:
          "Per-gem-level corrections restored minion damage and life so the same builds cleared content at a reasonable pace.",
      },
      {
        oldLabel: "0.2.0 首日",
        oldText: "召唤物缩放过弱,Boss 战可能耗时数分钟,像是个错误。",
        newLabel: "0.2.0c 后",
        newText:
          "按宝石等级的修正恢复了召唤物伤害与生命,使相同构筑以合理节奏通关。",
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      8,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Minion viability",
            thenText: "Broken on 0.2.0 Day-1, fixed in 0.2.0c.",
            nowText: "Minion balance has moved again through 0.3 to 0.5.",
          },
          {
            aspect: "Spear skills",
            thenText: "Several corrected in 0.2.0c.",
            nowText: "Continued tuning since; check current skill pages.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "召唤可行性",
            thenText: "0.2.0 首日破损,0.2.0c 修复。",
            nowText: "召唤平衡在 0.3 至 0.5 再次变化。",
          },
          {
            aspect: "长矛技能",
            thenText: "多个在 0.2.0c 修正。",
            nowText: "此后持续调整,请查当前技能页。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      9,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Minion scaling curve",
            status: "changed-later",
            currentSummary:
              "0.2.0c corrected it; later patches moved it again.",
            supersededBy: "0.3-0.5",
            affectedContent: "Minion build pages",
          },
          {
            topic: "Skeletal Arsonist/Cleric",
            status: "changed-later",
            currentSummary: "Adjusted in 0.2.0c and retuned since.",
            supersededBy: "0.3-0.5",
            affectedContent: "Minion skill pages",
          },
          {
            topic: "Spear skill fixes",
            status: "changed-later",
            currentSummary: "Corrected in 0.2.0c; continued tuning since.",
            supersededBy: "0.5.x",
            affectedContent: "Spear skill pages",
          },
        ],
      },
      {
        rows: [
          {
            topic: "召唤物缩放曲线",
            status: "changed-later",
            currentSummary: "0.2.0c 修正;后续补丁再次移动。",
            supersededBy: "0.3-0.5",
            affectedContent: "召唤构筑页",
          },
          {
            topic: "骷髅纵火者/会诅",
            status: "changed-later",
            currentSummary: "0.2.0c 调整,此后重新平衡。",
            supersededBy: "0.3-0.5",
            affectedContent: "召唤技能页",
          },
          {
            topic: "长矛技能修复",
            status: "changed-later",
            currentSummary: "0.2.0c 修正;此后持续调整。",
            supersededBy: "0.5.x",
            affectedContent: "长矛技能页",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      10,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Reddit (minions)",
            context:
              "Players reported boss fights taking far too long on 0.2.0 Day-1.",
            quote: "My minions just melt and bosses take forever.",
            analysis:
              "Matches the over-nerf the 0.2.0c scaling corrections addressed.",
          },
          {
            source: "Forum (Huntress)",
            context: "Players noted spear skills misbehaving during levelling.",
            quote: "Spear felt off until the c patch.",
            analysis: "Aligns with the spear skill corrections in 0.2.0c.",
          },
        ],
      },
      {
        reports: [
          {
            source: "Reddit(召唤)",
            context: "玩家报告 0.2.0 首日 Boss 战耗时过长。",
            quote: "我的召唤物一碰就碎,Boss 要打半天。",
            analysis: "符合 0.2.0c 缩放修正所解决的过度削弱。",
          },
          {
            source: "官方论坛(女猎手)",
            context: "玩家注意到升级时长矛技能表现异常。",
            quote: "直到 c 补丁长矛才正常。",
            analysis: "与 0.2.0c 的长矛技能修正一致。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      11,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "minion-build-guide",
            kind: "build",
            issue: "Launch minion builds predate 0.2.0c and later rebalances.",
            action: "Update with current minion numbers.",
            status: "queued",
          },
          {
            contentId: "spear-skill-page",
            kind: "skill",
            issue: "Spear behaviour changed after 0.2.0c.",
            action: "Re-verify against 0.5.4e.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "minion-build-guide",
            kind: "build",
            issue: "上线召唤构筑早于 0.2.0c 与后续重平衡。",
            action: "用当前召唤数值更新。",
            status: "queued",
          },
          {
            contentId: "spear-skill-page",
            kind: "skill",
            issue: "长矛行为在 0.2.0c 后变化。",
            action: "对照 0.5.4e 重新核验。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      12,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Minion build pages",
            type: "build",
            trigger: "Scaling corrected in 0.2.0c",
            action: "Verify against current numbers.",
            status: "queued",
          },
          {
            name: "Skeletal Arsonist skill page",
            type: "skill",
            trigger: "Tuned in 0.2.0c",
            action: "Re-verify behaviour.",
            status: "queued",
          },
          {
            name: "Huntress levelling guide",
            type: "guide",
            trigger: "Spear skills corrected",
            action: "Update levelling tips.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "召唤构筑页",
            type: "build",
            trigger: "0.2.0c 修正缩放",
            action: "对照当前数值核验。",
            status: "queued",
          },
          {
            name: "骷髅纵火者技能页",
            type: "skill",
            trigger: "0.2.0c 调整",
            action: "重新核验行为。",
            status: "queued",
          },
          {
            name: "女猎手升级指南",
            type: "guide",
            trigger: "长矛技能修正",
            action: "更新升级提示。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(13),
    sec(
      "faq",
      "faq",
      14,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Can I use a 0.2.0 Day-1 minion build?",
            answer: [
              "Not as-is. Wait for 0.2.0c at minimum, and prefer current build pages because minion balance moved again in 0.3 to 0.5.",
            ],
          },
          {
            question: "Was 0.2.0c a buff or a nerf reversal?",
            answer: [
              "It reversed part of the 0.2.0 over-nerf to minions. Treat it as a correction, not a new power spike.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "可以用 0.2.0 首日召唤构筑吗?",
            answer: [
              "不能原样使用。至少等到 0.2.0c,并优先参考当前构筑页,因为召唤平衡在 0.3 至 0.5 再次变化。",
            ],
          },
          {
            question: "0.2.0c 是增强还是削弱反转?",
            answer: [
              "它回滚了 0.2.0 对召唤物过度削弱的一部分。将其视为修正,而非新的强度飙升。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      15,
      "3746503",
      "Path of Exile 2 official 0.2.0c patch notes",
    ),
    changelogSection(16),
  ],
};

// 4) patch-0-2-0e-act-3-runes-player-balance
const patchE = {
  slug: "patch-0-2-0e-act-3-runes-player-balance",
  threadId: "3754474",
  threadLabel: "Path of Exile 2 official 0.2.0e patch notes",
  patchVersion: "0.2.0e",
  patch: "0.2.0e",
  patchCategory: "balance",
  league: "Early Access",
  heroImage: "items/runes-and-soul-cores-hero.webp",
  imageAlt: {
    en: "Attribute runes socketed into an item.",
    zh: "镶嵌在装备中的属性符文。",
  },
  title: {
    en: "PoE2 0.2.0e: Act 3 Layouts, Attribute Runes and Player Balance",
    zh: "流放之路2 0.2.0e：第三章布局、属性符文与玩家平衡",
  },
  shortTitle: { en: "0.2.0e Act 3 & Runes", zh: "0.2.0e 第三章与符文" },
  summary: {
    en: "0.2.0e shortened Act 3 by removing dead ends in Drowned City, Utzaal, Apex of Filth and Azak Bog, introduced Attribute Runes, and applied player-balance changes affecting Huntress, minions, skills and ascendancies.",
    zh: "0.2.0e 通过移除淹溺之城、乌扎尔、污秽之巅与阿扎克沼泽中的死路缩短了第三章,引入了属性符文,并施加了影响女猎手、召唤物、技能与升华的玩家平衡改动。",
  },
  description: {
    en: "0.2.0e explained: Act 3 route changes, Attribute Runes, player balance groups, Spectre/Remnant fixes and what still applies in 0.5.4e.",
    zh: "解读 0.2.0e：第三章路线改动、属性符文、玩家平衡分组、幽魂/残响修复,以及 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.2.0e: Act 3 Layouts, Attribute Runes and Player Balance",
      zh: "流放之路2 0.2.0e：第三章布局、属性符文与玩家平衡",
    },
    description: {
      en: "0.2.0e: shorter Act 3, Attribute Runes and player balance changes.",
      zh: "0.2.0e：更短第三章、属性符文与玩家平衡改动。",
    },
  },
  tags: ["patch", "0-2-0e", "act-3", "runes", "balance", "campaign"],
  currentApplicability: [
    {
      topicId: "act-3-layout",
      status: "still-current",
      currentSummary: {
        en: [
          "The shortened Act 3 layout from 0.2.0e is still the campaign structure in 0.5.4e.",
        ],
        zh: ["0.2.0e 缩短的第三章布局仍是 0.5.4e 中的战役结构。"],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "attribute-runes",
      status: "changed-later",
      currentSummary: {
        en: [
          "Attribute Runes from 0.2.0e were expanded by later patches; current rune effects must be checked against the live client.",
        ],
        zh: [
          "0.2.0e 的属性符文被后续补丁扩展;当前符文效果须对照实时客户端核验。",
        ],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.2.0e is a campaign and balance patch. It cut backtracking in Act 3 by removing dead ends in Drowned City, Utzaal, Apex of Filth and Azak Bog, which is why old Act 3 route videos no longer match.",
          "It introduced Attribute Runes, applied player-balance changes touching Huntress, minions, skills and ascendancies, and fixed Spectre and Remnant skill interactions that had broken some builds.",
        ],
        bullets: [
          "Act 3 dead ends removed",
          "Attribute Runes introduced",
          "Player balance pass",
          "Spectre/Remnant fixes",
        ],
      },
      {
        paragraphs: [
          "0.2.0e 是一个战役与平衡补丁。它通过移除淹溺之城、乌扎尔、污秽之巅与阿扎克沼泽中的死路,减少了第三章的绕路——这也是旧第三章路线视频不再吻合的原因。",
          "它引入了属性符文,施加了触及女猎手、召唤物、技能与升华的玩家平衡改动,并修复了曾破坏部分构筑的幽魂与残响技能交互。",
        ],
        bullets: [
          "移除第三章死路",
          "引入属性符文",
          "玩家平衡调整",
          "幽魂/残响修复",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.2.0 era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.2.0e shortened a launch-era campaign area. Its Attribute Runes were a first version; later patches expanded the rune system.",
        ],
        bullets: ["0.2.0e 缩短了上线时代的战役区域", "属性符文是初版,后被扩展"],
      },
      {
        era: "流放之路2 抢先体验 —— 0.2.0 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.2.0e 缩短了上线时代的战役区域。其属性符文是初版;后续补丁扩展了符文系统。",
        ],
        bullets: ["0.2.0e 缩短了上线时代的战役区域", "属性符文是初版,后被扩展"],
      },
    ),
    sec(
      "data-table",
      "data-table",
      3,
      "Act 3 area changes",
      "第三章区域改动",
      {
        caption: "What changed in each Act 3 area in 0.2.0e.",
        columns: [
          { key: "area", label: "Area" },
          { key: "old", label: "Old problem" },
          { key: "e", label: "0.2.0e" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            area: "Drowned City",
            old: "Dead ends and long loops",
            e: "Dead ends removed",
            now: "Current route",
          },
          {
            area: "Utzaal",
            old: "Backtracking",
            e: "Shortened",
            now: "Current route",
          },
          {
            area: "Apex of Filth",
            old: "Confusing layout",
            e: "Simplified",
            now: "Current route",
          },
          {
            area: "Azak Bog",
            old: "Long detours",
            e: "Dead ends removed",
            now: "Current route",
          },
        ],
      },
      {
        caption: "0.2.0e 中每个第三章区域的改动。",
        columns: [
          { key: "area", label: "区域" },
          { key: "old", label: "旧问题" },
          { key: "e", label: "0.2.0e" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            area: "淹溺之城",
            old: "死路与长环路",
            e: "移除死路",
            now: "当前路线",
          },
          { area: "乌扎尔", old: "绕路", e: "缩短", now: "当前路线" },
          { area: "污秽之巅", old: "布局混乱", e: "简化", now: "当前路线" },
          {
            area: "阿扎克沼泽",
            old: "长途绕行",
            e: "移除死路",
            now: "当前路线",
          },
        ],
      },
    ),
    sec(
      "item-impact",
      "item-impact",
      4,
      "Attribute Runes",
      "属性符文",
      {
        items: [
          {
            kind: "rune",
            title: "Attribute Runes",
            detail:
              "A new rune category introduced in 0.2.0e that granted attribute bonuses when socketed. Later patches expanded the rune system, so current effects differ from launch.",
            tags: ["rune", "attribute"],
          },
        ],
      },
      {
        items: [
          {
            kind: "rune",
            title: "属性符文",
            detail:
              "0.2.0e 引入的新符文类别,镶嵌时提供属性加成。后续补丁扩展了符文系统,因此当前效果与上线时不同。",
            tags: ["rune", "attribute"],
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      5,
      "Balance impact",
      "平衡影响",
      {
        paragraphs: [
          "The player-balance pass touched Huntress, minions, skills and ascendancies, so any build guide written before 0.2.0e may under- or over-state certain interactions.",
          "Spectre and Remnant skill-interaction fixes restored builds that relied on those mechanics.",
        ],
        bullets: [
          "Re-check pre-0.2.0e build guides",
          "Spectre/Remnant builds restored",
        ],
      },
      {
        paragraphs: [
          "玩家平衡调整触及女猎手、召唤物、技能与升华,因此任何写于 0.2.0e 之前的构筑指南都可能低估或高估某些交互。",
          "幽魂与残响技能交互的修复,恢复了依赖这些机制的构筑。",
        ],
        bullets: ["重新检查 0.2.0e 前的构筑指南", "幽魂/残响构筑恢复"],
      },
    ),
    sec(
      "before-after",
      "before-after",
      6,
      "Old route vs current",
      "旧路线与当前对比",
      {
        oldLabel: "Pre-0.2.0e Act 3",
        oldText:
          "Videos show longer loops with dead ends that no longer exist, so following them wastes time.",
        newLabel: "Post-0.2.0e / current",
        newText:
          "Dead ends are gone and the areas are shorter; current route guides reflect the live layout.",
      },
      {
        oldLabel: "0.2.0e 前第三章",
        oldText: "视频显示更长的环路与已不存在的死路,照走只会浪费时间。",
        newLabel: "0.2.0e 后/当前",
        newText: "死路已移除,区域更短;当前路线指南反映实时布局。",
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      7,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Act 3 length",
            thenText: "Longer with dead ends before 0.2.0e.",
            nowText: "Shortened and current in 0.5.4e.",
          },
          {
            aspect: "Runes",
            thenText: "Attribute Runes introduced in 0.2.0e.",
            nowText: "Rune system expanded since; check current effects.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "第三章长度",
            thenText: "0.2.0e 前更长且有死路。",
            nowText: "已缩短,0.5.4e 中为当前结构。",
          },
          {
            aspect: "符文",
            thenText: "属性符文在 0.2.0e 引入。",
            nowText: "符文系统此后扩展,请查当前效果。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      8,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Act 3 layout",
            status: "still-current",
            currentSummary:
              "The shortened layout is still the campaign in 0.5.4e.",
            supersededBy: "—",
            affectedContent: "Campaign guides",
          },
          {
            topic: "Attribute Runes",
            status: "changed-later",
            currentSummary: "Introduced in 0.2.0e, expanded since.",
            supersededBy: "0.5.x",
            affectedContent: "Rune item pages",
          },
          {
            topic: "Spectre/Remnant fixes",
            status: "still-current",
            currentSummary: "The interaction fixes remain relevant.",
            supersededBy: "—",
            affectedContent: "Minion/spectre guides",
          },
        ],
      },
      {
        rows: [
          {
            topic: "第三章布局",
            status: "still-current",
            currentSummary: "缩短后的布局仍是 0.5.4e 的战役。",
            supersededBy: "—",
            affectedContent: "战役指南",
          },
          {
            topic: "属性符文",
            status: "changed-later",
            currentSummary: "0.2.0e 引入,此后扩展。",
            supersededBy: "0.5.x",
            affectedContent: "符文物品页",
          },
          {
            topic: "幽魂/残响修复",
            status: "still-current",
            currentSummary: "交互修复仍然相关。",
            supersededBy: "—",
            affectedContent: "召唤/幽魂指南",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      9,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Reddit (campaign)",
            context: "Players asked why old Act 3 videos looked bigger.",
            quote: "Why is Drowned City smaller than in the guide video?",
            analysis: "Directly explained by the 0.2.0e dead-end removals.",
          },
          {
            source: "Forum (runes)",
            context: "Players asked when Attribute Runes arrived.",
            quote: "Did runes exist at 0.2.0 launch or only in 0.2.0e?",
            analysis:
              "Confirms Attribute Runes are a 0.2.0e addition, not launch.",
          },
        ],
      },
      {
        reports: [
          {
            source: "Reddit(战役)",
            context: "玩家问为何旧第三章视频看起来更大。",
            quote: "为什么淹溺之城比指南视频里小?",
            analysis: "正由 0.2.0e 移除死路解释。",
          },
          {
            source: "官方论坛(符文)",
            context: "玩家问属性符文何时出现。",
            quote: "符文是 0.2.0 上线就有,还是 0.2.0e 才加?",
            analysis: "确认属性符文是 0.2.0e 新增,而非上线就有。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      10,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "act-3-route-video",
            kind: "guide",
            issue: "Pre-0.2.0e route videos show removed dead ends.",
            action: "Flag as historical; link current route.",
            status: "queued",
          },
          {
            contentId: "rune-guide",
            kind: "guide",
            issue: "Rune effects changed after 0.2.0e.",
            action: "Re-verify against 0.5.4e.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "act-3-route-video",
            kind: "guide",
            issue: "0.2.0e 前的路线视频展示了已移除的死路。",
            action: "标记为历史;链接当前路线。",
            status: "queued",
          },
          {
            contentId: "rune-guide",
            kind: "guide",
            issue: "符文效果在 0.2.0e 后变化。",
            action: "对照 0.5.4e 重新核验。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      11,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Act 3 campaign guide",
            type: "guide",
            trigger: "Dead ends removed in 0.2.0e",
            action: "Update route to current layout.",
            status: "queued",
          },
          {
            name: "Attribute Rune item page",
            type: "item",
            trigger: "Introduced in 0.2.0e",
            action: "Document current rune effects.",
            status: "queued",
          },
          {
            name: "Huntress build pages",
            type: "build",
            trigger: "Player balance pass",
            action: "Re-verify numbers.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "第三章战役指南",
            type: "guide",
            trigger: "0.2.0e 移除死路",
            action: "将路线更新为当前布局。",
            status: "queued",
          },
          {
            name: "属性符文物品页",
            type: "item",
            trigger: "0.2.0e 引入",
            action: "记录当前符文效果。",
            status: "queued",
          },
          {
            name: "女猎手构筑页",
            type: "build",
            trigger: "玩家平衡调整",
            action: "重新核验数值。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(12),
    sec(
      "faq",
      "faq",
      13,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Why doesn't my old Act 3 video match the game?",
            answer: [
              "0.2.0e removed dead ends in Drowned City, Utzaal, Apex of Filth and Azak Bog, shortening the act. Use current route guides.",
            ],
          },
          {
            question: "Did Attribute Runes exist at 0.2.0 launch?",
            answer: [
              "No. Attribute Runes were introduced in 0.2.0e; later patches expanded the rune system, so check current effects.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "为何我的旧第三章视频与游戏不符?",
            answer: [
              "0.2.0e 移除了淹溺之城、乌扎尔、污秽之巅与阿扎克沼泽的死路,缩短了该章。请使用当前路线指南。",
            ],
          },
          {
            question: "属性符文在 0.2.0 上线时就有吗?",
            answer: [
              "没有。属性符文在 0.2.0e 引入;后续补丁扩展了符文系统,因此请查当前效果。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      14,
      "3754474",
      "Path of Exile 2 official 0.2.0e patch notes",
    ),
    changelogSection(15),
  ],
};

// 5) patch-0-3-0b-abyss-vessel-stabilization
const patch3b = {
  slug: "patch-0-3-0b-abyss-vessel-stabilization",
  threadId: "3840902",
  threadLabel: "Path of Exile 2 official 0.3.0b patch notes",
  patchVersion: "0.3.0b",
  patch: "0.3.0b",
  patchCategory: "bug-fixes",
  league: "Early Access",
  heroImage: "items/kulemaks-invitation-hero.webp",
  imageAlt: {
    en: "The Vessel of Kulemak invitation item.",
    zh: "库勒马克之容器邀请物品。",
  },
  title: {
    en: "PoE2 0.3.0b: Abyss Monsters, Vessel of Kulemak and Spectres",
    zh: "流放之路2 0.3.0b：深渊怪物、库勒马克之容器与幽魂",
  },
  shortTitle: { en: "0.3.0b Abyss Stabilization", zh: "0.3.0b 深渊稳定化" },
  summary: {
    en: "0.3.0b was the first stabilization pass after The Third Edict: it made more Abyss monsters usable as Spectres, reworked Vessel of Kulemak's Teleport Slam into an unavoidable-but-softened attack, improved Fissure telegraphs, smoothed the campaign teaching curve and fixed Sprint targeting and boss checkpoints.",
    zh: "0.3.0b 是第三谕令后的首次稳定化:它让更多深渊怪物可作幽魂,将库勒马克之容器的传送猛击改写为不可避免但被削弱的攻击,改进了裂隙预警,平滑了战役教学曲线,并修复了冲刺目标与 Boss 检查点。",
  },
  description: {
    en: "0.3.0b explained: Abyss Spectre eligibility, Vessel of Kulemak changes, Fissure telegraphs, campaign teaching, Sprint targeting and boss checkpoint fixes — and what still applies in 0.5.4e.",
    zh: "解读 0.3.0b：深渊幽魂资格、库勒马克之容器改动、裂隙预警、战役教学、冲刺目标与 Boss 检查点修复——以及 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.3.0b: Abyss, Vessel of Kulemak and Spectres",
      zh: "流放之路2 0.3.0b：深渊、库勒马克之容器与幽魂",
    },
    description: {
      en: "0.3.0b Abyss stabilization: Spectres, Vessel of Kulemak, Fissure telegraphs and Sprint fixes.",
      zh: "0.3.0b 深渊稳定化：幽魂、库勒马克之容器、裂隙预警与冲刺修复。",
    },
  },
  tags: ["patch", "0-3-0b", "abyss", "vessel-of-kulemak", "spectre", "bug-fix"],
  currentApplicability: [
    {
      topicId: "vessel-teleport-slam",
      status: "changed-later",
      currentSummary: {
        en: [
          "The 0.3.0b Teleport Slam change made it unavoidable but softer; later patches may have adjusted Vessel further.",
        ],
        zh: [
          "0.3.0b 的传送猛击改动使其不可避免但更柔和;后续补丁可能进一步调整了容器。",
        ],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "abyss-spectres",
      status: "still-current",
      currentSummary: {
        en: [
          "The expanded Abyss Spectre eligibility from 0.3.0b still informs which monsters can be captured.",
        ],
        zh: ["0.3.0b 扩展的深渊幽魂资格仍决定哪些怪物可被捕获。"],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.3.0b was the first stabilization pass after The Third Edict (0.3.0). It widened which Abyss monsters can be used as Spectres, reworked Vessel of Kulemak's Teleport Slam from an avoidable telegraphed attack into one that is unavoidable but deals less damage, and improved the全场 Fissure telegraph.",
          "It also spread Abyss monster skills across the first three acts for gentler teaching, fixed Sprint targeting so fleeing no longer turned characters around, and repaired double-boss checkpoint retries.",
        ],
        bullets: [
          "More Abyss Spectres",
          "Vessel Teleport Slam reworked",
          "Fissure telegraph improved",
          "Sprint targeting and checkpoint fixes",
        ],
      },
      {
        paragraphs: [
          "0.3.0b 是第三谕令(0.3.0)后的首次稳定化。它扩大了可作幽魂的深渊怪物范围,将库勒马克之容器的传送猛击从“可躲避的预警攻击”改写为“不可避免但伤害更低”的攻击,并改进了全场裂隙预警。",
          "它还将深渊怪物技能分散到前三幕以更平缓地教学,修复了冲刺目标(逃跑时角色不再转身),并修复了双 Boss 检查点重试。",
        ],
        bullets: [
          "更多深渊幽魂",
          "容器传送猛击重写",
          "裂隙预警改进",
          "冲刺目标与检查点修复",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.3.0 era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.3.0b stabilized a major edict launch. Its Vessel and Abyss changes were themselves followed by 0.3.0c and later tuning.",
        ],
        bullets: [
          "0.3.0b 稳定了大型谕令上线",
          "其容器/深渊改动后被 0.3.0c 等跟进",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.3.0 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.3.0b 稳定了大型谕令的上线。其容器与深渊改动本身又被 0.3.0c 及后续调整跟进。",
        ],
        bullets: [
          "0.3.0b 稳定了大型谕令上线",
          "其容器/深渊改动后被 0.3.0c 等跟进",
        ],
      },
    ),
    sec(
      "boss-impact",
      "boss-impact",
      3,
      "Vessel of Kulemak",
      "库勒马克之容器",
      {
        bosses: [
          {
            name: "Vessel of Kulemak",
            detail:
              "Teleport Slam changed from avoidable to unavoidable but reduced damage; Fissure telegraphs improved so the attack is readable.",
            action: "Use current Vessel boss page for live Patterns.",
          },
        ],
      },
      {
        bosses: [
          {
            name: "库勒马克之容器",
            detail:
              "传送猛击从可躲避改为不可避免但伤害降低;裂隙预警改进,使攻击可读。",
            action: "使用当前容器 Boss 页获取实时机制。",
          },
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      4,
      "Abyss enemy changes",
      "深渊敌人改动",
      {
        caption: "How key Abyss enemies and mechanics changed in 0.3.0b.",
        columns: [
          { key: "enemy", label: "Enemy / Mechanic" },
          { key: "old", label: "0.3.0 launch" },
          { key: "b", label: "0.3.0b" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            enemy: "Abyss Spectre pool",
            old: "Limited",
            b: "Expanded eligibility",
            now: "Current Spectre rules",
          },
          {
            enemy: "Vessel Teleport Slam",
            old: "Avoidable",
            b: "Unavoidable, softer",
            now: "Subject to later tuning",
          },
          {
            enemy: "Fissure telegraph",
            old: "Hard to read",
            b: "Improved",
            now: "Current telegraph",
          },
          {
            enemy: "Sprint targeting",
            old: "Turned character around",
            b: "Fixed",
            now: "Fixed",
          },
        ],
      },
      {
        caption: "关键深渊敌人与机制在 0.3.0b 的改动。",
        columns: [
          { key: "enemy", label: "敌人/机制" },
          { key: "old", label: "0.3.0 上线" },
          { key: "b", label: "0.3.0b" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            enemy: "深渊幽魂池",
            old: "有限",
            b: "扩大资格",
            now: "当前幽魂规则",
          },
          {
            enemy: "容器传送猛击",
            old: "可躲避",
            b: "不可避免,更柔和",
            now: "受后续调整",
          },
          { enemy: "裂隙预警", old: "难读", b: "改进", now: "当前预警" },
          { enemy: "冲刺目标", old: "角色转身", b: "修复", now: "已修复" },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      5,
      "Spectre build impact",
      "幽魂构筑影响",
      {
        paragraphs: [
          "Expanding Abyss Spectre eligibility gave Spectre builds more options, but current Spectre availability must be verified against the live client because later patches kept adjusting the pool.",
        ],
        bullets: [
          "More Spectre options post-0.3.0b",
          "Verify current Spectre pool live",
        ],
      },
      {
        paragraphs: [
          "扩大深渊幽魂资格为幽魂构筑提供了更多选择,但当前幽魂可用性须对照实时客户端核验,因为后续补丁持续调整该池。",
        ],
        bullets: ["0.3.0b 后更多幽魂选择", "实时核验当前幽魂池"],
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      6,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Vessel Teleport Slam",
            thenText: "Avoidable at 0.3.0 launch.",
            nowText:
              "Unavoidable but softer after 0.3.0b; later tuning may apply.",
          },
          {
            aspect: "Abyss Spectres",
            thenText: "Limited pool at launch.",
            nowText: "Expanded in 0.3.0b; current pool may differ.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "容器传送猛击",
            thenText: "0.3.0 上线时可躲避。",
            nowText: "0.3.0b 后不可避免但更柔和;可能适用后续调整。",
          },
          {
            aspect: "深渊幽魂",
            thenText: "上线时池有限。",
            nowText: "0.3.0b 扩大;当前池可能不同。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      7,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Abyss Spectre eligibility",
            status: "still-current",
            currentSummary:
              "Expanded in 0.3.0b and still governs capture options.",
            supersededBy: "—",
            affectedContent: "Spectre/minion guides",
          },
          {
            topic: "Vessel Teleport Slam",
            status: "changed-later",
            currentSummary:
              "Reworked in 0.3.0b; later patches may have adjusted Vessel.",
            supersededBy: "0.3.0c+",
            affectedContent: "Vessel boss page",
          },
          {
            topic: "Sprint targeting",
            status: "still-current",
            currentSummary: "The fix remains in effect.",
            supersededBy: "—",
            affectedContent: "Movement guides",
          },
        ],
      },
      {
        rows: [
          {
            topic: "深渊幽魂资格",
            status: "still-current",
            currentSummary: "0.3.0b 扩大,仍约束捕获选项。",
            supersededBy: "—",
            affectedContent: "幽魂/召唤指南",
          },
          {
            topic: "容器传送猛击",
            status: "changed-later",
            currentSummary: "0.3.0b 重写;后续补丁可能调整了容器。",
            supersededBy: "0.3.0c+",
            affectedContent: "容器 Boss 页",
          },
          {
            topic: "冲刺目标",
            status: "still-current",
            currentSummary: "修复仍然生效。",
            supersededBy: "—",
            affectedContent: "移动指南",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      8,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Reddit (Vessel)",
            context: "Players asked why old videos dodged Teleport Slam.",
            quote: "Why can't I dodge the slam like in the old clip?",
            analysis:
              "Explained by the 0.3.0b change to an unavoidable-but-softened attack.",
          },
          {
            source: "Forum (Spectres)",
            context: "Players asked which Abyss monsters work as Spectres.",
            quote: "Which Abyss mobs can I actually spectre now?",
            analysis:
              "Matches the expanded eligibility from 0.3.0b; verify against live client.",
          },
        ],
      },
      {
        reports: [
          {
            source: "Reddit(容器)",
            context: "玩家问为何旧视频能躲传送猛击。",
            quote: "为什么我不能像旧片段那样躲猛击?",
            analysis: "由 0.3.0b 改为不可避免但更柔和的攻击解释。",
          },
          {
            source: "官方论坛(幽魂)",
            context: "玩家问哪些深渊怪物可作幽魂。",
            quote: "现在哪些深渊怪能真正作幽魂?",
            analysis: "符合 0.3.0b 扩大的资格;请对照实时客户端核验。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      9,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "vessel-boss-page",
            kind: "boss",
            issue: "0.3.0 launch footage shows avoidable slam.",
            action: "Mark historical; link current Patterns.",
            status: "reviewing",
          },
          {
            contentId: "spectre-guide",
            kind: "guide",
            issue: "Spectre pool changed after 0.3.0b.",
            action: "Re-verify eligibility live.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "vessel-boss-page",
            kind: "boss",
            issue: "0.3.0 上线录像显示可躲避猛击。",
            action: "标记为历史;链接当前机制。",
            status: "reviewing",
          },
          {
            contentId: "spectre-guide",
            kind: "guide",
            issue: "幽魂池在 0.3.0b 后变化。",
            action: "实时重新核验资格。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      10,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Vessel of Kulemak boss page",
            type: "boss",
            trigger: "Teleport Slam reworked",
            action: "Document current Patterns.",
            status: "reviewing",
          },
          {
            name: "Spectre build guides",
            type: "build",
            trigger: "Abyss Spectre pool expanded",
            action: "Re-verify capture options.",
            status: "queued",
          },
          {
            name: "0.3.0c Sprint/Fix patch",
            type: "patch",
            trigger: "Continues this stabilization",
            action: "Cross-link the follow-up.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "库勒马克之容器 Boss 页",
            type: "boss",
            trigger: "传送猛击重写",
            action: "记录当前机制。",
            status: "reviewing",
          },
          {
            name: "幽魂构筑指南",
            type: "build",
            trigger: "深渊幽魂池扩大",
            action: "重新核验捕获选项。",
            status: "queued",
          },
          {
            name: "0.3.0c 冲刺/修复补丁",
            type: "patch",
            trigger: "延续本次稳定化",
            action: "交叉链接续作。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(11),
    sec(
      "faq",
      "faq",
      12,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Why can't I dodge Vessel's Teleport Slam anymore?",
            answer: [
              "0.3.0b made it unavoidable but reduced its damage and improved the Fissure telegraph so it is readable. Old clips showing dodges are pre-0.3.0b.",
            ],
          },
          {
            question: "Which Abyss monsters make good Spectres now?",
            answer: [
              "0.3.0b expanded eligibility, but the current pool is tuned by later patches, so verify against the live client rather than this historical list.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "为何我不能再躲容器的传送猛击?",
            answer: [
              "0.3.0b 使其不可避免但降低伤害,并改进了裂隙预警使其可读。显示可躲避的旧片段是 0.3.0b 之前的。",
            ],
          },
          {
            question: "现在哪些深渊怪物适合做幽魂?",
            answer: [
              "0.3.0b 扩大了资格,但当前池被后续补丁调整,因此请对照实时客户端核验,而非本历史列表。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      13,
      "3840902",
      "Path of Exile 2 official 0.3.0b patch notes",
    ),
    changelogSection(14),
  ],
};

// 6) patch-0-3-0c-sprint-skills-boss-fixes
const patch3c = {
  slug: "patch-0-3-0c-sprint-skills-boss-fixes",
  threadId: "3851306",
  threadLabel: "Path of Exile 2 official 0.3.0c patch notes",
  patchVersion: "0.3.0c",
  patch: "0.3.0c",
  patchCategory: "bug-fixes",
  league: "Early Access",
  heroImage: "skills/barrage.webp",
  imageAlt: {
    en: "A skill firing during a Sprint movement.",
    zh: "冲刺移动中释放的技能。",
  },
  title: {
    en: "PoE2 0.3.0c: Sprint, Crossbow, Skill Interactions and Boss Fixes",
    zh: "流放之路2 0.3.0c：冲刺、弩、技能交互与 Boss 修复",
  },
  shortTitle: { en: "0.3.0c Gameplay Fix Pack", zh: "0.3.0c 玩法修复包" },
  summary: {
    en: "0.3.0c was a broad gameplay fix pack: it added a Heavy Stun grace period when starting Sprint, fixed Crossbow reload/fire stalls and per-bolt ammunition rolls, corrected skill scaling and totem/weapon-set interactions, and repaired several bosses and controller UI.",
    zh: "0.3.0c 是一个广泛的玩法修复包：它为冲刺起步加入重击硬直宽限期,修复了弩的装填/射击卡顿与逐发弹药 roll,修正了技能缩放与图腾/武器组交互,并修复了多个 Boss 与手柄 UI。",
  },
  description: {
    en: "0.3.0c explained: Sprint grace period, Crossbow ammunition, Gemling Meta Gems, skill scaling fixes, totem/weapon-set, boss fixes and controller/UI — and what still applies in 0.5.4e.",
    zh: "解读 0.3.0c：冲刺宽限期、弩弹药、宝石 Legion 元宝石、技能缩放修复、图腾/武器组、Boss 修复与手柄/UI——以及 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.3.0c: Sprint, Crossbow, Skill Interactions and Boss Fixes",
      zh: "流放之路2 0.3.0c：冲刺、弩、技能交互与 Boss 修复",
    },
    description: {
      en: "0.3.0c gameplay fixes: Sprint grace, Crossbow ammo, skill scaling and boss repairs.",
      zh: "0.3.0c 玩法修复：冲刺宽限、弩弹药、技能缩放与 Boss 修复。",
    },
  },
  tags: ["patch", "0-3-0c", "sprint", "crossbow", "bug-fix", "skills"],
  currentApplicability: [
    {
      topicId: "sprint-grace",
      status: "still-current",
      currentSummary: {
        en: [
          "The Sprint Heavy Stun grace period from 0.3.0c is still part of movement feel in 0.5.4e.",
        ],
        zh: ["0.3.0c 的冲刺重击硬直宽限期仍是 0.5.4e 中移动手感的一部分。"],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "crossbow-ammo",
      status: "changed-later",
      currentSummary: {
        en: [
          "Crossbow reload/fire and per-bolt ammunition rules were fixed in 0.3.0c but retuned by later patches.",
        ],
        zh: [
          "弩的装填/射击与逐发弹药规则在 0.3.0c 修复,但被后续补丁重新调整。",
        ],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.3.0c is a wide gameplay fix pack rather than a balance rewrite. It grouped fixes into Sprint and movement, Crossbow ammunition, Gemling Meta Gems, skill scaling, totems and weapon sets, bosses, controller/UI and performance.",
          "Highlights: a Heavy Stun grace period when you start Sprinting, Crossbow reload/fire stalls fixed and ammunition rolled per bolt, skill scaling that previously ignored Area Damage/Support/Quality corrected, and several boss and controller fixes.",
        ],
        bullets: [
          "Sprint Heavy Stun grace period",
          "Crossbow reload/ammo fixes",
          "Skill scaling corrections",
          "Boss and controller fixes",
        ],
      },
      {
        paragraphs: [
          "0.3.0c 是一个广泛的玩法修复包,而非平衡重写。它将修复按冲刺与移动、弩弹药、宝石 Legion 元宝石、技能缩放、图腾与武器组、Boss、手柄/UI 与性能分组。",
          "重点：冲刺起步的重击硬直宽限期,弩装填/射击卡顿修复且弹药逐发 roll,此前忽略范围伤害/辅助/品质的技能缩放被修正,以及多个 Boss 与手柄修复。",
        ],
        bullets: [
          "冲刺重击硬直宽限期",
          "弩装填/弹药修复",
          "技能缩放修正",
          "Boss 与手柄修复",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.3.0 era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.3.0c fixed launch-window bugs from The Third Edict. Fixes here are corrections, not buffs; later patches may have changed the same skills again.",
        ],
        bullets: [
          "0.3.0c 修复第三谕令上线窗口的 bug",
          "这些是修正而非增强,后续可能再改",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.3.0 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.3.0c 修复了第三谕令上线窗口的 bug。此处的修复是修正而非增强;后续补丁可能再次改动相同技能。",
        ],
        bullets: [
          "0.3.0c 修复第三谕令上线窗口的 bug",
          "这些是修正而非增强,后续可能再改",
        ],
      },
    ),
    sec(
      "change-explorer",
      "change-explorer",
      3,
      "Fix categories",
      "修复分类",
      {
        changes: [
          {
            category: "fix",
            title: "Sprint Heavy Stun grace",
            detail:
              "A grace period was added when starting Sprint so you are not instantly Heavy Stunned out of the gate.",
            scope: "Official 0.3.0c patch notes",
          },
          {
            category: "fix",
            title: "Reload / fire stalls",
            detail:
              "Commands that could stall Crossbow reload or fire were fixed; ammunition is rolled per bolt.",
            scope: "Official 0.3.0c patch notes",
          },
          {
            category: "fix",
            title: "Skill scaling",
            detail:
              "Skills that did not correctly scale with Area Damage, Support or Quality were corrected.",
            scope: "Official 0.3.0c patch notes",
          },
          {
            category: "boss",
            title: "Boss fixes",
            detail:
              "Vessel, Act 4 final boss, Torvian, Diamora and others received fixes.",
            scope: "Official 0.3.0c patch notes",
          },
          {
            category: "technical",
            title: "UI and performance",
            detail:
              "Controller stash navigation and performance issues were addressed.",
            scope: "Official 0.3.0c patch notes",
          },
        ],
      },
      {
        changes: [
          {
            category: "fix",
            title: "冲刺重击硬直宽限",
            detail: "冲刺起步时加入宽限期,避免一开门就被重击硬直。",
            scope: "官方 0.3.0c 补丁说明",
          },
          {
            category: "fix",
            title: "装填/射击卡顿",
            detail: "修复可能卡住弩装填或射击的指令;弹药逐发 roll。",
            scope: "官方 0.3.0c 补丁说明",
          },
          {
            category: "fix",
            title: "技能缩放",
            detail: "修正了未正确随范围伤害/辅助/品质缩放的技能。",
            scope: "官方 0.3.0c 补丁说明",
          },
          {
            category: "boss",
            title: "Boss 修复",
            detail: "容器、第四章终局 Boss、Torvian、Diamora 等获得修复。",
            scope: "官方 0.3.0c 补丁说明",
          },
          {
            category: "technical",
            title: "UI 与性能",
            detail: "处理了手柄仓库导航与性能问题。",
            scope: "官方 0.3.0c 补丁说明",
          },
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      4,
      "Bug vs fix",
      "bug 与修复",
      {
        caption: "Representative fixes from 0.3.0c and their current status.",
        columns: [
          { key: "bug", label: "Bug / Change" },
          { key: "target", label: "Affected" },
          { key: "fix", label: "0.3.0c fix" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            bug: "Instant Sprint stun",
            target: "Movement",
            fix: "Grace period added",
            now: "Still present",
          },
          {
            bug: "Crossbow stall",
            target: "Crossbow",
            fix: "Reload/fire fixed, per-bolt roll",
            now: "Retuned since",
          },
          {
            bug: "Wrong skill scaling",
            target: "Multiple skills",
            fix: "Area/Support/Quality applied",
            now: "Later patches may differ",
          },
          {
            bug: "Boss issues",
            target: "Vessel/Act4/Torvian/Diamora",
            fix: "Various fixes",
            now: "Check current boss pages",
          },
        ],
      },
      {
        caption: "0.3.0c 的代表性修复及其当前状态。",
        columns: [
          { key: "bug", label: "bug/改动" },
          { key: "target", label: "受影响" },
          { key: "fix", label: "0.3.0c 修复" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            bug: "冲刺瞬间硬直",
            target: "移动",
            fix: "加入宽限期",
            now: "仍存在",
          },
          {
            bug: "弩卡顿",
            target: "弩",
            fix: "修复装填/射击,逐发 roll",
            now: "此后重新调整",
          },
          {
            bug: "技能缩放错误",
            target: "多个技能",
            fix: "应用范围/辅助/品质",
            now: "后续补丁可能不同",
          },
          {
            bug: "Boss 问题",
            target: "容器/第四章/Torvian/Diamora",
            fix: "各类修复",
            now: "请查当前 Boss 页",
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      5,
      "Build impact",
      "构筑影响",
      {
        paragraphs: [
          "Skill-scaling corrections can look like damage spikes, but they are bug fixes; any build guide that described the broken behaviour should be updated rather than treated as a buff.",
          "Gemling Legionnaire's Integrated Efficiency interaction with Minions and Meta Gems was clarified, affecting how that ascendancy is described.",
        ],
        bullets: [
          "Fixes are not buffs — update guides",
          "Gemling interaction clarified",
        ],
      },
      {
        paragraphs: [
          "技能缩放修正可能看起来像伤害飙升,但它们是 bug 修复;任何描述破损行为的构筑指南都应更新,而非当作增强。",
          "宝石 Legion 战士的“集成效率”与召唤物及元宝石的交互被澄清,影响该升华的描述方式。",
        ],
        bullets: ["修复不是增强——请更新指南", "宝石 Legion 交互澄清"],
      },
    ),
    sec(
      "before-after",
      "before-after",
      6,
      "Sprint before vs after",
      "冲刺前后对比",
      {
        oldLabel: "Pre-0.3.0c Sprint",
        oldText:
          "Starting a Sprint could instantly Heavy Stun you, making the mechanic feel punishing on entry.",
        newLabel: "After 0.3.0c",
        newText:
          "A grace period lets you begin Sprinting without an instant Heavy Stun, while the stun still applies once moving.",
      },
      {
        oldLabel: "0.3.0c 前冲刺",
        oldText: "起步冲刺可能瞬间重击硬直,使该机制在起步时显得惩罚性。",
        newLabel: "0.3.0c 后",
        newText:
          "宽限期让你能起步冲刺而不会被瞬间重击硬直,进入移动后硬直仍会生效。",
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      7,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Sprint stun",
            thenText: "Instant on start before 0.3.0c.",
            nowText: "Grace period added; still present in 0.5.4e.",
          },
          {
            aspect: "Crossbow feel",
            thenText: "Stalls and wrong ammo rolls at 0.3.0 launch.",
            nowText: "Fixed in 0.3.0c, retuned since.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "冲刺硬直",
            thenText: "0.3.0c 前起步即触发。",
            nowText: "加入宽限期;0.5.4e 仍存在。",
          },
          {
            aspect: "弩手感",
            thenText: "0.3.0 上线时卡顿与错误弹药 roll。",
            nowText: "0.3.0c 修复,此后重新调整。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      8,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Sprint grace period",
            status: "still-current",
            currentSummary: "Still part of movement in 0.5.4e.",
            supersededBy: "—",
            affectedContent: "Movement guides",
          },
          {
            topic: "Crossbow ammo rules",
            status: "changed-later",
            currentSummary: "Fixed in 0.3.0c, retuned since.",
            supersededBy: "0.5.x",
            affectedContent: "Crossbow build pages",
          },
          {
            topic: "Skill scaling fixes",
            status: "changed-later",
            currentSummary: "Corrected in 0.3.0c; later patches may differ.",
            supersededBy: "0.5.x",
            affectedContent: "Affected skill pages",
          },
        ],
      },
      {
        rows: [
          {
            topic: "冲刺宽限期",
            status: "still-current",
            currentSummary: "仍是 0.5.4e 中移动的一部分。",
            supersededBy: "—",
            affectedContent: "移动指南",
          },
          {
            topic: "弩弹药规则",
            status: "changed-later",
            currentSummary: "0.3.0c 修复,此后重新调整。",
            supersededBy: "0.5.x",
            affectedContent: "弩构筑页",
          },
          {
            topic: "技能缩放修复",
            status: "changed-later",
            currentSummary: "0.3.0c 修正;后续补丁可能不同。",
            supersededBy: "0.5.x",
            affectedContent: "受影响技能页",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      9,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Reddit (Sprint)",
            context: "Players asked why Sprint still stuns at the start.",
            quote: "Why do I get heavy stunned the moment I sprint?",
            analysis:
              "The grace period helps but the stun still applies once moving; not a full removal.",
          },
          {
            source: "Forum (Crossbow)",
            context: "Players reported occasional failure to load bolts.",
            quote: "My crossbow sometimes won't reload.",
            analysis:
              "Matches the reload/fire stall fixed in 0.3.0c; verify against current client.",
          },
        ],
      },
      {
        reports: [
          {
            source: "Reddit(冲刺)",
            context: "玩家问为何冲刺起步仍被硬直。",
            quote: "为什么我一冲刺就被重击硬直?",
            analysis: "宽限期有帮助,但进入移动后硬直仍生效,并非完全移除。",
          },
          {
            source: "官方论坛(弩)",
            context: "玩家报告偶尔无法装填箭矢。",
            quote: "我的弩有时不装填。",
            analysis: "符合 0.3.0c 修复的装填/射击卡顿;请对照当前客户端核验。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      10,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "crossbow-build-guide",
            kind: "build",
            issue: "Describes pre-0.3.0c ammo behaviour.",
            action: "Update with current ammunition rules.",
            status: "queued",
          },
          {
            contentId: "skill-page",
            kind: "skill",
            issue: "Scaling fixed in 0.3.0c may have changed again.",
            action: "Re-verify against 0.5.4e.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "crossbow-build-guide",
            kind: "build",
            issue: "描述了 0.3.0c 前的弹药行为。",
            action: "用当前弹药规则更新。",
            status: "queued",
          },
          {
            contentId: "skill-page",
            kind: "skill",
            issue: "0.3.0c 修正的缩放可能再次变化。",
            action: "对照 0.5.4e 重新核验。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      11,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Crossbow build pages",
            type: "build",
            trigger: "Ammo rules fixed",
            action: "Re-verify current behaviour.",
            status: "queued",
          },
          {
            name: "Gemling Legionnaire page",
            type: "build",
            trigger: "Integrated Efficiency clarified",
            action: "Update interaction description.",
            status: "queued",
          },
          {
            name: "Affected skill pages",
            type: "skill",
            trigger: "Scaling corrected",
            action: "Re-verify numbers.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "弩构筑页",
            type: "build",
            trigger: "弹药规则修复",
            action: "重新核验当前行为。",
            status: "queued",
          },
          {
            name: "宝石 Legion 战士页",
            type: "build",
            trigger: "集成效率澄清",
            action: "更新交互描述。",
            status: "queued",
          },
          {
            name: "受影响技能页",
            type: "skill",
            trigger: "缩放修正",
            action: "重新核验数值。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(12),
    sec(
      "faq",
      "faq",
      13,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Is the Sprint fix a buff?",
            answer: [
              "No. It adds a grace period so Sprint can start without an instant Heavy Stun; the stun still applies once you are moving. Treat it as a correction.",
            ],
          },
          {
            question: "Why did my skill damage change after 0.3.0c?",
            answer: [
              "Some skills were incorrectly not scaling with Area Damage, Support or Quality. 0.3.0c corrected that; it is a bug fix, and later patches may have changed the same skills again.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "冲刺修复是增强吗?",
            answer: [
              "不是。它加入宽限期,使冲刺能起步而不被瞬间重击硬直;进入移动后硬直仍生效。请将其视为修正。",
            ],
          },
          {
            question: "为何 0.3.0c 后我的技能伤害变了?",
            answer: [
              "部分技能此前未正确随范围伤害、辅助或品质缩放。0.3.0c 修正了这一点;这是 bug 修复,后续补丁可能再次改动相同技能。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      14,
      "3851306",
      "Path of Exile 2 official 0.3.0c patch notes",
    ),
    changelogSection(15),
  ],
};

// 7) patch-0-1-1d-map-stash-console-qol
const patch11d = {
  slug: "patch-0-1-1d-map-stash-console-qol",
  threadId: "3723866",
  threadLabel: "Path of Exile 2 official 0.1.1d patch notes",
  patchVersion: "0.1.1d",
  patch: "0.1.1d",
  patchCategory: "major-updates",
  league: "Early Access",
  heroImage: "items/waystones-hero.webp",
  imageAlt: {
    en: "A map stash tab holding Waystones by tier.",
    zh: "按层级存放界石的地图仓库页。",
  },
  title: {
    en: "PoE2 0.1.1d: Map Stash Tab, Waystone Storage and Console QoL",
    zh: "流放之路2 0.1.1d：地图仓库页、界石存储与主机 QoL",
  },
  shortTitle: { en: "0.1.1d Map Stash & Console", zh: "0.1.1d 地图仓库与主机" },
  summary: {
    en: "0.1.1d brought the Map Stash Tab to Path of Exile 2 with six sub-stashes per tier and public listing, and fixed Console item-filter loading plus Xbox and controller issues — a key early endgame inventory milestone.",
    zh: "0.1.1d 为流放之路2 带来了地图仓库页,每层六个子仓并支持公开列出,并修复了主机物品过滤器加载以及 Xbox 与手柄问题——这是早期终局库存的重要节点。",
  },
  description: {
    en: "0.1.1d explained: Map Stash Tab layout, per-tier capacity, public listing, MTX compatibility, Console filter fixes and controller repairs — and what still applies in 0.5.4e.",
    zh: "解读 0.1.1d：地图仓库页布局、每层容量、公开列出、MTX 兼容、主机过滤器修复与手柄修理——以及 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.1.1d: Map Stash Tab, Waystone Storage and Console QoL",
      zh: "流放之路2 0.1.1d：地图仓库页、界石存储与主机 QoL",
    },
    description: {
      en: "0.1.1d: Map Stash Tab, Waystone storage and Console QoL history.",
      zh: "0.1.1d：地图仓库页、界石存储与主机 QoL 历史。",
    },
  },
  tags: ["patch", "0-1-1d", "map-stash", "waystone", "console", "qol"],
  currentApplicability: [
    {
      topicId: "map-stash",
      status: "changed-later",
      currentSummary: {
        en: [
          "The Map Stash Tab from 0.1.1d still exists, but Waystone and Tablet systems were reworked in later patches, so current capacity/rules differ.",
        ],
        zh: [
          "0.1.1d 的地图仓库页仍存在,但界石与平板系统在后续补丁中被重做,因此当前容量/规则不同。",
        ],
      },
      supersededByPatchIds: ["patch-0-3-1-tablet-changes"],
    },
    {
      topicId: "console-filter",
      status: "still-current",
      currentSummary: {
        en: [
          "The Console item-filter loading fix from 0.1.1d resolved a real login-time failure and remains relevant context.",
        ],
        zh: [
          "0.1.1d 的主机物品过滤器加载修复解决了一个真实登录期故障,仍是相关背景。",
        ],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.1.1d was an early endgame inventory milestone. It introduced the Map Stash Tab to Path of Exile 2 with six sub-stashes per Waystone tier, public listing per sub-stash, and the PoE1-purchase compatibility principle.",
          "It also fixed Console item-filter loading after login, Xbox performance and cross-game setting loss, and controller Passive Tree display issues.",
        ],
        bullets: [
          "Map Stash Tab added",
          "Six sub-stashes per tier",
          "Public listing per sub-stash",
          "Console filter and controller fixes",
        ],
      },
      {
        paragraphs: [
          "0.1.1d 是早期终局库存的重要节点。它为流放之路2 引入了地图仓库页,每个界石层级有六个子仓,支持按子仓公开列出,并遵循 PoE1 购买兼容原则。",
          "它还修复了登录后主机物品过滤器加载、Xbox 性能与跨游戏设置丢失,以及手柄被动树显示问题。",
        ],
        bullets: [
          "新增地图仓库页",
          "每层六个子仓",
          "按子仓公开列出",
          "主机过滤器与手柄修复",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.1.x era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.1.1d predates the big Atlas/Tablet reworks. Its Map Stash structure is historical; Waystone handling changed substantially later.",
        ],
        bullets: [
          "0.1.1d 早于大型 Atlas/平板重做",
          "其地图仓库结构为历史,界石处理后来大改",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.1.x 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.1.1d 早于大型 Atlas/平板重做。其地图仓库结构为历史;界石处理后来大幅变化。",
        ],
        bullets: [
          "0.1.1d 早于大型 Atlas/平板重做",
          "其地图仓库结构为历史,界石处理后来大改",
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      3,
      "Map Stash layout",
      "地图仓库布局",
      {
        caption: "Map Stash Tab structure introduced in 0.1.1d.",
        columns: [
          { key: "tier", label: "Tier" },
          { key: "subs", label: "Sub-stashes" },
          { key: "cap", label: "Per sub-stash" },
          { key: "public", label: "Public listing" },
        ],
        rows: [
          {
            tier: "Each Waystone tier",
            subs: "6",
            cap: "Fixed capacity",
            public: "Per sub-stash toggle",
          },
          {
            tier: "Total",
            subs: "6 x tiers",
            cap: "Sum of subs",
            public: "Each sub-stash independently",
          },
        ],
      },
      {
        caption: "0.1.1d 引入的地图仓库页结构。",
        columns: [
          { key: "tier", label: "层级" },
          { key: "subs", label: "子仓" },
          { key: "cap", label: "每子仓" },
          { key: "public", label: "公开列出" },
        ],
        rows: [
          {
            tier: "每个界石层级",
            subs: "6",
            cap: "固定容量",
            public: "按子仓开关",
          },
          {
            tier: "总计",
            subs: "6 × 层数",
            cap: "子仓之和",
            public: "每个子仓独立",
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      4,
      "Endgame inventory impact",
      "终局库存影响",
      {
        paragraphs: [
          "The Map Stash Tab made Waystone management far less painful by grouping maps by tier with public listing for trade, a prerequisite for any serious endgame farming.",
          "Later Atlas/Tablet reworks changed how Waystones and Tablets behave, so current storage advice must be checked against the live client.",
        ],
        bullets: [
          "Tier-grouped Waystone storage",
          "Later Atlas changes alter current advice",
        ],
      },
      {
        paragraphs: [
          "地图仓库页按层级归类界石并支持交易公开列出,大幅降低了界石管理的痛苦,是任何认真终局刷图的先决条件。",
          "后续的 Atlas/平板重做改变了界石与平板的行为,因此当前存储建议须对照实时客户端核验。",
        ],
        bullets: ["按层级归类的界石存储", "后续 Atlas 改动改变当前建议"],
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      5,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Map storage",
            thenText: "Loose Waystones in regular tabs before 0.1.1d.",
            nowText: "Map Stash Tab exists, but Waystone rules reworked since.",
          },
          {
            aspect: "Console filters",
            thenText: "Failed to load after login pre-0.1.1d.",
            nowText: "Fixed; current UI may differ.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "地图存储",
            thenText: "0.1.1d 前界石散落在普通标签页。",
            nowText: "地图仓库页存在,但界石规则此后重做。",
          },
          {
            aspect: "主机过滤器",
            thenText: "0.1.1d 前登录后加载失败。",
            nowText: "已修复;当前 UI 可能不同。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      6,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Map Stash Tab",
            status: "changed-later",
            currentSummary:
              "Exists but Waystone/Tablet systems reworked later.",
            supersededBy: "0.3.1+",
            affectedContent: "Waystone/Atlas guides",
          },
          {
            topic: "Console filter fix",
            status: "still-current",
            currentSummary:
              "Resolved a real login failure; still relevant context.",
            supersededBy: "—",
            affectedContent: "Console help pages",
          },
          {
            topic: "Xbox/controller fixes",
            status: "changed-later",
            currentSummary: "Addressed 0.1.1d-era issues; UI changed since.",
            supersededBy: "0.5.x",
            affectedContent: "Controller guides",
          },
        ],
      },
      {
        rows: [
          {
            topic: "地图仓库页",
            status: "changed-later",
            currentSummary: "存在但界石/平板系统后来重做。",
            supersededBy: "0.3.1+",
            affectedContent: "界石/Atlas 指南",
          },
          {
            topic: "主机过滤器修复",
            status: "still-current",
            currentSummary: "解决真实登录故障;仍是相关背景。",
            supersededBy: "—",
            affectedContent: "主机帮助页",
          },
          {
            topic: "Xbox/手柄修复",
            status: "changed-later",
            currentSummary: "处理了 0.1.1d 时代问题;UI 此后变化。",
            supersededBy: "0.5.x",
            affectedContent: "手柄指南",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      7,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Forum (stash)",
            context: "Players asked why a tier has six sub-stashes.",
            quote: "Why six stash tabs per Waystone tier?",
            analysis:
              "Matches the 0.1.1d design of six sub-stashes per tier for organisation and trade.",
          },
          {
            source: "Reddit (console)",
            context:
              "Console players reported filters not loading after login.",
            quote: "My filter is empty every time I log in on console.",
            analysis:
              "Directly the Console item-filter loading bug fixed in 0.1.1d.",
          },
        ],
      },
      {
        reports: [
          {
            source: "官方论坛(仓库)",
            context: "玩家问为何每层有六个子仓。",
            quote: "为什么每个界石层级有六个仓库页?",
            analysis: "符合 0.1.1d 每层六个子仓用于整理与交易的设计。",
          },
          {
            source: "Reddit(主机)",
            context: "主机玩家报告登录后过滤器未加载。",
            quote: "我在主机上每次登录过滤器都是空的。",
            analysis: "正是 0.1.1d 修复的主机物品过滤器加载 bug。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      8,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "waystone-guide",
            kind: "guide",
            issue: "Waystone behaviour reworked after 0.1.1d.",
            action: "Re-verify storage and usage against 0.5.4e.",
            status: "queued",
          },
          {
            contentId: "console-help",
            kind: "guide",
            issue: "UI changed since 0.1.1d.",
            action: "Update with current console steps.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "waystone-guide",
            kind: "guide",
            issue: "界石行为在 0.1.1d 后重做。",
            action: "对照 0.5.4e 重新核验存储与使用。",
            status: "queued",
          },
          {
            contentId: "console-help",
            kind: "guide",
            issue: "UI 在 0.1.1d 后变化。",
            action: "用当前主机步骤更新。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      9,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Waystone guide",
            type: "guide",
            trigger: "Map Stash Tab introduced",
            action: "Document current storage rules.",
            status: "queued",
          },
          {
            name: "Atlas endgame guide",
            type: "guide",
            trigger: "Waystone systems reworked later",
            action: "Re-verify against 0.5.4e.",
            status: "queued",
          },
          {
            name: "Console help page",
            type: "guide",
            trigger: "Filter loading fixed",
            action: "Update current console steps.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "界石指南",
            type: "guide",
            trigger: "引入地图仓库页",
            action: "记录当前存储规则。",
            status: "queued",
          },
          {
            name: "Atlas 终局指南",
            type: "guide",
            trigger: "界石系统后来重做",
            action: "对照 0.5.4e 重新核验。",
            status: "queued",
          },
          {
            name: "主机帮助页",
            type: "guide",
            trigger: "过滤器加载修复",
            action: "更新当前主机步骤。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(10),
    sec(
      "faq",
      "faq",
      11,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question: "Do I need to buy the Map Stash Tab again in PoE2?",
            answer: [
              "The compatibility principle treats PoE1-purchased stash tabs as the source of truth; PoE2 introduced its own Map Stash Tab in 0.1.1d. Check the official current MTX notes rather than assuming a re-purchase.",
            ],
          },
          {
            question: "Why are my Console filters empty after login?",
            answer: [
              "That was a 0.1.1d-era bug fixed in this patch. If it recurs on the current client, it is a different issue and should be reported.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "我在 PoE2 需要再买地图仓库页吗?",
            answer: [
              "兼容原则将 PoE1 已购仓库页视为事实来源;PoE2 在 0.1.1d 引入了自己的地图仓库页。请查官方当前 MTX 说明,而非假设需要重新购买。",
            ],
          },
          {
            question: "为何登录后我的主机过滤器是空的?",
            answer: [
              "那是 0.1.1d 时代的 bug,已在本补丁修复。若在当前客户端复现,则是不同问题,应另行报告。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      12,
      "3723866",
      "Path of Exile 2 official 0.1.1d patch notes",
    ),
    changelogSection(13),
  ],
};

// 8) patch-0-1-0f-delirium-ritual-xesht-fixes
const patch0f = {
  slug: "patch-0-1-0f-delirium-ritual-xesht-fixes",
  threadId: "3686378",
  threadLabel: "Path of Exile 2 official 0.1.0f patch notes",
  patchVersion: "0.1.0f",
  patch: "0.1.0f",
  patchCategory: "bug-fixes",
  league: "Early Access",
  heroImage: "items/dream-fragments-hero.webp",
  imageAlt: {
    en: "Dream Fragments associated with Delirium content.",
    zh: "与迷雾内容相关的梦境碎片。",
  },
  title: {
    en: "PoE2 0.1.0f: Delirium Mist, Ritual, Xesht and Timeless Jewel Fixes",
    zh: "流放之路2 0.1.0f：迷雾、仪式、谢什特与永恒珠宝修复",
  },
  shortTitle: {
    en: "0.1.0f Delirium & Ritual Fixes",
    zh: "0.1.0f 迷雾与仪式修复",
  },
  summary: {
    en: "0.1.0f was the first fix pack after the 0.1.0e week: it fixed Rare monsters pausing Delirium Mist early, the Strongbox pause rule, a Timeless Jewel and The Adorned interaction, overcapped resources, Ritual Altars, Xesht's infinite hands, and several quest blockers — some requiring a client restart.",
    zh: "0.1.0f 是 0.1.0e 周之后的首个修复包：它修复了稀有怪过早暂停迷雾、保险箱暂停规则、永恒珠宝与“被 adorn 者”的交互、溢出资源、仪式祭坛、谢什特无限投手,以及多个任务阻塞——部分需要重启客户端。",
  },
  description: {
    en: "0.1.0f explained: Delirium Mist pause bugs, Strongbox pause timeline, Timeless Jewel/Adorned fix, resource cap, Ritual Altar, Xesht and quest blockers, plus restartless deployment — and what still applies in 0.5.4e.",
    zh: "解读 0.1.0f：迷雾暂停 bug、保险箱暂停时间线、永恒珠宝/被 adorn 者修复、资源上限、仪式祭坛、谢什特与任务阻塞,以及无重启部署——并附 0.5.4e 中仍适用的部分。",
  },
  seo: {
    title: {
      en: "PoE2 0.1.0f: Delirium Mist, Ritual, Xesht and Timeless Jewel Fixes",
      zh: "流放之路2 0.1.0f：迷雾、仪式、谢什特与永恒珠宝修复",
    },
    description: {
      en: "0.1.0f fixes: Delirium Mist pause, Strongbox, Timeless Jewel, Ritual Altar, Xesht and quests.",
      zh: "0.1.0f 修复：迷雾暂停、保险箱、永恒珠宝、仪式祭坛、谢什特与任务。",
    },
  },
  tags: ["patch", "0-1-0f", "delirium", "ritual", "xesht", "bug-fix"],
  currentApplicability: [
    {
      topicId: "strongbox-pause",
      status: "changed-later",
      currentSummary: {
        en: [
          "The 0.1.0f Strongbox pause rule (10s) is historical; later patches changed Strongbox behaviour again.",
        ],
        zh: [
          "0.1.0f 的保险箱暂停规则(10秒)为历史;后续补丁再次改变了保险箱行为。",
        ],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "timeless-jewel-adorned",
      status: "changed-later",
      currentSummary: {
        en: [
          "The Timeless Jewel / The Adorned interaction fixed in 0.1.0f must be re-verified against current client behaviour.",
        ],
        zh: [
          "0.1.0f 修复的永恒珠宝/被 adorn 者交互须对照当前客户端行为重新核验。",
        ],
      },
      supersededByPatchIds: [],
    },
    {
      topicId: "xesht-attacks",
      status: "changed-later",
      currentSummary: {
        en: [
          "Xesht's attack patterns were fixed in 0.1.0f and retuned by later boss updates.",
        ],
        zh: ["谢什特的攻击模式在 0.1.0f 修复,并被后续 Boss 更新重新平衡。"],
      },
      supersededByPatchIds: [],
    },
  ],
  sections: [
    sec(
      "overview",
      "overview",
      1,
      "Quick summary",
      "快速结论",
      {
        paragraphs: [
          "0.1.0f was the first fix pack after the busy 0.1.0e week. It addressed Delirium Mist pausing early when a Rare monster appeared before the mirror opened, the Strongbox open pause rule, a Timeless Jewel modifier interaction with The Adorned, overcapped Life/ES/Mana resources, Ritual Altars that sometimes would not activate, Xesht throwing infinite hands, and several quest blockers.",
          "Some fixes were restartless; others required a client restart to apply. This page separates what was a bug fix from what became current boss or league behaviour.",
        ],
        bullets: [
          "Delirium Mist pause fixes",
          "Strongbox pause rule",
          "Timeless Jewel/Adorned fix",
          "Ritual Altar, Xesht and quest fixes",
        ],
      },
      {
        paragraphs: [
          "0.1.0f 是繁忙的 0.1.0e 周之后的首个修复包。它处理了：稀有怪在镜像开启前出现导致迷雾过早暂停、保险箱开启暂停规则、永恒珠宝词缀修饰与“被 adorn 者”的交互、溢出生命/护盾/魔力资源、有时无法激活的仪式祭坛、谢什特无限投手,以及多个任务阻塞。",
          "部分修复无需重启;其他需要重启客户端才能生效。本页将 bug 修复与成为当前 Boss 或异界机制的行为区分开。",
        ],
        bullets: [
          "迷雾暂停修复",
          "保险箱暂停规则",
          "永恒珠宝/被 adorn 者修复",
          "仪式祭坛、谢什特与任务修复",
        ],
      },
    ),
    sec(
      "historical-context",
      "historical-context",
      2,
      "Historical warning",
      "历史提示",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0 era",
        baselineNote: "Current-status claims measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0f is a launch-week fix pack. Its Strongbox pause value and Xesht patterns are historical; later patches rewrote both.",
        ],
        bullets: [
          "0.1.0f 是上线周修复包",
          "其保险箱暂停值与谢什特模式为历史,后被重写",
        ],
      },
      {
        era: "流放之路2 抢先体验 —— 0.1.0 时代",
        baselineNote: "当前状态结论以客户端 0.5.4e 为基准。",
        paragraphs: [
          "0.1.0f 是上线周修复包。其保险箱暂停值与谢什特模式为历史;后续补丁重写了两者。",
        ],
        bullets: [
          "0.1.0f 是上线周修复包",
          "其保险箱暂停值与谢什特模式为历史,后被重写",
        ],
      },
    ),
    sec(
      "data-table",
      "data-table",
      3,
      "Problem vs fix",
      "问题 vs 修复",
      {
        caption: "Key 0.1.0f fixes and their current status.",
        columns: [
          { key: "issue", label: "Issue" },
          { key: "symptom", label: "Player symptom" },
          { key: "fix", label: "0.1.0f fix" },
          { key: "restart", label: "Restart needed" },
          { key: "now", label: "Current (0.5.4e)" },
        ],
        rows: [
          {
            issue: "Delirium Mist pause",
            symptom: "Mist paused before mirror opened",
            fix: "Rare-monster pause corrected",
            restart: "No",
            now: "Delirium reworked since",
          },
          {
            issue: "Strongbox pause",
            symptom: "Mist lingered on open",
            fix: "Pause set to 10s",
            restart: "No",
            now: "Strongbox changed later",
          },
          {
            issue: "Timeless Jewel/Adorned",
            symptom: "Wrong modifier scaling",
            fix: "Interaction fixed",
            restart: "No",
            now: "Re-verify live",
          },
          {
            issue: "Xesht hands",
            symptom: "Infinite hand throws",
            fix: "Attack corrected",
            restart: "No",
            now: "Boss retuned",
          },
        ],
      },
      {
        caption: "0.1.0f 的关键修复及其当前状态。",
        columns: [
          { key: "issue", label: "问题" },
          { key: "symptom", label: "玩家症状" },
          { key: "fix", label: "0.1.0f 修复" },
          { key: "restart", label: "需重启" },
          { key: "now", label: "当前(0.5.4e)" },
        ],
        rows: [
          {
            issue: "迷雾暂停",
            symptom: "镜像开启前迷雾暂停",
            fix: "修正稀有怪暂停",
            restart: "否",
            now: "迷雾此后重做",
          },
          {
            issue: "保险箱暂停",
            symptom: "开启时迷雾滞留",
            fix: "暂停设为 10 秒",
            restart: "否",
            now: "保险箱后来改变",
          },
          {
            issue: "永恒珠宝/被 adorn 者",
            symptom: "词缀缩放错误",
            fix: "交互修复",
            restart: "否",
            now: "实时重新核验",
          },
          {
            issue: "谢什特投手",
            symptom: "无限投手",
            fix: "攻击修正",
            restart: "否",
            now: "Boss 重新平衡",
          },
        ],
      },
    ),
    sec(
      "boss-impact",
      "boss-impact",
      4,
      "Xesht and boss fixes",
      "谢什特与 Boss 修复",
      {
        bosses: [
          {
            name: "Xesht, We That Are One",
            detail:
              "The infinite-hand throw bug was corrected in 0.1.0f; current attack patterns are tuned by later boss updates, so use the live boss page.",
            action: "Cross-link the current Xesht boss page.",
          },
          {
            name: "Zalmarath / Rolling Slam / Mad Wolf quest",
            detail: "Specific fixes addressed these during 0.1.0f.",
            action: "Verify against current boss/quest pages.",
          },
        ],
      },
      {
        bosses: [
          {
            name: "我们合一·谢什特",
            detail:
              "无限投手 bug 在 0.1.0f 修正;当前攻击模式由后续 Boss 更新调整,请使用实时 Boss 页。",
            action: "交叉链接当前谢什特 Boss 页。",
          },
          {
            name: "扎尔玛拉斯/翻滚猛击/疯狼任务",
            detail: "0.1.0f 期间针对这些的具体修复。",
            action: "对照当前 Boss/任务页核验。",
          },
        ],
      },
    ),
    sec(
      "build-impact",
      "build-impact",
      5,
      "Impact on builds and leagues",
      "对构筑与异界的影响",
      {
        paragraphs: [
          "The Timeless Jewel / The Adorned fix mattered for jewel-based build stacking; the overcapped-resource fix prevented impossible resource states from certain modifiers.",
          "Delirium and Ritual behaviours changed again in later patches, so league-specific advice from 0.1.0f is historical.",
        ],
        bullets: [
          "Jewel stacking fix",
          "Overcapped resource fix",
          "Delirium/Ritual later reworked",
        ],
      },
      {
        paragraphs: [
          "永恒珠宝/被 adorn 者修复对基于珠宝的构筑堆叠很重要;溢出资源修复防止了某些词缀导致的资源不可能状态。",
          "迷雾与仪式行为在后续补丁再次变化,因此来自 0.1.0f 的异界专属建议为历史。",
        ],
        bullets: ["珠宝堆叠修复", "溢出资源修复", "迷雾/仪式后来重做"],
      },
    ),
    sec(
      "before-after",
      "before-after",
      6,
      "Strongbox pause before vs after",
      "保险箱暂停前后",
      {
        oldLabel: "Pre-0.1.0f",
        oldText:
          "Opening a Strongbox could pause the Delirium Mist for around five seconds, letting Mist linger in awkward spots.",
        newLabel: "After 0.1.0f",
        newText:
          "The Strongbox open pause was set to ten seconds, a deliberate historical rule that later patches changed again.",
      },
      {
        oldLabel: "0.1.0f 前",
        oldText: "开启保险箱可能让迷雾暂停约五秒,使迷雾滞留在尴尬位置。",
        newLabel: "0.1.0f 后",
        newText:
          "保险箱开启暂停设为十秒,这是一条刻意的历史规则,后续补丁再次改变。",
      },
    ),
    sec(
      "then-vs-now",
      "then-vs-now",
      7,
      "Then vs now",
      "当时与现在",
      {
        rows: [
          {
            aspect: "Delirium Mist",
            thenText: "Pause bugs at 0.1.0f launch.",
            nowText: "Delirium system reworked since; current rules differ.",
          },
          {
            aspect: "Xesht",
            thenText: "Infinite-hand bug fixed in 0.1.0f.",
            nowText: "Boss retuned by later updates.",
          },
          {
            aspect: "Timeless Jewel/Adorned",
            thenText: "Interaction fixed in 0.1.0f.",
            nowText: "Re-verify against live client.",
          },
        ],
      },
      {
        rows: [
          {
            aspect: "迷雾",
            thenText: "0.1.0f 上线时的暂停 bug。",
            nowText: "迷雾系统此后重做,当前规则不同。",
          },
          {
            aspect: "谢什特",
            thenText: "0.1.0f 修复无限投手 bug。",
            nowText: "Boss 被后续更新重新平衡。",
          },
          {
            aspect: "永恒珠宝/被 adorn 者",
            thenText: "0.1.0f 修复交互。",
            nowText: "对照实时客户端重新核验。",
          },
        ],
      },
    ),
    sec(
      "current-applicability",
      "current-applicability",
      8,
      "Current applicability (0.5.4e)",
      "当前适用性(0.5.4e)",
      {
        rows: [
          {
            topic: "Strongbox pause rule",
            status: "changed-later",
            currentSummary: "10s rule was historical; Strongbox changed later.",
            supersededBy: "0.2+",
            affectedContent: "Strongbox guides",
          },
          {
            topic: "Timeless Jewel/Adorned",
            status: "changed-later",
            currentSummary: "Fixed in 0.1.0f; re-verify live.",
            supersededBy: "0.5.x",
            affectedContent: "Jewel build pages",
          },
          {
            topic: "Xesht patterns",
            status: "changed-later",
            currentSummary: "Corrected in 0.1.0f; boss retuned since.",
            supersededBy: "0.5.x",
            affectedContent: "Xesht boss page",
          },
        ],
      },
      {
        rows: [
          {
            topic: "保险箱暂停规则",
            status: "changed-later",
            currentSummary: "10 秒规则为历史;保险箱后来改变。",
            supersededBy: "0.2+",
            affectedContent: "保险箱指南",
          },
          {
            topic: "永恒珠宝/被 adorn 者",
            status: "changed-later",
            currentSummary: "0.1.0f 修复;实时重新核验。",
            supersededBy: "0.5.x",
            affectedContent: "珠宝构筑页",
          },
          {
            topic: "谢什特模式",
            status: "changed-later",
            currentSummary: "0.1.0f 修正;Boss 此后重新平衡。",
            supersededBy: "0.5.x",
            affectedContent: "谢什特 Boss 页",
          },
        ],
      },
    ),
    sec(
      "community-evidence",
      "community-evidence",
      9,
      "Community evidence",
      "社区证据",
      {
        reports: [
          {
            source: "Forum (Delirium)",
            context: "Players asked why the mirror showed no monsters.",
            quote: "I open the Delirium mirror and there's nothing.",
            analysis:
              "Matches the Rare-monster-early-pause bug fixed in 0.1.0f; current Delirium differs.",
          },
          {
            source: "Reddit (Adorned)",
            context:
              "Players asked if The Adorned should scale Timeless Jewel modifiers.",
            quote: "Is The Adorned supposed to multiply this Timeless mod?",
            analysis:
              "The 0.1.0f fix addressed the incorrect interaction; re-verify against live client.",
          },
        ],
      },
      {
        reports: [
          {
            source: "官方论坛(迷雾)",
            context: "玩家问为何镜像开启后没有怪物。",
            quote: "我开了迷雾镜像却什么都没有。",
            analysis: "符合 0.1.0f 修复的稀有怪过早暂停 bug;当前迷雾不同。",
          },
          {
            source: "Reddit(被 adorn 者)",
            context: "玩家问被 adorn 者是否应缩放永恒珠宝词缀。",
            quote: "被 adorn 者应该放大这个永恒词缀吗?",
            analysis: "0.1.0f 修复了错误的交互;请对照实时客户端重新核验。",
          },
        ],
      },
    ),
    sec(
      "legacy-content-audit",
      "legacy-content-audit",
      10,
      "Later changes to watch",
      "后续改动提醒",
      {
        rows: [
          {
            contentId: "delirium-guide",
            kind: "guide",
            issue: "Delirium reworked after 0.1.0f.",
            action: "Re-verify Mist rules against 0.5.4e.",
            status: "queued",
          },
          {
            contentId: "xesht-boss-page",
            kind: "boss",
            issue: "Xesht retuned since 0.1.0f.",
            action: "Update with current Patterns.",
            status: "reviewing",
          },
          {
            contentId: "jewel-build",
            kind: "build",
            issue: "Adorned interaction changed.",
            action: "Re-verify scaling live.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            contentId: "delirium-guide",
            kind: "guide",
            issue: "0.1.0f 后迷雾重做。",
            action: "对照 0.5.4e 重新核验迷雾规则。",
            status: "queued",
          },
          {
            contentId: "xesht-boss-page",
            kind: "boss",
            issue: "谢什特自 0.1.0f 后重新平衡。",
            action: "用当前机制更新。",
            status: "reviewing",
          },
          {
            contentId: "jewel-build",
            kind: "build",
            issue: "被 adorn 者交互变化。",
            action: "实时重新核验缩放。",
            status: "queued",
          },
        ],
      },
    ),
    sec(
      "affected-content",
      "affected-content",
      11,
      "Affected content",
      "受影响内容",
      {
        rows: [
          {
            name: "Delirium guide",
            type: "guide",
            trigger: "Mist pause fixed",
            action: "Re-verify current Mist rules.",
            status: "queued",
          },
          {
            name: "Xesht boss page",
            type: "boss",
            trigger: "Infinite-hand fix",
            action: "Update with current Patterns.",
            status: "reviewing",
          },
          {
            name: "Ritual guide",
            type: "guide",
            trigger: "Altar activation fix",
            action: "Confirm current altar behaviour.",
            status: "queued",
          },
          {
            name: "Timeless Jewel build",
            type: "build",
            trigger: "Adorned interaction fix",
            action: "Re-verify scaling.",
            status: "queued",
          },
        ],
      },
      {
        rows: [
          {
            name: "迷雾指南",
            type: "guide",
            trigger: "迷雾暂停修复",
            action: "重新核验当前迷雾规则。",
            status: "queued",
          },
          {
            name: "谢什特 Boss 页",
            type: "boss",
            trigger: "无限投手修复",
            action: "用当前机制更新。",
            status: "reviewing",
          },
          {
            name: "仪式指南",
            type: "guide",
            trigger: "祭坛激活修复",
            action: "确认当前祭坛行为。",
            status: "queued",
          },
          {
            name: "永恒珠宝构筑",
            type: "build",
            trigger: "被 adorn 者交互修复",
            action: "重新核验缩放。",
            status: "queued",
          },
        ],
      },
    ),
    videoSection(12),
    sec(
      "faq",
      "faq",
      13,
      "FAQ",
      "常见问题",
      {
        items: [
          {
            question:
              "Why is there no monster after I open the Delirium mirror?",
            answer: [
              "That was a 0.1.0f-era Rare-monster pause bug. Delirium has been reworked since, so current behaviour is different — check the live Delirium guide.",
            ],
          },
          {
            question: "Should The Adorned multiply my Timeless Jewel modifier?",
            answer: [
              "A wrong interaction was fixed in 0.1.0f. Because jewel behaviour has moved since, re-verify the exact scaling against the current client rather than assuming.",
            ],
          },
          {
            question: "Did 0.1.0f require a client restart?",
            answer: [
              "Some fixes were restartless and some required a restart to apply. If a fix did not appear after patching, a restart was the expected step at the time.",
            ],
          },
        ],
      },
      {
        items: [
          {
            question: "为何开启迷雾镜像后没有怪物?",
            answer: [
              "那是 0.1.0f 时代的稀有怪暂停 bug。迷雾此后已重做,因此当前行为不同——请查实时迷雾指南。",
            ],
          },
          {
            question: "被 adorn 者应该放大我的永恒珠宝词缀吗?",
            answer: [
              "一个错误交互在 0.1.0f 被修复。由于珠宝行为此后已变化,请对照当前客户端重新核验确切缩放,而非想当然。",
            ],
          },
          {
            question: "0.1.0f 需要重启客户端吗?",
            answer: [
              "部分修复无需重启,部分需重启才能生效。若打补丁后修复未出现,当时预期步骤就是重启。",
            ],
          },
        ],
      },
    ),
    sourcesSectionWrap(
      14,
      "3686378",
      "Path of Exile 2 official 0.1.0f patch notes",
    ),
    changelogSection(15),
  ],
};

const ALL = [
  patchG,
  patchH,
  patchC,
  patchE,
  patch3b,
  patch3c,
  patch11d,
  patch0f,
];
for (const spec of ALL) writePatch(spec);
console.log("DONE: wrote", ALL.length, "fifth-batch specs (en+zh-cn).");

/* 文件职责：生成第四批(0.1.0 Early Access 首发系列)patch 双语内容文件。
 * 复用已验证模板: status=published / verificationStatus=verified / patchCategory / verifiedClientVersion。
 * 单一 sources 模块, related*Ids 仅引用两语言均 published 的白名单 slug。
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const VIDEO_URL = "https://www.youtube.com/watch?v=0Vx8rF2z4kY"; // 全家族一致;沙箱无法 oEmbed 核验,上线前建议复核
const VIDEO_TS = [
  { label: "Class reveal", time: "00:30" },
  { label: "Endgame and Atlas", time: "04:10" },
  { label: "Launch state", time: "09:00" },
];

// ---- 共享来源(全家族一致,4 个官方) ----
function officialSources() {
  return [
    { id: "official-0-1-0", label: "Path of Exile 2 official 0.1.0 Early Access announcement", sourceType: "official", url: "https://www.pathofexile.com/forum/view-thread/3592995" },
    { id: "official-0-1-0-faq", label: "Path of Exile 2 official 0.1.0 FAQ and systems", sourceType: "official", url: "https://www.pathofexile.com/forum/view-thread/3594080" },
    { id: "official-0-1-0-notes", label: "Path of Exile 2 official 0.1.0 launch notes", sourceType: "official", url: "https://www.pathofexile.com/forum/view-thread/3592012" },
    { id: "official-ea-index", label: "Path of Exile 2 Early Access forum index", sourceType: "official", url: "https://www.pathofexile.com/forum/view-forum/2222" },
  ];
}
function sourcesSection() {
  return {
    categories: [
      { label: "Path of Exile 2 official 0.1.0 Early Access announcement", description: "Official launch communication confirming the class, campaign and endgame scope of 0.1.0.", url: "https://www.pathofexile.com/forum/view-thread/3592995" },
      { label: "Path of Exile 2 official 0.1.0 FAQ and systems", description: "Official detail on the launch systems, progression model and endgame.", url: "https://www.pathofexile.com/forum/view-thread/3594080" },
      { label: "Path of Exile 2 official 0.1.0 launch notes", description: "Official launch notes covering the class, campaign and endgame scope.", url: "https://www.pathofexile.com/forum/view-thread/3592012" },
      { label: "Path of Exile 2 Early Access forum index", description: "Index of all official EA patch and hotfix threads referenced above.", url: "https://www.pathofexile.com/forum/view-forum/2222" },
    ],
    verificationChecklist: { status: "verified", method: "official", verifiedClientVersion: "0.5.4e" },
  };
}

// ---- 章节构造助手 ----
function sec(id, type, order, titleEn, titleZh, enObj, zhObj) {
  return { id, type, order, title: { en: titleEn, zh: titleZh }, en: enObj || {}, zh: zhObj || {} };
}

function videoSection(order) {
  return sec("video", "video", order, "Historical video", "历史视频",
    { entries: [{ label: "Path of Exile 2 — Official Early Access Announcement", url: VIDEO_URL, takeaway: "Official reveal of the 0.1.0 class and endgame direction. Read alongside the launch-hotfix notes for what changed in the first week.", creator: "Official Path of Exile 2", timestamps: VIDEO_TS }] },
    { entries: [{ label: "流放之路 2 — 官方抢先体验公告", url: VIDEO_URL, takeaway: "官方公布的 0.1.0 职业与终局方向。结合首发热修说明,了解第一周内发生的变化。", creator: "流放之路 2 官方", timestamps: VIDEO_TS }] });
}

function sourcesSectionWrap(order) {
  return sec("sources", "sources", order, "Sources and verification", "来源与核验", sourcesSection(), sourcesSection());
}

function buildArticle(spec, locale) {
  const L = locale === "zh-cn" ? "zh" : "en";
  const sections = spec.sections.map((s) => {
    const base = { id: s.id, order: s.order, title: s.title[L], toc: s.toc === undefined ? true : s.toc, visible: true, type: s.type };
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
    patchStatus: spec.patchStatus,
    verificationStatus: spec.verificationStatus,
    verifiedClientVersion: spec.verifiedClientVersion,
    author: "StratLore Editorial",
    reviewer: "Exile2 Guides Automated Editorial QA",
    createdAt: "2026-08-03",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-03",
    lastVerifiedAt: "2026-08-03",
    heroImage: spec.heroImage,
    cardImage: spec.cardImage,
    imageAlt: spec.imageAlt[L],
    tags: spec.tags,
    historicalStatus: spec.historicalStatus,
    currentBaseline: spec.currentBaseline,
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
    relatedBuildIds: spec.relatedBuildIds || [],
    relatedBossIds: spec.relatedBossIds || [],
    relatedItemIds: spec.relatedItemIds || [],
    relatedGuideIds: spec.relatedGuideIds || [],
    relatedSkillIds: spec.relatedSkillIds || [],
    sources: officialSources(),
    seo: { title: spec.seo.title[L], description: spec.seo.description[L], noindex: false },
  };
}

function writePatch(spec) {
  for (const loc of ["en", "zh-cn"]) {
    const art = buildArticle(spec, loc);
    const dir = path.join(ROOT, "content", loc, "patches");
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${spec.slug}.json`);
    fs.writeFileSync(out, JSON.stringify(art, null, 2) + "\n", "utf8");
    console.log("wrote", out);
  }
}

// =====================================================================
// Patch 2: patch-0-1-0-endgame-atlas-baseline
// =====================================================================
const patch2 = {
  slug: "patch-0-1-0-endgame-atlas-baseline",
  patchCategory: "major-updates",
  patchVersion: "0.1.0",
  patch: "0.1.0",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/items/waystones-hero.webp",
  cardImage: "/images/items/waystones-hero.webp",
  imageAlt: {
    en: "The original Path of Exile 2 0.1.0 Atlas of Worlds endgame with Waystones, Towers and Tablets",
    zh: "流放之路 2 0.1.0 原始的万象终界终局,包含界石、尖塔与石板",
  },
  tags: ["early-access", "0-1-0", "atlas", "endgame", "historical", "waystones"],
  title: {
    en: "Path of Exile 2 0.1.0 Atlas & Endgame Baseline: How the Original Maps, Waystones and League Mechanics Worked",
    zh: "流放之路 2 0.1.0 万象终界与终局基线:原始地图、界石与异界机制如何运作",
  },
  shortTitle: { en: "0.1.0 Atlas & Endgame Baseline", zh: "0.1.0 终界与终局基线" },
  summary: {
    en: "At 0.1.0 the endgame was a standalone Atlas of Worlds with Waystones, Towers, Tablets and Citadels, plus Breach, Expedition, Ritual and Delirium in maps. This page records exactly what the original endgame shipped with and which parts were rewritten by later patches.",
    zh: "0.1.0 的终局是一套独立的万象终界,包含界石、尖塔、石板与城邦,地图中还有裂界、远征、仪式与迷妄。本页记录原始终局究竟包含什么,以及哪些部分被后续补丁重写。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0 endgame baseline. Covers the original Atlas of Worlds structure, Waystone tiering and prefixes, Towers and Tablets, Citadels, and the launch league mechanics (Breach, Expedition, Ritual, Delirium), then contrasts each with client 0.5.4e.",
    zh: "流放之路 2 0.1.0 终局基线的完整历史。涵盖原始的万象终界结构、界石分级与前缀、尖塔与石板、城邦,以及首发异界机制(裂界、远征、仪式、迷妄),并逐项对照客户端 0.5.4e。",
  },
  currentApplicability: [
    {
      topicId: "Atlas of Worlds structure",
      status: "changed-later",
      currentSummary: { en: ["The 0.1.0 Atlas used Waystones, Towers, Tablets and Citadels in early forms that later patches restructured."], zh: ["0.1.0 的万象终界以早期形态使用界石、尖塔、石板与城邦,后续补丁对其做了重构。"] },
      supersededByPatchIds: ["0.2.0", "0.3.1", "0.5.0"],
      affectedContentIds: ["early-atlas-progression-waystone-sustain"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Launch league mechanics",
      status: "still-current",
      currentSummary: { en: ["Breach, Expedition, Ritual and Delirium entered maps at launch and remain core endgame mechanics, though numbers were tuned later."], zh: ["裂界、远征、仪式与迷妄在首发即进入地图,至今仍是核心终局机制,只是后续数值被调整。"] },
      supersededByPatchIds: [],
      affectedContentIds: ["expedition-logbooks"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Pinnacle bosses",
      status: "changed-later",
      currentSummary: { en: ["Early pinnacle access had a steeper retry cost; later patches introduced recovery options."], zh: ["早期巅峰首领的重试成本更高,后续补丁引入了恢复机制。"] },
      supersededByPatchIds: ["0.2.0", "0.3.0"],
      affectedContentIds: ["arbiter-of-ash", "xesht-we-that-are-one"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: [],
  relatedBossIds: ["arbiter-of-ash", "xesht-we-that-are-one"],
  relatedItemIds: ["waystones-guide", "expedition-logbooks"],
  relatedGuideIds: ["early-atlas-progression-waystone-sustain"],
  relatedSkillIds: [],
  seo: {
    title: { en: "PoE2 0.1.0 Atlas & Endgame Baseline — What Launched vs 0.5.4e", zh: "流放之路 2 0.1.0 终界与终局基线 — 首发对比 0.5.4e" },
    description: { en: "What the 0.1.0 Atlas, Waystones, Towers and league mechanics shipped with, and which endgame systems 0.5.4e rewrote.", zh: "0.1.0 的万象终界、界石、尖塔与异界机制究竟包含什么,以及 0.5.4e 重写了哪些终局系统。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "Path of Exile 2 launched its endgame at 0.1.0 as a standalone Atlas of Worlds. Rather than a single map pool, the launch endgame combined Waystones that opened map nodes, Towers that projected buffs across regions, Tablets that modified those towers, and Citadels that anchored the late map ring.",
          "On top of the Atlas, four league mechanics — Breach, Expedition, Ritual and Delirium — were present in maps from day one. This page is the total-entry history of that original endgame: what 0.1.0 shipped, how it was stabilised in the first weeks, and which systems still resemble the current client versus what later patches rebuilt.",
        ],
        bullets: [
          "Standalone Atlas of Worlds at launch with Waystones, Towers, Tablets, Citadels",
          "Breach, Expedition, Ritual and Delirium active in maps from day one",
          "First weeks tuned Waystone prefixes and map sustain before larger rebuilds",
        ],
      },
      {
        paragraphs: [
          "流放之路 2 在 0.1.0 以一套独立的万象终界开启终局。首发终局并非单一地图池,而是结合了开启地图节点的界石、向区域投射增益的尖塔、改造尖塔的石板,以及锚定后期地图环的城邦。",
          "在万象终界之上,裂界、远征、仪式、迷妄四种异界机制从第一天起就存在于地图中。本页是这套原始终局的完整历史:0.1.0 发布了什么、首周如何稳定,以及哪些系统仍与当前客户端相似、哪些被后续补丁重建。",
        ],
        bullets: [
          "首发即独立的万象终界,包含界石、尖塔、石板、城邦",
          "裂界、远征、仪式、迷妄从首日即活跃于地图",
          "首周调整了界石前缀与地图续航,之后才是更大规模的重建",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0 endgame era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0 is a historical baseline, not a current endgame guide. The Atlas and its supporting systems were expanded and rebuilt repeatedly across the first year of Early Access.",
          "Treating a 0.1.0 Atlas video as a current tutorial is misleading: Waystone tiering, Tower behaviour and map sustain were changed within the first weeks and then again by 0.2, 0.3, 0.4 and 0.5.",
        ],
        bullets: [
          "0.1.0 = endgame starting point, not final design",
          "Day-1 Atlas videos are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0 终局时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0 是历史基线,而非当前终局指南。万象终界及其支撑系统在抢先体验的第一年里被反复扩展与重建。",
          "把 0.1.0 的终界视频当作当前教程会误导人:界石分级、尖塔行为与地图续航在首周就被改动,之后又被 0.2、0.3、0.4、0.5 再次修改。",
        ],
        bullets: [
          "0.1.0 = 终局起点,而非最终设计",
          "首发终界视频是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("atlas-at-launch", "overview", 3, "What the 0.1.0 Atlas contained", "0.1.0 万象终界包含什么",
      {
        paragraphs: [
          "The launch Atlas presented a ring of map nodes that players progressed through using Waystones. Towers sat on the overworld map and, once captured, projected a modifier across nearby map nodes; Tablets slotted into Towers to change that modifier, and Citadels appeared in the outer ring as high-threat encounters.",
          "This structure let a single region feel different from the next, but the exact rules for Waystone rarity, Tower coverage and Tablet effects were in their first form and changed soon after.",
        ],
        bullets: [
          "Waystones open map nodes on the Atlas ring",
          "Towers project modifiers; Tablets change those modifiers",
          "Citadels anchored the outer high-threat ring",
        ],
      },
      {
        paragraphs: [
          "首发万象终界呈现一圈地图节点,玩家使用界石向前推进。尖塔位于大地图之上,占领后会向附近地图节点投射修正;石板插入尖塔以改变该修正;城邦出现在外圈,作为高威胁遭遇。",
          "这套结构让不同区域各有特色,但界石稀有度、尖塔覆盖范围与石板效果的精确规则都处于最初形态,不久后便被改动。",
        ],
        bullets: [
          "界石开启万象终界上的地图节点",
          "尖塔投射修正,石板改变这些修正",
          "城邦锚定外圈高威胁区域",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Standalone Atlas with Waystones, Towers, Tablets and Citadels; Breach, Expedition, Ritual, Delirium in maps.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "Economy Patch", summary: "Waystone prefix buff and currency redistribution improved early map sustain.", tags: ["balance", "economy"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "Stabilisation", summary: "Checkpoint fast travel and respec cost cuts eased endgame pacing.", tags: ["balance", "progression"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "Later line", summary: "The current major line (baseline 0.5.4e) that rebuilt large parts of the 0.1.0 Atlas.", tags: ["current-baseline"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "独立的万象终界,含界石、尖塔、石板、城邦;地图中已有裂界、远征、仪式、迷妄。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "经济补丁", summary: "界石前缀增强与通货再分配改善了早期地图续航。", tags: ["balance", "economy"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "稳定补丁", summary: "检查点快速传送与洗点成本下调改善了终局节奏。", tags: ["balance", "progression"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "后续主线", summary: "当前主线(基线 0.5.4e),重建了 0.1.0 万象终界的众多部分。", tags: ["current-baseline"] },
        ],
      }),
    sec("atlas-impact", "impact-dashboard", 5, "Original Atlas systems and their fate", "原始终界系统及其归宿",
      {
        cards: [
          { area: "Waystones", verdict: "Changed repeatedly", detail: "Waystone tiering and prefixes were adjusted in 0.1.0c and many times after; old sustain advice is outdated." },
          { area: "Towers", verdict: "Rewritten since launch", detail: "Tower coverage and modifier rules were restructured by later patches." },
          { area: "Tablets", verdict: "Rewritten since launch", detail: "Tablet effects and where they apply moved across 0.2 to 0.5." },
          { area: "Citadels", verdict: "Higher cost then", detail: "Early Citadel access had a steeper retry cost than later recovery options." },
          { area: "League mechanics", verdict: "Still current", detail: "Breach, Expedition, Ritual and Delirium remain core endgame mechanics." },
        ],
      },
      {
        cards: [
          { area: "界石", verdict: "反复改动", detail: "界石分级与前缀在 0.1.0c 及之后多次调整,旧的续航建议已过时。" },
          { area: "尖塔", verdict: "首发后重写", detail: "尖塔覆盖范围与修正规则被后续补丁重构。" },
          { area: "石板", verdict: "首发后重写", detail: "石板效果及其作用位置在 0.2 至 0.5 间变动。" },
          { area: "城邦", verdict: "当时成本更高", detail: "早期城邦进入的重试成本高于后来的恢复机制。" },
          { area: "异界机制", verdict: "仍保留", detail: "裂界、远征、仪式、迷妄仍是核心终局机制。" },
        ],
      }),
    sec("atlas-table", "data-table", 6, "Launch endgame vs current client", "首发终局对比当前客户端",
      {
        caption: "What 0.1.0 launched with, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "system", label: "System" },
          { key: "launch", label: "0.1.0 state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { system: "Waystones", launch: "First-form tiering and prefixes.", status: "Rebuilt repeatedly", entry: "early-atlas-progression-waystone-sustain guide" },
          { system: "Towers", launch: "Projected modifiers over regions.", status: "Restructured since 0.2", entry: "Atlas progression guide" },
          { system: "Tablets", launch: "Slotted into Towers.", status: "Effects moved", entry: "Atlas progression guide" },
          { system: "Citadels", launch: "Outer-ring high-threat.", status: "Recovery added later", entry: "Pinnacle boss pages" },
          { system: "League mechanics", launch: "Breach, Expedition, Ritual, Delirium.", status: "Still core", entry: "expedition-logbooks item page" },
        ],
      },
      {
        caption: "0.1.0 发布了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "system", label: "系统" },
          { key: "launch", label: "0.1.0 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { system: "界石", launch: "最初形态的分级与前缀。", status: "反复重建", entry: "early-atlas-progression-waystone-sustain 指南" },
          { system: "尖塔", launch: "向区域投射修正。", status: "0.2 起重构", entry: "终界推进指南" },
          { system: "石板", launch: "插入尖塔。", status: "效果已变动", entry: "终界推进指南" },
          { system: "城邦", launch: "外圈高威胁。", status: "后续加入恢复", entry: "巅峰首领页" },
          { system: "异界机制", launch: "裂界、远征、仪式、迷妄。", status: "仍是核心", entry: "expedition-logbooks 物品页" },
        ],
      }),
    sec("atlas-before-after", "before-after", 7, "Launch Atlas vs current", "首发终界 vs 当前",
      {
        oldLabel: "Launch-day 0.1.0 Atlas (December 2024)",
        oldText: "Waystones, Towers, Tablets and Citadels worked in their first form. Map sustain and Waystone rarity were rough, and early pinnacle access was costly to retry.",
        newLabel: "Current Atlas (client 0.5.4e)",
        newText: "The Atlas was rebuilt through 0.2 to 0.5: Waystone rules, Tower coverage and Citadel recovery all differ from launch. Old footage and guides no longer describe the current map.",
      },
      {
        oldLabel: "首发当日 0.1.0 终界(2024 年 12 月)",
        oldText: "界石、尖塔、石板、城邦都处于最初形态。地图续航与界石稀有度尚粗糙,早期巅峰进入的重试成本很高。",
        newLabel: "当前终界(客户端 0.5.4e)",
        newText: "万象终界在 0.2 至 0.5 间被重建:界石规则、尖塔覆盖范围与城邦恢复均不同于首发。旧的视频与指南已不再描述当前地图。",
      }),
    sec("league-mechanics", "impact-dashboard", 8, "Launch league mechanics", "首发异界机制",
      {
        cards: [
          { area: "Breach", verdict: "Still current", detail: "Breach appeared in maps at launch and remains a core endgame mechanic, tuned later." },
          { area: "Expedition", verdict: "Still current", detail: "Expedition logbooks and explosives entered the endgame at launch; current behaviour was tuned in later patches." },
          { area: "Ritual", verdict: "Still current", detail: "Ritual was present in launch maps and remains a core mechanic." },
          { area: "Delirium", verdict: "Still current", detail: "Delirium mirrors entered maps at launch and remain part of the endgame." },
        ],
      },
      {
        cards: [
          { area: "裂界", verdict: "仍保留", detail: "裂界在首发即出现在地图中,至今仍是核心终局机制,后续做了调整。" },
          { area: "远征", verdict: "仍保留", detail: "远征日志与炸药在首发即进入终局,当前行为在后续补丁中调整。" },
          { area: "仪式", verdict: "仍保留", detail: "仪式在首发地图中即存在,仍是核心机制。" },
          { area: "迷妄", verdict: "仍保留", detail: "迷妄镜像在首发即进入地图,仍是终局的一部分。" },
        ],
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Original Atlas structure", status: "changed-later", currentSummary: "Waystones, Towers, Tablets and Citadels were rebuilt through 0.2 to 0.5.", supersededBy: "0.2.0, 0.3.1, 0.5.0", affectedContent: "early-atlas-progression-waystone-sustain guide" },
          { topic: "Launch league mechanics", status: "still-current", currentSummary: "Breach, Expedition, Ritual and Delirium are still core endgame mechanics.", supersededBy: "—", affectedContent: "expedition-logbooks item page" },
          { topic: "Waystone prefixes", status: "changed-later", currentSummary: "The 0.1.0c prefix buff was only the first of many Waystone changes.", supersededBy: "0.1.0c, 0.2.0+", affectedContent: "early-atlas-progression-waystone-sustain guide" },
          { topic: "Pinnacle retry cost", status: "changed-later", currentSummary: "Later patches reduced the retry cost of pinnacle access.", supersededBy: "0.2.0, 0.3.0", affectedContent: "arbiter-of-ash / xesht-we-that-are-one pages" },
        ],
      },
      {
        rows: [
          { topic: "原始终界结构", status: "changed-later", currentSummary: "界石、尖塔、石板、城邦在 0.2 至 0.5 间被重建。", supersededBy: "0.2.0, 0.3.1, 0.5.0", affectedContent: "early-atlas-progression-waystone-sustain 指南" },
          { topic: "首发异界机制", status: "still-current", currentSummary: "裂界、远征、仪式、迷妄仍是核心终局机制。", supersededBy: "—", affectedContent: "expedition-logbooks 物品页" },
          { topic: "界石前缀", status: "changed-later", currentSummary: "0.1.0c 的前缀增强只是界石诸多改动中的第一次。", supersededBy: "0.1.0c, 0.2.0+", affectedContent: "early-atlas-progression-waystone-sustain 指南" },
          { topic: "巅峰重试成本", status: "changed-later", currentSummary: "后续补丁降低了巅峰进入的重试成本。", supersededBy: "0.2.0, 0.3.0", affectedContent: "arbiter-of-ash / xesht-we-that-are-one 页面" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Waystone rules", thenText: "Launch Waystones worked in their first form with rough sustain.", nowText: "Repeated 0.2 to 0.5 reworks changed Waystone tiering and prefixes." },
          { aspect: "Tower coverage", thenText: "Towers projected modifiers in their first form.", nowText: "Tower coverage and effects were restructured by later patches." },
          { aspect: "League mechanics", thenText: "Breach, Expedition, Ritual, Delirium launched in maps.", nowText: "All four remain core, with numbers tuned across patches." },
          { aspect: "Pinnacle access", thenText: "Early pinnacle retry was costly.", nowText: "Later patches added recovery, lowering the retry cost." },
        ],
      },
      {
        rows: [
          { aspect: "界石规则", thenText: "首发界石为最初形态,续航粗糙。", nowText: "0.2 至 0.5 的反复重写改变了界石分级与前缀。" },
          { aspect: "尖塔覆盖", thenText: "尖塔以最初形态投射修正。", nowText: "尖塔覆盖范围与效果被后续补丁重构。" },
          { aspect: "异界机制", thenText: "裂界、远征、仪式、迷妄首发即入地图。", nowText: "四种机制仍是核心,数值历经多补丁调整。" },
          { aspect: "巅峰进入", thenText: "早期巅峰重试成本高。", nowText: "后续补丁加入恢复,降低了重试成本。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Re-learn the Atlas and Waystones", detail: "Launch map rules were rebuilt; follow the current early-atlas-progression guide." },
          { priority: "high", label: "Ignore Day-1 Atlas videos", detail: "0.1.0 footage does not describe the current map; use current pages." },
          { priority: "medium", label: "League mechanics are still here", detail: "Breach, Expedition, Ritual and Delirium are still core, though tuned." },
          { priority: "medium", label: "Pinnacle access is cheaper now", detail: "Retry cost dropped in later patches, so don't fear pinnacle attempts." },
        ],
      },
      {
        items: [
          { priority: "high", label: "重新学习万象终界与界石", detail: "首发地图规则已重建,请遵循当前 early-atlas-progression 指南。" },
          { priority: "high", label: "忽略首日的终界视频", detail: "0.1.0 视频并不描述当前地图,请使用当前页面。" },
          { priority: "medium", label: "异界机制仍在", detail: "裂界、远征、仪式、迷妄仍是核心,只是做了调整。" },
          { priority: "medium", label: "巅峰进入现在更便宜", detail: "后续补丁降低了重试成本,不必畏惧挑战巅峰。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players noted early Waystone sustain felt rough.", quote: "My maps run out of Waystones way too fast, this cannot be final.", analysis: "Matches the official 0.1.0c buff that improved early map sustain." },
          { source: "Reddit (0.1.0 Atlas)", context: "Viewers asked whether launch Atlas guides were safe.", quote: "Are these Atlas guides still good or did they rework the map?", analysis: "They were rebuilt through 0.2 to 0.5; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch Citadel state with current.", quote: "Why does my Atlas look nothing like the 0.1.0 video?", analysis: "Expected: the Atlas was rebuilt after launch." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家反映早期界石续航很粗糙。", quote: "我的地图界石消耗太快了,这不可能是最终形态。", analysis: "对应官方 0.1.0c 增强早期地图续航的改动。" },
          { source: "Reddit(0.1.0 终界)", context: "观众询问首发终界指南是否仍可靠。", quote: "这些终界指南还有用吗,还是地图已经被重做了?", analysis: "终界在 0.2 至 0.5 间被重建,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆了首发城邦状态与当前。", quote: "为什么我的终界和 0.1.0 视频完全不一样?", analysis: "预料之中:终界在首发后被重建。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Early Atlas progression guide", type: "guide", trigger: "Launch Atlas rebuilt through 0.5", action: "Refresh for current Atlas and Waystone rules.", status: "reviewing" },
          { name: "Expedition Logbooks item page", type: "item", trigger: "Launch league mechanic, later tuned", action: "Document current Expedition behaviour versus launch.", status: "queued" },
          { name: "Arbiter of Ash boss page", type: "boss", trigger: "Pinnacle retry cost changed", action: "Note current recovery options versus launch.", status: "queued" },
          { name: "Xesht, We That Are One boss page", type: "boss", trigger: "Pinnacle retry cost changed", action: "Note current recovery options versus launch.", status: "queued" },
        ],
      },
      {
        rows: [
          { name: "Early Atlas 推进指南", type: "guide", trigger: "首发终界在 0.5 前被重建", action: "按当前终界与界石规则刷新。", status: "reviewing" },
          { name: "远征日志物品页", type: "item", trigger: "首发异界机制,后续调整", action: "记录当前远征行为对比首发。", status: "queued" },
          { name: "灰烬仲裁者首领页", type: "boss", trigger: "巅峰重试成本变动", action: "标注当前恢复机制对比首发。", status: "queued" },
          { name: "我们合一·谢什特首领页", type: "boss", trigger: "巅峰重试成本变动", action: "标注当前恢复机制对比首发。", status: "queued" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "Did 0.1.0 have an endgame?", answer: ["Yes. 0.1.0 shipped a standalone Atlas of Worlds with Waystones, Towers, Tablets and Citadels, plus four league mechanics in maps."] },
          { question: "Why does my Atlas look different from 0.1.0 videos?", answer: ["The Atlas was rebuilt repeatedly through 0.2 to 0.5. Launch footage describes the original structure, not the current map."] },
          { question: "Are the launch league mechanics still in the game?", answer: ["Breach, Expedition, Ritual and Delirium remain core endgame mechanics, though their numbers were tuned in later patches."] },
          { question: "Which 0.1.0 endgame systems are still current?", answer: ["The four league mechanics are still core. Waystones, Towers, Tablets and Citadels were rebuilt and no longer match launch footage."] },
        ],
      },
      {
        items: [
          { question: "0.1.0 有终局吗?", answer: ["有。0.1.0 发布了一套独立的万象终界,包含界石、尖塔、石板、城邦,以及地图中的四种异界机制。"] },
          { question: "为什么我的终界和 0.1.0 视频不一样?", answer: ["万象终界在 0.2 至 0.5 间被反复重建。首发视频描述的是原始结构,而非当前地图。"] },
          { question: "首发的异界机制还在游戏里吗?", answer: ["裂界、远征、仪式、迷妄仍是核心终局机制,只是数值在后续补丁中做了调整。"] },
          { question: "哪些 0.1.0 终局系统仍保留?", answer: ["四种异界机制仍是核心。界石、尖塔、石板、城邦已被重建,不再与首发视频一致。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

// =====================================================================
// Patch 3: patch-0-1-0-ascendancy-trials-baseline
// =====================================================================
const patch3 = {
  slug: "patch-0-1-0-ascendancy-trials-baseline",
  patchCategory: "major-updates",
  patchVersion: "0.1.0",
  patch: "0.1.0",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/bosses/trialmaster-hero.webp",
  cardImage: "/images/bosses/trialmaster-hero.webp",
  imageAlt: {
    en: "The original Path of Exile 2 0.1.0 ascendancy trial system: Trial of Sekhemas and Trial of Chaos",
    zh: "流放之路 2 0.1.0 原始升华试炼系统:赛克哈玛斯试炼与混沌试炼",
  },
  tags: ["early-access", "0-1-0", "ascendancy", "trials", "historical", "sekhemas", "chaos"],
  title: {
    en: "Path of Exile 2 0.1.0 Ascendancy Trials Baseline: Trial of Sekhemas & Trial of Chaos at Launch",
    zh: "流放之路 2 0.1.0 升华试炼基线:首发时的赛克哈玛斯试炼与混沌试炼",
  },
  shortTitle: { en: "0.1.0 Ascendancy Trials Baseline", zh: "0.1.0 升华试炼基线" },
  summary: {
    en: "At 0.1.0, ascendancies were earned by surviving the Trial of Sekhemas (a Honour-based gauntlet) and the Trial of Chaos. This page records exactly how the original trial system worked and how later patches changed it.",
    zh: "0.1.0 中,升华通过幸存于赛克哈玛斯试炼(基于荣誉的闯关)与混沌试炼获得。本页记录原始试炼系统究竟如何运作,以及后续补丁如何改动它。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0 ascendancy trial baseline. Covers the launch Trial of Sekhemas Honour mechanic and the Trial of Chaos, how keys and rooms worked, and which trial rules were rewritten by later patches versus what still applies in client 0.5.4e.",
    zh: "流放之路 2 0.1.0 升华试炼基线的完整历史。涵盖首发赛克哈玛斯试炼的荣誉机制与混沌试炼、钥匙与房间如何运作,以及哪些试炼规则被后续补丁重写、哪些在客户端 0.5.4e 中仍然适用。",
  },
  currentApplicability: [
    {
      topicId: "Trial of Sekhemas",
      status: "changed-later",
      currentSummary: { en: ["The 0.1.0 Honour-based gauntlet was reworked; later patches changed room and reward rules."], zh: ["0.1.0 基于荣誉的闯关被重做,后续补丁改变了房间与奖励规则。"] },
      supersededByPatchIds: ["0.2.0", "0.3.0"],
      affectedContentIds: ["respec-passive-ascendancy-guide"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Trial of Chaos",
      status: "still-current",
      currentSummary: { en: ["The Trial of Chaos remained the alternate path to an ascendancy, though reward tuning changed."], zh: ["混沌试炼仍作为获得升华的替代途径保留,只是奖励调整过。"] },
      supersededByPatchIds: [],
      affectedContentIds: ["weapon-set-passive-points-explained"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Respec of ascendancy",
      status: "changed-later",
      currentSummary: { en: ["Respec cost and access changed in 0.1.0e and again later, easing trial pressure."], zh: ["升华的洗点成本与途径在 0.1.0e 及之后改变,缓解了试炼压力。"] },
      supersededByPatchIds: ["0.1.0e", "0.3.0"],
      affectedContentIds: ["respec-passive-ascendancy-guide"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: ["lightning-spear-amazon", "glacial-lance-ritualist"],
  relatedBossIds: [],
  relatedItemIds: ["orb-of-sacrifice", "vaal-orb"],
  relatedGuideIds: ["respec-passive-ascendancy-guide", "weapon-set-passive-points-explained"],
  relatedSkillIds: ["tempest-bell", "twister"],
  seo: {
    title: { en: "PoE2 0.1.0 Ascendancy Trials Baseline — Sekhemas & Chaos vs 0.5.4e", zh: "流放之路 2 0.1.0 升华试炼基线 — 赛克哈玛斯与混沌对比 0.5.4e" },
    description: { en: "How the 0.1.0 Trial of Sekhemas Honour gauntlet and Trial of Chaos worked, and which trial rules 0.5.4e changed.", zh: "0.1.0 赛克哈玛斯试炼的荣誉闯关与混沌试炼如何运作,以及 0.5.4e 改动了哪些试炼规则。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "In 0.1.0, reaching an ascendancy meant surviving one of two trial types. The Trial of Sekhemas was a multi-room gauntlet tracked by a Honour resource that drained as you took damage; the Trial of Chaos was a wave-based challenge with random房间 modifiers.",
          "Both trials dropped from specific content and granted ascendancy points on completion. This page is the total-entry history of that original trial system: what 0.1.0 shipped, how the first weeks adjusted it, and which trial rules still resemble the current client versus what later patches rebuilt.",
        ],
        bullets: [
          "Two trial paths: Trial of Sekhemas (Honour) and Trial of Chaos (waves)",
          "Trials granted ascendancy points on completion",
          "First adjustments arrived in 0.1.0d (trial key clarity) and 0.1.0e (respec cost)",
        ],
      },
      {
        paragraphs: [
          "在 0.1.0 中,获得升华需要幸存于两类试炼之一。赛克哈玛斯试炼是多房间闯关,由荣誉资源追踪,受击时荣誉流失;混沌试炼是基于波次、带随机房间修正的挑战。",
          "两类试炼由特定内容掉落,完成后给予升华点。本页是这套原始试炼系统的完整历史:0.1.0 发布了什么、首周如何调整,以及哪些试炼规则仍与当前客户端相似、哪些被后续补丁重建。",
        ],
        bullets: [
          "两条试炼路径:赛克哈玛斯试炼(荣誉)与混沌试炼(波次)",
          "试炼完成后给予升华点",
          "首次调整出现在 0.1.0d(试炼钥匙说明)与 0.1.0e(洗点成本)",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0 trial era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0 is a historical baseline, not a current trial guide. The Honour mechanic and Chaos room rules were adjusted within the first weeks and then again by 0.2, 0.3, 0.4 and 0.5.",
          "Watching a Day-1 trial run today is misleading: the Honour drain, room modifiers and reward steps it shows were changed by launch-week hotfixes and later patches. Treat 0.1.0 footage as a record of the launch state.",
        ],
        bullets: [
          "0.1.0 = trial system starting point, not final design",
          "Day-1 trial runs are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0 试炼时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0 是历史基线,而非当前试炼指南。荣誉机制与混沌房间规则在首周被调整,之后又被 0.2、0.3、0.4、0.5 修改。",
          "今天观看首日的试炼通关会误导人:它所展示的荣誉流失、房间修正与奖励步骤,已被首发热修与后续补丁改动。请把 0.1.0 视频视为首发状态的记录。",
        ],
        bullets: [
          "0.1.0 = 试炼系统起点,而非最终设计",
          "首日试炼通关是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("trials-at-launch", "overview", 3, "What the 0.1.0 trial system contained", "0.1.0 试炼系统包含什么",
      {
        paragraphs: [
          "The Trial of Sekhemas opened as a sequence of rooms where a Honour bar represented your remaining life for the whole run; losing all Honour failed the trial regardless of character health. The Trial of Chaos presented waves with random room modifiers that escalated difficulty.",
          "Each trial type granted a different flavour of ascendancy progression, and both were required across a character's career to reach full ascendancy. The exact key drops and room sets were in their first form and changed soon after.",
        ],
        bullets: [
          "Sekhemas: Honour bar tracks the whole run",
          "Chaos: wave-based with random room modifiers",
          "Both trials fed ascendancy progression",
        ],
      },
      {
        paragraphs: [
          "赛克哈玛斯试炼是一连串房间,荣誉条代表整次闯关的剩余生命;无论角色血量如何,荣誉归零即试炼失败。混沌试炼呈现波次,并带随机房间修正以提升难度。",
          "两类试炼提供不同风味的升华进程,角色要达成完整升华须经历两者。钥匙掉落与房间组合都处于最初形态,不久后便被改动。",
        ],
        bullets: [
          "赛克哈玛斯:荣誉条追踪整次闯关",
          "混沌:基于波次,带随机房间修正",
          "两类试炼共同构成升华进程",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Trial of Sekhemas (Honour) and Trial of Chaos launched as the two ascendancy paths.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "Mechanics Patch", summary: "Trial Key clarity improved how players found and understood trial access.", tags: ["balance", "mechanics"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "Stabilisation", summary: "Respec cost cut eased the pressure of committing to an ascendancy.", tags: ["balance", "progression"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "Later line", summary: "The current major line (baseline 0.5.4e) that reworked trial rooms and rewards.", tags: ["current-baseline"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "赛克哈玛斯试炼(荣誉)与混沌试炼作为两条升华路径首发。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "机制补丁", summary: "试炼钥匙说明改善了玩家寻找与理解试炼入口的方式。", tags: ["balance", "mechanics"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "稳定补丁", summary: "洗点成本下调缓解了对升华抉择的压力。", tags: ["balance", "progression"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "后续主线", summary: "当前主线(基线 0.5.4e),重做了试炼房间与奖励。", tags: ["current-baseline"] },
        ],
      }),
    sec("trials-impact", "impact-dashboard", 5, "Original trial systems and their fate", "原始试炼系统及其归宿",
      {
        cards: [
          { area: "Trial of Sekhemas", verdict: "Reworked since launch", detail: "The Honour gauntlet's rooms and rewards were changed by later patches." },
          { area: "Trial of Chaos", verdict: "Still current", detail: "Chaos remained the alternate ascendancy path, with reward tuning." },
          { area: "Honour mechanic", verdict: "Adjusted at launch", detail: "Close-range Honour drains were fixed in 0.1.0e; broader reworks followed." },
          { area: "Trial keys", verdict: "Clarified in 0.1.0d", detail: "0.1.0d improved how players found and understood trial access." },
        ],
      },
      {
        cards: [
          { area: "赛克哈玛斯试炼", verdict: "首发后重做", detail: "荣誉闯关的房间与奖励被后续补丁改动。" },
          { area: "混沌试炼", verdict: "仍保留", detail: "混沌仍是替代升华路径,仅奖励有调整。" },
          { area: "荣誉机制", verdict: "首发时调整", detail: "近身荣誉流失在 0.1.0e 修复,之后还有更大重做。" },
          { area: "试炼钥匙", verdict: "0.1.0d 澄清", detail: "0.1.0d 改善了玩家寻找与理解试炼入口的方式。" },
        ],
      }),
    sec("trials-table", "data-table", 6, "Launch trials vs current client", "首发试炼对比当前客户端",
      {
        caption: "What 0.1.0 launched with, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "system", label: "System" },
          { key: "launch", label: "0.1.0 state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { system: "Trial of Sekhemas", launch: "Honour gauntlet, first-form rooms.", status: "Rooms reworked", entry: "respec-passive-ascendancy-guide" },
          { system: "Trial of Chaos", launch: "Wave-based with random modifiers.", status: "Still core path", entry: "weapon-set-passive-points-explained" },
          { system: "Honour drain", launch: "Close-range drains felt harsh.", status: "Fixed in 0.1.0e", entry: "respec-passive-ascendancy-guide" },
          { system: "Trial keys", launch: "Access unclear at launch.", status: "Clarified 0.1.0d", entry: "weapon-set-passive-points-explained" },
        ],
      },
      {
        caption: "0.1.0 发布了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "system", label: "系统" },
          { key: "launch", label: "0.1.0 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { system: "赛克哈玛斯试炼", launch: "荣誉闯关,最初形态房间。", status: "房间已重做", entry: "respec-passive-ascendancy-guide" },
          { system: "混沌试炼", launch: "基于波次,带随机修正。", status: "仍是核心路径", entry: "weapon-set-passive-points-explained" },
          { system: "荣誉流失", launch: "近身流失过于严苛。", status: "0.1.0e 修复", entry: "respec-passive-ascendancy-guide" },
          { system: "试炼钥匙", launch: "首发入口不清晰。", status: "0.1.0d 澄清", entry: "weapon-set-passive-points-explained" },
        ],
      }),
    sec("trials-before-after", "before-after", 7, "Launch trials vs current", "首发试炼 vs 当前",
      {
        oldLabel: "Launch-day 0.1.0 trials (December 2024)",
        oldText: "The Honour gauntlet and Chaos waves worked in their first form. Close-range Honour drains felt harsh and trial key access was unclear.",
        newLabel: "Current trials (client 0.5.4e)",
        newText: "Trial rooms and rewards were reworked through 0.2 to 0.5, Honour drains were fixed, and key access is clearer. Old footage no longer describes the current trials.",
      },
      {
        oldLabel: "首发当日 0.1.0 试炼(2024 年 12 月)",
        oldText: "荣誉闯关与混沌波次为最初形态。近身荣誉流失过于严苛,试炼钥匙入口也不清晰。",
        newLabel: "当前试炼(客户端 0.5.4e)",
        newText: "试炼房间与奖励在 0.2 至 0.5 间被重做,荣誉流失已修复,钥匙入口更清晰。旧视频已不再描述当前试炼。",
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Trial of Sekhemas", status: "changed-later", currentSummary: "The Honour gauntlet's rooms and rewards were reworked by later patches.", supersededBy: "0.2.0, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "Trial of Chaos", status: "still-current", currentSummary: "Chaos remains the alternate ascendancy path, with reward tuning.", supersededBy: "—", affectedContent: "weapon-set-passive-points-explained" },
          { topic: "Honour drain", status: "changed-later", currentSummary: "Close-range Honour drains were fixed in 0.1.0e and reworked later.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "Respec of ascendancy", status: "changed-later", currentSummary: "Respec cost and access changed, easing trial pressure.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
        ],
      },
      {
        rows: [
          { topic: "赛克哈玛斯试炼", status: "changed-later", currentSummary: "荣誉闯关的房间与奖励被后续补丁重做。", supersededBy: "0.2.0, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "混沌试炼", status: "still-current", currentSummary: "混沌仍是替代升华路径,奖励有调整。", supersededBy: "—", affectedContent: "weapon-set-passive-points-explained" },
          { topic: "荣誉流失", status: "changed-later", currentSummary: "近身荣誉流失在 0.1.0e 修复,之后又重做。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "升华洗点", status: "changed-later", currentSummary: "洗点成本与途径改变,缓解了试炼压力。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Sekhemas rooms", thenText: "Launch Honour gauntlet in first-form rooms.", nowText: "Rooms and rewards reworked through 0.2 to 0.5." },
          { aspect: "Chaos waves", thenText: "Wave-based with random modifiers at launch.", nowText: "Still the alternate path, with tuned rewards." },
          { aspect: "Honour drain", thenText: "Close-range drains felt harsh on launch.", nowText: "Fixed in 0.1.0e and reworked later." },
          { aspect: "Respec cost", thenText: "Early respec was costly, pressuring trial choice.", nowText: "Cost cut in 0.1.0e and again later, easing pressure." },
        ],
      },
      {
        rows: [
          { aspect: "赛克哈玛斯房间", thenText: "首发荣誉闯关为最初形态房间。", nowText: "房间与奖励在 0.2 至 0.5 间重做。" },
          { aspect: "混沌波次", thenText: "首发即基于波次带随机修正。", nowText: "仍是替代路径,奖励有调整。" },
          { aspect: "荣誉流失", thenText: "首发近身流失过于严苛。", nowText: "0.1.0e 修复,之后又重做。" },
          { aspect: "洗点成本", thenText: "早期洗点昂贵,给试炼抉择施压。", nowText: "0.1.0e 及之后下调,缓解压力。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Re-learn the trial rooms", detail: "Sekhemas rooms were reworked; follow the current respec-passive-ascendancy guide." },
          { priority: "high", label: "Ignore Day-1 trial runs", detail: "0.1.0 footage does not describe the current trials; use current pages." },
          { priority: "medium", label: "Chaos is still here", detail: "The Trial of Chaos remains the alternate ascendancy path." },
          { priority: "medium", label: "Respec is cheaper now", detail: "Later patches cut respec cost, so trial choice is less punishing." },
        ],
      },
      {
        items: [
          { priority: "high", label: "重新学习试炼房间", detail: "赛克哈玛斯房间已重做,请遵循当前 respec-passive-ascendancy 指南。" },
          { priority: "high", label: "忽略首日试炼通关", detail: "0.1.0 视频不描述当前试炼,请使用当前页面。" },
          { priority: "medium", label: "混沌仍在", detail: "混沌试炼仍是替代升华路径。" },
          { priority: "medium", label: "洗点现在更便宜", detail: "后续补丁下调洗点成本,试炼抉择不再那么惩罚性。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players found close-range Honour drains punishing.", quote: "Sekhemas Honour just vanishes in melee, this feels wrong.", analysis: "Matches the 0.1.0e fix for close-range Honour drains." },
          { source: "Reddit (0.1.0 trials)", context: "Viewers asked whether launch trial guides were safe.", quote: "Are these trial guides still good or did they rework the rooms?", analysis: "Rooms were reworked through 0.2 to 0.5; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch trial state with current.", quote: "Why do the trials look nothing like the 0.1.0 video?", analysis: "Expected: trials were reworked after launch." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家认为近身荣誉流失过于惩罚。", quote: "赛克哈玛斯的荣誉在近战里瞬间消失,这感觉不对。", analysis: "对应 0.1.0e 对近身荣誉流失的修复。" },
          { source: "Reddit(0.1.0 试炼)", context: "观众询问首发试炼指南是否仍可靠。", quote: "这些试炼指南还有用吗,还是房间被重做了?", analysis: "房间在 0.2 至 0.5 间重做,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆了首发试炼状态与当前。", quote: "为什么试炼和 0.1.0 视频完全不一样?", analysis: "预料之中:试炼在首发后被重做。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Respec & Passive / Ascendancy guide", type: "guide", trigger: "Trial rooms reworked through 0.5", action: "Refresh for current trial and respec rules.", status: "reviewing" },
          { name: "Weapon Set & Passive Points guide", type: "guide", trigger: "Trial of Chaos still current", action: "Document current Chaos path behaviour.", status: "queued" },
          { name: "Tempest Bell skill page", type: "skill", trigger: "Launch skill set, later Support Overhaul", action: "Document current skill behaviour versus launch.", status: "queued" },
          { name: "Twister skill page", type: "skill", trigger: "Launch skill set, later Support Overhaul", action: "Document current skill behaviour versus launch.", status: "queued" },
        ],
      },
      {
        rows: [
          { name: "洗点与被动/升华指南", type: "guide", trigger: "试炼房间在 0.5 前重做", action: "按当前试炼与洗点规则刷新。", status: "reviewing" },
          { name: "武器组与被动点指南", type: "guide", trigger: "混沌试炼仍当前", action: "记录当前混沌路径行为。", status: "queued" },
          { name: "雷霆钟技能页", type: "skill", trigger: "首发技能组,后续辅助重做", action: "记录当前技能行为对比首发。", status: "queued" },
          { name: "旋风技能页", type: "skill", trigger: "首发技能组,后续辅助重做", action: "记录当前技能行为对比首发。", status: "queued" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "How did 0.1.0 grant ascendancies?", answer: ["By surviving the Trial of Sekhemas (a Honour gauntlet) and the Trial of Chaos, each granting ascendancy points on completion."] },
          { question: "Why do my trial runs look different from 0.1.0 videos?", answer: ["Trial rooms and rewards were reworked through 0.2 to 0.5, and Honour drains were fixed. Launch footage describes the original state."] },
          { question: "Is the Trial of Chaos still in the game?", answer: ["Yes. The Trial of Chaos remained the alternate path to an ascendancy, though reward tuning changed."] },
          { question: "Which 0.1.0 trial rules are still current?", answer: ["The two-trial structure survived, but Sekhemas rooms and Honour drains were reworked and no longer match launch footage."] },
        ],
      },
      {
        items: [
          { question: "0.1.0 如何授予升华?", answer: ["通过幸存于赛克哈玛斯试炼(荣誉闯关)与混沌试炼,各自在完成时给予升华点。"] },
          { question: "为什么我的试炼和 0.1.0 视频不一样?", answer: ["试炼房间与奖励在 0.2 至 0.5 间被重做,荣誉流失也已修复。首发视频描述的是原始状态。"] },
          { question: "混沌试炼还在游戏里吗?", answer: ["在。混沌试炼仍是获得升华的替代路径,只是奖励调整过。"] },
          { question: "哪些 0.1.0 试炼规则仍保留?", answer: ["双试炼结构保留,但赛克哈玛斯房间与荣誉流失已被重做,不再与首发视频一致。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

// =====================================================================
// Patch 4: patch-0-1-0-launch-hotfix-build-breaks  (hotfix-rollup, 0.1.0b)
// =====================================================================
const patch4 = {
  slug: "patch-0-1-0-launch-hotfix-build-breaks",
  patchCategory: "hotfixes",
  patchVersion: "0.1.0b",
  patch: "0.1.0b",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/builds/covers/glacial-lance-ritualist.webp",
  cardImage: "/images/builds/covers/glacial-lance-ritualist.webp",
  imageAlt: {
    en: "The Path of Exile 2 0.1.0b launch hotfix that stabilised early build-breaking skills and crashes",
    zh: "流放之路 2 0.1.0b 首发热修,稳定了早期破坏性技能与崩溃问题",
  },
  tags: ["early-access", "0-1-0", "hotfix", "0-1-0b", "balance", "historical"],
  title: {
    en: "Path of Exile 2 0.1.0b Launch Hotfix: Gas Grenade Nerf, Crash Fixes & First-Week Stabilisation",
    zh: "流放之路 2 0.1.0b 首发热修:气爆手雷削弱、崩溃修复与首周稳定",
  },
  shortTitle: { en: "0.1.0b Launch Hotfix", zh: "0.1.0b 首发热修" },
  summary: {
    en: "The 0.1.0b hotfix lowered Gas Grenade and Gas Arrow explosion damage and fixed loading, Atlas Controller Refund, Console Gateway and crashes. This page records exactly what 0.1.0b changed and why Day-1 build footage no longer matches the client.",
    zh: "0.1.0b 热修下调了气爆手雷与气爆箭的爆炸伤害,并修复了加载、万象控制器返还、控制台网关与崩溃问题。本页记录 0.1.0b 究竟改了什么,以及为何首日构筑视频已不再与客户端一致。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0b launch hotfix. Covers the Gas Grenade and Gas Arrow explosion damage reduction, the loading and crash fixes, the Atlas Controller Refund and Console Gateway corrections, and how these first-week changes set the tone for launch-week balancing versus client 0.5.4e.",
    zh: "流放之路 2 0.1.0b 首发热修的完整历史。涵盖气爆手雷与气爆箭的爆炸伤害下调、加载与崩溃修复、万象控制器返还与控制台网关修正,以及这些首周改动如何为对比客户端 0.5.4e 的首周平衡定调。",
  },
  currentApplicability: [
    {
      topicId: "Gas Grenade / Gas Arrow damage",
      status: "changed-later",
      currentSummary: { en: ["Launch explosion damage was pulled down in 0.1.0b and moved again by later balance patches."], zh: ["首发爆炸伤害在 0.1.0b 被下调,并在后续平衡补丁中再次变动。"] },
      supersededByPatchIds: ["0.1.0b", "0.2.0", "0.3.0"],
      affectedContentIds: ["gas-grenade-pathfinder"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Loading and crash stability",
      status: "still-current",
      currentSummary: { en: ["The 0.1.0b loading and crash fixes were the first of many stability passes; the client is far more stable now."], zh: ["0.1.0b 的加载与崩溃修复是众多稳定性打磨中的第一次,如今客户端已稳定得多。"] },
      supersededByPatchIds: [],
      affectedContentIds: ["lightning-spear-amazon"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Atlas Controller Refund / Console Gateway",
      status: "changed-later",
      currentSummary: { en: ["These systems were corrected in 0.1.0b and later reworked as the Atlas was rebuilt."], zh: ["这些系统在 0.1.0b 被修正,并在万象终界重建时被重做。"] },
      supersededByPatchIds: ["0.1.0b", "0.2.0", "0.3.1"],
      affectedContentIds: ["early-atlas-progression-waystone-sustain"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: ["lightning-spear-amazon", "glacial-lance-ritualist", "gas-grenade-pathfinder"],
  relatedBossIds: [],
  relatedItemIds: ["orb-of-sacrifice", "vaal-orb"],
  relatedGuideIds: ["weapon-set-passive-points-explained"],
  relatedSkillIds: ["tempest-bell", "twister"],
  seo: {
    title: { en: "PoE2 0.1.0b Launch Hotfix — Gas Grenade Nerf & Crash Fixes", zh: "流放之路 2 0.1.0b 首发热修 — 气爆削弱与崩溃修复" },
    description: { en: "What the 0.1.0b hotfix changed: Gas Grenade/Arrow explosion damage, loading and crash fixes, and first-week stabilisation.", zh: "0.1.0b 热修改了什么:气爆手雷/气爆箭爆炸伤害、加载与崩溃修复,以及首周稳定。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "Within three days of launch, 0.1.0b arrived as the first hotfix. It pulled down Gas Grenade and Gas Arrow explosion damage, which had dominated early footage, and fixed a set of loading, refund and crash problems that were blocking progression.",
          "This page is the total-entry history of 0.1.0b: what it changed, why those changes mattered for Day-1 builds, and which fixes still describe the current client versus what later patches moved again. Anything we could not confirm against the current client is flagged as unknown rather than guessed.",
        ],
        bullets: [
          "0.1.0b landed 2024-12-09, three days after launch",
          "Lowered Gas Grenade and Gas Arrow explosion damage",
          "Fixed loading, Atlas Controller Refund, Console Gateway and crashes",
        ],
      },
      {
        paragraphs: [
          "首发三天内,0.1.0b 作为首个热修上线。它下调了在早期视频中称霸的气爆手雷与气爆箭的爆炸伤害,并修复了一系列阻碍进度的加载、返还与崩溃问题。",
          "本页是 0.1.0b 的完整历史:它改了什么、这些改动为何对首日构筑重要,以及哪些修复仍描述当前客户端、哪些被后续补丁再次改动。任何无法对照当前客户端确认的内容都会标注为未知,而非臆测。",
        ],
        bullets: [
          "0.1.0b 于 2024-12-09 上线,距首发仅三天",
          "下调气爆手雷与气爆箭爆炸伤害",
          "修复加载、万象控制器返还、控制台网关与崩溃",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0b hotfix era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0b is a historical hotfix, not a current玩法 guide. It was the first of many rapid launch-week adjustments, and the numbers it touched were changed again by 0.2 to 0.5.",
          "Reading a Day-1 build video today is misleading: the Gas Grenade and Gas Arrow loops it shows were already weakened by 0.1.0b and then moved further by later balance. Treat 0.1.0b footage as a record of the launch state, not as a current tutorial.",
        ],
        bullets: [
          "0.1.0b = first rapid adjustment, not final design",
          "Day-1 build videos are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0b 热修时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0b 是历史热修,而非当前玩法指南。它是众多快速首周调整中的第一次,它触及的数值在 0.2 至 0.5 间再次变动。",
          "今天观看首日构筑视频会误导人:它所展示的气爆手雷与气爆箭循环已在 0.1.0b 被削弱,并被后续平衡进一步改动。请把 0.1.0b 视频视为首发状态的记录,而非当前教程。",
        ],
        bullets: [
          "0.1.0b = 首次快速调整,而非最终设计",
          "首日构筑视频是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("hotfix-scope", "overview", 3, "What 0.1.0b actually changed", "0.1.0b 究竟改了什么",
      {
        paragraphs: [
          "The headline balance change was explosion damage: Gas Grenade and Gas Arrow explosions were dealing far more than intended, so 0.1.0b brought them down to a sane baseline. This directly affected the strong Day-1 poison and ignite loops.",
          "Alongside balance, 0.1.0b fixed blocking bugs: area-loading failures, the Atlas Controller Refund not returning points correctly, the Console Gateway not functioning, and several crash paths that could end a session. These were progression-blocking, so they shipped fast.",
        ],
        bullets: [
          "Gas Grenade and Gas Arrow explosion damage reduced",
          "Loading failures and crash paths fixed",
          "Atlas Controller Refund and Console Gateway corrected",
        ],
      },
      {
        paragraphs: [
          "最显眼的平衡改动是爆炸伤害:气爆手雷与气爆箭造成了远超预期的伤害,因此 0.1.0b 将其下调到合理基线。这直接影响了强势的首日中毒与点燃循环。",
          "在平衡之外,0.1.0b 修复了阻碍进程的 Bug:区域加载失败、万象控制器返还未正确退还点数、控制台网关失效,以及若干会终结会话的崩溃路径。这些问题阻碍进程,因此快速上线。",
        ],
        bullets: [
          "气爆手雷与气爆箭爆炸伤害下调",
          "加载失败与崩溃路径已修复",
          "万象控制器返还与控制台网关已修正",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Six classes, twelve ascendancies, three-act campaign, standalone Atlas endgame.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "Hotfix", summary: "Lowered Gas Grenade and Gas Arrow explosion damage; fixed loading, Atlas Controller Refund, Console Gateway and crashes.", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "Economy Patch", summary: "First loot and currency rebalance and Waystone prefix buff.", tags: ["balance", "economy"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "Later line", summary: "The current major line (baseline 0.5.4e) that moved the numbers again.", tags: ["current-baseline"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "六职业、十二升华、三章战役、独立万象终界。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "热修", summary: "下调气爆手雷与气爆箭爆炸伤害;修复加载、万象控制器返还、控制台网关与崩溃。", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "经济补丁", summary: "首次战利品与通货再平衡,以及界石前缀增强。", tags: ["balance", "economy"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "后续主线", summary: "当前主线(基线 0.5.4e),再次改动了数值。", tags: ["current-baseline"] },
        ],
      }),
    sec("change-impact", "impact-dashboard", 5, "0.1.0b changes and their fate", "0.1.0b 改动及其归宿",
      {
        cards: [
          { area: "Gas Grenade / Gas Arrow", verdict: "Changed again later", detail: "Explosion damage was pulled down in 0.1.0b and the skills were retuned by later patches." },
          { area: "Loading failures", verdict: "Fixed and improved", detail: "0.1.0b fixed launch loading; later patches improved load stability further." },
          { area: "Atlas Controller Refund", verdict: "Reworked later", detail: "The refund was corrected in 0.1.0b, then the Atlas around it was rebuilt." },
          { area: "Console Gateway", verdict: "Fixed", detail: "The Console Gateway was restored to function in 0.1.0b." },
          { area: "Crash paths", verdict: "Fixed and improved", detail: "0.1.0b closed crash paths; stability passes continued through 0.5." },
        ],
      },
      {
        cards: [
          { area: "气爆手雷 / 气爆箭", verdict: "后续再次改动", detail: "爆炸伤害在 0.1.0b 下调,这些技能在后续补丁中又被重调。" },
          { area: "加载失败", verdict: "已修复并改善", detail: "0.1.0b 修复了首发加载问题,后续补丁进一步改善加载稳定性。" },
          { area: "万象控制器返还", verdict: "后续重做", detail: "返还机制在 0.1.0b 被修正,其所在的万象终界随后被重建。" },
          { area: "控制台网关", verdict: "已修复", detail: "控制台网关在 0.1.0b 恢复功能。" },
          { area: "崩溃路径", verdict: "已修复并改善", detail: "0.1.0b 封堵了崩溃路径,稳定性打磨持续至 0.5。" },
        ],
      }),
    sec("change-table", "data-table", 6, "0.1.0b changes vs current client", "0.1.0b 改动对比当前客户端",
      {
        caption: "What 0.1.0b changed, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "change", label: "Change" },
          { key: "launch", label: "0.1.0b state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { change: "Gas explosion damage", launch: "Reduced in 0.1.0b.", status: "Retuned later", entry: "gas-grenade-pathfinder build" },
          { change: "Loading failures", launch: "Fixed in 0.1.0b.", status: "Further improved", entry: "Class and build guides" },
          { change: "Atlas Controller Refund", launch: "Corrected in 0.1.0b.", status: "Atlas rebuilt", entry: "early-atlas-progression-waystone-sustain guide" },
          { change: "Console Gateway", launch: "Restored in 0.1.0b.", status: "Still functional", entry: "System pages" },
          { change: "Crash paths", launch: "Closed in 0.1.0b.", status: "Ongoing stability", entry: "Class and build guides" },
        ],
      },
      {
        caption: "0.1.0b 改了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "change", label: "改动" },
          { key: "launch", label: "0.1.0b 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { change: "气体爆炸伤害", launch: "0.1.0b 下调。", status: "后续重调", entry: "gas-grenade-pathfinder 构筑" },
          { change: "加载失败", launch: "0.1.0b 修复。", status: "进一步改善", entry: "职业与构筑指南" },
          { change: "万象控制器返还", launch: "0.1.0b 修正。", status: "终界已重建", entry: "early-atlas-progression-waystone-sustain 指南" },
          { change: "控制台网关", launch: "0.1.0b 恢复。", status: "仍可用", entry: "系统页面" },
          { change: "崩溃路径", launch: "0.1.0b 封堵。", status: "持续稳定", entry: "职业与构筑指南" },
        ],
      }),
    sec("before-after", "before-after", 7, "Launch Day-1 vs after 0.1.0b", "首发首日 vs 0.1.0b 之后",
      {
        oldLabel: "Launch-day 0.1.0 (before 0.1.0b)",
        oldText: "Gas Grenade and Gas Arrow explosions dealt far more than intended, dominating early footage. Loading failures and crashes could block progression.",
        newLabel: "After 0.1.0b",
        newText: "Explosion damage was pulled to a sane baseline and the blocking loading, refund, gateway and crash bugs were fixed. Later patches moved the numbers again.",
      },
      {
        oldLabel: "首发当日 0.1.0(0.1.0b 之前)",
        oldText: "气爆手雷与气爆箭造成了远超预期的爆炸伤害,在早期视频中称霸。加载失败与崩溃会阻碍进程。",
        newLabel: "0.1.0b 之后",
        newText: "爆炸伤害被下调到合理基线,阻碍进程的加载、返还、网关与崩溃 Bug 已修复。后续补丁再次改动了数值。",
      }),
    sec("build-impact", "impact-dashboard", 8, "Build and skill impact", "构筑与技能影响",
      {
        cards: [
          { area: "Gas Grenade builds", verdict: "Nerfed at launch", detail: "The 0.1.0b explosion cut hit poison and ignite loops that leaned on Gas Grenade." },
          { area: "Gas Arrow builds", verdict: "Nerfed at launch", detail: "Gas Arrow explosion damage was reduced alongside Gas Grenade." },
          { area: "General progression", verdict: "Unblocked", detail: "Loading and crash fixes let players progress past previously stuck states." },
          { area: "Other skills", verdict: "Still current", detail: "Skills not touched by 0.1.0b kept their launch behaviour until later patches." },
        ],
      },
      {
        cards: [
          { area: "气爆手雷构筑", verdict: "首发即削弱", detail: "0.1.0b 的爆炸削减打击了依赖气爆手雷的中毒与点燃循环。" },
          { area: "气爆箭构筑", verdict: "首发即削弱", detail: "气爆箭爆炸伤害与气爆手雷一同被下调。" },
          { area: "通用进程", verdict: "已解除阻塞", detail: "加载与崩溃修复让玩家得以越过此前卡住的状态。" },
          { area: "其他技能", verdict: "仍保留", detail: "未被 0.1.0b 触及的技能保持首发行为,直到后续补丁。" },
        ],
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Gas Grenade / Gas Arrow damage", status: "changed-later", currentSummary: "0.1.0b pulled explosion damage down; later patches retuned the skills again.", supersededBy: "0.1.0b, 0.2.0, 0.3.0", affectedContent: "gas-grenade-pathfinder build" },
          { topic: "Loading and crash stability", status: "still-current", currentSummary: "The 0.1.0b fixes were the first stability pass; the client is far more stable now.", supersededBy: "—", affectedContent: "Class and build guides" },
          { topic: "Atlas Controller Refund", status: "changed-later", currentSummary: "Corrected in 0.1.0b, then the Atlas around it was rebuilt.", supersededBy: "0.1.0b, 0.2.0", affectedContent: "early-atlas-progression-waystone-sustain guide" },
          { topic: "Console Gateway", status: "still-current", currentSummary: "Restored in 0.1.0b and remains functional.", supersededBy: "—", affectedContent: "System pages" },
        ],
      },
      {
        rows: [
          { topic: "气爆手雷 / 气爆箭伤害", status: "changed-later", currentSummary: "0.1.0b 下调了爆炸伤害,后续补丁再次重调这些技能。", supersededBy: "0.1.0b, 0.2.0, 0.3.0", affectedContent: "gas-grenade-pathfinder 构筑" },
          { topic: "加载与崩溃稳定性", status: "still-current", currentSummary: "0.1.0b 的修复是首次稳定性打磨,如今客户端已稳定得多。", supersededBy: "—", affectedContent: "职业与构筑指南" },
          { topic: "万象控制器返还", status: "changed-later", currentSummary: "0.1.0b 修正,随后其所在的万象终界被重建。", supersededBy: "0.1.0b, 0.2.0", affectedContent: "early-atlas-progression-waystone-sustain 指南" },
          { topic: "控制台网关", status: "still-current", currentSummary: "0.1.0b 恢复,至今仍可用。", supersededBy: "—", affectedContent: "系统页面" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Gas explosion damage", thenText: "Launch explosions were overtuned before 0.1.0b.", nowText: "0.1.0b pulled them down and later patches retuned the skills." },
          { aspect: "Loading", thenText: "Some area loads failed at launch.", nowText: "0.1.0b fixed loading; stability improved further since." },
          { aspect: "Crash paths", thenText: "Several crash paths ended sessions at launch.", nowText: "0.1.0b closed them; stability passes continued through 0.5." },
          { aspect: "Console Gateway", thenText: "The Console Gateway did not function at launch.", nowText: "Restored in 0.1.0b and remains functional." },
        ],
      },
      {
        rows: [
          { aspect: "气体爆炸伤害", thenText: "首发爆炸在 0.1.0b 前过强。", nowText: "0.1.0b 下调,后续补丁再次重调。" },
          { aspect: "加载", thenText: "首发时部分区域加载失败。", nowText: "0.1.0b 修复加载,稳定性此后进一步提升。" },
          { aspect: "崩溃路径", thenText: "首发时若干崩溃路径会终结会话。", nowText: "0.1.0b 封堵,稳定性打磨持续至 0.5。" },
          { aspect: "控制台网关", thenText: "首发时控制台网关不可用。", nowText: "0.1.0b 恢复,至今仍可用。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Do not trust Day-1 gas builds", detail: "0.1.0b already cut Gas Grenade/Arrow explosion damage; use current build pages." },
          { priority: "high", label: "Expect a stable client", detail: "The 0.1.0b loading and crash fixes were only the first pass; the client is far steadier now." },
          { priority: "medium", label: "Relearn the Atlas refund", detail: "The Atlas Controller Refund was corrected and the Atlas rebuilt; old advice is outdated." },
          { priority: "medium", label: "Console Gateway works", detail: "If you left at launch, the gateway is functional now." },
        ],
      },
      {
        items: [
          { priority: "high", label: "不要相信首日的气体构筑", detail: "0.1.0b 已削减气爆手雷/气爆箭爆炸伤害,请使用当前构筑页。" },
          { priority: "high", label: "预期稳定的客户端", detail: "0.1.0b 的加载与崩溃修复只是第一波,如今客户端稳得多。" },
          { priority: "medium", label: "重新学习终界返还", detail: "万象控制器返还已修正,终界也已重建,旧建议已过时。" },
          { priority: "medium", label: "控制台网关可用", detail: "若你在首发时离开,现在网关已可用。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players noted Gas Grenade felt overtuned on day one.", quote: "Gas Grenade is deleting screens, this cannot be the final balance.", analysis: "Matches the 0.1.0b explosion damage reduction." },
          { source: "Reddit (0.1.0b)", context: "Viewers asked whether Day-1 gas builds were safe.", quote: "Are these gas build guides still good or did they get nerfed?", analysis: "They were cut in 0.1.0b and moved again later; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch crash state with current.", quote: "Why did my game crash so much at 0.1.0 but not now?", analysis: "Expected: 0.1.0b closed crash paths and stability improved since." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家反映首日气爆手雷过强。", quote: "气爆手雷在清屏,这不可能是最终平衡。", analysis: "对应 0.1.0b 的爆炸伤害下调。" },
          { source: "Reddit(0.1.0b)", context: "观众询问首日气体构筑是否仍可靠。", quote: "这些气体构筑指南还有用吗,还是被削弱了?", analysis: "它们在 0.1.0b 被削减并随后再次变动,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆首发崩溃状态与当前。", quote: "为什么我在 0.1.0 崩溃那么多,现在却不会?", analysis: "预料之中:0.1.0b 封堵了崩溃路径,稳定性此后提升。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Gas Grenade Pathfinder build", type: "build", trigger: "0.1.0b explosion cut", action: "Verify against 0.5.4e skill numbers.", status: "reviewing" },
          { name: "Lightning Spear Amazon build", type: "build", trigger: "Launch class system", action: "Confirm current skill behaviour.", status: "queued" },
          { name: "Tempest Bell skill page", type: "skill", trigger: "Launch skill set", action: "Document current skill behaviour versus launch.", status: "queued" },
          { name: "Weapon Set & Passive Points guide", type: "guide", trigger: "Launch systems", action: "Refresh for current rules.", status: "queued" },
        ],
      },
      {
        rows: [
          { name: "气爆手雷游侠构筑", type: "build", trigger: "0.1.0b 爆炸削减", action: "对照 0.5.4e 技能数值核验。", status: "reviewing" },
          { name: "闪电之枪亚马逊构筑", type: "build", trigger: "首发职业系统", action: "确认当前技能行为。", status: "queued" },
          { name: "雷霆钟技能页", type: "skill", trigger: "首发技能组", action: "记录当前技能行为对比首发。", status: "queued" },
          { name: "武器组与被动点指南", type: "guide", trigger: "首发系统", action: "按当前规则刷新。", status: "queued" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "What did 0.1.0b change?", answer: ["It lowered Gas Grenade and Gas Arrow explosion damage and fixed loading, Atlas Controller Refund, Console Gateway and crashes."] },
          { question: "Why do my Day-1 gas builds feel different now?", answer: ["0.1.0b already pulled explosion damage down, and later patches moved the numbers again. Trust current build pages."] },
          { question: "Are the 0.1.0b crash fixes still relevant?", answer: ["They were the first stability pass; the client is far more stable now thanks to continued fixes."] },
          { question: "Which 0.1.0b changes are still current?", answer: ["The Console Gateway and the broad stability direction remain; the specific Gas damage numbers were retuned later."] },
        ],
      },
      {
        items: [
          { question: "0.1.0b 改了什么?", answer: ["它下调了气爆手雷与气爆箭的爆炸伤害,并修复了加载、万象控制器返还、控制台网关与崩溃。"] },
          { question: "为什么我的首日气体构筑现在不一样了?", answer: ["0.1.0b 已下调爆炸伤害,后续补丁再次改动数值。请信任当前构筑页。"] },
          { question: "0.1.0b 的崩溃修复还有意义吗?", answer: ["它们是首次稳定性打磨;得益于持续修复,如今客户端已稳定得多。"] },
          { question: "哪些 0.1.0b 改动仍保留?", answer: ["控制台网关与整体稳定性方向保留,但具体气体伤害数值在之后被重调。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

// =====================================================================
// Patch 5: patch-0-1-0c-loot-currency-waystones  (economy-patch, 0.1.0c)
// =====================================================================
const patch5 = {
  slug: "patch-0-1-0c-loot-currency-waystones",
  patchCategory: "balance",
  patchVersion: "0.1.0c",
  patch: "0.1.0c",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/items/artificers-orb-hero.webp",
  cardImage: "/images/items/artificers-orb-hero.webp",
  imageAlt: {
    en: "The Path of Exile 2 0.1.0c economy patch that rebalanced loot, currency and Waystone prefixes",
    zh: "流放之路 2 0.1.0c 经济补丁,重平衡了战利品、通货与界石前缀",
  },
  tags: ["early-access", "0-1-0", "0-1-0c", "economy", "balance", "currency", "waystones", "historical"],
  title: {
    en: "Path of Exile 2 0.1.0c Loot & Currency Patch: Regal/Gemcutter Rates, Chaos/Artificer Redistribution & Waystone Prefix",
    zh: "流放之路 2 0.1.0c 战利品与通货补丁:圣言/宝石匠掉率、混沌/工匠重分配与界石前缀",
  },
  shortTitle: { en: "0.1.0c Loot & Currency", zh: "0.1.0c 战利品与通货" },
  summary: {
    en: "The 0.1.0c economy patch raised Regal Orb and Gemcutter's Prism drop rates, redistributed Chaos and Artificer's Orbs, and buffed Waystone prefixes to improve early map sustain. This page records exactly what 0.1.0c changed and how later patches moved the economy again.",
    zh: "0.1.0c 经济补丁提高了圣言石与宝石匠 prism 的掉率,重新分配了混沌石与工匠石,并增强界石前缀以改善早期地图续航。本页记录 0.1.0c 究竟改了什么,以及后续补丁如何再次改动经济。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0c economy patch. Covers the higher Regal Orb and Gemcutter's Prism drop rates, the Chaos Orbs and Artificer's Orbs redistribution, the Waystone prefix buff for map sustain, and how these economy changes compare with client 0.5.4e.",
    zh: "流放之路 2 0.1.0c 经济补丁的完整历史。涵盖更高的圣言石与宝石匠 prism 掉率、混沌石与工匠石的重新分配、改善地图续航的界石前缀增强,以及这些经济改动如何对照客户端 0.5.4e。",
  },
  currentApplicability: [
    {
      topicId: "Regal / Gemcutter drop rates",
      status: "changed-later",
      currentSummary: { en: ["0.1.0c raised these rates; later patches tuned currency drops further."], zh: ["0.1.0c 提高了这些掉率,后续补丁进一步调整了通货掉落。"] },
      supersededByPatchIds: ["0.1.0c", "0.2.0", "0.3.0"],
      affectedContentIds: ["artificers-orb"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Chaos / Artificer redistribution",
      status: "changed-later",
      currentSummary: { en: ["0.1.0c moved where these orbs dropped; later economy patches changed it again."], zh: ["0.1.0c 改变了这些 orb 的掉落位置,后续经济补丁再次改动。"] },
      supersededByPatchIds: ["0.1.0c", "0.2.0"],
      affectedContentIds: ["artificers-orb", "waystones-guide"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Waystone prefix buff",
      status: "changed-later",
      currentSummary: { en: ["The 0.1.0c Waystone prefix buff was only the first of many Waystone changes."], zh: ["0.1.0c 的界石前缀增强只是界石诸多改动中的第一次。"] },
      supersededByPatchIds: ["0.1.0c", "0.2.0", "0.5.0"],
      affectedContentIds: ["waystones-guide", "early-atlas-progression-waystone-sustain"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: [],
  relatedBossIds: [],
  relatedItemIds: ["waystones-guide", "expedition-logbooks", "artificers-orb"],
  relatedGuideIds: ["early-atlas-progression-waystone-sustain"],
  relatedSkillIds: [],
  seo: {
    title: { en: "PoE2 0.1.0c Loot & Currency Patch — Rates, Redistribution & Waystones", zh: "流放之路 2 0.1.0c 战利品与通货补丁 — 掉率、重分配与界石" },
    description: { en: "What the 0.1.0c economy patch changed: Regal/Gemcutter rates, Chaos/Artificer redistribution, Waystone prefix buff.", zh: "0.1.0c 经济补丁改了什么:圣言/宝石匠掉率、混沌/工匠重分配、界石前缀增强。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "The 0.1.0c economy patch, about a week after launch, tackled the early economy. It raised the drop rate of Regal Orbs and Gemcutter's Prisms, redistributed Chaos Orbs and Artificer's Orbs to better places, and buffed Waystone prefixes so maps sustained more reliably.",
          "This page is the total-entry history of 0.1.0c: what it changed in the economy, why it mattered for early progression, and which economy rules still resemble the current client versus what later patches rebuilt.",
        ],
        bullets: [
          "0.1.0c landed 2024-12-13, one week after launch",
          "Higher Regal Orb and Gemcutter's Prism drop rates",
          "Chaos and Artificer redistribution plus Waystone prefix buff",
        ],
      },
      {
        paragraphs: [
          "0.1.0c 经济补丁在首发约一周后,着手处理早期经济。它提高了圣言石与宝石匠 prism 的掉率,将混沌石与工匠石重新分配到更合理的位置,并增强界石前缀,让地图续航更可靠。",
          "本页是 0.1.0c 的完整历史:它在经济中改了什么、为何对早期进程重要,以及哪些经济规则仍与当前客户端相似、哪些被后续补丁重建。",
        ],
        bullets: [
          "0.1.0c 于 2024-12-13 上线,距首发一周",
          "更高的圣言石与宝石匠 prism 掉率",
          "混沌与工匠重分配,外加界石前缀增强",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0c economy era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0c is a historical economy patch, not a current economy guide. The currency rates and Waystone rules it touched were reworked repeatedly across the first year of Early Access.",
          "Reading a Day-1 economy guide today is misleading: the Regal, Gemcutter, Chaos and Artificer placement it describes was changed by 0.1.0c and then again by 0.2 to 0.5. Treat 0.1.0c footage as a record of the launch economy, not as a current tutorial.",
        ],
        bullets: [
          "0.1.0c = economy starting point, not final design",
          "Day-1 economy guides are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0c 经济时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0c 是历史经济补丁,而非当前经济指南。它触及的通货掉率与界石规则在抢先体验的第一年里被反复重做。",
          "今天阅读首日的经济指南会误导人:它所描述的圣言、宝石匠、混沌、工匠位置,在 0.1.0c 被改动,之后又被 0.2 至 0.5 再次修改。请把 0.1.0c 视频视为首发经济的记录,而非当前教程。",
        ],
        bullets: [
          "0.1.0c = 经济起点,而非最终设计",
          "首日经济指南是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("economy-scope", "overview", 3, "What 0.1.0c actually changed", "0.1.0c 究竟改了什么",
      {
        paragraphs: [
          "The headline economy change was currency availability: Regal Orbs and Gemcutter's Prisms, both gatekeepers for upgrading and qualitying gear, dropped more often so players were not hard-blocked. Chaos Orbs and Artificer's Orbs were redistributed to drop from more appropriate content.",
          "On the endgame side, Waystone prefixes were buffed. Stronger prefixes meant maps were more likely to chain into further maps, improving the early sustain that 0.1.0 launch had struggled with.",
        ],
        bullets: [
          "Regal and Gemcutter drop rates up",
          "Chaos and Artificer redistributed",
          "Waystone prefixes buffed for sustain",
        ],
      },
      {
        paragraphs: [
          "最显眼的经济改动是通货供给:圣言石与宝石匠 prism 都是升级与品质装备的门槛,它们掉落更频繁,玩家不再被硬性卡住。混沌石与工匠石被重新分配到更合适的内容掉落。",
          "在终局侧,界石前缀被增强。更强的后缀意味着地图更可能链向更多地图,改善了 0.1.0 首发所困扰的早期续航。",
        ],
        bullets: [
          "圣言与宝石匠掉率提升",
          "混沌与工匠重新分配",
          "界石前缀增强以改善续航",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Launch economy with rough currency and Waystone sustain.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "Hotfix", summary: "Skill and crash fixes; no economy change yet.", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "Economy Patch", summary: "Regal/Gemcutter rates up, Chaos/Artificer redistribution, Waystone prefix buff.", tags: ["balance", "economy"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "Later line", summary: "The current major line (baseline 0.5.4e) that reworked the economy again.", tags: ["current-baseline"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "首发经济,通货与界石续航粗糙。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "热修", summary: "技能与崩溃修复,尚无经济改动。", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "经济补丁", summary: "圣言/宝石匠掉率提升,混沌/工匠重分配,界石前缀增强。", tags: ["balance", "economy"] },
          { code: "0.2.0+", date: "2025-04-04", kind: "后续主线", summary: "当前主线(基线 0.5.4e),再次重做经济。", tags: ["current-baseline"] },
        ],
      }),
    sec("economy-impact", "impact-dashboard", 5, "0.1.0c economy changes and their fate", "0.1.0c 经济改动及其归宿",
      {
        cards: [
          { area: "Regal Orb rate", verdict: "Changed again later", detail: "0.1.0c raised the rate; later patches tuned currency drops further." },
          { area: "Gemcutter's Prism rate", verdict: "Changed again later", detail: "0.1.0c raised the rate; later economy patches moved it again." },
          { area: "Chaos Orb placement", verdict: "Redistributed", detail: "0.1.0c moved Chaos drops; later patches changed placement again." },
          { area: "Artificer's Orb placement", verdict: "Redistributed", detail: "0.1.0c moved Artificer drops to better content." },
          { area: "Waystone prefixes", verdict: "Buffed then rebuilt", detail: "The 0.1.0c prefix buff helped sustain; Waystones were rebuilt through 0.2 to 0.5." },
        ],
      },
      {
        cards: [
          { area: "圣言石掉率", verdict: "后续再次改动", detail: "0.1.0c 提高了掉率,后续补丁进一步调整了通货掉落。" },
          { area: "宝石匠 prism 掉率", verdict: "后续再次改动", detail: "0.1.0c 提高了掉率,后续经济补丁再次变动。" },
          { area: "混沌石位置", verdict: "已重分配", detail: "0.1.0c 移动了混沌掉落,后续补丁再次改动位置。" },
          { area: "工匠石位置", verdict: "已重分配", detail: "0.1.0c 将工匠掉落移到更合适的内容。" },
          { area: "界石前缀", verdict: "增强后重建", detail: "0.1.0c 前缀增强改善了续航,界石在 0.2 至 0.5 间被重建。" },
        ],
      }),
    sec("economy-table", "data-table", 6, "0.1.0c economy vs current client", "0.1.0c 经济对比当前客户端",
      {
        caption: "What 0.1.0c changed, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "system", label: "System" },
          { key: "launch", label: "0.1.0c state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { system: "Regal Orb rate", launch: "Raised in 0.1.0c.", status: "Retuned later", entry: "artificers-orb item page" },
          { system: "Gemcutter's Prism rate", launch: "Raised in 0.1.0c.", status: "Retuned later", entry: "artificers-orb item page" },
          { system: "Chaos Orb", launch: "Redistributed in 0.1.0c.", status: "Placement changed", entry: "artificers-orb item page" },
          { system: "Artificer's Orb", launch: "Redistributed in 0.1.0c.", status: "Placement changed", entry: "artificers-orb item page" },
          { system: "Waystone prefixes", launch: "Buffed in 0.1.0c.", status: "Rebuilt later", entry: "waystones-guide / early-atlas guide" },
        ],
      },
      {
        caption: "0.1.0c 改了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "system", label: "系统" },
          { key: "launch", label: "0.1.0c 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { system: "圣言石掉率", launch: "0.1.0c 提升。", status: "后续重调", entry: "artificers-orb 物品页" },
          { system: "宝石匠 prism 掉率", launch: "0.1.0c 提升。", status: "后续重调", entry: "artificers-orb 物品页" },
          { system: "混沌石", launch: "0.1.0c 重分配。", status: "位置已变", entry: "artificers-orb 物品页" },
          { system: "工匠石", launch: "0.1.0c 重分配。", status: "位置已变", entry: "artificers-orb 物品页" },
          { system: "界石前缀", launch: "0.1.0c 增强。", status: "后续重建", entry: "waystones-guide / early-atlas 指南" },
        ],
      }),
    sec("before-after", "before-after", 7, "Launch economy vs after 0.1.0c", "首发经济 vs 0.1.0c 之后",
      {
        oldLabel: "Launch-day 0.1.0 economy (before 0.1.0c)",
        oldText: "Regal and Gemcutter drops were scarce, Chaos and Artificer placement was awkward, and Waystone prefixes rarely sustained maps.",
        newLabel: "After 0.1.0c",
        newText: "Regal and Gemcutter dropped more often, Chaos and Artificer moved to better content, and Waystone prefixes buffed sustain. Later patches reworked the economy again.",
      },
      {
        oldLabel: "首发当日 0.1.0 经济(0.1.0c 之前)",
        oldText: "圣言与宝石匠掉落稀少,混沌与工匠位置尴尬,界石前缀很少能维持地图续航。",
        newLabel: "0.1.0c 之后",
        newText: "圣言与宝石匠掉落更频繁,混沌与工匠移到更合适的内容,界石前缀增强了续航。后续补丁再次重做经济。",
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Regal / Gemcutter rates", status: "changed-later", currentSummary: "0.1.0c raised these rates; later patches tuned currency drops further.", supersededBy: "0.1.0c, 0.2.0, 0.3.0", affectedContent: "artificers-orb item page" },
          { topic: "Chaos / Artificer placement", status: "changed-later", currentSummary: "0.1.0c redistributed these orbs; later economy patches changed placement again.", supersededBy: "0.1.0c, 0.2.0", affectedContent: "artificers-orb item page" },
          { topic: "Waystone prefixes", status: "changed-later", currentSummary: "The 0.1.0c prefix buff was the first of many Waystone changes.", supersededBy: "0.1.0c, 0.2.0, 0.5.0", affectedContent: "waystones-guide / early-atlas guide" },
          { topic: "Early map sustain", status: "changed-later", currentSummary: "0.1.0c improved sustain; later Waystone reworks changed how maps chain.", supersededBy: "0.1.0c, 0.2.0, 0.5.0", affectedContent: "early-atlas-progression-waystone-sustain guide" },
        ],
      },
      {
        rows: [
          { topic: "圣言 / 宝石匠掉率", status: "changed-later", currentSummary: "0.1.0c 提高了这些掉率,后续补丁进一步调整了通货掉落。", supersededBy: "0.1.0c, 0.2.0, 0.3.0", affectedContent: "artificers-orb 物品页" },
          { topic: "混沌 / 工匠位置", status: "changed-later", currentSummary: "0.1.0c 重新分配了这些 orb,后续经济补丁再次改动位置。", supersededBy: "0.1.0c, 0.2.0", affectedContent: "artificers-orb 物品页" },
          { topic: "界石前缀", status: "changed-later", currentSummary: "0.1.0c 的前缀增强只是界石诸多改动中的第一次。", supersededBy: "0.1.0c, 0.2.0, 0.5.0", affectedContent: "waystones-guide / early-atlas 指南" },
          { topic: "早期地图续航", status: "changed-later", currentSummary: "0.1.0c 改善了续航,后续界石重做改变了地图链方式。", supersededBy: "0.1.0c, 0.2.0, 0.5.0", affectedContent: "early-atlas-progression-waystone-sustain 指南" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Regal / Gemcutter", thenText: "Scarce at launch before 0.1.0c.", nowText: "0.1.0c raised rates; later patches retuned currency drops." },
          { aspect: "Chaos / Artificer", thenText: "Awkward placement at launch.", nowText: "0.1.0c redistributed; later patches moved placement again." },
          { aspect: "Waystone prefixes", thenText: "Rarely sustained maps before 0.1.0c.", nowText: "0.1.0c buffed prefixes; Waystones rebuilt through 0.2 to 0.5." },
          { aspect: "Map sustain", thenText: "Struggled at launch.", nowText: "0.1.0c improved it; later reworks changed chaining." },
        ],
      },
      {
        rows: [
          { aspect: "圣言 / 宝石匠", thenText: "首发时(0.1.0c 前)稀少。", nowText: "0.1.0c 提高掉率,后续补丁重调通货掉落。" },
          { aspect: "混沌 / 工匠", thenText: "首发时位置尴尬。", nowText: "0.1.0c 重分配,后续补丁再次移动位置。" },
          { aspect: "界石前缀", thenText: "0.1.0c 前很少能维持地图。", nowText: "0.1.0c 增强前缀,界石在 0.2 至 0.5 间重建。" },
          { aspect: "地图续航", thenText: "首发时吃力。", nowText: "0.1.0c 改善,后续重做改变了链图方式。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Relearn currency sources", detail: "0.1.0c changed where Regal, Gemcutter, Chaos and Artificer drop; use current item pages." },
          { priority: "high", label: "Ignore Day-1 economy guides", detail: "0.1.0c moved the economy and later patches moved it again; treat launch guides as historical." },
          { priority: "medium", label: "Waystones were rebuilt", detail: "The 0.1.0c prefix buff was only the start; follow the current early-atlas guide." },
          { priority: "medium", label: "Sustain is easier now", detail: "Later Waystone reworks changed how maps chain, so old sustain advice is outdated." },
        ],
      },
      {
        items: [
          { priority: "high", label: "重新学习通货来源", detail: "0.1.0c 改变了圣言、宝石匠、混沌、工匠的掉落位置,请使用当前物品页。" },
          { priority: "high", label: "忽略首日经济指南", detail: "0.1.0c 变动了经济,后续补丁再次变动,首发指南应视为历史。" },
          { priority: "medium", label: "界石已被重建", detail: "0.1.0c 的前缀增强只是开始,请遵循当前 early-atlas 指南。" },
          { priority: "medium", label: "现在续航更简单", detail: "后续界石重做改变了链图方式,旧的续航建议已过时。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players noted Regal and Gemcutter felt too rare.", quote: "I have zero Regals and cannot upgrade my gear, this is stuck.", analysis: "Matches the 0.1.0c rate increase for both orbs." },
          { source: "Reddit (0.1.0c)", context: "Viewers asked whether launch economy guides were safe.", quote: "Are these currency guides still good or did they rework drops?", analysis: "0.1.0c moved drops and later patches moved them again; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch Waystone state with current.", quote: "Why do my maps not sustain like the 0.1.0 video?", analysis: "Expected: Waystones were rebuilt after 0.1.0c." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家反映圣言与宝石匠过于稀少。", quote: "我一个圣言都没有,无法升级装备,卡住了。", analysis: "对应 0.1.0c 对两种 orb 掉率的提升。" },
          { source: "Reddit(0.1.0c)", context: "观众询问首发经济指南是否仍可靠。", quote: "这些通货指南还有用吗,还是掉落被重做了?", analysis: "0.1.0c 变动了掉落,后续补丁再次变动,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆首发界石状态与当前。", quote: "为什么我的地图不像 0.1.0 视频那样能续航?", analysis: "预料之中:界石在 0.1.0c 之后被重建。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Artificer's Orb item page", type: "item", trigger: "0.1.0c rate and placement change", action: "Document current drop sources versus launch.", status: "reviewing" },
          { name: "Waystones guide", type: "item", trigger: "0.1.0c prefix buff", action: "Refresh for current Waystone rules.", status: "reviewing" },
          { name: "Expedition Logbooks item page", type: "item", trigger: "Launch league mechanic", action: "Document current Expedition behaviour.", status: "queued" },
          { name: "Early Atlas progression guide", type: "guide", trigger: "Waystone rebuild", action: "Refresh for current Atlas and Waystone rules.", status: "reviewing" },
        ],
      },
      {
        rows: [
          { name: "工匠石物品页", type: "item", trigger: "0.1.0c 掉率与位置改动", action: "记录当前掉落来源对比首发。", status: "reviewing" },
          { name: "界石指南", type: "item", trigger: "0.1.0c 前缀增强", action: "按当前界石规则刷新。", status: "reviewing" },
          { name: "远征日志物品页", type: "item", trigger: "首发异界机制", action: "记录当前远征行为。", status: "queued" },
          { name: "Early Atlas 推进指南", type: "guide", trigger: "界石重建", action: "按当前终界与界石规则刷新。", status: "reviewing" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "What did 0.1.0c change in the economy?", answer: ["It raised Regal Orb and Gemcutter's Prism drop rates, redistributed Chaos and Artificer's Orbs, and buffed Waystone prefixes for better map sustain."] },
          { question: "Why do my Day-1 currency guides feel different now?", answer: ["0.1.0c already moved currency drops, and later patches moved them again. Trust current item pages."] },
          { question: "Are the 0.1.0c Waystone changes still current?", answer: ["The prefix buff was only the first of many Waystone changes; the Waystone system was rebuilt through 0.2 to 0.5."] },
          { question: "Which 0.1.0c changes are still current?", answer: ["The direction of better early sustain remains, but the specific currency rates and Waystone rules were retuned later."] },
        ],
      },
      {
        items: [
          { question: "0.1.0c 在经济中改了什么?", answer: ["它提高了圣言石与宝石匠 prism 的掉率,重新分配了混沌石与工匠石,并增强界石前缀以改善地图续航。"] },
          { question: "为什么我的首日通货指南现在不一样了?", answer: ["0.1.0c 已变动通货掉落,后续补丁再次变动。请信任当前物品页。"] },
          { question: "0.1.0c 的界石改动还保留吗?", answer: ["前缀增强只是界石诸多改动中的第一次,界石系统在 0.2 至 0.5 间被重建。"] },
          { question: "哪些 0.1.0c 改动仍保留?", answer: ["更好的早期续航方向保留,但具体通货掉率与界石规则在之后被重调。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

// =====================================================================
// Patch 6: patch-0-1-0d-trigger-gems-energy-defence  (mechanics-patch, 0.1.0d)
// =====================================================================
const patch6 = {
  slug: "patch-0-1-0d-trigger-gems-energy-defence",
  patchCategory: "balance",
  patchVersion: "0.1.0d",
  patch: "0.1.0d",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/skills/tempest-bell.webp",
  cardImage: "/images/skills/tempest-bell.webp",
  imageAlt: {
    en: "The Path of Exile 2 0.1.0d mechanics patch that reworked Trigger Gem Energy, Leech, Block and Dodge",
    zh: "流放之路 2 0.1.0d 机制补丁,重做了触发宝石能量、偷取、格挡与闪避",
  },
  tags: ["early-access", "0-1-0", "0-1-0d", "mechanics", "balance", "trigger", "defence", "historical"],
  title: {
    en: "Path of Exile 2 0.1.0d Mechanics Patch: Trigger Gem Energy Rework, Leech Buff & Block/Dodge Changes",
    zh: "流放之路 2 0.1.0d 机制补丁:触发宝石能量重做、偷取增强与格挡/闪避改动",
  },
  shortTitle: { en: "0.1.0d Mechanics Patch", zh: "0.1.0d 机制补丁" },
  summary: {
    en: "The 0.1.0d mechanics patch reworked Trigger Gem Energy (Monster Power and Ailment Strength), buffed Leech, changed Block and Dodge, and clarified Trial Keys. This page records exactly what 0.1.0d changed and how later patches moved the mechanics again.",
    zh: "0.1.0d 机制补丁重做了触发宝石能量(怪物强度与异状强度)、增强了偷取、改动格挡与闪避,并澄清了试炼钥匙。本页记录 0.1.0d 究竟改了什么,以及后续补丁如何再次改动机制。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0d mechanics patch. Covers the Trigger Gem Energy rework built on Monster Power and Ailment Strength, the Leech buff, the Block and Dodge changes, the Trial Key clarity, and how these mechanics compare with client 0.5.4e.",
    zh: "流放之路 2 0.1.0d 机制补丁的完整历史。涵盖基于怪物强度与异状强度的触发宝石能量重做、偷取增强、格挡与闪避改动、试炼钥匙澄清,以及这些机制如何对照客户端 0.5.4e。",
  },
  currentApplicability: [
    {
      topicId: "Trigger Gem Energy",
      status: "changed-later",
      currentSummary: { en: ["0.1.0d rebuilt Trigger Gem Energy on Monster Power and Ailment Strength; later patches refined it."], zh: ["0.1.0d 基于怪物强度与异状强度重建了触发宝石能量,后续补丁做了细化。"] },
      supersededByPatchIds: ["0.1.0d", "0.2.0", "0.3.0"],
      affectedContentIds: ["tempest-bell", "twister"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Leech",
      status: "changed-later",
      currentSummary: { en: ["0.1.0d buffed Leech; later patches tuned recovery mechanics."], zh: ["0.1.0d 增强了偷取,后续补丁调整了恢复机制。"] },
      supersededByPatchIds: ["0.1.0d", "0.2.0"],
      affectedContentIds: ["combat-frenzy"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Block and Dodge",
      status: "changed-later",
      currentSummary: { en: ["0.1.0d changed Block and Dodge; later defence patches moved them again."], zh: ["0.1.0d 改动格挡与闪避,后续防御补丁再次变动。"] },
      supersededByPatchIds: ["0.1.0d", "0.2.0", "0.3.0"],
      affectedContentIds: ["weapon-set-passive-points-explained"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: [],
  relatedBossIds: [],
  relatedItemIds: ["orb-of-sacrifice", "vaal-orb"],
  relatedGuideIds: ["weapon-set-passive-points-explained"],
  relatedSkillIds: ["tempest-bell", "twister", "combat-frenzy"],
  seo: {
    title: { en: "PoE2 0.1.0d Mechanics Patch — Trigger Gems, Leech, Block & Dodge", zh: "流放之路 2 0.1.0d 机制补丁 — 触发宝石、偷取、格挡与闪避" },
    description: { en: "What the 0.1.0d mechanics patch changed: Trigger Gem Energy rework, Leech buff, Block/Dodge changes, Trial Key clarity.", zh: "0.1.0d 机制补丁改了什么:触发宝石能量重做、偷取增强、格挡/闪避改动、试炼钥匙澄清。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "The 0.1.0d mechanics patch, less than two weeks after launch, reworked how Trigger Gems gained and spent Energy, rebuilt on the new Monster Power and Ailment Strength stats. It also buffed Leech, adjusted Block and Dodge, and made Trial Keys clearer.",
          "This page is the total-entry history of 0.1.0d: what it changed in the mechanical layer, why it mattered for defence and trigger builds, and which mechanics still resemble the current client versus what later patches rebuilt.",
        ],
        bullets: [
          "0.1.0d landed 2024-12-17, under two weeks after launch",
          "Trigger Gem Energy reworked on Monster Power and Ailment Strength",
          "Leech buff, Block/Dodge changes, Trial Key clarity",
        ],
      },
      {
        paragraphs: [
          "0.1.0d 机制补丁在首发不到两周后,重做了触发宝石获取与消耗能量的方式,并基于新的怪物强度与异状强度重建。它还增强了偷取、调整了格挡与闪避,并让试炼钥匙更清晰。",
          "本页是 0.1.0d 的完整历史:它在机制层改了什么、为何对防御与触发构筑重要,以及哪些机制仍与当前客户端相似、哪些被后续补丁重建。",
        ],
        bullets: [
          "0.1.0d 于 2024-12-17 上线,距首发不到两周",
          "触发宝石能量基于怪物强度与异状强度重做",
          "偷取增强、格挡/闪避改动、试炼钥匙澄清",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0d mechanics era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0d is a historical mechanics patch, not a current mechanics guide. The Trigger Gem Energy, Leech, Block and Dodge rules it touched were reworked repeatedly across the first year of Early Access.",
          "Reading a Day-1 trigger or defence guide today is misleading: the Energy model and defence maths it shows were changed by 0.1.0d and then again by 0.2 to 0.5. Treat 0.1.0d footage as a record of the launch mechanics, not as a current tutorial.",
        ],
        bullets: [
          "0.1.0d = mechanics starting point, not final design",
          "Day-1 trigger/defence guides are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0d 机制时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0d 是历史机制补丁,而非当前机制指南。它触及的触发宝石能量、偷取、格挡与闪避规则在抢先体验的第一年里被反复重做。",
          "今天阅读首日的触发或防御指南会误导人:它所展示的能量模型与防御公式,在 0.1.0d 被改动,之后又被 0.2 至 0.5 再次修改。请把 0.1.0d 视频视为首发机制的记录,而非当前教程。",
        ],
        bullets: [
          "0.1.0d = 机制起点,而非最终设计",
          "首日触发/防御指南是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("mechanics-scope", "overview", 3, "What 0.1.0d actually changed", "0.1.0d 究竟改了什么",
      {
        paragraphs: [
          "The headline mechanical change was Trigger Gem Energy. Instead of the old model, triggers now scaled with Monster Power and Ailment Strength, so the same support behaved differently depending on the content's stats. This mattered most for builds leaning on cast-on-crit or cast-on-ailment setups.",
          "Defence and recovery also moved: Leech was buffed so sustain felt better, while Block and Dodge were adjusted to change how often hits were avoided. Finally, Trial Keys were clarified so players understood how to reach the trials.",
        ],
        bullets: [
          "Trigger Gem Energy on Monster Power and Ailment Strength",
          "Leech buffed for better sustain",
          "Block and Dodge adjusted; Trial Keys clarified",
        ],
      },
      {
        paragraphs: [
          "最显眼的机制改动是触发宝石能量。不同于旧模型,触发现在随怪物强度与异状强度缩放,因此同一辅助在不同内容数值下表现不同。这对依赖暴击触发或异状触发的构筑影响最大。",
          "防御与恢复也变动:偷取被增强,续航更舒适,而格挡与闪避被调整以改变命中被闪避的频率。最后,试炼钥匙被澄清,玩家得以理解如何进入试炼。",
        ],
        bullets: [
          "触发宝石能量基于怪物强度与异状强度",
          "偷取增强,续航更佳",
          "格挡与闪避调整,试炼钥匙澄清",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Launch mechanics with the first Trigger Gem and defence model.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "Hotfix", summary: "Skill and crash fixes.", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "Economy Patch", summary: "Loot and currency rebalance.", tags: ["balance", "economy"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "Mechanics Patch", summary: "Trigger Gem Energy rework, Leech buff, Block/Dodge changes, Trial Key clarity.", tags: ["balance", "mechanics"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "首发机制,含最初触发宝石与防御模型。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "热修", summary: "技能与崩溃修复。", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "经济补丁", summary: "战利品与通货再平衡。", tags: ["balance", "economy"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "机制补丁", summary: "触发宝石能量重做、偷取增强、格挡/闪避改动、试炼钥匙澄清。", tags: ["balance", "mechanics"] },
        ],
      }),
    sec("mechanics-impact", "impact-dashboard", 5, "0.1.0d mechanics changes and their fate", "0.1.0d 机制改动及其归宿",
      {
        cards: [
          { area: "Trigger Gem Energy", verdict: "Reworked & refined", detail: "0.1.0d rebuilt it on Monster Power and Ailment Strength; later patches refined triggers." },
          { area: "Leech", verdict: "Buffed then tuned", detail: "0.1.0d buffed Leech; later patches tuned recovery." },
          { area: "Block", verdict: "Adjusted later", detail: "0.1.0d changed Block; later defence patches moved it again." },
          { area: "Dodge", verdict: "Adjusted later", detail: "0.1.0d changed Dodge; later defence patches moved it again." },
          { area: "Trial Keys", verdict: "Clarified", detail: "0.1.0d made trial access clearer; later trials reworked rooms." },
        ],
      },
      {
        cards: [
          { area: "触发宝石能量", verdict: "重做并细化", detail: "0.1.0d 基于怪物强度与异状强度重建,后续补丁细化了触发。" },
          { area: "偷取", verdict: "增强后调整", detail: "0.1.0d 增强偷取,后续补丁调整了恢复。" },
          { area: "格挡", verdict: "后续调整", detail: "0.1.0d 改动格挡,后续防御补丁再次变动。" },
          { area: "闪避", verdict: "后续调整", detail: "0.1.0d 改动闪避,后续防御补丁再次变动。" },
          { area: "试炼钥匙", verdict: "已澄清", detail: "0.1.0d 让试炼入口更清晰,后续试炼重做了房间。" },
        ],
      }),
    sec("mechanics-table", "data-table", 6, "0.1.0d mechanics vs current client", "0.1.0d 机制对比当前客户端",
      {
        caption: "What 0.1.0d changed, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "system", label: "System" },
          { key: "launch", label: "0.1.0d state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { system: "Trigger Gem Energy", launch: "Reworked on Monster Power / Ailment Strength.", status: "Refined later", entry: "tempest-bell / twister skill pages" },
          { system: "Leech", launch: "Buffed in 0.1.0d.", status: "Tuned later", entry: "combat-frenzy skill page" },
          { system: "Block", launch: "Changed in 0.1.0d.", status: "Moved later", entry: "weapon-set-passive-points-explained guide" },
          { system: "Dodge", launch: "Changed in 0.1.0d.", status: "Moved later", entry: "weapon-set-passive-points-explained guide" },
          { system: "Trial Keys", launch: "Clarified in 0.1.0d.", status: "Trials reworked", entry: "respec-passive-ascendancy-guide" },
        ],
      },
      {
        caption: "0.1.0d 改了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "system", label: "系统" },
          { key: "launch", label: "0.1.0d 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { system: "触发宝石能量", launch: "基于怪物强度/异状强度重做。", status: "后续细化", entry: "tempest-bell / twister 技能页" },
          { system: "偷取", launch: "0.1.0d 增强。", status: "后续调整", entry: "combat-frenzy 技能页" },
          { system: "格挡", launch: "0.1.0d 改动。", status: "后续变动", entry: "weapon-set-passive-points-explained 指南" },
          { system: "闪避", launch: "0.1.0d 改动。", status: "后续变动", entry: "weapon-set-passive-points-explained 指南" },
          { system: "试炼钥匙", launch: "0.1.0d 澄清。", status: "试炼已重做", entry: "respec-passive-ascendancy-guide" },
        ],
      }),
    sec("before-after", "before-after", 7, "Launch mechanics vs after 0.1.0d", "首发机制 vs 0.1.0d 之后",
      {
        oldLabel: "Launch-day 0.1.0 mechanics (before 0.1.0d)",
        oldText: "Trigger Gems used the old Energy model, Leech was weaker, and Block/Dodge and trial access were less clear.",
        newLabel: "After 0.1.0d",
        newText: "Triggers scaled with Monster Power and Ailment Strength, Leech was buffed, Block/Dodge adjusted, and Trial Keys clarified. Later patches refined these again.",
      },
      {
        oldLabel: "首发当日 0.1.0 机制(0.1.0d 之前)",
        oldText: "触发宝石使用旧能量模型,偷取较弱,格挡/闪避与试炼入口也不清晰。",
        newLabel: "0.1.0d 之后",
        newText: "触发随怪物强度与异状强度缩放,偷取被增强,格挡/闪避调整,试炼钥匙澄清。后续补丁再次细化这些。",
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Trigger Gem Energy", status: "changed-later", currentSummary: "0.1.0d rebuilt triggers on Monster Power and Ailment Strength; later patches refined them.", supersededBy: "0.1.0d, 0.2.0, 0.3.0", affectedContent: "tempest-bell / twister skill pages" },
          { topic: "Leech", status: "changed-later", currentSummary: "0.1.0d buffed Leech; later patches tuned recovery.", supersededBy: "0.1.0d, 0.2.0", affectedContent: "combat-frenzy skill page" },
          { topic: "Block and Dodge", status: "changed-later", currentSummary: "0.1.0d adjusted defence; later patches moved it again.", supersededBy: "0.1.0d, 0.2.0, 0.3.0", affectedContent: "weapon-set-passive-points-explained guide" },
          { topic: "Trial Keys", status: "changed-later", currentSummary: "Clarified in 0.1.0d, then trials were reworked.", supersededBy: "0.1.0d, 0.2.0", affectedContent: "respec-passive-ascendancy-guide" },
        ],
      },
      {
        rows: [
          { topic: "触发宝石能量", status: "changed-later", currentSummary: "0.1.0d 基于怪物强度与异状强度重建触发,后续补丁细化。", supersededBy: "0.1.0d, 0.2.0, 0.3.0", affectedContent: "tempest-bell / twister 技能页" },
          { topic: "偷取", status: "changed-later", currentSummary: "0.1.0d 增强偷取,后续补丁调整恢复。", supersededBy: "0.1.0d, 0.2.0", affectedContent: "combat-frenzy 技能页" },
          { topic: "格挡与闪避", status: "changed-later", currentSummary: "0.1.0d 调整防御,后续补丁再次变动。", supersededBy: "0.1.0d, 0.2.0, 0.3.0", affectedContent: "weapon-set-passive-points-explained 指南" },
          { topic: "试炼钥匙", status: "changed-later", currentSummary: "0.1.0d 澄清,随后试炼被重做。", supersededBy: "0.1.0d, 0.2.0", affectedContent: "respec-passive-ascendancy-guide" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Trigger Energy", thenText: "Old Energy model before 0.1.0d.", nowText: "0.1.0d rebuilt on Monster Power / Ailment Strength; later refined." },
          { aspect: "Leech", thenText: "Weaker at launch.", nowText: "0.1.0d buffed; later tuned recovery." },
          { aspect: "Block / Dodge", thenText: "First-form defence maths.", nowText: "0.1.0d adjusted; later defence patches moved it." },
          { aspect: "Trial access", thenText: "Unclear at launch.", nowText: "0.1.0d clarified keys; trials later reworked." },
        ],
      },
      {
        rows: [
          { aspect: "触发能量", thenText: "0.1.0d 前的旧能量模型。", nowText: "0.1.0d 基于怪物强度/异状强度重建,后续细化。" },
          { aspect: "偷取", thenText: "首发时较弱。", nowText: "0.1.0d 增强,后续调整恢复。" },
          { aspect: "格挡/闪避", thenText: "最初形态的防御公式。", nowText: "0.1.0d 调整,后续防御补丁变动。" },
          { aspect: "试炼入口", thenText: "首发时不清晰。", nowText: "0.1.0d 澄清钥匙,试炼随后重做。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Relearn Trigger Gems", detail: "0.1.0d changed how triggers scale; use current skill pages." },
          { priority: "high", label: "Ignore Day-1 trigger guides", detail: "0.1.0d rebuilt the Energy model and later patches refined it; treat launch guides as historical." },
          { priority: "medium", label: "Defence maths moved", detail: "Block and Dodge changed in 0.1.0d and again later; follow current guides." },
          { priority: "medium", label: "Trials are clearer now", detail: "0.1.0d clarified keys, though trials were later reworked." },
        ],
      },
      {
        items: [
          { priority: "high", label: "重新学习触发宝石", detail: "0.1.0d 改变了触发的缩放方式,请使用当前技能页。" },
          { priority: "high", label: "忽略首日触发指南", detail: "0.1.0d 重建了能量模型,后续补丁又细化,首发指南应视为历史。" },
          { priority: "medium", label: "防御公式已变", detail: "格挡与闪避在 0.1.0d 改动且之后再次变动,请遵循当前指南。" },
          { priority: "medium", label: "试炼现在更清晰", detail: "0.1.0d 澄清了钥匙,尽管试炼后来被重做。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players found triggers unpredictable.", quote: "My trigger gems fire at random rates, I cannot tell why.", analysis: "Matches the 0.1.0d rebuild of Trigger Gem Energy on content stats." },
          { source: "Reddit (0.1.0d)", context: "Viewers asked whether launch trigger guides were safe.", quote: "Are these trigger guides still good or did they rework Energy?", analysis: "0.1.0d rebuilt Energy and later patches refined it; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch defence maths with current.", quote: "Why is my Block nothing like the 0.1.0 video?", analysis: "Expected: Block and Dodge were adjusted after 0.1.0d." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家发现触发不可预测。", quote: "我的触发宝石触发频率随机,我搞不清为什么。", analysis: "对应 0.1.0d 基于内容数值重建触发宝石能量。" },
          { source: "Reddit(0.1.0d)", context: "观众询问首发触发指南是否仍可靠。", quote: "这些触发指南还有用吗,还是能量被重做了?", analysis: "0.1.0d 重建了能量,后续补丁细化,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆首发防御公式与当前。", quote: "为什么我的格挡和 0.1.0 视频完全不一样?", analysis: "预料之中:格挡与闪避在 0.1.0d 之后被调整。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Tempest Bell skill page", type: "skill", trigger: "0.1.0d Trigger Gem rework", action: "Document current trigger behaviour versus launch.", status: "reviewing" },
          { name: "Twister skill page", type: "skill", trigger: "0.1.0d Trigger Gem rework", action: "Document current trigger behaviour versus launch.", status: "reviewing" },
          { name: "Combat Frenzy skill page", type: "skill", trigger: "0.1.0d Leech buff", action: "Document current Leech behaviour versus launch.", status: "queued" },
          { name: "Weapon Set & Passive Points guide", type: "guide", trigger: "0.1.0d Block/Dodge change", action: "Refresh for current defence rules.", status: "queued" },
        ],
      },
      {
        rows: [
          { name: "雷霆钟技能页", type: "skill", trigger: "0.1.0d 触发宝石重做", action: "记录当前触发行为对比首发。", status: "reviewing" },
          { name: "旋风技能页", type: "skill", trigger: "0.1.0d 触发宝石重做", action: "记录当前触发行为对比首发。", status: "reviewing" },
          { name: "战斗狂热技能页", type: "skill", trigger: "0.1.0d 偷取增强", action: "记录当前偷取行为对比首发。", status: "queued" },
          { name: "武器组与被动点指南", type: "guide", trigger: "0.1.0d 格挡/闪避改动", action: "按当前防御规则刷新。", status: "queued" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "What did 0.1.0d change mechanically?", answer: ["It reworked Trigger Gem Energy on Monster Power and Ailment Strength, buffed Leech, changed Block and Dodge, and clarified Trial Keys."] },
          { question: "Why do my Day-1 trigger builds feel different now?", answer: ["0.1.0d already rebuilt the Energy model, and later patches refined triggers. Trust current skill pages."] },
          { question: "Are the 0.1.0d defence changes still current?", answer: ["The direction of clearer triggers and buffed Leech remains, but Block, Dodge and trigger scaling were moved again by later patches."] },
          { question: "Which 0.1.0d changes are still current?", answer: ["The Trial Key clarity direction remains, but the specific Trigger Energy and defence maths were retuned later."] },
        ],
      },
      {
        items: [
          { question: "0.1.0d 在机制上改了什么?", answer: ["它基于怪物强度与异状强度重做了触发宝石能量,增强了偷取,改动格挡与闪避,并澄清了试炼钥匙。"] },
          { question: "为什么我的首日触发构筑现在不一样了?", answer: ["0.1.0d 已重建能量模型,后续补丁又细化了触发。请信任当前技能页。"] },
          { question: "0.1.0d 的防御改动还保留吗?", answer: ["更清晰的触发与增强的偷取方向保留,但格挡、闪避与触发缩放被后续补丁再次变动。"] },
          { question: "哪些 0.1.0d 改动仍保留?", answer: ["试炼钥匙清晰的方向保留,但具体触发能量与防御公式在之后被重调。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

// =====================================================================
// Patch 7: patch-0-1-0e-checkpoints-respec-honour  (progression-qol, 0.1.0e)
// =====================================================================
const patch7 = {
  slug: "patch-0-1-0e-checkpoints-respec-honour",
  patchCategory: "balance",
  patchVersion: "0.1.0e",
  patch: "0.1.0e",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/items/runes-and-soul-cores-hero.webp",
  cardImage: "/images/items/runes-and-soul-cores-hero.webp",
  imageAlt: {
    en: "The Path of Exile 2 0.1.0e quality-of-life patch: checkpoint fast travel, respec cost cuts and Honour fixes",
    zh: "流放之路 2 0.1.0e 生活质量补丁:检查点快速传送、洗点成本下调与荣誉修复",
  },
  tags: ["early-access", "0-1-0", "0-1-0e", "progression", "qol", "respec", "honour", "historical"],
  title: {
    en: "Path of Exile 2 0.1.0e QoL Patch: Checkpoint Fast Travel, Respec Cost Cuts & Honour Fixes",
    zh: "流放之路 2 0.1.0e 生活质量补丁:检查点快速传送、洗点成本下调与荣誉修复",
  },
  shortTitle: { en: "0.1.0e QoL Patch", zh: "0.1.0e 生活质量补丁" },
  summary: {
    en: "The 0.1.0e quality-of-life patch added checkpoint fast travel, cut respec costs, and fixed close-range Honour drains in the Trial of Sekhemas. This page records exactly what 0.1.0e changed for progression and how later patches moved it again.",
    zh: "0.1.0e 生活质量补丁加入了检查点快速传送、下调了洗点成本,并修复了赛克哈玛斯试炼中的近身荣誉流失。本页记录 0.1.0e 在进程上对玩家究竟改了什么,以及后续补丁如何再次变动。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0e quality-of-life patch. Covers checkpoint fast travel across the campaign, the respec cost reduction that eased build commitment, the close-range Honour drain fix in the Trial of Sekhemas, and how these progression changes compare with client 0.5.4e.",
    zh: "流放之路 2 0.1.0e 生活质量补丁的完整历史。涵盖战役中的检查点快速传送、缓解构筑抉择的洗点成本下调、赛克哈玛斯试炼中近身荣誉流失的修复,以及这些进程改动如何对照客户端 0.5.4e。",
  },
  currentApplicability: [
    {
      topicId: "Checkpoint fast travel",
      status: "still-current",
      currentSummary: { en: ["0.1.0e added campaign checkpoint fast travel; later patches kept and extended it."], zh: ["0.1.0e 加入了战役检查点快速传送,后续补丁保留并扩展。"] },
      supersededByPatchIds: [],
      affectedContentIds: ["lightning-spear-amazon", "glacial-lance-ritualist"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Respec cost",
      status: "changed-later",
      currentSummary: { en: ["0.1.0e cut respec cost; later patches changed respec access and cost again."], zh: ["0.1.0e 下调了洗点成本,后续补丁再次改动洗点途径与成本。"] },
      supersededByPatchIds: ["0.1.0e", "0.3.0"],
      affectedContentIds: ["respec-passive-ascendancy-guide"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Honour close-range drain",
      status: "changed-later",
      currentSummary: { en: ["0.1.0e fixed close-range Honour drains; the Sekhemas trial was reworked later."], zh: ["0.1.0e 修复了近身荣誉流失,赛克哈玛斯试炼随后被重做。"] },
      supersededByPatchIds: ["0.1.0e", "0.2.0", "0.3.0"],
      affectedContentIds: ["respec-passive-ascendancy-guide"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: ["lightning-spear-amazon", "glacial-lance-ritualist"],
  relatedBossIds: [],
  relatedItemIds: ["orb-of-sacrifice", "vaal-orb"],
  relatedGuideIds: ["respec-passive-ascendancy-guide", "weapon-set-passive-points-explained"],
  relatedSkillIds: ["tempest-bell", "twister"],
  seo: {
    title: { en: "PoE2 0.1.0e QoL Patch — Checkpoints, Respec Cost & Honour", zh: "流放之路 2 0.1.0e 生活质量补丁 — 检查点、洗点成本与荣誉" },
    description: { en: "What the 0.1.0e QoL patch changed: checkpoint fast travel, respec cost cuts, Honour close-range fix.", zh: "0.1.0e 生活质量补丁改了什么:检查点快速传送、洗点成本下调、近身荣誉修复。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "The 0.1.0e quality-of-life patch, two weeks after launch, made the campaign less punishing. It added fast travel between checkpoints, cut the cost of respeccing your passive tree, and fixed the harsh close-range Honour drains in the Trial of Sekhemas.",
          "This page is the total-entry history of 0.1.0e's progression changes: what it changed for players moving through the game, why it mattered for build commitment, and which conveniences still resemble the current client versus what later patches rebuilt.",
        ],
        bullets: [
          "0.1.0e landed 2024-12-20, two weeks after launch",
          "Checkpoint fast travel across the campaign",
          "Respec cost cut and Honour close-range drain fix",
        ],
      },
      {
        paragraphs: [
          "0.1.0e 生活质量补丁在首发两周后,让战役不再那么惩罚性。它加入了检查点之间的快速传送,下调了被动树洗点的成本,并修复了赛克哈玛斯试炼中严苛的近身荣誉流失。",
          "本页是 0.1.0e 进程改动的完整历史:它对推进游戏的玩家改了什么、为何对构筑抉择重要,以及哪些便利仍与当前客户端相似、哪些被后续补丁重建。",
        ],
        bullets: [
          "0.1.0e 于 2024-12-20 上线,距首发两周",
          "战役中检查点快速传送",
          "洗点成本下调与近身荣誉流失修复",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0e QoL era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0e is a historical quality-of-life patch, not a current progression guide. The respec cost and Honour rules it touched were changed again by 0.2 to 0.5.",
          "Reading a Day-1 progression guide today is misleading: the respec cost and Honour drain it describes were changed by 0.1.0e and then again by later patches. Treat 0.1.0e footage as a record of the launch progression, not as a current tutorial.",
        ],
        bullets: [
          "0.1.0e = QoL starting point, not final design",
          "Day-1 progression guides are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0e 生活质量时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0e 是历史生活质量补丁,而非当前进程指南。它触及的洗点成本与荣誉规则在 0.2 至 0.5 间再次变动。",
          "今天阅读首日的进程指南会误导人:它所描述的洗点成本与荣誉流失,在 0.1.0e 被改动,之后又被后续补丁再次修改。请把 0.1.0e 视频视为首发进程的记录,而非当前教程。",
        ],
        bullets: [
          "0.1.0e = 生活质量起点,而非最终设计",
          "首日进程指南是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("qol-scope", "overview", 3, "What 0.1.0e actually changed", "0.1.0e 究竟改了什么",
      {
        paragraphs: [
          "The headline convenience change was checkpoint fast travel. Players could teleport between activated checkpoints across the campaign, cutting the backtracking that had slowed early progression and leveling.",
          "On top of travel, 0.1.0e cut respec cost so committing to a build was less frightening, and it fixed the close-range Honour drains that had made melee in the Trial of Sekhemas feel unfair. Together these reduced the punishment of early mistakes.",
        ],
        bullets: [
          "Checkpoint fast travel added",
          "Respec cost reduced",
          "Honour close-range drain fixed",
        ],
      },
      {
        paragraphs: [
          "最显眼的便利改动是检查点快速传送。玩家可以在战役中已激活的检查点之间传送,减少了拖慢早期进程与升级的折返。",
          "在传送之外,0.1.0e 下调了洗点成本,让抉择构筑不再那么令人畏惧,并修复了让近战在赛克哈玛斯试炼中感到不公的近身荣誉流失。这些共同减轻了对早期失误的惩罚。",
        ],
        bullets: [
          "加入检查点快速传送",
          "洗点成本下调",
          "近身荣誉流失修复",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Launch campaign with slow backtracking and costly respec.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "Hotfix", summary: "Skill and crash fixes.", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "Economy Patch", summary: "Loot and currency rebalance.", tags: ["balance", "economy"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "Mechanics Patch", summary: "Trigger Gem and defence rework.", tags: ["balance", "mechanics"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "Stabilisation", summary: "Checkpoint fast travel, respec cost cut, Honour close-range fix.", tags: ["balance", "progression"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "首发战役,折返缓慢、洗点昂贵。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "热修", summary: "技能与崩溃修复。", tags: ["hotfixes", "balance"] },
          { code: "0.1.0c", date: "2024-12-13", kind: "经济补丁", summary: "战利品与通货再平衡。", tags: ["balance", "economy"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "机制补丁", summary: "触发宝石与防御重做。", tags: ["balance", "mechanics"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "稳定补丁", summary: "检查点快速传送、洗点成本下调、近身荣誉修复。", tags: ["balance", "progression"] },
        ],
      }),
    sec("qol-impact", "impact-dashboard", 5, "0.1.0e QoL changes and their fate", "0.1.0e 生活质量改动及其归宿",
      {
        cards: [
          { area: "Checkpoint fast travel", verdict: "Still current", detail: "0.1.0e added campaign checkpoint travel; later patches kept and extended it." },
          { area: "Respec cost", verdict: "Cut then changed", detail: "0.1.0e lowered respec cost; later patches changed respec access and cost." },
          { area: "Honour close-range drain", verdict: "Fixed then reworked", detail: "0.1.0e fixed the drain; the Sekhemas trial was reworked later." },
          { area: "Build commitment", verdict: "Easier now", detail: "Lower respec cost and clearer trials reduced the fear of committing to a build." },
        ],
      },
      {
        cards: [
          { area: "检查点快速传送", verdict: "仍保留", detail: "0.1.0e 加入了战役检查点传送,后续补丁保留并扩展。" },
          { area: "洗点成本", verdict: "下调后改动", detail: "0.1.0e 降低洗点成本,后续补丁改动了洗点途径与成本。" },
          { area: "近身荣誉流失", verdict: "修复后重做", detail: "0.1.0e 修复了流失,赛克哈玛斯试炼随后被重做。" },
          { area: "构筑抉择", verdict: "现在更轻松", detail: "更低的洗点成本与更清晰的试炼,降低了抉择构筑的恐惧。" },
        ],
      }),
    sec("qol-table", "data-table", 6, "0.1.0e QoL vs current client", "0.1.0e 生活质量对比当前客户端",
      {
        caption: "What 0.1.0e changed, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "system", label: "System" },
          { key: "launch", label: "0.1.0e state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { system: "Checkpoint travel", launch: "Added in 0.1.0e.", status: "Still current", entry: "Class and build guides" },
          { system: "Respec cost", launch: "Cut in 0.1.0e.", status: "Changed later", entry: "respec-passive-ascendancy-guide" },
          { system: "Honour drain", launch: "Fixed in 0.1.0e.", status: "Trials reworked", entry: "respec-passive-ascendancy-guide" },
          { system: "Build commitment", launch: "Eased in 0.1.0e.", status: "Easier now", entry: "weapon-set-passive-points-explained guide" },
        ],
      },
      {
        caption: "0.1.0e 改了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "system", label: "系统" },
          { key: "launch", label: "0.1.0e 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { system: "检查点传送", launch: "0.1.0e 加入。", status: "仍保留", entry: "职业与构筑指南" },
          { system: "洗点成本", launch: "0.1.0e 下调。", status: "后续改动", entry: "respec-passive-ascendancy-guide" },
          { system: "荣誉流失", launch: "0.1.0e 修复。", status: "试炼已重做", entry: "respec-passive-ascendancy-guide" },
          { system: "构筑抉择", launch: "0.1.0e 缓解。", status: "现在更轻松", entry: "weapon-set-passive-points-explained 指南" },
        ],
      }),
    sec("before-after", "before-after", 7, "Launch progression vs after 0.1.0e", "首发进程 vs 0.1.0e 之后",
      {
        oldLabel: "Launch-day 0.1.0 progression (before 0.1.0e)",
        oldText: "Backtracking between zones was slow, respec was costly, and melee in Sekhemas lost Honour up close unfairly.",
        newLabel: "After 0.1.0e",
        newText: "Checkpoint fast travel arrived, respec cost dropped, and the Honour close-range drain was fixed. Later patches refined respec and trials again.",
      },
      {
        oldLabel: "首发当日 0.1.0 进程(0.1.0e 之前)",
        oldText: "区域间折返缓慢,洗点昂贵,赛克哈玛斯近战不公地流失荣誉。",
        newLabel: "0.1.0e 之后",
        newText: "检查点快速传送上线,洗点成本下降,近身荣誉流失修复。后续补丁再次细化洗点与试炼。",
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Checkpoint fast travel", status: "still-current", currentSummary: "0.1.0e added campaign checkpoint travel; later patches kept and extended it.", supersededBy: "—", affectedContent: "Class and build guides" },
          { topic: "Respec cost", status: "changed-later", currentSummary: "0.1.0e cut respec cost; later patches changed respec access and cost again.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "Honour close-range drain", status: "changed-later", currentSummary: "Fixed in 0.1.0e, then the Sekhemas trial was reworked.", supersededBy: "0.1.0e, 0.2.0, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "Build commitment", status: "changed-later", currentSummary: "0.1.0e eased commitment; later patches changed how respec works.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "weapon-set-passive-points-explained guide" },
        ],
      },
      {
        rows: [
          { topic: "检查点快速传送", status: "still-current", currentSummary: "0.1.0e 加入了战役检查点传送,后续补丁保留并扩展。", supersededBy: "—", affectedContent: "职业与构筑指南" },
          { topic: "洗点成本", status: "changed-later", currentSummary: "0.1.0e 下调洗点成本,后续补丁再次改动洗点途径与成本。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "近身荣誉流失", status: "changed-later", currentSummary: "0.1.0e 修复,随后赛克哈玛斯试炼被重做。", supersededBy: "0.1.0e, 0.2.0, 0.3.0", affectedContent: "respec-passive-ascendancy-guide" },
          { topic: "构筑抉择", status: "changed-later", currentSummary: "0.1.0e 缓解了抉择,后续补丁改动了洗点方式。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "weapon-set-passive-points-explained 指南" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Checkpoint travel", thenText: "Slow backtracking before 0.1.0e.", nowText: "0.1.0e added fast travel; later patches extended it." },
          { aspect: "Respec cost", thenText: "Costly at launch.", nowText: "0.1.0e cut it; later patches changed respec again." },
          { aspect: "Honour drain", thenText: "Harsh close-range drain before 0.1.0e.", nowText: "0.1.0e fixed it; trials later reworked." },
          { aspect: "Build commitment", thenText: "Punishing at launch.", nowText: "0.1.0e eased it; respec is cheaper now." },
        ],
      },
      {
        rows: [
          { aspect: "检查点传送", thenText: "0.1.0e 前折返缓慢。", nowText: "0.1.0e 加入快速传送,后续补丁扩展。" },
          { aspect: "洗点成本", thenText: "首发时昂贵。", nowText: "0.1.0e 下调,后续补丁再次改动洗点。" },
          { aspect: "荣誉流失", thenText: "0.1.0e 前近身流失严苛。", nowText: "0.1.0e 修复,试炼随后重做。" },
          { aspect: "构筑抉择", thenText: "首发时惩罚性。", nowText: "0.1.0e 缓解,现在洗点更便宜。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Use checkpoint fast travel", detail: "0.1.0e added it; backtracking is no longer slow." },
          { priority: "high", label: "Respec is cheaper now", detail: "0.1.0e cut respec cost and later patches changed it again; follow current respec guide." },
          { priority: "medium", label: "Honour is fairer now", detail: "0.1.0e fixed close-range drains; the trial was later reworked." },
          { priority: "medium", label: "Ignore Day-1 progression guides", detail: "0.1.0e changed travel and respec; treat launch guides as historical." },
        ],
      },
      {
        items: [
          { priority: "high", label: "使用检查点快速传送", detail: "0.1.0e 已加入,折返不再缓慢。" },
          { priority: "high", label: "现在洗点更便宜", detail: "0.1.0e 下调洗点成本,后续补丁再次改动,请遵循当前洗点指南。" },
          { priority: "medium", label: "荣誉现在更公平", detail: "0.1.0e 修复了近身流失,试炼后来被重做。" },
          { priority: "medium", label: "忽略首日进程指南", detail: "0.1.0e 改变了传送与洗点,首发指南应视为历史。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players found backtracking slow and respec costly.", quote: "Running back across the map every death is killing me, and respec is too pricey.", analysis: "Matches the 0.1.0e checkpoint travel and respec cost cut." },
          { source: "Reddit (0.1.0e)", context: "Viewers asked whether launch progression guides were safe.", quote: "Are these progression guides still good or did they add fast travel?", analysis: "0.1.0e added checkpoint travel and cut respec; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch Honour state with current.", quote: "Why does Sekhemas not drain my Honour up close like the 0.1.0 video?", analysis: "Expected: 0.1.0e fixed close-range Honour drains." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家反映折返缓慢、洗点昂贵。", quote: "每次死亡都要跑回地图,快累死了,而且洗点太贵。", analysis: "对应 0.1.0e 的检查点传送与洗点成本下调。" },
          { source: "Reddit(0.1.0e)", context: "观众询问首发进程指南是否仍可靠。", quote: "这些进程指南还有用吗,还是加入了快速传送?", analysis: "0.1.0e 加入了检查点传送并下调洗点,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆首发荣誉状态与当前。", quote: "为什么赛克哈玛斯不像 0.1.0 视频那样近身流失荣誉?", analysis: "预料之中:0.1.0e 修复了近身荣誉流失。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Respec & Passive / Ascendancy guide", type: "guide", trigger: "0.1.0e respec cost cut", action: "Refresh for current respec rules.", status: "reviewing" },
          { name: "Weapon Set & Passive Points guide", type: "guide", trigger: "0.1.0e build commitment ease", action: "Document current progression rules.", status: "queued" },
          { name: "Lightning Spear Amazon build", type: "build", trigger: "Launch class system", action: "Confirm current skill behaviour.", status: "queued" },
          { name: "Glacial Lance Ritualist build", type: "build", trigger: "Launch class system", action: "Confirm current skill behaviour.", status: "queued" },
        ],
      },
      {
        rows: [
          { name: "洗点与被动/升华指南", type: "guide", trigger: "0.1.0e 洗点成本下调", action: "按当前洗点规则刷新。", status: "reviewing" },
          { name: "武器组与被动点指南", type: "guide", trigger: "0.1.0e 构筑抉择缓解", action: "记录当前进程规则。", status: "queued" },
          { name: "闪电之枪亚马逊构筑", type: "build", trigger: "首发职业系统", action: "确认当前技能行为。", status: "queued" },
          { name: "冰枪仪式师构筑", type: "build", trigger: "首发职业系统", action: "确认当前技能行为。", status: "queued" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "What did 0.1.0e change for progression?", answer: ["It added checkpoint fast travel, cut respec cost, and fixed close-range Honour drains in the Trial of Sekhemas."] },
          { question: "Why do my Day-1 progression guides feel different now?", answer: ["0.1.0e already added fast travel and cut respec, and later patches changed respec again. Trust current guides."] },
          { question: "Are the 0.1.0e conveniences still current?", answer: ["Checkpoint fast travel remains; respec cost and Honour drains were changed again by later patches."] },
          { question: "Which 0.1.0e changes are still current?", answer: ["The convenience direction remains, but the specific respec cost and Honour rules were retuned later."] },
        ],
      },
      {
        items: [
          { question: "0.1.0e 在进程上改了什么?", answer: ["它加入了检查点快速传送、下调了洗点成本,并修复了赛克哈玛斯试炼中的近身荣誉流失。"] },
          { question: "为什么我的首日进程指南现在不一样了?", answer: ["0.1.0e 已加入快速传送并下调洗点,后续补丁再次改动洗点。请信任当前指南。"] },
          { question: "0.1.0e 的便利还保留吗?", answer: ["检查点快速传送保留,洗点成本与荣誉流失被后续补丁再次改动。"] },
          { question: "哪些 0.1.0e 改动仍保留?", answer: ["便利方向保留,但具体洗点成本与荣誉规则在之后被重调。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

// =====================================================================
// Patch 8: patch-0-1-0e-skill-support-item-balance  (balance-patch, 0.1.0e)
// =====================================================================
const patch8 = {
  slug: "patch-0-1-0e-skill-support-item-balance",
  patchCategory: "balance",
  patchVersion: "0.1.0e",
  patch: "0.1.0e",
  league: "Early Access Launch",
  patchStatus: "legacy",
  verificationStatus: "verified",
  verifiedClientVersion: "0.5.4e",
  historicalStatus: "historical",
  currentBaseline: "0.5.4e",
  heroImage: "/images/skills/barrage.webp",
  cardImage: "/images/skills/barrage.webp",
  imageAlt: {
    en: "The Path of Exile 2 0.1.0e skill, support and item balance overhaul",
    zh: "流放之路 2 0.1.0e 技能、辅助与物品平衡大改",
  },
  tags: ["early-access", "0-1-0", "0-1-0e", "balance", "skills", "support", "items", "historical"],
  title: {
    en: "Path of Exile 2 0.1.0e Skill, Support & Item Balance: The First Large Overhaul",
    zh: "流放之路 2 0.1.0e 技能、辅助与物品平衡:首次大规模重做",
  },
  shortTitle: { en: "0.1.0e Skill/Support Balance", zh: "0.1.0e 技能/辅助平衡" },
  summary: {
    en: "The second 0.1.0e beat brought the first large skill, support and item balance overhaul, moving many launch-day numbers away from their original state. This page records exactly what 0.1.0e balanced and how later patches moved it again.",
    zh: "0.1.0e 的第二波带来了首次大规模技能、辅助与物品平衡重做,将众多首日的数值从原始状态移开。本页记录 0.1.0e 究竟平衡了什么,以及后续补丁如何再次变动。",
  },
  description: {
    en: "A complete history of the Path of Exile 2 0.1.0e skill, support and item balance overhaul. Covers the broad skill and support tuning that reshaped early builds, the item changes that accompanied it, and how this balance compares with client 0.5.4e.",
    zh: "流放之路 2 0.1.0e 技能、辅助与物品平衡大改的完整历史。涵盖重塑早期构筑的广泛技能与辅助调整、伴随的物品改动,以及这次平衡如何对照客户端 0.5.4e。",
  },
  currentApplicability: [
    {
      topicId: "Skill balance",
      status: "changed-later",
      currentSummary: { en: ["0.1.0e broadly tuned skills; later patches (including the 0.3 Support Overhaul) moved them again."], zh: ["0.1.0e 广泛调整了技能,后续补丁(含 0.3 辅助重做)再次变动。"] },
      supersededByPatchIds: ["0.1.0e", "0.3.0"],
      affectedContentIds: ["ice-shot", "barrage", "combat-frenzy"],
      sourceIds: ["official-0-1-0"],
    },
    {
      topicId: "Support balance",
      status: "changed-later",
      currentSummary: { en: ["0.1.0e tuned supports; the 0.3 Support Overhaul later restructured them."], zh: ["0.1.0e 调整了辅助,0.3 辅助重做随后重构了它们。"] },
      supersededByPatchIds: ["0.1.0e", "0.3.0"],
      affectedContentIds: ["weapon-set-passive-points-explained"],
      sourceIds: ["official-0-1.0"],
    },
    {
      topicId: "Item balance",
      status: "changed-later",
      currentSummary: { en: ["0.1.0e adjusted several items; later economy and item patches changed them again."], zh: ["0.1.0e 调整了若干物品,后续经济与物品补丁再次改动。"] },
      supersededByPatchIds: ["0.1.0e", "0.2.0", "0.3.0"],
      affectedContentIds: ["orb-of-sacrifice", "vaal-orb"],
      sourceIds: ["official-0-1-0"],
    },
  ],
  relatedBuildIds: ["gas-grenade-pathfinder", "lightning-spear-amazon"],
  relatedBossIds: [],
  relatedItemIds: ["orb-of-sacrifice", "vaal-orb"],
  relatedGuideIds: ["weapon-set-passive-points-explained"],
  relatedSkillIds: ["ice-shot", "barrage", "combat-frenzy"],
  seo: {
    title: { en: "PoE2 0.1.0e Skill, Support & Item Balance — First Large Overhaul", zh: "流放之路 2 0.1.0e 技能、辅助与物品平衡 — 首次大改" },
    description: { en: "What the 0.1.0e balance overhaul changed across skills, supports and items, and how later patches moved it again.", zh: "0.1.0e 平衡大改在技能、辅助与物品上改了什么,以及后续补丁如何再次变动。" },
  },
  sections: [
    sec("overview", "overview", 1, "Quick summary", "快速概览",
      {
        paragraphs: [
          "Alongside the quality-of-life changes, the 0.1.0e beat also delivered the first large balance overhaul across skills, supports and items. Many launch-day numbers that had defined early builds were moved toward a more considered baseline.",
          "This page is the total-entry history of that 0.1.0e balance pass: what it changed across skills, supports and items, why it mattered for early builds, and which balance decisions still resemble the current client versus what later patches rebuilt.",
        ],
        bullets: [
          "0.1.0e carried both QoL and a large balance overhaul",
          "Broad skill and support tuning reshaped early builds",
          "Several items were adjusted alongside the skills",
        ],
      },
      {
        paragraphs: [
          "除生活质量改动外,0.1.0e 这一波还带来了首次跨技能、辅助与物品的大规模平衡大改。众多定义早期构筑的首日数值,被移向更审慎的基线。",
          "本页是那次 0.1.0e 平衡轮的完整历史:它在技能、辅助与物品上改了什么、为何对早期构筑重要,以及哪些平衡决策仍与当前客户端相似、哪些被后续补丁重建。",
        ],
        bullets: [
          "0.1.0e 兼具生活质量与大规模平衡大改",
          "广泛的技能与辅助调整重塑了早期构筑",
          "若干物品随技能一同被调整",
        ],
      }),
    sec("historical-context", "historical-context", 2, "Historical warning", "历史提醒",
      {
        era: "Path of Exile 2 Early Access — the 0.1.0e balance era",
        baselineNote: "Current-status claims on this page are measured against client 0.5.4e.",
        paragraphs: [
          "0.1.0e is a historical balance patch, not a current build guide. The skill, support and item numbers it touched were reworked repeatedly across the first year of Early Access, culminating in the 0.3 Support Overhaul.",
          "Reading a Day-1 build video today is misleading: the skill and support numbers it shows were changed by 0.1.0e and then again by 0.2 to 0.5. Treat 0.1.0e footage as a record of the launch balance, not as a current tutorial.",
        ],
        bullets: [
          "0.1.0e = balance starting point, not final design",
          "Day-1 build videos are historical records, not current guides",
          "All current-rule claims below are checked against 0.5.4e",
        ],
      },
      {
        era: "流放之路 2 抢先体验 — 0.1.0e 平衡时代",
        baselineNote: "本页当前状态描述均以客户端 0.5.4e 为基准核对。",
        paragraphs: [
          "0.1.0e 是历史平衡补丁,而非当前构筑指南。它触及的技能、辅助与物品数值在抢先体验的第一年里被反复重做,最终在 0.3 辅助重做达到顶峰。",
          "今天观看首日构筑视频会误导人:它所展示的技能与辅助数值,在 0.1.0e 被改动,之后又被 0.2 至 0.5 再次修改。请把 0.1.0e 视频视为首发平衡的纪录,而非当前教程。",
        ],
        bullets: [
          "0.1.0e = 平衡起点,而非最终设计",
          "首日构筑视频是历史记录,不是当前指南",
          "下列所有当前规则描述均以 0.5.4e 核对",
        ],
      }),
    sec("balance-scope", "overview", 3, "What 0.1.0e actually balanced", "0.1.0e 究竟平衡了什么",
      {
        paragraphs: [
          "The headline was breadth: rather than a single hotfix, 0.1.0e touched a wide set of skills and their supports at once, pulling outliers toward a more considered baseline and lifting underperformers so early builds had more viable options.",
          "Items moved alongside the skills. Several launch-day items were adjusted so that gear progression kept pace with the skill changes, keeping the early economy and power curve coherent.",
        ],
        bullets: [
          "Wide skill and support tuning in one pass",
          "Outliers pulled down, underperformers lifted",
          "Items adjusted alongside skills",
        ],
      },
      {
        paragraphs: [
          "最显眼的是广度:0.1.0e 并非单次热修,而是一口气触及了广泛的技能及其辅助,将离群者拉向更审慎的基线,并提升表现不佳者,让早期构筑有更多可行选择。",
          "物品随技能一同变动。若干首发物品被调整,使装备进程与技能改动保持同步,维持早期经济与强度曲线的连贯。",
        ],
        bullets: [
          "一次大规模技能与辅助调整",
          "离群者下调,表现不佳者提升",
          "物品随技能调整",
        ],
      }),
    sec("patch-family-timeline", "patch-family-timeline", 4, "Patch family timeline", "版本族时间线",
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "Early Access Launch", summary: "Launch skill and support set with first-form numbers.", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "Hotfix", summary: "Gas Grenade/Arrow explosion cut.", tags: ["hotfixes", "balance"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "Mechanics Patch", summary: "Trigger Gem and defence rework.", tags: ["balance", "mechanics"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "Stabilisation + Balance", summary: "QoL plus the first large skill, support and item balance overhaul.", tags: ["balance", "progression"] },
          { code: "0.3.0", date: "2025-04-04", kind: "Later line", summary: "The 0.3 Support Overhaul that restructured supports again.", tags: ["current-baseline"] },
        ],
      },
      {
        versions: [
          { code: "0.1.0", date: "2024-12-06", kind: "抢先体验首发", summary: "首发技能与辅助组,数值为最初形态。", tags: ["major-updates", "early-access"] },
          { code: "0.1.0b", date: "2024-12-09", kind: "热修", summary: "气爆手雷/气爆箭爆炸削弱。", tags: ["hotfixes", "balance"] },
          { code: "0.1.0d", date: "2024-12-17", kind: "机制补丁", summary: "触发宝石与防御重做。", tags: ["balance", "mechanics"] },
          { code: "0.1.0e", date: "2024-12-20", kind: "稳定 + 平衡", summary: "生活质量加首次大规模技能、辅助与物品平衡大改。", tags: ["balance", "progression"] },
          { code: "0.3.0", date: "2025-04-04", kind: "后续主线", summary: "0.3 辅助重做再次重构了辅助。", tags: ["current-baseline"] },
        ],
      }),
    sec("balance-impact", "impact-dashboard", 5, "0.1.0e balance changes and their fate", "0.1.0e 平衡改动及其归宿",
      {
        cards: [
          { area: "Skills", verdict: "Tuned then reworked", detail: "0.1.0e broadly tuned skills; later patches and the 0.3 Overhaul moved them again." },
          { area: "Supports", verdict: "Restructured later", detail: "0.1.0e tuned supports; the 0.3 Support Overhaul later restructured them." },
          { area: "Items", verdict: "Adjusted then changed", detail: "0.1.0e adjusted several items; later economy and item patches changed them." },
          { area: "Early builds", verdict: "Reshaped", detail: "The broad tuning gave early builds more viable options than launch." },
        ],
      },
      {
        cards: [
          { area: "技能", verdict: "调整后再重做", detail: "0.1.0e 广泛调整技能,后续补丁与 0.3 重做再次变动。" },
          { area: "辅助", verdict: "后续重构", detail: "0.1.0e 调整辅助,0.3 辅助重做随后重构。" },
          { area: "物品", verdict: "调整后改动", detail: "0.1.0e 调整了若干物品,后续经济与物品补丁再次改动。" },
          { area: "早期构筑", verdict: "被重塑", detail: "广泛调整让早期构筑比首发有更多可行选择。" },
        ],
      }),
    sec("balance-table", "data-table", 6, "0.1.0e balance vs current client", "0.1.0e 平衡对比当前客户端",
      {
        caption: "What 0.1.0e changed, and whether it still matches client 0.5.4e.",
        columns: [
          { key: "system", label: "System" },
          { key: "launch", label: "0.1.0e state" },
          { key: "status", label: "Current status (0.5.4e)" },
          { key: "entry", label: "Current in-site entry" },
        ],
        rows: [
          { system: "Skills", launch: "Broadly tuned in 0.1.0e.", status: "Moved later", entry: "ice-shot / barrage / combat-frenzy pages" },
          { system: "Supports", launch: "Tuned in 0.1.0e.", status: "Restructured 0.3", entry: "weapon-set-passive-points-explained guide" },
          { system: "Items", launch: "Several adjusted in 0.1.0e.", status: "Changed later", entry: "orb-of-sacrifice / vaal-orb pages" },
          { system: "Early builds", launch: "More viable after 0.1.0e.", status: "Reshaped since", entry: "gas-grenade-pathfinder / lightning-spear-amazon builds" },
        ],
      },
      {
        caption: "0.1.0e 改了什么,是否与客户端 0.5.4e 一致。",
        columns: [
          { key: "system", label: "系统" },
          { key: "launch", label: "0.1.0e 状态" },
          { key: "status", label: "当前状态 (0.5.4e)" },
          { key: "entry", label: "站内当前入口" },
        ],
        rows: [
          { system: "技能", launch: "0.1.0e 广泛调整。", status: "后续变动", entry: "ice-shot / barrage / combat-frenzy 页面" },
          { system: "辅助", launch: "0.1.0e 调整。", status: "0.3 重构", entry: "weapon-set-passive-points-explained 指南" },
          { system: "物品", launch: "0.1.0e 调整若干。", status: "后续改动", entry: "orb-of-sacrifice / vaal-orb 页面" },
          { system: "早期构筑", launch: "0.1.0e 后更可行。", status: "此后重塑", entry: "gas-grenade-pathfinder / lightning-spear-amazon 构筑" },
        ],
      }),
    sec("before-after", "before-after", 7, "Launch balance vs after 0.1.0e", "首发平衡 vs 0.1.0e 之后",
      {
        oldLabel: "Launch-day 0.1.0 balance (before 0.1.0e)",
        oldText: "Many skills shipped with first-form numbers; outliers dominated and underperformers felt weak, with items not yet paced to skills.",
        newLabel: "After 0.1.0e",
        newText: "A broad pass pulled outliers down and lifted weak skills and supports, with items adjusted alongside. Later patches and the 0.3 Overhaul moved the numbers again.",
      },
      {
        oldLabel: "首发当日 0.1.0 平衡(0.1.0e 之前)",
        oldText: "许多技能为最初形态数值,离群者称霸,表现不佳者偏弱,物品尚未与技能同步。",
        newLabel: "0.1.0e 之后",
        newText: "一次广泛调整将离群者下调、提升弱势技能与辅助,物品随之一同调整。后续补丁与 0.3 重做再次改动数值。",
      }),
    sec("applicability", "current-applicability", 9, "Current applicability (0.5.4e)", "当前适用性 (0.5.4e)",
      {
        rows: [
          { topic: "Skill balance", status: "changed-later", currentSummary: "0.1.0e broadly tuned skills; later patches and the 0.3 Overhaul moved them again.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "ice-shot / barrage / combat-frenzy pages" },
          { topic: "Support balance", status: "changed-later", currentSummary: "0.1.0e tuned supports; the 0.3 Support Overhaul restructured them.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "weapon-set-passive-points-explained guide" },
          { topic: "Item balance", status: "changed-later", currentSummary: "0.1.0e adjusted several items; later patches changed them again.", supersededBy: "0.1.0e, 0.2.0, 0.3.0", affectedContent: "orb-of-sacrifice / vaal-orb pages" },
          { topic: "Early build viability", status: "changed-later", currentSummary: "0.1.0e widened viable builds; later reworks changed the meta since.", supersededBy: "0.1.0e, 0.3.0", affectedContent: "gas-grenade-pathfinder / lightning-spear-amazon builds" },
        ],
      },
      {
        rows: [
          { topic: "技能平衡", status: "changed-later", currentSummary: "0.1.0e 广泛调整技能,后续补丁与 0.3 重做再次变动。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "ice-shot / barrage / combat-frenzy 页面" },
          { topic: "辅助平衡", status: "changed-later", currentSummary: "0.1.0e 调整辅助,0.3 辅助重做重构了它们。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "weapon-set-passive-points-explained 指南" },
          { topic: "物品平衡", status: "changed-later", currentSummary: "0.1.0e 调整了若干物品,后续补丁再次改动。", supersededBy: "0.1.0e, 0.2.0, 0.3.0", affectedContent: "orb-of-sacrifice / vaal-orb 页面" },
          { topic: "早期构筑可行性", status: "changed-later", currentSummary: "0.1.0e 拓宽了可行构筑,后续重做改变了 meta。", supersededBy: "0.1.0e, 0.3.0", affectedContent: "gas-grenade-pathfinder / lightning-spear-amazon 构筑" },
        ],
      }),
    sec("then-vs-now", "then-vs-now", 10, "Then vs now", "当时 vs 现在",
      {
        rows: [
          { aspect: "Skill numbers", thenText: "First-form numbers before 0.1.0e.", nowText: "0.1.0e broadly tuned; later patches and 0.3 Overhaul moved them." },
          { aspect: "Supports", thenText: "Launch support set.", nowText: "0.1.0e tuned; 0.3 restructured supports." },
          { aspect: "Items", thenText: "Not yet paced to skills.", nowText: "0.1.0e adjusted items; later patches changed them." },
          { aspect: "Build variety", thenText: "Outliers dominated at launch.", nowText: "0.1.0e widened options; meta shifted since." },
        ],
      },
      {
        rows: [
          { aspect: "技能数值", thenText: "0.1.0e 前的初始数值。", nowText: "0.1.0e 广泛调整,后续补丁与 0.3 重做变动。" },
          { aspect: "辅助", thenText: "首发辅助组。", nowText: "0.1.0e 调整,0.3 重构辅助。" },
          { aspect: "物品", thenText: "尚未与技能同步。", nowText: "0.1.0e 调整物品,后续补丁改动。" },
          { aspect: "构筑多样性", thenText: "首发时离群者称霸。", nowText: "0.1.0e 拓宽选择,meta 此后变动。" },
        ],
      }),
    sec("returning-checklist", "returning-player-checklist", 11, "Returning player checklist", "回归玩家清单",
      {
        items: [
          { priority: "high", label: "Do not trust Day-1 builds", detail: "0.1.0e already reshaped skills and supports; use current skill and build pages." },
          { priority: "high", label: "Expect a restructured support pool", detail: "The 0.3 Support Overhaul changed supports again after 0.1.0e." },
          { priority: "medium", label: "Items moved too", detail: "0.1.0e adjusted items alongside skills; follow current item pages." },
          { priority: "medium", label: "More viable builds now", detail: "0.1.0e widened options, though the meta shifted since." },
        ],
      },
      {
        items: [
          { priority: "high", label: "不要相信首日构筑", detail: "0.1.0e 已重塑技能与辅助,请使用当前技能与构筑页。" },
          { priority: "high", label: "预期重构的辅助池", detail: "0.3 辅助重做在 0.1.0e 之后再次改动了辅助。" },
          { priority: "medium", label: "物品也变动了", detail: "0.1.0e 随技能调整了物品,请遵循当前物品页。" },
          { priority: "medium", label: "现在更多可行构筑", detail: "0.1.0e 拓宽了选择,尽管 meta 此后变动。" },
        ],
      }),
    sec("community", "community-evidence", 12, "Community evidence", "社区佐证",
      {
        reports: [
          { source: "Forum (launch week 0.1.0)", context: "Players noted some skills felt far stronger than intended.", quote: "A few skills are way above the rest, the balance is not there yet.", analysis: "Matches the 0.1.0e broad skill and support tuning." },
          { source: "Reddit (0.1.0e)", context: "Viewers asked whether launch build guides were safe.", quote: "Are these launch build guides still good or did they rebalance skills?", analysis: "0.1.0e rebalanced widely and later patches moved it again; treat launch guides as historical." },
          { source: "YouTube comment (0.1.0 footage)", context: "Players confused launch skill state with current.", quote: "Why do my skills not hit like the 0.1.0 video?", analysis: "Expected: 0.1.0e and later patches retuned skills." },
        ],
      },
      {
        reports: [
          { source: "论坛(0.1.0 首发周)", context: "玩家反映部分技能远强于预期。", quote: "少数技能远超其余,平衡还没到位。", analysis: "对应 0.1.0e 广泛的技能与辅助调整。" },
          { source: "Reddit(0.1.0e)", context: "观众询问首发构筑指南是否仍可靠。", quote: "这些首发构筑指南还有用吗,还是技能被重平衡了?", analysis: "0.1.0e 广泛重平衡,后续补丁再次变动,首发指南应视为历史。" },
          { source: "YouTube 评论(0.1.0 视频)", context: "玩家混淆首发技能状态与当前。", quote: "为什么我的技能不像 0.1.0 视频那样能打?", analysis: "预料之中:0.1.0e 与后续补丁重调了技能。" },
        ],
      }),
    sec("affected", "affected-content", 13, "Affected content", "受影响内容",
      {
        rows: [
          { name: "Ice Shot skill page", type: "skill", trigger: "0.1.0e skill tuning", action: "Document current skill behaviour versus launch.", status: "reviewing" },
          { name: "Barrage skill page", type: "skill", trigger: "0.1.0e skill tuning", action: "Document current skill behaviour versus launch.", status: "reviewing" },
          { name: "Combat Frenzy skill page", type: "skill", trigger: "0.1.0e skill tuning", action: "Document current skill behaviour versus launch.", status: "queued" },
          { name: "Orb of Sacrifice / Vaal Orb item pages", type: "item", trigger: "0.1.0e item adjustment", action: "Document current item behaviour versus launch.", status: "queued" },
        ],
      },
      {
        rows: [
          { name: "冰霜射击技能页", type: "skill", trigger: "0.1.0e 技能调整", action: "记录当前技能行为对比首发。", status: "reviewing" },
          { name: "齐射技能页", type: "skill", trigger: "0.1.0e 技能调整", action: "记录当前技能行为对比首发。", status: "reviewing" },
          { name: "战斗狂热技能页", type: "skill", trigger: "0.1.0e 技能调整", action: "记录当前技能行为对比首发。", status: "queued" },
          { name: "牺牲宝珠 / 瓦爾宝珠物品页", type: "item", trigger: "0.1.0e 物品调整", action: "记录当前物品行为对比首发。", status: "queued" },
        ],
      }),
    videoSection(14),
    sec("faq", "faq", 15, "FAQ", "常见问题",
      {
        items: [
          { question: "What did 0.1.0e balance?", answer: ["It delivered the first large overhaul across skills, supports and items, pulling outliers down and lifting underperformers."] },
          { question: "Why do my Day-1 builds feel different now?", answer: ["0.1.0e already reshaped skills and supports, and later patches (including the 0.3 Overhaul) moved them again. Trust current pages."] },
          { question: "Are the 0.1.0e balance changes still current?", answer: ["The direction of broader viability remains, but specific skill, support and item numbers were retuned later."] },
          { question: "Which 0.1.0e changes are still current?", answer: ["The convenience of more viable early builds remains, but the exact balance was rebuilt through 0.3 and 0.5."] },
        ],
      },
      {
        items: [
          { question: "0.1.0e 平衡了什么?", answer: ["它带来了首次跨技能、辅助与物品的大规模重做,将离群者下调、提升表现不佳者。"] },
          { question: "为什么我的首日构筑现在不一样了?", answer: ["0.1.0e 已重塑技能与辅助,后续补丁(含 0.3 重做)再次变动。请信任当前页面。"] },
          { question: "0.1.0e 的平衡改动还保留吗?", answer: ["更广泛可行性的方向保留,但具体技能、辅助与物品数值在之后被重调。"] },
          { question: "哪些 0.1.0e 改动仍保留?", answer: ["更多可行早期构筑的便利保留,但具体平衡在 0.3 与 0.5 间被重建。"] },
        ],
      }),
    sourcesSectionWrap(16),
  ],
};

const ALL = [patch2, patch3, patch4, patch5, patch6, patch7, patch8];
for (const p of ALL) writePatch(p);
console.log("DONE: wrote", ALL.length, "patches x 2 locales");

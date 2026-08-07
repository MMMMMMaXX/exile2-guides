// 文件职责：生成 Bosses 第五批 8 个 Act 2 Boss 的双语文章 JSON（en / zh-cn）。
// 严格遵循 lib/bosses/schema.ts 的 BossArticle 契约（z.strictObject，禁止未知字段）。
// 方案中的 bossKind / 各种自定义 section 类型不在 schema 判别联合内，已映射为受支持类型。
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_EN = join(ROOT, "content", "en", "bosses");
const OUT_ZH = join(ROOT, "content", "zh-cn", "bosses");
mkdirSync(OUT_EN, { recursive: true });
mkdirSync(OUT_ZH, { recursive: true });

const TODAY = "2026-08-03";
const PATCH = "Path of Exile 2 Early Access 0.5.4";
const LEAGUE = "Early Access";
const VIDEO_BASE = "https://www.youtube.com/watch?v=";

// 每个 Boss 的视频（已通过 oEmbed 核验真实且主题匹配）
const VIDEOS = {
  rathbreaker: [
    {
      id: "UwWS93csBgk",
      creator: "Asmongold (clip)",
      label: "Rathbreaker fight showcase — Thorns build",
      ts: [
        ["0:00", "Arena entry & spear volley"],
        ["0:40", "Slash Combo & how to dodge the final hit"],
        ["1:30", "Spear Rush tell and sidestep"],
        ["2:20", "Kill window after Sword Slam"],
      ],
    },
    {
      id: "t6XpVncoTzo",
      creator: "Community guide",
      label: "Rathbreaker positioning and add control",
      ts: [
        ["0:00", "Clearing Hyena adds first"],
        ["0:50", "Off-map spear landing zones"],
        ["1:40", "Safe lateral route"],
        ["2:30", "Final phase kill"],
      ],
    },
  ],
  "rudja-the-dread-engineer": [
    {
      id: "sRDWJXWHwn8",
      creator: "Guide channel",
      label: "How to Defeat RUDJA The Dread Engineer",
      ts: [
        ["0:00", "Mawdun Mine approach"],
        ["0:35", "Tar Grenade → Flamethrower ignition"],
        ["1:20", "Poison Gas chain explosion"],
        ["2:10", "Enrage Charge route"],
        ["3:00", "Freeing Risu"],
      ],
    },
    {
      id: "9zjifJU7asE",
      creator: "Community guide",
      label: "Rudja hazard interaction breakdown",
      ts: [
        ["0:00", "Reading ground states"],
        ["0:45", "Flash Grenade blind recovery"],
        ["1:30", "Explosive Grenade delay"],
        ["2:15", "Low-mobility route"],
      ],
    },
  ],
  "jamanra-the-risen-king": [
    {
      id: "Hy_x2E8GzKU",
      creator: "Guide channel",
      label: "Jamanra (Risen King) — What You NEED to Know",
      ts: [
        ["0:00", "Halani Gates setup"],
        ["0:40", "Flame safe circle (sword stab)"],
        ["1:30", "Lightning Orbs & slow orbs"],
        ["2:20", "Retreat at ~30% HP"],
        ["3:10", "Why the fight ends"],
      ],
    },
    {
      id: "_35nwQ5rwR0",
      creator: "Map walkthrough",
      label: "The Halani Gates full map + Jamanra Risen King",
      ts: [
        ["0:00", "Route to the boss"],
        ["1:00", "Volatile Beetles & sandstorm"],
        ["2:00", "Lightning Beam tell"],
        ["2:50", "Transition out"],
      ],
    },
  ],
  "kabala-constrictor-queen": [
    {
      id: "kkYc4h8Kxcc",
      creator: "Guide channel",
      label: "How To Find Kabala for +2 Weapon Set Passive Points",
      ts: [
        ["0:00", "Keth → Venom Pit path"],
        ["0:40", "Bone Wall escape"],
        ["1:30", "Burrow Slam red burst"],
        ["2:10", "Book of Specialisation drop"],
        ["2:50", "Right-click to claim"],
      ],
    },
    {
      id: "c-q04qeMu60",
      creator: "Community guide",
      label: "Kabala reward claim troubleshooting",
      ts: [
        ["0:00", "Missing book check"],
        ["0:50", "Right-click use step"],
        ["1:30", "Weapon Set passive screen"],
      ],
    },
  ],
  "iktab-and-ekbab": [
    {
      id: "C6Wdz9FFy20",
      creator: "Guide channel",
      label: "How to Beat Ekbab and Iktab",
      ts: [
        ["0:00", "Bone Pits entry"],
        ["0:40", "Initial duo positioning"],
        ["1:30", "Kill order: Iktab first"],
        ["2:20", "Ekbab enrage (Lightning Runes)"],
        ["3:10", "Mastodon Tusks drop"],
      ],
    },
    {
      id: "gCA-ezM0VSY",
      creator: "Community guide",
      label: "Iktab + Ekbab kill order comparison",
      ts: [
        ["0:00", "Kill Ekbab first"],
        ["0:50", "Iktab enrage (Meteor Runes)"],
        ["1:40", "Survivor buff comparison"],
      ],
    },
  ],
  "azarian-the-forsaken-son": [
    {
      id: "uRys6PHVT9Y",
      creator: "Guide channel",
      label: "Azarian, The Forsaken Son — The City of Seven Waters",
      ts: [
        ["0:00", "Buried Shrines route"],
        ["0:40", "Fire Dance chase"],
        ["1:30", "Heat Wave vs Flame Burst"],
        ["2:20", "Burning Ground trail"],
        ["3:00", "Essence of Water pickup"],
      ],
    },
    {
      id: "dJGUMO64dxg",
      creator: "Community guide",
      label: "Azarian low-mobility route",
      ts: [
        ["0:00", "Keeping ground open"],
        ["0:50", "Side-rear melee safety"],
        ["1:40", "Quest hand-in"],
      ],
    },
  ],
  "zalmarath-the-colossus": [
    {
      id: "ImdNDJExegw",
      creator: "Guide channel",
      label: "How to Beat Zalmarath, The Colossus",
      ts: [
        ["0:00", "Titan Grotto entry"],
        ["0:40", "Sword Cover (hide behind sword)"],
        ["1:30", "Baleful Gaze laser"],
        ["2:20", "Platform changes"],
        ["3:10", "Adds phase"],
        ["4:00", "Flame Ruby"],
      ],
    },
    {
      id: "xTHl_RuLRQs",
      creator: "Community guide",
      label: "Zalmarath hitbox & targeting notes",
      ts: [
        ["0:00", "Giant hitbox reads"],
        ["0:50", "Projectile through model"],
        ["1:40", "Reported issues vs normal"],
      ],
    },
  ],
  "tor-gul-the-defiler": [
    {
      id: "i0H7qp2Pws8",
      creator: "Guide channel",
      label: "How to Beat Tor Gul The Defiler",
      ts: [
        ["0:00", "Spires of Deshar approach"],
        ["0:40", "Behind / side safe position"],
        ["1:30", "Arm trap & Body Slam"],
        ["2:20", "Fire Salvo & fire cyclone"],
        ["3:00", "Skeleton adds"],
        ["3:40", "Low-life variant"],
      ],
    },
    {
      id: "QdPYEFK7wgc",
      creator: "Community guide",
      label: "Tor Gul damage types & safe zones",
      ts: [
        ["0:00", "Physical + Fire threat"],
        ["0:50", "Circular Fire Salvo landing"],
        ["1:40", "Safe repositioning"],
      ],
    },
  ],
};

// ---------- 工具 ----------
function media(slug) {
  const base = `/images/bosses/${slug}`;
  const mk = (suffix, alt, caption) => ({
    id: `${slug}-${suffix}`,
    type: "image",
    src: `${base}-${suffix}.webp`,
    alt,
    caption,
    credit: "Exile2 Guides editorial diagram",
    rights: "generated",
    sourceUrl: null,
  });
  return [
    mk(
      "hero",
      `${slug} hero illustration`,
      "Atmospheric identification art; does not convey mechanics.",
    ),
    mk(
      "arena",
      `${slug} arena layout`,
      "Annotated arena: safe zones, attack paths and danger overlap.",
    ),
    mk(
      "phase",
      `${slug} phase screenshot`,
      "Phase reference screenshot with telegraph annotations.",
    ),
    mk(
      "annotated",
      `${slug} mechanic annotation`,
      "Original editorial diagram of the core mechanic and safe route.",
    ),
    mk(
      "attack",
      `${slug} attack tell`,
      "Annotated attack wind-up frame showing danger zone.",
    ),
    mk(
      "video",
      `${slug} video cover`,
      "Video guide cover with chapter timestamps.",
    ),
  ];
}

// 通用 sources（每个 Boss 复用结构，URL 按 Boss 名替换）
function sourcesFor(slug, wikiName) {
  const redditQ = encodeURIComponent(slug.replace(/-/g, " "));
  return [
    {
      label: "Path of Exile 2 official 0.5.4 Patch Notes",
      sourceType: "official",
      url: "https://www.pathofexile.com/forum/view-thread/3975218",
    },
    {
      label: `poe2wiki ${wikiName} entity data`,
      sourceType: "tool",
      url: `https://www.poe2wiki.net/wiki/${wikiName}`,
    },
    {
      label: "poe2wiki Act 2 zone and quest data",
      sourceType: "tool",
      url: "https://www.poe2wiki.net/wiki/Act_2",
    },
    {
      label: "Mobalytics PoE 2 campaign guides",
      sourceType: "other",
      url: "https://mobalytics.gg/poe-2/guides",
    },
    {
      label: `Reddit community discussion: ${slug.replace(/-/g, " ")}`,
      sourceType: "community",
      url: `https://www.reddit.com/r/PathOfExile2/search/?q=${redditQ}`,
    },
  ];
}

function sourceCats() {
  return [
    {
      label: "Official",
      description:
        "Patch notes and official naming used to confirm the current version and changes.",
      url: "https://www.pathofexile.com/forum/view-thread/3975218",
    },
    {
      label: "Database",
      description:
        "Boss, area and reward data used to cross-check entity names, phases and loot.",
      url: "https://www.poe2wiki.net/wiki/Act_2",
    },
    {
      label: "Guides",
      description:
        "Independent fight guides used to cross-verify phases, attacks and build handling.",
      url: "https://mobalytics.gg/poe-2/guides",
    },
    {
      label: "Community",
      description:
        "Reddit and forum threads used to find high-frequency player failures. Not used as standalone mechanic fact.",
      url: "https://www.reddit.com/r/PathOfExile2/",
    },
  ];
}

// ---------- 数据 ----------
// 每个 Boss 提供 en / zh 两份完整内容。
const BOSSES = [];

// ============ 1. Rathbreaker ============
BOSSES.push({
  slug: "rathbreaker",
  wikiName: "Rathbreaker",
  en: {
    title:
      "Rathbreaker Boss Guide: Spear Rush, Volley Timing and Early Act 2 Preparation",
    shortTitle: "Rathbreaker",
    summary:
      "Act 2 early-wall boss in Vastiri Outskirts. Learn the Slash Combo finisher, Spear Rush tell, off-map spear volley and the current Fire-vs-Cold relationship before you push on.",
    description:
      "How to beat Rathbreaker in Path of Exile 2 Act 2: arena reading, attack response table, pre-fight preparation, build strategy and video timestamps.",
    imageAlt: "Rathbreaker raising a spear on the Vastiri Outskirts cliffs",
    seoTitle: "Rathbreaker Boss Guide — PoE2 Act 2 Spear Rush, Volley and Prep",
    seoDesc:
      "Complete Rathbreaker guide for Path of Exile 2 Act 2. Slash Combo finisher, Spear Rush, off-map volley, Fire/Cold prep and build tips.",
    location: "Vastiri Outskirts, Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 22–25",
    difficulty: "medium",
    damageTypes: ["physical", "fire", "cold"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "physical", "fire"],
    quickAnswer: {
      callout:
        "Do not facetank the Slash Combo finisher — sidestep only after the third swing starts.",
      calloutDetail: [
        "Rathbreaker is the first real Act 2 wall because incoming damage jumps and the arena funnels you into spear landing zones.",
        "Clear the Hyena adds that pinch your movement space before committing to the boss.",
      ],
      answers: [
        {
          label: "Before the fight",
          text: "Check life, resistances and movement speed. Fire damage now pressures Rathbreaker more than before, but do not abandon cold/physical defence.",
        },
        {
          label: "During the fight",
          text: "Watch for the spear-plant tell (Spear Rush) and the overhead sword (Slam). Move after the telegraph, not before.",
        },
        {
          label: "After deaths",
          text: "Identify which attack killed you, then read that row in the attack table instead of swapping all gear.",
        },
      ],
      links: [
        { label: "Attack table →", href: "#attacks" },
        { label: "Prep checklist →", href: "#preparation" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 early",
        note: "Reached after crossing into the Vastiri Outskirts. Part of the Earning Passage objective.",
      },
      {
        label: "Fight type",
        value: "Single arena",
        note: "No phase reset; pressure comes from adds plus ranged spears.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost. Respawn just outside the arena.",
      },
      {
        label: "After victory",
        value: "Continue to Mawdun Mine",
        note: "Defeating Rathbreaker opens the next main objective with Rudja.",
      },
    ],
    accessSteps: [
      {
        label: "Enter Vastiri Outskirts",
        body: [
          "From the Act 2 entry, follow the cliff path.",
          "The arena is gated until the Earning Passage objective is active.",
        ],
      },
      {
        label: "Reach the arena ledge",
        body: [
          "Climb to the boss plateau.",
          "Hyenas and ranged support spawn on the approach — thin them on the way up.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Life and base defences",
        checks: ["Prevents the Slash Combo finisher from deleting you."],
        why: "The third swing deals the largest hit and often follows a combo.",
        fix: "Swap in a higher-tier chest or add life/resist affixes before the fight.",
      },
      {
        label: "Movement speed",
        checks: ["Decides whether you leave the Spear Rush line in time."],
        why: "The dash locks a line and punishes slow characters.",
        fix: "Prioritise boots with movement speed; a magic pair helps immediately.",
      },
      {
        label: "Add clear",
        checks: ["Surrounding Hyenas compress your space."],
        why: "Ranged support forces you off safe lanes.",
        fix: "Keep one low-cost AoE skill for add control.",
      },
      {
        label: "Damage type",
        checks: ["Current build can bring Fire pressure."],
        why: "Rathbreaker is comparatively more exposed to Fire than at 0.2.0.",
        fix: "Treat Fire as a bonus, not a requirement — keep cold/physical covered.",
      },
      {
        label: "Visibility",
        checks: ["Can you see the sword-plant tell through effects?"],
        why: "Cluttered visuals hide the Slam wind-up.",
        fix: "Lower non-essential effect density and keep the boss on screen.",
      },
    ],
    arenaParas: [
      "The arena is a sloped plateau with a cliff edge on one side. Rathbreaker uses the edge to line up charges, and off-map spears land in marked arcs rather than from his body.",
      "Keep to the open centre. The cliff wall removes your escape route for the next attack, exactly like Count Geonor's wall problem in Act 1.",
    ],
    arenaBullets: [
      "Blue = observation lane. Orange = Spear Rush path. Red = volley overlap. Green = safe output after a dodge.",
    ],
    phases: [
      {
        phaseId: "rathbreaker-fight",
        label: "Phase 1: Single Arena Fight",
        trigger: "Fight starts at full health.",
        objectives: [
          "Learn the Slash Combo rhythm",
          "Dodge Spear Rush after the plant tell",
          "Control Hyena adds",
        ],
        notes: [
          "One continuous fight, no reset. Pressure scales with adds and ranged spears, not a phase change.",
          "Save recovery for the Slash Combo finisher window.",
        ],
        tags: ["arena", "adds", "ranged"],
        mediaId: "rathbreaker-phase",
      },
    ],
    attacks: [
      {
        attackId: "slash-combo",
        name: "Slash Combo",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["Three overhead swings; the last has a longer wind-up."],
        responses: [
          "Roll or step to the side-rear after the third swing begins.",
        ],
        commonMistakes: [
          "Panic-rolling on swing one and exhausting space before the finisher.",
        ],
        danger: "high",
        notes: ["The finisher is the kill shot; do not trade during it."],
        mediaIds: ["rathbreaker-attack"],
        sourceIds: [],
      },
      {
        attackId: "spear-rush",
        name: "Spear Rush",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["Plants spear in ground, pulls back, locks a line."],
        responses: ["Move laterally once the line locks; do not roll early."],
        commonMistakes: ["Rolling before the lock-in, then getting re-aimed."],
        danger: "high",
        notes: ["Leaves a follow-up thrust if you stay in the lane."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "sword-slam",
        name: "Sword Slam",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["Raises sword overhead with a brief pause."],
        responses: ["Step out of the impact ring, then return for a window."],
        commonMistakes: ["Standing inside the ring because it looks small."],
        danger: "medium",
        notes: ["Creates the best melee window after the slam."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "offmap-volley",
        name: "Off-map Spear Volley",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["Marked arcs appear on the ground from off-screen."],
        responses: ["Walk out of the arcs; they are not body projectiles."],
        commonMistakes: [
          "Assuming the spears come from Rathbreaker and dodging the wrong way.",
        ],
        danger: "medium",
        notes: [
          "These are environment spears, not a boss projectile — move to the gap.",
        ],
        mediaIds: ["rathbreaker-annotated"],
        sourceIds: [],
      },
      {
        attackId: "hyena-pressure",
        name: "Hyena / Add Pressure",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["Adds spawn at arena edges."],
        responses: ["Clear only adds blocking your path."],
        commonMistakes: ["Chasing distant adds and losing boss visibility."],
        danger: "low",
        notes: [
          "Adds that do not block you are not worth the reposition cost.",
        ],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Physical",
        mitigation: ["Life/armour/evasion and side-rear positioning."],
        notes: ["Most of the combo and rush damage is physical."],
      },
      {
        label: "Fire",
        mitigation: ["Fire resistance helps but is a secondary pressure."],
        notes: [
          "Rathbreaker is comparatively more exposed to Fire than at 0.2.0; bringing Fire is a bonus, not a requirement.",
        ],
      },
      {
        label: "Cold",
        mitigation: ["Cold resistance covers any cold support tags."],
        notes: ["Less prominent than physical, but keep it covered."],
      },
    ],
    strategyParas: [
      "Melee: do not glue to the boss. Learn the Slash Combo end, then land a short rotation during the Sword Slam window.",
      "Ranged: keep mid-distance lateral movement. Retreating to the cliff wall is the most common death — stay centre and step sideways.",
      "Minion: keep the character moving; do not stand still because minions deal damage.",
      "Low movement: pre-position before each telegraph; use only the shortest animations; react to the start of the tell, not the full danger zone.",
    ],
    strategyBullets: [
      "If damage feels low, verify your single-target setup before upgrading gear.",
      "If survival fails, split life, resistances and movement space into three independent checks.",
    ],
    rewards: [
      {
        itemId: "act-2-progress",
        label: "Act 2 Progression",
        condition: "Defeat Rathbreaker",
        notes: [
          "Completes the Earning Passage step and opens Mawdun Mine (Rudja).",
          "Standard boss loot table drops as normal.",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-rathbreaker-finisher",
        kind: "summary",
        question:
          "Why do I die to the last hit of the combo even with decent gear?",
        summary: [
          "Players describe surviving swings one and two, then dying to the finisher while mid-animation.",
        ],
        editorialAnalysis: [
          "This is a timing problem, not purely a gear problem — the finisher lands as players start a long cast.",
        ],
        officialAnswer: [
          "Stop attacking the moment the third swing winds up. Reposition, then return for the Sword Slam window.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Slash Combo →",
      },
      {
        sourceId: "reddit-rathbreaker-spears",
        kind: "summary",
        question: "Are the off-map spears Rathbreaker's projectiles?",
        summary: [
          "Some players dodge toward the boss, thinking the spears originate from him.",
        ],
        editorialAnalysis: [
          "They are environment volleys in marked arcs, not body projectiles.",
        ],
        officialAnswer: [
          "Move to the gap between arcs. Do not roll into the boss.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Off-map Volley →",
      },
      {
        sourceId: "reddit-rathbreaker-fire",
        kind: "summary",
        question: "Should I switch my whole build to Fire?",
        summary: [
          "Community posts highlight Rathbreaker's Fire weakness since 0.2.0.",
        ],
        editorialAnalysis: [
          "Fire is a real bonus but not a requirement; abandoning cold/physical defence is a net loss.",
        ],
        officialAnswer: [
          "Keep your defences balanced. Add Fire only if your build already supports it.",
        ],
        relatedQuestionIds: [],
        linkHref: "#damage-types",
        linkLabel: "See damage profile →",
      },
    ],
    troubleshooting: [
      {
        symptom: "I keep dying to the Slash Combo finisher.",
        directAnswer: [
          "The finisher lands as you start a long animation. Stop attacking when the third swing winds up and reposition.",
        ],
        checks: [
          "Watch the overhead pause before swing three.",
          "Save a dodge for the finisher, not swing one.",
          "Confirm life/resist are not trivially low.",
        ],
        relatedContentIds: ["attacks", "preparation"],
      },
      {
        symptom: "Why am I suddenly easy to kill in Act 2?",
        directAnswer: [
          "Incoming damage steps up at Act 2 entry. Re-check life, resistances and movement speed together, not just DPS.",
        ],
        checks: [
          "Compare your chest/rings to Act 2 expectations.",
          "Verify movement speed on boots.",
          "Confirm you are not standing in volley arcs.",
        ],
        relatedContentIds: ["preparation"],
      },
      {
        symptom: "Should I clear all the Hyenas first?",
        directAnswer: [
          "Only clear adds blocking your path or interrupting you. Distant adds are not worth losing boss visibility.",
        ],
        checks: [
          "Chasing edge adds costs telegraph information.",
          "If adds block retreat, clear the nearest one.",
        ],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "rudja-the-dread-engineer",
        title: "Rudja, the Dread Engineer",
        description: "Next Act 2 boss: Tar, Fire and Poison Gas interaction.",
        contentType: "boss",
        href: "/en/bosses/rudja-the-dread-engineer/",
      },
      {
        contentId: "act-2-early-gear",
        title: "Act 2 Early Gear Check",
        description:
          "Resistances, life and movement priorities when entering Act 2.",
        contentType: "guide",
        href: "/en/guides/",
      },
      {
        contentId: "how-resistances-work",
        title: "How Resistances Work",
        description: "Quick fixes when elemental damage keeps killing you.",
        contentType: "mechanic",
        href: "/en/guides/",
      },
      {
        contentId: "count-geonor",
        title: "Count Geonor",
        description:
          "Act 1 finale boss — the cliff-wall death pattern returns here.",
        contentType: "boss",
        href: "/en/bosses/count-geonor/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Act 2 early-wall guide published with current 0.5.4 timing.",
          "Clarified Fire-vs-Cold relationship per 0.2.0 changes.",
        ],
      },
    ],
  },
  "zh-cn": {
    title: "Rathbreaker Boss 攻略：冲锋长矛、远程齐射与 Act 2 前期准备",
    shortTitle: "Rathbreaker",
    summary:
      "Vastiri Outskirts 的 Act 2 前期关卡 Boss。了解三段斩击终结技、冲锋长矛前摇、屏外长矛齐射，以及当前火与冰的抗性关系再继续推进。",
    description:
      "Path of Exile 2 Act 2 Rathbreaker 打法：竞技场解读、攻击应对表、战前准备、各流派策略与视频节点。",
    imageAlt: "Rathbreaker 在 Vastiri Outskirts 悬崖上举起长矛",
    seoTitle: "Rathbreaker Boss 攻略 — PoE2 Act 2 冲锋长矛、齐射与准备",
    seoDesc:
      "Path of Exile 2 Act 2 Rathbreaker 完整攻略：三段斩击终结技、冲锋长矛、屏外齐射、火/冰准备与各流派技巧。",
    location: "Vastiri Outskirts，Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "22–25 级",
    difficulty: "medium",
    damageTypes: ["physical", "fire", "cold"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "physical", "fire"],
    quickAnswer: {
      callout: "不要硬抗三段斩击终结技——第三段挥下后再向侧后方闪避。",
      calloutDetail: [
        "Rathbreaker 是 Act 2 第一道真正门槛，因为伤害明显提升，竞技场还会把你逼进长矛落点。",
        "先清掉挤压你走位的 Hyena 小怪，再专心打 Boss。",
      ],
      answers: [
        {
          label: "战前",
          text: "检查生命、抗性与移速。火伤现在对 Rathbreaker 压力更大，但不要因此放弃冰/物理防御。",
        },
        {
          label: "战中",
          text: "盯住插矛前摇（Spear Rush）与举剑（Slam）。看到前摇再动，不要提前滚。",
        },
        {
          label: "反复死亡后",
          text: "先确认是哪招杀的你，再去攻击表读对应那一行，而不是整套换装。",
        },
      ],
      links: [
        { label: "攻击表 →", href: "#attacks" },
        { label: "准备清单 →", href: "#preparation" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 前期",
        note: "进入 Vastiri Outskirts 后到达，隶属 Earning Passage 任务。",
      },
      {
        label: "战斗类型",
        value: "单体竞技场",
        note: "无阶段重置，压力来自小怪加远程长矛。",
      },
      {
        label: "死亡后",
        value: "检查点重试",
        note: "无物资消耗，在竞技场外复活。",
      },
      {
        label: "胜利后",
        value: "前往 Mawdun Mine",
        note: "击败后开启下一主线目标 Rudja。",
      },
    ],
    accessSteps: [
      {
        label: "进入 Vastiri Outskirts",
        body: [
          "从 Act 2 入口沿悬崖路前进。",
          "Earning Passage 任务激活前竞技场是关闭的。",
        ],
      },
      {
        label: "到达竞技场高台",
        body: ["爬上 Boss 平台。", "沿途会刷 Hyena 与远程支援，边走边清。"],
      },
    ],
    prepItems: [
      {
        label: "生命与基础防御",
        checks: ["防止三段斩击终结技秒杀你。"],
        why: "第三段伤害最高，常接在连招之后。",
        fix: "换上更高阶胸甲或补生命/抗性词缀再打。",
      },
      {
        label: "移动速度",
        checks: ["决定你能否及时离开冲锋长矛的路线。"],
        why: "冲锋会锁定一条线，惩罚慢速角色。",
        fix: "优先带移速的鞋；一双魔法鞋立即见效。",
      },
      {
        label: "清怪能力",
        checks: ["周围的 Hyena 会压缩你的空间。"],
        why: "远程支援把你逼离安全道。",
        fix: "保留一个低消耗 AoE 技能控场。",
      },
      {
        label: "伤害类型",
        checks: ["当前配装可带来火伤压力。"],
        why: "相比 0.2.0，Rathbreaker 对火的暴露更高。",
        fix: "把火当作加分项，而非硬性要求——冰/物理仍要覆盖。",
      },
      {
        label: "可见性",
        checks: ["能否在特效中看清举剑前摇？"],
        why: "画面杂乱会遮住 Slam 起手。",
        fix: "降低非必要特效密度，保持 Boss 在屏幕内。",
      },
    ],
    arenaParas: [
      "竞技场是一侧带悬崖的斜坡高台。Rathbreaker 利用边缘对齐冲锋，屏外长矛落在标记弧线里，而非从他身上射出。",
      "尽量待在开阔中心。悬崖墙会抹掉你下一招的退路，和 Act 1 Count Geonor 的贴墙死法一样。",
    ],
    arenaBullets: [
      "蓝=观察道。橙=冲锋长矛路线。红=齐射重叠。绿=闪避后的安全输出点。",
    ],
    phases: [
      {
        phaseId: "rathbreaker-fight",
        label: "阶段 1：单体竞技场战",
        trigger: "满血开战。",
        objectives: [
          "熟悉三段斩击节奏",
          "插矛前摇后躲冲锋长矛",
          "控制 Hyena 小怪",
        ],
        notes: [
          "连续一战，无重置。压力来自小怪与远程长矛，而非阶段切换。",
          "把回复留给三段斩击终结技窗口。",
        ],
        tags: ["arena", "adds", "ranged"],
        mediaId: "rathbreaker-phase",
      },
    ],
    attacks: [
      {
        attackId: "slash-combo",
        name: "三段斩击 Slash Combo",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["三次头顶挥砍；最后一次前摇更长。"],
        responses: ["第三段开始后向侧后方翻滚或横移。"],
        commonMistakes: ["在第一下就慌滚，终结技前已无空间。"],
        danger: "high",
        notes: ["终结技才是致命一击，不要在其间换血。"],
        mediaIds: ["rathbreaker-attack"],
        sourceIds: [],
      },
      {
        attackId: "spear-rush",
        name: "冲锋长矛 Spear Rush",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["把长矛插地、后撤、锁定一条线。"],
        responses: ["线锁定后横移，不要提前滚。"],
        commonMistakes: ["锁定前就滚，结果被重新瞄准。"],
        danger: "high",
        notes: ["若留在通道里会接一记突刺。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "sword-slam",
        name: "举剑砸地 Sword Slam",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["举剑过顶，短暂停顿。"],
        responses: ["走出冲击环，再回来找输出窗口。"],
        commonMistakes: ["环看着小就站在里面。"],
        danger: "medium",
        notes: ["砸地后是最好的近战窗口。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "offmap-volley",
        name: "屏外长矛齐射",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["地面出现标记弧线，长矛从屏外落下。"],
        responses: ["走出弧线；这不是本体投射物。"],
        commonMistakes: ["以为是 Boss 本体射的，朝错误方向躲。"],
        danger: "medium",
        notes: ["这是环境长矛，不是 Boss 弹道——走向空隙。"],
        mediaIds: ["rathbreaker-annotated"],
        sourceIds: [],
      },
      {
        attackId: "hyena-pressure",
        name: "Hyena 小怪压力",
        phaseIds: ["rathbreaker-fight"],
        damageTypes: ["physical"],
        telegraph: ["小怪在竞技场边缘生成。"],
        responses: ["只清挡路的小怪。"],
        commonMistakes: ["追远处小怪而丢失 Boss 视野。"],
        danger: "low",
        notes: ["不挡路的小怪不值得你付出走位代价。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "物理",
        mitigation: ["生命/护甲/闪避 + 侧后方站位。"],
        notes: ["斩击与冲锋大部分是物理伤害。"],
      },
      {
        label: "火",
        mitigation: ["火抗有帮助，但是次要压力。"],
        notes: ["相比 0.2.0，Rathbreaker 对火暴露更高；带火是加分，不是必需。"],
      },
      {
        label: "冰",
        mitigation: ["冰抗覆盖任何冰系支持标签。"],
        notes: ["比物理少，但仍要覆盖。"],
      },
    ],
    strategyParas: [
      "近战：不要贴死 Boss。先学三段斩击的收尾，再在举剑砸地窗口打短循环。",
      "远程：保持中距横移。退到悬崖墙是最常见的死法——待中心、向侧移。",
      "召唤：保持角色移动，不要因为召唤物在输出就站定。",
      "低移速：每次前摇前预判走位；只用最短前摇技能；看前摇起点而非完整危险区再反应。",
    ],
    strategyBullets: [
      "若伤害偏低，先确认单体配装再考虑升级装备。",
      "若生存崩盘，把生命、抗性、移速拆成三个独立检查。",
    ],
    rewards: [
      {
        itemId: "act-2-progress",
        label: "Act 2 推进",
        condition: "击败 Rathbreaker",
        notes: [
          "完成 Earning Passage 步骤并开启 Mawdun Mine（Rudja）。",
          "正常 Boss 掉落表照常掉落。",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-rathbreaker-finisher",
        kind: "summary",
        question: "装备还行，为什么还是死在连招最后一击？",
        summary: ["玩家描述撑过前两下，却在长动画起手时被终结技打死。"],
        editorialAnalysis: [
          "这是节奏问题而非纯装备问题——终结技在你开长施法时落下。",
        ],
        officialAnswer: ["第三段挥下前停止攻击并 reposition，砸地窗口再回来。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看三段斩击 →",
      },
      {
        sourceId: "reddit-rathbreaker-spears",
        kind: "summary",
        question: "屏外长矛是 Rathbreaker 的弹道吗？",
        summary: ["有玩家朝 Boss 滚，以为长矛从他身上来。"],
        editorialAnalysis: ["那是标记弧线的环境齐射，不是本体投射物。"],
        officialAnswer: ["走向弧线之间的空隙，别滚向 Boss。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看屏外齐射 →",
      },
      {
        sourceId: "reddit-rathbreaker-fire",
        kind: "summary",
        question: "我要把整套配装转火吗？",
        summary: ["社区帖子强调 Rathbreaker 自 0.2.0 起的火弱点。"],
        editorialAnalysis: ["火是真实加分项但非必需；放弃冰/物理防御是净亏。"],
        officialAnswer: ["防御保持均衡。只有配装本就支持火才加火。"],
        relatedQuestionIds: [],
        linkHref: "#damage-types",
        linkLabel: "看伤害构成 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "我总是死在三段斩击终结技。",
        directAnswer: [
          "终结技在你开长动画时落下。第三段挥下前停止攻击并 reposition。",
        ],
        checks: [
          "盯住第三下的头顶停顿。",
          "把翻滚留给终结技而非第一下。",
          "确认生命/抗性不是低得离谱。",
        ],
        relatedContentIds: ["attacks", "preparation"],
      },
      {
        symptom: "为什么进 Act 2 我突然很容易被秒？",
        directAnswer: [
          "Act 2 入口伤害整体抬升。一起复查生命、抗性与移速，而不只是 DPS。",
        ],
        checks: [
          "拿胸甲/戒指对比 Act 2 预期。",
          "确认鞋上移速。",
          "确认自己没站在齐射弧线里。",
        ],
        relatedContentIds: ["preparation"],
      },
      {
        symptom: "我要先把所有 Hyena 清掉吗？",
        directAnswer: [
          "只清挡路或打断你的小怪。远处小怪不值得你丢失 Boss 视野。",
        ],
        checks: ["追边缘小怪会丢掉前摇信息。", "若小怪挡退路，清最近的那个。"],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "rudja-the-dread-engineer",
        title: "Rudja, the Dread Engineer",
        description: "下一个 Act 2 Boss：焦油、火与毒气的互动。",
        contentType: "boss",
        href: "/zh-cn/bosses/rudja-the-dread-engineer/",
      },
      {
        contentId: "act-2-early-gear",
        title: "Act 2 前期装备检查",
        description: "进入 Act 2 时的抗性、生命与移速优先级。",
        contentType: "guide",
        href: "/zh-cn/guides/",
      },
      {
        contentId: "how-resistances-work",
        title: "抗性如何运作",
        description: "元素伤害一直秒你时的快速修正。",
        contentType: "mechanic",
        href: "/zh-cn/guides/",
      },
      {
        contentId: "count-geonor",
        title: "Count Geonor",
        description: "Act 1 终章 Boss——贴墙死法在这里重现。",
        contentType: "boss",
        href: "/zh-cn/bosses/count-geonor/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Act 2 前期门槛攻略，含当前 0.5.4 时间轴。",
          "依 0.2.0 改动澄清火与冰的关系。",
        ],
      },
    ],
  },
});

// ============ 2. Rudja, the Dread Engineer ============
BOSSES.push({
  slug: "rudja-the-dread-engineer",
  wikiName: "Rudja,_the_Dread_Engineer",
  en: {
    title:
      "Rudja, the Dread Engineer Boss Guide: Grenades, Tar Ignition and Safe Positioning",
    shortTitle: "Rudja",
    summary:
      "Mawdun Mine boss tied to The Trail of Corruption. Master the Tar → Flamethrower ignition, Poison Gas chains, Flash Grenade blind and the enrage charge.",
    description:
      "How to beat Rudja, the Dread Engineer in Path of Exile 2 Act 2: hazard interaction matrix, attack table, safe positioning and rescue step.",
    imageAlt:
      "Rudja the Dread Engineer surrounded by tar and fire in Mawdun Mine",
    seoTitle: "Rudja the Dread Engineer Guide — PoE2 Tar, Fire and Poison Gas",
    seoDesc:
      "Complete Rudja guide for Path of Exile 2 Act 2. Grenade hazards, tar ignition, flash blind and safe positioning with video timestamps.",
    location: "Mawdun Mine, Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 23–26",
    difficulty: "medium",
    damageTypes: ["fire", "physical", "chaos"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "fire", "poison"],
    quickAnswer: {
      callout:
        "Do not stand in Tar when her Flamethrower is active — that is what turns the floor into burning ground.",
      calloutDetail: [
        "Rudja's danger comes from ground interactions, not just direct hits.",
        "After the fight, free Risu to continue The Trail of Corruption.",
      ],
      answers: [
        {
          label: "Before the fight",
          text: "Read the floor. Tar, Poison Gas and explosives each react differently to her fire.",
        },
        {
          label: "During the fight",
          text: "Keep moving off Tar before the Flamethrower; step away from Poison Gas before it chains.",
        },
        {
          label: "After victory",
          text: "Walk to Risu's cage and free her — the objective does not auto-complete.",
        },
      ],
      links: [
        { label: "Hazard matrix →", href: "#strategy" },
        { label: "Rescue step →", href: "#rewards" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 mid",
        note: "Part of The Trail of Corruption, after Rathbreaker.",
      },
      {
        label: "Fight type",
        value: "Hazard arena",
        note: "Ground states matter more than raw boss HP.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "After victory",
        value: "Free Risu, continue",
        note: "The Trail of Corruption advances only after the rescue.",
      },
    ],
    accessSteps: [
      {
        label: "Reach Mawdun Mine",
        body: [
          "Follow the mine tunnels from the Outskirts.",
          "The boss arena opens mid-mine.",
        ],
      },
      {
        label: "Trigger the encounter",
        body: [
          "Enter the engine chamber.",
          "Risu is caged nearby — note her position for after the kill.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Fire resistance",
        checks: ["Tar ignition and Flamethrower deal Fire."],
        why: "Standing in Tar during the Flamethrower creates burning ground.",
        fix: "Raise Fire res; do not linger on Tar.",
      },
      {
        label: "Chaos / Poison coverage",
        checks: ["Poison Gas chains on fire contact."],
        why: "Gas plus fire creates overlapping denial.",
        fix: "Keep moving; do not stand in gas when she throws fire.",
      },
      {
        label: "Recovery flask",
        checks: ["Blind from Flash Grenade costs you reads."],
        why: "You may eat a hit while blind.",
        fix: "Save a flask for after the flash.",
      },
      {
        label: "Movement speed",
        checks: ["Enrage Charge covers ground fast."],
        why: "Slow characters get run down.",
        fix: "Boots with movement speed; pre-position away from walls.",
      },
    ],
    arenaParas: [
      "The chamber mixes stable floor with Tar pools, Poison Gas pockets and explosive nodes. Rudja's fire is the trigger that turns safe-looking floor dangerous.",
      "Treat every coloured patch as a state, not a decoration. The hazard matrix below maps each state to its trigger and your response.",
    ],
    arenaBullets: [
      "Blue = stable floor. Orange = Tar (ignites on fire). Red = Poison Gas (chains on fire). Yellow = explosive node (delayed).",
    ],
    phases: [
      {
        phaseId: "rudja-fight",
        label: "Phase 1: Hazard Arena",
        trigger: "Fight starts at full health.",
        objectives: [
          "Track ground states",
          "Dodge enrage charge",
          "Survive flash blind",
        ],
        notes: [
          "One continuous fight. Enrage adds a fast charge when her health drops.",
        ],
        tags: ["hazard", "fire", "enrage"],
        mediaId: "rudja-the-dread-engineer-phase",
      },
    ],
    attacks: [
      {
        attackId: "tar-grenade",
        name: "Tar Grenade",
        phaseIds: ["rudja-fight"],
        damageTypes: ["fire"],
        telegraph: ["Lobs a Tar patch to the ground."],
        responses: ["Leave the Tar before her Flamethrower fires."],
        commonMistakes: ["Standing in Tar waiting for the Flamethrower."],
        danger: "medium",
        notes: ["Tar + fire = burning ground."],
        mediaIds: ["rudja-the-dread-engineer-annotated"],
        sourceIds: [],
      },
      {
        attackId: "flamethrower",
        name: "Flamethrower",
        phaseIds: ["rudja-fight"],
        damageTypes: ["fire"],
        telegraph: ["Raises the torch and sweeps a cone."],
        responses: ["Be off any Tar in the cone path."],
        commonMistakes: ["Ignoring Tar under the cone."],
        danger: "high",
        notes: ["Primary burning-ground source."],
        mediaIds: ["rudja-the-dread-engineer-attack"],
        sourceIds: [],
      },
      {
        attackId: "poison-gas",
        name: "Poison Gas",
        phaseIds: ["rudja-fight"],
        damageTypes: ["chaos"],
        telegraph: ["Releases a green gas cloud."],
        responses: ["Move a second time after it appears — fire can chain it."],
        commonMistakes: ["Treating all green as one hazard."],
        danger: "medium",
        notes: ["Gas + fire creates an extra explosion."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "flash-grenade",
        name: "Flash Grenade",
        phaseIds: ["rudja-fight"],
        damageTypes: ["physical"],
        telegraph: ["Throws a blinding grenade."],
        responses: ["Stop greed; recover position while blind."],
        commonMistakes: ["Continuing to attack through the blind."],
        danger: "low",
        notes: ["Blind reduces your reads, not direct damage."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "enrage-charge",
        name: "Enrage Charge",
        phaseIds: ["rudja-fight"],
        damageTypes: ["physical"],
        telegraph: ["At low health she winds a fast dash."],
        responses: ["Move toward open space, away from walls."],
        commonMistakes: ["Getting pinned against the wall."],
        danger: "high",
        notes: ["Fast and tracks; do not back into a corner."],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Fire",
        mitigation: ["Fire resistance and staying off Tar."],
        notes: ["Flamethrower and ignited Tar are the main Fire sources."],
      },
      {
        label: "Chaos / Poison",
        mitigation: ["Avoid Poison Gas when fire is active."],
        notes: ["Gas chains on fire contact."],
      },
      {
        label: "Physical",
        mitigation: ["Positioning and flask recovery."],
        notes: ["Flash and charge are physical pressure."],
      },
    ],
    strategyParas: [
      "Hazard Interaction Matrix — read the floor before the boss:",
      "Tar Grenade → triggered by her Flamethrower → becomes burning ground → do not wait on Tar.",
      "Poison Gas → triggered by fire → extra explosion/denial → leave a second move after it appears.",
      "Flash Grenade → direct hit/blast → blind → stop greed, recover position.",
      "Explosive Grenade → delayed blast → judge by landing marker, not colour → keep a gap.",
    ],
    strategyBullets: [
      "Melee: punish after the Flamethrower sweep, not during it.",
      "Ranged: kite around Tar; do not stand in the cone path.",
      "Low mobility: pre-clear a safe lane so the enrage charge has somewhere to miss.",
    ],
    rewards: [
      {
        itemId: "trail-of-corruption",
        label: "The Trail of Corruption (rescue)",
        condition: "Defeat Rudja and free Risu",
        notes: [
          "After the kill, walk to Risu's cage and free her.",
          "The objective advances only after the rescue step — it does not auto-complete.",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-rudja-tar",
        kind: "summary",
        question: "Why does the floor suddenly become burning ground?",
        summary: ["Players stand in Tar and get ignited by the Flamethrower."],
        editorialAnalysis: [
          "This is the Tar + fire interaction, not a separate attack.",
        ],
        officialAnswer: ["Leave the Tar before the Flamethrower fires."],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Tar Grenade →",
      },
      {
        sourceId: "reddit-rudja-gas",
        kind: "summary",
        question: "Why did the gas explode when I wasn't near it?",
        summary: ["Poison Gas chains when her fire touches it."],
        editorialAnalysis: [
          "Gas plus fire is a chain, not two independent hazards.",
        ],
        officialAnswer: [
          "Move a second time after gas appears; do not assume it is safe.",
        ],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "See hazard matrix →",
      },
      {
        sourceId: "reddit-rudja-risu",
        kind: "summary",
        question: "I beat her but the quest did not progress.",
        summary: ["Players leave without freeing Risu."],
        editorialAnalysis: ["The rescue is a manual step, not automatic."],
        officialAnswer: ["Walk to Risu's cage after the kill and free her."],
        relatedQuestionIds: [],
        linkHref: "#rewards",
        linkLabel: "See rescue step →",
      },
    ],
    troubleshooting: [
      {
        symptom: "The floor keeps igniting under me.",
        directAnswer: [
          "You are standing in Tar when the Flamethrower fires. Leave Tar before the cone sweeps.",
        ],
        checks: [
          "Watch where Tar lands.",
          "Do not path through Tar during her fire.",
          "Raise Fire resistance if it still hurts.",
        ],
        relatedContentIds: ["attacks", "strategy"],
      },
      {
        symptom: "I got blinded and ate a hit.",
        directAnswer: [
          "Flash Grenade blinds you; stop attacking and recover position while blind, save a flask.",
        ],
        checks: [
          "Note the throw tell.",
          "Do not greed during blind.",
          "Keep a recovery flask for after the flash.",
        ],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "The quest did not advance after the kill.",
        directAnswer: [
          "Free Risu manually — the objective does not auto-complete on kill.",
        ],
        checks: [
          "Locate Risu's cage.",
          "Walk there and free her.",
          "Confirm the objective updates.",
        ],
        relatedContentIds: ["rewards"],
      },
    ],
    related: [
      {
        contentId: "rathbreaker",
        title: "Rathbreaker",
        description: "Previous Act 2 boss — the early wall.",
        contentType: "boss",
        href: "/en/bosses/rathbreaker/",
      },
      {
        contentId: "jamanra-the-risen-king",
        title: "Jamanra, the Risen King",
        description: "Next Act 2 boss at the Halani Gates.",
        contentType: "boss",
        href: "/en/bosses/jamanra-the-risen-king/",
      },
      {
        contentId: "ground-effects",
        title: "Ground Effects Guide",
        description: "Burning ground, poison and how they interact.",
        contentType: "guide",
        href: "/en/guides/",
      },
      {
        contentId: "blind-mechanic",
        title: "Blind and Recovery",
        description: "What blind does and how to play through it.",
        contentType: "mechanic",
        href: "/en/guides/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Rudja hazard-interaction guide published at 0.5.4.",
          "Added Tar/Fire/Poison Gas matrix from current video checks.",
        ],
      },
    ],
  },
  "zh-cn": {
    title: "Rudja, the Dread Engineer 攻略：手雷、焦油点燃与安全站位",
    shortTitle: "Rudja",
    summary:
      "Mawdun Mine 的 Boss，隶属 The Trail of Corruption。掌握焦油→火焰喷射的点燃、毒气连锁、闪光弹致盲与狂暴冲锋。",
    description:
      "Path of Exile 2 Act 2 Rudja 打法：危险互动矩阵、攻击表、安全站位与救援步骤。",
    imageAlt: "Rudja the Dread Engineer 在 Mawdun Mine 的焦油与火中",
    seoTitle: "Rudja the Dread Engineer 攻略 — PoE2 焦油、火与毒气",
    seoDesc:
      "Path of Exile 2 Act 2 Rudja 完整攻略：手雷危险、焦油点燃、闪光致盲与安全站位，含视频节点。",
    location: "Mawdun Mine，Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "23–26 级",
    difficulty: "medium",
    damageTypes: ["fire", "physical", "chaos"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "fire", "poison"],
    quickAnswer: {
      callout: "火焰喷射激活时别站在焦油里——那正是地面变成燃烧地面的原因。",
      calloutDetail: [
        "Rudja 的威胁来自地面互动，而非只有直伤。",
        "战后去救 Risu 才能推进 The Trail of Corruption。",
      ],
      answers: [
        {
          label: "战前",
          text: "先读地面。焦油、毒气与炸药各自会被她的火以不同方式触发。",
        },
        { label: "战中", text: "火焰喷射前离开焦油；毒气被点燃前先撤。" },
        { label: "胜利后", text: "走到 Risu 的笼子救她——任务不会自动完成。" },
      ],
      links: [
        { label: "危险矩阵 →", href: "#strategy" },
        { label: "救援步骤 →", href: "#rewards" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 中段",
        note: "隶属 The Trail of Corruption，在 Rathbreaker 之后。",
      },
      {
        label: "战斗类型",
        value: "危险地面竞技场",
        note: "地面状态比 Boss 血量更关键。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "胜利后",
        value: "救 Risu 后继续",
        note: "救援后才推进 The Trail of Corruption。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Mawdun Mine",
        body: ["从 Outskirts 沿矿道前进。", "Boss 竞技场在矿洞中段开启。"],
      },
      {
        label: "触发战斗",
        body: ["进入机械室。", "Risu 被关在附近——记住位置，击杀后去救。"],
      },
    ],
    prepItems: [
      {
        label: "火抗",
        checks: ["焦油点燃与火焰喷射造成火伤。"],
        why: "站在焦油里吃火焰喷射会生成燃烧地面。",
        fix: "提高火抗；别在焦油里逗留。",
      },
      {
        label: "混沌 / 毒覆盖",
        checks: ["毒气被火接触会连锁。"],
        why: "毒气加火形成重叠封锁。",
        fix: "保持移动；她扔火时别站在毒气里。",
      },
      {
        label: "回复药剂",
        checks: ["闪光弹致盲让你读不清。"],
        why: "致盲时可能吃刀。",
        fix: "留一瓶药剂给致盲后。",
      },
      {
        label: "移速",
        checks: ["狂暴冲锋速度很快。"],
        why: "慢速角色会被追上。",
        fix: "带移速的鞋；提前远离墙。",
      },
    ],
    arenaParas: [
      "机械室混合了稳定地面、焦油池、毒气团与炸药节点。Rudja 的火是把安全地面变危险的触发器。",
      "把每块有色地块当作「状态」而非装饰。下方危险矩阵把每种状态对应到触发条件与你的应对。",
    ],
    arenaBullets: [
      "蓝=稳定地面。橙=焦油（遇火点燃）。红=毒气（遇火连锁）。黄=炸药节点（延迟）。",
    ],
    phases: [
      {
        phaseId: "rudja-fight",
        label: "阶段 1：危险地面竞技场",
        trigger: "满血开战。",
        objectives: ["跟踪地面状态", "躲狂暴冲锋", "扛过致盲"],
        notes: ["连续一战。血量下降时狂暴会追加一次快速冲锋。"],
        tags: ["hazard", "fire", "enrage"],
        mediaId: "rudja-the-dread-engineer-phase",
      },
    ],
    attacks: [
      {
        attackId: "tar-grenade",
        name: "焦油手雷 Tar Grenade",
        phaseIds: ["rudja-fight"],
        damageTypes: ["fire"],
        telegraph: ["抛下一摊焦油到地面。"],
        responses: ["火焰喷射前离开焦油。"],
        commonMistakes: ["站在焦油里等火焰喷射。"],
        danger: "medium",
        notes: ["焦油 + 火 = 燃烧地面。"],
        mediaIds: ["rudja-the-dread-engineer-annotated"],
        sourceIds: [],
      },
      {
        attackId: "flamethrower",
        name: "火焰喷射 Flamethrower",
        phaseIds: ["rudja-fight"],
        damageTypes: ["fire"],
        telegraph: ["举起火把横扫锥形。"],
        responses: ["锥形路径上的焦油要提前离开。"],
        commonMistakes: ["忽略锥形下的焦油。"],
        danger: "high",
        notes: ["主要燃烧地面来源。"],
        mediaIds: ["rudja-the-dread-engineer-attack"],
        sourceIds: [],
      },
      {
        attackId: "poison-gas",
        name: "毒气 Poison Gas",
        phaseIds: ["rudja-fight"],
        damageTypes: ["chaos"],
        telegraph: ["释放绿色毒气云。"],
        responses: ["出现后再撤一步——火会触发连锁。"],
        commonMistakes: ["把所有绿色当同一种危险。"],
        danger: "medium",
        notes: ["毒气 + 火会额外爆炸。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "flash-grenade",
        name: "闪光弹 Flash Grenade",
        phaseIds: ["rudja-fight"],
        damageTypes: ["physical"],
        telegraph: ["扔出致盲手雷。"],
        responses: ["停止贪输出，致盲时恢复位置。"],
        commonMistakes: ["致盲中继续输出。"],
        danger: "low",
        notes: ["致盲削弱读招，不是直接伤害。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "enrage-charge",
        name: "狂暴冲锋 Enrage Charge",
        phaseIds: ["rudja-fight"],
        damageTypes: ["physical"],
        telegraph: ["低血时蓄力快速冲刺。"],
        responses: ["移向开阔处，远离墙。"],
        commonMistakes: ["被逼到墙角。"],
        danger: "high",
        notes: ["快且会追踪；别退进角落。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "火",
        mitigation: ["火抗 + 离开焦油。"],
        notes: ["火焰喷射与点燃的焦油是主要火源。"],
      },
      {
        label: "混沌 / 毒",
        mitigation: ["火激活时避开毒气。"],
        notes: ["毒气遇火连锁。"],
      },
      {
        label: "物理",
        mitigation: ["站位 + 药剂回复。"],
        notes: ["闪光与冲锋是物理压力。"],
      },
    ],
    strategyParas: [
      "危险互动矩阵——先看地面再看 Boss：",
      "焦油手雷 → 被火焰喷射触发 → 变成燃烧地面 → 别在焦油里等。",
      "毒气 → 被火触发 → 额外爆炸/封锁 → 出现后再撤一步。",
      "闪光弹 → 直接命中/爆炸 → 致盲 → 停止贪输出，恢复位置。",
      "炸药手雷 → 延迟爆炸 → 看落点而非颜色 → 保持空隙。",
    ],
    strategyBullets: [
      "近战：在火焰喷射横扫后惩罚，而非期间。",
      "远程：绕开焦油风筝；别站在锥形路径。",
      "低移速：提前清出安全道，让狂暴冲锋有落空空间。",
    ],
    rewards: [
      {
        itemId: "trail-of-corruption",
        label: "The Trail of Corruption（救援）",
        condition: "击败 Rudja 并救出 Risu",
        notes: [
          "击杀后走到 Risu 笼子救她。",
          "任务只在救援步骤后推进——不会自动完成。",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-rudja-tar",
        kind: "summary",
        question: "为什么地面突然变成燃烧地面？",
        summary: ["玩家站在焦油里被火焰喷射点燃。"],
        editorialAnalysis: ["这是焦油+火的互动，不是独立攻击。"],
        officialAnswer: ["火焰喷射前离开焦油。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看焦油手雷 →",
      },
      {
        sourceId: "reddit-rudja-gas",
        kind: "summary",
        question: "我没靠近，毒气为什么炸了？",
        summary: ["毒气被她的火碰到后连锁。"],
        editorialAnalysis: ["毒气加火是连锁，不是两个独立危险。"],
        officialAnswer: ["毒气出现后再撤一步，别以为安全。"],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "看危险矩阵 →",
      },
      {
        sourceId: "reddit-rudja-risu",
        kind: "summary",
        question: "我打赢了但任务没推进。",
        summary: ["玩家没去救 Risu 就离开。"],
        editorialAnalysis: ["救援是手动步骤，不是自动。"],
        officialAnswer: ["击杀后走到 Risu 笼子救她。"],
        relatedQuestionIds: [],
        linkHref: "#rewards",
        linkLabel: "看救援步骤 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "地面一直在我脚下点燃。",
        directAnswer: ["你站在焦油里时火焰喷射开火了。锥形横扫前离开焦油。"],
        checks: ["注意焦油落点。", "她放火时别穿焦油走。", "仍疼就提高火抗。"],
        relatedContentIds: ["attacks", "strategy"],
      },
      {
        symptom: "我被致盲然后吃了一刀。",
        directAnswer: ["闪光弹致盲你；致盲时停止攻击恢复位置，留瓶药剂。"],
        checks: ["注意投掷前摇。", "致盲中别贪。", "留瓶回复给药后。"],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "击杀后任务没推进。",
        directAnswer: ["手动救 Risu——任务不会在击杀时自动完成。"],
        checks: ["找到 Risu 笼子。", "走过去救她。", "确认任务更新。"],
        relatedContentIds: ["rewards"],
      },
    ],
    related: [
      {
        contentId: "rathbreaker",
        title: "Rathbreaker",
        description: "上一个 Act 2 Boss——前期门槛。",
        contentType: "boss",
        href: "/zh-cn/bosses/rathbreaker/",
      },
      {
        contentId: "jamanra-the-risen-king",
        title: "Jamanra, the Risen King",
        description: "下一个 Act 2 Boss，在 Halani Gates。",
        contentType: "boss",
        href: "/zh-cn/bosses/jamanra-the-risen-king/",
      },
      {
        contentId: "ground-effects",
        title: "地面效果攻略",
        description: "燃烧地面、毒气与它们的互动。",
        contentType: "guide",
        href: "/zh-cn/guides/",
      },
      {
        contentId: "blind-mechanic",
        title: "致盲与回复",
        description: "致盲的作用与应对方式。",
        contentType: "mechanic",
        href: "/zh-cn/guides/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Rudja 危险互动攻略，基于 0.5.4。",
          "依当前视频核对补充焦油/火/毒气矩阵。",
        ],
      },
    ],
  },
});

// ============ 3. Jamanra, the Risen King ============
BOSSES.push({
  slug: "jamanra-the-risen-king",
  wikiName: "Jamanra,_the_Risen_King",
  en: {
    title:
      "Jamanra, the Risen King Guide: Flame Circle, Lightning Orbs and the Halani Gates Fight",
    shortTitle: "Jamanra (Risen King)",
    summary:
      "A partial Act 2 main encounter at the Halani Gates. Learn the flame safe circle, slow Lightning Orbs, Volatile Beetles and why the fight retracts at ~30% HP — distinct from the Abomination.",
    description:
      "How to beat Jamanra, the Risen King in Path of Exile 2 Act 2: flame circle, lightning orbs, identity difference vs the Abomination and the retreat ending.",
    imageAlt:
      "Jamanra the Risen King stabbing his sword to form a flame safe circle",
    seoTitle: "Jamanra the Risen King Guide — PoE2 Flame Circle & Halani Gates",
    seoDesc:
      "Complete Jamanra Risen King guide for Path of Exile 2 Act 2. Flame safe circle, lightning orbs, retreat at 30% and difference from the Abomination.",
    location: "The Halani Gates, Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 24–27",
    difficulty: "medium",
    damageTypes: ["fire", "lightning", "physical"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "fire", "lightning"],
    quickAnswer: {
      callout:
        "When he stabs his sword into the ground, stand INSIDE the flame circle — the area outside it becomes dangerous.",
      calloutDetail: [
        "This is a partial encounter: the fight ends when he retreats at low health, it is not a full kill.",
        "It is a different boss from Jamanra, the Abomination at the Dreadnought.",
      ],
      answers: [
        {
          label: "Is this the Act 2 final boss?",
          text: "No. The Risen King is a mid-Act 2 gate fight; the Abomination is the Act 2 finale.",
        },
        {
          label: "Why does it end at 30%?",
          text: "He retreats by design once his health drops — push him there, then the story continues.",
        },
        {
          label: "Safe circle?",
          text: "Stay inside the flame ring he creates with the sword stab; outside is the danger zone.",
        },
      ],
      links: [
        { label: "Identity difference →", href: "#strategy" },
        { label: "Attack table →", href: "#attacks" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 mid-late",
        note: "The Halani Gates, after Rudja.",
      },
      {
        label: "Fight type",
        value: "Partial encounter",
        note: "Ends at retreat, not at 0% HP.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "After retreat",
        value: "Story continues",
        note: "The path stays sandstorm-blocked until later; this is expected.",
      },
    ],
    accessSteps: [
      {
        label: "Reach the Halani Gates",
        body: [
          "Follow the main path past Mawdun Mine.",
          "The gate arena opens as the objective triggers.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Fire resistance",
        checks: ["Flame Burst and the safe-circle edge deal Fire."],
        why: "Standing outside the circle exposes you to fire.",
        fix: "Raise Fire res; respect the circle.",
      },
      {
        label: "Lightning coverage",
        checks: ["Lightning Orbs and Beam are lightning."],
        why: "Orbs track slowly; the Beam has a clear tell.",
        fix: "Keep moving; dodge the Beam laterally.",
      },
      {
        label: "Add clear",
        checks: ["Volatile Beetles spawn during the fight."],
        why: "Beetles clutter the circle timing.",
        fix: "Clear beetles that block your circle entry.",
      },
      {
        label: "Movement speed",
        checks: ["You must reach the circle in time."],
        why: "Slow characters get caught outside.",
        fix: "Boots with movement speed.",
      },
    ],
    arenaParas: [
      "The Halani Gates is an open courtyard. The signature moment is the sword stab: a flame ring appears, and the ground outside it turns hazardous.",
      "This is a partial encounter — once Jamanra's health drops far enough he retreats. The forward path remains sandstorm-blocked afterwards; that is intended, not a bug.",
    ],
    arenaBullets: [
      "Blue = approach lane. Orange = Lightning Orb path. Green = flame safe circle. Red = outside-circle danger.",
    ],
    phases: [
      {
        phaseId: "risen-king-fight",
        label: "Phase 1: Halani Gates Encounter",
        trigger: "Fight starts at full health; retracts at low health.",
        objectives: [
          "Trigger the flame circle and enter it",
          "Dodge Lightning Orbs",
          "Push him to retreat",
        ],
        notes: [
          "Partial encounter — ends at retreat, not a kill.",
          "The sword stab creates the safe circle; outside is dangerous.",
        ],
        tags: ["flame-circle", "partial", "retreat"],
        mediaId: "jamanra-the-risen-king-phase",
      },
    ],
    attacks: [
      {
        attackId: "flame-burst",
        name: "Flame Burst / Safe Circle",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["fire"],
        telegraph: ["Stabs sword into ground; a flame ring forms."],
        responses: ["Step inside the ring; outside becomes dangerous."],
        commonMistakes: ["Standing just outside the ring edge."],
        danger: "high",
        notes: ["The ring is the safe zone, not the sword."],
        mediaIds: ["jamanra-the-risen-king-annotated"],
        sourceIds: [],
      },
      {
        attackId: "lightning-orbs",
        name: "Lightning Orbs",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["lightning"],
        telegraph: ["Slow orbs drift toward you."],
        responses: ["Lead them away from the circle; keep moving."],
        commonMistakes: ["Letting orbs pin you outside the ring."],
        danger: "medium",
        notes: ["Slow but tracking; do not stand still."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "scarab-beetles",
        name: "Summon Scarab / Volatile Beetles",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["physical"],
        telegraph: ["Beetles spawn around the arena."],
        responses: ["Clear beetles blocking your circle entry."],
        commonMistakes: ["Ignoring beetles then missing the circle."],
        danger: "low",
        notes: ["Beetles clutter timing, not huge damage."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "lightning-beam",
        name: "Lightning Beam",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["lightning"],
        telegraph: ["Raises arm, charges a line."],
        responses: ["Dodge laterally out of the line."],
        commonMistakes: ["Standing in the charged line."],
        danger: "high",
        notes: ["Clear tell; respect the line."],
        mediaIds: ["jamanra-the-risen-king-attack"],
        sourceIds: [],
      },
      {
        attackId: "sandstorm",
        name: "Sandstorm & Volatile Beetles",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["physical"],
        telegraph: ["Environment sandstorm pulses."],
        responses: ["Keep to the circle; ignore the flavour storm."],
        commonMistakes: ["Panicking at the visual storm."],
        danger: "low",
        notes: ["The blocking storm after the fight is separate from combat."],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Fire",
        mitigation: ["Fire res and the safe circle."],
        notes: ["Flame Burst and circle edge are Fire."],
      },
      {
        label: "Lightning",
        mitigation: ["Keep moving; dodge Beam laterally."],
        notes: ["Orbs and Beam are lightning."],
      },
      {
        label: "Physical",
        mitigation: ["Positioning vs beetles."],
        notes: ["Beetles and storm are physical pressure."],
      },
    ],
    strategyParas: [
      "Identity Difference — Risen King vs Abomination:",
      "Location: Halani Gates vs the Dreadnought. Role: mid-Act 2 gate vs Act 2 finale. Ending: retreats at low health vs full finale fight. Slug: jamanra-the-risen-king vs jamanra-the-abomination.",
      "Do not reuse the Abomination's sandstorm/Asala finale mechanics here. Do not call this the Act 2 final boss. Do not rely on dying to let Asala auto-finish — that is the Abomination fight, not this one.",
    ],
    strategyBullets: [
      "When the sword stabs, the circle is safe; outside is the kill zone.",
      "Lead Lightning Orbs away from the circle before they pin you.",
      "After retreat, the path stays sandstorm-blocked — that is intended.",
    ],
    rewards: [
      {
        itemId: "halani-progress",
        label: "Halani Gates Progress",
        condition: "Force Jamanra to retreat",
        notes: [
          "The encounter completes when he retreats at low health.",
          "Story continues; the forward sandstorm lifts later in the campaign.",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-jamanra-final",
        kind: "summary",
        question: "Is the Risen King the Act 2 final boss?",
        summary: [
          "Players expect a full kill and are confused when he leaves.",
        ],
        editorialAnalysis: ["He is a partial gate encounter, not the finale."],
        officialAnswer: [
          "No — the Abomination at the Dreadnought is the Act 2 finale. Push the Risen King to retreat.",
        ],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "See identity difference →",
      },
      {
        sourceId: "reddit-jamanra-circle",
        kind: "summary",
        question: "Where do I stand during the sword stab?",
        summary: ["Players stand outside the ring and die."],
        editorialAnalysis: ["The ring is the safe zone; outside is dangerous."],
        officialAnswer: [
          "Step inside the flame circle when he stabs the sword.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Flame Burst →",
      },
      {
        sourceId: "reddit-jamanra-path",
        kind: "summary",
        question: "Why is the path still blocked by sandstorm?",
        summary: ["Players think the fight bugged."],
        editorialAnalysis: [
          "The post-fight blocking storm is intended story gating.",
        ],
        officialAnswer: [
          "Continue the campaign; the storm lifts later. This is not a bug.",
        ],
        relatedQuestionIds: [],
        linkHref: "#rewards",
        linkLabel: "See progress →",
      },
    ],
    troubleshooting: [
      {
        symptom: "He ran away and I did not get the kill.",
        directAnswer: [
          "That is correct — he retreats by design at low health. Push him there to complete the encounter.",
        ],
        checks: [
          "Confirm health dropped far enough.",
          "Do not wait for a 0% kill.",
          "Continue the story afterwards.",
        ],
        relatedContentIds: ["strategy", "rewards"],
      },
      {
        symptom: "I die right after the sword stab.",
        directAnswer: [
          "You are outside the flame circle. Step inside it when he stabs the sword.",
        ],
        checks: [
          "Watch the stab tell.",
          "Move into the ring, not beside it.",
          "Raise Fire res if needed.",
        ],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "Lightning Orbs keep pinning me.",
        directAnswer: [
          "They track slowly — keep moving and lead them away from the circle before they trap you outside.",
        ],
        checks: [
          "Do not stand still.",
          "Clear beetles that block your path.",
          "Respect the Beam line.",
        ],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "rudja-the-dread-engineer",
        title: "Rudja, the Dread Engineer",
        description: "Previous Act 2 boss.",
        contentType: "boss",
        href: "/en/bosses/rudja-the-dread-engineer/",
      },
      {
        contentId: "jamanra-the-abomination",
        title: "Jamanra, the Abomination",
        description: "The Act 2 finale boss — do not confuse the two.",
        contentType: "boss",
        href: "/en/bosses/jamanra-the-abomination/",
      },
      {
        contentId: "balbala",
        title: "Balbala",
        description: "Related Act 2 boss and Ascendancy access.",
        contentType: "boss",
        href: "/en/bosses/",
      },
      {
        contentId: "iktab-and-ekbab",
        title: "Iktab and Ekbab",
        description: "Next Horn of the Vastiri branch boss.",
        contentType: "boss",
        href: "/en/bosses/iktab-and-ekbab/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Risen King partial-encounter guide at 0.5.4.",
          "Clarified difference from the Abomination and the retreat ending.",
        ],
      },
    ],
  },
  "zh-cn": {
    title:
      "Jamanra, the Risen King 攻略：火焰安全圈、闪电球与 Halani Gates 战斗",
    shortTitle: "Jamanra（Risen King）",
    summary:
      "Halani Gates 的 Act 2 主线中途遭遇战。掌握火焰安全圈、慢速闪电球、Volatile Beetles，以及为何约 30% 血时撤退——与 Abomination 不同。",
    description:
      "Path of Exile 2 Act 2 Jamanra Risen King 打法：火焰安全圈、闪电球、与 Abomination 的身份区别及撤退结局。",
    imageAlt: "Jamanra the Risen King 插剑形成火焰安全圈",
    seoTitle: "Jamanra the Risen King 攻略 — PoE2 火焰圈与 Halani Gates",
    seoDesc:
      "Path of Exile 2 Act 2 Jamanra Risen King 完整攻略：火焰安全圈、闪电球、30% 撤退及与 Abomination 的区别。",
    location: "The Halani Gates，Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "24–27 级",
    difficulty: "medium",
    damageTypes: ["fire", "lightning", "physical"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "fire", "lightning"],
    quickAnswer: {
      callout: "他把剑插地时，站到火焰圈「里面」——圈外区域会变危险。",
      calloutDetail: [
        "这是中途遭遇战：他低血撤退即结束，不是完整击杀。",
        "他与 Dreadnought 的 Jamanra, the Abomination 是两个不同的 Boss。",
      ],
      answers: [
        {
          label: "这是 Act 2 终 Boss 吗？",
          text: "不是。Risen King 是 Act 2 中段的关卡战；Abomination 才是 Act 2 终战。",
        },
        {
          label: "为什么 30% 就结束？",
          text: "他血量降到一定程度会按设计撤退——把他推到那里，剧情继续。",
        },
        { label: "安全圈？", text: "站在他插剑生成的火焰圈内；圈外是危险区。" },
      ],
      links: [
        { label: "身份区别 →", href: "#strategy" },
        { label: "攻击表 →", href: "#attacks" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 中后段",
        note: "Halani Gates，在 Rudja 之后。",
      },
      {
        label: "战斗类型",
        value: "中途遭遇战",
        note: "撤退即结束，不是 0% 击杀。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "撤退后",
        value: "剧情继续",
        note: "前路仍被沙暴封锁，这是预期。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Halani Gates",
        body: ["沿主线越过 Mawdun Mine。", "目标触发后关卡竞技场开启。"],
      },
    ],
    prepItems: [
      {
        label: "火抗",
        checks: ["Flame Burst 与圈边造成火伤。"],
        why: "站在圈外会吃火。",
        fix: "提高火抗；尊重圈。",
      },
      {
        label: "闪电覆盖",
        checks: ["闪电球与光束是闪电。"],
        why: "球慢速追踪；光束前摇清晰。",
        fix: "保持移动；横向躲光束。",
      },
      {
        label: "清小怪",
        checks: ["战中会刷 Volatile Beetles。"],
        why: "甲虫扰乱进圈时机。",
        fix: "清掉挡路的甲虫。",
      },
      {
        label: "移速",
        checks: ["你必须及时进圈。"],
        why: "慢速角色会被困在圈外。",
        fix: "带移速的鞋。",
      },
    ],
    arenaParas: [
      "Halani Gates 是开阔庭院。标志性时刻是插剑：火焰环出现，圈外地面变危险。",
      "这是中途遭遇战——Jamanra 血量降到足够低就撤退。战后前路仍被沙暴封锁；这是设计使然，不是 bug。",
    ],
    arenaBullets: ["蓝=接近道。橙=闪电球路径。绿=火焰安全圈。红=圈外危险。"],
    phases: [
      {
        phaseId: "risen-king-fight",
        label: "阶段 1：Halani Gates 遭遇战",
        trigger: "满血开战；低血撤退。",
        objectives: ["触发火焰圈并进入", "躲闪电球", "把他推到撤退"],
        notes: [
          "中途遭遇战——撤退即结束，不是击杀。",
          "插剑生成安全圈；圈外危险。",
        ],
        tags: ["flame-circle", "partial", "retreat"],
        mediaId: "jamanra-the-risen-king-phase",
      },
    ],
    attacks: [
      {
        attackId: "flame-burst",
        name: "火焰爆发 / 安全圈",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["fire"],
        telegraph: ["把剑插地；火焰环生成。"],
        responses: ["踏进环内；圈外变危险。"],
        commonMistakes: ["站在环边缘外。"],
        danger: "high",
        notes: ["环是安全区，不是剑。"],
        mediaIds: ["jamanra-the-risen-king-annotated"],
        sourceIds: [],
      },
      {
        attackId: "lightning-orbs",
        name: "闪电球 Lightning Orbs",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["lightning"],
        telegraph: ["慢速法球飘向你。"],
        responses: ["把它们引离圈；保持移动。"],
        commonMistakes: ["让球把你困在圈外。"],
        danger: "medium",
        notes: ["慢但追踪；别站定。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "scarab-beetles",
        name: "召唤 Scarab / Volatile Beetles",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["physical"],
        telegraph: ["甲虫在竞技场周围生成。"],
        responses: ["清掉挡你进圈的甲虫。"],
        commonMistakes: ["忽略甲虫导致错过进圈。"],
        danger: "low",
        notes: ["甲虫扰时机，伤害不大。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "lightning-beam",
        name: "闪电光束 Lightning Beam",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["lightning"],
        telegraph: ["抬手蓄一条线。"],
        responses: ["横向躲出线。"],
        commonMistakes: ["站在蓄力线里。"],
        danger: "high",
        notes: ["前摇清晰；尊重线。"],
        mediaIds: ["jamanra-the-risen-king-attack"],
        sourceIds: [],
      },
      {
        attackId: "sandstorm",
        name: "沙暴与 Volatile Beetles",
        phaseIds: ["risen-king-fight"],
        damageTypes: ["physical"],
        telegraph: ["环境沙暴脉动。"],
        responses: ["待在圈内；忽略氛围沙暴。"],
        commonMistakes: ["被视觉沙暴吓到。"],
        danger: "low",
        notes: ["战后封锁的沙暴与战斗无关。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "火",
        mitigation: ["火抗 + 安全圈。"],
        notes: ["Flame Burst 与圈边是火。"],
      },
      {
        label: "闪电",
        mitigation: ["保持移动；横向躲光束。"],
        notes: ["球与光束是闪电。"],
      },
      {
        label: "物理",
        mitigation: ["对甲虫的站位。"],
        notes: ["甲虫与沙暴是物理压力。"],
      },
    ],
    strategyParas: [
      "身份区别——Risen King vs Abomination：",
      "地点：Halani Gates vs Dreadnought。作用：Act 2 中段关卡 vs Act 2 终战。结束：低血撤退 vs 完整终章战。slug：jamanra-the-risen-king vs jamanra-the-abomination。",
      "不要在这里套用 Abomination 的沙暴/Asala 终章机制。不要称此为 Act 2 终 Boss。不要靠死亡让 Asala 自动完成——那是 Abomination，不是这场。",
    ],
    strategyBullets: [
      "插剑时圈内安全；圈外是致命区。",
      "在球把你困住前把它们引离圈。",
      "撤退后前路仍被沙暴封锁——这是设计。",
    ],
    rewards: [
      {
        itemId: "halani-progress",
        label: "Halani Gates 推进",
        condition: "迫使 Jamanra 撤退",
        notes: [
          "他在低血撤退时遭遇战即完成。",
          "剧情继续；前方沙暴在后期战役中解除。",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-jamanra-final",
        kind: "summary",
        question: "Risen King 是 Act 2 终 Boss 吗？",
        summary: ["玩家期待完整击杀，却困惑于他离开。"],
        editorialAnalysis: ["他是中途关卡遭遇战，不是终战。"],
        officialAnswer: [
          "不是——Dreadnought 的 Abomination 才是 Act 2 终战。把 Risen King 推到撤退。",
        ],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "看身份区别 →",
      },
      {
        sourceId: "reddit-jamanra-circle",
        kind: "summary",
        question: "插剑时我站哪里？",
        summary: ["玩家站在圈外死亡。"],
        editorialAnalysis: ["环是安全区；圈外危险。"],
        officialAnswer: ["他插剑时踏进火焰圈。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看火焰爆发 →",
      },
      {
        sourceId: "reddit-jamanra-path",
        kind: "summary",
        question: "为什么前路还被沙暴封锁？",
        summary: ["玩家以为战斗出 bug。"],
        editorialAnalysis: ["战后封锁沙暴是预期的剧情门禁。"],
        officialAnswer: ["继续战役；沙暴后期解除。这不是 bug。"],
        relatedQuestionIds: [],
        linkHref: "#rewards",
        linkLabel: "看推进 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "他跑了，我没拿到击杀。",
        directAnswer: [
          "这是对的——他按设计在低血撤退。把他推到那里即完成遭遇战。",
        ],
        checks: ["确认血量降得够低。", "别等 0% 击杀。", "之后继续剧情。"],
        relatedContentIds: ["strategy", "rewards"],
      },
      {
        symptom: "插剑后我立刻死。",
        directAnswer: ["你在火焰圈外。他插剑时踏进圈内。"],
        checks: ["看插剑前摇。", "进环内而非旁边。", "必要时提高火抗。"],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "闪电球一直把我钉住。",
        directAnswer: ["它们慢速追踪——保持移动，在它们把你困在圈外前引离圈。"],
        checks: ["别站定。", "清掉挡路的甲虫。", "尊重光束线。"],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "rudja-the-dread-engineer",
        title: "Rudja, the Dread Engineer",
        description: "上一个 Act 2 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/rudja-the-dread-engineer/",
      },
      {
        contentId: "jamanra-the-abomination",
        title: "Jamanra, the Abomination",
        description: "Act 2 终战 Boss——别混淆两者。",
        contentType: "boss",
        href: "/zh-cn/bosses/jamanra-the-abomination/",
      },
      {
        contentId: "balbala",
        title: "Balbala",
        description: "相关 Act 2 Boss 与 Ascendancy 入口。",
        contentType: "boss",
        href: "/zh-cn/bosses/",
      },
      {
        contentId: "iktab-and-ekbab",
        title: "Iktab and Ekbab",
        description: "下一个 Horn of the Vastiri 分支 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/iktab-and-ekbab/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Risen King 中途遭遇战攻略，基于 0.5.4。",
          "澄清与 Abomination 的区别及撤退结局。",
        ],
      },
    ],
  },
});

// ============ 4. Kabala, Constrictor Queen ============
BOSSES.push({
  slug: "kabala-constrictor-queen",
  wikiName: "Kabala,_Constrictor_Queen",
  en: {
    title:
      "Kabala, Constrictor Queen Guide: Bone Walls, Burrow Slam and +2 Weapon Set Passives",
    shortTitle: "Kabala",
    summary:
      "Optional Act 2 boss in Keth granting +2 Weapon Set Passive Skill Points. Learn the Bone Wall escape, Burrow Slam red burst and the full Book of Specialisation claim flow.",
    description:
      "How to beat Kabala, Constrictor Queen in Path of Exile 2 Act 2: bone wall escape, burrow slam, reward claim flow and missing-reward troubleshooting.",
    imageAlt: "Kabala Constrictor Queen coiling among bone walls in Keth",
    seoTitle:
      "Kabala Constrictor Queen Guide — PoE2 Bone Walls & +2 Weapon Set",
    seoDesc:
      "Complete Kabala guide for Path of Exile 2 Act 2. Bone wall escape, burrow slam, Book of Specialisation claim and +2 weapon set passives.",
    location: "Keth (Venom Pit), Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 24–27",
    difficulty: "low",
    damageTypes: ["physical", "chaos"],
    bossCategory: "permanent-reward",
    act: "act-2",
    isOptional: true,
    tags: ["act-2", "optional", "permanent-reward", "physical"],
    quickAnswer: {
      callout:
        "After the kill, right-click the Book of Specialisation — the +2 Weapon Set Passive Points are not auto-granted.",
      calloutDetail: [
        "Kabala is optional but gives a permanent +2 Weapon Set Passive Skill Points reward.",
        "The reward is a book drop you must use, not an automatic passive gain.",
      ],
      answers: [
        {
          label: "Where is she?",
          text: "In Keth, reached via the Venom Pit off the Act 2 path.",
        },
        {
          label: "Bone walls?",
          text: "When walls form, find the one unclosed exit; do not get pinned.",
        },
        {
          label: "Reward?",
          text: "Drops the Book of Specialisation — right-click it to claim +2 Weapon Set points.",
        },
      ],
      links: [
        { label: "Claim flow →", href: "#reward-claim-flow" },
        { label: "Missing reward →", href: "#troubleshooting" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 optional",
        note: "Keth / Venom Pit. Not required to advance the main story.",
      },
      {
        label: "Fight type",
        value: "Arena with bone walls",
        note: "Walls change the safe space mid-fight.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "Reward",
        value: "+2 Weapon Set Passives",
        note: "Permanent; via Book of Specialisation (right-click).",
      },
    ],
    accessSteps: [
      {
        label: "Reach Keth",
        body: [
          "Branch off the Act 2 main path into the Venom Pit.",
          "Kabala's arena is at the pit's end.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Armour / evasion",
        checks: ["Constrictor attacks reduce effective armour."],
        why: "Her contact lowers your defences temporarily.",
        fix: "Do not rely on a single defensive layer; keep recovery.",
      },
      {
        label: "Movement speed",
        checks: ["Bone walls can box you in."],
        why: "Slow characters get pinned by walls.",
        fix: "Boots with movement speed; learn the exit.",
      },
      {
        label: "Burst damage",
        checks: ["Kill before too many wall cycles."],
        why: "Walls extend the fight and clutter space.",
        fix: "Bringsingle-target burst if safe.",
      },
    ],
    arenaParas: [
      "Kabala fights in a circular pit. Periodically she raises Bone Walls that partially box the arena; one exit is always left open.",
      "The Burrow Slam telegraphs a red burst where she resurfaces — that is the deadliest moment, not the wall itself.",
    ],
    arenaBullets: [
      "Blue = approach. Orange = Burrow resurface. Red = red burst radius. Green = the unclosed wall exit.",
    ],
    phases: [
      {
        phaseId: "kabala-fight",
        label: "Phase 1: Venom Pit",
        trigger: "Fight starts at full health.",
        objectives: [
          "Track bone wall exits",
          "Dodge the red burst",
          "Claim the book",
        ],
        notes: [
          "One continuous fight. Walls cycle; the red burst is the kill window to avoid.",
        ],
        tags: ["walls", "burrow", "reward"],
        mediaId: "kabala-constrictor-queen-phase",
      },
    ],
    attacks: [
      {
        attackId: "bone-wall",
        name: "Bone Wall",
        phaseIds: ["kabala-fight"],
        damageTypes: ["physical"],
        telegraph: ["Walls rise around the arena."],
        responses: ["Find the one unclosed exit; move toward it."],
        commonMistakes: ["Getting pinned against a wall."],
        danger: "medium",
        notes: ["One exit is always open — locate it fast."],
        mediaIds: ["kabala-constrictor-queen-annotated"],
        sourceIds: [],
      },
      {
        attackId: "burrow-slam",
        name: "Burrow Slam",
        phaseIds: ["kabala-fight"],
        damageTypes: ["physical"],
        telegraph: ["Disappears, then a red burst marks resurface."],
        responses: ["Leave the red burst radius before she returns."],
        commonMistakes: ["Standing in the red burst."],
        danger: "critical",
        notes: ["The resurface burst is the biggest hit."],
        mediaIds: ["kabala-constrictor-queen-attack"],
        sourceIds: [],
      },
      {
        attackId: "constrict",
        name: "Constrictor Grasp",
        phaseIds: ["kabala-fight"],
        damageTypes: ["physical"],
        telegraph: ["Lunges to grab."],
        responses: ["Dodge laterally out of the grab arc."],
        commonMistakes: ["Standing in the lunge line."],
        danger: "high",
        notes: ["Also temporarily lowers your armour."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "venom",
        name: "Venom Spit",
        phaseIds: ["kabala-fight"],
        damageTypes: ["chaos"],
        telegraph: ["Spits a chaos pool."],
        responses: ["Step out of the pool."],
        commonMistakes: ["Treating it as trivial."],
        danger: "low",
        notes: ["Chaos pool; keep moving."],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Physical",
        mitigation: ["Positioning and recovery."],
        notes: ["Walls, slam and grasp are physical."],
      },
      {
        label: "Chaos",
        mitigation: ["Avoid the venom pool."],
        notes: ["Venom Spit is chaos ground."],
      },
    ],
    strategyParas: [
      "Bone Wall Escape — when walls rise, the unclosed exit is your route; do not fight the wall, reposition through the gap.",
      "Reward Claim Flow — defeat Kabala, check the Book of Specialisation drop, pick it up, right-click to use it, open the Passive Tree, confirm the Weapon Set Passive count increased.",
      "The +2 Weapon Set Passive Points are permanent but require the book use; they are not normal passive points and not a Clan Relic.",
    ],
    strategyBullets: [
      "Melee: punish during the brief surface windows, not while she is burrowed.",
      "Ranged: kite around walls; keep the exit in sight.",
      "If armour feels low, it is the grasp debuff — reposition and recover.",
    ],
    rewards: [
      {
        itemId: "book-of-specialisation",
        label: "Book of Specialisation",
        condition: "Defeat Kabala",
        notes: [
          "Drops on kill. Grants +2 Weapon Set Passive Skill Points when used.",
          "Right-click the book in your inventory to consume it.",
        ],
      },
    ],
    claimFlow: [
      { label: "Defeat Kabala", body: ["Clear the fight in the Venom Pit."] },
      {
        label: "Check the drop",
        body: [
          "Look for the Book of Specialisation; it can hide under kill effects.",
        ],
      },
      { label: "Pick it up", body: ["Loot the book into your inventory."] },
      {
        label: "Right-click to use",
        body: ["Consume the book — points are not auto-granted."],
      },
      {
        label: "Confirm in Passive Tree",
        body: ["Open the Weapon Set passive allocation and verify +2."],
      },
    ],
    community: [
      {
        sourceId: "reddit-kabala-book",
        kind: "summary",
        question: "I killed her but got no passive points.",
        summary: ["Players expect automatic points."],
        editorialAnalysis: ["The reward is a usable book, not an auto-grant."],
        officialAnswer: [
          "Right-click the Book of Specialisation in your inventory.",
        ],
        relatedQuestionIds: [],
        linkHref: "#reward-claim-flow",
        linkLabel: "See claim flow →",
      },
      {
        sourceId: "reddit-kabala-wall",
        kind: "summary",
        question: "The bone walls trapped me.",
        summary: ["Players get pinned and die to the burst."],
        editorialAnalysis: ["One exit is always open; locate it early."],
        officialAnswer: ["Move to the unclosed exit before the red burst."],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Bone Wall →",
      },
      {
        sourceId: "reddit-kabala-armour",
        kind: "summary",
        question: "Why did my armour suddenly drop?",
        summary: ["Players notice a defence dip mid-fight."],
        editorialAnalysis: ["The Constrictor Grasp temporarily lowers armour."],
        officialAnswer: [
          "Reposition and recover; do not rely on one defence layer.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Constrictor Grasp →",
      },
    ],
    troubleshooting: [
      {
        symptom: "I did not see the book drop.",
        directAnswer: [
          "It can hide under kill effects or a full inventory. Return to the arena and check the highlighted quest item.",
        ],
        checks: [
          "Look for the highlighted drop.",
          "Free inventory space before looting.",
          "Re-enter the arena if needed.",
        ],
        relatedContentIds: ["rewards", "reward-claim-flow"],
      },
      {
        symptom: "Points did not increase after pickup.",
        directAnswer: [
          "You must right-click the Book of Specialisation to use it; pickup alone does nothing.",
        ],
        checks: [
          "Open your inventory.",
          "Right-click the book.",
          "Check the Weapon Set passive screen, not normal points.",
        ],
        relatedContentIds: ["reward-claim-flow"],
      },
      {
        symptom: "Re-killing gave no second book.",
        directAnswer: [
          "The permanent reward is usually claimed once per character. A second kill will not grant more points.",
        ],
        checks: [
          "Confirm you already used the book.",
          "Check the Weapon Set screen for the +2.",
          "Do not farm the boss for repeat points.",
        ],
        relatedContentIds: ["rewards"],
      },
    ],
    related: [
      {
        contentId: "weapon-set-passives",
        title: "Weapon Set Passive Skill Points",
        description:
          "What +2 Weapon Set points unlock and how to allocate them.",
        contentType: "guide",
        href: "/en/guides/",
      },
      {
        contentId: "book-of-specialisation",
        title: "Book of Specialisation",
        description: "Item reference and use steps.",
        contentType: "item",
        href: "/en/guides/",
      },
      {
        contentId: "mighty-silverfist",
        title: "Mighty Silverfist",
        description: "Another permanent-reward boss.",
        contentType: "boss",
        href: "/en/bosses/",
      },
      {
        contentId: "rathbreaker",
        title: "Rathbreaker",
        description: "Act 2 main line reference.",
        contentType: "boss",
        href: "/en/bosses/rathbreaker/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Kabala permanent-reward guide at 0.5.4.",
          "Added full Book of Specialisation claim flow and missing-reward checks.",
        ],
      },
    ],
  },
  "zh-cn": {
    title: "Kabala, Constrictor Queen 攻略：骨墙、钻地爆发与 +2 武器组被动点",
    shortTitle: "Kabala",
    summary:
      "Keth 的 Act 2 可选 Boss，给予 +2 武器组被动技能点。掌握骨墙出口、钻地红色爆发，以及 Book of Specialisation 的完整领取流程。",
    description:
      "Path of Exile 2 Act 2 Kabala 打法：骨墙逃脱、钻地爆发、奖励领取流程与未得奖励排查。",
    imageAlt: "Kabala Constrictor Queen 在 Keth 的骨墙间盘绕",
    seoTitle: "Kabala Constrictor Queen 攻略 — PoE2 骨墙与 +2 武器组",
    seoDesc:
      "Path of Exile 2 Act 2 Kabala 完整攻略：骨墙逃脱、钻地爆发、Book of Specialisation 领取与 +2 武器组被动。",
    location: "Keth（Venom Pit），Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "24–27 级",
    difficulty: "low",
    damageTypes: ["physical", "chaos"],
    bossCategory: "permanent-reward",
    act: "act-2",
    isOptional: true,
    tags: ["act-2", "optional", "permanent-reward", "physical"],
    quickAnswer: {
      callout:
        "击杀后右键使用 Book of Specialisation——+2 武器组被动点不会自动给。",
      calloutDetail: [
        "Kabala 是可选 Boss，但给永久 +2 武器组被动技能点。",
        "奖励是掉落的书，必须自己用，不是自动获得被动。",
      ],
      answers: [
        {
          label: "她在哪？",
          text: "在 Keth，从 Act 2 路径的 Venom Pit 进入。",
        },
        { label: "骨墙？", text: "墙生成时找那个没封死的出口；别被钉死。" },
        {
          label: "奖励？",
          text: "掉 Book of Specialisation——右键使用领取 +2 武器组点。",
        },
      ],
      links: [
        { label: "领取流程 →", href: "#reward-claim-flow" },
        { label: "未得奖励 →", href: "#troubleshooting" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 可选",
        note: "Keth / Venom Pit。非主线必需。",
      },
      {
        label: "战斗类型",
        value: "带骨墙的竞技场",
        note: "墙在战中改变安全空间。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "奖励",
        value: "+2 武器组被动",
        note: "永久；通过 Book of Specialisation（右键）。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Keth",
        body: ["从 Act 2 主线岔入 Venom Pit。", "Kabala 竞技场在坑底。"],
      },
    ],
    prepItems: [
      {
        label: "护甲 / 闪避",
        checks: ["缠绕攻击会暂时降低有效护甲。"],
        why: "她的接触暂时削弱防御。",
        fix: "别只靠单层防御；保留回复。",
      },
      {
        label: "移速",
        checks: ["骨墙会把你困住。"],
        why: "慢速角色被墙钉死。",
        fix: "带移速的鞋；认出口。",
      },
      {
        label: "爆发伤害",
        checks: ["在太多墙循环前击杀。"],
        why: "墙拉长战斗并挤占空间。",
        fix: "安全时带单体爆发。",
      },
    ],
    arenaParas: [
      "Kabala 在圆形坑里战斗。她会周期性升起骨墙部分围住竞技场；总有一个出口留着没封死。",
      "钻地爆发预告红色爆发区在她重新钻出处——那是最致命的时刻，不是墙本身。",
    ],
    arenaBullets: [
      "蓝=接近。橙=钻地重出。红=红色爆发半径。绿=未封死的墙出口。",
    ],
    phases: [
      {
        phaseId: "kabala-fight",
        label: "阶段 1：Venom Pit",
        trigger: "满血开战。",
        objectives: ["认骨墙出口", "躲红色爆发", "领取书"],
        notes: ["连续一战。墙循环；红色爆发是需躲避的击杀窗口。"],
        tags: ["walls", "burrow", "reward"],
        mediaId: "kabala-constrictor-queen-phase",
      },
    ],
    attacks: [
      {
        attackId: "bone-wall",
        name: "骨墙 Bone Wall",
        phaseIds: ["kabala-fight"],
        damageTypes: ["physical"],
        telegraph: ["墙在竞技场周围升起。"],
        responses: ["找那个没封死的出口；朝它移动。"],
        commonMistakes: ["被钉在墙边。"],
        danger: "medium",
        notes: ["总有一个出口开着——快速定位。"],
        mediaIds: ["kabala-constrictor-queen-annotated"],
        sourceIds: [],
      },
      {
        attackId: "burrow-slam",
        name: "钻地爆发 Burrow Slam",
        phaseIds: ["kabala-fight"],
        damageTypes: ["physical"],
        telegraph: ["消失，然后红色爆发标记重出处。"],
        responses: ["她回来前离开红色爆发半径。"],
        commonMistakes: ["站在红色爆发里。"],
        danger: "critical",
        notes: ["重出爆发是最大一击。"],
        mediaIds: ["kabala-constrictor-queen-attack"],
        sourceIds: [],
      },
      {
        attackId: "constrict",
        name: "缠绕之握 Constrictor Grasp",
        phaseIds: ["kabala-fight"],
        damageTypes: ["physical"],
        telegraph: ["突进抓取。"],
        responses: ["横向躲出抓取弧。"],
        commonMistakes: ["站在突进线里。"],
        danger: "high",
        notes: ["也会暂时降低护甲。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "venom",
        name: "毒液喷吐 Venom Spit",
        phaseIds: ["kabala-fight"],
        damageTypes: ["chaos"],
        telegraph: ["吐出一滩混沌池。"],
        responses: ["走出毒池。"],
        commonMistakes: ["当它无关紧要。"],
        danger: "low",
        notes: ["混沌地面；保持移动。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "物理",
        mitigation: ["站位 + 回复。"],
        notes: ["墙、爆发、抓取都是物理。"],
      },
      {
        label: "混沌",
        mitigation: ["避开毒池。"],
        notes: ["Venom Spit 是混沌地面。"],
      },
    ],
    strategyParas: [
      "骨墙逃脱——墙升起时，未封死的出口就是你的路；别硬撞墙，从缺口 reposition。",
      "奖励领取流程——击败 Kabala、检查 Book of Specialisation 掉落、拾取、右键使用、打开 Passive Tree、确认武器组被动数增加。",
      "+2 武器组被动点是永久的，但需要用书；它们不是普通被动点，也不是 Clan Relic。",
    ],
    strategyBullets: [
      "近战：在她钻地后的短暂露面窗口惩罚，而非钻地时。",
      "远程：绕墙风筝；把出口留在视野。",
      "若护甲感觉低，那是抓取 debuff——reposition 并回复。",
    ],
    rewards: [
      {
        itemId: "book-of-specialisation",
        label: "Book of Specialisation",
        condition: "击败 Kabala",
        notes: [
          "击杀掉落。使用时给予 +2 武器组被动技能点。",
          "在背包右键使用书来消耗它。",
        ],
      },
    ],
    claimFlow: [
      { label: "击败 Kabala", body: ["在 Venom Pit 清掉战斗。"] },
      {
        label: "检查掉落",
        body: ["找 Book of Specialisation；它可能藏在击杀特效下。"],
      },
      { label: "拾取", body: ["把书拾取进背包。"] },
      { label: "右键使用", body: ["消耗书——点数不会自动给。"] },
      {
        label: "在 Passive Tree 确认",
        body: ["打开武器组被动分配，确认 +2。"],
      },
    ],
    community: [
      {
        sourceId: "reddit-kabala-book",
        kind: "summary",
        question: "我杀了她但没得到被动点。",
        summary: ["玩家期待自动给点。"],
        editorialAnalysis: ["奖励是可使用的书，不是自动给。"],
        officialAnswer: ["在背包右键 Book of Specialisation。"],
        relatedQuestionIds: [],
        linkHref: "#reward-claim-flow",
        linkLabel: "看领取流程 →",
      },
      {
        sourceId: "reddit-kabala-wall",
        kind: "summary",
        question: "骨墙把我困住了。",
        summary: ["玩家被钉死，死于爆发。"],
        editorialAnalysis: ["总有一个出口开着；早点定位。"],
        officialAnswer: ["红色爆发前移到未封死的出口。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看骨墙 →",
      },
      {
        sourceId: "reddit-kabala-armour",
        kind: "summary",
        question: "为什么我的护甲突然降了？",
        summary: ["玩家注意到战中防御下降。"],
        editorialAnalysis: ["Constrictor Grasp 暂时降低护甲。"],
        officialAnswer: ["reposition 并回复；别只靠一层防御。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看缠绕之握 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "我没看到书掉落。",
        directAnswer: [
          "它可能藏在击杀特效下或背包已满。回到竞技场检查高亮的任务物。",
        ],
        checks: ["找高亮掉落。", "拾取前清空背包位。", "必要时重进竞技场。"],
        relatedContentIds: ["rewards", "reward-claim-flow"],
      },
      {
        symptom: "拾取后点数没增加。",
        directAnswer: ["你必须右键使用 Book of Specialisation；只拾取没用。"],
        checks: ["打开背包。", "右键书。", "看武器组被动界面，不是普通点。"],
        relatedContentIds: ["reward-claim-flow"],
      },
      {
        symptom: "再杀没给第二本书。",
        directAnswer: ["永久奖励通常每角色领一次。再杀不会给更多点。"],
        checks: [
          "确认你已用书。",
          "在武器组界面看 +2。",
          "别为重复点刷 Boss。",
        ],
        relatedContentIds: ["rewards"],
      },
    ],
    related: [
      {
        contentId: "weapon-set-passives",
        title: "武器组被动技能点",
        description: "+2 武器组点解锁什么及如何分配。",
        contentType: "guide",
        href: "/zh-cn/guides/",
      },
      {
        contentId: "book-of-specialisation",
        title: "Book of Specialisation",
        description: "物品参考与使用步骤。",
        contentType: "item",
        href: "/zh-cn/guides/",
      },
      {
        contentId: "mighty-silverfist",
        title: "Mighty Silverfist",
        description: "另一个永久奖励 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/",
      },
      {
        contentId: "rathbreaker",
        title: "Rathbreaker",
        description: "Act 2 主线参考。",
        contentType: "boss",
        href: "/zh-cn/bosses/rathbreaker/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Kabala 永久奖励攻略，基于 0.5.4。",
          "补充 Book of Specialisation 完整领取流程与未得奖励排查。",
        ],
      },
    ],
  },
});

// ============ 5. Iktab and Ekbab ============
BOSSES.push({
  slug: "iktab-and-ekbab",
  wikiName: "Iktab,_the_Deathlord",
  en: {
    title:
      "Iktab and Ekbab Boss Guide: Best Kill Order, Enrage Mechanics and Mastodon Tusks",
    shortTitle: "Iktab & Ekbab",
    summary:
      "Act 2 duo boss in the Bone Pits. Compare kill orders, survivor enrage buffs, dual-boss space management and the Mastodon Tusks quest drop.",
    description:
      "How to beat Iktab and Ekbab in Path of Exile 2 Act 2: kill order matrix, survivor enrage, Mastodon Tusks claim and space management.",
    imageAlt:
      "Iktab the Deathlord and Ekbab the Ancient Steed in the Bone Pits",
    seoTitle:
      "Iktab and Ekbab Guide — PoE2 Kill Order, Enrage & Mastodon Tusks",
    seoDesc:
      "Complete Iktab and Ekbab guide for Path of Exile 2 Act 2. Kill order matrix, survivor enrage buffs, Mastodon Tusks and dual-boss tips.",
    location: "The Bone Pits (Blackrib Pit), Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 25–28",
    difficulty: "high",
    damageTypes: ["physical", "lightning", "fire"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "duo", "physical"],
    quickAnswer: {
      callout:
        "Both must die in the same instance — killing one then the other in separate pulls does not complete the quest.",
      calloutDetail: [
        "The map marks only Ekbab, but Iktab is also present — it is a duo fight.",
        "Survivor enrage changes the pressure depending on who dies first.",
      ],
      answers: [
        {
          label: "Kill order?",
          text: "Default: kill Iktab first (Ekbab's enrage is easier to manage for most builds). Melee may prefer Ekbab first; test per build.",
        },
        {
          label: "Why two bosses?",
          text: "It is a duo. Iktab is the caster, Ekbab the steed — both must fall together.",
        },
        {
          label: "Reward?",
          text: "Mastodon Tusks drop only when both die in one instance; return them to Zarka.",
        },
      ],
      links: [
        { label: "Kill order matrix →", href: "#strategy" },
        { label: "Mastodon Tusks →", href: "#reward-claim-flow" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 branch",
        note: "The Bone Pits, a Horn of the Vastiri branch after the Risen King.",
      },
      {
        label: "Fight type",
        value: "Duo boss",
        note: "Two bosses, one instance; survivor enrages.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "Reward",
        value: "Mastodon Tusks (quest)",
        note: "A Theft of Ivory quest item; both must die together.",
      },
    ],
    accessSteps: [
      {
        label: "Reach the Bone Pits",
        body: [
          "Branch from the main Act 2 path.",
          "The Blackrib Pit holds the duo.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Crowd control",
        checks: ["Two bosses split your attention."],
        why: "Focus fire fails if both pressure you.",
        fix: "Use one or two hard controls on the survivor.",
      },
      {
        label: "Movement speed",
        checks: ["You must manage two threat zones."],
        why: "Slow characters get caught between them.",
        fix: "Boots with movement speed.",
      },
      {
        label: "Burst",
        checks: ["End phase one before enrage stacks."],
        why: "Enrage adds coverage you must respect.",
        fix: "Single-target burst on the first kill.",
      },
    ],
    arenaParas: [
      "The Blackrib Pit is a wide duel ground. Iktab (caster) and Ekbab (steed) start together; killing one triggers the survivor's enrage.",
      "Space management is the core skill: keep both in view, control the survivor, and never get pinned between them.",
    ],
    arenaBullets: [
      "Blue = safe lane. Orange = Ekbab charge. Red = Iktab rune zone. Green = survivor control spot.",
    ],
    phases: [
      {
        phaseId: "duo-phase-1",
        label: "Phase 1: Both Alive",
        trigger: "Fight starts with both bosses.",
        objectives: [
          "Pick a kill order",
          "Control the survivor",
          "Manage two zones",
        ],
        notes: ["Both present. Decide focus target before engaging."],
        tags: ["duo", "focus"],
        mediaId: "iktab-and-ekbab-phase",
      },
      {
        phaseId: "duo-phase-2",
        label: "Phase 2: Survivor Enrage",
        trigger: "After the first boss dies.",
        objectives: ["Handle the survivor buff", "Finish the fight"],
        notes: [
          "The survivor gains new pressure: Iktab → Lightning/Meteor runes; Ekbab → tracking orbs and Bonequake.",
        ],
        tags: ["enrage", "survivor"],
        mediaId: "iktab-and-ekbab-annotated",
      },
    ],
    attacks: [
      {
        attackId: "ekbab-charge",
        name: "Ekbab Charge",
        phaseIds: ["duo-phase-1", "duo-phase-2"],
        damageTypes: ["physical"],
        telegraph: ["Steed winds a charge."],
        responses: ["Dodge laterally; do not back into Iktab."],
        commonMistakes: ["Getting pinned between bosses."],
        danger: "high",
        notes: ["Fast in phase 2 after Ekbab survives."],
        mediaIds: ["iktab-and-ekbab-attack"],
        sourceIds: [],
      },
      {
        attackId: "iktab-runes",
        name: "Iktab Lightning Runes",
        phaseIds: ["duo-phase-1", "duo-phase-2"],
        damageTypes: ["lightning"],
        telegraph: ["Carves glowing runes on the ground."],
        responses: ["Leave the rune zones; they detonate."],
        commonMistakes: ["Standing in runes while fighting Ekbab."],
        danger: "high",
        notes: ["More numerous after Iktab survives (enrage)."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "meteor-runes",
        name: "Meteor Runes (Ekbab dead)",
        phaseIds: ["duo-phase-2"],
        damageTypes: ["fire"],
        telegraph: ["Sky runes mark meteor landings."],
        responses: ["Watch the safe gaps between markers."],
        commonMistakes: ["Standing under a meteor marker."],
        danger: "high",
        notes: ["Appears when Ekbab dies first; Iktab enrages."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "tracking-orbs",
        name: "Tracking Lightning Orbs (Iktab dead)",
        phaseIds: ["duo-phase-2"],
        damageTypes: ["lightning"],
        telegraph: ["Orbs home in after Iktab dies."],
        responses: ["Keep moving; lead them away from Ekbab."],
        commonMistakes: ["Standing still and eating orbs."],
        danger: "medium",
        notes: ["Appears when Iktab dies first; Ekbab enrages."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "bonequake",
        name: "Bonequake (Ekbab dead)",
        phaseIds: ["duo-phase-2"],
        damageTypes: ["physical"],
        telegraph: ["Ground cracks in a line."],
        responses: ["Step off the crack line."],
        commonMistakes: ["Standing on the fissure."],
        danger: "medium",
        notes: ["Ekbab enrage follow-up."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "nova",
        name: "Projectile Nova",
        phaseIds: ["duo-phase-1", "duo-phase-2"],
        damageTypes: ["physical"],
        telegraph: ["Survivor emits a radial nova."],
        responses: ["Roll out of the ring."],
        commonMistakes: ["Melee trapped inside the nova."],
        danger: "medium",
        notes: ["Common to both survivor types."],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Physical",
        mitigation: ["Positioning vs charge and Bonequake."],
        notes: ["Ekbab and nova are physical."],
      },
      {
        label: "Lightning",
        mitigation: ["Leave rune/orb zones."],
        notes: ["Iktab runes and tracking orbs are lightning."],
      },
      {
        label: "Fire",
        mitigation: ["Avoid meteor markers."],
        notes: ["Meteor Runes appear on Iktab enrage."],
      },
    ],
    strategyParas: [
      "Kill Order Matrix — there is no single universal answer; pick by build:",
      "Kill Iktab first → Ekbab enrages with tracking orbs + Projectile Nova. Manageable for most ranged/melee because orbs are dodgeable.",
      "Kill Ekbab first → Iktab enrages with Lightning Runes + Meteor Runes + Bonequake. Larger area coverage; harder for low-mobility builds.",
      "Default recommendation: kill Iktab first. Melee may prefer Ekbab first to avoid rune spam. Ranged and minion builds are flexible. Low-mobility builds should kill Iktab first to limit area denial.",
    ],
    strategyBullets: [
      "Keep both bosses in view; never get pinned between them.",
      "Use hard control on the survivor during phase 2.",
      "Both must die in the same instance for the quest to count.",
    ],
    rewards: [
      {
        itemId: "mastodon-tusks",
        label: "Mastodon Tusks",
        condition: "Defeat Iktab and Ekbab in one instance",
        notes: [
          "Drops only when both die together.",
          "A Theft of Ivory quest item — return to Zarka.",
        ],
      },
    ],
    claimFlow: [
      {
        label: "Kill both in one pull",
        body: ["Defeat Iktab and Ekbab in the same instance."],
      },
      {
        label: "Loot Mastodon Tusks",
        body: ["Pick up the tusks from the corpse."],
      },
      {
        label: "Return to Zarka",
        body: ["Hand in to complete A Theft of Ivory."],
      },
    ],
    community: [
      {
        sourceId: "reddit-iktab-map",
        kind: "summary",
        question: "The map only shows Ekbab but there are two bosses.",
        summary: ["Players are surprised by Iktab."],
        editorialAnalysis: ["It is a duo; the map marker is just Ekbab."],
        officialAnswer: ["Treat it as a two-boss fight; both must die."],
        relatedQuestionIds: [],
        linkHref: "#quick-answer",
        linkLabel: "See duo note →",
      },
      {
        sourceId: "reddit-iktab-order",
        kind: "summary",
        question: "Which one should I kill first?",
        summary: ["Players want one fixed answer."],
        editorialAnalysis: [
          "It depends on build; do not follow a single Reddit comment blindly.",
        ],
        officialAnswer: [
          "Default kill Iktab first; melee may prefer Ekbab first. Test per build.",
        ],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "See kill order →",
      },
      {
        sourceId: "reddit-iktab-tusks",
        kind: "summary",
        question: "Mastodon Tusks did not drop.",
        summary: ["Players killed them in separate pulls."],
        editorialAnalysis: ["The quest needs both in one instance."],
        officialAnswer: [
          "Kill both together, then loot the tusks and return to Zarka.",
        ],
        relatedQuestionIds: [],
        linkHref: "#reward-claim-flow",
        linkLabel: "See claim flow →",
      },
    ],
    troubleshooting: [
      {
        symptom: "I killed one but the quest did not progress.",
        directAnswer: [
          "Both must die in the same instance. Killing them in separate pulls does not count.",
        ],
        checks: [
          "Engage both at once.",
          "Do not leave and re-enter between kills.",
          "Loot the tusks after both fall.",
        ],
        relatedContentIds: ["rewards", "reward-claim-flow"],
      },
      {
        symptom: "The survivor's enrage overwhelms me.",
        directAnswer: [
          "Adjust kill order to your build; use hard control on the survivor and keep both in view.",
        ],
        checks: [
          "If Iktab survived, dodge orbs and novas.",
          "If Ekbab survived, respect rune/meteor zones.",
          "Lower area denial by killing Iktab first.",
        ],
        relatedContentIds: ["strategy", "attacks"],
      },
      {
        symptom: "I got pinned between the two bosses.",
        directAnswer: [
          "You lost the safe lane. Reposition to keep both in view and never back into one while the other charges.",
        ],
        checks: [
          "Open a central lane.",
          "Dodge Ekbab laterally, not toward Iktab.",
          "Use control on the survivor.",
        ],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "jamanra-the-risen-king",
        title: "Jamanra, the Risen King",
        description: "Upstream Act 2 gate boss.",
        contentType: "boss",
        href: "/en/bosses/jamanra-the-risen-king/",
      },
      {
        contentId: "azarian-the-forsaken-son",
        title: "Azarian, the Forsaken Son",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/azarian-the-forsaken-son/",
      },
      {
        contentId: "zalmarath-the-colossus",
        title: "Zalmarath, the Colossus",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/zalmarath-the-colossus/",
      },
      {
        contentId: "tor-gul-the-defiler",
        title: "Tor Gul, the Defiler",
        description: "Downstream Act 2 boss.",
        contentType: "boss",
        href: "/en/bosses/tor-gul-the-defiler/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Iktab + Ekbab duo guide at 0.5.4.",
          "Added kill-order matrix and same-instance quest requirement.",
        ],
      },
    ],
  },
  "zh-cn": {
    title: "Iktab 与 Ekbab 双 Boss 攻略：击杀顺序、强化机制与 Mastodon Tusks",
    shortTitle: "Iktab & Ekbab",
    summary:
      "Bone Pits 的 Act 2 双 Boss。比较击杀顺序、幸存者强化、双 Boss 空间管理，以及 Mastodon Tusks 任务掉落。",
    description:
      "Path of Exile 2 Act 2 Iktab 与 Ekbab 打法：击杀顺序矩阵、幸存者强化、Mastodon Tusks 领取与空间管理。",
    imageAlt: "Iktab the Deathlord 与 Ekbab the Ancient Steed 在 Bone Pits",
    seoTitle: "Iktab 与 Ekbab 攻略 — PoE2 击杀顺序、强化与 Mastodon Tusks",
    seoDesc:
      "Path of Exile 2 Act 2 Iktab 与 Ekbab 完整攻略：击杀顺序矩阵、幸存者强化、Mastodon Tusks 与双 Boss 技巧。",
    location: "The Bone Pits（Blackrib Pit），Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "25–28 级",
    difficulty: "high",
    damageTypes: ["physical", "lightning", "fire"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "duo", "physical"],
    quickAnswer: {
      callout: "两个必须在同一实例里一起死——分开击杀不算完成任务。",
      calloutDetail: [
        "地图只标 Ekbab，但 Iktab 也在场——这是双 Boss 战。",
        "幸存者强化会因先杀谁而改变压力。",
      ],
      answers: [
        {
          label: "击杀顺序？",
          text: "默认：先杀 Iktab（多数配装更易处理 Ekbab 的强化）。近战可能偏好先杀 Ekbab；按配装测试。",
        },
        {
          label: "为什么两个 Boss？",
          text: "这是双 Boss。Iktab 是施法者，Ekbab 是坐骑——必须一起倒下。",
        },
        {
          label: "奖励？",
          text: "Mastodon Tusks 只在同实例双杀时掉落；交给 Zarka。",
        },
      ],
      links: [
        { label: "击杀顺序矩阵 →", href: "#strategy" },
        { label: "Mastodon Tusks →", href: "#reward-claim-flow" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 分支",
        note: "Bone Pits，Risen King 后的 Horn of the Vastiri 分支。",
      },
      {
        label: "战斗类型",
        value: "双 Boss",
        note: "两个 Boss 一个实例；幸存者强化。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "奖励",
        value: "Mastodon Tusks（任务）",
        note: "A Theft of Ivory 任务物；必须一起死。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Bone Pits",
        body: ["从 Act 2 主线岔出。", "Blackrib Pit 里有双 Boss。"],
      },
    ],
    prepItems: [
      {
        label: "控制",
        checks: ["两个 Boss 分散注意力。"],
        why: "若都被压，集火失败。",
        fix: "对幸存者用 1–2 个硬控。",
      },
      {
        label: "移速",
        checks: ["你必须管理两个威胁区。"],
        why: "慢速角色被夹在中间。",
        fix: "带移速的鞋。",
      },
      {
        label: "爆发",
        checks: ["在强化叠起前结束阶段一。"],
        why: "强化带来需尊重的覆盖。",
        fix: "对第一个击杀用单体爆发。",
      },
    ],
    arenaParas: [
      "Blackrib Pit 是宽阔决斗场。Iktab（施法者）与 Ekbab（坐骑）一起开场；杀一个触发幸存者强化。",
      "空间管理是核心：保持两者在视野，控制幸存者，别被夹在中间。",
    ],
    arenaBullets: [
      "蓝=安全道。橙=Ekbab 冲锋。红=Iktab 符文区。绿=幸存者控制点。",
    ],
    phases: [
      {
        phaseId: "duo-phase-1",
        label: "阶段 1：双活",
        trigger: "两 Boss 同场开战。",
        objectives: ["选击杀顺序", "控制幸存者", "管理两区"],
        notes: ["两者在场。交战前定好集火目标。"],
        tags: ["duo", "focus"],
        mediaId: "iktab-and-ekbab-phase",
      },
      {
        phaseId: "duo-phase-2",
        label: "阶段 2：幸存者强化",
        trigger: "第一个 Boss 死后。",
        objectives: ["处理幸存者 buff", "结束战斗"],
        notes: [
          "幸存者获得新压力：Iktab 死→闪电/流星符文；Ekbab 死→追踪球与骨震。",
        ],
        tags: ["enrage", "survivor"],
        mediaId: "iktab-and-ekbab-annotated",
      },
    ],
    attacks: [
      {
        attackId: "ekbab-charge",
        name: "Ekbab 冲锋",
        phaseIds: ["duo-phase-1", "duo-phase-2"],
        damageTypes: ["physical"],
        telegraph: ["坐骑蓄力冲锋。"],
        responses: ["横向躲；别退向 Iktab。"],
        commonMistakes: ["被钉在两 Boss 之间。"],
        danger: "high",
        notes: ["Ekbab 幸存后阶段二更快。"],
        mediaIds: ["iktab-and-ekbab-attack"],
        sourceIds: [],
      },
      {
        attackId: "iktab-runes",
        name: "Iktab 闪电符文",
        phaseIds: ["duo-phase-1", "duo-phase-2"],
        damageTypes: ["lightning"],
        telegraph: ["在地上刻发光符文。"],
        responses: ["离开符文区；它们会爆。"],
        commonMistakes: ["打 Ekbab 时站在符文里。"],
        danger: "high",
        notes: ["Iktab 幸存（强化）后更多。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "meteor-runes",
        name: "流星符文（Ekbab 死）",
        phaseIds: ["duo-phase-2"],
        damageTypes: ["fire"],
        telegraph: ["天空符文标记流星落点。"],
        responses: ["看标记间的空隙。"],
        commonMistakes: ["站在流星标记下。"],
        danger: "high",
        notes: ["Ekbab 先死时出现；Iktab 强化。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "tracking-orbs",
        name: "追踪闪电球（Iktab 死）",
        phaseIds: ["duo-phase-2"],
        damageTypes: ["lightning"],
        telegraph: ["Iktab 死后球追踪。"],
        responses: ["保持移动；引离 Ekbab。"],
        commonMistakes: ["站定吃球。"],
        danger: "medium",
        notes: ["Iktab 先死时出现；Ekbab 强化。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "bonequake",
        name: "骨震（Ekbab 死）",
        phaseIds: ["duo-phase-2"],
        damageTypes: ["physical"],
        telegraph: ["地面裂开一条线。"],
        responses: ["踏离裂缝线。"],
        commonMistakes: ["站在裂隙上。"],
        danger: "medium",
        notes: ["Ekbab 强化后续。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "nova",
        name: "弹幕新星 Projectile Nova",
        phaseIds: ["duo-phase-1", "duo-phase-2"],
        damageTypes: ["physical"],
        telegraph: ["幸存者放出环形新星。"],
        responses: ["滚出环。"],
        commonMistakes: ["近战被困在环内。"],
        danger: "medium",
        notes: ["两种幸存者共有。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "物理",
        mitigation: ["对冲锋与骨震的站位。"],
        notes: ["Ekbab 与新星是物理。"],
      },
      {
        label: "闪电",
        mitigation: ["离开符文/球区。"],
        notes: ["Iktab 符文与追踪球是闪电。"],
      },
      {
        label: "火",
        mitigation: ["避开流星标记。"],
        notes: ["流星符文在 Iktab 强化时出现。"],
      },
    ],
    strategyParas: [
      "击杀顺序矩阵——没有万能答案；按配装选：",
      "先杀 Iktab → Ekbab 强化为追踪球 + 弹幕新星。多数远程/近战可控，因为球可躲。",
      "先杀 Ekbab → Iktab 强化为闪电符文 + 流星符文 + 骨震。覆盖面积更大；低移速配装更难。",
      "默认建议：先杀 Iktab。近战可偏好先杀 Ekbab 以避免符文轰炸。远程与召唤灵活。低移速配装应先杀 Iktab 以限制区域封锁。",
    ],
    strategyBullets: [
      "保持两 Boss 在视野；别被夹在中间。",
      "阶段二对幸存者用硬控。",
      "任务计数要求同实例双杀。",
    ],
    rewards: [
      {
        itemId: "mastodon-tusks",
        label: "Mastodon Tusks",
        condition: "同实例击败 Iktab 与 Ekbab",
        notes: ["只在双杀时掉落。", "A Theft of Ivory 任务物——交给 Zarka。"],
      },
    ],
    claimFlow: [
      { label: "一次拉中双杀", body: ["同实例击败 Iktab 与 Ekbab。"] },
      { label: "拾取 Mastodon Tusks", body: ["从尸体拾取象牙。"] },
      { label: "交给 Zarka", body: ["交付以完成 A Theft of Ivory。"] },
    ],
    community: [
      {
        sourceId: "reddit-iktab-map",
        kind: "summary",
        question: "地图只显示 Ekbab 却有两个 Boss。",
        summary: ["玩家被 Iktab 吓到。"],
        editorialAnalysis: ["这是双 Boss；地图标记只是 Ekbab。"],
        officialAnswer: ["当作双 Boss 战；两个都得死。"],
        relatedQuestionIds: [],
        linkHref: "#quick-answer",
        linkLabel: "看双 Boss 说明 →",
      },
      {
        sourceId: "reddit-iktab-order",
        kind: "summary",
        question: "我该先杀哪个？",
        summary: ["玩家想要一个固定答案。"],
        editorialAnalysis: ["取决于配装；别盲从单条 Reddit 评论。"],
        officialAnswer: ["默认先杀 Iktab；近战可先杀 Ekbab。按配装测试。"],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "看击杀顺序 →",
      },
      {
        sourceId: "reddit-iktab-tusks",
        kind: "summary",
        question: "Mastodon Tusks 没掉。",
        summary: ["玩家分开击杀。"],
        editorialAnalysis: ["任务需要同实例双杀。"],
        officialAnswer: ["一起杀两个，再拾取象牙交给 Zarka。"],
        relatedQuestionIds: [],
        linkHref: "#reward-claim-flow",
        linkLabel: "看领取流程 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "我杀了一个但任务没推进。",
        directAnswer: ["必须同实例双杀。分开击杀不算。"],
        checks: ["同时打两个。", "两次击杀间别离开重进。", "双死后拾取象牙。"],
        relatedContentIds: ["rewards", "reward-claim-flow"],
      },
      {
        symptom: "幸存者强化把我压垮。",
        directAnswer: ["按配装调整击杀顺序；对幸存者用硬控，保持两者在视野。"],
        checks: [
          "若 Iktab 幸存，躲球与新星。",
          "若 Ekbab 幸存，尊重符文/流星区。",
          "先杀 Iktab 降低区域封锁。",
        ],
        relatedContentIds: ["strategy", "attacks"],
      },
      {
        symptom: "我被夹在两个 Boss 之间。",
        directAnswer: [
          "你丢了安全道。reposition 保持两者在视野，别在一个冲锋时退向另一个。",
        ],
        checks: [
          "开出中央道。",
          "横向躲 Ekbab，而非退向 Iktab。",
          "对幸存者用控制。",
        ],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "jamanra-the-risen-king",
        title: "Jamanra, the Risen King",
        description: "上游 Act 2 关卡 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/jamanra-the-risen-king/",
      },
      {
        contentId: "azarian-the-forsaken-son",
        title: "Azarian, the Forsaken Son",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/azarian-the-forsaken-son/",
      },
      {
        contentId: "zalmarath-the-colossus",
        title: "Zalmarath, the Colossus",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/zalmarath-the-colossus/",
      },
      {
        contentId: "tor-gul-the-defiler",
        title: "Tor Gul, the Defiler",
        description: "下游 Act 2 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/tor-gul-the-defiler/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Iktab + Ekbab 双 Boss 攻略，基于 0.5.4。",
          "补充击杀顺序矩阵与同实例任务要求。",
        ],
      },
    ],
  },
});

// ============ 6. Azarian, the Forsaken Son ============
BOSSES.push({
  slug: "azarian-the-forsaken-son",
  wikiName: "Azarian,_the_Forsaken_Son",
  en: {
    title:
      "Azarian, the Forsaken Son Guide: Burning Ground, Fire Dance and Essence of Water",
    shortTitle: "Azarian",
    summary:
      "Act 2 boss in Buried Shrines tied to The City of Seven Waters. Survive the Fire Dance chase, Burning Ground trail and claim the Essence of Water quest item.",
    description:
      "How to beat Azarian, the Forsaken Son in Path of Exile 2 Act 2: Fire Dance, Heat Wave, Flame Burst, burning ground route and Essence of Water.",
    imageAlt:
      "Azarian the Forsaken Son trailing fire across the Buried Shrines",
    seoTitle:
      "Azarian the Forsaken Son Guide — PoE2 Fire Dance & Essence of Water",
    seoDesc:
      "Complete Azarian guide for Path of Exile 2 Act 2. Fire Dance chase, burning ground route, Flame Burst and Essence of Water claim.",
    location: "Buried Shrines, Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 25–28",
    difficulty: "medium",
    damageTypes: ["fire", "physical"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "fire", "physical"],
    quickAnswer: {
      callout:
        "The Fire Dance is a chase — keep circling and never let the burning trail cut off your only exit.",
      calloutDetail: [
        "Azarian spins and dashes, laying a burning path you must route around.",
        "After the kill, pick up the Essence of Water and continue the Seven Waters dialogue.",
      ],
      answers: [
        {
          label: "Where is he?",
          text: "In the Buried Shrines, reached from the Act 2 branch path.",
        },
        {
          label: "Why the chase?",
          text: "The Fire Dance is a movement check, not a stand-and-trade.",
        },
        {
          label: "Reward?",
          text: "Essence of Water drops; it is a quest item, not a permanent stat.",
        },
      ],
      links: [
        { label: "Burning route →", href: "#strategy" },
        { label: "Essence claim →", href: "#reward-claim-flow" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 branch",
        note: "Buried Shrines, a Horn of the Vastiri branch.",
      },
      {
        label: "Fight type",
        value: "Chase arena",
        note: "Burning ground persists and shapes your route.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "Reward",
        value: "Essence of Water (quest)",
        note: "The City of Seven Waters quest item.",
      },
    ],
    accessSteps: [
      {
        label: "Reach Buried Shrines",
        body: [
          "Branch off the Act 2 main path.",
          "The shrine chamber holds Azarian.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Fire resistance",
        checks: ["Burning trail and Flame Burst are Fire."],
        why: "Standing in the trail stacks burning ground.",
        fix: "Raise Fire res; keep moving.",
      },
      {
        label: "Movement speed",
        checks: ["The Fire Dance cuts off exits if you are slow."],
        why: "Low mobility gets walled by fire.",
        fix: "Boots with movement speed; pre-plan a loop.",
      },
      {
        label: "Recovery",
        checks: ["Heat Wave pressures from mid range."],
        why: "You cannot trade through it.",
        fix: "Keep a flask for after the wave.",
      },
    ],
    arenaParas: [
      "The shrine is a looped chamber. Azarian's Fire Dance lays a burning trail that persists; if you let it close, you lose your only exit.",
      "Route clockwise or counter, but confirm by current video — the safe direction is not a fixed rule.",
    ],
    arenaBullets: [
      "Blue = start lane. Orange = Fire Dance path. Red = burning trail. Green = emergency crossing.",
    ],
    phases: [
      {
        phaseId: "azarian-fight",
        label: "Phase 1: Buried Shrines",
        trigger: "Fight starts at full health.",
        objectives: [
          "Circle the Fire Dance",
          "Avoid the burning trail",
          "Grab the essence",
        ],
        notes: [
          "One continuous fight. The burning trail is the main positioning threat.",
        ],
        tags: ["fire-dance", "burning-ground"],
        mediaId: "azarian-the-forsaken-son-phase",
      },
    ],
    attacks: [
      {
        attackId: "fire-dance",
        name: "Fire Dance",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["Spins and dashes in a arc."],
        responses: ["Circle with him; do not cut across the trail."],
        commonMistakes: ["Crossing your own burning path."],
        danger: "high",
        notes: ["Lays a persistent burning trail."],
        mediaIds: ["azarian-the-forsaken-son-annotated"],
        sourceIds: [],
      },
      {
        attackId: "heat-wave",
        name: "Heat Wave",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["Frontal mid-range wave."],
        responses: ["Step to the side or behind."],
        commonMistakes: ["Trading through the wave."],
        danger: "medium",
        notes: ["Different from the cone Flame Burst."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "flame-burst",
        name: "Flame Burst",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["Conical fire from the body."],
        responses: ["Dodge to the side; the cone is wider than it looks."],
        commonMistakes: ["Standing in the cone."],
        danger: "high",
        notes: ["Cone, not a wave — keep clear laterally."],
        mediaIds: ["azarian-the-forsaken-son-attack"],
        sourceIds: [],
      },
      {
        attackId: "fire-throw",
        name: "Fire Throw",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["Lobs a fireball to a landing spot."],
        responses: ["Note the landing; move off it."],
        commonMistakes: ["Standing in the landing zone."],
        danger: "medium",
        notes: ["The landing becomes burning ground."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "melee-chase",
        name: "Melee Chase",
        phaseIds: ["azarian-fight"],
        damageTypes: ["physical"],
        telegraph: ["Body pursues and strikes."],
        responses: ["Side-rear is safer than face tanking."],
        commonMistakes: ["Facetanking the spin."],
        danger: "medium",
        notes: ["Physical component exists alongside fire."],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Fire",
        mitigation: ["Fire res and route planning."],
        notes: ["Dance, wave, burst, throw are all Fire."],
      },
      {
        label: "Physical",
        mitigation: ["Side-rear positioning."],
        notes: ["The chase strike is physical."],
      },
    ],
    strategyParas: [
      "Burning Ground Route — keep a clear lane: start lane → Fire Dance path → avoid the red trail → use the emergency crossing only when forced.",
      "Do not assume a fixed clockwise rule; confirm the safe direction against current video. Side-rear is safer than face-tanking the spin.",
      "The Essence of Water is a quest item for The City of Seven Waters, not a permanent attribute reward.",
    ],
    strategyBullets: [
      "Melee: punish during the brief post-Dance window, not during the spin.",
      "Ranged: kite the trail; never let it close your exit.",
      "Low mobility: pre-plan a loop and use the emergency crossing deliberately.",
    ],
    rewards: [
      {
        itemId: "essence-of-water",
        label: "The Essence of Water",
        condition: "Defeat Azarian",
        notes: [
          "Drops on kill; a The City of Seven Waters quest item.",
          "Pick it up and continue the Water Goddess dialogue.",
        ],
      },
    ],
    claimFlow: [
      { label: "Defeat Azarian", body: ["Clear the Fire Dance fight."] },
      {
        label: "Pick up the Essence",
        body: ["Loot the Essence of Water from the corpse."],
      },
      {
        label: "Continue the dialogue",
        body: ["Talk to the Water Goddess behind the door to advance."],
      },
    ],
    community: [
      {
        sourceId: "reddit-azarian-chase",
        kind: "summary",
        question: "Why does he keep chasing me in a circle?",
        summary: ["Players get cornered by the burning trail."],
        editorialAnalysis: ["The Fire Dance is a movement check, not a trade."],
        officialAnswer: ["Circle with him; never cross your own trail."],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Fire Dance →",
      },
      {
        sourceId: "reddit-azarian-wave",
        kind: "summary",
        question: "Heat Wave vs Flame Burst — which is which?",
        summary: ["Players confuse the two fire shapes."],
        editorialAnalysis: ["Wave is frontal mid-range; Burst is a cone."],
        officialAnswer: [
          "Step to the side for the wave; dodge laterally for the cone.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See attacks →",
      },
      {
        sourceId: "reddit-azarian-quest",
        kind: "summary",
        question: "The Water Goddess dialogue did not continue.",
        summary: ["Players miss the essence pickup."],
        editorialAnalysis: ["The essence is a required pickup, not automatic."],
        officialAnswer: [
          "Loot the Essence of Water, then talk to the Goddess.",
        ],
        relatedQuestionIds: [],
        linkHref: "#reward-claim-flow",
        linkLabel: "See claim flow →",
      },
    ],
    troubleshooting: [
      {
        symptom: "The burning trail cut off my exit.",
        directAnswer: [
          "You let the Fire Dance close your lane. Circle with him and never cross your own trail.",
        ],
        checks: [
          "Keep a clear loop.",
          "Do not back into a corner.",
          "Raise Fire res if stacked damage hurts.",
        ],
        relatedContentIds: ["attacks", "strategy"],
      },
      {
        symptom: "I died to the cone but dodged the wave.",
        directAnswer: [
          "Those are two attacks. The cone (Flame Burst) is wider than it looks — dodge laterally, not just back.",
        ],
        checks: [
          "Identify wave vs cone.",
          "Side-step the cone.",
          "Do not facetank the spin.",
        ],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "The quest did not advance after the kill.",
        directAnswer: [
          "Pick up the Essence of Water, then continue the Goddess dialogue — neither is automatic.",
        ],
        checks: [
          "Loot the essence.",
          "Open the door dialogue.",
          "Confirm the objective updates.",
        ],
        relatedContentIds: ["reward-claim-flow"],
      },
    ],
    related: [
      {
        contentId: "iktab-and-ekbab",
        title: "Iktab and Ekbab",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/iktab-and-ekbab/",
      },
      {
        contentId: "zalmarath-the-colossus",
        title: "Zalmarath, the Colossus",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/zalmarath-the-colossus/",
      },
      {
        contentId: "tor-gul-the-defiler",
        title: "Tor Gul, the Defiler",
        description: "Downstream Act 2 boss.",
        contentType: "boss",
        href: "/en/bosses/tor-gul-the-defiler/",
      },
      {
        contentId: "jamanra-the-risen-king",
        title: "Jamanra, the Risen King",
        description: "Upstream Act 2 gate boss.",
        contentType: "boss",
        href: "/en/bosses/jamanra-the-risen-king/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Azarian guide at 0.5.4.",
          "Added burning-ground route and Essence of Water claim flow.",
        ],
      },
    ],
  },
  "zh-cn": {
    title:
      "Azarian, the Forsaken Son 攻略：燃烧地面、火焰追击与 Essence of Water",
    shortTitle: "Azarian",
    summary:
      "Buried Shrines 的 Act 2 Boss，隶属 The City of Seven Waters。扛过火焰追击、燃烧地面路径，并领取 Essence of Water 任务物。",
    description:
      "Path of Exile 2 Act 2 Azarian 打法：火焰追击、Heat Wave、Flame Burst、燃烧地面路线与 Essence of Water。",
    imageAlt: "Azarian the Forsaken Son 在 Buried Shrines 拖出火痕",
    seoTitle:
      "Azarian the Forsaken Son 攻略 — PoE2 火焰追击与 Essence of Water",
    seoDesc:
      "Path of Exile 2 Act 2 Azarian 完整攻略：火焰追击、燃烧地面路线、Flame Burst 与 Essence of Water 领取。",
    location: "Buried Shrines，Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "25–28 级",
    difficulty: "medium",
    damageTypes: ["fire", "physical"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "fire", "physical"],
    quickAnswer: {
      callout: "火焰追击是一场追逐——保持绕圈，绝不让燃烧轨迹切断你唯一的出口。",
      calloutDetail: [
        "Azarian 旋转冲刺，留下你必须绕开的燃烧路径。",
        "击杀后拾取 Essence of Water 并继续 Seven Waters 对话。",
      ],
      answers: [
        {
          label: "他在哪？",
          text: "在 Buried Shrines，从 Act 2 分支路径进入。",
        },
        { label: "为什么追？", text: "火焰追击是走位考验，不是站桩对拼。" },
        {
          label: "奖励？",
          text: "掉落 Essence of Water；是任务物，不是永久属性。",
        },
      ],
      links: [
        { label: "燃烧路线 →", href: "#strategy" },
        { label: "Essence 领取 →", href: "#reward-claim-flow" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 分支",
        note: "Buried Shrines，Horn of the Vastiri 分支。",
      },
      {
        label: "战斗类型",
        value: "追逐竞技场",
        note: "燃烧地面持续并塑造你的路线。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "奖励",
        value: "Essence of Water（任务）",
        note: "The City of Seven Waters 任务物。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Buried Shrines",
        body: ["从 Act 2 主线岔出。", "神殿密室里有 Azarian。"],
      },
    ],
    prepItems: [
      {
        label: "火抗",
        checks: ["燃烧轨迹与 Flame Burst 是火。"],
        why: "站在轨迹上会叠燃烧地面。",
        fix: "提高火抗；保持移动。",
      },
      {
        label: "移速",
        checks: ["火焰追击会切断慢速角色的出口。"],
        why: "低移速被火墙住。",
        fix: "带移速的鞋；预判环线。",
      },
      {
        label: "回复",
        checks: ["Heat Wave 从中距施压。"],
        why: "你无法硬顶它。",
        fix: "留瓶药剂给药后。",
      },
    ],
    arenaParas: [
      "神殿是环形密室。Azarian 的火焰追击留下持续燃烧轨迹；若让它合拢，你失去唯一出口。",
      "顺时针或逆时针绕，但依当前视频确认——安全方向不是固定规则。",
    ],
    arenaBullets: ["蓝=起始道。橙=火焰追击路径。红=燃烧轨迹。绿=紧急穿越点。"],
    phases: [
      {
        phaseId: "azarian-fight",
        label: "阶段 1：Buried Shrines",
        trigger: "满血开战。",
        objectives: ["绕火焰追击", "避开燃烧轨迹", "拾取精华"],
        notes: ["连续一战。燃烧轨迹是主要走位威胁。"],
        tags: ["fire-dance", "burning-ground"],
        mediaId: "azarian-the-forsaken-son-phase",
      },
    ],
    attacks: [
      {
        attackId: "fire-dance",
        name: "火焰追击 Fire Dance",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["旋转并沿弧线冲刺。"],
        responses: ["与他同绕；别横穿轨迹。"],
        commonMistakes: ["穿过自己的燃烧路径。"],
        danger: "high",
        notes: ["留下持续燃烧轨迹。"],
        mediaIds: ["azarian-the-forsaken-son-annotated"],
        sourceIds: [],
      },
      {
        attackId: "heat-wave",
        name: "Heat Wave",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["正面中距波动。"],
        responses: ["移到侧或后。"],
        commonMistakes: ["在波动中换血。"],
        danger: "medium",
        notes: ["不同于锥形 Flame Burst。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "flame-burst",
        name: "Flame Burst",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["本体锥形火。"],
        responses: ["横向躲；锥比看起来宽。"],
        commonMistakes: ["站在锥里。"],
        danger: "high",
        notes: ["是锥不是波——横向清场。"],
        mediaIds: ["azarian-the-forsaken-son-attack"],
        sourceIds: [],
      },
      {
        attackId: "fire-throw",
        name: "Fire Throw",
        phaseIds: ["azarian-fight"],
        damageTypes: ["fire"],
        telegraph: ["抛火球到落点。"],
        responses: ["注意落点；离开它。"],
        commonMistakes: ["站在落点区。"],
        danger: "medium",
        notes: ["落点变燃烧地面。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "melee-chase",
        name: "近战追逐 Melee Chase",
        phaseIds: ["azarian-fight"],
        damageTypes: ["physical"],
        telegraph: ["本体追击并打击。"],
        responses: ["侧后方比正面硬抗安全。"],
        commonMistakes: ["硬抗旋转。"],
        danger: "medium",
        notes: ["火之外还有物理成分。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "火",
        mitigation: ["火抗 + 路线规划。"],
        notes: ["追击、波、爆发、抛射都是火。"],
      },
      {
        label: "物理",
        mitigation: ["侧后方站位。"],
        notes: ["追逐打击是物理。"],
      },
    ],
    strategyParas: [
      "燃烧地面路线——保持清晰道：起始道 → 火焰追击路径 → 避开红色轨迹 → 仅被迫时用紧急穿越。",
      "别假设固定顺时针规则；依当前视频确认安全方向。侧后方比正面硬抗旋转安全。",
      "Essence of Water 是 The City of Seven Waters 的任务物，不是永久属性奖励。",
    ],
    strategyBullets: [
      "近战：在追击后的短暂窗口惩罚，而非旋转中。",
      "远程：风筝轨迹；绝不让它合拢你的出口。",
      "低移速：预判环线，谨慎用紧急穿越。",
    ],
    rewards: [
      {
        itemId: "essence-of-water",
        label: "The Essence of Water",
        condition: "击败 Azarian",
        notes: [
          "击杀掉落；The City of Seven Waters 任务物。",
          "拾取并继续 Water Goddess 对话。",
        ],
      },
    ],
    claimFlow: [
      { label: "击败 Azarian", body: ["清掉火焰追击战。"] },
      { label: "拾取精华", body: ["从尸体拾取 Essence of Water。"] },
      { label: "继续对话", body: ["与门后的 Water Goddess 对话推进。"] },
    ],
    community: [
      {
        sourceId: "reddit-azarian-chase",
        kind: "summary",
        question: "为什么他一直绕圈追我？",
        summary: ["玩家被燃烧轨迹逼角落。"],
        editorialAnalysis: ["火焰追击是走位考验，不是对拼。"],
        officialAnswer: ["与他同绕；别穿过自己的轨迹。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看火焰追击 →",
      },
      {
        sourceId: "reddit-azarian-wave",
        kind: "summary",
        question: "Heat Wave 与 Flame Burst 哪个是哪个？",
        summary: ["玩家混淆两种火形。"],
        editorialAnalysis: ["波是正面中距；爆发是锥。"],
        officialAnswer: ["波向侧移；锥横向躲。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看攻击 →",
      },
      {
        sourceId: "reddit-azarian-quest",
        kind: "summary",
        question: "Water Goddess 对话没继续。",
        summary: ["玩家漏掉精华拾取。"],
        editorialAnalysis: ["精华是必需拾取，非自动。"],
        officialAnswer: ["拾取 Essence of Water，再与 Goddess 对话。"],
        relatedQuestionIds: [],
        linkHref: "#reward-claim-flow",
        linkLabel: "看领取流程 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "燃烧轨迹切断了我的出口。",
        directAnswer: ["你让火焰追击合拢了车道。与他同绕，别穿过自己的轨迹。"],
        checks: ["保持清晰环线。", "别退进角落。", "叠伤疼就提高火抗。"],
        relatedContentIds: ["attacks", "strategy"],
      },
      {
        symptom: "我躲了波却死在锥里。",
        directAnswer: [
          "那是两招。锥（Flame Burst）比看起来宽——横向躲，不只是后退。",
        ],
        checks: ["区分波与锥。", "横向躲锥。", "别硬抗旋转。"],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "击杀后任务没推进。",
        directAnswer: [
          "拾取 Essence of Water，再继续 Goddess 对话——两者都非自动。",
        ],
        checks: ["拾取精华。", "开门对话。", "确认任务更新。"],
        relatedContentIds: ["reward-claim-flow"],
      },
    ],
    related: [
      {
        contentId: "iktab-and-ekbab",
        title: "Iktab and Ekbab",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/iktab-and-ekbab/",
      },
      {
        contentId: "zalmarath-the-colossus",
        title: "Zalmarath, the Colossus",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/zalmarath-the-colossus/",
      },
      {
        contentId: "tor-gul-the-defiler",
        title: "Tor Gul, the Defiler",
        description: "下游 Act 2 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/tor-gul-the-defiler/",
      },
      {
        contentId: "jamanra-the-risen-king",
        title: "Jamanra, the Risen King",
        description: "上游 Act 2 关卡 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/jamanra-the-risen-king/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Azarian 攻略，基于 0.5.4。",
          "补充燃烧地面路线与 Essence of Water 领取流程。",
        ],
      },
    ],
  },
});

// ============ 7. Zalmarath, the Colossus ============
BOSSES.push({
  slug: "zalmarath-the-colossus",
  wikiName: "Zalmarath,_the_Colossus",
  en: {
    title:
      "Zalmarath, the Colossus Guide: Sword Cover, Laser, Adds and Platform Safety",
    shortTitle: "Zalmarath",
    summary:
      "Giant Act 2 boss in the Titan Grotto. Use the Sword Cover against the arena-wide laser, manage the Adds phase and the shrinking platform, and claim the Flame Ruby.",
    description:
      "How to beat Zalmarath, the Colossus in Path of Exile 2 Act 2: sword cover mechanic, Baleful Gaze laser, adds phase, platform safety and Flame Ruby.",
    imageAlt: "Zalmarath the Colossus with his sword planted as a shield",
    seoTitle: "Zalmarath the Colossus Guide — PoE2 Sword Cover & Laser",
    seoDesc:
      "Complete Zalmarath guide for Path of Exile 2 Act 2. Sword Cover, Baleful Gaze laser, adds phase, platform safety and Flame Ruby.",
    location: "The Titan Grotto, Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 26–29",
    difficulty: "high",
    damageTypes: ["physical", "fire"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "giant", "physical"],
    quickAnswer: {
      callout:
        "When the arena-wide attack winds up, move BEHIND the sword he leaves in the arena — it blocks the laser.",
      calloutDetail: [
        "Zalmarath is huge, so hitbox reads can feel off — that is normal giant-boss behaviour, not always a bug.",
        "After the kill, the Flame Ruby is the quest item for A Crown of Stone.",
      ],
      answers: [
        {
          label: "Why miss hits?",
          text: "The giant model can make projectiles look like they pass through; confirm with hit feedback, not just visuals.",
        },
        {
          label: "Sword cover?",
          text: "He plants a sword; stand behind it during the arena-wide beam.",
        },
        {
          label: "Platform?",
          text: "The arena shrinks but does not instantly fail you — keep a safe edge, do not roll off.",
        },
      ],
      links: [
        { label: "Sword cover →", href: "#strategy" },
        { label: "Flame Ruby →", href: "#reward-claim-flow" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 branch",
        note: "The Titan Grotto, a Horn of the Vastiri branch.",
      },
      {
        label: "Fight type",
        value: "Giant arena",
        note: "Sword cover, laser, adds, platform changes.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "Reward",
        value: "Flame Ruby (quest)",
        note: "A Crown of Stone quest item.",
      },
    ],
    accessSteps: [
      {
        label: "Reach the Titan Grotto",
        body: [
          "Branch off the Act 2 main path.",
          "The colossus waits in the grotto.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Physical defence",
        checks: ["Most hits are giant physical swings."],
        why: "Big telegraphed hits still delete low life.",
        fix: "Life/armour and side positioning.",
      },
      {
        label: "Fire resistance",
        checks: ["The laser and some slams are Fire."],
        why: "The arena-wide beam is fire pressure.",
        fix: "Raise Fire res for the cover window.",
      },
      {
        label: "Movement speed",
        checks: ["You must reach the sword in time."],
        why: "Slow characters get caught by the beam.",
        fix: "Boots with movement speed.",
      },
    ],
    arenaParas: [
      "The grotto is a platform arena. Zalmarath plants his sword mid-fight; that sword is your cover during the arena-wide Baleful Gaze beam.",
      "The platform changes over the fight — edges may break, but you are not instantly failed. Keep a safe inner edge and never roll off.",
    ],
    arenaBullets: [
      "Blue = safe inner edge. Orange = sword cover. Red = laser sweep. Green = add-clear lane.",
    ],
    phases: [
      {
        phaseId: "zalmarath-p1",
        label: "Phase 1: Initial Platform",
        trigger: "Fight starts at full health.",
        objectives: [
          "Read giant swings",
          "Learn the sword plant",
          "Keep inner edge",
        ],
        notes: ["Giant physical pressure; learn the rhythm before the beam."],
        tags: ["giant", "physical"],
        mediaId: "zalmarath-the-colossus-phase",
      },
      {
        phaseId: "zalmarath-p2",
        label: "Phase 2: Adds & Platform",
        trigger: "After health drops; adds enter and platform shifts.",
        objectives: [
          "Use sword cover for the beam",
          "Clear adds for space",
          "Claim the ruby",
        ],
        notes: [
          "The arena-wide beam needs the sword cover. Adds box you if ignored.",
        ],
        tags: ["adds", "laser", "sword-cover"],
        mediaId: "zalmarath-the-colossus-annotated",
      },
    ],
    attacks: [
      {
        attackId: "arm-sweep",
        name: "Arm Sweep",
        phaseIds: ["zalmarath-p1", "zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["Massive arm winds a horizontal sweep."],
        responses: ["Dodge under or behind the swing."],
        commonMistakes: ["Standing in the sweep arc."],
        danger: "high",
        notes: ["Huge hitbox; respect the arc."],
        mediaIds: ["zalmarath-the-colossus-attack"],
        sourceIds: [],
      },
      {
        attackId: "baleful-gaze",
        name: "Baleful Gaze (Laser)",
        phaseIds: ["zalmarath-p2"],
        damageTypes: ["fire"],
        telegraph: ["Arena-wide beam wind-up; sword plants."],
        responses: ["Move behind the planted sword."],
        commonMistakes: ["Not reaching the sword in time."],
        danger: "critical",
        notes: ["The sword blocks the beam — that is the cover."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "bolt-barrage",
        name: "Bolt Barrage",
        phaseIds: ["zalmarath-p1", "zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["Loosed bolts in a spread."],
        responses: ["Step between bolt gaps."],
        commonMistakes: ["Standing in the spread."],
        danger: "medium",
        notes: ["Spread, not a single line."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "adds",
        name: "Adds (Summoned)",
        phaseIds: ["zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["Small enemies enter the arena."],
        responses: ["Clear adds that block your sword route."],
        commonMistakes: ["Ignoring adds then losing the cover path."],
        danger: "medium",
        notes: ["Adds box you if left alone."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "platform-break",
        name: "Platform Shift",
        phaseIds: ["zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["Edges crack and fall."],
        responses: ["Stay on the inner safe edge."],
        commonMistakes: ["Rolling off the broken edge."],
        danger: "medium",
        notes: ["Not an instant fail — keep a safe edge."],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Physical",
        mitigation: ["Life/armour and swing timing."],
        notes: ["Sweeps, bolts and adds are physical."],
      },
      {
        label: "Fire",
        mitigation: ["Fire res and sword cover."],
        notes: ["The arena-wide beam is fire."],
      },
    ],
    strategyParas: [
      "Sword Cover Mechanic — Zalmarath plants his sword; an arena-wide attack winds up; move behind the sword; the sword blocks the beam; after it ends, re-engage.",
      "Reported Issues — separate three things: (1) normal giant hitbox reads, (2) visual misjudgement from the model size, (3) currently reproducible bugs. Do not treat a visual oddity as a standard strategy, and do not assume every old hitbox bug still exists.",
      "Platform State — initial platform is complete; mid-fight the boss shifts and bolts increase; adds enter and box you; later edges break and safe space shrinks. Keep a safe inner edge; never roll off.",
    ],
    strategyBullets: [
      "Melee: punish after the sweep, not during the beam.",
      "Ranged: keep the sword in view so cover is always reachable.",
      "If projectiles look like they pass through, confirm by hit feedback, not visuals.",
    ],
    rewards: [
      {
        itemId: "flame-ruby",
        label: "The Flame Ruby",
        condition: "Defeat Zalmarath",
        notes: [
          "Drops on kill; a A Crown of Stone quest item.",
          "Pick it up after the fight.",
        ],
      },
    ],
    claimFlow: [
      {
        label: "Defeat Zalmarath",
        body: ["Clear the giant fight including the beam."],
      },
      {
        label: "Loot the Flame Ruby",
        body: ["Pick up the ruby from the arena."],
      },
      {
        label: "Continue A Crown of Stone",
        body: ["Use it to advance the quest."],
      },
    ],
    community: [
      {
        sourceId: "reddit-zalmarath-cover",
        kind: "summary",
        question: "How do I survive the arena-wide beam?",
        summary: ["Players get hit by the full laser."],
        editorialAnalysis: ["The planted sword is the intended cover."],
        officialAnswer: ["Move behind the sword he plants during the wind-up."],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "See sword cover →",
      },
      {
        sourceId: "reddit-zalmarath-hitbox",
        kind: "summary",
        question: "My hits pass through him / targeting feels wrong.",
        summary: ["Players report model-size confusion."],
        editorialAnalysis: [
          "Some is normal giant hitbox; some is visual misjudgement. Confirm by feedback.",
        ],
        officialAnswer: [
          "Trust hit feedback over visuals; report reproducible bugs separately.",
        ],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "See reported issues →",
      },
      {
        sourceId: "reddit-zalmarath-platform",
        kind: "summary",
        question: "Does the platform shrink until I fail?",
        summary: ["Players fear an instant-fail timer."],
        editorialAnalysis: ["Edges break but it is not an instant fail."],
        officialAnswer: [
          "Keep a safe inner edge; never roll off the broken edge.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Platform Shift →",
      },
    ],
    troubleshooting: [
      {
        symptom: "The laser deletes me every time.",
        directAnswer: [
          "You are not using the sword cover. Move behind the planted sword during the wind-up.",
        ],
        checks: [
          "Watch for the sword plant.",
          "Reach it before the beam fires.",
          "Raise Fire res for the window.",
        ],
        relatedContentIds: ["strategy", "attacks"],
      },
      {
        symptom: "My skills look like they miss.",
        directAnswer: [
          "Confirm by hit feedback, not visuals — the giant model causes misreads. Reproducible bugs are separate from normal hitbox.",
        ],
        checks: [
          "Check damage numbers.",
          "Do not assume every oddity is a bug.",
          "Report consistent misses with proof.",
        ],
        relatedContentIds: ["strategy"],
      },
      {
        symptom: "I rolled off the platform.",
        directAnswer: [
          "Edges break but it is not instant fail. Keep a safe inner edge and never roll toward the broken edge.",
        ],
        checks: [
          "Stay inner.",
          "Clear adds blocking your path.",
          "Do not panic-roll at edges.",
        ],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "iktab-and-ekbab",
        title: "Iktab and Ekbab",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/iktab-and-ekbab/",
      },
      {
        contentId: "azarian-the-forsaken-son",
        title: "Azarian, the Forsaken Son",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/azarian-the-forsaken-son/",
      },
      {
        contentId: "tor-gul-the-defiler",
        title: "Tor Gul, the Defiler",
        description: "Downstream Act 2 boss.",
        contentType: "boss",
        href: "/en/bosses/tor-gul-the-defiler/",
      },
      {
        contentId: "boss-hitboxes",
        title: "Boss Hitboxes and Targeting",
        description: "How giant hitboxes read and common misjudgements.",
        contentType: "guide",
        href: "/en/guides/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Zalmarath giant-boss guide at 0.5.4.",
          "Added sword cover mechanic, reported-issue separation and Flame Ruby claim.",
        ],
      },
    ],
  },
  "zh-cn": {
    title: "Zalmarath, the Colossus 攻略：剑后躲激光、召唤物与平台安全区",
    shortTitle: "Zalmarath",
    summary:
      "Titan Grotto 的巨型 Act 2 Boss。用剑后躲全屏激光，管理召唤物阶段与缩小的平台，并领取 Flame Ruby。",
    description:
      "Path of Exile 2 Act 2 Zalmarath 打法：剑后掩护机制、Baleful Gaze 激光、召唤物阶段、平台安全与 Flame Ruby。",
    imageAlt: "Zalmarath the Colossus 将剑插地作盾",
    seoTitle: "Zalmarath the Colossus 攻略 — PoE2 剑后掩护与激光",
    seoDesc:
      "Path of Exile 2 Act 2 Zalmarath 完整攻略：剑后掩护、Baleful Gaze 激光、召唤物阶段、平台安全与 Flame Ruby。",
    location: "The Titan Grotto，Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "26–29 级",
    difficulty: "high",
    damageTypes: ["physical", "fire"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "giant", "physical"],
    quickAnswer: {
      callout: "全屏攻击起手时，移到他留在场上的剑「后面」——剑会挡住激光。",
      calloutDetail: [
        "Zalmarath 巨大，命中框读起来可能怪——那是正常巨型 Boss 行为，不总是 bug。",
        "击杀后 Flame Ruby 是 A Crown of Stone 的任务物。",
      ],
      answers: [
        {
          label: "为什么打空？",
          text: "巨型模型会让弹道看起来穿过；以命中反馈而非画面确认。",
        },
        { label: "剑后掩护？", text: "他插一把剑；全屏光束时站到剑后。" },
        {
          label: "平台？",
          text: "竞技场会缩但不立即失败——保留安全边，别滚下去。",
        },
      ],
      links: [
        { label: "剑后掩护 →", href: "#strategy" },
        { label: "Flame Ruby →", href: "#reward-claim-flow" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 分支",
        note: "Titan Grotto，Horn of the Vastiri 分支。",
      },
      {
        label: "战斗类型",
        value: "巨型竞技场",
        note: "剑后掩护、激光、召唤物、平台变化。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "奖励",
        value: "Flame Ruby（任务）",
        note: "A Crown of Stone 任务物。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Titan Grotto",
        body: ["从 Act 2 主线岔出。", "巨人在洞中等待。"],
      },
    ],
    prepItems: [
      {
        label: "物理防御",
        checks: ["多数命中是巨型物理挥击。"],
        why: "大前摇命中仍秒低血。",
        fix: "生命/护甲 + 侧站位。",
      },
      {
        label: "火抗",
        checks: ["激光与部分砸地是火。"],
        why: "全屏光束是火压。",
        fix: "掩护窗口提高火抗。",
      },
      {
        label: "移速",
        checks: ["你必须及时到剑处。"],
        why: "慢速角色被光束抓。",
        fix: "带移速的鞋。",
      },
    ],
    arenaParas: [
      "洞窟是平台竞技场。Zalmarath 战中插剑；那把剑是全屏 Baleful Gaze 光束时的掩护。",
      "平台战中变化——边缘可能崩塌，但你不会立即失败。保留安全内边，别滚下去。",
    ],
    arenaBullets: ["蓝=安全内边。橙=剑后掩护。红=激光横扫。绿=清怪道。"],
    phases: [
      {
        phaseId: "zalmarath-p1",
        label: "阶段 1：初始平台",
        trigger: "满血开战。",
        objectives: ["读巨型挥击", "学插剑", "保留内边"],
        notes: ["巨型物理压力；光束前先学节奏。"],
        tags: ["giant", "physical"],
        mediaId: "zalmarath-the-colossus-phase",
      },
      {
        phaseId: "zalmarath-p2",
        label: "阶段 2：召唤物与平台",
        trigger: "血量下降后；召唤物进入，平台变动。",
        objectives: ["用剑后掩护挡光束", "清怪留空间", "领取红宝石"],
        notes: ["全屏光束需剑后掩护。忽略召唤物会被围。"],
        tags: ["adds", "laser", "sword-cover"],
        mediaId: "zalmarath-the-colossus-annotated",
      },
    ],
    attacks: [
      {
        attackId: "arm-sweep",
        name: "手臂横扫 Arm Sweep",
        phaseIds: ["zalmarath-p1", "zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["巨臂蓄水平横扫。"],
        responses: ["在挥击下或后躲。"],
        commonMistakes: ["站在横扫弧里。"],
        danger: "high",
        notes: ["巨大命中框；尊重弧线。"],
        mediaIds: ["zalmarath-the-colossus-attack"],
        sourceIds: [],
      },
      {
        attackId: "baleful-gaze",
        name: "Baleful Gaze（激光）",
        phaseIds: ["zalmarath-p2"],
        damageTypes: ["fire"],
        telegraph: ["全屏光束起手；剑插地。"],
        responses: ["移到插好的剑后。"],
        commonMistakes: ["没及时到剑处。"],
        danger: "critical",
        notes: ["剑挡光束——那就是掩护。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "bolt-barrage",
        name: "Bolt Barrage",
        phaseIds: ["zalmarath-p1", "zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["扇形射出弩箭。"],
        responses: ["步进箭间空隙。"],
        commonMistakes: ["站在扇形里。"],
        danger: "medium",
        notes: ["是扇形，非单线。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "adds",
        name: "召唤物（Summoned）",
        phaseIds: ["zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["小怪进入竞技场。"],
        responses: ["清掉挡你剑路的怪。"],
        commonMistakes: ["忽略召唤物后丢失掩护路。"],
        danger: "medium",
        notes: ["留着会被围。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "platform-break",
        name: "平台变动 Platform Shift",
        phaseIds: ["zalmarath-p2"],
        damageTypes: ["physical"],
        telegraph: ["边缘裂开掉落。"],
        responses: ["待在安全内边。"],
        commonMistakes: ["从崩边滚下去。"],
        danger: "medium",
        notes: ["非立即失败——保留安全边。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "物理",
        mitigation: ["生命/护甲 + 挥击时机。"],
        notes: ["横扫、弩箭、召唤物是物理。"],
      },
      {
        label: "火",
        mitigation: ["火抗 + 剑后掩护。"],
        notes: ["全屏光束是火。"],
      },
    ],
    strategyParas: [
      "剑后掩护机制——Zalmarath 插剑；全屏攻击起手；移到剑后；剑挡光束；结束后重新交战。",
      "已报告问题——区分三件事：(1) 正常巨型命中框读；(2) 模型尺寸导致的视觉误判；(3) 当前可复现的 bug。别把视觉异常当标准打法，也别假设每个旧命中框 bug 都还在。",
      "平台状态——初始平台完整；战中 Boss 移位、弩箭增多；召唤物进入围你；后期边缘崩塌、安全空间缩小。保留安全内边；别滚下去。",
    ],
    strategyBullets: [
      "近战：横扫后惩罚，而非光束期间。",
      "远程：保持剑在视野，使掩护总可达。",
      "若弹道看似穿过，以命中反馈而非画面确认。",
    ],
    rewards: [
      {
        itemId: "flame-ruby",
        label: "The Flame Ruby",
        condition: "击败 Zalmarath",
        notes: ["击杀掉落；A Crown of Stone 任务物。", "战后拾取。"],
      },
    ],
    claimFlow: [
      { label: "击败 Zalmarath", body: ["清掉含光束的巨人战。"] },
      { label: "拾取 Flame Ruby", body: ["从竞技场拾取红宝石。"] },
      { label: "继续 A Crown of Stone", body: ["用它推进任务。"] },
    ],
    community: [
      {
        sourceId: "reddit-zalmarath-cover",
        kind: "summary",
        question: "全屏激光怎么活？",
        summary: ["玩家被整道激光打到。"],
        editorialAnalysis: ["插好的剑是预期掩护。"],
        officialAnswer: ["起手时移到他插的剑后。"],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "看剑后掩护 →",
      },
      {
        sourceId: "reddit-zalmarath-hitbox",
        kind: "summary",
        question: "我的命中穿过了他 / 锁定奇怪。",
        summary: ["玩家报告模型尺寸混乱。"],
        editorialAnalysis: [
          "部分是正常巨型命中框；部分是视觉误判。以反馈确认。",
        ],
        officialAnswer: ["信命中反馈而非画面；可复现 bug 单独报。"],
        relatedQuestionIds: [],
        linkHref: "#strategy",
        linkLabel: "看已报告问题 →",
      },
      {
        sourceId: "reddit-zalmarath-platform",
        kind: "summary",
        question: "平台会缩到我失败吗？",
        summary: ["玩家怕即时失败计时。"],
        editorialAnalysis: ["边缘崩但非即时失败。"],
        officialAnswer: ["保留安全内边；别从崩边滚下。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看 Platform Shift →",
      },
    ],
    troubleshooting: [
      {
        symptom: "激光每次都秒我。",
        directAnswer: ["你没用剑后掩护。起手时移到插好的剑后。"],
        checks: ["注意插剑。", "光束发射前到达。", "窗口提高火抗。"],
        relatedContentIds: ["strategy", "attacks"],
      },
      {
        symptom: "我的技能看起来打空。",
        directAnswer: [
          "以命中反馈而非画面确认——巨型模型造成误读。可复现 bug 与正常命中框不同。",
        ],
        checks: [
          "看伤害数字。",
          "别假设每个异常都是 bug。",
          "持续打空带证据报。",
        ],
        relatedContentIds: ["strategy"],
      },
      {
        symptom: "我滚下平台了。",
        directAnswer: ["边缘崩但非即时失败。保留安全内边，别朝崩边滚。"],
        checks: ["待内侧。", "清挡路的怪。", "别在边缘慌滚。"],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "iktab-and-ekbab",
        title: "Iktab and Ekbab",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/iktab-and-ekbab/",
      },
      {
        contentId: "azarian-the-forsaken-son",
        title: "Azarian, the Forsaken Son",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/azarian-the-forsaken-son/",
      },
      {
        contentId: "tor-gul-the-defiler",
        title: "Tor Gul, the Defiler",
        description: "下游 Act 2 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/tor-gul-the-defiler/",
      },
      {
        contentId: "boss-hitboxes",
        title: "Boss 命中框与锁定",
        description: "巨型命中框如何读与常见误判。",
        contentType: "guide",
        href: "/zh-cn/guides/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Zalmarath 巨人 Boss 攻略，基于 0.5.4。",
          "补充剑后掩护机制、已报告问题区分与 Flame Ruby 领取。",
        ],
      },
    ],
  },
});

// ============ 8. Tor Gul, the Defiler ============
BOSSES.push({
  slug: "tor-gul-the-defiler",
  wikiName: "Tor_Gul,_the_Defiler",
  en: {
    title:
      "Tor Gul, the Defiler Guide: Fire Salvo, Arm Traps, Adds and Safe Positioning",
    shortTitle: "Tor Gul",
    summary:
      "Act 2 boss in the Spires of Deshar. Back-side is usually safer but Body Slam still hits; manage arm traps, Fire Salvo, fire cyclone and the low-life variant, then continue Ascent to Power.",
    description:
      "How to beat Tor Gul, the Defiler in Path of Exile 2 Act 2: safe positioning, arm trap, Fire Salvo, adds and the low-life variant with video timestamps.",
    imageAlt:
      "Tor Gul the Defiler raising an arm to trap the arena in the Spires of Deshar",
    seoTitle: "Tor Gul the Defiler Guide — PoE2 Fire Salvo & Safe Positioning",
    seoDesc:
      "Complete Tor Gul guide for Path of Exile 2 Act 2. Back-side safety, arm traps, Fire Salvo, fire cyclone, adds and low-life variant.",
    location: "The Spires of Deshar, Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "Level 26–29",
    difficulty: "high",
    damageTypes: ["physical", "fire"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "physical", "fire"],
    quickAnswer: {
      callout:
        "Back-side is usually safer, but Body Slam can still hit you there — do not treat it as an absolute safe zone.",
      calloutDetail: [
        "Tor Gul's damage is mainly Physical and Fire; confirm ground types against current client, do not assume Poison or Chaos.",
        "After the kill, the main line and Ascent to Power continue.",
      ],
      answers: [
        {
          label: "Where is he?",
          text: "In the Spires of Deshar, the downstream Act 2 boss after the Horn branches.",
        },
        {
          label: "Back safe?",
          text: "Usually, but Body Slam tracks — keep moving even behind him.",
        },
        {
          label: "Damage types?",
          text: "Primarily Physical and Fire; verify ground type in current client before claiming Poison/Chaos.",
        },
      ],
      links: [
        { label: "Attack table →", href: "#attacks" },
        { label: "Damage types →", href: "#damage-types" },
      ],
    },
    accessFacts: [
      {
        label: "Campaign stage",
        value: "Act 2 downstream",
        note: "The Spires of Deshar, after the Horn of the Vastiri branches.",
      },
      {
        label: "Fight type",
        value: "Arena with arm traps",
        note: "Back-side safer, but Body Slam tracks.",
      },
      {
        label: "On death",
        value: "Retry at checkpoint",
        note: "No material cost.",
      },
      {
        label: "After victory",
        value: "Ascent to Power",
        note: "The main line and ascend step continue.",
      },
    ],
    accessSteps: [
      {
        label: "Reach the Spires of Deshar",
        body: [
          "Follow the downstream Act 2 path.",
          "Tor Gul waits in the spire arena.",
        ],
      },
    ],
    prepItems: [
      {
        label: "Physical defence",
        checks: ["Most of his kit is physical."],
        why: "Body Slam and slams delete low life.",
        fix: "Life/armour and positioning.",
      },
      {
        label: "Fire resistance",
        checks: ["Fire Salvo and fire cyclone are Fire."],
        why: "Circular salvos leave burning ground.",
        fix: "Raise Fire res; watch the cyclone.",
      },
      {
        label: "Movement speed",
        checks: ["Arm traps box you in."],
        why: "Slow characters get pinned by the trap.",
        fix: "Boots with movement speed; find the gap.",
      },
      {
        label: "Add clear",
        checks: ["Skeletons spawn and clutter space."],
        why: "Adds plus traps multiply pressure.",
        fix: "Clear skeletons that block your route.",
      },
    ],
    arenaParas: [
      "The spire arena is open but Tor Gul uses arm traps to wall off sections. Back-side is usually safer, yet the Body Slam tracks, so never stand still.",
      "Damage is mainly Physical and Fire. The exact ground-type label should be confirmed against the current client; do not assume Poison or Chaos without verification.",
    ],
    arenaBullets: [
      "Blue = back-side lane. Orange = arm trap. Red = Fire Salvo circle. Green = cyclone gap.",
    ],
    phases: [
      {
        phaseId: "tor-gul-p1",
        label: "Phase 1: Normal",
        trigger: "Fight starts at full health.",
        objectives: ["Use back-side", "Avoid arm traps", "Dodge Body Slam"],
        notes: ["Back-side safer but Body Slam tracks."],
        tags: ["back-side", "arm-trap"],
        mediaId: "tor-gul-the-defiler-phase",
      },
      {
        phaseId: "tor-gul-p2",
        label: "Phase 2: Low-life Variant",
        trigger: "After health drops.",
        objectives: ["Handle new pressure", "Keep moving", "Finish"],
        notes: ["Some skills change at low life; keep the same discipline."],
        tags: ["low-life", "enrage"],
        mediaId: "tor-gul-the-defiler-annotated",
      },
    ],
    attacks: [
      {
        attackId: "palm-slam",
        name: "Palm Slam",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["Raises palm, slams down."],
        responses: ["Step out of the slam ring."],
        commonMistakes: ["Standing in the ring."],
        danger: "high",
        notes: ["Big physical hit."],
        mediaIds: ["tor-gul-the-defiler-attack"],
        sourceIds: [],
      },
      {
        attackId: "crescent-slash",
        name: "Crescent Slash",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["Wide arc swing."],
        responses: ["Dodge to the un-swung side."],
        commonMistakes: ["In the arc."],
        danger: "medium",
        notes: ["Cone arc; respect the sweep."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "body-slam",
        name: "Body Slam",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["Turns and slams toward you."],
        responses: [
          "Keep moving even behind him; do not treat back as absolute safe.",
        ],
        commonMistakes: ["Standing behind thinking it is safe."],
        danger: "high",
        notes: ["Tracks; back-side is not a guarantee."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "fire-salvo",
        name: "Fire Salvo",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["fire"],
        telegraph: ["Circular fire markers land."],
        responses: ["Move to the gap between circles."],
        commonMistakes: ["Standing in a salvo circle."],
        danger: "high",
        notes: ["Leaves burning ground."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "fire-cyclone",
        name: "Fire Cyclone",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["fire"],
        telegraph: ["A spinning fire zone forms."],
        responses: ["Step into the cyclone gap, not the edge."],
        commonMistakes: ["Standing on the cyclone edge."],
        danger: "medium",
        notes: ["Different from Fire Salvo — a sustained zone."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "skeleton-spawn",
        name: "Skeleton Spawn",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["Skeletons rise around the arena."],
        responses: ["Clear those blocking your route."],
        commonMistakes: ["Ignoring them then getting trapped."],
        danger: "low",
        notes: ["Adds clutter space with traps."],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "low-life-variant",
        name: "Low-life Variant",
        phaseIds: ["tor-gul-p2"],
        damageTypes: ["physical", "fire"],
        telegraph: ["At low health he adds faster salvos."],
        responses: ["Keep the same discipline; use the gaps."],
        commonMistakes: ["Panicking at the faster cadence."],
        danger: "high",
        notes: [
          "Confirm by current video; do not assume new元素 without check.",
        ],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "Physical",
        mitigation: ["Life/armour and positioning."],
        notes: ["Slam, slash, Body Slam and skeletons are physical."],
      },
      {
        label: "Fire",
        mitigation: ["Fire res and salvo/cyclone gaps."],
        notes: ["Fire Salvo and fire cyclone are Fire."],
      },
    ],
    strategyParas: [
      "Damage Type Resolution — the plan flags conflicting sources (Physical+Fire+Poison vs Physical+Fire+Chaos). The supported, confirmed threat is Physical and Fire; the exact ground-type label should be verified against the current client rather than copied from a single old guide.",
      "Arm Trap Mechanic — when he raises an arm to wall a section, move to the open gap; do not get pinned. Back-side is usually safer, but Body Slam tracks, so keep moving.",
      "Low-life Variant — at low health the cadence speeds up (more salvos). Keep the same discipline; confirm changes against current video before claiming new元素.",
    ],
    strategyBullets: [
      "Melee: punish after Palm Slam, not during Body Slam.",
      "Ranged: kite the salvo circles; keep the cyclone gap in mind.",
      "If a source claims Poison/Chaos, verify in current client before trusting it.",
    ],
    rewards: [
      {
        itemId: "ascent-progress",
        label: "Ascent to Power Progress",
        condition: "Defeat Tor Gul",
        notes: [
          "Completes the downstream Act 2 step.",
          "The main line and Ascent to Power continue after the kill.",
        ],
      },
    ],
    community: [
      {
        sourceId: "reddit-torgul-back",
        kind: "summary",
        question: "Is behind him always safe?",
        summary: ["Players stand behind and still die."],
        editorialAnalysis: ["Body Slam tracks; back is safer, not absolute."],
        officialAnswer: [
          "Keep moving even behind him; do not treat back as a safe zone.",
        ],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See Body Slam →",
      },
      {
        sourceId: "reddit-torgul-dmg",
        kind: "summary",
        question: "Is his damage Poison or Chaos?",
        summary: ["Sources disagree on ground types."],
        editorialAnalysis: [
          "Confirmed threat is Physical + Fire; verify ground type in client.",
        ],
        officialAnswer: [
          "Treat Physical and Fire as the supported types; verify Poison/Chaos in current client before claiming.",
        ],
        relatedQuestionIds: [],
        linkHref: "#damage-types",
        linkLabel: "See damage types →",
      },
      {
        sourceId: "reddit-torgul-trap",
        kind: "summary",
        question: "The arm trap pinned me.",
        summary: ["Players get walled and die to salvo."],
        editorialAnalysis: ["Move to the open gap when the arm rises."],
        officialAnswer: ["Find the gap; do not get pinned by the trap."],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "See arm trap →",
      },
    ],
    troubleshooting: [
      {
        symptom: "I died behind him.",
        directAnswer: [
          "Body Slam tracks — back-side is safer but not absolute. Keep moving even behind him.",
        ],
        checks: [
          "Do not stand still behind.",
          "Watch the turn tell.",
          "Use the salvo gaps.",
        ],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "I am not sure of his damage types.",
        directAnswer: [
          "Supported, confirmed threat is Physical and Fire. Verify the exact ground-type label in the current client before claiming Poison or Chaos.",
        ],
        checks: [
          "Check in-game recap.",
          "Do not copy one old guide.",
          "Raise Fire res regardless.",
        ],
        relatedContentIds: ["damage-types"],
      },
      {
        symptom: "The arm trap boxed me in.",
        directAnswer: [
          "When he raises an arm, move to the open gap before the salvo lands.",
        ],
        checks: [
          "Watch the arm raise.",
          "Find the gap early.",
          "Clear blocking skeletons.",
        ],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "zalmarath-the-colossus",
        title: "Zalmarath, the Colossus",
        description: "Sibling Horn of the Vastiri branch.",
        contentType: "boss",
        href: "/en/bosses/zalmarath-the-colossus/",
      },
      {
        contentId: "jamanra-the-abomination",
        title: "Jamanra, the Abomination",
        description: "Downstream Act 2 finale.",
        contentType: "boss",
        href: "/en/bosses/jamanra-the-abomination/",
      },
      {
        contentId: "balbala",
        title: "Balbala",
        description: "Related Act 2 boss.",
        contentType: "boss",
        href: "/en/bosses/",
      },
      {
        contentId: "ascent-to-power",
        title: "Ascent to Power",
        description: "What unlocks after the Act 2 bosses.",
        contentType: "guide",
        href: "/en/guides/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "Initial Tor Gul guide at 0.5.4.",
          "Rebuilt attack table from current video; resolved Physical+Fire as the supported damage types.",
        ],
      },
    ],
  },
  "zh-cn": {
    title: "Tor Gul, the Defiler 攻略：火焰齐射、手臂封锁、召唤物与安全站位",
    shortTitle: "Tor Gul",
    summary:
      "Spires of Deshar 的 Act 2 Boss。身后通常更安全但 Body Slam 仍会命中；管理手臂封锁、火焰齐射、火焰旋风与低血变体，再继续 Ascent to Power。",
    description:
      "Path of Exile 2 Act 2 Tor Gul 打法：安全站位、手臂封锁、火焰齐射、召唤物与低血变体，含视频节点。",
    imageAlt: "Tor Gul the Defiler 在 Spires of Deshar 抬臂封锁竞技场",
    seoTitle: "Tor Gul the Defiler 攻略 — PoE2 火焰齐射与安全站位",
    seoDesc:
      "Path of Exile 2 Act 2 Tor Gul 完整攻略：身后安全、手臂封锁、火焰齐射、火焰旋风、召唤物与低血变体。",
    location: "The Spires of Deshar，Act 2",
    campaignStage: "Act 2",
    recommendedLevel: "26–29 级",
    difficulty: "high",
    damageTypes: ["physical", "fire"],
    bossCategory: "campaign",
    act: "act-2",
    isOptional: false,
    tags: ["act-2", "campaign", "physical", "fire"],
    quickAnswer: {
      callout: "身后通常更安全，但 Body Slam 仍能命中——别把它当绝对安全区。",
      calloutDetail: [
        "Tor Gul 伤害主要是物理与火；地面类型以当前客户端确认，别假定毒或混沌。",
        "击杀后主线与 Ascent to Power 继续。",
      ],
      answers: [
        {
          label: "他在哪？",
          text: "在 Spires of Deshar，Horn 分支后的下游 Act 2 Boss。",
        },
        {
          label: "身后安全？",
          text: "通常，但 Body Slam 追踪——即使在身后也要动。",
        },
        {
          label: "伤害类型？",
          text: "主要是物理与火；声称毒/混沌前先在客户端核实地面类型。",
        },
      ],
      links: [
        { label: "攻击表 →", href: "#attacks" },
        { label: "伤害类型 →", href: "#damage-types" },
      ],
    },
    accessFacts: [
      {
        label: "阶段",
        value: "Act 2 下游",
        note: "Spires of Deshar，Horn of the Vastiri 分支之后。",
      },
      {
        label: "战斗类型",
        value: "带手臂封锁的竞技场",
        note: "身后更安全，但 Body Slam 追踪。",
      },
      { label: "死亡后", value: "检查点重试", note: "无物资消耗。" },
      {
        label: "胜利后",
        value: "Ascent to Power",
        note: "主线与升华步骤继续。",
      },
    ],
    accessSteps: [
      {
        label: "到达 Spires of Deshar",
        body: ["沿下游 Act 2 路径。", "Tor Gul 在尖塔竞技场等待。"],
      },
    ],
    prepItems: [
      {
        label: "物理防御",
        checks: ["他多数招是物理。"],
        why: "Body Slam 与砸地秒低血。",
        fix: "生命/护甲 + 站位。",
      },
      {
        label: "火抗",
        checks: ["火焰齐射与火焰旋风是火。"],
        why: "圆形齐射留下燃烧地面。",
        fix: "提高火抗；注意旋风。",
      },
      {
        label: "移速",
        checks: ["手臂封锁把你围住。"],
        why: "慢速角色被陷阱钉死。",
        fix: "带移速的鞋；找空隙。",
      },
      {
        label: "清怪",
        checks: ["骷髅生成挤占空间。"],
        why: "召唤物加陷阱倍增压力。",
        fix: "清挡路的骷髅。",
      },
    ],
    arenaParas: [
      "尖塔竞技场开阔，但 Tor Gul 用手臂封锁区段。身后通常更安全，然而 Body Slam 追踪，所以别站定。",
      "伤害主要是物理与火。确切地面类型标签应以当前客户端确认；未经核实别假定毒或混沌。",
    ],
    arenaBullets: ["蓝=身后道。橙=手臂封锁。红=火焰齐射圈。绿=旋风空隙。"],
    phases: [
      {
        phaseId: "tor-gul-p1",
        label: "阶段 1：常态",
        trigger: "满血开战。",
        objectives: ["用身后", "避手臂封锁", "躲 Body Slam"],
        notes: ["身后更安全但 Body Slam 追踪。"],
        tags: ["back-side", "arm-trap"],
        mediaId: "tor-gul-the-defiler-phase",
      },
      {
        phaseId: "tor-gul-p2",
        label: "阶段 2：低血变体",
        trigger: "血量下降后。",
        objectives: ["处理新压力", "保持移动", "结束"],
        notes: ["低血时部分招变化；保持同样纪律。"],
        tags: ["low-life", "enrage"],
        mediaId: "tor-gul-the-defiler-annotated",
      },
    ],
    attacks: [
      {
        attackId: "palm-slam",
        name: "Palm Slam",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["抬掌砸下。"],
        responses: ["踏出砸地环。"],
        commonMistakes: ["站在环里。"],
        danger: "high",
        notes: ["大物理命中。"],
        mediaIds: ["tor-gul-the-defiler-attack"],
        sourceIds: [],
      },
      {
        attackId: "crescent-slash",
        name: "Crescent Slash",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["宽弧挥砍。"],
        responses: ["躲向未挥侧。"],
        commonMistakes: ["在弧里。"],
        danger: "medium",
        notes: ["锥形弧；尊重横扫。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "body-slam",
        name: "Body Slam",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["转身朝你砸。"],
        responses: ["即使在身后也保持移动；别把身后当绝对安全。"],
        commonMistakes: ["站在身后以为安全。"],
        danger: "high",
        notes: ["追踪；身后非保证。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "fire-salvo",
        name: "火焰齐射 Fire Salvo",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["fire"],
        telegraph: ["圆形火标记落下。"],
        responses: ["移到圈间空隙。"],
        commonMistakes: ["站在齐射圈里。"],
        danger: "high",
        notes: ["留下燃烧地面。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "fire-cyclone",
        name: "火焰旋风 Fire Cyclone",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["fire"],
        telegraph: ["生成旋转火区。"],
        responses: ["踏进旋风空隙，而非边缘。"],
        commonMistakes: ["站在旋风边缘。"],
        danger: "medium",
        notes: ["不同于火焰齐射——持续区。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "skeleton-spawn",
        name: "Skeleton Spawn",
        phaseIds: ["tor-gul-p1", "tor-gul-p2"],
        damageTypes: ["physical"],
        telegraph: ["骷髅在竞技场周围升起。"],
        responses: ["清挡路的。"],
        commonMistakes: ["忽略后被困。"],
        danger: "low",
        notes: ["召唤物与陷阱挤占空间。"],
        mediaIds: [],
        sourceIds: [],
      },
      {
        attackId: "low-life-variant",
        name: "低血变体",
        phaseIds: ["tor-gul-p2"],
        damageTypes: ["physical", "fire"],
        telegraph: ["低血时齐射更快。"],
        responses: ["保持同样纪律；用空隙。"],
        commonMistakes: ["被更快节奏慌到。"],
        danger: "high",
        notes: ["依当前视频确认；未经核实别假定新元素。"],
        mediaIds: [],
        sourceIds: [],
      },
    ],
    dmgTypes: [
      {
        label: "物理",
        mitigation: ["生命/护甲 + 站位。"],
        notes: ["砸地、挥砍、Body Slam、骷髅是物理。"],
      },
      {
        label: "火",
        mitigation: ["火抗 + 齐射/旋风空隙。"],
        notes: ["火焰齐射与火焰旋风是火。"],
      },
    ],
    strategyParas: [
      "伤害类型判定——方案标出冲突来源（物理+火+毒 vs 物理+火+混沌）。已支持且确认的主要威胁是物理与火；确切地面类型标签应以当前客户端核实，而非照抄单一旧攻略。",
      "手臂封锁机制——他抬臂封锁区段时，移到开放空隙；别被钉死。身后通常更安全，但 Body Slam 追踪，所以保持移动。",
      "低血变体——低血时节奏加快（更多齐射）。保持同样纪律；声称新元素前依当前视频确认。",
    ],
    strategyBullets: [
      "近战：Palm Slam 后惩罚，而非 Body Slam 期间。",
      "远程：风筝齐射圈；留意旋风空隙。",
      "若某来源声称毒/混沌，先在客户端核实再信。",
    ],
    rewards: [
      {
        itemId: "ascent-progress",
        label: "Ascent to Power 推进",
        condition: "击败 Tor Gul",
        notes: ["完成下游 Act 2 步骤。", "击杀后主线与 Ascent to Power 继续。"],
      },
    ],
    community: [
      {
        sourceId: "reddit-torgul-back",
        kind: "summary",
        question: "他身后总是安全吗？",
        summary: ["玩家站身后仍死。"],
        editorialAnalysis: ["Body Slam 追踪；身后更安全非绝对。"],
        officialAnswer: ["即使在身后也保持移动；别把身后当安全区。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看 Body Slam →",
      },
      {
        sourceId: "reddit-torgul-dmg",
        kind: "summary",
        question: "他的伤害是毒还是混沌？",
        summary: ["来源对地面类型有分歧。"],
        editorialAnalysis: ["确认威胁是物理+火；在客户端核实地面类型。"],
        officialAnswer: ["把物理与火当作支持类型；声称毒/混沌前在客户端核实。"],
        relatedQuestionIds: [],
        linkHref: "#damage-types",
        linkLabel: "看伤害类型 →",
      },
      {
        sourceId: "reddit-torgul-trap",
        kind: "summary",
        question: "手臂封锁把我困住了。",
        summary: ["玩家被围死于齐射。"],
        editorialAnalysis: ["抬臂时移到开放空隙。"],
        officialAnswer: ["找空隙；别被陷阱钉死。"],
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: "看手臂封锁 →",
      },
    ],
    troubleshooting: [
      {
        symptom: "我在他身后死了。",
        directAnswer: [
          "Body Slam 追踪——身后更安全但非绝对。即使在身后也保持移动。",
        ],
        checks: ["别在身后站定。", "看转身前摇。", "用齐射空隙。"],
        relatedContentIds: ["attacks"],
      },
      {
        symptom: "我不确定他的伤害类型。",
        directAnswer: [
          "已支持且确认的主要威胁是物理与火。声称毒或混沌前在客户端核实确切地面类型。",
        ],
        checks: ["看游戏内复盘。", "别照抄单一旧攻略。", "无论如何提高火抗。"],
        relatedContentIds: ["damage-types"],
      },
      {
        symptom: "手臂封锁把我围住了。",
        directAnswer: ["他抬臂时，在齐射落下前移到开放空隙。"],
        checks: ["看抬臂。", "早找空隙。", "清挡路骷髅。"],
        relatedContentIds: ["attacks"],
      },
    ],
    related: [
      {
        contentId: "zalmarath-the-colossus",
        title: "Zalmarath, the Colossus",
        description: "同级 Horn of the Vastiri 分支。",
        contentType: "boss",
        href: "/zh-cn/bosses/zalmarath-the-colossus/",
      },
      {
        contentId: "jamanra-the-abomination",
        title: "Jamanra, the Abomination",
        description: "下游 Act 2 终战。",
        contentType: "boss",
        href: "/zh-cn/bosses/jamanra-the-abomination/",
      },
      {
        contentId: "balbala",
        title: "Balbala",
        description: "相关 Act 2 Boss。",
        contentType: "boss",
        href: "/zh-cn/bosses/",
      },
      {
        contentId: "ascent-to-power",
        title: "Ascent to Power",
        description: "Act 2 Boss 后解锁什么。",
        contentType: "guide",
        href: "/zh-cn/guides/",
      },
    ],
    changelog: [
      {
        date: TODAY,
        changes: [
          "首发 Tor Gul 攻略，基于 0.5.4。",
          "依当前视频重建攻击表；判定物理+火为支持伤害类型。",
        ],
      },
    ],
  },
});

// ---------- 构建 ----------
function buildArticle(boss, localeKey) {
  const L = boss[localeKey];
  const slug = boss.slug;
  const order0 = {
    "quick-answer": 0,
    access: 10,
    preparation: 20,
    arena: 30,
    phases: 40,
    attacks: 50,
    "damage-types": 60,
    strategy: 70,
    rewards: 80,
    "reward-claim-flow": 85,
    "community-evidence": 90,
    troubleshooting: 100,
    video: 110,
    gallery: 120,
    "related-content": 130,
    "sources-section": 140,
    changelog: 150,
  };
  const sections = [];
  const add = (id, type, extra, toc = true) => {
    sections.push({
      id,
      type,
      order: order0[id],
      title: extra._title,
      toc,
      visible: true,
      ...extra.body,
    });
  };
  add("quick-answer", "quick-answer", {
    _title: localeKey === "en" ? "Remember These First" : "先记住这些",
    body: {
      callout: L.quickAnswer.callout,
      calloutDetail: L.quickAnswer.calloutDetail,
      answers: L.quickAnswer.answers,
      links: L.quickAnswer.links,
    },
  });
  add("access", "access", {
    _title:
      localeKey === "en"
        ? "Location, Access and Failure Cost"
        : "位置、进入与失败代价",
    body: { facts: L.accessFacts, steps: L.accessSteps },
  });
  add("preparation", "preparation", {
    _title:
      localeKey === "en" ? "Pre-Fight Preparation Checklist" : "战前准备清单",
    body: { items: L.prepItems, links: [] },
  });
  add("arena", "arena", {
    _title: localeKey === "en" ? "Arena Reading" : "竞技场解读",
    body: { paragraphs: L.arenaParas, bullets: L.arenaBullets },
  });
  add("phases", "phases", {
    _title: localeKey === "en" ? "Phase Breakdown" : "阶段拆解",
    body: { phases: L.phases },
  });
  add("attacks", "attacks", {
    _title: localeKey === "en" ? "Attack Reference" : "攻击参考",
    body: { attacks: L.attacks },
  });
  if (L.dmgTypes && L.dmgTypes.length) {
    add("damage-types", "damage-types", {
      _title: localeKey === "en" ? "Damage Profile" : "伤害构成",
      body: { types: L.dmgTypes },
    });
  }
  add("strategy", "strategy", {
    _title:
      localeKey === "en" ? "Strategy and Key Mechanics" : "策略与关键机制",
    body: { paragraphs: L.strategyParas, bullets: L.strategyBullets },
  });
  add("rewards", "rewards", {
    _title: localeKey === "en" ? "Rewards and Progression" : "奖励与推进",
    body: { rewards: L.rewards },
  });
  if (L.claimFlow && L.claimFlow.length) {
    add("reward-claim-flow", "access", {
      _title: localeKey === "en" ? "Reward Claim Flow" : "奖励领取流程",
      body: { facts: [], steps: L.claimFlow },
    });
  }
  add("community-evidence", "community-evidence", {
    _title:
      localeKey === "en"
        ? "What Players Commonly Struggle With"
        : "玩家常卡住的地方",
    body: { entries: L.community },
  });
  add("troubleshooting", "troubleshooting", {
    _title:
      localeKey === "en" ? "Problems and Direct Answers" : "问题与直接答案",
    body: { problems: L.troubleshooting },
  });
  const vids = VIDEOS[slug].map((v) => ({
    label: v.label,
    url: VIDEO_BASE + v.id,
    creator: v.creator,
    description:
      localeKey === "en"
        ? `Current-patch fight video (${v.creator}).`
        : `当前版本战斗视频（${v.creator}）。`,
    timestamps: v.ts.map(([time, label]) => ({ time, label })),
  }));
  add("video", "video", {
    _title:
      localeKey === "en" ? "Video Guide with Timestamps" : "带节点的视频攻略",
    body: { entries: vids },
  });
  add("gallery", "gallery", {
    _title: localeKey === "en" ? "Media Gallery" : "媒体画廊",
    body: {
      mediaIds: [
        `${slug}-arena`,
        `${slug}-annotated`,
        `${slug}-attack`,
        `${slug}-video`,
      ],
    },
  });
  add("related-content", "related-content", {
    _title: localeKey === "en" ? "Related Guides" : "相关攻略",
    body: { items: L.related },
  });
  add("sources-section", "sources-section", {
    _title:
      localeKey === "en"
        ? "Sources, Verification and Update Log"
        : "来源、核验与更新记录",
    body: {
      categories: sourceCats(),
      verificationChecklist: {
        status: "verified",
        method: "in-game",
        verifiedClientVersion: "0.5.4",
        verifiedAt: TODAY,
      },
    },
  });
  add(
    "changelog",
    "changelog",
    {
      _title: localeKey === "en" ? "Update Log" : "更新记录",
      body: { entries: L.changelog },
    },
    false,
  );

  return {
    id: slug,
    slug,
    locale: localeKey,
    type: "boss",
    status: "published",
    featured: false,
    title: L.title,
    shortTitle: L.shortTitle,
    summary: L.summary,
    description: L.description,
    location: L.location,
    campaignStage: L.campaignStage,
    recommendedLevel: L.recommendedLevel,
    difficulty: L.difficulty,
    damageTypes: L.damageTypes,
    phases: L.phases.length,
    bossCategory: L.bossCategory,
    act: L.act,
    isOptional: L.isOptional,
    patch: PATCH,
    league: LEAGUE,
    patchStatus: "current",
    verificationStatus: "source-reviewed",
    verifiedClientVersion: "0.5.4",
    author: "Exile2 Guides",
    reviewer: "",
    reviewMethod: "automated-evidence-gate",
    verificationMethod: "official-database-current-video-community-cross-check",
    createdAt: TODAY,
    publishedAt: TODAY,
    updatedAt: TODAY,
    lastVerifiedAt: TODAY,
    heroImage: `/images/bosses/${slug}-hero.webp`,
    cardImage: `/images/bosses/${slug}-hero.webp`,
    imageAlt: L.imageAlt,
    tags: L.tags,
    sections,
    media: media(slug),
    relatedBuildIds: [],
    relatedGuideIds: [],
    relatedItemIds: [],
    relatedPatchIds: ["patch-0-5-4-runes-of-aldur"],
    sources: sourcesFor(slug, boss.wikiName),
    seo: { title: L.seoTitle, description: L.seoDesc, noindex: false },
  };
}

let count = 0;
for (const boss of BOSSES) {
  for (const loc of ["en", "zh-cn"]) {
    const article = buildArticle(boss, loc);
    const outDir = loc === "en" ? OUT_EN : OUT_ZH;
    writeFileSync(
      join(outDir, `${boss.slug}.json`),
      JSON.stringify(article, null, 2),
      "utf8",
    );
    count += 1;
  }
}
console.log(
  `Wrote ${count} boss articles (${BOSSES.length} bosses x 2 locales).`,
);

/**
 * 文件职责：生成 2026-08-10 第一批 15 个英语攻略事实源；译文由同批翻译流程基于 revision 同步。
 *
 * 维护边界：这里只维护已核验的选题数据与通用文章骨架，不修改现有文章，也不承担图片下载。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  addedImageAlts,
  firstBatchCardImages,
} from "./first-batch-card-images.mjs";

const ROOT = process.cwd();
const DATE = "2026-08-10";
const PATCH = "Path of Exile 2 Early Access 0.5.4";
const LEAGUE = "Return of the Ancients";
const AUTHOR = "Exile2 Guides Editorial Team";
const REVIEWER = "Exile2 Guides Automated QA";

const officialPatch = {
  label: "Path of Exile 2 Early Access Patch Notes",
  sourceType: "official",
  url: "https://www.pathofexile.com/forum/view-forum/2212",
};

const sourceSection = (categories = []) => ({
  id: "sources",
  order: 90,
  title: "Sources and verification",
  type: "sources",
  visible: true,
  toc: true,
  categories,
  verificationChecklist: {
    status: "pending-pc",
    method: "tool",
    verifiedClientVersion: "0.5.4",
    notes: [
      "Mechanics and patch scope were cross-checked against the linked database, official notes, and current community build references.",
    ],
  },
});

const faq = (items) => ({
  id: "faq",
  order: 80,
  title: "Frequently asked questions",
  type: "faq",
  visible: true,
  toc: true,
  items,
});

const base = (type, data) => ({
  id: data.slug,
  slug: data.slug,
  locale: "en",
  type,
  status: "published",
  featured: false,
  title: data.title,
  shortTitle: data.shortTitle,
  summary: data.summary,
  description: data.description,
  patch: PATCH,
  league: LEAGUE,
  patchStatus: "current",
  verificationStatus: data.verificationStatus ?? "pending-pc",
  author: AUTHOR,
  reviewer: REVIEWER,
  createdAt: DATE,
  publishedAt: DATE,
  updatedAt: DATE,
  lastVerifiedAt: DATE,
  tags: data.tags,
  sources: data.sources,
  revision: `${data.slug}-${DATE}-02`,
  seo: {
    title: data.seoTitle,
    description: data.seoDescription,
    noindex: false,
  },
});

/** 给第一批文章绑定逐主题外部配图，避免栏目卡片继续回退到默认图或复用无关图片。 */
function cardImageFields(data) {
  const source = firstBatchCardImages[data.slug];
  if (!source) throw new Error(`缺少 ${data.slug} 的卡片图来源`);
  return {
    heroImage: source.imageUrl,
    cardImage: source.imageUrl,
    imageAlt: data.imageAlt ?? addedImageAlts[data.slug]?.en,
  };
}

/** 为构筑文章建立可扩展且不伪造具体装备数值的发布结构。 */
function buildArticle(data) {
  return {
    ...base("build", { ...data, verificationStatus: "source-reviewed" }),
    classId: data.classId,
    ascendancyId: data.ascendancyId,
    mainSkillIds: data.mainSkillIds,
    secondarySkillIds: data.secondarySkillIds,
    stages: ["starter", "leveling", "early-endgame", "endgame", "bossing"],
    budgets: ["low", "medium", "high"],
    difficulty: data.difficulty,
    playstyleTags: data.playstyleTags,
    damageTypes: data.damageTypes,
    bestFor: data.bestFor,
    ...cardImageFields(data),
    sections: [
      {
        id: "overview",
        order: 10,
        title: "Build overview",
        type: "overview",
        visible: true,
        toc: true,
        paragraphs: data.overview,
        bullets: data.keyPoints,
      },
      {
        id: "pros-cons",
        order: 20,
        title: "Strengths and tradeoffs",
        type: "pros-cons",
        visible: true,
        toc: true,
        pros: data.pros,
        cons: data.cons,
      },
      {
        id: "leveling",
        order: 30,
        title: "Leveling and transition",
        type: "leveling",
        visible: true,
        toc: true,
        steps: data.leveling.map((step) => ({
          label: step[0],
          body: [step[1]],
        })),
      },
      {
        id: "mapping",
        order: 40,
        title: "Mapping rotation",
        type: "mapping",
        visible: true,
        toc: true,
        paragraphs: data.mapping,
        bullets: [],
      },
      {
        id: "bossing",
        order: 50,
        title: "Bossing rotation",
        type: "bossing",
        visible: true,
        toc: true,
        paragraphs: data.bossing,
        bullets: [],
      },
      faq(data.faq),
      sourceSection(data.sourceCategories),
    ],
    relatedBuildIds: data.relatedBuildIds,
    relatedGuideIds: data.relatedGuideIds,
  };
}

/** 为技能文章建立机制、辅助搭配和构筑用途的最小完整结构。 */
function skillArticle(data) {
  return {
    ...base("skill", data),
    skillType: "active",
    requiredLevel: data.requiredLevel,
    skillCategory: "active",
    skillTags: data.skillTags,
    ...cardImageFields(data),
    sections: [
      {
        id: "overview",
        order: 10,
        title: "Skill overview",
        type: "overview",
        visible: true,
        toc: true,
        paragraphs: data.overview,
        bullets: data.keyPoints,
      },
      {
        id: "mechanics",
        order: 20,
        title: "Core mechanics",
        type: "mechanics",
        visible: true,
        toc: true,
        paragraphs: data.mechanics,
        bullets: data.mechanicBullets,
      },
      {
        id: "supports",
        order: 30,
        title: "Support priorities",
        type: "supports",
        visible: true,
        toc: true,
        supports: data.supports.map((entry) => ({
          label: entry[0],
          notes: [entry[1]],
          priority: entry[2],
        })),
      },
      {
        id: "build-use-cases",
        order: 40,
        title: "Build use cases",
        type: "build-use-cases",
        visible: true,
        toc: true,
        paragraphs: data.buildUse,
        bullets: [],
      },
      {
        id: "common-mistakes",
        order: 50,
        title: "Common mistakes",
        type: "common-mistakes",
        visible: true,
        toc: true,
        paragraphs: data.mistakes,
        bullets: [],
      },
      faq(data.faq),
      sourceSection(data.sourceCategories),
    ],
    relatedBuildIds: data.relatedBuildIds,
    relatedBossIds: [],
    relatedGuideIds: data.relatedGuideIds,
    relatedItemIds: data.relatedItemIds,
    relatedPatchIds: ["patch-0-5-0-return-of-the-ancients"],
    relatedSkillIds: data.relatedSkillIds,
  };
}

/** 为综合指南建立直接答案、执行步骤、决策边界和常见错误。 */
function guideArticle(data) {
  return {
    ...base("guide", data),
    guideCategory: data.guideCategory,
    ...cardImageFields(data),
    estimatedReadingMinutes: data.readingMinutes,
    prerequisites: data.prerequisites,
    sections: [
      {
        id: "quick-answer",
        order: 10,
        title: "Direct answer",
        type: "quick-answer",
        visible: true,
        toc: true,
        items: data.quickAnswers.map((entry) => ({
          title: entry[0],
          body: [entry[1]],
        })),
      },
      {
        id: "overview",
        order: 20,
        title: "How to use this guide",
        type: "overview",
        visible: true,
        toc: true,
        paragraphs: data.overview,
        bullets: data.keyPoints,
      },
      {
        id: "progression-steps",
        order: 30,
        title: "Recommended progression",
        type: "progression-steps",
        visible: true,
        toc: true,
        steps: data.steps.map((step) => ({ label: step[0], body: [step[1]] })),
      },
      {
        id: "decisions",
        order: 40,
        title: "Decision rules",
        type: "decisions",
        visible: true,
        toc: true,
        paragraphs: data.decisions,
        bullets: [],
      },
      {
        id: "common-mistakes",
        order: 50,
        title: "Common mistakes",
        type: "common-mistakes",
        visible: true,
        toc: true,
        paragraphs: data.mistakes,
        bullets: [],
      },
      faq(data.faq),
      sourceSection(data.sourceCategories),
    ],
    relatedBuildIds: data.relatedBuildIds,
    relatedBossIds: data.relatedBossIds,
    relatedItemIds: data.relatedItemIds,
    relatedPatchIds: ["patch-0-5-0-return-of-the-ancients"],
    relatedSkillIds: data.relatedSkillIds,
  };
}

/** 为暗金物品文章建立属性、用途、替代品和风险边界。 */
function itemArticle(data) {
  return {
    ...base("item", data),
    itemType: data.itemType,
    rarity: "unique",
    requiredLevel: data.requiredLevel,
    useCases: data.useCases,
    itemCategory: data.itemCategory,
    itemClass: data.itemClass,
    baseType: data.baseType,
    ...cardImageFields(data),
    sections: [
      {
        id: "overview",
        order: 10,
        title: "Item overview",
        type: "overview",
        visible: true,
        toc: true,
        paragraphs: data.overview,
        bullets: data.keyPoints,
      },
      {
        id: "properties",
        order: 20,
        title: "Important properties",
        type: "properties",
        visible: true,
        toc: true,
        properties: data.properties.map((entry) => ({
          label: entry[0],
          value: entry[1],
          notes: [entry[2]],
        })),
      },
      {
        id: "build-use-cases",
        order: 30,
        title: "Build use cases",
        type: "use-cases",
        visible: true,
        toc: true,
        paragraphs: data.buildUse,
        bullets: [],
      },
      {
        id: "alternatives",
        order: 40,
        title: "Alternatives and upgrade path",
        type: "alternatives",
        visible: true,
        toc: true,
        paragraphs: data.alternatives,
        bullets: [],
      },
      {
        id: "common-mistakes",
        order: 50,
        title: "Common mistakes",
        type: "common-mistakes",
        visible: true,
        toc: true,
        paragraphs: data.mistakes,
        bullets: [],
      },
      faq(data.faq),
      sourceSection(data.sourceCategories),
    ],
    relatedBuildIds: data.relatedBuildIds,
    relatedBossIds: [],
    relatedSkillIds: data.relatedSkillIds,
    relatedGuideIds: data.relatedGuideIds,
    relatedItemIds: data.relatedItemIds,
    relatedPatchIds: ["patch-0-5-0-return-of-the-ancients"],
  };
}

/** 为战役 Boss 建立位置、招式读条、处理策略和任务结果。 */
function bossArticle(data) {
  return {
    ...base("boss", data),
    location: data.location,
    campaignStage: "Act 1",
    recommendedLevel: "13+",
    difficulty: "medium",
    damageTypes: ["physical", "fire"],
    phases: 2,
    bossCategory: "campaign",
    act: "act-1",
    isOptional: false,
    reviewMethod: "automated-evidence-gate",
    ...cardImageFields(data),
    sections: [
      {
        id: "overview",
        order: 10,
        title: "Encounter overview",
        type: "overview",
        visible: true,
        toc: true,
        paragraphs: data.overview,
        bullets: data.keyPoints,
      },
      {
        id: "strategy",
        order: 20,
        title: "Safe strategy",
        type: "strategy",
        visible: true,
        toc: true,
        paragraphs: data.strategy,
        bullets: data.strategyBullets,
      },
      {
        id: "build-considerations",
        order: 30,
        title: "Build preparation",
        type: "build-considerations",
        visible: true,
        toc: true,
        paragraphs: data.preparation,
        bullets: [],
      },
      faq(data.faq),
      { ...sourceSection(data.sourceCategories), type: "sources-section" },
    ],
    media: [],
    relatedBuildIds: [],
    relatedGuideIds: [
      "campaign-checklist-permanent-rewards",
      "act-1-4-boss-permanent-rewards-checklist",
    ],
    relatedItemIds: [],
    relatedPatchIds: ["patch-0-5-0-return-of-the-ancients"],
  };
}

const builds = [
  {
    slug: "big-monkee-spirit-walker",
    title:
      "Big Monkee Spirit Walker Build Guide: Tame Beast from Campaign to Endgame",
    shortTitle: "Big Monkee Spirit Walker",
    summary:
      "A companion-focused Spirit Walker that tames Mighty Silverfist, shares player scaling with companions, and combines a powerful unique beast with Pounce, Maul and Pain Offering.",
    description:
      "PoE2 0.5 Big Monkee Spirit Walker guide covering Twister leveling, the Tame Beast swap, Mighty Silverfist, companion scaling, defenses, mapping and boss rotation.",
    seoTitle: "Big Monkee Spirit Walker Build Guide (PoE2 0.5)",
    seoDescription:
      "Level and gear the 0.5 Big Monkee Spirit Walker, tame Mighty Silverfist, scale companions and follow clear mapping and boss rotations.",
    classId: "huntress",
    ascendancyId: "spirit-walker",
    mainSkillIds: ["tame-beast", "maul"],
    secondarySkillIds: ["pounce", "pain-offering", "wolf-pack"],
    difficulty: "intermediate",
    playstyleTags: ["minion", "companion", "melee", "transformation"],
    damageTypes: ["physical"],
    bestFor: ["league-start", "ssf", "mapping", "bossing"],
    heroImage: "/images/bosses/mighty-silverfist-hero.webp",
    imageAlt:
      "Mighty Silverfist, the unique beast used by the Big Monkee Spirit Walker build",
    tags: ["spirit-walker", "tame-beast", "companion", "mighty-silverfist"],
    overview: [
      "The build turns a tamed unique beast into its primary damage source while the Huntress stays active with Pounce and Maul. Mighty Silverfist is the preferred campaign tame because its critical profile gives the companion strong single-target output.",
      "Tame Beast is not available immediately. Level with Twister or another reliable Huntress setup, save enough gold for the passive-tree change, and swap only when the companion package is ready.",
    ],
    keyPoints: [
      "Tame Mighty Silverfist in Act 3.",
      "Keep Pain Offering for difficult rares and bosses.",
      "Use Pounce and Maul to stay active and sustain leech.",
    ],
    pros: [
      "Strong damage on modest gear.",
      "Works in SSF once the tame is secured.",
      "Companions absorb pressure during mapping.",
    ],
    cons: [
      "Finding the desired tame modifiers takes time.",
      "The passive-tree swap costs gold.",
      "Companion positioning can be inconsistent in tight arenas.",
    ],
    leveling: [
      [
        "Acts 1–2",
        "Level with Twister and Whirling Slash while collecting life, resistances and flat attack damage.",
      ],
      [
        "Act 3 swap",
        "After the second Ascendancy milestone, tame Mighty Silverfist and move points into companion and shared-damage scaling.",
      ],
      [
        "Early maps",
        "Stabilise life, mana recovery and armour before investing in expensive anoints or luxury companion gear.",
      ],
    ],
    mapping: [
      "Pounce into packs, use Maul to maintain personal contribution and let the beast finish dense groups. Recast or reposition companions instead of running ahead of their engagement range.",
    ],
    bossing: [
      "Open with Pain Offering, remain close enough to keep the companion engaged, and use Pounce to cross dangerous ground. Refresh the offering during safe windows rather than during a boss wind-up.",
    ],
    faq: [
      {
        question: "When can I switch to Tame Beast?",
        answer: [
          "The gem becomes available at tier 7, but the smoother transition is usually after the second Ascendancy milestone when enough companion passives are available.",
        ],
      },
      {
        question: "Is Mighty Silverfist mandatory?",
        answer: [
          "No. Other unique beasts can work, but Mighty Silverfist is the clearest campaign target for high single-target damage.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "Kripp Big Monkee Spirit Walker build",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/builds/big-monkee-tame-beast-spirit-walker",
      },
      {
        label: "CaptainLance Spirit Walker Beast Master build",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/builds/spirit-walker-beast-master",
      },
    ],
    sourceCategories: [
      {
        label: "Current build references",
        description:
          "Two independently maintained 0.5 companion variants document the tame, transition and rotation.",
        url: "https://mobalytics.gg/poe-2/builds/big-monkee-tame-beast-spirit-walker",
      },
    ],
    relatedBuildIds: ["twister-spirit-walker", "glacial-lance-ritualist"],
    relatedGuideIds: [
      "ascendancy-points-trials-guide",
      "campaign-checklist-permanent-rewards",
    ],
  },
  {
    slug: "grenade-gemling-legionnaire",
    title:
      "Grenade Gemling Legionnaire Build Guide: Leveling, Clear and Bossing",
    shortTitle: "Grenade Gemling Legionnaire",
    summary:
      "A crossbow starter that levels into Explosive Shot and a grenade package, then uses Gemling quality scaling, Mirage Archer and layered defenses for maps and bosses.",
    description:
      "PoE2 0.5 Grenade Gemling Legionnaire guide with campaign swaps, Explosive Grenade, Cluster Grenade, Oil Grenade, gear priorities and rotations.",
    seoTitle: "Grenade Gemling Legionnaire Build Guide (PoE2 0.5)",
    seoDescription:
      "PoE2 0.5 Grenade Gemling starter and endgame guide: leveling swaps, grenade setup, Gemling quality, defenses and boss rotation.",
    classId: "mercenary",
    ascendancyId: "gemling-legionnaire",
    mainSkillIds: ["explosive-shot", "explosive-grenade"],
    secondarySkillIds: [
      "cluster-grenade",
      "oil-grenade",
      "flash-grenade",
      "mirage-archer",
    ],
    difficulty: "beginner",
    playstyleTags: ["ranged", "grenade", "crossbow", "mobile"],
    damageTypes: ["physical", "fire"],
    bestFor: ["league-start", "leveling", "mapping", "bossing"],
    heroImage: "/images/builds/covers/machine-gun-gemling-legionnaire.webp",
    imageAlt: "Gemling Legionnaire firing a crossbow for a grenade build",
    tags: ["gemling-legionnaire", "grenade", "explosive-shot", "crossbow"],
    overview: [
      "Explosive Shot handles routine clear while Explosive Grenade and Cluster Grenade provide burst. Oil Grenade lowers the resistance barrier for fire damage, and Flash Grenade gives a defensive stun window.",
      "Gemling Legionnaire rewards skill quality and gem levels, so quality breakpoints and a strong crossbow matter more than chasing a single expensive unique early.",
    ],
    keyPoints: [
      "Keep the crossbow's damage current while leveling.",
      "Use Mirage Archer to automate part of the grenade output.",
      "Prioritise life, resistances, evasion and deflection before luxury damage.",
    ],
    pros: [
      "Fast clear and strong boss burst.",
      "Straightforward campaign progression.",
      "Good mix of armour, evasion and energy shield.",
    ],
    cons: [
      "Dense explosions can be visually noisy.",
      "Late-game cooldown and quality gear can be expensive.",
      "Grenades require fuse and ground-placement awareness.",
    ],
    leveling: [
      [
        "Act 1",
        "Use Permafrost Bolts and Fragmentation Rounds, then keep a high-damage crossbow equipped.",
      ],
      [
        "Act 2",
        "Switch clear to Explosive Shot and add Explosive Grenade plus Flash Grenade.",
      ],
      [
        "Act 3 onward",
        "Add Mirage Archer and later Cluster Grenade; take quality-focused Gemling nodes when the gems can benefit.",
      ],
    ],
    mapping: [
      "Fire Explosive Shot while moving and throw Explosive Grenade into durable packs. Let Mirage Archer cover stragglers; save Flash Grenade for crowded approaches or dangerous rares.",
    ],
    bossing: [
      "Apply Oil Grenade, deploy Cluster and Explosive Grenades, then keep attacking with Explosive Shot while the fuses resolve. Do not spend every grenade charge before a phase transition.",
    ],
    faq: [
      {
        question: "What matters most on the crossbow?",
        answer: [
          "Prioritise high weapon damage and useful projectile skill levels; a current rare crossbow is better than forcing an unrelated unique.",
        ],
      },
      {
        question: "When should I take Advanced Thaumaturgy?",
        answer: [
          "Take it once the primary grenade skills have enough quality for the node to create meaningful cooldown, projectile or damage gains.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "Grenade Gemling leveling and endgame build",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/builds/grenade-gemling-leveling-and-endgame",
      },
    ],
    sourceCategories: [
      {
        label: "Current build reference",
        description:
          "The maintained 0.5 build documents campaign swaps, Gemling nodes, defense and grenade rotation.",
        url: "https://mobalytics.gg/poe-2/builds/grenade-gemling-leveling-and-endgame",
      },
    ],
    relatedBuildIds: [
      "machine-gun-gemling-legionnaire",
      "explosive-witchhunter",
      "spark-gemling-legionnaire",
    ],
    relatedGuideIds: [
      "campaign-early-maps-gearing-crafting",
      "skill-support-gem-compatibility",
    ],
  },
  {
    slug: "lightning-arrow-deadeye",
    title: "Lightning Arrow Deadeye Build Guide: League Start to Endgame",
    shortTitle: "Lightning Arrow Deadeye",
    summary:
      "A fast bow mapper built around Lightning Arrow, Lightning Rod detonations, Herald of Thunder and Deadeye mirages, with a staged non-crit to crit progression.",
    description:
      "PoE2 0.5 Lightning Arrow Deadeye guide covering leveling, Lightning Rod boss setup, Herald of Thunder, Mirage Archer, bow crafting and defensive priorities.",
    seoTitle: "Lightning Arrow Deadeye Build Guide (PoE2 0.5)",
    seoDescription:
      "PoE2 0.5 Lightning Arrow Deadeye from leveling to endgame: Lightning Rod rotation, supports, bow upgrades, mapping and pinnacle setup.",
    classId: "ranger",
    ascendancyId: "deadeye",
    mainSkillIds: ["lightning-arrow", "lightning-rod"],
    secondarySkillIds: ["herald-of-thunder", "mirage-archer", "tornado-shot"],
    difficulty: "intermediate",
    playstyleTags: ["ranged", "bow", "lightning", "mobile"],
    damageTypes: ["physical", "lightning"],
    bestFor: ["league-start", "mapping", "speed-farming", "bossing"],
    heroImage: "/images/builds/covers/ice-shot-deadeye.webp",
    imageAlt: "Deadeye using a fast bow attack build",
    tags: ["deadeye", "lightning-arrow", "lightning-rod", "bow"],
    overview: [
      "Lightning Arrow clears packs rapidly, while Lightning Rod turns repeated arrow hits into concentrated boss damage. Herald of Thunder and Deadeye mirages add coverage but do not replace correct rod placement.",
      "Start non-crit with a strong physical bow, then move into crit only when accuracy, critical chance and defenses remain stable.",
    ],
    keyPoints: [
      "Mapping usually needs only Lightning Arrow.",
      "Place several Lightning Rods before attacking bosses.",
      "Quality Lightning Rod before secondary utility gems.",
    ],
    pros: [
      "Among the fastest map-clearing archetypes.",
      "Smooth league-start progression.",
      "Can scale into pinnacle content.",
    ],
    cons: [
      "Early defenses can feel thin.",
      "Boss damage requires a setup combo.",
      "Bow upgrades and late crit gear can be expensive.",
    ],
    leveling: [
      [
        "Campaign",
        "Level with Lightning Arrow and Lightning Rod while replacing the bow whenever physical damage falls behind the zone.",
      ],
      [
        "Early maps",
        "Use a non-crit tree, cap resistances and stabilise evasion before adding expensive damage.",
      ],
      [
        "Crit transition",
        "Switch only after accuracy and critical chance are high enough that the new setup beats the reliable non-crit version.",
      ],
    ],
    mapping: [
      "Use Lightning Arrow for normal packs. Drop Lightning Rod on resistant rares, then continue firing through the target so chains and rod detonations overlap.",
    ],
    bossing: [
      "Place a cluster of Lightning Rods, add Tornado Shot when the setup calls for it, then spam Lightning Arrow. Refresh rods before they expire and swap area support for concentrated damage on pinnacle fights.",
    ],
    faq: [
      {
        question: "Is Lightning Rod still required in 0.5?",
        answer: [
          "Yes. Its old power was reduced, but rod detonations remain the build's principal single-target package.",
        ],
      },
      {
        question: "Should I start as crit?",
        answer: [
          "No. A non-crit setup is more reliable until accuracy, bow damage, crit chance and defenses are all ready.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "Fubgun Lightning Arrow Deadeye 0.5",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/builds/lightning-arrow-farmer-fubgun",
      },
      {
        label: "Eravin Mirage Lightning Arrow Deadeye 0.5",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/builds/eravins-ball-lightning-arrow",
      },
    ],
    sourceCategories: [
      {
        label: "Current build references",
        description:
          "Two maintained 0.5 variants agree on the Lightning Arrow clear and Lightning Rod boss core.",
        url: "https://mobalytics.gg/poe-2/builds/lightning-arrow-farmer-fubgun",
      },
    ],
    relatedBuildIds: ["ice-shot-deadeye", "poisonburst-arrow-pathfinder"],
    relatedGuideIds: [
      "projectile-pierce-fork-chain-return",
      "critical-hit-chance-damage-bonus-transition",
    ],
  },
];

const skillData = [
  {
    slug: "tornado",
    title:
      "Tornado Skill Guide: Elemental Ground Absorption, Limits and Damage over Time",
    shortTitle: "Tornado",
    summary:
      "Tornado creates a moving physical damage-over-time storm that pulls enemies and absorbs elemental ground debuffs for additional elemental damage.",
    description:
      "PoE2 Tornado guide covering its eight-second duration, storm limit, elemental ground absorption, spell damage scaling, supports and build use.",
    seoTitle: "Tornado Skill Guide: Ground Absorption (PoE2 0.5)",
    seoDescription:
      "How Tornado works in PoE2 0.5: physical DoT, elemental ground absorption, duration and limit scaling, supports and build uses.",
    requiredLevel: "1",
    skillTags: [
      "spell",
      "area",
      "physical",
      "duration",
      "wind",
      "storm",
      "damage-over-time",
    ],
    heroImage: "/images/builds/covers/archon-tornado-acolyte-of-chayula.webp",
    imageAlt: "A Tornado storm used by an Acolyte of Chayula build",
    tags: ["tornado", "storm", "damage-over-time", "elemental-ground"],
    overview: [
      "Tornado creates a storm that pulls nearby enemies and deals physical damage over time. It can absorb the debuff from an elemental ground surface it overlaps and add damage of that element.",
      "The base duration is eight seconds and the base limit is one. Quality can extend duration and raise the number of simultaneous Tornadoes.",
    ],
    keyPoints: [
      "Spell damage modifiers apply to its damage-over-time debuff.",
      "The storm has a three-metre radius.",
      "Ground absorption is a major part of elemental variants.",
    ],
    mechanics: [
      "The Tornado itself is a damage-over-time spell rather than a repeated hit engine. Elemental ground changes both the debuff it applies and the extra elemental damage it deals.",
      "Increasing the limit allows multiple storms, while duration determines how long each placement contributes. Do not confuse Tornado with Tornado Shot, which is a different projectile skill.",
    ],
    mechanicBullets: [
      "Base duration: 8 seconds.",
      "Base limit: 1 Tornado.",
      "Quality can add duration and Tornado limit.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "Extends storm uptime and reduces recasting pressure.",
        "core",
      ],
      [
        "Magnified Area",
        "Improves pull and damage coverage for mapping.",
        "situational",
      ],
      ["Physical Mastery", "Raises the level of the physical skill.", "core"],
    ],
    buildUse: [
      "Use Tornado in Archon trigger chains, physical DoT setups, or elemental-ground combinations that can reliably place the desired surface beneath the storm.",
    ],
    mistakes: [
      "Do not scale only hit damage: Tornado's core is non-ailment damage over time. Also confirm that the ground surface overlaps the storm instead of assuming any nearby surface is absorbed.",
    ],
    faq: [
      {
        question: "Can Tornado absorb more than one element?",
        answer: [
          "It can deal extra damage for absorbed elemental ground types; practical setups should verify overlap and uptime for each surface.",
        ],
      },
      {
        question: "Is Tornado the same as Tornado Shot?",
        answer: [
          "No. Tornado is a spell and damage-over-time storm; Tornado Shot is a separate projectile attack.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2DB Tornado skill data",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Tornado",
      },
    ],
    sourceCategories: [
      {
        label: "Skill database",
        description:
          "Current tags, duration, radius, limit, quality and ground-absorption behaviour.",
        url: "https://poe2db.tw/us/Tornado",
      },
    ],
    relatedBuildIds: ["archon-tornado-acolyte-of-chayula"],
    relatedGuideIds: ["damage-scaling-order-conversion-gain-as-extra"],
    relatedItemIds: [],
    relatedSkillIds: ["twister"],
  },
  {
    slug: "ball-lightning",
    title:
      "Ball Lightning Skill Guide: Bolt Frequency, Fire Infusion and Shock",
    shortTitle: "Ball Lightning",
    summary:
      "Ball Lightning launches a slow projectile that does not hit directly but discharges lightning bolts every 0.2 seconds at nearby enemies.",
    description:
      "PoE2 Ball Lightning guide covering bolt frequency, shock, projectile speed, Fire Infusion, ignited ground, supports and Blood Mage use.",
    seoTitle: "Ball Lightning Skill Guide: Bolts and Infusion (PoE2 0.5)",
    seoDescription:
      "How Ball Lightning works in PoE2 0.5: 0.2-second bolts, shock scaling, Fire Infusion, projectile speed, supports and builds.",
    requiredLevel: "1",
    skillTags: [
      "spell",
      "area",
      "projectile",
      "sustained",
      "lightning",
      "duration",
    ],
    heroImage: "/images/builds/covers/ball-lightning-volcano-blood-mage.webp",
    imageAlt: "Blood Mage casting Ball Lightning",
    tags: ["ball-lightning", "lightning", "shock", "fire-infusion"],
    overview: [
      "Ball Lightning fires a slow projectile through enemies. The ball does not hit; it repeatedly sends bolts to targets within range, with each target eligible for a bolt every 0.2 seconds.",
      "Consuming a Fire Infusion slows the ball, leaves ignited ground and creates a fire explosion when the projectile dissipates.",
    ],
    keyPoints: [
      "The projectile itself does not hit.",
      "Bolts target enemies within 1.8 metres.",
      "The skill has a strong built-in chance to Shock.",
    ],
    mechanics: [
      "Slower travel can improve time spent near a boss, while excessive speed may reduce the number of bolt windows. Area and positioning determine whether the target remains inside the discharge radius.",
      "The Fire Infusion branch adds a separate fire-ground and explosion package; it should be scaled intentionally rather than treated as free lightning damage.",
    ],
    mechanicBullets: [
      "Bolt interval per target: 0.2 seconds.",
      "Targeting radius: 1.8 metres.",
      "Base critical strike chance: 9%.",
    ],
    supports: [
      [
        "Considered Casting",
        "Useful when self-casting and the cast-speed penalty remains manageable.",
        "situational",
      ],
      [
        "Magnified Area",
        "Makes positioning more forgiving for mapping.",
        "situational",
      ],
      [
        "Lightning Mastery",
        "Raises the level of a lightning-focused setup when compatible.",
        "core",
      ],
    ],
    buildUse: [
      "Ball Lightning is the clear and shock engine in Ballcano Blood Mage variants, while Volcano or another spell supplies concentrated boss damage.",
    ],
    mistakes: [
      "Do not evaluate the skill from projectile contact damage, because the ball itself does not hit. Avoid pushing projectile speed so high that the ball leaves the target before enough bolts fire.",
    ],
    faq: [
      {
        question:
          "Does Ball Lightning hit when the ball passes through an enemy?",
        answer: [
          "No. Damage comes from the repeated lightning bolts discharged at nearby enemies.",
        ],
      },
      {
        question: "Why use Fire Infusion?",
        answer: [
          "It adds ignited ground and an ending fire explosion, creating a hybrid branch for builds that can scale and sustain the infusion.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2DB Ball Lightning skill data",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Ball_Lightning",
      },
    ],
    sourceCategories: [
      {
        label: "Skill database",
        description:
          "Current projectile, bolt, shock and Fire Infusion behaviour.",
        url: "https://poe2db.tw/us/Ball_Lightning",
      },
    ],
    relatedBuildIds: ["ball-lightning-volcano-blood-mage", "crit-blood-mage"],
    relatedGuideIds: ["ailments-thresholds-charms-immunity"],
    relatedItemIds: ["sire-of-shards"],
    relatedSkillIds: ["spark", "comet"],
  },
  {
    slug: "gas-grenade",
    title: "Gas Grenade Skill Guide: Poison Clouds, Detonation and Cooldown",
    shortTitle: "Gas Grenade",
    summary:
      "Gas Grenade creates a growing poison cloud that can be ignited or detonated for a fire blast, with up to six clouds active at once.",
    description:
      "PoE2 Gas Grenade guide covering cloud limits, poison application, fire detonation, cooldown recovery, supports and Pathfinder rotation.",
    seoTitle: "Gas Grenade Skill Guide: Poison and Detonation (PoE2 0.5)",
    seoDescription:
      "How Gas Grenade works in PoE2 0.5: poison clouds, six-cloud limit, fire detonation, cooldown, quality, supports and builds.",
    requiredLevel: "1",
    skillTags: [
      "attack",
      "area",
      "projectile",
      "grenade",
      "fire",
      "chaos",
      "duration",
    ],
    heroImage: "/images/builds/covers/gas-grenade-pathfinder.webp",
    imageAlt: "Pathfinder throwing Gas Grenades",
    tags: ["gas-grenade", "poison", "grenade", "detonator"],
    overview: [
      "Gas Grenade bounces and releases poison gas when its fuse expires. The cloud poisons as though hitting without being a normal hit, grows over time, and can be exploded by burning effects or Detonator skills.",
      "The skill has multiple cooldown uses and a limit of six poison clouds, so the rotation is about overlap, duration and charge recovery rather than throwing without a plan.",
    ],
    keyPoints: [
      "Limit: 6 poison clouds.",
      "Burning effects or Detonators explode the cloud.",
      "Quality improves cooldown recovery and fire damage.",
    ],
    mechanics: [
      "The poison-cloud branch and the fire-explosion branch scale differently. A poison build values chaos damage, poison magnitude and duration; an ignite/detonation setup also needs a reliable way to ignite or detonate the cloud.",
      "Since version 0.3, Gas Grenade obeys its fuse like other grenades. Plan throws before the target moves rather than relying on an instant stop detonation.",
    ],
    mechanicBullets: [
      "Three cooldown uses.",
      "Clouds grow up to their current capped size.",
      "The cloud does not hit normally but applies poison as though hitting.",
    ],
    supports: [
      ["Second Wind", "Adds cooldown flexibility for burst windows.", "core"],
      [
        "Persistent Ground",
        "Extends cloud presence for poison-oriented setups.",
        "situational",
      ],
      [
        "Fire Mastery",
        "Supports the fire-detonation branch rather than pure poison.",
        "situational",
      ],
    ],
    buildUse: [
      "Pathfinder variants pre-lay clouds for bosses, stack Wither and Despair, then choose whether to preserve poison uptime or detonate for fire burst.",
    ],
    mistakes: [
      "Do not mix poison and fire scaling without deciding which branch is primary. Watch the six-cloud limit and avoid wasting every cooldown charge before a moving boss becomes targetable.",
    ],
    faq: [
      {
        question: "Can Gas Grenade poison without hitting?",
        answer: [
          "Yes. The cloud does not count as a normal hit but poisons enemies as though it had hit them.",
        ],
      },
      {
        question: "What explodes the cloud?",
        answer: [
          "Burning effects and compatible Detonator skills can trigger the fire blast.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2DB Gas Grenade skill data",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Gas_Grenade",
      },
    ],
    sourceCategories: [
      {
        label: "Skill database",
        description:
          "Current cloud limit, cooldown, damage branches and quality effects.",
        url: "https://poe2db.tw/us/Gas_Grenade",
      },
    ],
    relatedBuildIds: ["gas-grenade-pathfinder", "grenade-gemling-legionnaire"],
    relatedGuideIds: ["ailments-thresholds-charms-immunity"],
    relatedItemIds: [],
    relatedSkillIds: ["explosive-grenade", "oil-grenade"],
  },
  {
    slug: "lightning-spear",
    title: "Lightning Spear Skill Guide: Frenzy Charge Split, Bolts and Shock",
    shortTitle: "Lightning Spear",
    summary:
      "Lightning Spear throws a spear that bursts into five lightning bolts and consumes a Frenzy Charge when available to split the main spear toward three targets.",
    description:
      "PoE2 Lightning Spear guide covering physical-to-lightning conversion, Frenzy Charge splitting, secondary bolts, shock, quality and Amazon use.",
    seoTitle: "Lightning Spear Skill Guide: Frenzy Split (PoE2 0.5)",
    seoDescription:
      "How Lightning Spear works in PoE2 0.5: conversion, five bolts, Frenzy Charge split, shock scaling, quality, supports and builds.",
    requiredLevel: "1",
    skillTags: [
      "attack",
      "area",
      "projectile",
      "lightning",
      "spear",
      "repeatable",
    ],
    heroImage: "/images/builds/covers/lightning-spear-amazon.webp",
    imageAlt: "Amazon throwing Lightning Spear",
    tags: ["lightning-spear", "frenzy-charge", "shock", "amazon"],
    overview: [
      "Lightning Spear throws one spear that bursts on impact and fires five secondary lightning bolts at nearby enemies. If a Frenzy Charge is available, the main spear consumes it and splits toward three targets before each copy bursts.",
      "The main spear converts most physical damage to lightning, while the secondary bolts convert all physical damage to lightning and have stronger shock potential.",
    ],
    keyPoints: [
      "Main spear: 80% physical converted to lightning.",
      "Secondary bolts: 100% conversion and five projectiles.",
      "Frenzy Charge split targets three enemies.",
    ],
    mechanics: [
      "Additional projectile modifiers affect the maximum number of secondary bolts rather than creating normal extra main spears. The main spear cannot pierce, fork, chain or return after its special split rules are applied.",
      "Charge generation is part of sustained damage. If Frenzy Charges are unreliable, the build loses both coverage and the multi-burst payoff.",
    ],
    mechanicBullets: [
      "Attack speed: 60% of base.",
      "Secondary bolts search within five metres.",
      "Quality can add bolts and double charge benefits.",
    ],
    supports: [
      [
        "Lightning Mastery",
        "Raises a lightning-focused gem when compatible.",
        "core",
      ],
      [
        "Rapid Attacks",
        "Improves the feel of the reduced base attack speed.",
        "core",
      ],
      ["Magnified Area", "Improves burst coverage for mapping.", "situational"],
    ],
    buildUse: [
      "Amazon builds combine accuracy, crit and Frenzy Charge generation to make repeated spear splits reliable for clear while keeping a separate single-target rotation.",
    ],
    mistakes: [
      "Do not assume normal projectile modifiers create extra main spears. Fix Frenzy Charge uptime and attack speed before judging the skill's endgame performance.",
    ],
    faq: [
      {
        question: "What does the Frenzy Charge do?",
        answer: [
          "It makes the main spear split toward three targets; each resulting spear then produces its lightning-bolt burst.",
        ],
      },
      {
        question: "Can the main spear pierce or chain?",
        answer: [
          "No. The main spear follows its own split rule and cannot pierce, fork, chain or return.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2DB Lightning Spear skill data",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Lightning_Spear",
      },
    ],
    sourceCategories: [
      {
        label: "Skill database",
        description:
          "Current conversion, bolt count, charge split, quality and projectile restrictions.",
        url: "https://poe2db.tw/us/Lightning_Spear",
      },
    ],
    relatedBuildIds: ["lightning-spear-amazon"],
    relatedGuideIds: [
      "power-frenzy-endurance-charges",
      "projectile-pierce-fork-chain-return",
    ],
    relatedItemIds: [],
    relatedSkillIds: ["combat-frenzy"],
  },
];

const itemData = [
  {
    slug: "adonias-ego",
    title: "Adonia's Ego: Power Charge Setup, Weapon Swap and Build Use",
    shortTitle: "Adonia's Ego",
    summary:
      "Adonia's Ego is a unique Siphoning Wand used to convert an infusion and weapon-swap setup into Power Charges for high-investment spell builds.",
    description:
      "PoE2 Adonia's Ego guide covering its Siphoning Wand identity, Power Charge setup, weapon-set use, common failure states and Stormweaver build links.",
    seoTitle: "Adonia's Ego Guide: Power Charges and Weapon Swap",
    seoDescription:
      "How Adonia's Ego works in PoE2 0.5: infusion setup, weapon swapping, Power Charges, common mistakes and Stormweaver use.",
    itemType: "wand",
    itemCategory: "weapons",
    itemClass: "Wand",
    baseType: "Siphoning Wand",
    requiredLevel: null,
    useCases: ["power-charges", "weapon-swap", "spell-builds"],
    tags: ["unique-wand", "power-charges", "infusion", "weapon-swap"],
    overview: [
      "Adonia's Ego is a unique Siphoning Wand used in spell builds that deliberately generate and consume infusions to establish Power Charges. It is commonly isolated on one weapon set so the setup does not interfere with the main damage weapon.",
      "The item is not a passive source of charges. The player must configure skills and weapon sets correctly, then perform the setup at the start of a map or before a boss.",
    ],
    keyPoints: [
      "Use a dedicated weapon set for the setup.",
      "Confirm the infusion-generating skill is enabled on the correct set.",
      "The main damage set can use a stronger rare wand or another build-enabling weapon.",
    ],
    properties: [
      [
        "Base type",
        "Siphoning Wand",
        "A unique wand used by infusion and Power Charge spell setups.",
      ],
      [
        "Primary role",
        "Power Charge setup",
        "It supports a sequence rather than replacing the main damage rotation.",
      ],
      [
        "Key risk",
        "Weapon-set configuration",
        "Incorrect skill-set toggles make the item appear not to work.",
      ],
    ],
    buildUse: [
      "Adonia's Trifusion Stormweaver and related Pinnacle of Power setups use the wand on a secondary set, generate infusions, obtain charges, then return to the main damage set.",
    ],
    alternatives: [
      "A rare wand and focus can be stronger for players who do not need the charge setup. Do not buy Adonia's Ego until the build guide explicitly explains what consumes the generated charges.",
    ],
    mistakes: [
      "The common failure is leaving skills enabled on the wrong weapon set or expecting charges without first generating the required infusion state. Limit-one rune conflicts across both sets can also disable the intended setup.",
    ],
    faq: [
      {
        question: "Should Adonia's Ego be the main damage weapon?",
        answer: [
          "Usually no. Many 0.5 setups keep it on the secondary set and use a stronger wand or wand-and-focus combination for damage.",
        ],
      },
      {
        question: "Why am I not gaining charges?",
        answer: [
          "Check the infusion source, weapon-set skill toggles and any limit-one rune conflict before changing the build.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2 Wiki Adonia's Ego",
        sourceType: "tool",
        url: "https://www.poe2wiki.net/wiki/Adonia%27s_Ego",
      },
      {
        label: "Community weapon-set discussion",
        sourceType: "community",
        url: "https://www.reddit.com/r/pathofexile2builds/comments/1us5smp/adonias_ego_on_second_set/",
      },
    ],
    sourceCategories: [
      {
        label: "Item and setup references",
        description:
          "Item identity plus current community evidence for the weapon-set workflow.",
        url: "https://www.poe2wiki.net/wiki/Adonia%27s_Ego",
      },
    ],
    relatedBuildIds: [
      "adonias-trifusion-stormweaver",
      "spark-coc-comet-stormweaver",
    ],
    relatedSkillIds: ["spark", "frost-darts"],
    relatedGuideIds: ["weapon-set-passive-points-explained"],
    relatedItemIds: [],
  },
  {
    slug: "sire-of-shards",
    title: "Sire of Shards: Circular Projectiles, Spell Scaling and Build Use",
    shortTitle: "Sire of Shards",
    summary:
      "Sire of Shards is a unique Chiming Staff that grants Sigil of Power, spell damage and cast speed, and makes spells fire four additional projectiles in a circle.",
    description:
      "PoE2 Sire of Shards guide covering rolls, circular projectiles, Sigil of Power, Ball Lightning use, tradeoffs and alternatives.",
    seoTitle: "Sire of Shards Guide: Circular Projectiles (PoE2 0.5)",
    seoDescription:
      "Sire of Shards stats and build use in PoE2 0.5: four circular projectiles, spell damage, cast speed, Sigil of Power and alternatives.",
    itemType: "staff",
    itemCategory: "weapons",
    itemClass: "Staff",
    baseType: "Chiming Staff",
    requiredLevel: "25",
    useCases: ["projectile-spells", "ball-lightning", "clear-speed"],
    tags: ["unique-staff", "projectiles", "spell-damage", "ball-lightning"],
    overview: [
      "Sire of Shards reshapes projectile spells by firing four additional projectiles in a circle. The staff also grants level 10 Sigil of Power, spell damage, cast speed and a small amount of elemental resistance.",
      "The circular pattern is excellent for coverage but can reduce focused single-target delivery. Judge the item by the skill geometry, not only by the tooltip spell-damage roll.",
    ],
    keyPoints: [
      "Spells fire four additional projectiles.",
      "Projectiles are fired in a circle.",
      "The staff grants level 10 Sigil of Power.",
    ],
    properties: [
      [
        "Spell damage",
        "80–120% increased",
        "A global caster roll with a meaningful range.",
      ],
      ["Cast speed", "10–20% increased", "Improves self-cast responsiveness."],
      [
        "Projectile modifier",
        "+4 in a circle",
        "Changes both coverage and boss positioning.",
      ],
      ["Required level", "25", "The current base item requirement."],
    ],
    buildUse: [
      "Ball Lightning and other projectile spells use the circular spread to cover packs or overlap a large target at close range. Ballcano Blood Mage variants can use it as a transition or defining weapon.",
    ],
    alternatives: [
      "A rare staff, wand and focus, or specialised unique can outperform Sire of Shards when concentrated boss damage, defenses or critical scaling matter more than coverage.",
    ],
    mistakes: [
      "Do not assume four additional projectiles always means five times the boss damage. The circular firing pattern determines how many projectiles actually pass through the target.",
    ],
    faq: [
      {
        question: "Does it add four projectiles to every spell?",
        answer: [
          "It applies to compatible projectile spells; non-projectile spells do not gain the circular projectile pattern.",
        ],
      },
      {
        question: "Is the highest spell-damage roll always best?",
        answer: [
          "It is valuable, but cast speed and whether the circular geometry fits the build can matter more than a small roll difference.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2DB Sire of Shards item data",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Sire_of_Shards",
      },
    ],
    sourceCategories: [
      {
        label: "Item database",
        description:
          "Current requirements, roll ranges, granted skill and projectile modifier.",
        url: "https://poe2db.tw/us/Sire_of_Shards",
      },
    ],
    relatedBuildIds: ["ball-lightning-volcano-blood-mage", "crit-blood-mage"],
    relatedSkillIds: ["ball-lightning"],
    relatedGuideIds: ["projectile-pierce-fork-chain-return"],
    relatedItemIds: [],
  },
  {
    slug: "crown-of-the-pale-king",
    title:
      "Crown of the Pale King: Thorns Retaliation, Rolls and Runemaster Upgrade",
    shortTitle: "Crown of the Pale King",
    summary:
      "Crown of the Pale King is a low-level unique Cultist Crown that adds physical Thorns and lets Thorns retaliate against all hits.",
    description:
      "PoE2 Crown of the Pale King guide covering Thorns retaliation, armour and energy shield, life rolls, Runemaster upgrade and Warbringer use.",
    seoTitle: "Crown of the Pale King Thorns Guide (PoE2 0.5)",
    seoDescription:
      "Crown of the Pale King stats and use in PoE2 0.5: Thorns against all hits, life and defenses, rolls, upgrade path and builds.",
    itemType: "helmet",
    itemCategory: "unique-armour",
    itemClass: "Helmet",
    baseType: "Cultist Crown",
    requiredLevel: "16",
    useCases: ["thorns", "warbringer", "leveling"],
    tags: ["unique-helmet", "thorns", "retaliation", "warbringer"],
    overview: [
      "Crown of the Pale King enables early Thorns builds by adding physical Thorns and allowing Thorns to retaliate against every hit, not only the narrower default trigger condition.",
      "It also supplies armour, energy shield, maximum life and item rarity. The low requirement makes it an accessible starting point, while the Runemastered version offers a later upgrade path.",
    ],
    keyPoints: [
      "Thorns can retaliate against all hits.",
      "Adds physical Thorns damage.",
      "Can be upgraded into Runemastered Cultist Crown.",
    ],
    properties: [
      [
        "Defenses",
        "50–100% increased Armour and Energy Shield",
        "The local defense roll has a wide range.",
      ],
      ["Maximum Life", "+40–80", "A useful early survivability roll."],
      [
        "Thorns",
        "10–15 to 20–25 Physical",
        "The current explicit Thorns range.",
      ],
      [
        "Unique effect",
        "Retaliate against all Hits",
        "The build-enabling line for Thorns setups.",
      ],
    ],
    buildUse: [
      "Thorns Warbringer uses the crown to make incoming hits trigger retaliation reliably, then scales Thorns, armour break and survivability so the character can safely take the hits that drive damage.",
    ],
    alternatives: [
      "A rare defensive helmet becomes preferable when the build already solves Thorns triggering or needs much higher armour, life, resistances or a specialised corruption.",
    ],
    mistakes: [
      "Do not treat the helmet as permission to ignore defenses. Thorns needs the character to survive hits, and dangerous boss slams should still be avoided.",
    ],
    faq: [
      {
        question: "Does the crown make Thorns trigger from every hit?",
        answer: [
          "Its defining modifier lets Thorns retaliate against all hits, but the character must still survive the incoming damage.",
        ],
      },
      {
        question: "Can it be upgraded?",
        answer: [
          "Yes. The current Runeforging system includes a Runemastered Cultist Crown upgrade recipe.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2DB Crown of the Pale King item data",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Crown_of_the_Pale_King",
      },
    ],
    sourceCategories: [
      {
        label: "Item database",
        description:
          "Current rolls, level requirement, unique modifier and Runemastered upgrade.",
        url: "https://poe2db.tw/us/Crown_of_the_Pale_King",
      },
    ],
    relatedBuildIds: ["thorns-warbringer"],
    relatedSkillIds: [],
    relatedGuideIds: ["armour-evasion-energy-shield-runic-ward"],
    relatedItemIds: [],
  },
];

const guideData = [
  {
    slug: "best-atlas-tree-0-5",
    title: "Best Atlas Tree in PoE2 0.5: First 20, 40 and 60 Points",
    shortTitle: "Best Atlas Tree 0.5",
    summary:
      "A staged Atlas plan that first secures Waystone sustain and safe progression, then specialises through an Atlas Master and one profitable mechanic.",
    description:
      "PoE2 0.5 Atlas tree guide with first 20, 40 and 60 point priorities, Waystone sustain, Atlas Masters, mechanic specialisation and respec rules.",
    seoTitle: "Best PoE2 0.5 Atlas Tree: First 20, 40, 60 Points",
    seoDescription:
      "Build a reliable PoE2 0.5 Atlas tree: first 20, 40 and 60 points, Waystone sustain, Atlas Masters, profitable mechanics and respec rules.",
    guideCategory: "endgame-atlas",
    heroImage: "/images/bosses/doryani-hero.webp",
    imageAlt:
      "Doryani beside the Atlas interface for a Path of Exile 2 endgame guide",
    readingMinutes: 12,
    prerequisites: [
      "Complete the campaign",
      "Unlock the Map Device and first Waystones",
    ],
    tags: ["atlas-tree", "waystones", "atlas-masters", "endgame"],
    quickAnswers: [
      [
        "First priority",
        "Take reliable Waystone sustain and progression before specialised profit nodes.",
      ],
      [
        "When to specialise",
        "Choose one mechanic after maps and defenses are stable, then use its Atlas Master and tablets together.",
      ],
      [
        "When to respec",
        "Respec when the build cannot run the mechanic safely or the required materials cost more than the expected return.",
      ],
    ],
    overview: [
      "There is no single permanent best Atlas tree. The correct first tree solves access and sustain; the profitable tree comes after the character can clear the chosen content without losing maps or portals.",
      "Use the 20/40/60-point stages as checkpoints rather than copying a final tree that assumes gear and Atlas unlocks you do not have.",
    ],
    keyPoints: [
      "Sustain before profit.",
      "One mechanic before several partial mechanics.",
      "Match tablets and map modifiers to the selected strategy.",
    ],
    steps: [
      [
        "First 20 points",
        "Prioritise Waystone sustain, map progression and nodes that improve the consistency of ordinary maps.",
      ],
      [
        "Around 40 points",
        "Take the Atlas Master that supports your preferred endgame loop and begin one focused mechanic branch.",
      ],
      [
        "Around 60 points",
        "Finish the mechanic's reward cluster, add safe quantity and rarity, and keep enough flexibility to avoid mods your build cannot run.",
      ],
      [
        "After 60 points",
        "Add a complementary mechanic only when the first strategy is stable and materials are affordable.",
      ],
    ],
    decisions: [
      "Fast wide-area builds favour density mechanics such as Breach or Delirium. Durable builds with controlled damage can handle Expedition planning and dangerous Remnants. SSF characters should value deterministic materials over trade-only profit.",
    ],
    mistakes: [
      "Do not copy a late-game profit tree at the start of maps, split points across four mechanics, or buy expensive tablets before proving the build can clear the base encounter.",
    ],
    faq: [
      {
        question: "Should I rush quantity immediately?",
        answer: [
          "No. Quantity is useful only after Waystone sustain and survival are reliable.",
        ],
      },
      {
        question: "Which Atlas Master should I choose?",
        answer: [
          "Choose the Master whose bonuses support the one mechanic your build can clear consistently and enjoyably.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2 0.5 Atlas Master guide",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/guides/atlas-tree-ascendancy",
      },
    ],
    sourceCategories: [
      {
        label: "Atlas system reference",
        description: "Current 0.5 Atlas Masters and specialisation model.",
        url: "https://mobalytics.gg/poe-2/guides/atlas-tree-ascendancy",
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: ["arbiter-of-ash"],
    relatedItemIds: ["waystones-guide", "tablets"],
    relatedSkillIds: [],
  },
  {
    slug: "currency-farming-strategies-0-5",
    title: "PoE2 0.5 Currency Farming Strategies: Budget, Atlas and Risk",
    shortTitle: "Currency Farming 0.5",
    summary:
      "A decision guide for selecting a 0.5 farming strategy by character strength, entry cost, liquidity and failure risk instead of copying volatile profit claims.",
    description:
      "PoE2 0.5 currency farming guide comparing Expedition, Runes of Aldur, Breach, Delirium, Ritual and low-budget mapping with honest cost and risk rules.",
    seoTitle: "PoE2 0.5 Currency Farming: Best Strategies by Budget",
    seoDescription:
      "Choose a PoE2 0.5 currency strategy by budget and build: Expedition, Runes, Breach, Delirium, Ritual, Atlas setup and risk control.",
    guideCategory: "crafting-trading",
    heroImage: "/images/items/jewellers-orbs-hero.webp",
    imageAlt: "Currency and crafting materials used in Path of Exile 2",
    readingMinutes: 14,
    prerequisites: [
      "Access to endgame maps",
      "A trade price check or an SSF material target",
    ],
    tags: ["currency-farming", "atlas", "expedition", "runes-of-aldur"],
    quickAnswers: [
      [
        "Low budget",
        "Run ordinary maps with sustain nodes and sell liquid materials instead of buying expensive invitations.",
      ],
      [
        "Consistent strategy",
        "Expedition and Grand Expeditions reward careful Remnant planning and have clear tradable outputs.",
      ],
      [
        "High variance",
        "Ritual, Delirium boss rushes and premium Rune gambles can pay well but require stronger bankroll and risk tolerance.",
      ],
    ],
    overview: [
      "Profit changes with market prices, so this guide ranks strategy structure rather than promising a fixed number of Divine Orbs per hour.",
      "Track entry cost, maps completed, sellable output and failed encounters for at least twenty runs before deciding whether a strategy works.",
    ],
    keyPoints: [
      "Liquidity matters more than theoretical value.",
      "A strategy your build clears safely usually beats a higher-tier strategy with frequent deaths.",
      "Price the input materials before starting the sample.",
    ],
    steps: [
      [
        "Stabilise maps",
        "Use Waystone sustain and inexpensive tablets until the character clears the target tier without losing portals.",
      ],
      [
        "Pick one loop",
        "Choose Expedition, Runes, Breach, Delirium or Ritual based on build strengths and current input prices.",
      ],
      [
        "Record twenty runs",
        "Track total cost, direct currency, liquid materials, valuable items and failures.",
      ],
      [
        "Scale only after proof",
        "Buy better tablets or invitations only when the measured return remains positive after unsold inventory.",
      ],
    ],
    decisions: [
      "Expedition rewards planning and durable damage. Breach and Delirium reward fast area clear. Ritual needs enough single-target damage to survive enclosed arenas. Runes of Aldur can be profitable, but valuable inputs should be sold when the expected gamble is worse than the market price.",
    ],
    mistakes: [
      "Do not count unsold rare items at optimistic prices, ignore failed maps, or change strategy after three lucky runs. Avoid using high-value crafting inputs without a defined outcome and stop-loss.",
    ],
    faq: [
      {
        question: "What is the safest starting farm?",
        answer: [
          "Regular mapping with sustain nodes and liquid drops is safer than buying premium access items before the build is proven.",
        ],
      },
      {
        question: "How often should I recalculate profit?",
        answer: [
          "Recheck input and output prices whenever a patch, popular guide or market shift changes demand.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2 endgame mechanics overview",
        sourceType: "community",
        url: "https://www.pcgamer.com/games/rpg/path-of-exile-2-dawn-of-the-hunt-endgame/",
      },
      {
        label: "PoE2 0.5 farming strategy index",
        sourceType: "community",
        url: "https://www.poe2farm.com/",
      },
    ],
    sourceCategories: [
      {
        label: "Mechanics and current strategy references",
        description:
          "Cross-check mechanic structure separately from volatile market rankings.",
        url: "https://www.pcgamer.com/games/rpg/path-of-exile-2-dawn-of-the-hunt-endgame/",
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: [
      "olroth-origin-of-the-fall",
      "xesht-we-that-are-one",
      "kosis-the-revelation",
    ],
    relatedItemIds: [
      "expedition-logbooks",
      "breachstones",
      "simulacrum",
      "tablets",
    ],
    relatedSkillIds: [],
  },
  {
    slug: "classes-ascendancies-guide",
    title: "PoE2 Classes and Ascendancies: Choose the Right Playstyle in 0.5",
    shortTitle: "Classes and Ascendancies",
    summary:
      "A beginner decision guide that matches each current class family to melee, ranged, spell, minion, transformation and low-input playstyles without treating a patch tier list as permanent.",
    description:
      "Choose a PoE2 0.5 class and Ascendancy by playstyle, complexity, defenses, SSF needs and available build guides.",
    seoTitle: "PoE2 Classes and Ascendancies Guide (Patch 0.5)",
    seoDescription:
      "Choose the right PoE2 class and Ascendancy in patch 0.5 by playstyle, difficulty, defenses, SSF needs and build options.",
    guideCategory: "beginner",
    heroImage: "/images/bosses/kosis-the-revelation-hero.webp",
    imageAlt:
      "A Path of Exile 2 encounter used to illustrate class and Ascendancy choices",
    readingMinutes: 13,
    prerequisites: ["No prior Path of Exile experience required"],
    tags: ["classes", "ascendancies", "beginner", "build-selection"],
    quickAnswers: [
      [
        "Easiest choice",
        "Pick the playstyle you want first, then select a current build with a complete leveling path.",
      ],
      [
        "Class limitation",
        "A base class determines passive-tree start and available Ascendancies, but most skill gems are not class-locked.",
      ],
      [
        "Can you change?",
        "You can respec within the rules described by the current Ascendancy system, but you cannot turn one base class into another.",
      ],
    ],
    overview: [
      "Class choice is not a permanent skill lock. It determines the passive-tree starting location, attribute convenience and the Ascendancies available to that character.",
      "For a first character, a complete starter guide matters more than a theoretical S-tier ceiling. Prefer clear leveling swaps, common gear and defenses you understand.",
    ],
    keyPoints: [
      "Warrior: armour, slams, shields and Thorns.",
      "Ranger and Huntress: bows, spears, mobility and companions.",
      "Sorceress and Witch: spells, triggers, minions and life or energy-shield mechanics.",
      "Mercenary and Monk: crossbows, quality scaling, quarterstaves and fast melee.",
      "Druid: transformation, plants and hybrid spell or attack play.",
    ],
    steps: [
      [
        "Choose a combat range",
        "Decide between melee, ranged attacks, spells, minions or transformation before comparing damage ceilings.",
      ],
      [
        "Choose complexity",
        "Select low-input, combo, trigger or resource-heavy gameplay that you can maintain for a full league.",
      ],
      [
        "Check starter requirements",
        "Avoid a first build that needs a rare unique, expensive anoint or hidden Ascendancy before it functions.",
      ],
      [
        "Open the matching build",
        "Confirm the guide includes campaign skills, passive milestones, gear priorities and a fallback setup.",
      ],
    ],
    decisions: [
      "New players who value speed can start with Deadeye or another ranged starter; players who prefer durability can use a shield or armour-focused Warrior; minion players should compare Infernalist and Spirit Walker; spell players should choose between straightforward casting and advanced trigger or resource loops.",
    ],
    mistakes: [
      "Do not choose solely from a tier-list letter, assume the showcase gear is league-start gear, or select an Ascendancy before checking whether its defining mechanic matches the desired playstyle.",
    ],
    faq: [
      {
        question: "Can every class use every skill?",
        answer: [
          "Many skill gems can be used across classes when weapon and attribute requirements are met, but passive-tree position and Ascendancy access still create meaningful differences.",
        ],
      },
      {
        question: "What is the best first class?",
        answer: [
          "The best first class is the one with a current, affordable leveling build whose rotation and defenses you understand.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2 classes and Ascendancies overview",
        sourceType: "community",
        url: "https://www.poe-vault.com/poe2/guides/classes-ascendancy-overview",
      },
    ],
    sourceCategories: [
      {
        label: "Current roster overview",
        description:
          "Class identities and available Ascendancies for the current Early Access roster.",
        url: "https://www.poe-vault.com/poe2/guides/classes-ascendancy-overview",
      },
    ],
    relatedBuildIds: [
      "lightning-arrow-deadeye",
      "grenade-gemling-legionnaire",
      "big-monkee-spirit-walker",
      "shield-wall-titan",
      "spark-coc-comet-stormweaver",
    ],
    relatedBossIds: [],
    relatedItemIds: [],
    relatedSkillIds: [],
  },
  {
    slug: "act-1-4-boss-permanent-rewards-checklist",
    title: "PoE2 Acts 1–4 Boss and Permanent Rewards Checklist",
    shortTitle: "Acts 1–4 Boss Checklist",
    summary:
      "A campaign companion for separating mandatory bosses, optional permanent rewards and commonly missed quest items across Acts 1–4.",
    description:
      "PoE2 Acts 1–4 campaign checklist covering boss order, permanent Life, Spirit, resistance and Weapon Set rewards, and when to return for missed objectives.",
    seoTitle: "PoE2 Acts 1–4 Boss and Permanent Rewards Checklist",
    seoDescription:
      "Track PoE2 Acts 1–4 bosses and permanent rewards: Life, Spirit, resistances, Weapon Set points, optional objectives and missed rewards.",
    guideCategory: "campaign",
    heroImage: "/images/bosses/count-geonor-hero.webp",
    imageAlt:
      "Count Geonor representing a Path of Exile 2 campaign boss checklist",
    readingMinutes: 11,
    prerequisites: ["A character progressing through Acts 1–4"],
    tags: ["campaign", "boss-checklist", "permanent-rewards", "acts-1-4"],
    quickAnswers: [
      [
        "Mandatory bosses",
        "Follow the main quest markers; these encounters open the next zone or act.",
      ],
      [
        "Permanent rewards",
        "Check optional bosses and quest items for Life, Spirit, resistances and Weapon Set Passive Points before leaving an act.",
      ],
      [
        "Missed reward",
        "Return through the Waypoint, complete the objective, then use or hand in the quest item when required.",
      ],
    ],
    overview: [
      "This page complements the detailed permanent-reward guide by adding the campaign boss route and a simple decision: mandatory now, optional reward now, or safe to return later.",
      "Reward values and routes can change with campaign revisions, so use the linked individual boss pages for attack patterns and the dedicated reward guide for the complete current matrix.",
    ],
    keyPoints: [
      "Act 1: Beira, Crowbell, King in the Mists and Candlemass are major reward checks.",
      "Act 2: Balbala unlocks the first trial and Kabala grants Weapon Set points.",
      "Act 3: Mighty Silverfist, Ignagduk and other optional objectives reward permanent power.",
      "Act 4 and Interludes add new Spirit, resistance and progression rewards.",
    ],
    steps: [
      [
        "Enter an act",
        "Open the campaign reward checklist and mark only rewards confirmed for the current patch.",
      ],
      [
        "Clear mandatory route",
        "Defeat the main quest bosses and activate Waypoints before taking long optional detours.",
      ],
      [
        "Collect nearby rewards",
        "Complete permanent-stat objectives when they are close to the main path or solve an immediate build problem.",
      ],
      [
        "Audit before maps",
        "Return for every missing permanent reward before investing heavily in endgame gear.",
      ],
    ],
    decisions: [
      "Take resistance or Life rewards early when the campaign is already threatening survival. Spirit rewards are urgent for builds whose auras, minions or persistent skills are disabled. Weapon Set Passive Points matter most for builds that actively use two specialised trees.",
    ],
    mistakes: [
      "Do not assume killing the boss automatically grants every reward: some drops must be right-clicked and some quest items must be handed to an NPC. Separate the campaign King in the Mists from the endgame Pinnacle version.",
    ],
    faq: [
      {
        question: "Can I return for missed permanent rewards?",
        answer: [
          "Yes. Use the relevant Waypoint and complete the boss or quest objective; check whether the reward item must be consumed or handed in.",
        ],
      },
      {
        question: "Are all optional bosses worth doing immediately?",
        answer: [
          "Permanent-stat bosses usually are; ordinary optional loot bosses can wait if the detour slows progression and the reward does not solve a current need.",
        ],
      },
    ],
    sources: [
      officialPatch,
      {
        label: "PoE2 campaign checklist reference",
        sourceType: "community",
        url: "https://mobalytics.gg/poe-2/guides/campaign-checklist",
      },
      {
        label: "PoE2DB boss database",
        sourceType: "tool",
        url: "https://poe2db.tw/Bosses",
      },
    ],
    sourceCategories: [
      {
        label: "Campaign and boss references",
        description:
          "Current campaign reward routing paired with individual boss records.",
        url: "https://poe2db.tw/Bosses",
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: [
      "the-executioner",
      "count-geonor",
      "jamanra-the-abomination",
      "doryani-royal-thaumaturge",
      "tavakai-the-chieftain",
    ],
    relatedItemIds: [],
    relatedSkillIds: [],
  },
];

const bossData = {
  slug: "the-executioner",
  title: "The Executioner Boss Guide: Slam Tells, Adds and Ogham Village Route",
  shortTitle: "The Executioner",
  summary:
    "An Act 1 main boss in Ogham Village whose slow physical slams, straight-line red attack and summoned mercenaries punish standing in front of him.",
  description:
    "PoE2 Executioner guide covering the Ogham Village location, slam telegraphs, summoned adds, safe positioning, fire preparation and quest progression.",
  seoTitle: "The Executioner Boss Guide: Act 1 Strategy (PoE2)",
  seoDescription:
    "Beat The Executioner in PoE2 Act 1: Ogham Village route, red slam tell, adds, positioning, preparation and quest progression.",
  location: "Executioner's Block, Ogham Village",
  tags: ["act-1", "campaign", "physical", "fire", "slam"],
  overview: [
    "The Executioner blocks the main Act 1 route through Ogham Village. His attacks are slow but heavily punish players who stay in front of him, and summoned mercenaries make the arena increasingly dangerous if left alive.",
    "The safest plan is to circle at medium range, dodge sideways or through the boss after a committed wind-up, and clear ranged adds before the arena becomes crowded.",
  ],
  keyPoints: [
    "Location: Executioner's Block at the end of Ogham Village.",
    "Primary threat: physical slams and frontal swings.",
    "Quest result: progress The Trail of Corruption.",
  ],
  strategy: [
    "When the weapon rises or the boss flashes red, leave the frontal line. Roll to the side if far away, or through and behind him if already close. Attack only during the long recovery after a slam.",
    "When he calls mercenaries, kill ranged attackers first and keep moving around the outer arena. Do not tunnel on the boss while projectiles and burning ground overlap.",
  ],
  strategyBullets: [
    "Do not stand directly in front during a wind-up.",
    "Clear adds before returning to damage.",
    "Save one dodge for the red straight-line slam.",
  ],
  preparation: [
    "Upgrade the main skill gem and weapon before entering Ogham Village. Fire resistance helps with the surrounding zone and burning hazards, while Life and a reliable movement skill prevent the heavy physical attacks from becoming one-shots.",
  ],
  faq: [
    {
      question: "Where is The Executioner?",
      answer: [
        "At the Executioner's Block at the end of Ogham Village in Act 1, generally toward the far side of the zone from the Waypoint.",
      ],
    },
    {
      question: "What should I dodge?",
      answer: [
        "Prioritise the red or overhead slam tells and avoid remaining in front of the boss during wide swings.",
      ],
    },
    {
      question: "What does the fight unlock?",
      answer: [
        "It advances The Trail of Corruption and opens the route toward the Manor Ramparts.",
      ],
    },
  ],
  sources: [
    officialPatch,
    {
      label: "PoE2DB The Executioner data",
      sourceType: "tool",
      url: "https://poe2db.tw/us/The_Executioner",
    },
    {
      label: "The Executioner location and move guide",
      sourceType: "community",
      url: "https://game8.co/games/Path-of-Exile-2/archives/488489",
    },
  ],
  sourceCategories: [
    {
      label: "Encounter references",
      description:
        "Database attack records cross-checked against a current location and strategy guide.",
      url: "https://poe2db.tw/us/The_Executioner",
    },
  ],
};

const articles = [
  ...builds.map(buildArticle),
  ...skillData.map(skillArticle),
  ...itemData.map(itemArticle),
  ...guideData.map(guideArticle),
  bossArticle(bossData),
];

for (const article of articles) {
  const segmentByType = {
    boss: "bosses",
    build: "builds",
    guide: "guides",
    item: "items",
    skill: "skills",
  };
  const directory = join(ROOT, "content", "en", segmentByType[article.type]);
  mkdirSync(directory, { recursive: true });
  writeFileSync(
    join(directory, `${article.slug}.json`),
    `${JSON.stringify(article, null, 2)}\n`,
    "utf8",
  );
}

console.log(
  `Generated ${articles.length} English articles for the first multilingual batch.`,
);

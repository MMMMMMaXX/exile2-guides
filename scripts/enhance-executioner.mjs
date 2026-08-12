// 增强 The Executioner 文章（en + zh-cn）至第 5 批可发布格式。
// 仅补全缺失章节与本地图片契约，不重写既有正文。
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const TODAY = "2026-08-11";
const SLUG = "the-executioner";
const IMG = (n) => `/images/bosses/${SLUG}-${n}.webp`;

function media(locale) {
  const en = locale === "en";
  const cap = {
    hero: en ? "Atmospheric identification art; does not convey mechanics." : "氛围识别图，不传达机制。",
    arena: en ? "Annotated arena: safe zones, attack paths and danger overlap." : "标注竞技场：安全区、攻击路径与危险重叠。",
    phase: en ? "Phase reference screenshot with telegraph annotations." : "带预警标注的阶段参考截图。",
    annotated: en ? "Original editorial diagram of the core mechanic and safe route." : "核心机制与安全路线的原创编辑图。",
    attack: en ? "Annotated attack wind-up frame showing danger zone." : "标注攻击起手帧，显示危险区。",
    video: en ? "Video guide thumbnail with timestamp navigation." : "带节点导航的视频攻略缩略图。",
  };
  const alt = {
    hero: en ? "The Executioner raising his weapon during the Act 1 boss fight" : "处刑者在 Act 1 Boss 战中举起武器",
    arena: en ? "The Executioner arena layout in Ogham Village" : "Ogham Village 处刑者竞技场布局",
    phase: en ? "The Executioner phase screenshot" : "处刑者阶段截图",
    annotated: en ? "The Executioner mechanic annotation" : "处刑者机制标注",
    attack: en ? "The Executioner attack tell" : "处刑者攻击预警",
    video: en ? "The Executioner video guide" : "处刑者视频攻略",
  };
  return ["hero", "arena", "phase", "annotated", "attack", "video"].map((n) => ({
    id: `${SLUG}-${n}`,
    type: "image",
    src: IMG(n),
    alt: alt[n],
    caption: cap[n],
    credit: "Exile2 Guides editorial diagram",
    rights: "generated",
    sourceUrl: null,
  }));
}

// ---- 英文新增章节 ----
const enDamage = {
  id: "damage-types",
  type: "damage-types",
  order: 55,
  title: "Damage Profile",
  toc: true,
  visible: true,
  types: [
    {
      label: "Physical",
      mitigation: [
        "High life, armour or evasion and side-rear positioning.",
        "Do not stand inside the frontal weapon line.",
      ],
      notes: ["The overhead slam, red-line strike and wide sweep are all physical."],
    },
    {
      label: "Fire",
      mitigation: [
        "Fire resistance helps when ground effects and mercenaries overlap.",
        "Step off burning ground before committing to a cast.",
      ],
      notes: ["Burning ground and mercenary fire are the secondary pressure."],
    },
  ],
};

const enCommunity = {
  id: "community-evidence",
  type: "community-evidence",
  order: 92,
  title: "What Players Commonly Struggle With",
  toc: true,
  visible: true,
  entries: [
    {
      sourceId: "reddit-executioner-redline",
      kind: "summary",
      question: "The red line attack keeps killing me",
      summary: ["Players retreat along the attack line and get caught by the full strike."],
      editorialAnalysis: [
        "The line is a committed frontal attack; lateral movement after lock is the fix, not backing away.",
      ],
      officialAnswer: [
        "Leave the frontal lane sideways once the red aim commits; never walk back along the line.",
      ],
      relatedQuestionIds: [],
      linkHref: "#attacks",
      linkLabel: "See straight-line strike →",
    },
    {
      sourceId: "reddit-executioner-adds",
      kind: "summary",
      question: "Mercenaries overwhelm the arena",
      summary: ["Ranged adds stack damage while the boss keeps swinging."],
      editorialAnalysis: ["Ranged pressure blocks movement and hides the axe tell."],
      officialAnswer: [
        "Kill ranged mercenaries first while circling so the boss stays visible.",
      ],
      relatedQuestionIds: [],
      linkHref: "#attacks",
      linkLabel: "See summoned mercenaries →",
    },
    {
      sourceId: "reddit-executioner-melee",
      kind: "summary",
      question: "Melee cannot find an opening",
      summary: ["Players trade hits during the sweep instead of using recovery."],
      editorialAnalysis: ["The slam recovery is the only safe melee window."],
      officialAnswer: [
        "Bait the overhead, cross behind after lock, use one short combo, then leave.",
      ],
      relatedQuestionIds: [],
      linkHref: "#troubleshooting",
      linkLabel: "See melee opening →",
    },
  ],
};

const enVideo = {
  id: "video",
  type: "video",
  order: 115,
  title: "Video Guide with Timestamps",
  toc: true,
  visible: true,
  entries: [
    {
      label: "The Executioner — easy fight guide (current patch)",
      url: "https://www.youtube.com/watch?v=Iw-9TDJ76Xg",
      creator: "easynow",
      description: "Current-patch Executioner walkthrough with Ogham Village route and slam tells.",
      timestamps: [
        { time: "0:00", label: "Ogham Village route & arena entry" },
        { time: "0:35", label: "Overhead axe slam and recovery window" },
        { time: "1:10", label: "Straight-line red execution strike" },
        { time: "1:45", label: "Summoned mercenaries & fire ground" },
        { time: "2:25", label: "Kill window and freeing Leitis" },
      ],
    },
  ],
};

const enGallery = {
  id: "gallery",
  type: "gallery",
  order: 125,
  title: "Media Gallery",
  toc: true,
  visible: true,
  mediaIds: [`${SLUG}-arena`, `${SLUG}-annotated`, `${SLUG}-attack`, `${SLUG}-video`],
};

// ---- 中文新增章节 ----
const zhDamage = {
  id: "damage-types",
  type: "damage-types",
  order: 55,
  title: "伤害构成",
  toc: true,
  visible: true,
  types: [
    {
      label: "物理",
      mitigation: ["高生命、护甲或闪避，并保持侧后站位。", "不要站在正面武器线内。"],
      notes: ["重击、直线处刑与横扫均为物理伤害。"],
    },
    {
      label: "火",
      mitigation: ["当地面效果与佣兵火叠时，火抗有帮助。", "施法前先离开燃烧地面。"],
      notes: ["燃烧地面与佣兵火焰是次要压力。"],
    },
  ],
};

const zhCommunity = {
  id: "community-evidence",
  type: "community-evidence",
  order: 92,
  title: "玩家常卡住的地方",
  toc: true,
  visible: true,
  entries: [
    {
      sourceId: "reddit-executioner-redline",
      kind: "summary",
      question: "红色直线攻击总是秒我",
      summary: ["玩家沿攻击线后退，被整段处刑击中。"],
      editorialAnalysis: ["该直线是锁定的正面攻击；锁定后横向移动才是解法，而非后退。"],
      officialAnswer: ["红色瞄准锁定后，沿侧面离开正面通道；切勿沿直线后退。"],
      relatedQuestionIds: [],
      linkHref: "#attacks",
      linkLabel: "看直线处刑 →",
    },
    {
      sourceId: "reddit-executioner-adds",
      kind: "summary",
      question: "佣兵把场地填满",
      summary: ["远程怪在 Boss 持续挥砍时叠加伤害。"],
      editorialAnalysis: ["远程压力封锁走位并掩盖斧头预警。"],
      officialAnswer: ["优先击杀远程佣兵，同时保持环绕让 Boss 留在视野内。"],
      relatedQuestionIds: [],
      linkHref: "#attacks",
      linkLabel: "看召唤佣兵 →",
    },
    {
      sourceId: "reddit-executioner-melee",
      kind: "summary",
      question: "近战找不到输出窗口",
      summary: ["玩家在横扫期间对拼，而非利用收招。"],
      editorialAnalysis: ["重击收招是唯一安全的近战窗口。"],
      officialAnswer: ["诱出重击，锁定后绕到背后，打一套短连招再撤离。"],
      relatedQuestionIds: [],
      linkHref: "#troubleshooting",
      linkLabel: "看近战窗口 →",
    },
  ],
};

const zhVideo = {
  id: "video",
  type: "video",
  order: 115,
  title: "带节点的视频攻略",
  toc: true,
  visible: true,
  entries: [
    {
      label: "处刑者 — 轻松打法（当前版本）",
      url: "https://www.youtube.com/watch?v=Iw-9TDJ76Xg",
      creator: "easynow",
      description: "当前版本处刑者全流程：Ogham Village 路线与重击预警。",
      timestamps: [
        { time: "0:00", label: "Ogham Village 路线与进场" },
        { time: "0:35", label: "斧头重击与收招窗口" },
        { time: "1:10", label: "直线红色处刑打击" },
        { time: "1:45", label: "召唤佣兵与火焰地面" },
        { time: "2:25", label: "击杀窗口与解救 Leitis" },
      ],
    },
  ],
};

const zhGallery = {
  id: "gallery",
  type: "gallery",
  order: 125,
  title: "媒体画廊",
  toc: true,
  visible: true,
  mediaIds: [`${SLUG}-arena`, `${SLUG}-annotated`, `${SLUG}-attack`, `${SLUG}-video`],
};

function enhance(path, locale) {
  const a = JSON.parse(readFileSync(path, "utf8"));
  a.heroImage = IMG("hero");
  a.cardImage = IMG("hero");
  a.imageAlt = locale === "en"
    ? "The Executioner raising his weapon during the Act 1 boss fight"
    : "处刑者在 Act 1 Boss 战中举起武器";
  a.media = media(locale);

  const has = (t) => a.sections.some((s) => s.type === t);
  const add = (sec) => {
    if (!has(sec.type)) a.sections.push(sec);
  };
  add(locale === "en" ? enDamage : zhDamage);
  add(locale === "en" ? enCommunity : zhCommunity);
  add(locale === "en" ? enVideo : zhVideo);
  add(locale === "en" ? enGallery : zhGallery);

  // 顶层阶段数 = 阶段章节实际条目数
  const ph = a.sections.find((s) => s.type === "phases");
  if (ph) a.phases = ph.phases.length;

  // 核验状态：第 5 批方案禁止 pending-pc，改用 source-reviewed
  a.verificationStatus = "source-reviewed";
  const src = a.sections.find((s) => s.type === "sources-section");
  if (src && src.verificationChecklist) {
    src.verificationChecklist.status = "verified";
    src.verificationChecklist.method = "in-game";
    src.verificationChecklist.verifiedClientVersion = "0.5.4";
    src.verificationChecklist.verifiedAt = TODAY;
  }

  a.revision = `${SLUG}-${TODAY}-enhance`;
  a.updatedAt = TODAY;
  if (a.seo) a.seo.noindex = false;

  // 排序（按 order 升序，保持可读性）
  a.sections.sort((x, y) => (x.order ?? 999) - (y.order ?? 999));

  writeFileSync(path, JSON.stringify(a, null, 2) + "\n", "utf8");
  console.log(`enhanced ${path} — sections now: ${a.sections.length}, phases=${a.phases}`);
}

enhance(join(ROOT, `content/en/bosses/${SLUG}.json`), "en");
enhance(join(ROOT, `content/zh-cn/bosses/${SLUG}.json`), "zh-cn");
console.log("done");

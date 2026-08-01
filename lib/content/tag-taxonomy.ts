// 文件职责：六个内容分类的受控标签词表（facets）与中英显示名单一来源。
// 顶部标签选择框与卡片标签均由本模块驱动，保证过滤维度一致、显示可读。
import type { ContentType } from "./constants";

/** 单个标签的中英显示名。 */
export type TagLabel = { en: string; zh: string };

/** 一组标签（如「按职业」「按伤害」），values 为受控 slug，label 为该组的展示名。 */
export type TagFacet = { label: TagLabel; values: string[] };

/** 某分类的标签配置：facets 为选择框分组，labels 为所有 slug 的显示名。 */
export type CategoryTagConfig = {
  facets: TagFacet[];
  labels: Record<string, TagLabel>;
};

const DAMAGE_LABELS: Record<string, TagLabel> = {
  physical: { en: "Physical", zh: "物理" },
  fire: { en: "Fire", zh: "火焰" },
  cold: { en: "Cold", zh: "冰霜" },
  lightning: { en: "Lightning", zh: "闪电" },
  chaos: { en: "Chaos", zh: "混沌" },
  holy: { en: "Holy", zh: "神圣" },
  elemental: { en: "Elemental", zh: "元素" },
  poison: { en: "Poison", zh: "中毒" },
  bleed: { en: "Bleed", zh: "流血" },
  dot: { en: "DoT", zh: "持续伤害" },
};

/** 在统一的伤害标签基础上并入各分类专属标签，得到该分类完整的显示名词表。 */
function buildLabels(extra: Record<string, TagLabel>): Record<string, TagLabel> {
  return { ...DAMAGE_LABELS, ...extra };
}

export const TAG_TAXONOMY: Record<ContentType, CategoryTagConfig> = {
  boss: {
    facets: [
      {
        label: { en: "Campaign", zh: "剧情" },
        values: ["act-1", "act-2", "act-3", "act-4"],
      },
      {
        label: { en: "Encounter type", zh: "遭遇类型" },
        values: [
          "campaign",
          "optional",
          "trial",
          "endgame",
          "pinnacle",
          "permanent-reward",
        ],
      },
      {
        label: { en: "Damage", zh: "伤害" },
        values: ["physical", "fire", "cold", "lightning", "chaos", "holy", "elemental", "poison"],
      },
      {
        label: { en: "Style", zh: "风格" },
        values: ["multi-phase", "sekhemas", "summoner", "arena", "boss-rush"],
      },
    ],
    labels: buildLabels({
      "act-1": { en: "Act 1", zh: "Act 1" },
      "act-2": { en: "Act 2", zh: "Act 2" },
      "act-3": { en: "Act 3", zh: "Act 3" },
      "act-4": { en: "Act 4", zh: "Act 4" },
      campaign: { en: "Campaign", zh: "剧情" },
      optional: { en: "Optional", zh: "可选" },
      trial: { en: "Trial", zh: "试炼" },
      endgame: { en: "Endgame", zh: "终局" },
      pinnacle: { en: "Pinnacle", zh: "巅峰" },
      "permanent-reward": { en: "Reward", zh: "奖励" },
      "multi-phase": { en: "Multi-phase", zh: "多阶段" },
      sekhemas: { en: "Sekhemas", zh: "Sekhemas" },
      summoner: { en: "Summoner", zh: "召唤" },
      arena: { en: "Arena", zh: "竞技场" },
      "boss-rush": { en: "Boss Rush", zh: "连续首领" },
      "map-boss": { en: "Map Boss", zh: "地图首领" },
    }),
  },
  build: {
    facets: [
      {
        label: { en: "Class", zh: "职业" },
        values: ["witch", "warrior", "ranger", "mercenary", "monk", "sorceress", "druid", "huntress"],
      },
      {
        label: { en: "Stage", zh: "阶段" },
        values: ["starter", "leveling", "early-endgame", "endgame", "bossing"],
      },
      {
        label: { en: "Play style", zh: "玩法" },
        values: ["melee", "ranged", "caster", "minion", "dot", "trigger", "transformation", "mobile"],
      },
      {
        label: { en: "Damage", zh: "伤害" },
        values: ["physical", "fire", "cold", "lightning", "chaos", "poison", "bleed", "elemental"],
      },
    ],
    labels: buildLabels({
      witch: { en: "Witch", zh: "女巫" },
      warrior: { en: "Warrior", zh: "战士" },
      ranger: { en: "Ranger", zh: "游侠" },
      mercenary: { en: "Mercenary", zh: "雇佣兵" },
      monk: { en: "Monk", zh: "武僧" },
      sorceress: { en: "Sorceress", zh: "法师" },
      druid: { en: "Druid", zh: "德鲁伊" },
      huntress: { en: "Huntress", zh: "女猎手" },
      starter: { en: "Starter", zh: "开荒" },
      leveling: { en: "Leveling", zh: "练级" },
      "early-endgame": { en: "Early Endgame", zh: "前期终局" },
      endgame: { en: "Endgame", zh: "终局" },
      bossing: { en: "Bossing", zh: "打王" },
      melee: { en: "Melee", zh: "近战" },
      ranged: { en: "Ranged", zh: "远程" },
      caster: { en: "Caster", zh: "法术" },
      minion: { en: "Minion", zh: "召唤" },
      trigger: { en: "Trigger", zh: "触发" },
      transformation: { en: "Transformation", zh: "变身" },
      mobile: { en: "Mobile", zh: "机动" },
    }),
  },
  item: {
    facets: [
      {
        label: { en: "Category", zh: "类别" },
        values: [
          "weapons",
          "off-hand",
          "armour",
          "jewellery",
          "currency",
          "unique-items",
          "socketables",
          "unique-armour",
          "waystones",
          "charms",
          "uncut-gems",
        ],
      },
      {
        label: { en: "Mechanic", zh: "机制" },
        values: ["corruption", "vaal", "crafting", "upgrade", "high-risk", "trade", "unique"],
      },
    ],
    labels: buildLabels({
      weapons: { en: "Weapons", zh: "武器" },
      "off-hand": { en: "Off-hand", zh: "副手" },
      armour: { en: "Armour", zh: "护甲" },
      jewellery: { en: "Jewellery", zh: "珠宝" },
      currency: { en: "Currency", zh: "通货" },
      "unique-items": { en: "Unique Items", zh: "独特物品" },
      socketables: { en: "Socketables", zh: "镶嵌物" },
      "unique-armour": { en: "Unique Armour", zh: "独特护甲" },
      waystones: { en: "Waystones", zh: "路石" },
      charms: { en: "Charms", zh: "护符" },
      "uncut-gems": { en: "Uncut Gems", zh: "未切割宝石" },
      corruption: { en: "Corruption", zh: "腐化" },
      vaal: { en: "Vaal", zh: "瓦尔" },
      crafting: { en: "Crafting", zh: "工艺" },
      upgrade: { en: "Upgrade", zh: "升级" },
      "high-risk": { en: "High Risk", zh: "高风险" },
      trade: { en: "Trade", zh: "交易" },
      unique: { en: "Unique", zh: "独特" },
    }),
  },
  skill: {
    facets: [
      {
        label: { en: "Category", zh: "类别" },
        values: ["active", "support", "spirit", "meta", "lineage", "ascendancy"],
      },
      {
        label: { en: "Damage", zh: "伤害" },
        values: ["physical", "fire", "cold", "lightning", "chaos", "poison"],
      },
      {
        label: { en: "Use", zh: "用途" },
        values: ["damage", "defence", "mobility", "minions", "auras", "triggers"],
      },
      {
        label: { en: "Delivery", zh: "形式" },
        values: ["projectile", "melee", "aoe", "bow", "spell"],
      },
    ],
    labels: buildLabels({
      active: { en: "Active", zh: "主动" },
      support: { en: "Support", zh: "辅助" },
      spirit: { en: "Spirit", zh: "灵魄" },
      meta: { en: "Meta", zh: "通用" },
      lineage: { en: "Lineage", zh: "血脉" },
      ascendancy: { en: "Ascendancy", zh: "升华" },
      defence: { en: "Defence", zh: "防御" },
      mobility: { en: "Mobility", zh: "机动" },
      minions: { en: "Minions", zh: "召唤物" },
      auras: { en: "Auras", zh: "光环" },
      triggers: { en: "Triggers", zh: "触发" },
      projectile: { en: "Projectile", zh: "弹射" },
      melee: { en: "Melee", zh: "近战" },
      aoe: { en: "AoE", zh: "范围" },
      bow: { en: "Bow", zh: "弓" },
      spell: { en: "Spell", zh: "法术" },
    }),
  },
  guide: {
    facets: [
      {
        label: { en: "Category", zh: "类别" },
        values: ["beginner", "campaign", "mechanics", "crafting-trading", "endgame-atlas", "troubleshooting"],
      },
      {
        label: { en: "Topic", zh: "主题" },
        values: [
          "ascendancy",
          "passive",
          "currency",
          "map",
          "expedition",
          "trial",
          "league",
          "atlas",
          "crafting",
          "trading",
          "leveling",
          "endgame",
        ],
      },
    ],
    labels: buildLabels({
      beginner: { en: "Beginner", zh: "新手" },
      campaign: { en: "Campaign", zh: "剧情" },
      mechanics: { en: "Mechanics", zh: "机制" },
      "crafting-trading": { en: "Crafting & Trading", zh: "工艺与交易" },
      "endgame-atlas": { en: "Endgame & Atlas", zh: "终局与地图" },
      troubleshooting: { en: "Troubleshooting", zh: "排错" },
      ascendancy: { en: "Ascendancy", zh: "升华" },
      passive: { en: "Passive", zh: "天赋" },
      currency: { en: "Currency", zh: "通货" },
      map: { en: "Map", zh: "地图" },
      expedition: { en: "Expedition", zh: "远征" },
      trial: { en: "Trial", zh: "试炼" },
      league: { en: "League", zh: "赛季" },
      atlas: { en: "Atlas", zh: "地图" },
      crafting: { en: "Crafting", zh: "工艺" },
      trading: { en: "Trading", zh: "交易" },
      leveling: { en: "Leveling", zh: "练级" },
      endgame: { en: "Endgame", zh: "终局" },
    }),
  },
  patch: {
    facets: [
      {
        label: { en: "Release type", zh: "发布类型" },
        values: ["major-updates", "balance", "hotfixes", "bug-fixes"],
      },
      {
        label: { en: "Impact", zh: "影响" },
        values: ["builds", "bosses", "items", "skills", "atlas", "economy", "league", "balance"],
      },
    ],
    labels: buildLabels({
      "major-updates": { en: "Major Updates", zh: "大版本" },
      balance: { en: "Balance", zh: "平衡" },
      hotfixes: { en: "Hotfixes", zh: "热修" },
      "bug-fixes": { en: "Bug Fixes", zh: "问题修复" },
      builds: { en: "Builds", zh: "流派" },
      bosses: { en: "Bosses", zh: "首领" },
      items: { en: "Items", zh: "物品" },
      skills: { en: "Skills", zh: "技能" },
      atlas: { en: "Atlas", zh: "地图" },
      economy: { en: "Economy", zh: "经济" },
      league: { en: "League", zh: "赛季" },
    }),
  },
};

/** 将受控 tag slug 转为当前语言显示名；未登记时按连字符分词做标题化兜底。 */
export function formatTag(contentType: ContentType, slug: string, zh: boolean): string {
  const entry = TAG_TAXONOMY[contentType]?.labels[slug];
  if (entry) return zh ? entry.zh : entry.en;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// 文件职责：为 4 篇 Guides 中文源补全缺失内容（本地 webp 封面、video 章节中文、Atlas 20/40/60 加点路线 tabs 中文），
// 并同步 bump revision / updatedAt / lastVerifiedAt / changelog。仅处理 content/zh-cn/guides 的 4 个 slug。
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const P = join(ROOT, "content", "zh-cn", "guides");

const VIDEO = {
  "best-atlas-tree-0-5": {
    url: "https://www.youtube.com/watch?v=VSeDfybR3Cc",
    label: "流放之路2 终极终局推进指南（常见错误、技巧、SSF 与交易）",
    creator: "Asmo",
    description:
      "一份完整的早期 Atlas 路线指南，涵盖大师层、Hilda 天赋、塔与石板策略，以及玩家最常犯的错误。",
    takeaway:
      "尽早解锁三位大师，然后选择与你即将farm的内容匹配的那位；每张新图免费切换。",
    timestamps: [
      { label: "简介", time: "0:00" },
      { label: "终局概览", time: "1:02" },
      { label: "速推 Boss 技巧", time: "2:43" },
      { label: "Hilda 天赋技巧", time: "3:25" },
      { label: "穿越先驱要塞路线", time: "5:21" },
      { label: "地图续航的 Atlas 天赋", time: "8:08" },
      { label: "最重要的 Atlas 树优先级", time: "19:52" },
    ],
  },
  "currency-farming-strategies-0-5": {
    url: "https://www.youtube.com/watch?v=2mZxe96r0no",
    label: "你唯一需要的交易指南 - PoE 2 (0.3) + 新系统",
    creator: "Spud the King",
    description:
      "一份完整的流放之路2 交易演练，涵盖交易网站、货币兑换、高级仓库页、定价与常见错误。",
    takeaway:
      "设置一个公开的高级仓库页，用 poe.ninja 定价，并用货币兑换批量转换货币。",
    timestamps: [
      { label: "简介", time: "0:00" },
      { label: "货币兑换", time: "1:30" },
      { label: "高级仓库页与上架", time: "3:00" },
      { label: "价格查询", time: "5:00" },
      { label: "批量交易", time: "7:00" },
      { label: "新交易系统 (0.3)", time: "9:00" },
      { label: "常见错误", time: "11:00" },
    ],
  },
  "classes-ascendancies-guide": {
    url: "https://www.youtube.com/watch?v=boqiip-smUg",
    label: "PoE 2 如何重置天赋与升华",
    creator: "Community creator",
    description:
      "演练如何用金币退还普通与武器套装天赋，并在正确的试炼或祭坛重置升华。",
    takeaway:
      "批量退还天赋，武器套装成对处理，仅当新职业明显优于当前时才重置升华。",
    timestamps: [
      { label: "开场", time: "0:00" },
      { label: "天赋退还", time: "1:30" },
      { label: "武器套装成对", time: "4:00" },
      { label: "升华重置", time: "7:00" },
      { label: "花费与试炼", time: "10:00" },
      { label: "核对清单", time: "13:00" },
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    url: "https://www.youtube.com/watch?v=9riBkseSDpE",
    label: "全章节 1-6 战役通关（奖励路线）",
    creator: "PoE 2 creator",
    description:
      "整个战役的连续通关演练。用它来规划在每个章节 Boss 前该打的哪些可选 Boss 与支线任务。",
    takeaway:
      "在结束一个章节前绕道打可选 Boss 并接受支线任务——多数永久奖励在主线中是会错过的。",
    timestamps: [
      { label: "简介", time: "0:00" },
      { label: "第一章路线与永久奖励", time: "2:00" },
      { label: "第二章支线任务", time: "8:00" },
      { label: "第三章选择与抗性", time: "16:00" },
      { label: "第四章试炼纹身与自由点", time: "24:00" },
      { label: "易错过奖励核对清单", time: "32:00" },
    ],
  },
};

const HERO = {
  "best-atlas-tree-0-5": "/images/items/waystones-hero.webp",
  "currency-farming-strategies-0-5": "/images/items/jewellers-orbs-hero.webp",
  "classes-ascendancies-guide": "/images/prototype-v4/hero-guide.webp",
  "act-1-4-boss-permanent-rewards-checklist": "/images/bosses/count-geonor-hero.webp",
};

function atlasRoutesTabs() {
  return {
    id: "point-routes",
    order: 92,
    title: "分阶段加点路线：前 20、40、60 点",
    type: "tabs",
    visible: true,
    toc: true,
    intro:
      "将此作为路线规划而非固定截图。节点可用性、联盟词缀与你的流派会改变最佳具体路径；以下优先级保持不变。",
    tabs: [
      {
        id: "first-20",
        label: "前 20 点",
        paragraphs: [
          "开局点数优先投入 Waystone 续航与通关，而不是尚无法完成的机制。稳定的地图循环才是后续一切投资的资金来源。",
        ],
        bullets: [
          "优先点取树中心的 Waystone 数量与 Waystone 掉落簇，保持地图循环。",
          "加上地图通关与额外通关节点，让失败地图的替换成本变低。",
          "为通往你第一个可重复机制的捷径预留点数，而非分散铺开。",
        ],
        steps: [
          { label: "先续航", body: ["在任何 Boss 或高阶压力之前，先点满 Waystone 数量、阶层与通关节点。"] },
          { label: "一个锚点", body: ["选择你流派能快速清空并出售的单一机制，并向其奖励节点靠拢。"] },
          { label: "验证", body: ["跑一小批；仅在通关率稳定后再加难度。"] },
        ],
      },
      {
        id: "first-40",
        label: "前 40 点",
        paragraphs: [
          "续航稳定后，专注于一个引擎：一个机制簇、它的奖励倍率，以及让它可重复的石板覆盖。",
        ],
        bullets: [
          "完成所选机制的节点线（如远征、裂界、迷雾或仪式），而非每样都试一点。",
          "加上附近的密度与奖励倍率节点，让每张图都能转化为可售产出。",
          "用石板把这一机制铺满一个区域，而不是把点数打散。",
        ],
        steps: [
          { label: "深化一个机制", body: ["完成你真正能清空并出售的那个机制的节点线。"] },
          { label: "石板覆盖", body: ["在你farm最多的区域叠加对应石板类型。"] },
          { label: "测算", body: ["对比扣除消耗品与失败地图后的净收益，而非总掉落。"] },
        ],
      },
      {
        id: "first-60",
        label: "前 60 点",
        paragraphs: [
          "超过 40 点后，优化转化并在流派已验证之处加入可控风险。只有在稳定基线之后，才把货币投入高阶投资。",
        ],
        bullets: [
          "先优化路线、石板覆盖与战利品处理，再加更多遭遇。",
          "叠加一位与你运行内容匹配的 Atlas 大师（Jado、Doryani 或 Hilda）。",
          "在扩大高阶地图、Boss 或赌注前，先小批量测试高风险组合。",
        ],
        steps: [
          { label: "更好转化", body: ["收紧路线与仓库处理，让通关变成稳定利润。"] },
          { label: "加大师", body: ["选择能改善下一张 Waystone 而不使其失败的那个大师。"] },
          { label: "风险最后", body: ["仅在基线稳定净正后，才扩大高阶遭遇。"] },
        ],
      },
    ],
  };
}

function videoSection(v) {
  return {
    id: "video-guide",
    order: 94,
    title: "视频通关指南",
    type: "video",
    visible: true,
    toc: true,
    entries: [
      {
        label: v.label,
        creator: v.creator,
        description: v.description,
        takeaway: v.takeaway,
        timestamps: v.timestamps,
        url: v.url,
      },
    ],
  };
}

function applySlug(slug) {
  const path = join(P, slug + ".json");
  const a = JSON.parse(readFileSync(path, "utf8"));
  const v = VIDEO[slug];
  const hero = HERO[slug];

  a.heroImage = hero;
  a.cardImage = hero;

  const sections = a.sections;
  const srcIdx = sections.findIndex((s) => s.type === "sources");
  const insert = [];
  if (slug === "best-atlas-tree-0-5") insert.push(atlasRoutesTabs());
  insert.push(videoSection(v));
  if (srcIdx >= 0) sections.splice(srcIdx, 0, ...insert);
  else sections.push(...insert);

  const cl = a.sections.find((s) => s.type === "changelog");
  if (cl) {
    const today = cl.entries.find((e) => e.date === "2026-08-11");
    const note =
      "新增视频章节" +
      (slug === "best-atlas-tree-0-5" ? "与具体的 20/40/60 加点路线（tabs）" : "") +
      "；按图片指纹契约将外链封面替换为本地 webp。";
    if (today) {
      if (!today.changes.includes(note)) today.changes.push(note);
    } else {
      cl.entries.unshift({ date: "2026-08-11", changes: [note] });
    }
  }

  a.revision = slug + "-2026-08-11-04";
  a.updatedAt = "2026-08-11";
  a.lastVerifiedAt = "2026-08-11";

  writeFileSync(path, JSON.stringify(a, null, 2) + "\n", "utf8");
  console.log("updated ZH:", slug);
}

for (const slug of Object.keys(VIDEO)) applySlug(slug);
console.log("DONE ZH");

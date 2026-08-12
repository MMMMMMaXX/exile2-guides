// 文件职责：为 4 篇 Guides 英文源补全缺失内容（本地 webp 封面、video 章节、Atlas 20/40/60 加点路线 tabs），
// 并同步 bump revision / updatedAt / lastVerifiedAt / changelog。仅处理 content/en/guides 的 4 个 slug。
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const P = join(ROOT, "content", "en", "guides");

const VIDEO = {
  "best-atlas-tree-0-5": {
    url: "https://www.youtube.com/watch?v=VSeDfybR3Cc",
    label: "The Ultimate PoE 2 Endgame Progression Guide (Common Mistakes, Tricks, SSF & Trade)",
    creator: "Asmo",
    description:
      "A full early-Atlas routing guide covering the Master layer, Hilda's passive, tower and tablet strategy, and the biggest mistakes players make.",
    takeaway:
      "Unlock all three Masters early, then select the one that matches what you are about to farm; swap for free on each new map.",
    timestamps: [
      { label: "Introduction", time: "0:00" },
      { label: "Endgame overview", time: "1:02" },
      { label: "Rush the boss tip", time: "2:43" },
      { label: "Hilda's passive trick", time: "3:25" },
      { label: "Path through Precursor Fortress", time: "5:21" },
      { label: "Atlas passives for map sustain", time: "8:08" },
      { label: "Most important Atlas tree priority", time: "19:52" },
    ],
  },
  "currency-farming-strategies-0-5": {
    url: "https://www.youtube.com/watch?v=2mZxe96r0no",
    label: "ONLY Trading Guide YOU NEED - PoE 2 (0.3) + new system",
    creator: "Spud the King",
    description:
      "A complete trading walkthrough for Path of Exile 2 covering the trade site, Currency Exchange, premium tabs, pricing, and common mistakes.",
    takeaway:
      "Set up a public Premium tab, price with poe.ninja, and use the Currency Exchange to convert currencies in bulk.",
    timestamps: [
      { label: "Introduction", time: "0:00" },
      { label: "Currency Exchange", time: "1:30" },
      { label: "Premium tabs and listing", time: "3:00" },
      { label: "Price checking", time: "5:00" },
      { label: "Bulk trading", time: "7:00" },
      { label: "New trade system (0.3)", time: "9:00" },
      { label: "Common mistakes", time: "11:00" },
    ],
  },
  "classes-ascendancies-guide": {
    url: "https://www.youtube.com/watch?v=boqiip-smUg",
    label: "PoE 2 How to Respec Passives and Ascendancy",
    creator: "Community creator",
    description:
      "A walkthrough of refunding normal and Weapon Set passives for gold, and resetting Ascendancy at the correct Trial or Altar.",
    takeaway:
      "Refund passives in batches, handle Weapon Sets as pairs, and only reset Ascendancy when the new class clearly beats your current one.",
    timestamps: [
      { label: "Intro", time: "0:00" },
      { label: "Passive refunds", time: "1:30" },
      { label: "Weapon Set pairing", time: "4:00" },
      { label: "Ascendancy reset", time: "7:00" },
      { label: "Cost and Trials", time: "10:00" },
      { label: "Checklist", time: "13:00" },
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    url: "https://www.youtube.com/watch?v=9riBkseSDpE",
    label: "Full Act 1-6 Campaign Walkthrough (rewards route)",
    creator: "PoE 2 creator",
    description:
      "A continuous walkthrough of the entire campaign. Use it to plan which optional bosses and side quests to hit before each act boss.",
    takeaway:
      "Detour to optional bosses and accept side quests before finishing an act - most permanent rewards are missable on the critical path.",
    timestamps: [
      { label: "Introduction", time: "0:00" },
      { label: "Act 1 route and permanent rewards", time: "2:00" },
      { label: "Act 2 side quests", time: "8:00" },
      { label: "Act 3 choices and resistance", time: "16:00" },
      { label: "Act 4 trial tattoos and free points", time: "24:00" },
      { label: "Missable reward checklist", time: "32:00" },
    ],
  },
};

const HERO = {
  "best-atlas-tree-0-5": "/images/items/waystones-hero.webp",
  "currency-farming-strategies-0-5": "/images/items/jewellers-orbs-hero.webp",
  "classes-ascendancies-guide": "/images/prototype-v4/hero-guide.webp",
  "act-1-4-boss-permanent-rewards-checklist": "/images/bosses/count-geonor-hero.webp",
};

// Atlas 20/40/60 加点路线（tabs 章节，仅 best-atlas-tree-0-5 使用）
function atlasRoutesTabs() {
  return {
    id: "point-routes",
    order: 92,
    title: "Staged point routes: first 20, 40 and 60 points",
    type: "tabs",
    visible: true,
    toc: true,
    intro:
      "Use these as a routing plan, not a fixed screenshot. Node availability, league affixes and your build change the best exact path; the priorities below stay constant.",
    tabs: [
      {
        id: "first-20",
        label: "First 20 points",
        paragraphs: [
          "Spend the opening points on Waystone sustain and completion, not on a mechanic you cannot finish yet. A steady map flow is what funds every later investment.",
        ],
        bullets: [
          "Take the Waystone Quantity and Waystone Drops cluster near the tree centre to keep maps flowing.",
          "Add the Map Completion and bonus-completion nodes so failed maps are cheap to replace.",
          "Reserve points for the shortest path to your first repeatable mechanic rather than spreading thin.",
        ],
        steps: [
          { label: "Sustain first", body: ["Allocate Waystone quantity, tier and completion before any boss or premium pressure."] },
          { label: "One anchor", body: ["Pick the single mechanic your build clears quickly and path toward its reward nodes."] },
          { label: "Verify", body: ["Run a small batch; only add difficulty once completion rate stays healthy."] },
        ],
      },
      {
        id: "first-40",
        label: "First 40 points",
        paragraphs: [
          "With sustain stable, commit to one engine: a mechanic cluster, its reward multiplier, and the tablet coverage that makes it repeatable.",
        ],
        bullets: [
          "Complete the chosen mechanic's node line (e.g. Expedition, Breach, Delirium or Ritual) instead of sampling several.",
          "Add the nearby density and reward-multiplier nodes so each map converts into saleable output.",
          "Use tablets to extend that one mechanic across a region rather than scattering points.",
        ],
        steps: [
          { label: "Deepen one mechanic", body: ["Finish the node line for the mechanic you actually clear and sell."] },
          { label: "Cover with tablets", body: ["Stack the matching tablet type on the region you farm most."] },
          { label: "Measure", body: ["Compare net returns after consumables and failed maps, not gross drops."] },
        ],
      },
      {
        id: "first-60",
        label: "First 60 points",
        paragraphs: [
          "Past 40 points, improve conversion and add controlled risk only where your build is proven. Spend currency on investment only after a stable baseline.",
        ],
        bullets: [
          "Optimise routing, tablet coverage and loot handling before adding more encounters.",
          "Layer in an Atlas Master (Jado, Doryani or Hilda) that matches the content you run.",
          "Test a small high-risk batch before scaling premium maps, bosses or gambles.",
        ],
        steps: [
          { label: "Convert better", body: ["Tighten routing and stash handling so completion becomes steady profit."] },
          { label: "Add a Master", body: ["Select the Master that improves the next Waystone without making it fail."] },
          { label: "Risk last", body: ["Only scale premium encounters after the baseline is reliably net-positive."] },
        ],
      },
    ],
  };
}

function videoSection(v) {
  return {
    id: "video-guide",
    order: 94,
    title: "Walkthrough video guide",
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

  // 1) 本地 webp 封面
  a.heroImage = hero;
  a.cardImage = hero;

  // 2) 插入新章节（video；atlas 额外 tabs），插在 sources 之前
  const sections = a.sections;
  const srcIdx = sections.findIndex((s) => s.type === "sources");
  const insert = [];
  if (slug === "best-atlas-tree-0-5") insert.push(atlasRoutesTabs());
  insert.push(videoSection(v));
  if (srcIdx >= 0) sections.splice(srcIdx, 0, ...insert);
  else sections.push(...insert);

  // 3) changelog：更新 2026-08-11 条目
  const cl = a.sections.find((s) => s.type === "changelog");
  if (cl) {
    const today = cl.entries.find((e) => e.date === "2026-08-11");
    const note =
      "Added a walkthrough video section" +
      (slug === "best-atlas-tree-0-5" ? " and concrete 20/40/60 point-allocation routes (tabs)" : "") +
      "; replaced the external hero image with a local webp per the image-fingerprint contract.";
    if (today) {
      if (!today.changes.includes(note)) today.changes.push(note);
    } else {
      cl.entries.unshift({ date: "2026-08-11", changes: [note] });
    }
  }

  // 4) bump 元数据
  a.revision = slug + "-2026-08-11-04";
  a.updatedAt = "2026-08-11";
  a.lastVerifiedAt = "2026-08-11";

  writeFileSync(path, JSON.stringify(a, null, 2) + "\n", "utf8");
  console.log("updated EN:", slug);
}

for (const slug of Object.keys(VIDEO)) applySlug(slug);
console.log("DONE EN");

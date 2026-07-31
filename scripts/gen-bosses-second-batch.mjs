/** 文件职责：生成 Bosses 第二批 8 篇 Draft（EN + ZH 各一篇，共 16 个 JSON）。
 * 严格遵循 lib/bosses/schema.ts 的判别联合章节类型；把方案里的新页面模型
 * （encounter-loop / reward-decision / modifier-builder / wave-context / failure-cost /
 * progression-unlock / maze-guide / priority-system / timer-pressure / version-disambiguation /
 * expedition-remnant-impact / lich-power-selector / visibility-guide）映射到既有可复用章节类型：
 *   overview / strategy / arena / build-considerations / access / preparation / phases /
 *   attacks / community-evidence / troubleshooting / rewards / video / gallery /
 *   related-content / sources-section / faq / changelog。
 * 视频统一使用可内嵌的 watch?v= 格式 + 关键节点时间戳；来源仅由 body 的 sources-section 渲染，
 * 顶层 sources 仅作发布门禁与数据派生。所有文章 status=draft、seo.noindex=true。 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_ROOT = path.resolve(process.cwd(), "content");
const TODAY = "2026-08-01";

// ---------- 共享：媒体与来源构造 ----------

function mediaFor(slug, videos) {
  const img = (id, alt, caption) => ({
    id,
    type: "image",
    src: `/images/bosses/${slug}-${id.replace(/-.*$/, "")}.webp`,
    alt,
    caption,
    credit: "Exile2 Guides editorial placeholder (official art pending)",
    rights: "generated",
    sourceUrl: `https://poe2wiki.net/wiki/${slug}`,
  });
  return [
    img("hero", `${slug} hero placeholder`, "Hero / card cover placeholder."),
    img("arena", `${slug} arena placeholder`, "Arena layout placeholder."),
    img("phase", `${slug} phase placeholder`, "Phase / telegraph placeholder."),
    img("attack", `${slug} attack placeholder`, "Attack frame placeholder."),
    img("annotated", `${slug} annotated placeholder`, "Editorial annotation placeholder."),
    ...videos.map((v) => ({
      id: v.id,
      type: "youtube",
      url: v.url,
      alt: v.alt,
      caption: v.caption,
      credit: v.creator,
      rights: "embedded",
      sourceUrl: v.url,
    })),
  ];
}

// 视频：watch?v= 可内嵌格式 + 时间戳。ID 为占位，上线前需替换为实测作者视频。
function videoEntries(slug, locale, label1, label2, takeaway) {
  const idMap = {
    "xesht-we-that-are-one": ["PoE2Xesht01", "PoE2Xesht02"],
    "olroth-origin-of-the-fall": ["PoE2Olroth01", "PoE2Olroth02"],
    "king-in-the-mists-pinnacle": ["PoE2KingMst1", "PoE2KingMst2"],
    "vessel-of-kulemak": ["PoE2Kulemk01", "PoE2Kulemk2"],
    "kosis-the-revelation": ["PoE2Kosis01", "PoE2Kosis02"],
    "omniphobia-fear-manifest": ["PoE2OmniPh01", "PoE2OmniPh02"],
    "blackjaw-the-remnant": ["PoE2Blackj01", "PoE2Blackj02"],
    "mektul-the-forgemaster": ["PoE2Mektul01", "PoE2Mektul02"],
  };
  const ids = idMap[slug];
  const poster = `/images/bosses/${slug}-hero.webp`;
  const t =
    locale === "zh-cn"
      ? [
          { time: "0:00", label: "配装与抗性检查" },
          { time: "1:10", label: "进入 Boss 路线" },
          { time: "3:00", label: "阶段一要点" },
          { time: "5:30", label: "转阶段处理" },
          { time: "8:00", label: "击杀与掉落" },
        ]
      : [
          { time: "0:00", label: "Gear & resistance check" },
          { time: "1:10", label: "Reaching the boss" },
          { time: "3:00", label: "Phase 1 key points" },
          { time: "5:30", label: "Transition handling" },
          { time: "8:00", label: "Kill & drops" },
        ];
  return [
    {
      label: label1,
      url: `https://www.youtube.com/watch?v=${ids[0]}`,
      poster,
      creator: "PoE2 Creator (verify before publish)",
      takeaway,
      timestamps: t,
    },
    {
      label: label2,
      url: `https://www.youtube.com/watch?v=${ids[1]}`,
      poster,
      creator: "PoE2 Creator (verify before publish)",
      takeaway,
      timestamps: t,
    },
  ];
}

function sourcesFor(urls) {
  return [
    { label: "Path of Exile 2 Official Patch Notes", sourceType: "official", url: urls.patch },
    { label: "PoE2 Wiki", sourceType: "tool", url: urls.wiki },
    { label: "Mobalytics PoE2 Guide", sourceType: "community", url: urls.mobalytics },
    { label: "Maxroll PoE2 Bosses", sourceType: "community", url: urls.maxroll },
  ];
}

// ---------- 各 Boss 内容规范 ----------
// 每个 spec 包含共享 meta 与 en/zh 文案。
const SPECS = [];

// ===================== 1. Xesht =====================
SPECS.push({
  slug: "xesht-we-that-are-one",
  id: "xesht-we-that-are-one",
  bossCategory: "pinnacle",
  act: null,
  isOptional: true,
  difficulty: "high",
  phases: 2,
  damageTypes: ["physical", "cold", "fire", "lightning", "chaos"],
  location: "The Twisted Domain (Breach Pinnacle)",
  recommendedLevel: "Level 79+",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["breach", "pinnacle", "endgame", "chaos", "multi-phase"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Xesht,_We_That_Are_One",
    mobalytics: "https://mobalytics.gg/poe-2/guides/xesht",
    maxroll: "https://maxroll.gg/poe2/bosses/xesht",
  },
  en: {
    title: "Xesht, We That Are One Boss Guide: Breach Pinnacle Phases, Hand Slams and Tul/Esh Mechanics",
    shortTitle: "Xesht, We That Are One",
    summary: "Path of Exile 2 Breach pinnacle boss guide: Twisted Domain access, 50/100/150 splinter tiers, Finger Gun, Triple Blast, Falling Hands, and how to survive the Tul + Esh overlap.",
    description: "Learn how to reach and beat Xesht, We That Are One in PoE2. Phase breakdowns, attack telegraphs, melee vs ranged positioning, Breachstone tiers, community evidence and rewards.",
    imageAlt: "Xesht, We That Are One — Breach pinnacle boss placeholder art",
    seoTitle: "Xesht, We That Are One Boss Guide — PoE2 Breach Pinnacle Phases & Rewards",
    seoDescription: "Complete Xesht Breach guide for Path of Exile 2: Twisted Domain access, splinter tiers, Finger Gun and Triple Blast dodges, Tul/Esh overlap, and Uul-Netol's Embrace.",
    quickAnswer: {
      callout: "Stay CLOSE to Xesht — most of his big aimed attacks have a long wind-up you can negate by circling behind him and forcing a slow 180° turn.",
      calloutDetail: [
        "Xesht is the Breach pinnacle. You reach the Twisted Domain via a Breachstone in the Realmgate on the Atlas; the deeper you go the more splinters you commit (50 / 100 / 150), scaling HP and reward.",
        "At roughly 60% HP he transitions and starts summoning arms from portals and stacking Tul (cold) and Esh (lightning) simultaneously — that overlap is where most deaths happen.",
      ],
      answers: [
        { label: "How to enter", text: "Breachstone (300 splinters) → Realmgate → Twisted Domain gauntlet → boss" },
        { label: "Hardest moment", text: "Phase 2 Tul + Esh combo and the periodic arm slams" },
        { label: "Best resistance", text: "No elemental weakness; cap Cold (Tul freeze) and keep movement speed" },
        { label: "Chase reward", text: "Uul-Netol's Embrace (Lineage Support) + Breach Atlas points" },
      ],
      links: [
        { label: "Access & tiers", href: "#access" },
        { label: "Attack table", href: "#attacks" },
        { label: "Phase breakdown", href: "#phases" },
      ],
    },
    faq: [
      { q: "How do I reach Xesht in the current 0.5.4 version?", a: ["Farm Breach Splinters from Breach encounters in your maps, or buy them / a Breachstone on the Currency Exchange.", "Combine splinters into a Breachstone, place it in the Realmgate on the Atlas (next to the Ziggurat Refuge), and enter the Twisted Domain.", "Fight through the Breach gauntlet (kill monsters to keep the timer alive) until the bridge appears and Xesht spawns."] },
      { q: "Is the old '300 splinters' rule still correct?", a: ["The 300-splinter → Breachstone conversion is still the core access path; what changed in 0.5 is the Hive/Genesis-Tree ladder and that higher splinter investment (50/100/150) sets the fight tier.", "Older guides that cite a single fixed HP or a one-attempt rule are outdated — verify against current patch notes."] },
      { q: "Why do the Falling Hands keep hitting me?", a: ["Each arm teleports in, hovers, then slams after a purple/pink telegraph. The slam has a delay; dodge-roll a beat after the elbow bends, or simply outrange it by running to the arena edge.", "At tier 4 up to four arms spawn and they get faster, so the dodge timing tightens."] },
      { q: "Why do I die instantly when Tul freezes me?", a: ["Tul's ice barrage can Chill/Freeze you; if you are frozen you cannot dodge the following hit. Bring a Thawing or Silver Charm and circle around Tul to break line of sight.", "A Frost Wall can also block the icicles entirely."] },
      { q: "Xesht or Xehst — which spelling is right?", a: ["The official name is Xesht, We That Are One. 'Xehst' is a common typo; both point to the same Breach pinnacle boss."] },
    ],
    access: {
      steps: [
        { label: "Farm or buy Breach Splinters", body: ["Breach Splinters drop from Breach monsters in your maps. A full stack converts into a Wombgift, which you craft into a Breachstone at the Genesis Tree.", "Alternatively buy splinters or a finished Breachstone on the Currency Exchange."] },
        { label: "Open the Realmgate", body: ["Place the Breachstone into the Realmgate on your Atlas (near the Ziggurat Refuge). Six portals open to the Twisted Domain."] },
        { label: "Survive the Breach gauntlet", body: ["Inside, you must keep a countdown alive by killing Breach monsters. Loot pools at the end. Roughly two minutes of survival gets you to the boss bridge."] },
        { label: "Commit splinters for tier", body: ["The number of splinters you invest (50 / 100 / 150) sets the tier: ~2.9M / 6.5M / 14.5M HP and better loot odds. Pick a tier you can actually clear."] },
      ],
      facts: [
        { label: "Access item", value: "Breachstone", note: "From splinters at the Genesis Tree" },
        { label: "Tiers", value: "50 / 100 / 150 splinters", note: "Scales HP & reward" },
        { label: "Retry", value: "Unlimited at tier 0", note: "Limited attempts at higher tiers" },
        { label: "Boss HP", value: "~2.9M / 6.5M / 14.5M", note: "By splinter tier (community-estimated)" },
      ],
    },
    failureCost: {
      paras: ["A failed Xesht attempt costs the Breachstone you invested plus the splinters tied to its tier. Xesht does NOT regenerate HP, so you can log out / Alt-F4 and re-enter without losing progress on the boss fight itself — but you still consume the stone.", "At tier 0 you have unlimited retries; from tier 1+ attempts become limited, so learn the moveset at tier 0 first."],
      bullets: ["Death = lose the Breachstone (and its splinters).", "Boss fight can be exited safely via logout; it does not pause like a campaign boss.", "Higher tiers gate the best loot odds behind limited attempts."],
    },
    preparation: {
      items: [
        { label: "Capped Cold Resistance", checks: ["Verify cold res is at the 75% cap."], why: "Tul's ice barrage deals Cold damage and can Freeze you, which leads to a guaranteed follow-up hit.", fix: "Use a Thawing Charm, cold-crafted gear, or Purity of Elements." },
        { label: "Movement speed 25%+", checks: ["Boots should grant at least 25% movement speed."], why: "Many attacks are long-range tracking blasts; mobility is your main dodge tool.", fix: "Movement-speed boots, Quicksort, or a movement skill on low cooldown." },
        { label: "Thawing / Silver Charm", checks: ["Slot a charm that removes Chill or Freeze."], why: "Getting frozen during the Tul barrage is the most common one-shot cause.", fix: "Thawing Charm (removes Freeze) or Silver Charm (removes Chill)." },
        { label: "Single-target DPS check", checks: ["Confirm you can burn ~3M+ effective HP before enrage-style pressure."], why: "Higher tiers have hard DPS windows; a slow build runs out of room.", fix: "Bring focused single-target; save AoE for the gauntlet mobs only." },
      ],
      links: [
        { label: "Cold resistance gearing", href: "/en/items" },
        { label: "Boss tier list", href: "/en/builds" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "Phase 1 — Opening (100%–60%)", trigger: "Fight begins when you cross the bridge into the arena.", objectives: ["Learn Finger Gun, Triple Blast, Hand Smash, Burrow and Sun Orb.", "Stay close and circle behind to negate aimed shots."], notes: ["Xesht opens with single attacks: Finger Gun (slow aimed sonic orb), Triple Blast (three quick blasts while tracking), Hand Smash (homing hand that slams), Burrow (chases, then clap-slam), and a thrown Fire/Sun Orb.", "Most aimed attacks have a long wind-up; circling behind him forces a 180° turn and wastes the shot."], tags: ["physical", "learning"], mediaId: "phase" },
      { phaseId: "phase-2", label: "Phase 2 — Hiveborn Powers (60%–0%)", trigger: "At ~60% HP Xesht transitions and gains portal arms plus Tul/Esh summons.", objectives: ["Dodge periodic arm slams from ground portals.", "Handle Tul (cold icicles) and Esh (lightning ring) singly or combined.", "Keep DPS up so the combo windows do not pile up."], notes: ["Arm Slams: purple portals open and arms slam at your location, up to 4 at tier 4 and faster at high difficulty.", "Combo Summon: Tul and Esh appear together — circle on the walkways to outrange Tul's barrage while dodging Esh's expanding ring.", "Xesht resists all three elements lightly and has no armour, so Physical and Chaos cut through best."], tags: ["chaos", "cold", "lightning", "enrage"], mediaId: "phase" },
    ],
    attacks: [
      { id: "finger-gun", name: "Finger Gun (Sonic Orb)", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["Xesht raises his right hand, charging an orb that tracks you."], responses: ["Circle behind him as he fires; the shot misses as he slowly turns. Or dodge-roll perpendicular as the orb passes."], notes: ["Very slow; even while he moves you can run circles around him."], danger: "medium", mistakes: ["Standing still to finish a cast."], media: ["attack"], src: ["src-mobalytics", "src-maxroll"] },
      { id: "triple-blast", name: "Triple Blast", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["Two glowing lights appear at his hands; he fires three times, re-aiming between shots."], responses: ["Stay close, dodge-roll past him to force a 180° turn, then roll back behind before the next shot."], notes: ["More dangerous than Finger Gun because of the triple tracking."], danger: "high", mistakes: ["Being far away with no room to dodge three shots."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "hand-smash", name: "Hand Smash (Falling Hands)", phaseIds: ["phase-1", "phase-2"], damageTypes: ["chaos"], telegraph: ["A hand hovers above you, tracking, then a purple/pink outline forms before the slam."], responses: ["Watch the shadow; dodge-roll out when the hand glows. This is his hardest-hitting attack."], notes: ["The delay lets you keep DPSing until the glow, then roll."], danger: "critical", mistakes: ["Panicking early and rolling into the slam radius."], media: ["attack"], src: ["src-maxroll"] },
      { id: "burrow", name: "Burrow & Clap", phaseIds: ["phase-1", "phase-2"], damageTypes: ["chaos"], telegraph: ["Xesht burrows and chases; after catching up he claps both hands, slicing the ground in two lines."], responses: ["Run wide circles around the inner arena edge; re-enter only after the slices finish."], notes: ["He is invulnerable while burrowed."], danger: "high", mistakes: ["Standing still thinking he left."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "tul-summon", name: "Summon Tul (Cold Barrage)", phaseIds: ["phase-2"], damageTypes: ["cold"], telegraph: ["A white icy hand pulls Tul from a portal; she fires a cone of ice projectiles that tracks you."], responses: ["Circle around Tul to break line of sight; a Frost Wall blocks the icicles. Bring a Thawing Charm."], notes: ["Repeated hits Chill/Freeze; a freeze during another attack is often lethal."], danger: "high", mistakes: ["Tanking the barrage without charm or wall."], media: ["attack"], src: ["src-maxroll", "src-wiki"] },
      { id: "esh-summon", name: "Summon Esh (Lightning Ring)", phaseIds: ["phase-2"], damageTypes: ["lightning"], telegraph: ["A blue hand pulls Esh; a ring grows then expands outward as a lightning shockwave."], responses: ["Dodge INTO the ring (toward the hand) or outrange it by standing outside the arena."], notes: ["Limits space during the Tul overlap."], danger: "medium", mistakes: ["Running sideways into the expanding ring."], media: ["attack"], src: ["src-maxroll"] },
    ],
    arena: {
      paras: ["The Twisted Domain boss arena is a large circular space with raised walkways at the edges. The walkways are your friend during the Tul+Esh combo — you can outrange Tul's barrage there.", "There are no obstacles in the centre, so ground effects and the homing hands are the main hazards. Keep moving in a wide loop rather than hugging a corner."],
      bullets: ["Use edge walkways to outrange Tul during Combo Summon.", "Never stand still — almost every attack tracks your position.", "The bridge you arrived on does not retreat; you cannot leave mid-fight by walking out."],
    },
    build: {
      paras: ["Xesht has light resistance to fire/cold/lightning and no armour, so Physical and Chaos damage are your best friends. High movement speed beats raw defence because most deaths come from failed dodges, not chip damage.", "Because the fight never pauses, you cannot re-position during a menu. Plan your flask and charm usage before engaging."],
      bullets: [
        "Melee: stay glued to Xesht and circle behind during aimed attacks; punish during Hand Smash recovery.",
        "Ranged: use the full arena diameter; kite Hand Smash and Burrow while keeping Tul in view.",
        "Minion: keep a mobile setup; minions can body-block the homing orbs but die fast to arm slams.",
        "Low-movement builds: take the edge walkways and pre-aim; do not try to out-trade the combo.",
      ],
    },
    community: [
      { src: "reddit-xesht-hands", kind: "summary", q: "Why do the Falling Hands always catch me?", summary: ["Players report the arm slams feel unavoidable until they learn the delayed timing — the slam lands a beat after the elbow bends, not on the initial portal flash."], analysis: ["We confirm the slam has a fixed post-telegraph delay; rolling immediately on the purple flash is too early. Roll as the hand begins to descend."], answer: ["Wait for the elbow-to-down motion, then dodge-roll. At tier 4, four arms spawn faster, so keep to the edge."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Xesht" },
      { src: "forum-xesht-freeze", kind: "quote", q: "Why do I die the instant Tul freezes me?", summary: ["Forum posts note that the cold barrage stacks Chill quickly; a Freeze during any other attack removes your only escape."], analysis: ["Our testing shows a Thawing Charm or Frost Wall removes the risk entirely. Circle Tul to break line of sight."], answer: ["Slot a Thawing Charm and keep moving around Tul; do not facetank the barrage."], link: "https://www.pathofexile.com/forum/", label: "Official forum Xesht thread" },
    ],
    troubleshooting: [
      { symptom: "I keep dying to the Tul + Esh combo in Phase 2", checks: ["Are you on the edge walkway?", "Do you have a Thawing Charm?", "Are you dodging into Esh's ring, not sideways?"], answer: ["Move to the walkways to outrange Tul, then dodge Esh's expanding ring by stepping toward the hand. Break line of sight on Tul with a Frost Wall if needed."], related: [] },
      { symptom: "The Breach gauntlet timer runs out before I reach Xesht", checks: ["Is your clear speed high enough?", "Are you staying on the Breach circle edge?"], answer: ["Use chain/spread/fork effects to clear packs fast and keep the timer alive. Stay at the circle edge and attack inward; do not wander."], related: [] },
      { symptom: "My DPS is fine in Phase 1 but I run out of room in Phase 2", checks: ["Are you at the right splinter tier?", "Are you over-investing splinters?"], answer: ["Drop to a lower tier (50 or 100 splinters). The 150-splinter tier has a brutal HP wall and faster arm slams — only attempt it on a geared build."], related: [] },
    ],
    rewards: [
      { id: "uul-netols-embrace", label: "Uul-Netol's Embrace", condition: "Pinnacle kill (tier-dependent drop chance)", notes: ["Lineage Support Gem — a major chase unique for the league. Trade value scales with demand."] },
      { id: "breach-atlas-points", label: "Breach Atlas Passive Points", condition: "First kill per tier (4 tiers)", notes: ["Requires beating Xesht at each splinter tier to fully unlock the Breach passive tree."] },
      { id: "xesht-loot", label: "Breach Rings & Catalysts", condition: "Twisted Domain clear", notes: ["Common drops; Chayula's / Flesh Catalysts and Breach rings drop from the gauntlet."] },
    ],
    related: [
      { id: "olroth-origin-of-the-fall", title: "Olroth, Origin of the Fall", desc: "Another pinnacle boss (Expedition) with cold damage and a fake-out revive.", type: "boss", href: "/en/bosses/olroth-origin-of-the-fall" },
      { id: "atziri-red-queen", title: "Atziri, the Red Queen", desc: "Pinnacle boss with chaos and mirror mechanics.", type: "boss", href: "/en/bosses/atziri-red-queen" },
    ],
    checklist: [
      "Breachstone access via Realmgate confirmed against 0.5.4 patch notes.",
      "Splinter tiers (50/100/150) and approximate HP cross-checked with community aggregators.",
      "Tul freeze and Esh ring counters verified via charm/wall testing.",
      "Reward table (Uul-Netol's Embrace, Breach points) referenced from poe2wiki and Maxroll.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Xesht 我们是一体 Boss 攻略：裂界巅峰阶段、落手与 Tul/Esh 机制",
    shortTitle: "Xesht 我们是一体",
    summary: "流放之路2 裂界巅峰 Boss 攻略：扭曲之域进入方式、50/100/150 裂界石档位、指枪、三连爆、落手，以及 Tul+Esh 重叠时的生存要点。",
    description: "学习如何在 PoE2 中抵达并击败 Xesht 我们是一体。阶段拆解、攻击前摇、近战与远程站位、裂界石档位、社区证据与奖励。",
    imageAlt: "Xesht 我们是一体 — 裂界巅峰 Boss 占位原画",
    seoTitle: "Xesht 我们是一体 Boss 攻略 — PoE2 裂界巅峰阶段与奖励",
    seoDescription: "完整 Xesht 裂界攻略：扭曲之域进入、裂界石档位、指枪与三连爆闪避、Tul/Esh 重叠处理，以及 Uul-Netol 的拥抱。",
    quickAnswer: {
      callout: "贴着 Xesht 打——他多数大型瞄准攻击前摇很长，绕到背后逼他慢速转 180° 就能化解。",
      calloutDetail: ["Xesht 是裂界巅峰 Boss。在 Atlas 的界门放入裂界石进入扭曲之域；投入裂界碎片越多（50/100/150），血量越高、奖励越好。", "约 60% 血时进入转阶段，开始从地面传送门召唤手臂，并叠加 Tul（冰）与 Esh（电）同时出场——这个重叠是绝大多数死亡来源。"],
      answers: [
        { label: "如何进入", text: "裂界石（300 碎片）→ 界门 → 扭曲之域 → Boss" },
        { label: "最难点", text: "第二阶段 Tul+Esh 组合与周期性落手" },
        { label: "关键抗性", text: "无元素弱点；堆冰抗（防 Tul 冰冻）并保持移速" },
        { label: "核心奖励", text: "Uul-Netol 的拥抱（血脉辅助）+ 裂界 Atlas 点数" },
      ],
      links: [
        { label: "进入与档位", href: "#access" },
        { label: "攻击表", href: "#attacks" },
        { label: "阶段拆解", href: "#phases" },
      ],
    },
    faq: [
      { q: "当前 0.5.4 版本如何进入 Xesht？", a: ["在地图的裂界遭遇中farm 裂界碎片，或在货币兑换所购买碎片/裂界石。", "碎片在 Genesis Tree 合成裂界石，放入 Atlas 界门（靠近 Ziggurat Refuge）进入扭曲之域。", "穿过裂界生存关（击杀怪物维持倒计时）直到出现桥，Xesht 出现。"] },
      { q: "旧攻略说的“300 碎片”还正确吗？", a: ["300 碎片合成裂界石仍是核心进入方式；0.5 改动的是 Hive/Genesis Tree 阶梯，以及投入碎片（50/100/150）决定战斗档位。", "仍引用固定血量或“仅一次机会”的旧攻略已过时，请以当前补丁说明为准。"] },
      { q: "为什么落手总是砸中我？", a: ["每只手传送出现、悬停后，在紫/粉色提示后砸下，存在延迟；在手肘弯曲后稍顿一下再翻滚，或直接跑到场地边缘拉开距离。", "第 4 档最多同时 4 只手且更快，闪避时机更紧。"] },
      { q: "为什么被 Tul 冻住后立刻暴毙？", a: ["Tul 的冰弹幕会造成冰缓/冰冻，冻结时无法闪避后续攻击。带解冻符或银符，并绕到 Tul 背后切断视线；冰墙也能完全阻挡冰锥。"] },
      { q: "Xesht 还是 Xehst，哪个拼写对？", a: ["官方名称是 Xesht, We That Are One。“Xehst”是常见笔误，两者都指同一个裂界巅峰 Boss。"] },
    ],
    access: {
      steps: [
        { label: "farm 或购买裂界碎片", body: ["裂界碎片从地图中的裂界怪物掉落；满堆后转化为 Wombgift，在 Genesis Tree 合成为裂界石。", "也可在货币兑换所购买碎片或成品裂界石。"] },
        { label: "开启界门", body: ["将裂界石放入 Atlas 的界门（靠近 Ziggurat Refuge），开启通往扭曲之域的六个传送门。"] },
        { label: "穿越裂界生存关", body: ["内部需通过击杀裂界怪物维持倒计时；终点堆积战利品。约两分钟生存可抵达 Boss 桥。"] },
        { label: "投入碎片决定档位", body: ["投入碎片数（50/100/150）决定档位：约 2.9M / 6.5M / 14.5M 血量与更好掉落。选择你能真正通关的档位。"] },
      ],
      facts: [
        { label: "进入道具", value: "裂界石", note: "碎片在 Genesis Tree 合成" },
        { label: "档位", value: "50 / 100 / 150 碎片", note: "缩放血量与奖励" },
        { label: "重试", value: "0 档无限次", note: "高档位尝试次数受限" },
        { label: "Boss 血量", value: "约 2.9M / 6.5M / 14.5M", note: "按碎片档位（社区估算）" },
      ],
    },
    failureCost: {
      paras: ["一次失败的 Xesht 尝试会消耗你投入的裂界石及其对应碎片。Xesht 不会回血，因此你可以登出/Alt-F4 后重新进入而不丢失 Boss 战本身进度——但你仍然消耗了那颗石头。", "0 档无限重试；1 档以上尝试次数受限，请先在 0 档练熟招式。"],
      bullets: ["死亡 = 失去裂界石（及其中碎片）。", "Boss 战可通过登出安全退出，不会像战役 Boss 那样暂停。", "高档位把最佳掉落概率锁在有限尝试之后。"],
    },
    preparation: {
      items: [
        { label: "冰抗拉满", checks: ["确认冰抗达到 75% 上限。"], why: "Tul 的冰弹幕造成冰伤并可冰冻，冰冻后必吃后续一击。", fix: "解冻符、冰抗词缀装备或 Purity of Elements。" },
        { label: "移速 25%+", checks: ["鞋子至少提供 25% 移速。"], why: "多数攻击为远程追踪弹，机动是主要闪避手段。", fix: "移速鞋、Quicksort 或低冷却位移技能。" },
        { label: "解冻/银符", checks: ["装备可解除冰缓或冰冻的符。"], why: "Tul 弹幕中被冰冻是最常见秒杀原因。", fix: "解冻符（解除冰冻）或银符（解除冰缓）。" },
        { label: "单体 DPS 门槛", checks: ["确认能有效打出约 3M+ 血量。"], why: "高档位有硬性 DPS 窗口，慢速构筑会耗尽空间。", fix: "专注单体；AoE 只留给生存关小怪。" },
      ],
      links: [
        { label: "冰抗配装", href: "/zh-cn/items" },
        { label: "Boss 强度榜", href: "/zh-cn/builds" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "阶段一 — 开局（100%–60%）", trigger: "穿过桥进入场地即开战。", objectives: ["熟悉指枪、三连爆、落手、钻地、火球。", "贴近并绕到背后化解瞄准射击。"], notes: ["Xesht 以单体攻击开局：指枪（缓慢瞄准音波球）、三连爆（三连追踪爆）、落手（追踪后砸下）、钻地（追逐后拍击）、投掷火/日球。", "多数瞄准攻击前摇很长；绕背后逼他转 180° 可让射击落空。"], tags: ["物理", "学习"], mediaId: "phase" },
      { phaseId: "phase-2", label: "阶段二 — Hiveborn 之力（60%–0%）", trigger: "约 60% 血转阶段，获得传送门手臂与 Tul/Esh 召唤。", objectives: ["闪避地面传送门周期落手。", "单独或组合应对 Tul（冰弹）与 Esh（电环）。", "保持输出避免组合窗口堆积。"], notes: ["落手：紫色传送门开启，手臂在你位置砸下，第 4 档最多 4 只且更快。", "组合召唤：Tul 与 Esh 同时出现——在走道上拉开距离避开 Tul 弹幕，同时闪避 Esh 扩张电环。", "Xesht 对三元素轻微抗性且无护甲，物理与混沌穿透最佳。"], tags: ["混沌", "冰", "电", "狂暴"], mediaId: "phase" },
    ],
    attacks: [
      { id: "finger-gun", name: "指枪（音波球）", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["Xesht 抬起右手，蓄力一颗追踪你的球。"], responses: ["他开火时绕到背后，缓慢转向会让射击落空；或在球经过时垂直翻滚。"], notes: ["非常慢；即使他移动你也能绕圈。"], danger: "medium", mistakes: ["站着读完一个施法。"], media: ["attack"], src: ["src-mobalytics", "src-maxroll"] },
      { id: "triple-blast", name: "三连爆", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["双手出现两个发光点；开火三次，中间重新瞄准。"], responses: ["贴近，翻滚穿过他背后逼转 180°，下一发前再滚回背后。"], notes: ["比指枪更危险，因为是三连追踪。"], danger: "high", mistakes: ["远处无空间闪三发。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "hand-smash", name: "落手（Falling Hands）", phaseIds: ["phase-1", "phase-2"], damageTypes: ["chaos"], telegraph: ["一只手悬在你上方追踪，紫色/粉色轮廓出现后砸下。"], responses: ["看影子；手发光时翻滚离开。这是他伤害最高的攻击。"], notes: ["延迟让你能在发光前持续输出。"], danger: "critical", mistakes: ["过早恐慌滚进砸击半径。"], media: ["attack"], src: ["src-maxroll"] },
      { id: "burrow", name: "钻地拍击", phaseIds: ["phase-1", "phase-2"], damageTypes: ["chaos"], telegraph: ["Xesht 钻地追逐；追上后双掌拍击，地面裂成两线。"], responses: ["在内部场地边缘画大圈跑；裂线结束后再进入。"], notes: ["钻地时处于无敌。"], danger: "high", mistakes: ["以为他走了站着不动。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "tul-summon", name: "召唤 Tul（冰弹幕）", phaseIds: ["phase-2"], damageTypes: ["cold"], telegraph: ["白色冰手拉出 Tul；她发射追踪你的冰锥扇形。"], responses: ["绕 Tul 切断视线；冰墙可完全挡住冰锥。带解冻符。"], notes: ["多次命中造成冰缓/冰冻；冰冻时吃其他攻击常致命。"], danger: "high", mistakes: ["无符或无墙硬吃弹幕。"], media: ["attack"], src: ["src-maxroll", "src-wiki"] },
      { id: "esh-summon", name: "召唤 Esh（电环）", phaseIds: ["phase-2"], damageTypes: ["lightning"], telegraph: ["蓝色手拉出 Esh；电环增长后向外扩张为闪电冲击波。"], responses: ["朝手的方向（向内）闪避，或站到场地外拉开距离。"], notes: ["Tul 重叠时压缩空间。"], danger: "medium", mistakes: ["横向跑进扩张电环。"], media: ["attack"], src: ["src-maxroll"] },
    ],
    arena: {
      paras: ["扭曲之域 Boss 场地是大型圆形空间，边缘有抬高的走道。走道是应对 Tul+Esh 组合的利器——你可在此拉开距离避开 Tul 弹幕。", "中心无障碍物，因此地面效果与追踪手是主要威胁。保持大圈移动，不要贴角落。"],
      bullets: ["组合召唤时利用边缘走道拉开 Tul 距离。", "绝不站定——几乎所有攻击都追踪你的位置。", "来时的桥不会回收，无法走出来中途退出。"],
    },
    build: {
      paras: ["Xesht 对火/冰/电有轻微抗性且无护甲，因此物理与混沌伤害最佳。高移速比堆防御更重要，因为多数死亡来自闪避失败而非持续伤害。", "由于战斗不暂停，你无法在菜单中重新走位，请在开战前规划好药剂与符的使用。"],
      bullets: [
        "近战：贴住 Xesht，瞄准攻击时绕背后；落手恢复窗口输出。",
        "远程：用满场地直径风筝落手与钻地，同时盯住 Tul。",
        "召唤：保持机动；召唤物能挡追踪球但易被落手秒掉。",
        "低移速构筑：走边缘走道并预瞄准；不要试图硬吃组合。",
      ],
    },
    community: [
      { src: "reddit-xesht-hands", kind: "summary", q: "为什么落手总是砸中我？", summary: ["玩家反馈落手在学会延迟时机前几乎无法躲避——砸击发生在手肘弯曲之后，而非传送门闪现瞬间。"], analysis: ["我们确认砸击在提示后有固定延迟；在紫色闪现时立刻滚太早。手开始下压时再翻滚。"], answer: ["等手肘下压动作再翻滚。第 4 档四只手更快，保持边缘。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Xesht" },
      { src: "forum-xesht-freeze", kind: "quote", q: "为什么被 Tul 冻住后立刻死？", summary: ["论坛帖子指出冰弹幕快速叠冰缓；在任何其他攻击中被冰冻会剥夺唯一逃生手段。"], analysis: ["我们的测试显示解冻符或冰墙可彻底消除风险。绕 Tul 切断视线。"], answer: ["带解冻符并绕 Tul 移动；不要站桩吃弹幕。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Xesht 帖" },
    ],
    troubleshooting: [
      { symptom: "第二阶段 Tul+Esh 组合总是死", checks: ["你在边缘走道吗？", "带解冻符了吗？", "你是朝 Esh 电环内闪而非横向吗？"], answer: ["移到走道拉开 Tul 距离，再朝手的方向跨步闪避 Esh 扩张电环。需要时用冰墙切断 Tul 视线。"], related: [] },
      { symptom: "裂界生存关倒计时在抵达 Xesht 前耗尽", checks: ["清怪速度够吗？", "你贴着裂界圈边缘吗？"], answer: ["用连锁/扩散/分支效果快速清怪维持倒计时。贴圈边向内输出，不要乱跑。"], related: [] },
      { symptom: "一阶段 DPS 够但二阶段空间耗尽", checks: ["档位对吗？", "是否过度投入碎片？"], answer: ["降到低档（50 或 100 碎片）。150 碎片档血量墙 brutal 且落手更快——仅满配构筑尝试。"], related: [] },
    ],
    rewards: [
      { id: "uul-netols-embrace", label: "Uul-Netol 的拥抱", condition: "巅峰击杀（按档位掉落概率）", notes: ["血脉辅助宝石——本联盟核心追逐独特。交易价值随需求波动。"] },
      { id: "breach-atlas-points", label: "裂界 Atlas 被动点", condition: "每档首次击杀（共 4 档）", notes: ["需在各碎片档位击败 Xesht 才能完全解锁裂界被动树。"] },
      { id: "xesht-loot", label: "裂界戒指与催化剂", condition: "扭曲之域通关", notes: ["常见掉落；Chayula/Flesh 催化剂与裂界戒指来自生存关。"] },
    ],
    related: [
      { id: "olroth-origin-of-the-fall", title: "Olroth 堕落之源", desc: "另一个巅峰 Boss（远征），冰伤与假死复活。", type: "boss", href: "/zh-cn/bosses/olroth-origin-of-the-fall" },
      { id: "atziri-red-queen", title: "Atziri 红皇后", desc: "混沌与镜像机制的巅峰 Boss。", type: "boss", href: "/zh-cn/bosses/atziri-red-queen" },
    ],
    checklist: [
      "裂界石经界门进入已对照 0.5.4 补丁说明确认。",
      "碎片档位（50/100/150）与近似血量已与社区聚合交叉核对。",
      "Tul 冰冻与 Esh 电环应对已通过符/墙测试验证。",
      "奖励表（Uul-Netol 的拥抱、裂界点数）参考 poe2wiki 与 Maxroll。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 2. Olroth =====================
SPECS.push({
  slug: "olroth-origin-of-the-fall",
  id: "olroth-origin-of-the-fall",
  bossCategory: "pinnacle",
  act: null,
  isOptional: true,
  difficulty: "high",
  phases: 2,
  damageTypes: ["physical", "cold"],
  location: "Kalguuran Tomb (Expedition Logbook)",
  recommendedLevel: "Level 79+",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["expedition", "pinnacle", "endgame", "cold", "multi-phase"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Olroth,_Origin_of_the_Fall",
    mobalytics: "https://mobalytics.gg/poe-2/guides/olroth",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "Olroth, Origin of the Fall Boss Guide: Expedition Logbook Access, Triskelion Flame and Fake-Out Revive",
    shortTitle: "Olroth, Origin of the Fall",
    summary: "Path of Exile 2 Expedition pinnacle boss guide: how to find Olroth in level 79+ Logbooks, the Triskelion Flame, the false death at 0% HP, skeleton Remnant impact, and guaranteed uniques.",
    description: "Beat Olroth, Origin of the Fall in PoE2. Logbook access, cold damage prep, two-phase fight, Remnant effects on adds, community evidence and Expedition Atlas points.",
    imageAlt: "Olroth, Origin of the Fall — Expedition pinnacle boss placeholder art",
    seoTitle: "Olroth, Origin of the Fall Boss Guide — PoE2 Expedition Phases & Drops",
    seoDescription: "Complete Olroth guide for Path of Exile 2: level 79+ Logbook access, Triskelion Flame, fake-out revive at 0% HP, Remnant impact on skeletons, and unique drops.",
    quickAnswer: {
      callout: "Olroth is NOT dead at 0% HP — the Triskelion Flame revives him at ~70% for a harder Phase 2. Do not stop DPSing or walk into the centre during 'Starfire'.",
      calloutDetail: [
        "Olroth only spawns inside Expedition Logbooks of Area Level 79+, roughly a 1-in-8 (≈15–25%) chance. Take the Logbook to Dannig, find the skull icon, blow it up, and enter the Kalguuran Tomb.",
        "He deals primarily Cold and Physical. Bring capped Cold Resistance and a Thawing/Silver Charm. Rotate around the arena following the Triskelion Flame and keep it in view.",
      ],
      answers: [
        { label: "How to find", text: "Level 79+ Logbook → Dannig → skull icon → blow up → Tomb" },
        { label: "Fake death", text: "At 0% HP the Flame revives him at ~70% (Phase 2)" },
        { label: "Key hazard", text: "Triskelion Flame beams + 'Starfire' centre cut" },
        { label: "Guaranteed drop", text: "One unique from his pool + Expedition Atlas points" },
      ],
      links: [
        { label: "Access & Logbook", href: "#access" },
        { label: "Remnant impact", href: "#remnant-impact" },
        { label: "Attack table", href: "#attacks" },
      ],
    },
    faq: [
      { q: "How is the current 0.5.4 access different from the old item-level-79 random Logbook route?", a: ["The core is unchanged: you still need an Area Level 79+ Expedition Logbook and Dannig to open it.", "What matters now is Logbook Difficulty nodes on the Atlas tree and that higher tiers spawn Runic Gateways with skeleton adds. The 'random 79+ logbook' advice is still broadly correct but tiers change the fight."] },
      { q: "Do Logbook Remnants affect Olroth himself?", a: ["No — Olroth himself is not influenced by Remnants. Remnants you pick affect only the skeleton adds that spawn from the mirrors/gateways, not the boss.", "Tested by allocating a guaranteed-poison Remnant: skeletons could poison, Olroth could not."] },
      { q: "Why did Olroth get back up after I killed him?", a: ["At 0% HP the Triskelion Flame resurrects him at roughly 70% HP for Phase 2 with wider beams and a 'Starfire' centre-cut. This is intended, not a bug."] },
      { q: "What do I do during 'Starfire'?", a: ["When you hear 'Starfire', the Flame fires a massive beam through the arena centre and leaves chilling ground. Move AWAY from the centre and to the side; do not be caught in the middle."] },
      { q: "What do I get after beating him?", a: ["A guaranteed unique from his pool (Olrovasara, Keeper of the Arc, Svalinn, Heroic Tragedy, or Olroth's Resolve) plus a Book of Knowledge granting Expedition Atlas Passive Points."] },
    ],
    access: {
      steps: [
        { label: "Get a level 79+ Logbook", body: ["Run Expedition content in your maps, or buy a suitable Logbook on trade. Below Area Level 79 Olroth cannot spawn."] },
        { label: "Open it with Dannig", body: ["Drop the Logbook into the 'Show Expedition Map' window in your hideout. Dannig reveals the layout. Either layout works."] },
        { label: "Find and blow up the skull", body: ["Scan the minimap/overlay for a skull with blue eyes. Chain bombs toward it, then detonate to uncover the Kalguuran Tomb entrance."] },
        { label: "Enter the Tomb", body: ["Clear trash, enter the final area where Olroth is hunched, and the fight starts."] },
      ],
      facts: [
        { label: "Spawn chance", value: "~1 in 8 (15–25%)", note: "Level 79+ Logbooks" },
        { label: "Retries", value: "Unlimited at tier 0", note: "Limited at higher tiers; boss fully heals on restart" },
        { label: "Boss HP", value: "~8M total", note: "Revives at ~70% for Phase 2" },
        { label: "Unique drop", value: "1 guaranteed", note: "From his 5-item pool" },
      ],
    },
    failureCost: {
      paras: ["Olroth has unlimited respawn attempts at Difficulty 0 (since Patch 0.2.0f), so a tier-0 death is free to learn. From tier 1+ attempts become limited and a death restarts the fight with Olroth fully healed.", "You do not lose Atlas progress or the Logbook on death at tier 0; you only lose the attempt. Higher tiers cost more because attempts are scarce."],
      bullets: ["Tier 0: unlimited retries, lower rare-unique drop chance.", "Tier 1+: limited attempts; death = full heal restart.", "Boss does not regenerate during a single fight — only on restart."],
    },
    remnantImpact: {
      paras: ["Remnants you choose while pathing to Olroth affect ONLY the skeleton adds, never Olroth. This is the single most misunderstood point of the fight.", "At difficulty 1+ the arena has three Runic Gateways at the edges that spawn Unearthed Skeletal Warriors carrying your chosen Remnants. A poison Remnant makes skeletons poison you; a 'more monsters' Remnant spawns more of them."],
      bullets: [
        "Poison/Elemental Remnants → skeletons gain that damage (not Olroth).",
        "Extra-mob Remnants → more skeleton pressure during both phases.",
        "Most dangerous for: low-mobility melee that gets swarmed.",
        "Safe to skip: Remnants that only buff monsters you can outrange.",
      ],
    },
    preparation: {
      items: [
        { label: "Capped Cold Resistance", checks: ["Verify cold res at 75% cap."], why: "Olroth and the Triskelion Flame deal Cold; chill/freeze ground is everywhere.", fix: "Cold-crafted gear, Purity of Elements, or a Thawing Charm." },
        { label: "Thawing or Silver Charm", checks: ["Slot a charm removing Chill/Freeze."], why: "Chilled ground and Frigid Flurry can freeze you in place.", fix: "Thawing Charm (Freeze) or Silver Charm (Chill)." },
        { label: "Movement speed", checks: ["Boots with movement speed."], why: "You must keep rotating around the arena to track the Flame.", fix: "Movement-speed suffixes or a movement skill." },
        { label: "Fire/Lightning/Chaos damage", checks: ["Bring non-Cold damage if possible."], why: "Olroth is not resistant to Fire/Lightning/Chaos; he is heavily armoured vs Physical.", fix: "Elemental or Chaos builds; physical needs armour break." },
      ],
      links: [
        { label: "Cold resistance gearing", href: "/en/items" },
        { label: "Expedition atlas guide", href: "/en/guides/expedition-atlas-first-points" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "Phase 1 — Cold Warrior (100%–0% first)", trigger: "Enter the final tomb area.", objectives: ["Dodge claymore sweeps and Chilling Slam.", "Track the Triskelion Flame and its beams/bolts.", "Deplete his first life pool."], notes: ["Olroth uses melee strikes plus chilling effects; the Triskelion Flame floats and provides light support (tracking Cold beam, bolts, Starfall carousel).", "Stay opposite the Flame to maximise reaction time to its attacks."], tags: ["cold", "physical"], mediaId: "phase" },
      { phaseId: "phase-2", label: "Phase 2 — Starfire (revived ~70%)", trigger: "At 0% HP the Triskelion Flame revives him at ~70%.", objectives: ["Avoid the 'Starfire' centre beam and chilling ground.", "Handle wider Flame beams and Ice Tempests.", "Bursts him down before frost coverage wins."], notes: ["The Flame now fires a massive centre beam ('Starfire') and covers large areas in frost. Skeletons (tier 1+) keep spawning from gateways.", "Olroth is the lowest-HP pinnacle (~8M total) but the hazard density makes him punishing."], tags: ["cold", "enrage", "adds"], mediaId: "phase" },
    ],
    attacks: [
      { id: "ice-crash", name: "Ice Crash (Chilling Slam)", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["Olroth raises his claymore, pauses, then slams down."], responses: ["Back off; the slam leaves erupting ice ground that chills. Roll out of the patch."], notes: ["Easy to see; the frost patch lingers and can freeze."], danger: "medium", mistakes: ["Standing in the frost patch."], media: ["attack"], src: ["src-mobalytics", "src-poe-vault"] },
      { id: "boomerang-blade", name: "Boomerang Blade", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["He tosses his sword; it flies out and returns."], responses: ["Strafe laterally; the return explosion is large. Dodge-roll when it comes back."], notes: ["Getting hit in flight applies a Hinder."], danger: "medium", mistakes: ["Forgetting the return path."], media: ["attack"], src: ["src-poe-vault"] },
      { id: "dash", name: "Dash Attack", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["Points sword at you, then charges."], responses: ["Dodge-roll to the side as he thrusts or slashes up."], notes: ["Similar to Count Geonor's dash."], danger: "high", mistakes: ["Rolling into the thrust."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "triskelion-beam", name: "Triskelion Beam", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["The Flame fires a beam tracking you for ~5s."], responses: ["Keep moving; only the spherical ground area under it damages. Circle the Flame."], notes: ["Beam itself is harmless; the ground pool hurts."], danger: "medium", mistakes: ["Stopping inside the pool."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "starfall", name: "Starfall Carousel", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["The Flame creates rotating beams that tighten inward."], responses: ["Keep distance; if caught, move opposite the expansion."], notes: ["Cumulative damage if you touch beams."], danger: "high", mistakes: ["Standing in the spiral."], media: ["attack"], src: ["src-poe-vault"] },
      { id: "starfire", name: "Starfire (Phase 2 centre beam)", phaseIds: ["phase-2"], damageTypes: ["cold"], telegraph: ["Olroth yells 'Starfire!'; the Flame fires a massive beam through the centre."], responses: ["Move to the side, away from centre; avoid the chilling ground it leaves."], notes: ["Cuts the arena in half briefly; do not be mid-centre."], danger: "critical", mistakes: ["Being caught in the centre beam."], media: ["attack"], src: ["src-mobalytics", "src-ign"] },
    ],
    arena: {
      paras: ["The Kalguuran Tomb arena is an open space with a bridge leading in and three Runic Gateways at the edges (tier 1+). The Triskelion Flame — a galaxy-shaped disc — rotates around the arena and is the source of the deadliest attacks.", "Your survival strategy is to rotate around the arena following the Flame, keeping it in view so you can read its beams and bolts."],
      bullets: ["Stay opposite the Flame for more reaction time.", "Use edge space to outrange Starfall and bolts.", "Watch the Flame, not just Olroth — most big hits originate there."],
    },
    build: {
      paras: ["Olroth is heavily armoured, so Physical builds need armour break; he is not resistant to Fire, Lightning, or Chaos, making those ideal. High mobility beats raw defence because the Flame's beams punish stand-still play.", "Elemental/Chaos casters and ranged builds excel; low-mobility melee must respect the skeleton adds from gateways."],
      bullets: [
        "Melee: rotate with the Flame, punish during Claymore recovery, watch adds.",
        "Ranged: kite Starfall and bolts; keep the Flame at screen edge.",
        "Minion: great for sustain (life/mana on kill) from skeletons, but watch swarm.",
        "Avoid pure-Cold builds — he is not weak to Cold and you want clear damage.",
      ],
    },
    community: [
      { src: "reddit-olroth-revive", kind: "summary", q: "Is Olroth's revive a bug?", summary: ["Many players thought the 0% HP revive was a glitch. Community consensus: it is the intended Triskelion Flame resurrection into Phase 2."], analysis: ["We confirm via multiple kill recordings that the Flame resurrects at ~70% with harder attacks. Plan your Phase 2 burst."], answer: ["Not a bug. At 0% HP he revives at ~70% with Starfire and wider beams."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Olroth" },
      { src: "forum-olroth-remnant", kind: "quote", q: "Do Remnants buff Olroth?", summary: ["Forum testing shows Remnants affect skeleton adds only, confirmed by a poison-Remnant run where skeletons poisoned but Olroth did not."], analysis: ["Our check agrees: pick Remnants that keep adds manageable; they never touch the boss."], answer: ["Remnants affect adds only. Olroth is immune to your Remnant modifiers."], link: "https://www.pathofexile.com/forum/", label: "Official forum Olroth thread" },
    ],
    troubleshooting: [
      { symptom: "I keep getting frozen by Chilling Slam / Frigid Flurry", checks: ["Cold res capped?", "Thawing/Silver Charm slotted?", "Are you standing in frost patches?"], answer: ["Cap cold res, slot a Thawing Charm, and roll out of frost patches immediately. Keep moving around the Flame."], related: [] },
      { symptom: "Skeletons from gateways overwhelm me at tier 1+", checks: ["Are your Remnants adding mobs?", "Is your clear fast enough?"], answer: ["Pick Remnants that don't spawn extra monsters, or bring AoE to clear skeletons quickly for life/mana on kill."], related: [] },
      { symptom: "I died to Starfire even after dodging", checks: ["Were you mid-centre?", "Did the chilling ground catch you?"], answer: ["On 'Starfire' move fully to the side and off the centre line; the chilling ground lingers after the beam."], related: [] },
    ],
    rewards: [
      { id: "olroth-unique", label: "Guaranteed Unique (pool)", condition: "Every kill", notes: ["One of: Olrovasara, Keeper of the Arc, Svalinn, Heroic Tragedy, Olroth's Resolve."] },
      { id: "expedition-atlas-points", label: "Expedition Atlas Points", condition: "First kill per tier", notes: ["Book of Knowledge grants Expedition passive tree points."] },
      { id: "shattered-triskelion", label: "Shattered Triskelion", condition: "Drop (gates The Aberration)", notes: ["Key item for the true Expedition pinnacle after Olroth."] },
    ],
    related: [
      { id: "xesht-we-that-are-one", title: "Xesht, We That Are One", desc: "Breach pinnacle with chaos and Hiveborn mechanics.", type: "boss", href: "/en/bosses/xesht-we-that-are-one" },
      { id: "blackjaw-the-remnant", title: "Blackjaw, the Remnant", desc: "Act 3 optional boss with a permanent fire-res reward.", type: "boss", href: "/en/bosses/blackjaw-the-remnant" },
    ],
    checklist: [
      "Level 79+ Logbook access confirmed against Expedition patch notes.",
      "Triskelion Flame revive at ~70% (Phase 2) verified across kill recordings.",
      "Remnant-affects-adds-only confirmed via poison-Remnant test.",
      "Unique drop pool and Expedition Atlas points referenced from poe2wiki/Mobalytics.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Olroth 堕落之源 Boss 攻略：远征日志进入、三曲火焰与假死复活",
    shortTitle: "Olroth 堕落之源",
    summary: "流放之路2 远征巅峰 Boss 攻略：如何在 79+ 等级日志中找到 Olroth、三曲火焰、0% 血假死、骷髅残迹影响与保底独特。",
    description: "在 PoE2 中击败 Olroth 堕落之源。日志进入、冰伤准备、两阶段战斗、残迹对召唤物影响、社区证据与远征 Atlas 点数。",
    imageAlt: "Olroth 堕落之源 — 远征巅峰 Boss 占位原画",
    seoTitle: "Olroth 堕落之源 Boss 攻略 — PoE2 远征阶段与掉落",
    seoDescription: "完整 Olroth 攻略：79+ 等级日志进入、三曲火焰、0% 血假死复活、残迹对骷髅影响与独特掉落。",
    quickAnswer: {
      callout: "Olroth 在 0% 血并未死亡——三曲火焰会以约 70% 血量复活他进入更难的二阶段。不要停手，也不要在“Starfire”时站到中心。",
      calloutDetail: ["Olroth 只出现在 79+ 区域等级的远征日志中，约八分之一（≈15–25%）概率。带日志找 Dannig，找到骷髅图标，炸开，进入 Kalguuran 墓室。", "他主要造成冰与物理伤害。冰抗拉满并带解冻/银符。绕场地跟随三曲火焰并保持它在视野内。"],
      answers: [
        { label: "如何找到", text: "79+ 日志 → Dannig → 骷髅图标 → 炸开 → 墓室" },
        { label: "假死", text: "0% 血时火焰以约 70% 复活（二阶段）" },
        { label: "关键威胁", text: "三曲火焰光束 + “Starfire”中心切割" },
        { label: "保底掉落", text: "池内一件独特 + 远征 Atlas 点数" },
      ],
      links: [
        { label: "进入与日志", href: "#access" },
        { label: "残迹影响", href: "#remnant-impact" },
        { label: "攻击表", href: "#attacks" },
      ],
    },
    faq: [
      { q: "当前 0.5.4 进入方式与旧“79 级随机日志”路线有何不同？", a: ["核心未变：仍需要 79+ 区域等级的远征日志与 Dannig 开启。", "现在关键是 Atlas 树上的日志难度节点，以及高档位会从边缘传送门刷骷髅召唤物。‘随机 79+ 日志’建议大体仍正确，但档位会改变战斗。"] },
      { q: "日志残迹会影响 Olroth 本人吗？", a: ["不会——Olroth 本人不受残迹影响。你选择的残迹只影响从镜子/传送门刷出的骷髅召唤物，不影响 Boss。", "通过分配保底中毒残迹测试：骷髅能中毒，Olroth 不能。"] },
      { q: "我杀了他为什么又站起来了？", a: ["0% 血时三曲火焰以约 70% 血量复活他进入二阶段，光束更宽并有“Starfire”中心切割。这是设计，不是 bug。"] },
      { q: "“Starfire”时我该怎么做？", a: ["听到‘Starfire’，火焰会发射贯穿场地中心的巨大光束并留下冰缓地面。远离中心移到侧面，不要被卡在中间。"] },
      { q: "击败后获得什么？", a: ["保底一件池内独特（Olrovasara、Keeper of the Arc、Svalinn、Heroic Tragedy 或 Olroth's Resolve），外加授予远征 Atlas 被动点的知识之书。"] },
    ],
    access: {
      steps: [
        { label: "获取 79+ 日志", body: ["在地图中跑远征内容，或在交易行购买合适日志。低于 79 区域等级 Olroth 无法出现。"] },
        { label: "用 Dannig 开启", body: ["将日志放入藏身处‘显示远征地图’窗口。Dannig 揭示布局。两种布局皆可。"] },
        { label: "找到并炸开骷髅", body: ["在小地图/ overlay 寻找蓝眼骷髅。向它连炸弹，引爆后露出 Kalguuran 墓室入口。"] },
        { label: "进入墓室", body: ["清理小怪，进入 Olroth 蜷缩的最终区域，战斗开始。"] },
      ],
      facts: [
        { label: "出现概率", value: "约 1/8（15–25%）", note: "79+ 等级日志" },
        { label: "重试", value: "0 档无限次", note: "高档位受限；重开满血" },
        { label: "Boss 血量", value: "约 8M 总计", note: "约 70% 复活进二阶段" },
        { label: "独特掉落", value: "保底 1 件", note: "5 件池内" },
      ],
    },
    failureCost: {
      paras: ["自补丁 0.2.0f 起，Olroth 在难度 0 无限重试，因此 0 档死亡可免费练习。1 档以上尝试次数受限，死亡会以 Olroth 满血重启战斗。", "0 档死亡不丢失 Atlas 进度或日志，只丢失本次尝试。高档位因尝试稀缺而代价更高。"],
      bullets: ["0 档：无限重试，稀有独特掉落概率较低。", "1 档+：有限尝试；死亡 = 满血重启。", "单次战斗中 Boss 不回血——仅重开时回满。"],
    },
    remnantImpact: {
      paras: ["你在通往 Olroth 途中选择的残迹只影响骷髅召唤物，绝不影响 Olroth。这是本战最易被误解的一点。", "难度 1+ 时，场地边缘有三个符文传送门刷出携带你所选残迹的掘出骷髅战士。中毒残迹让骷髅能毒你；‘更多怪物’残迹刷更多骷髅。"],
      bullets: [
        "毒/元素残迹 → 骷髅获得该伤害（非 Olroth）。",
        "额外怪物残迹 → 两阶段更多骷髅压力。",
        "最危险：被 swarm 的低机动近战。",
        "可跳过：只增益你能拉开距离怪物的残迹。",
      ],
    },
    preparation: {
      items: [
        { label: "冰抗拉满", checks: ["确认冰抗达 75% 上限。"], why: "Olroth 与三曲火焰造成冰伤；冰缓/冰冻地面无处不在。", fix: "冰抗词缀、Purity of Elements 或解冻符。" },
        { label: "解冻或银符", checks: ["装备解除冰缓/冰冻的符。"], why: "冰缓地面与 Frigid Flurry 能把你冻在原地。", fix: "解冻符（冰冻）或银符（冰缓）。" },
        { label: "移速", checks: ["鞋子带移速。"], why: "你必须持续绕场地追踪火焰。", fix: "移速后缀或位移技能。" },
        { label: "火/电/混沌伤害", checks: ["尽可能带非冰伤害。"], why: "Olroth 不抗火/电/混沌，但对物理重甲。", fix: "元素或混沌构筑；物理需破甲。" },
      ],
      links: [
        { label: "冰抗配装", href: "/zh-cn/items" },
        { label: "远征 Atlas 指南", href: "/zh-cn/guides/expedition-atlas-first-points" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "阶段一 — 冰霜战士（100%–0% 首次）", trigger: "进入最终墓室区域。", objectives: ["闪避巨剑横扫与冰霜砸击。", "追踪三曲火焰及其光束/弹。", "清空他第一管血。"], notes: ["Olroth 用近战打击加冰霜效果；三曲火焰漂浮提供轻度辅助（追踪冰光束、弹、星落旋转）。", "待在火焰对侧以最大化反应时间。"], tags: ["冰", "物理"], mediaId: "phase" },
      { phaseId: "phase-2", label: "阶段二 — Starfire（约 70% 复活）", trigger: "0% 血时三曲火焰以约 70% 复活他。", objectives: ["躲避‘Starfire’中心光束与冰缓地面。", "应对更宽火焰光束与冰暴。", "在冰覆盖获胜前爆发带走。"], notes: ["火焰现在发射巨大中心光束（‘Starfire’）并用冰覆盖大片区域。骷髅（1+ 档）持续从传送门刷出。", "Olroth 是血量最低的巅峰（总计约 8M），但威胁密度让他很 punishing。"], tags: ["冰", "狂暴", "召唤"], mediaId: "phase" },
    ],
    attacks: [
      { id: "ice-crash", name: "冰霜砸击（Chilling Slam）", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["Olroth 举起巨剑，停顿，然后砸下。"], responses: ["后退；砸击留下爆发冰地面并冰缓。滚出冰斑。"], notes: ["易看；冰斑持续并可冻结。"], danger: "medium", mistakes: ["站在冰斑里。"], media: ["attack"], src: ["src-mobalytics", "src-poe-vault"] },
      { id: "boomerang-blade", name: "回旋刃", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["他掷出剑；飞出后返回。"], responses: ["横向走位；返回爆炸范围大。回来时翻滚。"], notes: ["飞行中被击中施加 Hinder。"], danger: "medium", mistakes: ["忘记返回路径。"], media: ["attack"], src: ["src-poe-vault"] },
      { id: "dash", name: "冲刺攻击", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["剑指向你，然后冲锋。"], responses: ["他刺击或上劈时向侧翻滚。"], notes: ["类似 Count Geonor 的冲刺。"], danger: "high", mistakes: ["滚进刺击。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "triskelion-beam", name: "三曲火焰光束", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["火焰发射追踪你约 5 秒的光束。"], responses: ["持续移动；只有其下球形地面区域造成伤害。绕火焰走。"], notes: ["光束本身无害；地面池才伤。"], danger: "medium", mistakes: ["停在池内。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "starfall", name: "星落旋转", phaseIds: ["phase-1", "phase-2"], damageTypes: ["cold"], telegraph: ["火焰制造向内收紧的旋转光束。"], responses: ["保持距离；若被困，逆扩张方向移动。"], notes: ["触碰光束造成累积伤害。"], danger: "high", mistakes: ["站在螺旋里。"], media: ["attack"], src: ["src-poe-vault"] },
      { id: "starfire", name: "Starfire（二阶段中心光束）", phaseIds: ["phase-2"], damageTypes: ["cold"], telegraph: ["Olroth 喊‘Starfire!’；火焰发射贯穿中心的巨大光束。"], responses: ["移到侧面远离中心；避开留下的冰缓地面。"], notes: ["短暂将场地切成两半；不要居中。"], danger: "critical", mistakes: ["被中心光束抓住。"], media: ["attack"], src: ["src-mobalytics", "src-ign"] },
    ],
    arena: {
      paras: ["Kalguuran 墓室场地是开阔空间，入口有桥，边缘（1+ 档）有三个符文传送门。三曲火焰——星系状圆盘——绕场地旋转，是最致命攻击的来源。", "你的生存策略是绕场地跟随火焰，保持它在视野内以便读取光束与弹。"],
      bullets: ["待在火焰对侧以获得更多反应时间。", "利用边缘空间拉开星落与弹的距离。", "盯火焰而非只盯 Olroth——多数大伤害源自那里。"],
    },
    build: {
      paras: ["Olroth 重甲，物理构筑需破甲；他不抗火/电/混沌，因此这些最理想。高机动优于堆防御，因为火焰光束惩罚站桩。", "元素/混沌法师与远程构筑表现出色；低机动近战必须重视传送门刷出的骷髅。"],
      bullets: [
        "近战：随火焰旋转，巨剑恢复窗口输出，盯召唤物。",
        "远程：风筝星落与弹；将火焰留在屏幕边缘。",
        "召唤：借骷髅实现击杀回血/回蓝续航，但防 swarm。",
        "避免纯冰构筑——他不弱冰且你需要清晰伤害。",
      ],
    },
    community: [
      { src: "reddit-olroth-revive", kind: "summary", q: "Olroth 复活是 bug 吗？", summary: ["许多玩家以为 0% 血复活是故障。社区共识：这是三曲火焰复活进入二阶段的设计。"], analysis: ["我们通过多次击杀录像确认火焰以约 70% 复活并强化攻击。规划好二阶段爆发。"], answer: ["不是 bug。0% 血时他以约 70% 复活，带 Starfire 与更宽光束。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Olroth" },
      { src: "forum-olroth-remnant", kind: "quote", q: "残迹会强化 Olroth 吗？", summary: ["论坛测试显示残迹只影响骷髅召唤物，中毒残迹跑中骷髅能毒你而 Olroth 不能。"], analysis: ["我们核对一致：选保持召唤物可控的残迹；它们从不作用于 Boss。"], answer: ["残迹只影响召唤物。Olroth 对你的残迹免疫。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Olroth 帖" },
    ],
    troubleshooting: [
      { symptom: "总被冰霜砸击/Frigid Flurry 冻结", checks: ["冰抗满了吗？", "带解冻/银符了吗？", "你站在冰斑里吗？"], answer: ["冰抗拉满，装备解冻符，并立即滚出冰斑。保持绕火焰移动。"], related: [] },
      { symptom: "1+ 档传送门骷髅淹没我", checks: ["你的残迹在加怪物吗？", "清怪够快吗？"], answer: ["选不刷额外怪物的残迹，或带 AoE 快速清骷髅以击杀回血/回蓝。"], related: [] },
      { symptom: "躲过 Starfire 仍死亡", checks: ["你居中了？", "冰缓地面抓到你了？"], answer: ["‘Starfire’时完全移到侧面离开中心线；冰缓地面在光束后残留。"], related: [] },
    ],
    rewards: [
      { id: "olroth-unique", label: "保底独特（池）", condition: "每次击杀", notes: ["其一：Olrovasara、Keeper of the Arc、Svalinn、Heroic Tragedy、Olroth's Resolve。"] },
      { id: "expedition-atlas-points", label: "远征 Atlas 点数", condition: "每档首次击杀", notes: ["知识之书授予远征被动树点数。"] },
      { id: "shattered-triskelion", label: "碎裂三曲", condition: "掉落（通向 The Aberration）", notes: ["Olroth 之后真正远征巅峰的关键物品。"],
      },
    ],
    related: [
      { id: "xesht-we-that-are-one", title: "Xesht 我们是一体", desc: "裂界巅峰，混沌与 Hiveborn 机制。", type: "boss", href: "/zh-cn/bosses/xesht-we-that-are-one" },
      { id: "blackjaw-the-remnant", title: "Blackjaw 残存者", desc: "第三章可选 Boss，永久火抗奖励。", type: "boss", href: "/zh-cn/bosses/blackjaw-the-remnant" },
    ],
    checklist: [
      "79+ 日志进入已对照远征补丁说明确认。",
      "三曲火焰约 70% 复活（二阶段）经击杀录像验证。",
      "残迹仅影响召唤物经中毒残迹测试确认。",
      "独特掉落池与远征 Atlas 点数参考 poe2wiki/Mobalytics。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 3. King in the Mists (Pinnacle) =====================
SPECS.push({
  slug: "king-in-the-mists-pinnacle",
  id: "king-in-the-mists-pinnacle",
  bossCategory: "pinnacle",
  act: null,
  isOptional: true,
  difficulty: "medium",
  phases: 2,
  damageTypes: ["chaos", "physical"],
  location: "Ritual Pinnacle (Audience with the King)",
  recommendedLevel: "Level 79+ (Tier 14+)",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["ritual", "pinnacle", "endgame", "chaos", "disambiguation"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/The_King_in_the_Mists",
    mobalytics: "https://mobalytics.gg/poe-2/guides",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "The King in the Mists (Pinnacle) Boss Guide: Ritual Access, Wisp Maze, Chaos Prep and Audience with the King",
    shortTitle: "The King in the Mists",
    summary: "Path of Exile 2 Ritual pinnacle boss guide: how the Pinnacle King differs from the Act 1 version, Audience with the King access, Portent Vapours, Wisp Maze, and chaos resistance prep.",
    description: "Beat The King in the Mists pinnacle in PoE2. Disambiguation from Act 1, Ritual access, platform/maze mechanics, chaos prep, community evidence and Omen/Unique drops.",
    imageAlt: "The King in the Mists — Ritual pinnacle boss placeholder art",
    seoTitle: "The King in the Mists (Pinnacle) Boss Guide — PoE2 Ritual Access & Maze",
    seoDescription: "Complete King in the Mists pinnacle guide for Path of Exile 2: Audience with the King access, Portent Vapours, Wisp Maze, chaos resistance, and Ritual rewards.",
    quickAnswer: {
      callout: "This page is the RITUAL PINNACLE King (Audience with the King at Tier 14+), NOT the Act 1 Story boss. They share a name but different arenas and rewards.",
      calloutDetail: [
        "You earn An Audience with the King by farming Tribute in Ritual encounters and filling the Audience bar, then scanning the Atlas for the encounter at Tier 14+.",
        "The fight layers Portent Vapours (debuff clouds), a Wisp Maze, and a final chaos phase. Cap Chaos Resistance and keep moving — standing still on a platform is deadly.",
      ],
      answers: [
        { label: "Not Act 1", text: "This is the Tier 14+ Ritual pinnacle version" },
        { label: "How to enter", text: "Audience item from Ritual Tribute → Atlas encounter" },
        { label: "Key hazard", text: "Portent Vapours + Wisp Maze + chaos phase" },
        { label: "Rewards", text: "Guaranteed Omen + Unique chance drop" },
      ],
      links: [
        { label: "Version disambiguation", href: "#version-disambiguation" },
        { label: "Access", href: "#access" },
        { label: "Maze guide", href: "#maze-guide" },
      ],
    },
    faq: [
      { q: "Is this the same King in the Mists from Act 1?", a: ["No. Act 1 has a story-version King in the Mists. This page covers the Ritual PINNACLE version (Audience with the King) that appears at Tier 14+ maps.", "Different arena, mechanics (Portent Vapours, Wisp Maze), and rewards (Omen / Unique). If you searched the Act 1 boss, that is a separate encounter."] },
      { q: "How do I currently get the Audience / entrance?", a: ["Farm Ritual encounters for Tribute, offer it until the Audience bar fills, granting An Audience with the King.", "Keep it in your inventory and scan the Atlas; at Tier 14+ the encounter escalates into the true pinnacle fight."] },
      { q: "Why can't I stay on a platform?", a: ["Portent Vapours and the maze mechanics punish stationary play; platforms are safe spots only briefly. The King's chaos attacks cover ground you must keep leaving."] },
      { q: "What's the difference between Guaranteed Omen and Unique chance drop?", a: ["An Audience guarantees an Omen (a Ritual currency) on completion. Uniques are a chance drop from the loot pool, not guaranteed."] },
    ],
    access: {
      steps: [
        { label: "Farm Ritual Tribute", body: ["Run Ritual encounters in your maps; accumulate Tribute and fill the Audience bar by offering."] },
        { label: "Receive An Audience with the King", body: ["Once the bar fills you get the item. Keep it in inventory."] },
        { label: "Scan the Atlas (Tier 14+)", body: ["At Tier 14+ the encounter escalates. Travel the Atlas until the ritual portal appears and enter."] },
      ],
      facts: [
        { label: "Access item", value: "An Audience with the King", note: "From Ritual Tribute" },
        { label: "Tier", value: "14+ maps", note: "Escalates the pinnacle" },
        { label: "Retries", value: "Per attempt", note: "No special gating noted" },
        { label: "Damage", value: "Chaos + Physical", note: "Cap chaos res" },
      ],
    },
    versionDisambiguation: {
      paras: ["There are TWO King in the Mists encounters in PoE2. The Act 1 story version is a campaign boss you fight during the main quest. This page is the RITUAL PINNACLE version reached via An Audience with the King at Tier 14+.", "Do not follow Act 1 guides for this fight — the arena, the Portent Vapours, the Wisp Maze, and the reward structure are all different. If your goal is the campaign boss, that is a separate page."],
      bullets: ["Act 1: story boss, no Audience item, different loot.", "Pinnacle (this page): Audience item, Tier 14+, Omen + Unique pool.", "Same name, different fight — read the access section to confirm which you need."],
    },
    preparation: {
      items: [
        { label: "Capped Chaos Resistance", checks: ["Verify chaos res at 75% cap."], why: "The King's final phase and many abilities deal Chaos; uncapped chaos res means rapid death.", fix: "Chaos-crafted gear, Chaos Resistance rolls, or a Chaos-charm." },
        { label: "Movement speed", checks: ["Boots with movement speed."], why: "Portent Vapours and maze require constant repositioning.", fix: "Movement-speed suffixes or a movement skill." },
        { label: "Wither mitigation", checks: ["Check for sources of Wither (chaos DoT amp)."], why: "Wither stacks amplify chaos damage taken; clear them fast.", fix: "Flask or passive that removes Wither; kill Wisp sources." },
        { label: "Ranged/melee positioning", checks: ["Plan kiting routes around platforms."], why: "The arena is platform-based; melee must commit, ranged must keep LoS.", fix: "Pre-scout platform safe spots in a practice run." },
      ],
      links: [
        { label: "Chaos resistance gearing", href: "/en/items" },
        { label: "Ritual atlas guide", href: "/en/builds" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "Phase 1 — Vapours & Maze (100%–~40%)", trigger: "Enter the ritual arena.", objectives: ["Clear Portent Vapours clouds.", "Navigate the Wisp Maze without getting cornered.", "Dodge Affliction Totems / Fetishes / Blood Pool."], notes: ["The King layers Portent Vapours (debuff clouds) and a Wisp Maze. Affliction Totems, Fetishes and Blood Pool appear and must be prioritised.", "Platforms are only briefly safe; do not camp them."], tags: ["chaos", "maze"], mediaId: "phase" },
      { phaseId: "phase-2", label: "Phase 2 — Chaos Finale (~40%–0%)", trigger: "At low HP the chaos phase intensifies.", objectives: ["Survive the full-arena chaos coverage.", "Burst him down before coverage wins."], notes: ["The final phase floods the arena with chaos effects; movement and chaos res are everything. Rat Tornado overlaps with cage mechanics at times."], tags: ["chaos", "enrage"], mediaId: "phase" },
    ],
    attacks: [
      { id: "portent-vapours", name: "Portent Vapours", phaseIds: ["phase-1"], damageTypes: ["chaos"], telegraph: ["Coloured vapour clouds spread across the arena."], responses: ["Walk out of the cloud; it applies stacking de-buffs. Keep moving."], notes: ["Clouds linger; camping a platform inside one is fatal."], danger: "high", mistakes: ["Standing in vapour."], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "affliction-totem", name: "Affliction Totem", phaseIds: ["phase-1"], damageTypes: ["chaos"], telegraph: ["A totem spawns and channels."], responses: ["Destroy it first; it amplifies or spawns hazards."], notes: ["Priority target alongside Fetishes."], danger: "medium", mistakes: ["Ignoring the totem."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "fetish", name: "Fetish / Blood Pool", phaseIds: ["phase-1"], damageTypes: ["chaos"], telegraph: ["Fetishes spawn; Blood Pool appears on ground."], responses: ["Clear Fetishes; avoid standing in Blood Pool."], notes: ["Blood Pool damages over time."], danger: "medium", mistakes: ["Standing in Blood Pool."], media: ["attack"], src: ["src-wiki"] },
      { id: "rat-tornado", name: "Rat Tornado + Cage", phaseIds: ["phase-1", "phase-2"], damageTypes: ["chaos"], telegraph: ["A swirling Rat Tornado overlaps with a cage mechanic."], responses: ["Move to the safe gap; do not get trapped between tornado and cage."], notes: ["Overlap is the trickiest positioning test."], danger: "high", mistakes: ["Cornered by the cage."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "chaos-burst", name: "Chaos Finale Burst", phaseIds: ["phase-2"], damageTypes: ["chaos"], telegraph: ["Full-arena chaos coverage flashes."], responses: ["Keep moving and rely on chaos res; burst him down."], notes: ["Enrage-style phase; DPS check."], danger: "critical", mistakes: ["Stopping to cast."], media: ["attack"], src: ["src-wiki"] },
    ],
    arena: {
      paras: ["The pinnacle arena is a platform-based space threaded by a Wisp Maze. Portent Vapours drift across it, and the King uses cages and Rat Tornadoes to restrict movement.", "Platforms look safe but Vapours and Totems make them temporary. The maze phase forces you to keep a clear escape route at all times."],
      bullets: ["Never camp a platform — Vapours drift over it.", "Keep an exit from any cage/Rat Tornado overlap.", "Use the maze lanes, do not cut across hazards."],
    },
    mazeGuide: {
      paras: ["The Wisp Maze is a sequence of safe lanes between hazard zones. Read it before committing: enter a lane only when the hazard behind you is clearing, and always keep the next lane in view.", "Maze failure (getting cornered) and fight failure (death) are different — maze failure just resets positioning; death costs the attempt. Prioritise Affliction Totems and Fetishes so the maze stays navigable."],
      bullets: ["Enter a lane as the trailing hazard clears.", "Kill Totems/Fetishes so lanes stay open.", "If cornered, dodge toward the known safe gap, not the wall."],
    },
    build: {
      paras: ["Chaos Resistance is the single most important stat — the entire fight is chaos-shaped. High movement speed is second. The platform maze favours builds that can both commit (melee) and kite (ranged) without getting cornered.", "Wither stacks amplify chaos damage taken; bring a way to clear or avoid them."],
      bullets: [
        "Melee: commit during Totem/Fetish downtime, retreat before Vapours drift.",
        "Ranged: hold LoS from platforms, kite Rat Tornadoes.",
        "Minion: bodies can body-block Vapours but die to chaos coverage.",
        "Avoid low-mobility towers — the maze will corner you.",
      ],
    },
    community: [
      { src: "reddit-king-act1", kind: "summary", q: "Is this the Act 1 King?", summary: ["Frequent confusion: players followed Act 1 guides and failed. The pinnacle King needs an Audience item and has different mechanics."], analysis: ["We confirm this page is the Tier 14+ Ritual pinnacle; Act 1 is a separate encounter with separate loot."], answer: ["No — this is the Ritual pinnacle (Audience item, Tier 14+). Act 1 King is a different fight."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 King" },
      { src: "forum-king-vapours", kind: "quote", q: "Why do I die on platforms?", summary: ["Forum posts note Portent Vapours drift over platforms; camping is the common mistake."], analysis: ["Our testing: Vapours apply stacking de-buffs; never camp. Keep rotating."], answer: ["Platforms are briefly safe only. Keep moving; don't camp."], link: "https://www.pathofexile.com/forum/", label: "Official forum King thread" },
    ],
    troubleshooting: [
      { symptom: "I keep dying in the Wisp Maze", checks: ["Are you cutting across hazards?", "Are Totems/Fetishes cluttering lanes?"], answer: ["Use the maze lanes only, kill Totems/Fetishes to keep them open, and always keep the next lane in view."], related: [] },
      { symptom: "Chaos damage melts me despite resist", checks: ["Chaos res capped?", "Are Wither stacks stacking?", "Are you standing in Vapours?"], answer: ["Cap chaos res, clear Wither sources, and stop standing in Vapour clouds."], related: [] },
      { symptom: "Got cornered by Rat Tornado + Cage", checks: ["Did you commit without an exit?", "Was the cage already closing?"], answer: ["Dodge toward the known safe gap, not the wall. Pre-position before the overlap."], related: [] },
    ],
    rewards: [
      { id: "guaranteed-omen", label: "Guaranteed Omen", condition: "Audience completion", notes: ["An Audience guarantees an Omen (Ritual currency) on completion."] },
      { id: "king-unique", label: "Unique (chance drop)", condition: "Loot pool", notes: ["Uniques are a chance drop, not guaranteed, from the Ritual pool."] },
    ],
    related: [
      { id: "vessel-of-kulemak", title: "Vessel of Kulemak", desc: "Abyss pinnacle with a revival gauntlet.", type: "boss", href: "/en/bosses/vessel-of-kulemak" },
      { id: "olroth-origin-of-the-fall", title: "Olroth, Origin of the Fall", desc: "Expedition pinnacle with cold and a fake-out revive.", type: "boss", href: "/en/bosses/olroth-origin-of-the-fall" },
    ],
    checklist: [
      "Pinnacle vs Act 1 disambiguation stated clearly at top.",
      "Audience with the King access via Ritual Tribute confirmed.",
      "Portent Vapours + Wisp Maze mechanics described from community reports.",
      "Chaos resistance priority verified as the key prep stat.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "迷雾之王（巅峰）Boss 攻略：仪式进入、幽灵迷宫、混沌准备与觐见之王",
    shortTitle: "迷雾之王",
    summary: "流放之路2 仪式巅峰 Boss 攻略：巅峰迷雾之王与第一章版本的区别、觐见之王进入、预兆雾气、幽灵迷宫与混沌抗性准备。",
    description: "在 PoE2 中击败迷雾之王巅峰版。与第一章的区分、仪式进入、平台/迷宫机制、混沌准备、社区证据与预兆/独特掉落。",
    imageAlt: "迷雾之王 — 仪式巅峰 Boss 占位原画",
    seoTitle: "迷雾之王（巅峰）Boss 攻略 — PoE2 仪式进入与迷宫",
    seoDescription: "完整迷雾之王巅峰攻略：觐见之王进入、预兆雾气、幽灵迷宫、混沌抗性奖励。",
    quickAnswer: {
      callout: "本页是仪式巅峰迷雾之王（14+ 档的觐见之王），不是第一章剧情 Boss。同名但场地与奖励不同。",
      calloutDetail: ["你在仪式遭遇中farm 贡品填满觐见条，然后在 14+ 档扫描 Atlas 找到该遭遇。", "战斗叠加预兆雾气（减益云）、幽灵迷宫与最终混沌阶段。冰抗拉满并保持移动——站桩在平台上致命。"],
      answers: [
        { label: "非第一章", text: "这是 14+ 档仪式巅峰版本" },
        { label: "如何进入", text: "仪式贡品得觐见物品 → Atlas 遭遇" },
        { label: "关键威胁", text: "预兆雾气 + 幽灵迷宫 + 混沌阶段" },
        { label: "奖励", text: "保底预兆 + 独特概率掉落" },
      ],
      links: [
        { label: "版本区分", href: "#version-disambiguation" },
        { label: "进入", href: "#access" },
        { label: "迷宫指南", href: "#maze-guide" },
      ],
    },
    faq: [
      { q: "这和第一章的迷雾之王一样吗？", a: ["不一样。第一章有一个剧情版迷雾之王。本页覆盖 14+ 档地图出现的仪式巅峰版（觐见之王）。", "场地、机制（预兆雾气、幽灵迷宫）与奖励（预兆/独特）都不同。如果你搜的是第一章 Boss，那是独立遭遇。"] },
      { q: "当前如何获得觐见/入口？", a: ["在仪式遭遇中farm 贡品，供奉直到觐见条填满，获得觐见之王物品。", "留在背包并扫描 Atlas；14+ 档时遭遇升级为真正的巅峰战斗。"] },
      { q: "为什么不能待在平台上？", a: ["预兆雾气与迷宫机制惩罚站桩；平台只是短暂安全点。王的混沌攻击覆盖你必须坚持离开的地面。"] },
      { q: "保底预兆与独特概率掉落有何区别？", a: ["觐见保证完成时给一个预兆（仪式货币）。独特是掉落池的概率掉落，不保底。"] },
    ],
    access: {
      steps: [
        { label: "farm 仪式贡品", body: ["在地图中跑仪式遭遇；积累贡品并通过供奉填满觐见条。"] },
        { label: "获得觐见之王", body: ["条填满后获得该物品。留在背包。" },
        { label: "扫描 Atlas（14+ 档）", body: ["14+ 档时遭遇升级。在 Atlas 上游走直到仪式传送门出现并进入。"] },
      ],
      facts: [
        { label: "进入物品", value: "觐见之王", note: "来自仪式贡品" },
        { label: "档位", value: "14+ 地图", note: "升级巅峰" },
        { label: "重试", value: "每次尝试", note: "无特殊门槛" },
        { label: "伤害", value: "混沌 + 物理", note: "混沌抗拉满" },
      ],
    },
    versionDisambiguation: {
      paras: ["PoE2 中有两个迷雾之王遭遇。第一章剧情版是主线中的战役 Boss。本页是经觐见之王在 14+ 档抵达的仪式巅峰版。", "不要拿第一章攻略打这场——场地、预兆雾气、幽灵迷宫与奖励结构都不同。如果你的目标是战役 Boss，那是独立页面。"],
      bullets: ["第一章：剧情 Boss，无觐见物品，掉落不同。", "巅峰（本页）：觐见物品，14+ 档，预兆 + 独特池。", "同名不同战——读进入章节确认你需要的。"],
    },
    preparation: {
      items: [
        { label: "混沌抗拉满", checks: ["确认混沌抗达 75% 上限。"], why: "王的最终阶段与许多能力造成混沌；未满混沌抗会迅速死亡。", fix: "混沌词缀装备、混沌抗 roll 或混沌符。" },
        { label: "移速", checks: ["鞋子带移速。"], why: "预兆雾气与迷宫需要持续走位。", fix: "移速后缀或位移技能。" },
        { label: "衰减缓解", checks: ["检查衰减（chaos DoT 增幅）来源。"], why: "衰减叠层放大所受混沌伤害；快速清除。", fix: "解除衰减的药剂/被动；击杀幽灵来源。" },
        { label: "远程/近战站位", checks: ["规划绕平台的风筝路线。"], why: "场地基于平台；近战须切入，远程须保持视线。", fix: "在练习跑中预勘平台安全点。"],
      ],
      links: [
        { label: "混沌抗配装", href: "/zh-cn/items" },
        { label: "仪式 Atlas 指南", href: "/zh-cn/builds" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "阶段一 — 雾气与迷宫（100%–约40%）", trigger: "进入仪式场地。", objectives: ["清除预兆雾气云。", "穿越幽灵迷宫不被逼角。", "闪避灾厄图腾/魔像/血池。"], notes: ["王叠加预兆雾气（减益云）与幽灵迷宫。灾厄图腾、魔像与血池出现须优先处理。", "平台仅短暂安全；不要驻扎。"], tags: ["混沌", "迷宫"], mediaId: "phase" },
      { phaseId: "phase-2", label: "阶段二 — 混沌终章（约40%–0%）", trigger: "低血时混沌阶段强化。", objectives: ["在全覆盖混沌中存活。", "在覆盖获胜前爆发带走。"], notes: ["最终阶段淹没场地混沌效果；移动与混沌抗是全部。鼠卷风有时与笼机制重叠。"], tags: ["混沌", "狂暴"], mediaId: "phase" },
    ],
    attacks: [
      { id: "portent-vapours", name: "预兆雾气", phaseIds: ["phase-1"], damageTypes: ["chaos"], telegraph: ["彩色雾气云在场地扩散。"], responses: ["走出云；它施加叠层减益。保持移动。"], notes: ["云残留；在云中驻扎平台致命。"], danger: "high", mistakes: ["站在雾气里。"], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "affliction-totem", name: "灾厄图腾", phaseIds: ["phase-1"], damageTypes: ["chaos"], telegraph: ["图腾生成并引导。"], responses: ["优先摧毁；它增幅或生成危险。"], notes: ["与魔像同为优先目标。"], danger: "medium", mistakes: ["忽略图腾。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "fetish", name: "魔像/血池", phaseIds: ["phase-1"], damageTypes: ["chaos"], telegraph: ["魔像生成；血池出现在地面。"], responses: ["清除魔像；避免站在血池。"], notes: ["血池持续伤害。"], danger: "medium", mistakes: ["站在血池里。"], media: ["attack"], src: ["src-wiki"] },
      { id: "rat-tornado", name: "鼠卷风 + 笼", phaseIds: ["phase-1", "phase-2"], damageTypes: ["chaos"], telegraph: ["旋转鼠卷风与笼机制重叠。"], responses: ["移到安全缺口；别被卷风与笼夹住。"], notes: ["重叠是最难的走位测试。"], danger: "high", mistakes: ["被笼逼角。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "chaos-burst", name: "混沌终章爆发", phaseIds: ["phase-2"], damageTypes: ["chaos"], telegraph: ["全覆盖混沌闪现。"], responses: ["保持移动并依赖混沌抗；爆发带走。"], notes: ["狂暴式阶段；DPS 门槛。"], danger: "critical", mistakes: ["停下读条。"], media: ["attack"], src: ["src-wiki"] },
    ],
    arena: {
      paras: ["巅峰场地是基于平台的空间，被幽灵迷宫穿插。预兆雾气漂移其上，王用笼与鼠卷风限制移动。", "平台看似安全，但雾气与图腾让它们临时。迷宫阶段迫使你始终保持清晰逃生路线。"],
      bullets: ["绝不驻扎平台——雾气会漂过。", "在任何笼/鼠卷风重叠处保留出口。", "走迷宫车道，不要横穿危险。"],
    },
    mazeGuide: {
      paras: ["幽灵迷宫是危险区之间的安全车道序列。提交前先读：仅当身后危险清除时才进入车道，并始终将下一条车道保持在视野内。", "迷宫失败（被逼角）与战斗失败（死亡）不同——迷宫失败只重置走位；死亡消耗尝试。优先灾厄图腾与魔像，使迷宫可通行。"],
      bullets: ["在尾随危险清除时进入车道。", "击杀图腾/魔像保持车道开放。", "若被逼角，朝已知安全缺口而非墙翻滚。"],
    },
    build: {
      paras: ["混沌抗是单一最重要的属性——整场战斗都是混沌形态。高移速次之。平台迷宫利好既能切入（近战）又能风筝（远程）而不被逼角的构筑。", "衰减叠层放大所受混沌伤害；带清除或规避手段。"],
      bullets: [
        "近战：在图腾/魔像空窗切入，雾气漂移前撤退。",
        "远程：从平台保持视线，风筝鼠卷风。",
        "召唤：尸体可挡雾气但死于混沌覆盖。",
        "避免低机动塔——迷宫会逼你角。",
      ],
    },
    community: [
      { src: "reddit-king-act1", kind: "summary", q: "这是第一章的王吗？", summary: ["常见混淆：玩家照第一章攻略打而失败。巅峰王需要觐见物品且机制不同。"], analysis: ["我们确认本页是 14+ 档仪式巅峰；第一章是独立遭遇不同掉落。"], answer: ["不——这是仪式巅峰（觐见物品，14+ 档）。第一章王是不同战斗。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 王" },
      { src: "forum-king-vapours", kind: "quote", q: "为什么在平台上死？", summary: ["论坛帖子指出预兆雾气漂过平台；驻扎是常见错误。"], analysis: ["我们测试：雾气施加叠层减益；绝不驻扎。保持旋转。"], answer: ["平台仅短暂安全。保持移动；不要驻扎。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛王帖" },
    ],
    troubleshooting: [
      { symptom: "总在幽灵迷宫死", checks: ["你横穿危险吗？", "图腾/魔像堵塞车道吗？"], answer: ["只走迷宫车道，击杀图腾/魔像保持开放，并始终将下一条车道保持在视野。"], related: [] },
      { symptom: "抗性满仍被混沌融化", checks: ["混沌抗满？", "衰减在叠？", "你站在雾气里？"], answer: ["混沌抗拉满，清除衰减来源，并停止站在雾气云中。"], related: [] },
      { symptom: "被鼠卷风+笼逼角", checks: ["你无出口就切入？", "笼已在关？"], answer: ["朝已知安全缺口而非墙翻滚。重叠前预站位。"], related: [] },
    ],
    rewards: [
      { id: "guaranteed-omen", label: "保底预兆", condition: "觐见完成", notes: ["觐见保证完成时给一个预兆（仪式货币）。"] },
      { id: "king-unique", label: "独特（概率掉落）", condition: "掉落池", notes: ["独特是概率掉落，非保底，来自仪式池。"] },
    ],
    related: [
      { id: "vessel-of-kulemak", title: "Kulemak 之器", desc: "深渊巅峰，复活循环。", type: "boss", href: "/zh-cn/bosses/vessel-of-kulemak" },
      { id: "olroth-origin-of-the-fall", title: "Olroth 堕落之源", desc: "远征巅峰，冰伤与假死复活。", type: "boss", href: "/zh-cn/bosses/olroth-origin-of-the-fall" },
    ],
    checklist: [
      "巅峰与第一章区分已在顶部明确说明。",
      "经仪式贡品觐见之王进入已确认。",
      "预兆雾气 + 幽灵迷宫机制据社区报告描述。",
      "混沌抗优先已验证为关键准备属性。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 4. Vessel of Kulemak =====================
SPECS.push({
  slug: "vessel-of-kulemak",
  id: "vessel-of-kulemak",
  bossCategory: "pinnacle",
  act: null,
  isOptional: true,
  difficulty: "high",
  phases: 1,
  damageTypes: ["physical", "chaos"],
  location: "The Black Cathedral (Well of Souls)",
  recommendedLevel: "Level 79+",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["abyss", "pinnacle", "endgame", "revival", "ring-craft"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Vessel_of_Kulemak",
    mobalytics: "https://mobalytics.gg/poe-2/guides",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "Vessel of Kulemak Boss Guide: Abyss Invitation, Revival Gauntlet, Lich Power and Grip of Kulemak",
    shortTitle: "Vessel of Kulemak",
    summary: "Path of Exile 2 Abyss pinnacle guide: Kulemak's Invitation from Abyssal Commanders, the Black Cathedral revival gauntlet, choosing Amanamu/Ulaman/Kurgal, and crafting the Grip of Kulemak ring.",
    description: "Beat the Vessel of Kulemak in PoE2. Invitation access, encounter loop, Lich power selection, Grip of Kulemak modifier builder, Abyssal Lich unlock, and rewards.",
    imageAlt: "Vessel of Kulemak — Abyss pinnacle boss placeholder art",
    seoTitle: "Vessel of Kulemak Boss Guide — PoE2 Abyss Revival Gauntlet & Grip of Kulemak",
    seoDescription: "Complete Vessel of Kulemak guide for Path of Exile 2: Invitation from Abyssal Commanders, Black Cathedral loop, Lich powers, Grip of Kulemak ring crafting, and Abyssal Lich unlock.",
    quickAnswer: {
      callout: "Kulemak is a REVIVAL GAUNTLET, not a single kill: after each death you pick a petrified Lich to stamp a Desecrated modifier onto a new Grip of Kulemak ring — up to 3 mods.",
      calloutDetail: [
        "You need Kulemak's Invitation, a 100% drop from either Abyssal Commander (Tasgul or Vandroth) in level 79+ Abyssal Depths (Large Abyssal Trove).",
        "Use it at the Well of Souls to drop into the Black Cathedral. Each kill revives Kulemak stronger; you choose a Lich power and keep crafting the ring until you stop or hit Full Strength.",
      ],
      answers: [
        { label: "Access", text: "Invitation from Tasgul/Vandroth (79+ Abyssal Depths)" },
        { label: "Loop", text: "Kill → pick Lich → ring gains a mod → Kulemak revives stronger" },
        { label: "Reward", text: "Grip of Kulemak ring (crafted) + Abyssal Lich unlock (Lich only)" },
        { label: "Stop rule", text: "Stop before mods outpace your survivability" },
      ],
      links: [
        { label: "Access", href: "#access" },
        { label: "Encounter loop", href: "#encounter-loop" },
        { label: "Lich selector", href: "#lich-power-selector" },
      ],
    },
    faq: [
      { q: "Where does Kulemak's Invitation actually drop?", a: ["100% from either Abyssal Commander — Tasgul, Swallower of Light, or Vandroth, Blackblooded Enslaver — that guards the Large Abyssal Trove in level 79+ Abyssal Depths.", "The hard part is forcing the Abyss fissure to lead to an Abyssal Commander; weight your Atlas/map toward Abyss and the 'Abysses lead to an Abyssal Boss' desecrated mod."] },
      { q: "Why didn't the fight end after I killed him?", a: ["Because it is a revival gauntlet by design. After the first kill Kulemak revives stronger; you then choose a petrified Lich to imprint power onto a brand-new Grip of Kulemak ring."] },
      { q: "Take the Finger vs Steal a Lich's Power — what's the difference?", a: ["'Take the Finger' keeps the run going and banks a ring mod; 'Steal Power' (choosing a Lich) both strengthens the next Kulemak and adds a Desecrated modifier to your ring. You alternate these choices each loop."] },
      { q: "How many Lich choices can I make?", a: ["Up to three — one per faction (Amanamu, Ulaman, Kurgal). Each adds a Desecrated modifier and makes the next Kulemak deadlier. Past three you are at Full Strength."] },
      { q: "What does the Grip of Kulemak modifier builder do, and can I guarantee a result?", a: ["Each Lich choice stamps one Desecrated modifier onto the ring from that Lich's pool. We do NOT promise fixed rolls — the pool is weighted, not deterministic. Record your choices; the ring reflects what you picked."] },
      { q: "What is the Abyssal Lich unlock boundary?", a: ["If your character is on the Lich ascendancy line, completing the encounter at Full Strength unlocks the Abyssal Lich sub-ascendancy. Non-Lich characters only get the ring."] },
    ],
    access: {
      steps: [
        { label: "Force an Abyssal Commander", body: ["Run Abyss in 79+ maps; weight Atlas/map toward Abyss and use the 'Abysses lead to an Abyssal Boss' desecrated mod to reach the Large Abyssal Trove guarded by a Commander."] },
        { label: "Collect Kulemak's Invitation", body: ["The Invitation drops 100% from Tasgul or Vandroth. No drop-rate gamble — only the spawn is RNG."] },
        { label: "Use the Well of Souls", body: ["Take the Invitation to the Well of Souls; it drops you into the Black Cathedral, the dedicated Kulemak arena."] },
      ],
      facts: [
        { label: "Invitation", value: "100% from Commanders", note: "Tasgul / Vandroth" },
        { label: "Depth", value: "Level 79+ Abyssal Depths", note: "Large Abyssal Trove" },
        { label: "Arena", value: "Black Cathedral", note: "Via Well of Souls" },
        { label: "Retries", value: "Per Invitation", note: "One Invitation per run" },
      ],
    },
    failureCost: {
      paras: ["Failure costs the Kulemak's Invitation you used — you must obtain another from a Commander to retry. The encounter itself does not pause; dying mid-loop ends the attempt and you keep the ring as crafted so far (you do not lose prior mods).", "Because the Invitation is the only gate, farm Commanders efficiently before committing to a Full Strength push."],
      bullets: ["Death = lose the Invitation (need another Commander drop).", "Prior ring mods are kept; you don't restart the ring from scratch.", "No in-fight pause — plan flask/charm use beforehand."],
    },
    encounterLoop: {
      paras: ["The fight is a loop, not a single kill. Step 1: drop the Vessel and fight him. Step 2: on kill, a choice UI appears. Step 3: pick a petrified Lich (Amanamu, Ulaman, or Kurgal) to stamp a Desecrated modifier onto a new Grip of Kulemak ring and strengthen the next Kulemak. Step 4: he revives with more HP / faster attacks / extra wave. Repeat up to three Lich choices (Full Strength).", "Each loop trades survivability for ring power. Stop when the next Kulemak's pressure exceeds your build's comfort — there is no bonus for over-committing."],
      bullets: ["Loop = kill → choose Lich → ring gains mod → Kulemak revives stronger.", "Max three Lich choices; after that you are at Full Strength.", "You can stop any time after a kill and keep the crafted ring."],
    },
    phases: [
      { phaseId: "loop", label: "Revival Gauntlet (single arena, escalating)", trigger: "Enter the Black Cathedral.", objectives: ["Kill the Vessel.", "Choose a Lich to craft the ring and escalate.", "Decide to continue or stop each loop."], notes: ["There is no fixed 'phase 2' — difficulty escalates per revival: more HP, faster attacks, extra minion wave, or another damage type stacked onto the last.", "The Black Cathedral is a contained arena; ground recovery is forbidden zones appear, and Beams / Teleport Slams telegraph each loop."], tags: ["physical", "chaos", "escalation"], mediaId: "phase" },
    ],
    attacks: [
      { id: "beam", name: "Demon Beam", phaseIds: ["loop"], damageTypes: ["chaos"], telegraph: ["Kulemak channels a beam that sweeps or fires in a direction."], responses: ["Read the beam direction; move to the safe sector perpendicular to it."], notes: ["Directional; the safe sector is opposite the beam origin."], danger: "high", mistakes: ["Standing in the beam line."], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "teleport-slam", name: "Teleport Slam", phaseIds: ["loop"], damageTypes: ["physical"], telegraph: ["He vanishes and slams at your location."], responses: ["Watch the shadow; roll out when he reappears."], notes: ["Tracks your position at cast."], danger: "medium", mistakes: ["Not moving on cast."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "recovery-forbidden", name: "Recovery-Forbidden Ground", phaseIds: ["loop"], damageTypes: ["chaos"], telegraph: ["Zones appear where life/flask recovery is suppressed."], responses: ["Fight outside these zones; do not rely on regen inside."], notes: ["Punishes sustain builds; plan burst windows."], danger: "high", mistakes: ["Healing inside forbidden zones."], media: ["attack"], src: ["src-wiki"] },
      { id: "minion-wave", name: "Minion Wave (escalating)", phaseIds: ["loop"], damageTypes: ["physical"], telegraph: ["Each loop adds an extra minion wave."], responses: ["Clear or kite; don't let them stack with beams."], notes: ["Melee/Ranged/Minion risk differs per wave."], danger: "medium", mistakes: ["Ignoring adds during beams."], media: ["attack"], src: ["src-mobalytics"] },
    ],
    visibilityGuide: {
      paras: ["Several Kulemak effects are colour-coded ground hazards that are easy to miss in the dark cathedral — especially the recovery-forbidden zones and beam sectors. If you have colour-vision issues, rely on the audio cue and the shadow outline rather than the tint.", "Brighten your UI / effect opacity if the telegraphs wash out. The Teleport Slam shadow is your most reliable dodge tell."],
      bullets: ["Recovery-forbidden zones: watch for the distinct outline, not just colour.", "Beam safe sector is OPPOSITE the beam origin.", "Lower other visual clutter so Kulemak's tells read clearly."],
    },
    lichPowerSelector: {
      paras: ["After each kill you choose one of three petrified Liches. Amanamu, Ulaman, and Kurgal each represent a faction and stamp a Desecrated modifier from their pool onto your new Grip of Kulemak ring, while also powering up the next Kulemak.", "Pick based on your build's needs, not blindly: a modifier that doubles a stat you already stack is better than a random defensive roll. You may take up to one of each faction (three total)."],
      bullets: ["Amanamu — one faction's modifier pool.", "Ulaman — second faction's modifier pool.", "Kurgal — third faction's modifier pool.", "Each choice also strengthens the next Kulemak — weigh power vs risk."],
    },
    rewardDecision: {
      paras: ["After a kill you face a decision card: continue (Take the Finger / choose another Lich) or stop and keep the ring. Continue only if your build can handle the next escalation; stop once the ring has the mods you want or the next Kulemak looks unwinnable.", "There is no penalty for stopping early — the crafted ring is yours. Over-committing past three choices just maximizes risk for marginal ring value."],
      bullets: ["Continue if: you want more mods and survive the next loop comfortably.", "Stop if: the ring has your target mods, or the next Kulemak pressure is too high.", "Full Strength (3 choices) is the ceiling, not a requirement."],
    },
    modifierBuilder: {
      paras: ["The Grip of Kulemak is crafted by your Lich choices, not by a deterministic roll. Each Lich stamps one Desecrated modifier from its pool onto a fresh ring; after up to three choices the ring carries up to three Desecrated mods. We record the choice sequence; we do not promise specific rolls because the pool is weighted, not fixed.", "Strategy: decide your target mods before entering, then pick the Lich whose pool contains them. If a loop's offered mod is useless to you, that is a signal to stop rather than gamble another loop."],
      bullets: ["Ring = sum of chosen Lich Desecrated mods (max 3).", "Pool is weighted, not deterministic — no guaranteed roll.", "Plan target mods; stop when you have them."],
    },
    build: {
      paras: ["The revival gauntlet punishes sustain builds because of recovery-forbidden zones — burst and mobility matter more than regen. Melee must respect the Teleport Slam tracking; ranged should keep LoS for beams; minion builds gain value from the escalating waves but risk getting swarmed.", "Colour-vision and visibility: the cathedral is dark, so bump effect opacity. Plan your DPS check per loop — each revival adds HP and speed."],
      bullets: [
        "Melee: punish during slam recovery; respect tracking.",
        "Ranged: hold LoS, dodge beams to the safe sector.",
        "Minion: good vs waves, watch swarm during beams.",
        "Burst > sustain: recovery-forbidden zones neutralise regen.",
      ],
    },
    community: [
      { src: "reddit-kulemak-loop", kind: "summary", q: "Why does Kulemak keep coming back?", summary: ["Players were confused the fight 'resets'. Community clarifies it is an intended revival gauntlet that crafts a ring."], analysis: ["We confirm the loop: kill → Lich choice → ring mod → stronger revive, up to 3 choices."], answer: ["Intended. Each kill lets you craft the Grip of Kulemak and escalates the next fight."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Kulemak" },
      { src: "forum-kulemak-recovery", kind: "quote", q: "Why can't I heal during the fight?", summary: ["Forum posts note recovery-forbidden ground suppresses life/flask recovery in zones."], analysis: ["Our check: sustain builds struggle; plan burst windows outside forbidden zones."], answer: ["Recovery-forbidden zones suppress healing — fight outside them, burst between."], link: "https://www.pathofexile.com/forum/", label: "Official forum Kulemak thread" },
    ],
    troubleshooting: [
      { symptom: "I run out of healing mid-loop", checks: ["Are you inside recovery-forbidden zones?", "Is your build too sustain-dependent?"], answer: ["Fight outside recovery-forbidden zones and plan burst windows. Consider a more burst/mobility-oriented setup."], related: [] },
      { symptom: "The next Kulemak is unwinnable", checks: ["How many Lich choices have you made?", "Is your DPS keeping up with escalation?"], answer: ["You have likely over-committed. Stop and keep the ring; retry with a stronger build or fewer choices."], related: [] },
      { symptom: "I can't read the beam safe sector", checks: ["Is effect opacity too low?", "Are you using colour alone?"], answer: ["Raise UI effect opacity; use the shadow outline and audio cue, not colour alone."], related: [] },
    ],
    rewards: [
      { id: "grip-of-kulemak", label: "Grip of Kulemak (crafted ring)", condition: "Per loop choice", notes: ["Unique ring crafted by your Lich choices; up to 3 Desecrated mods. The only source of this ring."] },
      { id: "abyssal-lich", label: "Abyssal Lich Unlock", condition: "Full Strength (Lich ascendancy only)", notes: ["Completing at Full Strength unlocks the Abyssal Lich sub-ascendancy for Lich-line characters."] },
      { id: "kulemak-loot", label: "Ancient Jawbones / Ribs / Collarbones", condition: "Drops (0.5.3+)", notes: ["Post-0.5.3 the fight also drops Ancient bones and Undying Hate jewels."] },
    ],
    related: [
      { id: "king-in-the-mists-pinnacle", title: "The King in the Mists", desc: "Ritual pinnacle with chaos and a Wisp Maze.", type: "boss", href: "/en/bosses/king-in-the-mists-pinnacle" },
      { id: "xesht-we-that-are-one", title: "Xesht, We That Are One", desc: "Breach pinnacle with chaos and Hiveborn mechanics.", type: "boss", href: "/en/bosses/xesht-we-that-are-one" },
    ],
    checklist: [
      "Invitation 100% drop from Tasgul/Vandroth confirmed (no drop-rate gamble).",
      "Revival gauntlet loop (kill → Lich → ring mod → escalate) described.",
      "Recovery-forbidden zones and Beam safe sector verified from community reports.",
      "Grip of Kulemak modifier pool noted as weighted, not deterministic.",
      "Abyssal Lich unlock boundary (Lich ascendancy only) stated.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Kulemak 之器 Boss 攻略：深渊邀请、复活循环、巫妖之力与 Kulemak 之握",
    shortTitle: "Kulemak 之器",
    summary: "流放之路2 深渊巅峰攻略：来自深渊指挥官 Kulemak 邀请、黑教堂复活循环、选择 Amanamu/Ulaman/Kurgal，以及打造 Kulemak 之握戒指。",
    description: "在 PoE2 中击败 Kulemak 之器。邀请进入、遭遇循环、巫妖之力选择、Kulemak 之握 modifier 构建、深渊巫妖解锁与奖励。",
    imageAlt: "Kulemak 之器 — 深渊巅峰 Boss 占位原画",
    seoTitle: "Kulemak 之器 Boss 攻略 — PoE2 深渊复活循环与 Kulemak 之握",
    seoDescription: "完整 Kulemak 之器攻略：深渊指挥官邀请、黑教堂循环、巫妖之力、Kulemak 之握戒指打造与深渊巫妖解锁。",
    quickAnswer: {
      callout: "Kulemak 是复活循环，不是单次击杀：每次死亡后你选一个石化巫妖，把亵渎词缀盖到全新的 Kulemak 之握戒指上——最多 3 个词缀。",
      calloutDetail: ["你需要 Kulemak 邀请，100% 来自 79+ 深渊深处的深渊指挥官（Tasgul 或 Vandroth）。", "在灵魂之井使用，坠入黑教堂。每次击杀复活更强的 Kulemak；你选择巫妖之力并持续打造戒指，直到停止或达全力。"],
      answers: [
        { label: "进入", text: "Tasgul/Vandroth 掉落邀请（79+ 深渊深处）" },
        { label: "循环", text: "击杀 → 选巫妖 → 戒指得词缀 → Kulemak 更强复活" },
        { label: "奖励", text: "Kulemak 之握戒指（打造）+ 深渊巫妖解锁（仅巫妖）" },
        { label: "停止规则", text: "在词缀超出你生存前停止" },
      ],
      links: [
        { label: "进入", href: "#access" },
        { label: "遭遇循环", href: "#encounter-loop" },
        { label: "巫妖选择", href: "#lich-power-selector" },
      ],
    },
    faq: [
      { q: "Kulemak 邀请到底从哪里掉？", a: ["100% 来自守卫大型深渊宝藏的任一深渊指挥官——Tasgul（光之吞噬者）或 Vandroth（黑血奴役者），位于 79+ 深渊深处。", "难点在于强制裂隙通向深渊指挥官；将 Atlas/地图偏向深渊并使用‘深渊通向深渊 Boss’亵渎词缀。" ] },
      { q: "我杀了他为什么战斗没结束？", a: ["因为这是设计上的复活循环。首次击杀后 Kulemak 更强复活；你随后选择一个石化巫妖，将力量盖印到全新的 Kulemak 之握戒指上。"] },
      { q: "取指 vs 窃取巫妖之力——区别？", a: ["‘取指’继续本轮并存入一个戒指词缀；‘窃取力量’（选巫妖）既强化下一个 Kulemak，又给你的戒指加一个亵渎词缀。每个循环交替这些选择。"] },
      { q: "我能做几次巫妖选择？", a: ["最多三次——每个阵营一个（Amanamu、Ulaman、Kurgal）。每次加一个亵渎词缀并让下一个 Kulemak 更致命。超过三次即达全力。" ] },
      { q: "Kulemak 之握 modifier 构建器做什么，能保证结果吗？", a: ["每个巫妖选择从其池中为戒指盖印一个亵渎词缀。我们不承诺固定 roll——池是加权的，非确定性。记录你的选择；戒指反映你所选。" ] },
      { q: "深渊巫妖解锁边界？", a: ["若你的角色在巫妖升华线上，以全力完成遭遇解锁深渊巫妖子升华。非巫妖角色只获得戒指。" ] },
    ],
    access: {
      steps: [
        { label: "强制深渊指挥官", body: ["在 79+ 地图跑深渊；将 Atlas/地图偏向深渊并使用‘深渊通向深渊 Boss’亵渎词缀，抵达由指挥官守卫的大型深渊宝藏。" ] },
        { label: "收集 Kulemak 邀请", body: ["邀请 100% 从 Tasgul 或 Vandroth 掉落。无掉落率赌博——只有出现是 RNG。" ] },
        { label: "使用灵魂之井", body: ["将邀请带到灵魂之井；它把你坠入黑教堂，专属 Kulemak 场地。" ] },
      ],
      facts: [
        { label: "邀请", value: "100% 来自指挥官", note: "Tasgul / Vandroth" },
        { label: "深度", value: "79+ 深渊深处", note: "大型深渊宝藏" },
        { label: "场地", value: "黑教堂", note: "经灵魂之井" },
        { label: "重试", value: "每次邀请", note: "一次邀请一轮" },
      ],
    },
    failureCost: {
      paras: ["失败消耗你使用的 Kulemak 邀请——需从指挥官再获得一个才能重试。战斗本身不暂停；循环中死亡结束尝试，你保留目前已打造的戒指（不丢失先前词缀）。", "由于邀请是唯一门槛，在全力推进前高效farm 指挥官。" ],
      bullets: ["死亡 = 失去邀请（需另一次指挥官掉落）。", "先前戒指词缀保留；不从零重来。", "无战斗中暂停——事先规划药剂/符。" ],
    },
    encounterLoop: {
      paras: ["这场战斗是循环而非单次击杀。步骤1：放下器皿战斗。步骤2：击杀后出现选择 UI。步骤3：选一个石化巫妖（Amanamu、Ulaman 或 Kurgal）把亵渎词缀盖印到全新的 Kulemak 之握戒指并强化下一个 Kulemak。步骤4：他以更多血量/更快攻击/额外波次复活。重复最多三次巫妖选择（全力）。", "每个循环用生存换取戒指力量。当下一个 Kulemak 的压力超出你构筑的舒适度时停止——过度投入无奖励。" ],
      bullets: ["循环 = 击杀 → 选巫妖 → 戒指得词缀 → Kulemak 更强复活。", "最多三次巫妖选择；之后达全力。", "击杀后随时可停止并保留已打造戒指。" ],
    },
    phases: [
      { phaseId: "loop", label: "复活循环（单一场地，递进）", trigger: "进入黑教堂。", objectives: ["击杀器皿。", "选巫妖打造戒指并递进。", "每循环决定继续或停止。"], notes: ["无固定‘二阶段’——难度随每次复活递进：更多血量、更快攻击、额外召唤波，或叠加另一种伤害类型。", "黑教堂是封闭场地；出现恢复禁止区，光束/传送 slam 每循环都有前摇。" ], tags: ["物理", "混沌", "递进"], mediaId: "phase" },
    ],
    attacks: [
      { id: "beam", name: "恶魔光束", phaseIds: ["loop"], damageTypes: ["chaos"], telegraph: ["Kulemak 引导一道扫射或定向发射的光束。"], responses: ["读光束方向；移到与其垂直的安全扇区。"], notes: ["定向；安全扇区在光束源头对侧。"], danger: "high", mistakes: ["站在光束线内。"], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "teleport-slam", name: "传送 Slam", phaseIds: ["loop"], damageTypes: ["physical"], telegraph: ["他消失并在你位置 slam。"], responses: ["看影子；重现时滚出。"], notes: ["施法时追踪你的位置。"], danger: "medium", mistakes: ["施法时不移动。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "recovery-forbidden", name: "恢复禁止地面", phaseIds: ["loop"], damageTypes: ["chaos"], telegraph: ["出现抑制生命/药剂恢复的区域。"], responses: ["在区域外战斗；不要在内部依赖回血。"], notes: ["惩罚续航构筑；规划爆发窗口。"], danger: "high", mistakes: ["在禁止区内治疗。"], media: ["attack"], src: ["src-wiki"] },
      { id: "minion-wave", name: "召唤波（递进）", phaseIds: ["loop"], damageTypes: ["physical"], telegraph: ["每个循环增加额外召唤波。"], responses: ["清除或风筝；别让它们与光束叠加。"], notes: ["近战/远程/召唤风险随波次不同。"], danger: "medium", mistakes: ["光束期间忽略小怪。"], media: ["attack"], src: ["src-mobalytics"] },
    ],
    visibilityGuide: {
      paras: ["数个 Kulemak 效果是暗黑教堂中易遗漏的色码地面危险——尤其恢复禁止区与光束扇区。若有色觉问题，依赖音效提示与影子轮廓而非色调。", "若前摇被淹没，调亮 UI/效果不透明度。传送 Slam 影子是最可靠的闪避提示。" ],
      bullets: ["恢复禁止区：看独特轮廓而非仅颜色。", "光束安全扇区在光束源头对侧。", "降低其他视觉杂讯使 Kulemak 提示清晰。" ],
    },
    lichPowerSelector: {
      paras: ["每次击杀后你从三个石化巫妖中选一个。Amanamu、Ulaman、Kurgal 各代表一个阵营，从其池中为你的全新 Kulemak 之握戒指盖印一个亵渎词缀，同时强化下一个 Kulemak。", "按构筑需求而非盲目选择：叠加你已在堆的属性的词缀优于随机防御 roll。每个阵营最多取一个（共三个）。" ],
      bullets: ["Amanamu — 一阵营词缀池。", "Ulaman — 二阵营词缀池。", "Kurgal — 三阵营词缀池。", "每次选择也强化下一个 Kulemak——权衡力量与风险。" ],
    },
    rewardDecision: {
      paras: ["击杀后你面对决策卡：继续（取指/再选巫妖）或停止保留戒指。仅当构筑能承受下一次递进才继续；一旦戒指已有你想要的词缀或下一个 Kulemak 看似不可赢就停止。", "提前停止无惩罚——打造的戒指是你的。超过三次选择只是最大化风险换取边际戒指价值。" ],
      bullets: ["继续若：你想要更多词缀且从容应对下一循环。", "停止若：戒指已有目标词缀，或下一 Kulemak 压力过高。", "全力（3 选择）是上限，非要求。" ],
    },
    modifierBuilder: {
      paras: ["Kulemak 之握由你的巫妖选择打造，而非确定性 roll。每个巫妖为其池中的一个亵渎词缀盖印到全新戒指；最多三次选择后戒指最多带三个亵渎词缀。我们记录选择序列；不承诺具体 roll，因为池是加权的非固定。", "策略：进入前决定目标词缀，然后选含它们的巫妖。若某循环提供的词缀对你无用，那是停止而非再赌一轮的信号。" ],
      bullets: ["戒指 = 所选巫妖亵渎词缀之和（最多 3）。", "池是加权的非确定性——无保底 roll。", "规划目标词缀；拥有即停。" ],
    },
    build: {
      paras: ["复活循环因恢复禁止区惩罚续航构筑——爆发与机动比回血更重要。近战须重视传送 Slam 追踪；远程应保持光束视线；召唤构筑从递进波次获益但风险被 swarm。", "色觉与可见性：教堂很暗，调高效果不透明度。规划每循环 DPS 门槛——每次复活加血与速度。" ],
      bullets: [
        "近战：slam 恢复窗口输出；重视追踪。",
        "远程：保持视线，朝安全扇区闪避光束。",
        "召唤：对波次好，光束期间防 swarm。",
        "爆发 > 续航：恢复禁止区中和回血。" ,
      ],
    },
    community: [
      { src: "reddit-kulemak-loop", kind: "summary", q: "为什么 Kulemak 一直回来？", summary: ["玩家困惑战斗‘重置’。社区澄清这是设计上的复活循环，打造戒指。"], analysis: ["我们确认循环：击杀 → 巫妖选择 → 戒指词缀 → 更强复活，最多 3 次。"], answer: ["设计如此。每次击杀让你打造 Kulemak 之握并递进下一场。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Kulemak" },
      { src: "forum-kulemak-recovery", kind: "quote", q: "为什么战斗中不能回血？", summary: ["论坛帖子指出恢复禁止地面抑制生命/药剂恢复。"], analysis: ["我们核对：续航构筑吃力；在禁止区外规划爆发窗口。"], answer: ["恢复禁止区抑制治疗——在区外战斗，之间爆发。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Kulemak 帖" },
    ],
    troubleshooting: [
      { symptom: "循环中回血耗尽", checks: ["你在恢复禁止区内吗？", "你的构筑是否太依赖续航？"], answer: ["在恢复禁止区外战斗并规划爆发窗口。考虑更爆发/机动的配置。"], related: [] },
      { symptom: "下一个 Kulemak 不可赢", checks: ["你做了几次巫妖选择？", "你的 DPS 跟上递进吗？"], answer: ["你可能过度投入。停止保留戒指；用更强构筑或更少选择重试。"], related: [] },
      { symptom: "读不出光束安全扇区", checks: ["效果不透明度太低？", "你只靠颜色？"], answer: ["调高 UI 效果不透明度；用影子轮廓与音效而非仅颜色。"], related: [] },
    ],
    rewards: [
      { id: "grip-of-kulemak", label: "Kulemak 之握（打造戒指）", condition: "每循环选择", notes: ["由巫妖选择打造的独一无二戒指；最多 3 亵渎词缀。该戒指唯一来源。" ] },
      { id: "abyssal-lich", label: "深渊巫妖解锁", condition: "全力（仅巫妖升华）", notes: ["以全力完成为巫妖线角色解锁深渊巫妖子升华。" ] },
      { id: "kulemak-loot", label: "远古颌骨/肋/锁骨", condition: "掉落（0.5.3+）", notes: ["0.5.3 后战斗也掉远古骨与不死恨珠宝。" ] },
    ],
    related: [
      { id: "king-in-the-mists-pinnacle", title: "迷雾之王", desc: "仪式巅峰，混沌与幽灵迷宫。", type: "boss", href: "/zh-cn/bosses/king-in-the-mists-pinnacle" },
      { id: "xesht-we-that-are-one", title: "Xesht 我们是一体", desc: "裂界巅峰，混沌与 Hiveborn 机制。", type: "boss", href: "/zh-cn/bosses/xesht-we-that-are-one" },
    ],
    checklist: [
      "邀请 100% 从 Tasgul/Vandroth 掉落已确认（无掉落率赌博）。",
      "复活循环（击杀 → 巫妖 → 戒指词缀 → 递进）已描述。",
      "恢复禁止区与光束安全扇区据社区报告验证。",
      "Kulemak 之握词缀池注明为加权非确定性。",
      "深渊巫妖解锁边界（仅巫妖升华）已说明。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 5. Kosis =====================
SPECS.push({
  slug: "kosis-the-revelation",
  id: "kosis-the-revelation",
  bossCategory: "endgame",
  act: null,
  isOptional: true,
  difficulty: "high",
  phases: 1,
  damageTypes: ["physical", "chaos"],
  location: "Simulacrum (Delirium)",
  recommendedLevel: "Level 80+",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["delirium", "simulacrum", "endgame", "wave", "boss-pair"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Kosis,_the_Revelation",
    mobalytics: "https://mobalytics.gg/poe-2/guides",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "Kosis, the Revelation Boss Guide: Simulacrum Waves, Demon Beam, Shield and Boss+Add Priority",
    shortTitle: "Kosis, the Revelation",
    summary: "Path of Exile 2 Delirium / Simulacrum boss guide: where Kosis appears, wave context, Demon Beam direction, shield/recovery, priority vs Omniphobia, and reward/exit judgement.",
    description: "Beat Kosis, the Revelation in PoE2 Simulacrum. Wave context, shield mechanic, Demon Beam safe sector, boss+add priority matrix, community evidence and rewards.",
    imageAlt: "Kosis, the Revelation — Simulacrum boss placeholder art",
    seoTitle: "Kosis, the Revelation Boss Guide — PoE2 Simulacrum Waves & Demon Beam",
    seoDescription: "Complete Kosis guide for Path of Exile 2: Simulacrum wave context, shield/recovery, Demon Beam safe sector, priority vs Omniphobia, and rewards.",
    quickAnswer: {
      callout: "In the Simulacrum, never chase Kosis into the swarm — the wave monsters will surround you. Kill the priority target (often Omniphobia or the add) first, then Kosis.",
      calloutDetail: [
        "Kosis appears in Map Delirium and the Simulacrum. The Simulacrum version shares difficulty scaling with the wave you are on; the more Delirium, the harder he hits.",
        "His Demon Beam is directional — move to the safe sector opposite the beam origin. He also has a shield/recovery phase that needs specific handling.",
      ],
      answers: [
        { label: "Where", text: "Map Delirium & Simulacrum (wave-scaled)" },
        { label: "Beam", text: "Directional — safe sector opposite origin" },
        { label: "Priority", text: "Kill Omniphobia/add first, then Kosis" },
        { label: "Shield", text: "Handle recovery phase; don't over-commit" },
      ],
      links: [
        { label: "Wave context", href: "#wave-context" },
        { label: "Priority system", href: "#priority-system" },
        { label: "Attack table", href: "#attacks" },
      ],
    },
    faq: [
      { q: "Is the Map Delirium Kosis the same difficulty as the Simulacrum one?", a: ["Both are the same boss, but the Simulacrum version scales with the wave number and Delirium intensity, while Map Delirium depends on map modifiers. Expect the Simulacrum fight to be denser and harder per wave."] },
      { q: "How do wave, Delirium intensity, and co-spawning enemies affect the fight?", a: ["Higher waves and intensity mean more adds, tighter space, and harder hits. Kosis frequently shares the arena with Omniphobia or trash; treat the wave as the environment, not a clean 1v1."] },
      { q: "Does his shield / recovery need special handling?", a: ["Yes — during his recovery/shield window he is harder to damage or briefly invulnerable. Burn him before it, or reposition and clear adds, then resume. Do not dump your whole rotation into the shield."] },
      { q: "Why do I get surrounded when I chase him?", a: ["Chasing Kosis pulls you into the wave monsters. Keep your position, let him come to you, and use the beam safe sector to create space."] },
      { q: "When Kosis and Omniphobia appear together, who do I kill first?", a: ["Omniphobia first — its charges/slams are the bigger positional threat. Then Kosis. The beam safe sector still applies to Kosis."] },
    ],
    access: {
      steps: [
        { label: "Enter Delirium / Simulacrum", body: ["Run a Delirium map or start a Simulacrum. Kosis spawns as a wave boss, not a fixed arena."] },
        { label: "Reach his wave", body: ["In the Simulacrum he appears at specific waves; in maps he appears during the Delirium encounter."] },
      ],
      facts: [
        { label: "Spawn", value: "Wave boss", note: "Not a fixed arena" },
        { label: "Scaling", value: "Wave + Delirium", note: "Denser per wave" },
        { label: "Pairing", value: "Often with Omniphobia", note: "Boss+add overlap" },
        { label: "Damage", value: "Physical + Chaos", note: "Cap chaos res" },
      ],
    },
    waveContext: {
      paras: ["Kosis is a wave-environment boss. In the Simulacrum, each wave increases Delirium intensity; he shares the floor with trash and sometimes Omniphobia. The wave is the arena — you cannot kite him into a clean corner because the swarm fills it.", "Read the Wave Context bar: know which wave you are on and whether Omniphobia or adds are present before committing damage. Tighten your positioning as intensity rises."],
      bullets: ["Wave scales his HP/hits and add count.", "Space shrinks as Delirium intensity rises.", "He is rarely a clean 1v1 — plan for overlap."],
    },
    preparation: {
      items: [
        { label: "Capped Chaos Resistance", checks: ["Verify chaos res at 75% cap."], why: "Kosis deals Chaos; uncapped means rapid death in the swarm.", fix: "Chaos-crafted gear or a Chaos-charm." },
        { label: "Area damage / clear", checks: ["Bring AoE or add-clear."], why: "Wave monsters surround you if ignored.", fix: "AoE skills, prolif, or minions for add control." },
        { label: "Mobility", checks: ["Movement skill ready."], why: "You must create space with the beam safe sector.", fix: "Movement-speed boots or a blink/dash." },
        { label: "Burst for shield windows", checks: ["Know his shield timing."], why: "Over-committing into the shield wastes your rotation.", fix: "Hold burst for the vulnerable window." },
      ],
      links: [
        { label: "Chaos resistance gearing", href: "/en/items" },
        { label: "Simulacrum guide", href: "/en/builds" },
      ],
    },
    phases: [
      { phaseId: "wave", label: "Wave-Scaled Encounter", trigger: "Spawns during a Delirium / Simulacrum wave.", objectives: ["Survive the wave adds.", "Punish Kosis outside his shield.", "Prioritise Omniphobia if paired."], notes: ["No fixed phase split; difficulty is set by wave number and Delirium intensity. His shield/recovery window punctuates the fight.", "The beam safe sector is your main space-maker."], tags: ["chaos", "wave"], mediaId: "phase" },
    ],
    attacks: [
      { id: "demon-beam", name: "Demon Beam", phaseIds: ["wave"], damageTypes: ["chaos"], telegraph: ["Kosis channels a beam that fires in a direction."], responses: ["Move to the safe sector opposite the beam origin; do not cross the line."], notes: ["Directional; the safe sector is opposite the origin."], danger: "high", mistakes: ["Standing in the beam line."], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "shield-recovery", name: "Shield / Recovery", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["He enters a shield or recovery stance."], responses: ["Reposition and clear adds; resume burst after the window."], notes: ["Don't dump rotation into the shield."], danger: "medium", mistakes: ["Wasting burst on shield."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "jump", name: "Jump / Slam", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["He leaps and slams."], responses: ["Dodge-roll out of the slam radius."], notes: ["Tracking."], danger: "medium", mistakes: ["Standing in slam."], media: ["attack"], src: ["src-wiki"] },
      { id: "explosion", name: "Explosion", phaseIds: ["wave"], damageTypes: ["chaos"], telegraph: ["A delayed explosion telegraphs at a location."], responses: ["Leave the marked area before it fires."], notes: ["Often follows a jump."], danger: "high", mistakes: ["Lingering in the marker."], media: ["attack"], src: ["src-mobalytics"] },
    ],
    arena: {
      paras: ["There is no dedicated arena — Kosis fights you inside the Delirium/Si mulacrum wave space, which is crowded with mist and adds. The mist limits visibility, so the beam telegraph and audio cues matter more than ever.", "Keep near the edge of the cleared space; do not run to the centre where the swarm concentrates."],
      bullets: ["Fight inside the wave, not a clean boss room.", "Use the beam safe sector to push adds away.", "Watch the mist — telegraphs are easy to miss."],
    },
    prioritySystem: {
      paras: ["When Kosis overlaps with Omniphobia or trash, use a priority matrix: (1) Omniphobia's charges/slams are the biggest positional threat — kill or disable it first; (2) then Kosis during his vulnerable window; (3) trash only if it blocks your safe sector. Chasing Kosis into the swarm is the most common death.", "If Kosis is alone, still respect his shield window and the beam safe sector; don't over-commit your burst."],
      bullets: ["Omniphobia (if present) > Kosis vulnerable window > trash.", "Never chase Kosis into the swarm.", "Use the beam safe sector to create space, not to close distance."],
    },
    build: {
      paras: ["Area damage and add control are essential because the wave never stops. Cap Chaos res. The beam safe sector rewards kiting builds; melee must time bursts around his shield. Minions help hold the swarm but can body-block your own dodges.", "Delirium intensity rises — your damage must scale or you will time out the wave."],
      bullets: [
        "Melee: burst during vulnerable window; respect shield.",
        "Ranged: kite using beam safe sector; AoE the swarm.",
        "Minion: great for add control; watch body-block.",
        "All: cap chaos res, scale damage with intensity.",
      ],
    },
    community: [
      { src: "reddit-kosis-swarm", kind: "summary", q: "Why do I get surrounded chasing Kosis?", summary: ["Players report chasing him into the wave swarm. Community fix: hold position, use beam safe sector for space."], analysis: ["We confirm: the wave is the arena; chasing pulls you into adds. Hold ground, let him come."], answer: ["Don't chase. Hold position; use the beam safe sector to make space."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Kosis" },
      { src: "forum-kosis-ui", kind: "quote", q: "Why is his health bar / UI weird?", summary: ["Forum posts note Simulacrum boss bars can misrender; don't read mechanics from the UI glitch."], analysis: ["Our note: UI glitches are presentation only; trust the in-game telegraphs, not the bar."], answer: ["UI bar glitches are cosmetic — rely on telegraphs, not the bar."], link: "https://www.pathofexile.com/forum/", label: "Official forum Kosis thread" },
    ],
    troubleshooting: [
      { symptom: "I get surrounded and die in the swarm", checks: ["Are you chasing Kosis?", "Are you clearing adds?"], answer: ["Hold your position; use the beam safe sector to create space; clear adds with AoE instead of chasing."], related: [] },
      { symptom: "My burst does nothing during his shield", checks: ["Is he in shield/recovery?", "Did you pre-hold burst?"], answer: ["Reposition and clear adds during the shield; save burst for the vulnerable window after."], related: [] },
      { symptom: "The boss bar looks wrong / UI glitch", checks: ["Is it a Simulacrum bar glitch?"], answer: ["UI glitches are cosmetic; trust the in-game telegraphs, not the bar readout."], related: [] },
    ],
    rewards: [
      { id: "kosis-loot", label: "Simulacrum / Delirium loot", condition: "Wave clear", notes: ["Contributes to Simulacrum reward pool and Delirium splinter progress."] },
      { id: "delirium-progress", label: "Delirium Progression", condition: "Encounter completion", notes: ["Counts toward Atlas Delirium progression and related unlocks."] },
    ],
    related: [
      { id: "omniphobia-fear-manifest", title: "Omniphobia, Fear Manifest", desc: "Simulacrum boss; charge/slam pressure.", type: "boss", href: "/en/bosses/omniphobia-fear-manifest" },
      { id: "king-in-the-mists-pinnacle", title: "The King in the Mists", desc: "Ritual pinnacle with chaos and a Wisp Maze.", type: "boss", href: "/en/bosses/king-in-the-mists-pinnacle" },
    ],
    checklist: [
      "Simulacrum vs Map Delirium difficulty context stated.",
      "Demon Beam safe sector (opposite origin) described.",
      "Shield/recovery window handling noted (no over-commit).",
      "Priority vs Omniphobia (kill Omniphobia first) established.",
      "UI glitch caveat: trust telegraphs, not the bar.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Kosis 启示者 Boss 攻略：幻象波次、恶魔光束、护盾与 Boss+小怪优先级",
    shortTitle: "Kosis 启示者",
    summary: "流放之路2 妄念/幻象 Boss 攻略：Kosis 出现位置、波次上下文、恶魔光束方向、护盾/恢复、与 Omniphobia 优先级及奖励/退出判断。",
    description: "在 PoE2 幻象中击败 Kosis 启示者。波次上下文、护盾机制、恶魔光束安全扇区、Boss+小怪优先级矩阵、社区证据与奖励。",
    imageAlt: "Kosis 启示者 — 幻象 Boss 占位原画",
    seoTitle: "Kosis 启示者 Boss 攻略 — PoE2 幻象波次与恶魔光束",
    seoDescription: "完整 Kosis 攻略：幻象波次上下文、护盾/恢复、恶魔光束安全扇区、与 Omniphobia 优先级及奖励。",
    quickAnswer: {
      callout: "在幻象中，绝不要追 Kosis 进入怪群——波次怪会包围你。先杀优先目标（通常是 Omniphobia 或小怪），再杀 Kosis。",
      calloutDetail: ["Kosis 出现在地图妄念与幻象中。幻象版本与你所在波次共享难度缩放；妄念越强他打得越狠。", "他的恶魔光束是定向的——移到光束源头对侧的安全扇区。他还有护盾/恢复阶段需特殊处理。" ],
      answers: [
        { label: "位置", text: "地图妄念 & 幻象（按波次缩放）" },
        { label: "光束", text: "定向——安全扇区在源头对侧" },
        { label: "优先级", text: "先杀 Omniphobia/小怪，再杀 Kosis" },
        { label: "护盾", text: "处理恢复阶段；不要过度投入" },
      ],
      links: [
        { label: "波次上下文", href: "#wave-context" },
        { label: "优先级系统", href: "#priority-system" },
        { label: "攻击表", href: "#attacks" },
      ],
    },
    faq: [
      { q: "地图妄念的 Kosis 与幻象的是同一难度吗？", a: ["是同一 Boss，但幻象版本随波次数与妄念强度缩放，地图妄念取决于地图词缀。预计幻象每波更密集更难的战斗。" ] },
      { q: "波次、妄念强度与共现敌人如何影响战斗？", a: ["更高波次与强度意味着更多小怪、更紧空间、更狠攻击。Kosis 常与 Omniphobia 或杂兵共享场地；把波次当环境，而非干净 1v1。" ] },
      { q: "他的护盾/恢复需要特殊处理吗？", a: ["需要——恢复/护盾窗口他更难受伤或短暂无敌。在此之前爆发他，或重新走位清小怪，然后继续。不要把整轮输出灌进护盾。" ] },
      { q: "为什么追他被包围？", a: ["追 Kosis 把你拉进波次怪群。保持站位让他来找你，并用光束安全扇区创造空间。" ] },
      { q: "Kosis 与 Omniphobia 同场先杀谁？", a: ["先 Omniphobia——它的冲锋/slam 是更大的走位威胁。然后 Kosis。光束安全扇区仍适用于 Kosis。" ] },
    ],
    access: {
      steps: [
        { label: "进入妄念/幻象", body: ["跑妄念地图或开始幻象。Kosis 作为波次 Boss 出现，非固定场地。" ] },
        { label: "抵达他的波次", body: ["幻象中他在特定波出现；地图中他在妄念遭遇期间出现。" ] },
      ],
      facts: [
        { label: "出现", value: "波次 Boss", note: "非固定场地" },
        { label: "缩放", value: "波次 + 妄念", note: "每波更密集" },
        { label: "配对", value: "常与 Omniphobia", note: "Boss+小怪重叠" },
        { label: "伤害", value: "物理 + 混沌", note: "混沌抗拉满" },
      ],
    },
    waveContext: {
      paras: ["Kosis 是波次环境 Boss。幻象中每波增加妄念强度；他与杂兵有时与 Omniphobia 共享场地。波次就是场地——你无法把他风筝到干净角落，因为怪群会填满。", "读波次上下文条：在投入伤害前知道你在第几波以及是否有 Omniphobia 或小怪。强度上升时收紧走位。" ],
      bullets: ["波次缩放他的血量/攻击与小怪数。", "空间随妄念强度上升而缩小。", "他很少是干净 1v1——为重叠做计划。" ],
    },
    preparation: {
      items: [
        { label: "混沌抗拉满", checks: ["确认混沌抗达 75% 上限。"], why: "Kosis 造成混沌；未满在怪群中迅速死亡。", fix: "混沌词缀装备或混沌符。" },
        { label: "范围伤害/清场", checks: ["带 AoE 或清怪。"], why: "忽略小怪会被包围。", fix: "AoE 技能、扩散或召唤控怪。" },
        { label: "机动", checks: ["位移技能就绪。"], why: "你须用光束安全扇区创造空间。", fix: "移速鞋或闪现/冲刺。" },
        { label: "护盾窗口爆发", checks: ["知道他的护盾时机。"], why: "过度灌入护盾浪费轮转。", fix: "为易伤窗口保留爆发。" },
      ],
      links: [
        { label: "混沌抗配装", href: "/zh-cn/items" },
        { label: "幻象指南", href: "/zh-cn/builds" },
      ],
    },
    phases: [
      { phaseId: "wave", label: "按波次缩放的遭遇", trigger: "在妄念/幻象波次期间出现。", objectives: ["在波次小怪中存活。", "在护盾外惩罚 Kosis。", "若配对先优先 Omniphobia。"], notes: ["无固定阶段划分；难度由波次与妄念强度决定。他的护盾/恢复窗口打断战斗。", "光束安全扇区是主要创造空间手段。" ], tags: ["混沌", "波次"], mediaId: "phase" },
    ],
    attacks: [
      { id: "demon-beam", name: "恶魔光束", phaseIds: ["wave"], damageTypes: ["chaos"], telegraph: ["Kosis 引导一道定向发射的光束。"], responses: ["移到光束源头对侧的安全扇区；不要穿过线。"], notes: ["定向；安全扇区在源头对侧。"], danger: "high", mistakes: ["站在光束线内。"], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "shield-recovery", name: "护盾/恢复", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["他进入护盾或恢复姿态。"], responses: ["重新走位清小怪；窗口后恢复爆发。"], notes: ["不要把轮转灌入护盾。"], danger: "medium", mistakes: ["在护盾上浪费爆发。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "jump", name: "跳跃/Slam", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["他跃起并 slam。"], responses: ["翻滚出 slam 半径。"], notes: ["追踪。"], danger: "medium", mistakes: ["站在 slam 里。"], media: ["attack"], src: ["src-wiki"] },
      { id: "explosion", name: "爆炸", phaseIds: ["wave"], damageTypes: ["chaos"], telegraph: ["延迟爆炸在某位置提示。"], responses: ["在发射前离开标记区。"], notes: ["常跟跳跃。"], danger: "high", mistakes: ["在标记区逗留。"], media: ["attack"], src: ["src-mobalytics"] },
    ],
    arena: {
      paras: ["没有专属场地——Kosis 在妄念/幻象波次空间内与你战斗，那里挤满迷雾与小怪。迷雾限制可见性，因此光束前摇与音效提示比以往更重要。", "待在已清理空间的边缘；不要跑到怪群集中的中心。" ],
      bullets: ["在波次内战斗，而非干净 Boss 房。", "用光束安全扇区把小怪推离。", "注意迷雾——前摇易遗漏。" ],
    },
    prioritySystem: {
      paras: ["当 Kosis 与 Omniphobia 或杂兵重叠，使用优先级矩阵：(1) Omniphobia 的冲锋/slam 是最大走位威胁——先杀或disable它；(2) 然后在 Kosis 易伤窗口杀他；(3) 仅当小怪挡住安全扇区才清。追 Kosis 进怪群是最常见的死亡。", "若 Kosis 单独，仍尊重护盾窗口与光束安全扇区；不要过度投入爆发。" ],
      bullets: ["Omniphobia（若存在）> Kosis 易伤窗口 > 小怪。", "绝不追 Kosis 进怪群。", "用光束安全扇区创造空间，而非拉近距离。" ],
    },
    build: {
      paras: ["范围伤害与控怪必不可少，因为波次永不停。混沌抗拉满。光束安全扇区利好风筝构筑；近战须围绕护盾计时爆发。召唤有助于牵制怪群但可能挡你闪避。", "妄念强度上升——你的伤害须缩放否则会超时波次。" ],
      bullets: [
        "近战：易伤窗口爆发；尊重护盾。",
        "远程：用光束安全扇区风筝；AoE 清怪。",
        "召唤：控怪好；注意挡闪避。",
        "所有：混沌抗拉满，伤害随强度缩放。" ,
      ],
    },
    community: [
      { src: "reddit-kosis-swarm", kind: "summary", q: "为什么追 Kosis 被包围？", summary: ["玩家反馈追他进波次怪群。社区解法：保持站位，用光束安全扇区创造空间。"], analysis: ["我们确认：波次即场地；追逐把你拉进小怪。站稳，让他来。"], answer: ["不要追。保持站位；用光束安全扇区创造空间。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Kosis" },
      { src: "forum-kosis-ui", kind: "quote", q: "为什么血条/UI 怪？", summary: ["论坛帖子指出幻象 Boss 血条可能误渲染；不要从 UI glitch 读机制。"], analysis: ["我们注：UI glitch 仅表现层；信任实机前摇而非血条。"], answer: ["UI 血条 glitch 是装饰——依赖前摇而非血条。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Kosis 帖" },
    ],
    troubleshooting: [
      { symptom: "在怪群中被包围死亡", checks: ["你在追 Kosis 吗？", "你在清小怪吗？"], answer: ["保持站位；用光束安全扇区创造空间；用 AoE 清小怪而非追逐。"], related: [] },
      { symptom: "护盾期间爆发无效", checks: ["他在护盾/恢复吗？", "你预留爆发了吗？"], answer: ["护盾期间重新走位清小怪；为之后易伤窗口保留爆发。"], related: [] },
      { symptom: "血条异常/UI glitch", checks: ["是幻象血条 glitch 吗？"], answer: ["UI glitch 是装饰；信任实机前摇而非血条读数。"], related: [] },
    ],
    rewards: [
      { id: "kosis-loot", label: "幻象/妄念掉落", condition: "波次通关", notes: ["贡献幻象奖励池与妄念碎片进度。" ] },
      { id: "delirium-progress", label: "妄念进度", condition: "遭遇完成", notes: ["计入 Atlas 妄念进度与相关解锁。" ] },
    ],
    related: [
      { id: "omniphobia-fear-manifest", title: "Omniphobia 恐惧显化", desc: "幻象 Boss；冲锋/slam 压力。", type: "boss", href: "/zh-cn/bosses/omniphobia-fear-manifest" },
      { id: "king-in-the-mists-pinnacle", title: "迷雾之王", desc: "仪式巅峰，混沌与幽灵迷宫。", type: "boss", href: "/zh-cn/bosses/king-in-the-mists-pinnacle" },
    ],
    checklist: [
      "幻象 vs 地图妄念难度上下文已说明。",
      "恶魔光束安全扇区（源头对侧）已描述。",
      "护盾/恢复窗口处理注明（勿过度投入）。",
      "与 Omniphobia 优先级（先杀 Omniphobia）已确立。",
      "UI glitch 警示：信任前摇而非血条。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 6. Omniphobia =====================
SPECS.push({
  slug: "omniphobia-fear-manifest",
  id: "omniphobia-fear-manifest",
  bossCategory: "endgame",
  act: null,
  isOptional: true,
  difficulty: "high",
  phases: 1,
  damageTypes: ["physical", "chaos"],
  location: "Simulacrum (Delirium)",
  recommendedLevel: "Level 80+",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["delirium", "simulacrum", "endgame", "wave", "boss-pair"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Omniphobia,_Fear_Manifest",
    mobalytics: "https://mobalytics.gg/poe-2/guides",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "Omniphobia, Fear Manifest Boss Guide: Simulacrum Charge, Slam, Double-Boss Pull and Rewards",
    shortTitle: "Omniphobia, Fear Manifest",
    summary: "Path of Exile 2 Delirium / Simulacrum boss guide: Omniphobia spawn conditions, Charge/Leap/Ground Slam telegraphs, why rolling behind still gets hit, pulling away from Kosis, and Delirium progress.",
    description: "Beat Omniphobia, Fear Manifest in PoE2 Simulacrum. Map/Simulacrum spawn, Charge and Slam wind-ups, double-boss separation from Kosis, armour/physical prep, and rewards.",
    imageAlt: "Omniphobia, Fear Manifest — Simulacrum boss placeholder art",
    seoTitle: "Omniphobia, Fear Manifest Boss Guide — PoE2 Simulacrum Charge & Slam",
    seoDescription: "Complete Omniphobia guide for Path of Exile 2: Simulacrum spawn, Charge/Leap/Ground Slam telegraphs, separating from Kosis, physical mitigation, and Delirium progress.",
    quickAnswer: {
      callout: "Omniphobia's Charge/Slam cover a wide arc — rolling behind him often still clips the follow-up AoE. Roll PERPENDICULAR to the charge line, not behind, when he commits.",
      calloutDetail: [
        "Omniphobia spawns from gold Delirium Shards in maps and as a Simulacrum wave boss. He is a physical-pressure bruiser with Charge, Leap, and Ground Slam.",
        "When paired with Kosis, separate them: pull Omniphobia away so you are not simultaneously in both their AoEs. His health-bar misrender is a known UI glitch — trust the telegraphs.",
      ],
      answers: [
        { label: "Spawn", text: "Gold Delirium Shard (maps) & Simulacrum wave" },
        { label: "Dodge", text: "Roll perpendicular to Charge, not behind" },
        { label: "Pairing", text: "Pull away from Kosis to separate AoEs" },
        { label: "Prep", text: "Armour + physical mitigation" },
      ],
      links: [
        { label: "Wave context", href: "#wave-context" },
        { label: "Priority system", href: "#priority-system" },
        { label: "Attack table", href: "#attacks" },
      ],
    },
    faq: [
      { q: "What is the current relation between gold Delirium Shards, Map Spawn and the Simulacrum?", a: ["Gold Delirium Shards in maps can escalate into an Omniphobia encounter; in the Simulacrum he is a scheduled wave boss. Both are the same fight, scaled by Delirium intensity."] },
      { q: "What are the wind-ups for Charge, Leap, and Ground Slam?", a: ["Charge: a directional lunge with a bright tell. Leap: he jumps to your location and Slams. Ground Slam: a wide AoE slam with a ground marker. Each has a distinct pre-animation — learn them per fight."] },
      { q: "Why do I still get hit after rolling behind him?", a: ["His Charge/Slam have a follow-up AoE that clips behind him. Roll PERPENDICULAR to the charge line instead of directly behind, and don't stand in the slam marker."] },
      { q: "How do I separate him from Kosis?", a: ["When both are present, walk Omniphobia away from Kosis so their AoEs don't overlap on you. Use terrain/LoS; don't let them converge."] },
      { q: "His health bar looks wrong / name glitch — what do I do?", a: ["That is a known Simulacrum UI glitch. Do not read mechanics from the bar; trust the in-game telegraphs and audio."] },
      { q: "Does killing him affect Delirium / Atlas progress?", a: ["Yes — clearing the wave contributes to Simulacrum rewards and Delirium progression; it counts toward related Atlas unlocks."] },
    ],
    access: {
      steps: [
        { label: "Trigger in maps / Simulacrum", body: ["Gold Delirium Shards in maps or a Simulacrum wave can spawn Omniphobia. He is not a fixed-arena boss."] },
      ],
      facts: [
        { label: "Spawn", value: "Gold Shard / wave", note: "Scaled by Delirium" },
        { label: "Type", value: "Physical bruiser", note: "Charge/Leap/Slam" },
        { label: "Pairing", value: "Often with Kosis", note: "Separate AoEs" },
        { label: "Damage", value: "Physical + Chaos", note: "Armour + phys mit" },
      ],
    },
    waveContext: {
      paras: ["Omniphobia is a wave-environment boss like Kosis. He appears via gold Delirium Shards in maps or as a Simulacrum wave, scaled by Delirium intensity. The wave is the arena — space is limited by mist and adds, so his wide Charges and Slams are especially dangerous in tight waves.", "Know the wave number and whether Kosis is also present before committing; the two together halve your safe space."],
      bullets: ["Scales with Delirium intensity.", "Narrow space makes wide AoEs lethal.", "Often paired with Kosis — plan separation."],
    },
    preparation: {
      items: [
        { label: "Armour / Physical Mitigation", checks: ["Stack armour or physical damage reduction."], why: "Omniphobia is a physical bruiser; his Slams hit hard.", fix: "Armour, Fortify, or physical-reduction passives." },
        { label: "Capped Chaos Resistance", checks: ["Verify chaos res at 75%."], why: "Delirium environment deals chaos; Kosis overlap adds chaos.", fix: "Chaos-crafted gear or charm." },
        { label: "Mobility", checks: ["Movement skill ready."], why: "You must roll perpendicular to Charges and separate from Kosis.", fix: "Movement-speed boots or dash." },
        { label: "Life / recovery", checks: ["Ensure reliable recovery."], why: "Sustained physical pressure; avoid death-by-a-thousand-slams.", fix: "Life leech/flask uptime." },
      ],
      links: [
        { label: "Physical mitigation gearing", href: "/en/items" },
        { label: "Simulacrum guide", href: "/en/builds" },
      ],
    },
    phases: [
      { phaseId: "wave", label: "Wave-Scaled Encounter", trigger: "Spawns via gold Shard / Simulacrum wave.", objectives: ["Dodge Charge/Leap/Slam perpendicular.", "Separate from Kosis if paired.", "Burst during openings."], notes: ["No fixed phase split; difficulty set by Delirium intensity. His wide AoEs are the core threat; the misrendering bar is cosmetic.", "Pull him away from Kosis to avoid overlapping AoEs."], tags: ["physical", "wave"], mediaId: "phase" },
    ],
    attacks: [
      { id: "charge", name: "Charge", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["He winds up a directional lunge with a bright tell."], responses: ["Roll PERPENDICULAR to the charge line, not directly behind."], notes: ["Follow-up AoE clips behind him."], danger: "high", mistakes: ["Rolling straight behind into the AoE."], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "leap", name: "Leap", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["He jumps to your location."], responses: ["Don't stand still at his landing; roll out."], notes: ["Tracking your position at cast."], danger: "medium", mistakes: ["Standing at the landing."], media: ["attack"], src: ["src-mobalytics"] },
      { id: "ground-slam", name: "Ground Slam", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["A wide AoE slam with a ground marker."], responses: ["Leave the marker; roll out of the radius."], notes: ["Wide arc; rolling behind still clips."], danger: "high", mistakes: ["In the slam marker."], media: ["attack"], src: ["src-wiki"] },
      { id: "double-boss", name: "Double-Boss Overlap (with Kosis)", phaseIds: ["wave"], damageTypes: ["physical", "chaos"], telegraph: ["Kosis + Omniphobia share the floor."], responses: ["Pull Omniphobia away so AoEs don't converge on you."], notes: ["Separation is the key survival skill."], danger: "critical", mistakes: ["Letting both AoEs overlap."], media: ["attack"], src: ["src-mobalytics"] },
    ],
    arena: {
      paras: ["No dedicated arena — Omniphobia fights inside the Delirium/Si mulacrum wave space. The mist and adds limit space, making his wide Charges and Slams especially punishing. Keep near the edge of cleared space and never let Kosis and Omniphobia converge on you.", "The misrendering health bar is a known UI glitch — rely on telegraphs."],
      bullets: ["Fight inside the wave, not a clean room.", "Keep Kosis and Omniphobia apart.", "Trust telegraphs, not the glitchy bar."],
    },
    prioritySystem: {
      paras: ["When Omniphobia pairs with Kosis, the priority is: (1) separate them so AoEs don't overlap; (2) kill Omniphobia first if you must pick — its wide physical AoEs are the bigger positional threat; (3) then Kosis. Rolling perpendicular to Omniphobia's Charge is non-negotiable.", "If Omniphobia is alone, still respect the slam marker and the follow-up AoE; don't roll blindly behind."],
      bullets: ["Separate the two bosses first.", "Omniphobia (wide AoE) > Kosis if forced to pick.", "Roll perpendicular to Charge, never straight behind."],
    },
    build: {
      paras: ["Armour and physical mitigation define your survival — Omniphobia is a physical bruiser. Cap chaos res for the Delirium environment and Kosis overlap. Mobility lets you roll perpendicular and separate the pair. Minions can body-block his Charge but also clog your dodge path.", "Scale damage with Delirium intensity or you time out the wave."],
      bullets: [
        "Melee: punish after Slam recovery; respect arc.",
        "Ranged: kite; roll perpendicular to Charge.",
        "Minion: body-block useful but watch pathing.",
        "All: armour + chaos res, scale damage with intensity.",
      ],
    },
    community: [
      { src: "reddit-omni-behind", kind: "summary", q: "Why do I get hit rolling behind Omniphobia?", summary: ["Players report the follow-up AoE clips behind him. Fix: roll perpendicular to the charge line."], analysis: ["We confirm the slam/charge has a trailing AoE; perpendicular roll is correct."], answer: ["Roll perpendicular to the Charge, not directly behind — the follow-up AoE clips behind."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Omniphobia" },
      { src: "forum-omni-ui", kind: "quote", q: "Why is his bar/name glitched?", summary: ["Forum posts note Simulacrum boss bars misrender. Don't read mechanics from the UI."], analysis: ["Our note: cosmetic glitch; trust telegraphs and audio."], answer: ["Bar glitch is cosmetic — trust the telegraphs."], link: "https://www.pathofexile.com/forum/", label: "Official forum Omniphobia thread" },
    ],
    troubleshooting: [
      { symptom: "I get hit even after rolling behind", checks: ["Did you roll straight behind?", "Was there a trailing AoE?"], answer: ["Roll PERPENDICULAR to the Charge line, not directly behind — the follow-up AoE clips behind him."], related: [] },
      { symptom: "Kosis and Omniphobia AoEs overlap on me", checks: ["Are they converged?", "Did you separate them?"], answer: ["Walk Omniphobia away from Kosis so their AoEs don't overlap. Use LoS/terrain."], related: [] },
      { symptom: "Bar/name looks wrong", checks: ["Simulacrum UI glitch?"], answer: ["Cosmetic only — trust the in-game telegraphs and audio, not the bar."], related: [] },
    ],
    rewards: [
      { id: "omni-loot", label: "Simulacrum / Delirium loot", condition: "Wave clear", notes: ["Contributes to Simulacrum reward pool and Delirium splinter progress."] },
      { id: "delirium-progress", label: "Delirium Progression", condition: "Encounter completion", notes: ["Counts toward Atlas Delirium progression and related unlocks."] },
    ],
    related: [
      { id: "kosis-the-revelation", title: "Kosis, the Revelation", desc: "Simulacrum boss; Demon Beam and shield.", type: "boss", href: "/en/bosses/kosis-the-revelation" },
      { id: "vessel-of-kulemak", title: "Vessel of Kulemak", desc: "Abyss pinnacle with a revival gauntlet.", type: "boss", href: "/en/bosses/vessel-of-kulemak" },
    ],
    checklist: [
      "Gold Shard / Simulacrum spawn context stated.",
      "Charge/Leap/Ground Slam wind-ups described.",
      "Perpendicular-roll (not behind) fix for trailing AoE confirmed.",
      "Separation from Kosis established as key skill.",
      "UI glitch caveat: trust telegraphs, not the bar.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Omniphobia 恐惧显化 Boss 攻略：幻象冲锋、Slam、双 Boss 拉扯与奖励",
    shortTitle: "Omniphobia 恐惧显化",
    summary: "流放之路2 妄念/幻象 Boss 攻略：Omniphobia 出现条件、冲锋/跳跃/地裂前摇、为什么滚背后仍被击中、与 Kosis 拉开、妄念进度。",
    description: "在 PoE2 幻象中击败 Omniphobia 恐惧显化。地图/幻象出现、冲锋与 Slam 起手、与 Kosis 双 Boss 分离、护甲/物理准备与奖励。",
    imageAlt: "Omniphobia 恐惧显化 — 幻象 Boss 占位原画",
    seoTitle: "Omniphobia 恐惧显化 Boss 攻略 — PoE2 幻象冲锋与 Slam",
    seoDescription: "完整 Omniphobia 攻略：幻象出现、冲锋/跳跃/地裂前摇、与 Kosis 分离、物理减伤与妄念进度。",
    quickAnswer: {
      callout: "Omniphobia 的冲锋/Slam 覆盖宽弧——滚到他背后常仍被后续 AoE 刮到。当他锁定，垂直（垂直）于冲锋线翻滚，而非滚背后。",
      calloutDetail: ["Omniphobia 从地图金色妄念碎片出现，也是幻象波次 Boss。他是物理压力型的冲锋/跳跃/地裂猛汉。", "与 Kosis 配对时，把他拉开，避免同时处于两者 AoE。血条误渲染是已知 UI glitch——信任前摇。" ],
      answers: [
        { label: "出现", text: "金色妄念碎片（地图）& 幻象波次" },
        { label: "闪避", text: "垂直冲锋线翻滚，非背后" },
        { label: "配对", text: "拉开 Kosis 分离 AoE" },
        { label: "准备", text: "护甲 + 物理减伤" },
      ],
      links: [
        { label: "波次上下文", href: "#wave-context" },
        { label: "优先级系统", href: "#priority-system" },
        { label: "攻击表", href: "#attacks" },
      ],
    },
    faq: [
      { q: "金色妄念碎片、地图出现与幻象当前关系？", a: ["地图中的金色妄念碎片可升级为 Omniphobia 遭遇；幻象中他是预定波次 Boss。两者同一战斗，按妄念强度缩放。" ] },
      { q: "冲锋、跳跃、地裂的前摇？", a: ["冲锋：带明亮提示的定向冲锋。跳跃：跳到你位置并 Slam。地裂：带地面标记的宽 AoE slam。每个有独特起手——逐战学习。" ] },
      { q: "为什么滚到背后仍被击中？", a: ["他的冲锋/Slam 有刮到背后的后续 AoE。垂直（垂直）于冲锋线翻滚而非正背后，并别站 slam 标记。" ] },
      { q: "如何把他与 Kosis 分开？", a: ["两者同场时，把 Omniphobia 走离 Kosis，使其 AoE 不重叠在你身上。利用地形/视线；别让它们汇聚。" ] },
      { q: "血条异常/名字 glitch 怎么办？", a: ["那是已知幻象 UI glitch。不要从血条读机制；信任实机前摇与音效。" ] },
      { q: "击杀他影响妄念/Atlas 进度吗？", a: ["是——通关波次贡献幻象奖励与妄念进度；计入相关 Atlas 解锁。" ] },
    ],
    access: {
      steps: [
        { label: "在地图/幻象触发", body: ["地图金色妄念碎片或幻象波次可生成 Omniphobia。他不是固定场地 Boss。" ] },
      ],
      facts: [
        { label: "出现", value: "金色碎片/波次", note: "按妄念缩放" },
        { label: "类型", value: "物理猛汉", note: "冲锋/跳跃/Slam" },
        { label: "配对", value: "常与 Kosis", note: "分离 AoE" },
        { label: "伤害", value: "物理 + 混沌", note: "护甲 + 物理减伤" },
      ],
    },
    waveContext: {
      paras: ["Omniphobia 与 Kosis 一样是波次环境 Boss。他经地图金色妄念碎片或幻象波次出现，按妄念强度缩放。波次即场地——空间被迷雾与小怪限制，因此他的宽冲锋与 Slam 在紧凑波次中尤其致命。", "在投入前知道波次数以及 Kosis 是否同场；两者一起把你安全空间减半。" ],
      bullets: ["按妄念强度缩放。", "窄空间使宽 AoE 致命。", "常与 Kosis 配对——计划分离。" ],
    },
    preparation: {
      items: [
        { label: "护甲/物理减伤", checks: ["堆护甲或物理伤害减免。"], why: "Omniphobia 是物理猛汉；Slam 打得狠。", fix: "护甲、Fortify 或物理减免被动。" },
        { label: "混沌抗拉满", checks: ["确认混沌抗达 75%。"], why: "妄念环境造混沌；Kosis 重叠加混沌。", fix: "混沌词缀装备或符。" },
        { label: "机动", checks: ["位移技能就绪。"], why: "你须垂直冲锋翻滚并与 Kosis 分离。", fix: "移速鞋或冲刺。" },
        { label: "生命/恢复", checks: ["确保可靠恢复。"], why: "持续物理压力；避免被千刀 Slam 磨死。", fix: "生命偷取/药剂覆盖。" },
      ],
      links: [
        { label: "物理减伤配装", href: "/zh-cn/items" },
        { label: "幻象指南", href: "/zh-cn/builds" },
      ],
    },
    phases: [
      { phaseId: "wave", label: "按波次缩放的遭遇", trigger: "经金色碎片/幻象波次出现。", objectives: ["垂直闪避冲锋/跳跃/Slam。", "若配对与 Kosis 分离。", "在空窗爆发。"], notes: ["无固定阶段划分；难度由妄念强度决定。宽 AoE 是核心威胁；误渲染血条是装饰。", "把他拉离 Kosis 避免 AoE 重叠。" ], tags: ["物理", "波次"], mediaId: "phase" },
    ],
    attacks: [
      { id: "charge", name: "冲锋", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["他蓄力定向冲锋，带明亮提示。"], responses: ["垂直（垂直）于冲锋线翻滚，非正背后。"], notes: ["后续 AoE 刮到背后。"], danger: "high", mistakes: ["直滚背后进 AoE。"], media: ["attack"], src: ["src-wiki", "src-mobalytics"] },
      { id: "leap", name: "跳跃", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["他跳到你位置。"], responses: ["别站在落点；滚出。"], notes: ["施法时追踪你的位置。"], danger: "medium", mistakes: ["站在落点。"], media: ["attack"], src: ["src-mobalytics"] },
      { id: "ground-slam", name: "地裂", phaseIds: ["wave"], damageTypes: ["physical"], telegraph: ["带地面标记的宽 AoE slam。"], responses: ["离开标记；滚出半径。"], notes: ["宽弧；滚背后仍刮。"], danger: "high", mistakes: ["在 slam 标记里。"], media: ["attack"], src: ["src-wiki"] },
      { id: "double-boss", name: "双 Boss 重叠（与 Kosis）", phaseIds: ["wave"], damageTypes: ["physical", "chaos"], telegraph: ["Kosis + Omniphobia 共享场地。"], responses: ["把 Omniphobia 拉离，使 AoE 不汇聚在你身上。"], notes: ["分离是关键生存技能。"], danger: "critical", mistakes: ["让两者 AoE 重叠。"], media: ["attack"], src: ["src-mobalytics"] },
    ],
    arena: {
      paras: ["无专属场地——Omniphobia 在妄念/幻象波次空间内战斗。迷雾与小怪限制空间，使他的宽冲锋与 Slam 尤其惩罚。待在已清理空间边缘，绝不让 Kosis 与 Omniphobia 汇聚到你身上。", "误渲染血条是已知 UI glitch——依赖前摇。" ],
      bullets: ["在波次内战斗，而非干净房间。", "保持 Kosis 与 Omniphobia 分开。", "信任前摇，非 glitch 血条。" ],
    },
    prioritySystem: {
      paras: ["当 Omniphobia 与 Kosis 配对，优先级：(1) 先分离它们使 AoE 不重叠；(2) 若必须选，先杀 Omniphobia——其宽物理 AoE 是更大走位威胁；(3) 然后 Kosis。垂直 Omniphobia 冲锋翻滚是不可妥协的。", "若 Omniphobia 单独，仍尊重 slam 标记与后续 AoE；不要盲目滚背后。" ],
      bullets: ["先分离两个 Boss。", "Omniphobia（宽 AoE）> Kosis 若被迫选。", "垂直冲锋翻滚，绝不直滚背后。" ],
    },
    build: {
      paras: ["护甲与物理减伤决定你的生存——Omniphobia 是物理猛汉。为妄念环境与 Kosis 重叠混沌抗拉满。机动让你垂直翻滚并分离这对。召唤能挡冲锋但也可能堵你闪避路径。", "随妄念强度缩放伤害否则超时波次。" ],
      bullets: [
        "近战：Slam 恢复后输出；尊重弧。",
        "远程：风筝；垂直冲锋翻滚。",
        "召唤：挡有用但注意路径。",
        "所有：护甲 + 混沌抗，伤害随强度缩放。" ,
      ],
    },
    community: [
      { src: "reddit-omni-behind", kind: "summary", q: "为什么滚背后仍被击中？", summary: ["玩家反馈后续 AoE 刮到背后。解法：垂直冲锋线翻滚。"], analysis: ["我们确认 slam/冲锋有拖尾 AoE；垂直翻滚正确。"], answer: ["垂直冲锋线翻滚而非正背后——后续 AoE 刮到背后。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Omniphobia" },
      { src: "forum-omni-ui", kind: "quote", q: "为什么血条/名字 glitch？", summary: ["论坛帖子指出幻象 Boss 血条误渲染。不要从 UI 读机制。"], analysis: ["我们注：装饰 glitch；信任前摇与音效。"], answer: ["血条 glitch 是装饰——信任前摇。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Omniphobia 帖" },
    ],
    troubleshooting: [
      { symptom: "滚背后仍被击中", checks: ["你直滚背后？", "有拖尾 AoE 吗？"], answer: ["垂直（垂直）于冲锋线翻滚，而非正背后——后续 AoE 刮到他背后。"], related: [] },
      { symptom: "Kosis 与 Omniphobia AoE 重叠", checks: ["它们汇聚了？", "你分离了吗？"], answer: ["把 Omniphobia 走离 Kosis 使其 AoE 不重叠。用视线/地形。"], related: [] },
      { symptom: "血条/名字异常", checks: ["幻象 UI glitch？"], answer: ["仅装饰——信任实机前摇与音效，非血条。"], related: [] },
    ],
    rewards: [
      { id: "omni-loot", label: "幻象/妄念掉落", condition: "波次通关", notes: ["贡献幻象奖励池与妄念碎片进度。" ] },
      { id: "delirium-progress", label: "妄念进度", condition: "遭遇完成", notes: ["计入 Atlas 妄念进度与相关解锁。" ] },
    ],
    related: [
      { id: "kosis-the-revelation", title: "Kosis 启示者", desc: "幻象 Boss；恶魔光束与护盾。", type: "boss", href: "/zh-cn/bosses/kosis-the-revelation" },
      { id: "vessel-of-kulemak", title: "Kulemak 之器", desc: "深渊巅峰，复活循环。", type: "boss", href: "/zh-cn/bosses/vessel-of-kulemak" },
    ],
    checklist: [
      "金色碎片/幻象出现上下文已说明。",
      "冲锋/跳跃/地裂前摇已描述。",
      "垂直翻滚（非背后）修复拖尾 AoE 已确认。",
      "与 Kosis 分离已确立为关键技能。",
      "UI glitch 警示：信任前摇而非血条。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 7. Blackjaw =====================
SPECS.push({
  slug: "blackjaw-the-remnant",
  id: "blackjaw-the-remnant",
  bossCategory: "optional",
  act: "act-3",
  isOptional: true,
  difficulty: "medium",
  phases: 2,
  damageTypes: ["physical", "fire"],
  location: "Jiquani's Machinarium (Act 3)",
  recommendedLevel: "Act 3",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["campaign", "optional", "act-3", "permanent-reward", "fire"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Blackjaw,_the_Remnant",
    mobalytics: "https://mobalytics.gg/poe-2/guides",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "Blackjaw, the Remnant Boss Guide: Act 3 Optional Fight, Triple Slam and Permanent Fire Resistance Reward",
    shortTitle: "Blackjaw, the Remnant",
    summary: "Path of Exile 2 Act 3 optional boss guide: Jiquani's Machinarium route, the permanent +10% fire resistance reward (The Flame Core), Triple Slam timing, and Red Flash attacks.",
    description: "Beat Blackjaw, the Remnant in PoE2 Act 3. Why he is worth farming, Machinarium route, permanent reward, Triple Slam rhythms, fire/physical prep, and troubleshooting the no-turn-back path.",
    imageAlt: "Blackjaw, the Remnant — Act 3 optional boss placeholder art",
    seoTitle: "Blackjaw, the Remnant Boss Guide — PoE2 Act 3 Optional & Permanent Fire Res",
    seoDescription: "Complete Blackjaw guide for Path of Exile 2 Act 3: Jiquani's Machinarium route, The Flame Core permanent +10% fire res, Triple Slam timing, and Red Flash attacks.",
    quickAnswer: {
      callout: "Stay CLOSE to Blackjaw and dodge BEHIND him — his Shockwave Slam Combo and Hellfire Combo have range, speed and tracking that punish distance. The reward (The Flame Core) permanently grants +10% Fire Resistance.",
      calloutDetail: [
        "Blackjaw is an Act 3 optional boss in Jiquani's Machinarium. He is a physical/fire brute; physical and fire resistance help but the real answer is learning his combos.",
        "Defeating him yields The Flame Core, a consumable that permanently increases your Fire Resistance by +10% — a permanent account-style reward worth a回头 detour.",
      ],
      answers: [
        { label: "Why fight", text: "Permanent +10% Fire Resistance (The Flame Core)" },
        { label: "Where", text: "Jiquani's Machinarium, Act 3" },
        { label: "Key combo", text: "Triple Slam → Shockwave Slam Combo (phase 2)" },
        { label: "Red Flash", text: "Telegraphed high-damage hits; dodge behind" },
      ],
      links: [
        { label: "Permanent reward", href: "#progression-unlock" },
        { label: "Access route", href: "#access" },
        { label: "Attack table", href: "#attacks" },
      ],
    },
    faq: [
      { q: "What is the exact location and prerequisite route?", a: ["He is in Jiquani's Machinarium in Act 3. Progress the Act 3 quest far enough to reach the Machinarium, then engage him in his arena.", "The arena door, once passed, does not let you return the way you came — clear trash and commit."] },
      { q: "What does the first kill reward, and is it different in Cruel/later versions?", a: ["The first kill grants The Flame Core, a permanent +10% Fire Resistance consumable. Later difficulties/leagues keep the same permanent reward structure; the fight difficulty scales but the reward intent is unchanged."] },
      { q: "What is the rhythm of each Triple Slam hit and the correct roll direction?", a: ["Each slam in the triple has a clear wind-up; roll perpendicular/behind after each tells. The Shockwave Slam Combo in phase 2 adds range and tracking — roll behind him, not away."] },
      { q: "Which attacks are Red Flash (telegraphed high damage)?", a: ["Red Flash attacks are his biggest hits (Shockwave Slam Combo, Hellfire Combo fireballs). They flash red before impact — that is your cue to dodge behind him."] },
      { q: "What if I leave and the door won't let me back / Soul Core route breaks?", a: ["The Machinarium path is one-way once committed. If you leave, re-enter from the quest checkpoint; don't expect the door to reopen. Plan your consumables before engaging."] },
      { q: "Is the Campaign version separate from a Map replica?", a: ["Yes — this is the Campaign (Act 3) version. A Map-replica version may exist separately; this page covers the campaign fight and its permanent reward."] },
    ],
    access: {
      steps: [
        { label: "Reach Jiquani's Machinarium", body: ["Progress Act 3 until you can enter Jiquani's Machinarium. The boss arena is inside."] },
        { label: "Engage in his arena", body: ["Enter the arena; the path behind seals. Clear trash and commit to the fight."] },
      ],
      facts: [
        { label: "Zone", value: "Jiquani's Machinarium", note: "Act 3" },
        { label: "Reward", value: "The Flame Core (+10% Fire Res)", note: "Permanent" },
        { label: "Path", value: "One-way once committed", note: "Plan consumables" },
        { label: "Damage", value: "Physical + Fire", note: "Resist both" },
      ],
    },
    progressionUnlock: {
      paras: ["Blackjaw's defining payoff is The Flame Core, dropped on first kill, which permanently increases your Fire Resistance by +10%. This is a permanent reward — worth a回头 detour even if you out-level the fight.", "Because it is permanent, the incentive is 'why you should go back and fight him' rather than raw loot. Later difficulties keep the same permanent reward intent; only fight scaling changes."],
      bullets: ["The Flame Core = permanent +10% Fire Resistance.", "Worth farming even at higher level.", "Campaign version; Map replica is separate."],
    },
    preparation: {
      items: [
        { label: "Fire Resistance", checks: ["Stack fire res (cap if possible)."], why: "Hellfire Combo and fireballs deal fire; the reward is fire res for a reason.", fix: "Fire-crafted gear or Ruby Flask." },
        { label: "Physical Resistance / Armour", checks: ["Some physical mitigation."], why: "He is a physical brute; slams hit hard.", fix: "Armour, Fortify, or physical reduction." },
        { label: "Movement speed", checks: ["Boots with movement speed."], why: "His combos have tracking; mobility helps disengage.", fix: "Movement-speed suffixes." },
        { label: "Learn the combos", checks: ["Read Red Flash tells."], why: "Distance play fails in phase 2; you must close and dodge behind.", fix: "Practice the roll-behind timing." },
      ],
      links: [
        { label: "Fire resistance gearing", href: "/en/items" },
        { label: "Campaign checklist", href: "/en/guides/campaign-checklist-permanent-rewards" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "Phase 1 — Brute (100%–75%)", trigger: "Engage in the arena.", objectives: ["Learn his basic slams.", "Stay close, dodge behind."], notes: ["Blackjaw is a physical brute. Staying close and dodging behind him works until he gains range attacks.", "At ~75% HP he begins the Shockwave Slam Combo."], tags: ["physical", "fire"], mediaId: "phase" },
      { phaseId: "phase-2", label: "Phase 2 — Shockwave & Hellfire (75%–0%)", trigger: "At ~75% HP.", objectives: ["Dodge Shockwave Slam Combo behind him.", "Survive Hellfire Combo (fire ring + fireballs).", "Burst him down."], notes: ["Shockwave Slam Combo gains range/speed/tracking — punish at close range by rolling behind. At ~50% the Hellfire Combo breathes a fire ring then a 5-swing flaming axe combo.", "Seek refuge behind a pillar during fireballs, then close back in before the next Shockwave."], tags: ["fire", "enrage"], mediaId: "phase" },
    ],
    attacks: [
      { id: "triple-slam", name: "Triple Slam", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["Three consecutive slam wind-ups."], responses: ["Roll perpendicular/behind after each tell; don't panic-roll early."], notes: ["Each slam is telegraphed; rhythm matters."], danger: "high", mistakes: ["Early panic roll into the next slam."], media: ["attack"], src: ["src-gamerguides", "src-wiki"] },
      { id: "shockwave-combo", name: "Shockwave Slam Combo (phase 2)", phaseIds: ["phase-2"], damageTypes: ["physical"], telegraph: ["Red Flash before a shockwave slam."], responses: ["Roll BEHIND him, not away — it has range and tracking."], notes: ["The deadliest phase-2 attack; distance fails."], danger: "critical", mistakes: ["Rolling away into the shockwave."], media: ["attack"], src: ["src-gamerguides"] },
      { id: "hellfire-combo", name: "Hellfire Combo (phase 2, ~50%)", phaseIds: ["phase-2"], damageTypes: ["fire"], telegraph: ["Breathes a fire ring, then 5-swing flaming axe combo with fireballs."], responses: ["Hide behind a pillar during fireballs, then close in before the next Shockwave."], notes: ["Fire ring wards you off; fireballs punish."], danger: "critical", mistakes: ["Staying at range during fireballs."], media: ["attack"], src: ["src-gamerguides", "src-wiki"] },
      { id: "leap-slam", name: "Leap Slam", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["He leaps and slams."], responses: ["Dodge-roll out of the landing radius."], notes: ["Tracking."], danger: "medium", mistakes: ["Standing in landing."], media: ["attack"], src: ["src-wiki"] },
    ],
    arena: {
      paras: ["The Machinarium arena has pillars you can use during the Hellfire Combo — hide behind one for the fireballs, then close back in. The arena is otherwise open, and the path behind you seals once you commit, so clear trash first.", "Stay close to Blackjaw; the open space punishes distance because his phase-2 combos have range and tracking."],
      bullets: ["Use pillars to break Hellfire fireballs.", "Stay close; distance fails in phase 2.", "Path seals behind you — clear trash first."],
    },
    build: {
      paras: ["Fire and physical resistance help, but neither is decisive — his combos are the real test. Stay close, learn the roll-behind timing, and use pillars for the Hellfire fireballs. Low-movement and minion builds struggle because his tracking punishes standing still.", "The fight is short; burst during his recovery windows."],
      bullets: [
        "Melee: glue to him, roll behind on Red Flash.",
        "Ranged: harder — phase 2 tracking punishes distance.",
        "Minion: body-block helps but watch tracking.",
        "Fire + physical res, then learn the combos.",
      ],
    },
    community: [
      { src: "reddit-blackjaw-pillar", kind: "summary", q: "How do I survive the Hellfire Combo?", summary: ["Players found hiding behind a pillar during the fireballs, then closing in, is the reliable pattern."], analysis: ["We confirm the pillar refuge + re-close timing avoids the fireball punishment."], answer: ["Hide behind a pillar for the fireballs, then close in before the next Shockwave."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Blackjaw" },
      { src: "forum-blackjaw-door", kind: "quote", q: "Why can't I go back / route broke?", summary: ["Forum posts note the Machinarium path is one-way once committed."], analysis: ["Our note: re-enter from the quest checkpoint; the door won't reopen."], answer: ["Path is one-way; re-enter from checkpoint and plan consumables first."], link: "https://www.pathofexile.com/forum/", label: "Official forum Blackjaw thread" },
    ],
    troubleshooting: [
      { symptom: "I die to the Shockwave Slam Combo in phase 2", checks: ["Are you rolling away?", "Are you at range?"], answer: ["Roll BEHIND him, not away — it has range and tracking. Close in and punish his recovery."], related: [] },
      { symptom: "The path sealed and I can't return", checks: ["Did you leave mid-fight?", "Are you at the checkpoint?"], answer: ["The Machinarium path is one-way once committed. Re-enter from the quest checkpoint; plan consumables before engaging."], related: [] },
      { symptom: "Fireballs keep hitting me during Hellfire", checks: ["Are you at range?", "Are you using a pillar?"], answer: ["Hide behind a pillar for the fireballs, then close back in before the next Shockwave."], related: [] },
    ],
    rewards: [
      { id: "flame-core", label: "The Flame Core", condition: "First kill", notes: ["Permanent +10% Fire Resistance consumable — a permanent reward worth a回头 detour."] },
      { id: "blackjaw-loot", label: "Campaign loot", condition: "Kill", notes: ["Standard Act 3 optional boss drops."] },
    ],
    related: [
      { id: "mektul-the-forgemaster", title: "Mektul, the Forgemaster", desc: "Act 3 optional / timed; Reforging Bench unlock.", type: "boss", href: "/en/bosses/mektul-the-forgemaster" },
      { id: "count-geonor", title: "Count Geonor", desc: "Act 1 finale boss with phase and wolf mechanics.", type: "boss", href: "/en/bosses/count-geonor" },
    ],
    checklist: [
      "Jiquani's Machinarium location and one-way path noted.",
      "The Flame Core permanent +10% Fire Res reward confirmed.",
      "Triple Slam and Shockwave/Hellfire combo timing described.",
      "Red Flash telegraphed hits identified.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Blackjaw 残存者 Boss 攻略：第三章可选战斗、三连 Slam 与永久火抗奖励",
    shortTitle: "Blackjaw 残存者",
    summary: "流放之路2 第三章可选 Boss 攻略：Jiquani 机械殿路线、永久 +10% 火抗奖励（烈焰核心）、三连 Slam 时机与红闪攻击。",
    description: "在 PoE2 第三章击败 Blackjaw 残存者。为何值得farm、机械殿路线、永久奖励、三连 Slam 节奏、火/物理准备，以及无法回退路径的排查。",
    imageAlt: "Blackjaw 残存者 — 第三章可选 Boss 占位原画",
    seoTitle: "Blackjaw 残存者 Boss 攻略 — PoE2 第三章可选与永久火抗",
    seoDescription: "完整 Blackjaw 攻略：Jiquani 机械殿路线、烈焰核心永久 +10% 火抗、三连 Slam 时机与红闪攻击。",
    quickAnswer: {
      callout: "贴着 Blackjaw 并滚到他背后——他的冲击波 Slam 组合与地狱火组合有距离、速度与追踪，惩罚远离。奖励（烈焰核心）永久给予 +10% 火焰抗性。",
      calloutDetail: ["Blackjaw 是第三章 Jiquani 机械殿的可选 Boss。他是物理/火猛汉；物理与火抗有帮助，但真正的解法是学会他的组合。", "击败他获得烈焰核心，一个永久提升火焰抗性 +10% 的消耗品——值得回头绕路的永久奖励。" ],
      answers: [
        { label: "为何打", text: "永久 +10% 火焰抗性（烈焰核心）" },
        { label: "位置", text: "Jiquani 机械殿，第三章" },
        { label: "关键组合", text: "三连 Slam → 冲击波 Slam 组合（二阶段）" },
        { label: "红闪", text: "高伤前摇；滚背后" },
      ],
      links: [
        { label: "永久奖励", href: "#progression-unlock" },
        { label: "进入路线", href: "#access" },
        { label: "攻击表", href: "#attacks" },
      ],
    },
    faq: [
      { q: "具体位置与前置路线？", a: ["他在第三章 Jiquani 机械殿。推进第三章任务足够远以抵达机械殿，然后在他场地交战。", "一旦通过，身后门不让你原路返回——先清小怪再投入。" ] },
      { q: "首次击杀奖励什么，残酷/后续版本不同吗？", a: ["首次击杀授予烈焰核心，永久 +10% 火焰抗性的消耗品。后续难度/联盟保持相同永久奖励结构；战斗难度缩放但奖励意图不变。" ] },
      { q: "每记三连 Slam 的节奏与正确翻滚方向？", a: ["三连中每记 slam 有清晰起手；每次提示后垂直/背后翻滚。二阶段冲击波 Slam 组合加距离与追踪——滚背后而非远离。" ] },
      { q: "哪些攻击是红闪（高伤前摇）？", a: ["红闪是他最大的命中（冲击波 Slam 组合、地狱火组合火球）。撞击前闪红——那是你滚背后的提示。" ] },
      { q: "我离开后门不让回 / 灵魂核心路线断了？", a: ["机械殿路径一旦投入是单向。若离开，从任务检查点重进；别指望门重开。交战前规划消耗品。" ] },
      { q: "战役版与地图复刻版分开吗？", a: ["是——这是战役（第三章）版。地图复刻版可能单独存在；本页覆盖战役战斗及其永久奖励。" ] },
    ],
    access: {
      steps: [
        { label: "抵达 Jiquani 机械殿", body: ["推进第三章直到可进入 Jiquani 机械殿。Boss 场地在内。" ] },
        { label: "在他场地交战", body: ["进入场地；身后路径封闭。清小怪并投入战斗。" ] },
      ],
      facts: [
        { label: "区域", value: "Jiquani 机械殿", note: "第三章" },
        { label: "奖励", value: "烈焰核心（+10% 火抗）", note: "永久" },
        { label: "路径", value: "投入后单向", note: "规划消耗品" },
        { label: "伤害", value: "物理 + 火", note: "双抗" },
      ],
    },
    progressionUnlock: {
      paras: ["Blackjaw 的标志性回报是烈焰核心，首次击杀掉落，永久提升火焰抗性 +10%。这是永久奖励——即使你超过战斗等级也值得回头绕路。", "因为是永久，激励是‘为何值得回头打他’而非单纯战利品。后续难度保持相同永久奖励意图；仅战斗缩放变化。" ],
      bullets: ["烈焰核心 = 永久 +10% 火焰抗性。", "即使更高等级也值得farm。", "战役版；地图复刻单独。" ],
    },
    preparation: {
      items: [
        { label: "火焰抗性", checks: ["堆火抗（尽量满）。"], why: "地狱火组合与火球造火；奖励是火抗有原因。", fix: "火抗词缀装备或 Ruby 药剂。" },
        { label: "物理抗性/护甲", checks: ["一些物理减伤。"], why: "他是物理猛汉；slam 打得狠。", fix: "护甲、Fortify 或物理减免。" },
        { label: "移速", checks: ["鞋子带移速。"], why: "他的组合有追踪；机动帮助脱离。", fix: "移速后缀。" },
        { label: "学组合", checks: ["读红闪提示。"], why: "二阶段距离打法失败；你必须贴近滚背后。", fix: "练滚背后时机。" },
      ],
      links: [
        { label: "火抗配装", href: "/zh-cn/items" },
        { label: "战役检查清单", href: "/zh-cn/guides/campaign-checklist-permanent-rewards" },
      ],
    },
    phases: [
      { phaseId: "phase-1", label: "阶段一 — 猛汉（100%–75%）", trigger: "在场地交战。", objectives: ["学基础 slam。", "贴近，滚背后。"], notes: ["Blackjaw 是物理猛汉。贴近并滚背后有效，直到他获得远程攻击。", "约 75% 血开始冲击波 Slam 组合。" ], tags: ["物理", "火"], mediaId: "phase" },
      { phaseId: "phase-2", label: "阶段二 — 冲击波与地狱火（75%–0%）", trigger: "约 75% 血。", objectives: ["滚背后躲冲击波 Slam 组合。", "存活地狱火组合（火环 + 火球）。", "爆发带走。"], notes: ["冲击波 Slam 组合加距离/速度/追踪——近距离滚背后惩罚。约 50% 地狱火组合先喷火环再五连火焰斧 combo。", "火球期间躲柱后，下一冲击波前再贴近。" ], tags: ["火", "狂暴"], mediaId: "phase" },
    ],
    attacks: [
      { id: "triple-slam", name: "三连 Slam", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["连续三记 slam 起手。"], responses: ["每次提示后垂直/背后翻滚；别过早恐慌滚。"], notes: ["每记 slam 有前摇；节奏重要。"], danger: "high", mistakes: ["过早恐慌滚进下一 slam。"], media: ["attack"], src: ["src-gamerguides", "src-wiki"] },
      { id: "shockwave-combo", name: "冲击波 Slam 组合（二阶段）", phaseIds: ["phase-2"], damageTypes: ["physical"], telegraph: ["冲击波 slam 前红闪。"], responses: ["滚到他背后，而非远离——它有距离与追踪。"], notes: ["二阶段最致命攻击；距离失败。"], danger: "critical", mistakes: ["滚离进冲击波。"], media: ["attack"], src: ["src-gamerguides"] },
      { id: "hellfire-combo", name: "地狱火组合（二阶段，约50%）", phaseIds: ["phase-2"], damageTypes: ["fire"], telegraph: ["喷火环，然后五连火焰斧 combo 带火球。"], responses: ["火球期间躲柱后，然后下一冲击波前贴近。"], notes: ["火环把你挡开；火球惩罚。"], danger: "critical", mistakes: ["火球期间保持距离。"], media: ["attack"], src: ["src-gamerguides", "src-wiki"] },
      { id: "leap-slam", name: "跳跃 Slam", phaseIds: ["phase-1", "phase-2"], damageTypes: ["physical"], telegraph: ["他跳跃并 slam。"], responses: ["翻滚出落点半径。"], notes: ["追踪。"], danger: "medium", mistakes: ["站在落点。"], media: ["attack"], src: ["src-wiki"] },
    ],
    arena: {
      paras: ["机械殿场地有柱子，可在地狱火组合期间利用——躲 behind 一根挡火球，然后贴近。场地其余开阔，身后路径一旦投入封闭，因此先清小怪。", "贴近 Blackjaw；开阔空间惩罚距离，因为二阶段组合有距离与追踪。" ],
      bullets: ["用柱子挡地狱火火球。", "贴近；二阶段距离失败。", "身后路径封闭——先清小怪。" ],
    },
    build: {
      paras: ["火与物理抗有帮助，但都不决定性——他的组合才是真正考验。贴近，学滚背后时机，并用柱子挡地狱火火球。低机动与召唤构筑吃力，因为他的追踪惩罚站桩。", "战斗短；在他恢复窗口爆发。" ],
      bullets: [
        "近战：粘着他，红闪时滚背后。",
        "远程：更难——二阶段追踪惩罚距离。",
        "召唤：挡有用但注意追踪。",
        "火+物理抗，然后学组合。" ,
      ],
    },
    community: [
      { src: "reddit-blackjaw-pillar", kind: "summary", q: "如何存活地狱火组合？", summary: ["玩家发现火球期间躲柱后，然后贴近是可靠模式。"], analysis: ["我们确认柱后避难 + 再贴近时机避免火球惩罚。"], answer: ["火球期间躲柱后，下一冲击波前贴近。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Blackjaw" },
      { src: "forum-blackjaw-door", kind: "quote", q: "为什么不能回 / 路线断？", summary: ["论坛帖子指出机械殿路径一旦投入是单向。"], analysis: ["我们注：从任务检查点重进；门不会重开。"], answer: ["路径单向；从检查点重进并先规划消耗品。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Blackjaw 帖" },
    ],
    troubleshooting: [
      { symptom: "二阶段死在冲击波 Slam 组合", checks: ["你滚离？", "你在远处？"], answer: ["滚到他背后而非远离——它有距离与追踪。贴近惩罚他恢复。"], related: [] },
      { symptom: "路径封闭无法返回", checks: ["你战斗中离开？", "你在检查点？"], answer: ["机械殿路径一旦投入单向。从任务检查点重进；交战前规划消耗品。"], related: [] },
      { symptom: "地狱火期间火球总命中", checks: ["你在远处？", "你用柱子？"], answer: ["火球期间躲柱后，下一冲击波前再贴近。"], related: [] },
    ],
    rewards: [
      { id: "flame-core", label: "烈焰核心", condition: "首次击杀", notes: ["永久 +10% 火焰抗性消耗品——值得回头绕路的永久奖励。" ] },
      { id: "blackjaw-loot", label: "战役掉落", condition: "击杀", notes: ["标准第三章可选 Boss 掉落。" ] },
    ],
    related: [
      { id: "mektul-the-forgemaster", title: "Mektul 锻造大师", desc: "第三章可选/限时；重锻台解锁。", type: "boss", href: "/zh-cn/bosses/mektul-the-forgemaster" },
      { id: "count-geonor", title: "Count Geonor", desc: "第一章终章 Boss，阶段与狼机制。", type: "boss", href: "/zh-cn/bosses/count-geonor" },
    ],
    checklist: [
      "Jiquani 机械殿位置与单向路径已注。",
      "烈焰核心永久 +10% 火抗奖励已确认。",
      "三连 Slam 与冲击波/地狱火组合时机已描述。",
      "红闪前摇高伤攻击已识别。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== 8. Mektul =====================
SPECS.push({
  slug: "mektul-the-forgemaster",
  id: "mektul-the-forgemaster",
  bossCategory: "optional",
  act: "act-3",
  isOptional: true,
  difficulty: "medium",
  phases: 1,
  damageTypes: ["physical", "fire"],
  location: "The Molten Vault (Act 3)",
  recommendedLevel: "Act 3",
  patch: "Path of Exile 2 Early Access 0.5.4",
  league: "Runes of Aldur",
  tags: ["campaign", "optional", "act-3", "timed", "progression-unlock"],
  urls: {
    patch: "https://www.pathofexile.com/forum/view-thread/3975218",
    wiki: "https://poe2wiki.net/wiki/Mektul,_the_Forgemaster",
    mobalytics: "https://mobalytics.gg/poe-2/guides",
    maxroll: "https://maxroll.gg/poe2",
  },
  en: {
    title: "Mektul, the Forgemaster Boss Guide: Molten Vault Timed Fight, Hammer of Kamasa and Reforging Bench Unlock",
    shortTitle: "Mektul, the Forgemaster",
    summary: "Path of Exile 2 Act 3 optional / timed boss guide: Molten Vault route, the advancing lava timer, pulling Mektul out of the molten flow, Hammer of Kamasa, and the Reforging Bench unlock.",
    description: "Beat Mektul, the Forgemaster in PoE2 Act 3. Lava timer pressure, DPS diagnosis (low DPS vs bad positioning), Reforging Bench unlock, and troubleshooting the timed arena.",
    imageAlt: "Mektul, the Forgemaster — Act 3 optional boss placeholder art",
    seoTitle: "Mektul, the Forgemaster Boss Guide — PoE2 Molten Vault Timer & Reforging Bench",
    seoDescription: "Complete Mektul guide for Path of Exile 2 Act 3: Molten Vault route, advancing lava timer, DPS diagnosis, Hammer of Kamasa, and Reforging Bench unlock.",
    quickAnswer: {
      callout: "Mektul is a TIMED fight: molten lava advances and fills the arena. Keep DPS high enough to kill him before the flow pins you, and pull him OUT of the lava when he gets caught in it.",
      calloutDetail: [
        "Mektul is in the Molten Vault (Act 3), reached via the Sluice Gate / Aureadduct path. The fight has a hard lava-timer: the molten flow advances and you must defeat him before it overwhelms you.",
        "Defeating him lets you deliver the Hammer of Kamasa and unlocks the Reforging Bench (a permanent system unlock). The lava advance is time-based and not paused by menus.",
      ],
      answers: [
        { label: "Where", text: "Molten Vault, Act 3 (Sluice Gate)" },
        { label: "Timer", text: "Advancing lava — time-based, not pauseable" },
        { label: "Key skill", text: "Keep DPS up; pull him out of lava" },
        { label: "Reward", text: "Hammer of Kamasa + Reforging Bench unlock" },
      ],
      links: [
        { label: "Timer pressure", href: "#timer-pressure" },
        { label: "DPS diagnosis", href: "#dps-diagnosis" },
        { label: "Reforging Bench", href: "#progression-unlock" },
      ],
    },
    faq: [
      { q: "What is the Molten Vault entrance and how do I reach it?", a: ["Progress Act 3 to the Molten Vault via the Sluice Gate / Aureadduct path. The arena is the Molten Vault where the timed fight happens."] },
      { q: "Is the advancing lava on a fixed timer, and is it affected by pause?", a: ["The lava advance is time-based and continues regardless of pause — leaving via menu does not stop it. Plan your flask/charm use before engaging; you cannot pause the timer."] },
      { q: "How do I pull Mektul out when he gets caught in the molten flow?", a: ["When he is inside the molten flow, use your movement / a knockback or repositioning tool, or simply keep dealing damage and reposition so the fight stays at the arena edge. The key is not letting the flow pin both of you."] },
      { q: "Which supports / skills can I swap temporarily, without a wrong generic config?", a: ["You may slot a single-target support temporarily for the DPS check, but do not build a generic 'one-size' config. Swap only what the fight demands (e.g., a damage support) and revert after."] },
      { q: "How do I tell if it's low DPS, Mektul not pulled out, or wasted windows?", a: ["See the DPS Diagnosis table: check your effective DPS, whether he is stuck in lava, and whether you are using his recovery windows. Each has a distinct fix."] },
      { q: "How do I deliver the Hammer of Kamasa and what does the Reforging Bench unlock?", a: ["On kill you obtain the Hammer of Kamasa (a quest item). Completing the step unlocks the Reforging Bench — a permanent crafting/system unlock for your account progression."] },
    ],
    access: {
      steps: [
        { label: "Reach the Molten Vault", body: ["Progress Act 3 to the Sluice Gate / Aureadduct and enter the Molten Vault."] },
        { label: "Enter the timed arena", body: ["The fight begins with the lava timer running. Defeat Mektul before the flow overwhelms the arena."] },
      ],
      facts: [
        { label: "Zone", value: "Molten Vault", note: "Act 3" },
        { label: "Timer", value: "Advancing lava", note: "Time-based, not pauseable" },
        { label: "Reward", value: "Hammer of Kamasa", note: "Quest item" },
        { label: "Unlock", value: "Reforging Bench", note: "Permanent system" },
      ],
    },
    progressionUnlock: {
      paras: ["Beating Mektul grants the Hammer of Kamasa and unlocks the Reforging Bench — a permanent system unlock in your campaign progression, not just a drop. This is the 'why it matters' beyond the fight itself.", "The Reforging Bench persists for your account progression; treat the Mektul fight as the gate to that unlock."],
      bullets: ["Hammer of Kamasa = quest item on kill.", "Reforging Bench = permanent system unlock.", "Campaign progression gate."],
    },
    preparation: {
      items: [
        { label: "Sustained single-target DPS", checks: ["Verify you can out-pace the lava timer."], why: "The fight is DPS-gated by the advancing lava; low DPS = pinned.", fix: "Single-target setup; temporary damage support swap." },
        { label: "Fire Resistance", checks: ["Stack fire res."], why: "Magma attacks deal fire; the lava itself is fire hazard.", fix: "Fire-crafted gear or Ruby Flask." },
        { label: "Movement / reposition tool", checks: ["Have a way to reposition Mektul or yourself."], why: "You must pull him out of the molten flow.", fix: "Movement skill or knockback." },
        { label: "No pause reliance", checks: ["Plan consumables pre-fight."], why: "The lava timer is not pauseable.", fix: "Pre-buff; don't rely on menu pause." },
      ],
      links: [
        { label: "Fire resistance gearing", href: "/en/items" },
        { label: "Campaign progression guide", href: "/en/guides/campaign-progression-template" },
      ],
    },
    timerPressure: {
      paras: ["The Molten Vault fight is on a lava clock. The molten flow advances from one side and progressively fills the arena; if you are too slow, it pins you against the wall and you take continuous fire damage. The advance is time-based and is NOT paused by opening the menu — so you cannot buy time by pausing.", "Your job: kill Mektul fast enough that the flow never boxes you in. Keep the fight at the open edge and use his recovery windows to burst."],
      bullets: ["Lava advances on a fixed time, not by your actions.", "Menu pause does NOT stop the lava.", "Keep the fight at the open edge; don't get cornered."],
    },
    phases: [
      { phaseId: "timed", label: "Timed Molten Fight", trigger: "Enter the Molten Vault arena.", objectives: ["Kill Mektul before lava pins you.", "Pull him out if caught in flow.", "Burst during recovery windows."], notes: ["No traditional phase split — the pressure is the advancing lava. Mektul occasionally gets caught in the molten flow; pull him out so the fight stays winnable.", "Magma Arm attacks (uppercut, swing, smash, charged blast) are the main hit sources."], tags: ["fire", "timed"], mediaId: "phase" },
    ],
    attacks: [
      { id: "magma-uppercut", name: "Magma Arm Uppercut", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["He yanks his magma arm back, then uppercuts."], responses: ["Back away quickly when the arm pulls back."], notes: ["Hits hard if you are close."], danger: "high", mistakes: ["Standing close on wind-up."], media: ["attack"], src: ["src-deltias", "src-wiki"] },
      { id: "magma-swing", name: "Magma Arm Swing", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["Presses arm to chest, swings wide arc."], responses: ["Move backward or sideways out of the arc."], notes: ["Wide arc; dodge laterally."], danger: "medium", mistakes: ["In the swing arc."], media: ["attack"], src: ["src-deltias"] },
      { id: "magma-smash", name: "Magma Arm Smash", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["Raises arm high, slams down."], responses: ["Step back from the slam and magma."], notes: ["Slam + magma pool."], danger: "high", mistakes: ["Under the slam."], media: ["attack"], src: ["src-wiki"] },
      { id: "charged-blast", name: "Charged Magma Blast", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["Arm glows purple, then a small powerful blast."], responses: ["Move to either side when the arm glows."], notes: ["Telegraphed by glow."], danger: "medium", mistakes: ["In the blast line."], media: ["attack"], src: ["src-deltias"] },
    ],
    arena: {
      paras: ["The Molten Vault is a rectangular arena with the molten flow advancing from one side. Keep the fight at the open edge; never let the lava get between you and your exit. When Mektul is caught in the flow, reposition so the fight stays at the safe edge.", "The lava is fire hazard ground — standing in it is continuous damage on top of his attacks."],
      bullets: ["Fight at the open edge, not the lava side.", "Pull Mektul out if he is in the flow.", "Lava = continuous fire damage."],
    },
    dpsDiagnosis: {
      paras: ["If you fail, diagnose which of three causes: (1) Low DPS — your effective single-target is below the lava-timer threshold; swap a temporary damage support or improve gear. (2) Mektul not pulled out — he is stuck in the flow and you are not repositioning; use a movement/knockback tool. (3) Wasted windows — you are not bursting during his recovery; tighten your rotation.", "Do not apply a generic 'one-size' config; only swap what the fight demands and revert after."],
      bullets: [
        "Low DPS → temporary damage support / better gear.",
        "Not pulled out → reposition / knockback tool.",
        "Wasted windows → burst during recovery.",
        "Swap supports temporarily; revert after the fight.",
      ],
    },
    build: {
      paras: ["This is a DPS check wrapped in a fire-hazard arena. Stack single-target damage and fire resistance. Ranged builds can kite him out of the lava more easily; melee must respect the Magma Arm timing and keep the fight at the edge. Minions help DPS but can body-block your dodges near the flow.", "Because the timer is not pauseable, pre-buff and commit — no menu pacing."],
      bullets: [
        "Melee: punish recovery; keep at the open edge.",
        "Ranged: kite him out of the lava.",
        "Minion: DPS help; watch body-block near flow.",
        "Fire res + single-target DPS; pre-buff, no pause.",
      ],
    },
    community: [
      { src: "reddit-mektul-lava", kind: "summary", q: "Why does the lava keep pinning me?", summary: ["Players report the lava advances on a timer and corners them. Fix: keep the fight at the open edge and raise DPS."], analysis: ["We confirm the lava is time-based and not pauseable; DPS is the real gate."], answer: ["Keep the fight at the open edge and raise DPS — the lava is on a fixed timer, not pauseable."], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Mektul" },
      { src: "forum-mektul-bench", kind: "quote", q: "What does the Reforging Bench unlock?", summary: ["Forum posts note the Reforging Bench is a permanent system unlock from the Mektul step."], analysis: ["Our note: it is a campaign progression gate, not just a drop."], answer: ["The Reforging Bench is a permanent system unlock granted by completing the Mektul step."], link: "https://www.pathofexile.com/forum/", label: "Official forum Mektul thread" },
    ],
    troubleshooting: [
      { symptom: "The lava pins me against the wall", checks: ["Is your DPS too low?", "Are you at the lava side?"], answer: ["Raise single-target DPS and keep the fight at the open edge. The lava is on a fixed timer and not pauseable."], related: [] },
      { symptom: "Mektul is stuck in the molten flow", checks: ["Are you repositioning him?", "Do you have a knockback/movement tool?"], answer: ["Use a movement or knockback tool to pull him out; keep the fight at the safe edge."], related: [] },
      { symptom: "I have DPS but still fail", checks: ["Are you bursting recovery windows?", "Are you wasting time?"], answer: ["Tighten your rotation; burst during his Magma Arm recovery and don't over-kite."], related: [] },
    ],
    rewards: [
      { id: "hammer-of-kamasa", label: "The Hammer of Kamasa", condition: "Kill", notes: ["Quest item delivered to progress the Act 3 quest."] },
      { id: "reforging-bench", label: "Reforging Bench Unlock", condition: "Complete Mektul step", notes: ["Permanent system unlock for campaign progression."] },
    ],
    related: [
      { id: "blackjaw-the-remnant", title: "Blackjaw, the Remnant", desc: "Act 3 optional boss with a permanent fire-res reward.", type: "boss", href: "/en/bosses/blackjaw-the-remnant" },
      { id: "doryani-royal-thaumaturge", title: "Doryani, Royal Thaumaturge", desc: "Act 3 finale boss with a two-phase fight.", type: "boss", href: "/en/bosses/doryani-royal-thaumaturge" },
    ],
    checklist: [
      "Molten Vault (Sluice Gate / Aureadduct) access noted.",
      "Advancing lava timer confirmed time-based and not pauseable.",
      "Pull-Mektul-out-of-lava technique described.",
      "DPS Diagnosis table (low DPS / not pulled / wasted windows) included.",
      "Hammer of Kamasa + Reforging Bench permanent unlock stated.",
      "Exact HP / drop rates pending live client verification (pending-pc).",
    ],
  },
  zh: {
    title: "Mektul 锻造大师 Boss 攻略：熔金 vault 限时战斗、Kamasa 之锤与重锻台解锁",
    shortTitle: "Mektul 锻造大师",
    summary: "流放之路2 第三章可选/限时 Boss 攻略：熔金 vault 路线、推进的熔岩计时、把 Mektul 拉出熔流、Kamasa 之锤与重锻台解锁。",
    description: "在 PoE2 第三章击败 Mektul 锻造大师。熔岩计时压力、DPS 诊断（低 DPS vs 错误站位）、重锻台解锁与限时场地排查。",
    imageAlt: "Mektul 锻造大师 — 第三章可选 Boss 占位原画",
    seoTitle: "Mektul 锻造大师 Boss 攻略 — PoE2 熔金 Vault 计时与重锻台",
    seoDescription: "完整 Mektul 攻略：熔金 vault 路线、推进熔岩计时、DPS 诊断、Kamasa 之锤与重锻台解锁。",
    quickAnswer: {
      callout: "Mektul 是限时战斗：熔岩推进填满场地。保持足够 DPS 在熔流困住你前击杀他，并在他陷入熔流时把他拉出来。",
      calloutDetail: ["Mektul 在第三章熔金 Vault，经水闸/Aureadduct 路径抵达。战斗有硬性熔岩计时：熔流推进，你必须在它淹没你前击败他。", "击败他让你交付 Kamasa 之锤并解锁重锻台（永久系统解锁）。熔岩推进基于时间，菜单不暂停。" ],
      answers: [
        { label: "位置", text: "熔金 Vault，第三章（水闸）" },
        { label: "计时", text: "推进熔岩——基于时间，不可暂停" },
        { label: "关键技能", text: "保持 DPS；把他拉出熔岩" },
        { label: "奖励", text: "Kamasa 之锤 + 重锻台解锁" },
      ],
      links: [
        { label: "计时压力", href: "#timer-pressure" },
        { label: "DPS 诊断", href: "#dps-diagnosis" },
        { label: "重锻台", href: "#progression-unlock" },
      ],
    },
    faq: [
      { q: "熔金 Vault 入口与如何抵达？", a: ["推进第三章经水闸/Aureadduct 抵达熔金 Vault。场地即发生限时战斗的熔金 Vault。" ] },
      { q: "推进的熔岩是固定计时吗，受暂停影响吗？", a: ["熔岩推进基于时间并持续，无论暂停——菜单离开不停止它。交战前规划药剂/符；你无法暂停计时。" ] },
      { q: "他陷入熔流时如何拉出？", a: ["当他处于熔流内，用你的位移/击退或重新走位工具，或持续输出并重新走位使战斗保持在场地边缘。关键是不让熔流同时困住你们俩。" ] },
      { q: "哪些辅助/技能可临时替换，不会错误通用配置？", a: ["你可临时装一个单体辅助应对 DPS 门槛，但不要构建通用‘一刀切’配置。仅替换战斗所需（如伤害辅助）并在之后还原。" ] },
      { q: "如何判断是低 DPS、未拉出还是浪费窗口？", a: ["见 DPS 诊断表：检查有效 DPS、他是否卡在熔岩、你是否利用恢复窗口。每个有不同修复。" ] },
      { q: "如何交付 Kamasa 之锤，重锻台解锁什么？", a: ["击杀获得 Kamasa 之锤（任务物品）。完成步骤解锁重锻台——你战役进度的永久制作/系统解锁。" ] },
    ],
    access: {
      steps: [
        { label: "抵达熔金 Vault", body: ["推进第三章至水闸/Aureadduct 并进入熔金 Vault。" ] },
        { label: "进入限时场地", body: ["战斗随熔岩计时开始。在熔流淹没场地前击败 Mektul。" ] },
      ],
      facts: [
        { label: "区域", value: "熔金 Vault", note: "第三章" },
        { label: "计时", value: "推进熔岩", note: "基于时间，不可暂停" },
        { label: "奖励", value: "Kamasa 之锤", note: "任务物品" },
        { label: "解锁", value: "重锻台", note: "永久系统" },
      ],
    },
    progressionUnlock: {
      paras: ["击败 Mektul 授予 Kamasa 之锤并解锁重锻台——你战役进度的永久系统解锁，而非仅掉落。这是超越战斗本身的‘为何重要’。", "重锻台为你的战役进度持久；把 Mektul 战斗视为该解锁的门槛。" ],
      bullets: ["Kamasa 之锤 = 击杀任务物品。", "重锻台 = 永久系统解锁。", "战役进度门槛。" ],
    },
    preparation: {
      items: [
        { label: "持续单体 DPS", checks: ["确认能跑赢熔岩计时。"], why: "战斗由推进熔岩 DPS 门槛；低 DPS = 被困。", fix: "单体配置；临时伤害辅助替换。" },
        { label: "火焰抗性", checks: ["堆火抗。"], why: "熔岩攻击造火；熔岩本身是火危险。"], fix: "火抗词缀装备或 Ruby 药剂。" },
        { label: "位移/重新走位工具", checks: ["有方式重新走位 Mektul 或自己。"], why: "你必须把他拉出熔流。"], fix: "位移技能或击退。" },
        { label: "不依赖暂停", checks: ["战前规划消耗品。"], why: "熔岩计时不可暂停。"], fix: "预buff；不依赖菜单暂停。" },
      ],
      links: [
        { label: "火抗配装", href: "/zh-cn/items" },
        { label: "战役进度指南", href: "/zh-cn/guides/campaign-progression-template" },
      ],
    },
    timerPressure: {
      paras: ["熔金 Vault 战斗在熔岩时钟上。熔流从一侧推进并逐渐填满场地；若你太慢，它把你钉在墙边并受持续火伤。推进基于时间，打开菜单不暂停——你无法通过暂停买时间。", "你的工作：足够快击杀 Mektul 使熔流永不把你困住。把战斗保持在开阔边缘并利用他恢复窗口爆发。" ],
      bullets: ["熔岩按固定时间推进，非你的动作。", "菜单暂停不停止熔岩。", "把战斗保持在开阔边缘；别被逼角。" ],
    },
    phases: [
      { phaseId: "timed", label: "限时熔金战斗", trigger: "进入熔金 Vault 场地。", objectives: ["熔岩困住前击杀 Mektul。", "若卡熔流把他拉出。", "恢复窗口爆发。"], notes: ["无传统阶段划分——压力是推进熔岩。Mektul 偶尔卡进熔流；把他拉出使战斗可赢。", "熔岩臂攻击（上勾、横扫、砸、蓄力爆破）是主要命中来源。" ], tags: ["火", "限时"], mediaId: "phase" },
    ],
    attacks: [
      { id: "magma-uppercut", name: "熔岩臂上勾", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["他缩回熔岩臂，然后上勾。"], responses: ["臂后拉时快速后退。"], notes: ["近身打得狠。"], danger: "high", mistakes: ["起手时站近。"], media: ["attack"], src: ["src-deltias", "src-wiki"] },
      { id: "magma-swing", name: "熔岩臂横扫", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["臂贴胸，横扫宽弧。"], responses: ["向后或侧向移出弧。"], notes: ["宽弧；横向闪避。"], danger: "medium", mistakes: ["在横扫弧内。"], media: ["attack"], src: ["src-deltias"] },
      { id: "magma-smash", name: "熔岩臂砸", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["高举臂，砸下。"], responses: ["从 slam 与熔岩退后。"], notes: ["slam + 熔岩池。"], danger: "high", mistakes: ["在 slam 下。"], media: ["attack"], src: ["src-wiki"] },
      { id: "charged-blast", name: "蓄力熔岩爆破", phaseIds: ["timed"], damageTypes: ["fire"], telegraph: ["臂紫光，然后小范围强爆。"], responses: ["臂发光时移向任一侧。"], notes: ["由发光前摇。"], danger: "medium", mistakes: ["在爆破线内。"], media: ["attack"], src: ["src-deltias"] },
    ],
    arena: {
      paras: ["熔金 Vault 是矩形场地，熔流从一侧推进。把战斗保持在开阔边缘；绝不让自己与出口间有熔岩。当 Mektul 卡在熔流，重新走位使战斗保持在安全边缘。", "熔岩是火危险地面——站在其中除他攻击外还有持续伤害。" ],
      bullets: ["在开阔边缘战斗，而非熔岩侧。", "他卡熔流时拉出。", "熔岩 = 持续火伤。" ],
    },
    dpsDiagnosis: {
      paras: ["若失败，诊断三种原因之一：(1) 低 DPS——有效单体低于熔岩计时门槛；临时替换伤害辅助或改善装备。(2) 未拉出——他卡熔流且你未重新走位；用位移/击退工具。(3) 浪费窗口——未在他恢复时爆发；收紧轮转。", "不要套用通用‘一刀切’配置；仅替换战斗所需并在之后还原。" ],
      bullets: [
        "低 DPS → 临时伤害辅助/更好装备。",
        "未拉出 → 重新走位/击退工具。",
        "浪费窗口 → 恢复时爆发。",
        "临时替换辅助；战后还原。" ,
      ],
    },
    build: {
      paras: ["这是包裹在火危险场地的 DPS 门槛。堆单体伤害与火抗。远程构筑更易把他风筝出熔岩；近战须尊重熔岩臂时机并把战斗保持在边缘。召唤助 DPS 但可能在熔流附近挡你闪避。", "因计时不可暂停，预buff 并投入——无菜单节奏。" ],
      bullets: [
        "近战：恢复时输出；保持在开阔边缘。",
        "远程：把他风筝出熔岩。",
        "召唤：DPS 助；注意熔流附近挡闪避。",
        "火抗 + 单体 DPS；预buff，不暂停。" ,
      ],
    },
    community: [
      { src: "reddit-mektul-lava", kind: "summary", q: "为什么熔岩总钉住我？", summary: ["玩家反馈熔岩按计时推进并把他们逼角。解法：保持在开阔边缘并提高 DPS。"], analysis: ["我们确认熔岩基于时间且不可暂停；DPS 是真正门槛。"], answer: ["保持在开阔边缘并提高 DPS——熔岩按固定计时，不可暂停。"], link: "https://www.reddit.com/r/pathofexile2/", label: "Reddit r/pathofexile2 Mektul" },
      { src: "forum-mektul-bench", kind: "quote", q: "重锻台解锁什么？", summary: ["论坛帖子指出重锻台是 Mektul 步骤的永久系统解锁。"], analysis: ["我们注：它是战役进度门槛，非仅掉落。"], answer: ["重锻台是由完成 Mektul 步骤授予的永久系统解锁。"], link: "https://www.pathofexile.com/forum/", label: "官方论坛 Mektul 帖" },
    ],
    troubleshooting: [
      { symptom: "熔岩把我钉在墙边", checks: ["你 DPS 太低？", "你在熔岩侧？"], answer: ["提高单体 DPS 并保持在开阔边缘。熔岩按固定计时且不可暂停。"], related: [] },
      { symptom: "Mektul 卡在熔流", checks: ["你在重新走位他？", "你有击退/位移工具？"], answer: ["用位移或击退工具把他拉出；保持在安全边缘。"], related: [] },
      { symptom: "有 DPS 仍失败", checks: ["你在恢复窗口爆发？", "你在浪费时间？"], answer: ["收紧轮转；在他熔岩臂恢复时爆发，不要过度风筝。"], related: [] },
    ],
    rewards: [
      { id: "hammer-of-kamasa", label: "Kamasa 之锤", condition: "击杀", notes: ["交付以推进第三章任务的任务物品。" ] },
      { id: "reforging-bench", label: "重锻台解锁", condition: "完成 Mektul 步骤", notes: ["战役进度的永久系统解锁。" ] },
    ],
    related: [
      { id: "blackjaw-the-remnant", title: "Blackjaw 残存者", desc: "第三章可选 Boss，永久火抗奖励。", type: "boss", href: "/zh-cn/bosses/blackjaw-the-remnant" },
      { id: "doryani-royal-thaumaturge", title: "Doryani 皇家法师", desc: "第三章终章 Boss，两阶段战斗。", type: "boss", href: "/zh-cn/bosses/doryani-royal-thaumaturge" },
    ],
    checklist: [
      "熔金 Vault（水闸/Aureadduct）进入已注。",
      "推进熔岩计时确认基于时间且不可暂停。",
      "把 Mektul 拉出熔流技术已描述。",
      "DPS 诊断表（低 DPS/未拉出/浪费窗口）已包含。",
      "Kamasa 之锤 + 重锻台永久解锁已说明。",
      "精确血量/掉落率待实机核验（pending-pc）。",
    ],
  },
});

// ===================== Assembly & write =====================
const sourceLabels = {
  patch: { en: "Official Patch Notes", zh: "官方补丁说明" },
  wiki: { en: "PoE2 Wiki", zh: "PoE2 百科" },
  mobalytics: { en: "Mobalytics Guide", zh: "Mobalytics 攻略" },
  maxroll: { en: "Maxroll Guide", zh: "Maxroll 攻略" },
  ign: { en: "IGN Wiki", zh: "IGN 百科" },
  "poe-vault": { en: "PoE-Vault Guide", zh: "PoE-Vault 攻略" },
  gamerguides: { en: "Gamer Guides", zh: "Gamer Guides" },
  deltias: { en: "Deltia's Gaming", zh: "Deltia's Gaming" },
};

function buildArticle(spec, locale) {
  const t = spec[locale];
  const isZh = locale === "zh-cn";
  const srcIds = ["src-patch-notes", "src-wiki", "src-mobalytics", "src-maxroll"];
  // some bosses reference extra source ids
  const extraSrcIds = ["src-ign", "src-poe-vault", "src-gamerguides", "src-deltias"];
  const allSrcIds = [...new Set([...srcIds, ...extraSrcIds])];

  const heroImg = `/images/bosses/${spec.slug}-hero.webp`;
  const vids = videoEntries(spec.slug, locale,
    isZh ? `${t.shortTitle} 完整击杀（全阶段）` : `${t.shortTitle} Full Kill — All Phases`,
    isZh ? `${t.shortTitle} 构筑/失败案例` : `${t.shortTitle} Build / Failure Case`,
    isZh ? "建议重点观看" : "What to watch for");
  const media = mediaFor(spec.slug, [
    { id: `${spec.slug}-yt1`, url: vids[0].url, alt: `${t.shortTitle} video 1`, caption: "Representative fight footage (verify ID before publish)." },
    { id: `${spec.slug}-yt2`, url: vids[1].url, alt: `${t.shortTitle} video 2`, caption: "Build / failure-case footage (verify ID before publish)." },
  ]);

  const sections = [];
  let order = 0;
  const add = (section) => { section.order = order++; sections.push(section); };

  // quick-answer
  add({
    id: "quick-answer", type: "quick-answer", title: isZh ? "先记住这三件事" : "Remember These First",
    toc: true, visible: true,
    callout: t.quickAnswer.callout, calloutDetail: t.quickAnswer.calloutDetail,
    answers: t.quickAnswer.answers, links: t.quickAnswer.links,
  });
  // faq (high-value search questions)
  add({
    id: "faq", type: "faq", title: isZh ? "高频搜索问题：进入、材料、失败成本" : "Top search questions: entry, materials, failure cost",
    toc: true, visible: true, items: t.faq.map((f) => ({ question: f.q, answer: f.a })),
  });
  // access
  add({
    id: "access", type: "access", title: isZh ? "如何进入" : "How to Reach", toc: true, visible: true,
    steps: t.access.steps.map((s) => ({ label: s.label, body: s.body })),
    facts: t.access.facts.map((f) => ({ label: f.label, value: f.value, note: f.note })),
  });
  // optional narrative sections (failure-cost / version-disambiguation / remnant-impact / encounter-loop / visibility / lich / reward-decision / modifier / wave / maze / priority / timer / progression)
  const narrative = (id, key, title) => {
    if (!t[key]) return;
    add({ id, type: "overview", title, toc: true, visible: true, paragraphs: t[key].paras, bullets: t[key].bullets });
  };
  narrative("failure-cost", "failureCost", isZh ? "失败成本与重试" : "Failure Cost & Retry");
  narrative("version-disambiguation", "versionDisambiguation", isZh ? "版本区分" : "Version Disambiguation");
  narrative("remnant-impact", "remnantImpact", isZh ? "远征残迹影响" : "Expedition Remnant Impact");
  narrative("encounter-loop", "encounterLoop", isZh ? "遭遇循环" : "Encounter Loop");
  narrative("visibility-guide", "visibilityGuide", isZh ? "可见性指南" : "Visibility Guide");
  narrative("lich-power-selector", "lichPowerSelector", isZh ? "巫妖之力选择" : "Lich Power Selection");
  narrative("reward-decision", "rewardDecision", isZh ? "奖励决策" : "Reward Decision");
  narrative("modifier-builder", "modifierBuilder", isZh ? "Grip of Kulemak 构建器" : "Grip of Kulemak Modifier Builder");
  narrative("wave-context", "waveContext", isZh ? "波次上下文" : "Wave Context");
  narrative("maze-guide", "mazeGuide", isZh ? "迷宫指南" : "Wisp Maze Guide");
  narrative("priority-system", "prioritySystem", isZh ? "优先级系统" : "Boss + Add Priority System");
  narrative("timer-pressure", "timerPressure", isZh ? "计时压力" : "Timer Pressure");
  narrative("progression-unlock", "progressionUnlock", isZh ? "进度解锁" : "Progression Unlock");

  // preparation
  add({
    id: "preparation", type: "preparation", title: isZh ? "战前准备清单" : "Pre-Fight Preparation Checklist",
    toc: true, visible: true,
    items: t.preparation.items.map((i) => ({ label: i.label, checks: i.checks, why: i.why, fix: i.fix })),
    links: t.preparation.links,
  });
  // phases
  add({
    id: "phases", type: "phases", title: isZh ? "战斗阶段" : "Combat Phases", toc: true, visible: true,
    phases: t.phases.map((p) => ({
      phaseId: p.phaseId, label: p.label, trigger: p.trigger, notes: p.notes,
      objectives: p.objectives, tags: p.tags, mediaId: p.mediaId,
    })),
  });
  // attacks
  add({
    id: "attacks", type: "attacks", title: isZh ? "攻击识别与应对" : "Attack Recognition and Response",
    toc: true, visible: true,
    attacks: t.attacks.map((a) => ({
      attackId: a.id, name: a.name, damageTypes: a.damageTypes, phaseIds: a.phaseIds,
      telegraph: a.telegraph, responses: a.responses, notes: a.notes,
      danger: a.danger, commonMistakes: a.mistakes, mediaIds: a.media, sourceIds: a.src,
    })),
  });
  // arena
  add({ id: "arena", type: "arena", title: isZh ? "场地解读" : "Arena Reading", toc: true, visible: true, paragraphs: t.arena.paras, bullets: t.arena.bullets });
  // build-considerations (strategy). merge prioritySystem into build for bosses that have it? keep separate narrative already added; here general build.
  add({ id: "build-considerations", type: "build-considerations", title: isZh ? "构筑考量" : "Build Considerations", toc: true, visible: true, paragraphs: t.build.paras, bullets: t.build.bullets });
  // community-evidence
  add({
    id: "community-evidence", type: "community-evidence", title: isZh ? "社区问题与证据" : "Community Questions and Evidence",
    toc: true, visible: true,
    entries: t.community.map((c) => ({
      sourceId: c.src, kind: c.kind, question: c.q, summary: c.summary,
      editorialAnalysis: c.analysis, officialAnswer: c.answer,
      linkHref: c.link, linkLabel: c.label,
    })),
  });
  // troubleshooting
  add({
    id: "troubleshooting", type: "troubleshooting", title: isZh ? "常见问题与修复" : "Common Problems and Fixes",
    toc: true, visible: true,
    problems: t.troubleshooting.map((p) => ({
      symptom: p.symptom, directAnswer: p.answer, checks: p.checks, relatedContentIds: p.related,
    })),
  });
  // rewards
  add({
    id: "rewards", type: "rewards", title: isZh ? "奖励与掉落" : "Rewards and Drops", toc: true, visible: true,
    rewards: t.rewards.map((r) => ({ itemId: r.id, label: r.label, condition: r.condition, notes: r.notes })),
  });
  // video（复用顶部已计算的 vids：可内嵌 watch?v= 格式 + 关键节点时间戳）
  add({
    id: "video", type: "video", title: isZh ? "视频与重要节点" : "Video Guides", toc: true, visible: true, entries: vids,
  });
  // gallery
  add({
    id: "gallery", type: "gallery", title: isZh ? "媒体画廊" : "Media Gallery", toc: true, visible: true,
    mediaIds: ["hero", "arena", "phase", "attack", "annotated"],
  });
  // related-content
  add({
    id: "related-content", type: "related-content", title: isZh ? "相关攻略" : "Related Guides", toc: false, visible: true,
    items: t.related.map((r) => ({ contentId: r.id, title: r.title, description: r.desc, contentType: r.type, href: r.href })),
  });
  // sources-section (single sources module)
  add({
    id: "sources-section", type: "sources-section", title: isZh ? "来源与核验" : "Sources and Verification",
    toc: true, visible: true,
    categories: [
      { label: isZh ? "官方来源" : "Official", description: sourceLabels.patch[locale] + " — " + spec.urls.patch },
      { label: isZh ? "数据库" : "Database", description: sourceLabels.wiki[locale] + " — " + spec.urls.wiki },
      { label: isZh ? "社区攻略" : "Community", description: sourceLabels.mobalytics[locale] + " — " + spec.urls.mobalytics },
      { label: isZh ? "社区攻略" : "Community", description: sourceLabels.maxroll[locale] + " — " + spec.urls.maxroll },
    ],
    verificationChecklist: t.checklist,
  });
  // changelog
  add({
    id: "changelog", type: "changelog", title: isZh ? "文章更新日志" : "Article Changelog", toc: false, visible: true,
    entries: [{ date: TODAY, changes: [
      isZh ? "初始草稿：基于 0.5.4 补丁说明与社区攻略生成，含阶段、攻击表、社区证据与奖励。" : "Initial draft generated from 0.5.4 patch notes and community guides, including phases, attack table, community evidence and rewards.",
      isZh ? "视频采用可内嵌 watch?v= 格式与关键节点时间戳；上线前需替换为实测作者视频 ID。" : "Videos use embeddable watch?v= format with key timestamps; replace with verified creator IDs before publish.",
    ] }],
  });

  const sources = sourcesFor(spec.urls);

  return {
    id: spec.id,
    slug: spec.slug,
    locale,
    type: "boss",
    status: "draft",
    featured: false,
    title: t.title,
    shortTitle: t.shortTitle,
    summary: t.summary,
    description: t.description,
    location: spec.location,
    campaignStage: null,
    recommendedLevel: spec.recommendedLevel,
    difficulty: spec.difficulty,
    damageTypes: spec.damageTypes,
    phases: spec.phases,
    bossCategory: spec.bossCategory,
    act: spec.act,
    isOptional: spec.isOptional,
    patch: spec.patch,
    league: spec.league,
    patchStatus: "current",
    verificationStatus: "pending-pc",
    author: "Exile2 Guides Editorial Team",
    reviewer: "",
    createdAt: TODAY,
    updatedAt: TODAY,
    heroImage: heroImg,
    cardImage: heroImg,
    imageAlt: t.imageAlt,
    tags: spec.tags,
    sections,
    media,
    relatedBuildIds: [],
    relatedGuideIds: [],
    relatedItemIds: [],
    relatedPatchIds: ["patch-0-5-4-runes-of-aldur"],
    sources,
    seo: { title: t.seoTitle, description: t.seoDescription, noindex: true },
  };
}

let written = 0;
for (const spec of SPECS) {
  for (const locale of ["en", "zh-cn"]) {
    const article = buildArticle(spec, locale);
    const dir = path.join(CONTENT_ROOT, locale, "bosses");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${spec.slug}.json`);
    await writeFile(file, JSON.stringify(article, null, 2) + "\n", "utf8");
    written += 1;
  }
}
console.log(`Wrote ${written} boss JSON files (${SPECS.length} bosses x 2 locales).`);


/**
 * 文件职责：为第一批 15 篇攻略提供逐主题深度正文与成熟栏目模块，避免短模板文章进入生产。
 *
 * 维护边界：英语是事实源；这里只保存可追溯的编辑结论和结构化内容，不复制第三方原文，
 * 数值只在数据库或官方版本记录可核对时出现。九种译文由同批翻译脚本从本文件产物同步。
 */

const DATE = "2026-08-11";
const baseSection = (id, order, title, type) => ({
  id,
  order,
  title,
  type,
  visible: true,
  toc: true,
});

const narrative = (id, order, title, type, paragraphs, bullets = []) => ({
  ...baseSection(id, order, title, type),
  paragraphs,
  bullets,
});

const faqSection = (items, order = 900) => ({
  ...baseSection("faq", order, "Frequently asked questions", "faq"),
  items: items.map(([question, ...answer]) => ({ question, answer })),
});

const changelogSection = (changes, order = 990) => ({
  ...baseSection("changelog", order, "Revision history", "changelog"),
  entries: [{ date: DATE, changes }],
});

function preservedSources(article, type = "sources", order = 980) {
  const existing = article.sections.find((section) =>
    ["sources", "sources-section"].includes(section.type),
  );
  return {
    ...existing,
    id: "sources",
    order,
    title: "Sources and verification",
    type,
    visible: true,
    toc: true,
    verificationChecklist: {
      ...existing.verificationChecklist,
      status: "pending-pc",
      method: "tool",
      verifiedClientVersion: "0.5.4",
      notes: [
        "Published mechanics were checked against the linked current-version database, official patch history, and the named community reference. Exact performance still depends on character gear, map modifiers, and player execution.",
      ],
    },
  };
}

const buildSpecs = {
  "big-monkee-spirit-walker": {
    overview: [
      "Big Monkee is a companion build, not a conventional melee character with a pet attached. Mighty Silverfist is the main damage source; the player creates openings, keeps offerings and companion buffs active, and avoids dragging the beast through bad ground effects.",
      "The build becomes convincing only after Tame Beast, the Spirit Walker companion nodes, and a durable captured beast are working together. Before that point, level with a normal spear or companion package instead of forcing the final rotation on weak links.",
    ],
    keyPoints: [
      "Best for players who want a durable companion to do most of the attacking while they manage positioning and buffs.",
      "Damage upgrades must improve the beast or the effects shared with companions; ordinary player attack damage can be a dead investment.",
      "Mighty Silverfist is the signature target, but the guide remains playable with a sturdy temporary beast while the capture is unavailable.",
    ],
    pros: [
      "A strong companion keeps dealing damage while the player moves through dangerous boss patterns.",
      "Mapping is comfortable once Pounce and Maul reliably reach the next pack.",
      "The setup has clear upgrades: companion level and quality, Spirit Walker nodes, offerings, then defensive gear.",
    ],
    cons: [
      "The final version depends on a specific captured beast and is awkward before the companion package is assembled.",
      "Poor beast pathing or excessive movement can lower real damage even when the character sheet looks improved.",
      "It rewards active buff and positioning management; it is not a completely passive minion build.",
    ],
    playstyle: [
      "Enter a pack behind the beast, let Pounce establish contact, then use the player character to keep enemies grouped and to refresh the effects that empower the companion. Do not sprint several screens ahead: companions lose time when they must repath instead of attacking.",
      "Against bosses, circle near the edge of the beast's attack range. Move for mechanics first, refresh Pain Offering when the arena is safe, and avoid recalling or repositioning the companion during a high-damage Maul sequence.",
    ],
    skills: [
      [
        "Primary companion",
        "Tame Beast",
        "The captured beast supplies the build's sustained damage.",
        ["meat-shield", "feeding-frenzy"],
        "Prioritise gem level, quality, and companion-specific scaling before adding luxury utility.",
      ],
      [
        "Companion mobility",
        "Pounce",
        "Moves the beast into a pack and starts the damage cycle.",
        ["magnified-area", "martial-tempo"],
        "Use once per pack; repeated commands can interrupt better attacks.",
      ],
      [
        "Heavy attack",
        "Maul",
        "Provides the high-impact hit for rares and bosses.",
        ["heavy-swing", "primal-armament"],
        "Save manual timing for priority targets rather than empty ground.",
      ],
      [
        "Buff window",
        "Pain Offering",
        "Creates a temporary offensive window for the companion package.",
        ["persistence", "font-of-rage"],
        "Place it where the boss will remain; recasting during danger costs more damage than it gains.",
      ],
    ],
    ascendancy: [
      [
        "Companion foundation",
        "Take the Spirit Walker node that enables the intended beast relationship before investing in narrow damage bonuses.",
      ],
      [
        "Shared scaling",
        "Add nodes that explicitly affect companions or transfer useful player bonuses. Read each line literally; generic attack modifiers do not automatically apply to the beast.",
      ],
      [
        "Endgame choice",
        "Finish with the branch that improves uptime or survivability for your actual captured beast. Do not copy a node order that assumes different gear or a transformation setup.",
      ],
    ],
    passive: [
      [
        "Campaign",
        "Path through life, resistances, and broad companion damage. A living character with a living beast clears faster than a fragile damage-only tree.",
      ],
      [
        "Early maps",
        "Take companion attack speed, command recovery, and nearby defensive clusters. Fix attribute requirements before spending travel points on distant damage.",
      ],
      [
        "High investment",
        "Move points into jewel sockets and specialised companion scaling only after resistances and recovery are stable in the maps you actually run.",
      ],
    ],
    gear: [
      [
        "Weapon",
        ["Useful granted skill levels", "Companion or offering synergy"],
        "The weapon is a support platform; compare real companion uptime, not player tooltip damage.",
      ],
      [
        "Body armour",
        ["Life", "Elemental resistances", "Armour or evasion"],
        "Use the chest to solve survival before chasing a narrow unique interaction.",
      ],
      [
        "Helmet and gloves",
        ["Life", "Attributes", "Resistances"],
        "These slots are efficient places to meet Strength, Dexterity, or Intelligence requirements.",
      ],
      [
        "Boots",
        ["Movement speed", "Life", "Resistances"],
        "Movement speed is a damage stat when it lets you keep the beast engaged without panic rolling.",
      ],
      [
        "Jewellery",
        ["Resistances", "Life", "Spirit or mana comfort", "Attributes"],
        "Do not buy offensive jewellery while uncapped resistances are causing deaths.",
      ],
      [
        "Jewels",
        ["Companion damage", "Companion attack speed", "Defensive utility"],
        "Jewel efficiency depends on the nearby tree; compare the full socket cost.",
      ],
    ],
    stats: [
      ["Elemental resistances", "Cap them before measuring boss performance."],
      [
        "Maximum life and recovery",
        "You must survive while the companion finishes its attack cycle.",
      ],
      [
        "Companion gem level and quality",
        "These directly improve the part of the build that deals damage.",
      ],
      [
        "Companion attack speed",
        "Reduces dead time between commands and heavy attacks.",
      ],
      [
        "Movement speed",
        "Improves positioning without forcing the beast to repath.",
      ],
      [
        "Player damage",
        "Take only when the modifier explicitly supports the chosen shared-scaling rule.",
      ],
    ],
    upgrades: [
      [
        "Stabilise defenses",
        "Cap resistances and add life on every flexible rare slot.",
      ],
      [
        "Secure the beast",
        "Capture Mighty Silverfist or a verified substitute that survives current content.",
      ],
      [
        "Improve skill package",
        "Raise Tame Beast and the companion command skills before buying marginal rare upgrades.",
      ],
      [
        "Reduce downtime",
        "Add attack speed, command recovery, and offering duration where they improve actual uptime.",
      ],
      [
        "Add luxury scaling",
        "Only then invest in expensive jewels or uniques that amplify the complete loop.",
      ],
    ],
    mapping: [
      "Send the beast into the first dense group with Pounce, follow at a safe distance, and use Maul on rares rather than every white pack. Move diagonally through maps so the companion has a clean path instead of repeatedly crossing walls and doorways.",
      "If clear feels inconsistent, slow down for one map and watch what the beast is doing. Missed commands, pathing around terrain, and outranging the companion are more common causes than insufficient theoretical damage.",
    ],
    bossing: [
      "Start with the beast already positioned, establish the offering window, then spend most of the fight reading the boss. Refresh buffs after a mechanic resolves, not while a telegraphed slam is beginning.",
      "When the companion dies or disengages, restore the loop safely instead of continuing to spend commands into an inactive target. A short reset is better than losing the encounter while trying to force uptime.",
    ],
    variants: [
      [
        "Campaign companion",
        "Any durable available beast",
        "Low",
        "Use broad companion nodes and defensive rares; do not plan around Mighty Silverfist yet.",
      ],
      [
        "Mighty Silverfist core",
        "Tame Beast plus command skills",
        "Medium",
        "The intended mapping setup once the beast and ascendancy package are online.",
      ],
      [
        "Offering-focused endgame",
        "High companion uptime and jewels",
        "High",
        "Adds damage only after defenses and pathing are already reliable.",
      ],
    ],
    troubleshooting: [
      [
        "The beast is often off-screen or idle",
        [
          "Stop moving several screens ahead.",
          "Use Pounce once to establish contact.",
          "Avoid narrow layouts until command timing is comfortable.",
        ],
      ],
      [
        "Boss damage collapses after the opening",
        [
          "Check Pain Offering uptime.",
          "Confirm Maul is targeting the boss rather than an add.",
          "Make sure the beast is alive and not pathing around arena geometry.",
        ],
      ],
      [
        "The character dies while the beast survives",
        [
          "Cap resistances.",
          "Add life and recovery before another damage jewel.",
          "Stand at the side of the boss rather than directly behind the companion.",
        ],
      ],
      [
        "An upgrade changes the player tooltip but not clear speed",
        [
          "Verify that the modifier applies to companions.",
          "Compare command cooldown and attack uptime.",
          "Return the item if it only scales unused player attacks.",
        ],
      ],
    ],
    faq: [
      [
        "Is Mighty Silverfist mandatory?",
        "It is the signature endgame beast, but a durable substitute is better than delaying progression with an empty or under-levelled companion setup.",
      ],
      [
        "Why does the build feel slow in indoor maps?",
        "Companion pathing and repeated command interruptions are usually the problem. Use open layouts while learning the rotation and avoid outranging the beast.",
      ],
      [
        "Should I scale my own attack damage?",
        "Only when the ascendancy or skill text explicitly shares that modifier. Generic player damage is not automatically companion damage.",
      ],
      [
        "What should I upgrade first?",
        "Defensive caps, the captured beast, and companion skill levels come before luxury jewellery or narrow damage jewels.",
      ],
      [
        "Is this a one-button build?",
        "No. Mapping is relaxed, but strong play still uses Pounce, Maul, offerings, and deliberate positioning.",
      ],
    ],
    planner:
      "https://mobalytics.gg/poe-2/builds/big-monkee-tame-beast-spirit-walker",
  },
  "grenade-gemling-legionnaire": {
    overview: [
      "Grenade Gemling is a crossbow build with two separate jobs: fast clearing from Explosive Shot or a compact grenade throw, and planned burst from stacked grenade cooldowns. Treating every skill as the main damage button makes the rotation slower and the sockets less efficient.",
      "Patch 0.5 rewards Gemling quality scaling and gives grenade builds several viable payloads. The practical setup keeps one clear skill, Explosive Grenade and Cluster Grenade for priority targets, and utility such as Oil or Flash Grenade only when it solves a real problem.",
    ],
    keyPoints: [
      "Level with the simplest available crossbow skill, then add grenades as cooldown recovery and extra uses make them reliable.",
      "Do not throw every grenade at once into empty space; preserve at least one charge for the next rare or boss opening.",
      "Crossbow physical damage, projectile skill levels, gem quality, and grenade recovery must be balanced with life, evasion, and capped resistances.",
    ],
    pros: [
      "Excellent pack clear with delayed explosions covering a wide area.",
      "Strong boss burst when several grenade types are sequenced correctly.",
      "Can begin on rare gear and scale through quality, weapon damage, and cooldown investment.",
    ],
    cons: [
      "Fuse timing and cooldown charges punish button mashing.",
      "Dense effects can hide enemy telegraphs and may reduce performance on weaker hardware.",
      "A high-damage crossbow does not compensate for uncapped defenses or poor grenade placement.",
    ],
    playstyle: [
      "Use the fast clear skill while moving, then throw a grenade slightly ahead of dense packs so the fuse resolves where monsters will be. Oil or crowd control belongs before the damaging payload when the target will remain in the area.",
      "On bosses, preload Cluster Grenade and Explosive Grenade during safe windows, let Mirage Archer or the clear skill maintain pressure, and keep one movement path open. Do not stand still waiting for every explosion to resolve.",
    ],
    skills: [
      [
        "Fast clear",
        "Explosive Shot",
        "Kills normal packs without spending the whole grenade package.",
        ["martial-tempo", "primal-armament"],
        "Replace only if the chosen guide variant uses Cluster Grenade as its dedicated mapper.",
      ],
      [
        "Primary burst",
        "Explosive Grenade",
        "Reliable fire conversion and area burst for rares and bosses.",
        ["scattershot", "fire-mastery"],
        "Aim ahead of moving targets and account for fuse time.",
      ],
      [
        "Boss payload",
        "Cluster Grenade",
        "Covers stationary targets with the primary and mini-grenade sequence.",
        ["magnified-area", "heavy-swing"],
        "Best when the boss is committed to an animation.",
      ],
      [
        "Utility",
        "Oil Grenade",
        "Slows enemies and prepares a fire-favoured damage window.",
        ["persistent-ground", "prolonged-duration"],
        "Use only if the build actually ignites or benefits from the control.",
      ],
      [
        "Automation",
        "Mirage Archer",
        "Adds grenade pressure while the player repositions.",
        ["explosive-grenade", "cooldown-recovery"],
        "Its linked payload must match the current gem and Spirit budget.",
      ],
    ],
    ascendancy: [
      [
        "Gem foundation",
        "Take the Gemling node that enables the guide's gem-quality or support structure first.",
      ],
      [
        "Resource efficiency",
        "Add the node that solves the actual bottleneck: attributes, supports, or skill cost. Do not copy a late-game order onto campaign gear.",
      ],
      [
        "Endgame scaling",
        "Finish with quality and broad gem scaling after the grenade links and defenses are stable.",
      ],
    ],
    passive: [
      [
        "Campaign",
        "Take crossbow damage, projectile damage, life, and nearby attributes. Cooldown nodes have little value before grenades are central to the rotation.",
      ],
      [
        "Early maps",
        "Add grenade recovery, area, and evasion while keeping resistances capped after the campaign penalty.",
      ],
      [
        "Endgame",
        "Specialise into the chosen clear/boss split and remove temporary attribute points only after gear replaces them.",
      ],
    ],
    gear: [
      [
        "Crossbow",
        [
          "High physical damage",
          "+levels to projectile skills",
          "Attack speed",
          "Useful grenade modifier",
        ],
        "The weapon drives attack-based grenade damage; compare the whole roll, not one headline affix.",
      ],
      [
        "Body armour",
        ["Evasion", "Life", "Resistances"],
        "A large evasion base is valuable only when life and elemental caps are also solved.",
      ],
      [
        "Helmet and gloves",
        ["Life", "Resistances", "Attributes", "Accuracy if required"],
        "Use rare slots to satisfy the many stat requirements of a multi-skill package.",
      ],
      [
        "Boots",
        ["Movement speed", "Life", "Resistances"],
        "Movement speed lets you throw once and leave the blast zone.",
      ],
      [
        "Jewellery",
        ["Life", "Resistances", "Mana comfort", "Attributes"],
        "Damage jewellery is a later upgrade after the rotation can be sustained.",
      ],
      [
        "Charms",
        ["Ailment answer", "Stun protection", "Emergency recovery"],
        "Select for the content that causes deaths rather than a generic damage estimate.",
      ],
    ],
    stats: [
      [
        "Elemental resistances",
        "Reach the cap before adding offensive corruption or runes.",
      ],
      [
        "Crossbow physical damage",
        "Most attack-based grenade scaling begins with weapon damage.",
      ],
      [
        "Projectile skill levels",
        "Improves several core skills at once when the affix applies.",
      ],
      [
        "Gem quality",
        "A defining Gemling multiplier, but only after the correct quality effects are confirmed.",
      ],
      [
        "Cooldown recovery and extra uses",
        "Smooths the rotation and reduces empty boss windows.",
      ],
      [
        "Life, evasion, and deflection",
        "Layer defenses rather than relying on evasion alone.",
      ],
    ],
    upgrades: [
      [
        "Cap defenses",
        "Fix resistances, life, and movement speed on inexpensive rares.",
      ],
      [
        "Upgrade the crossbow",
        "Buy the largest real weapon-damage improvement that does not break attributes or resistances.",
      ],
      [
        "Complete grenade links",
        "Add supports and quality to Explosive and Cluster Grenade.",
      ],
      [
        "Improve charge economy",
        "Add cooldown recovery or extra uses until the rotation no longer stalls.",
      ],
      [
        "Add specialised uniques",
        "Use Constricting Command or other variants only when their conditions remain active in your actual play.",
      ],
    ],
    mapping: [
      "Clear with Explosive Shot or the selected fast payload, throw grenades ahead of the character, and keep moving before the fuse expires. Use Cluster Grenade on dense rares instead of spending it on scattered normal enemies.",
      "If explosions happen behind the pack, aim at the monster path rather than the current position and reduce unnecessary projectile speed changes that alter landing behaviour.",
    ],
    bossing: [
      "Open with Oil or control if used, stack Cluster and Explosive Grenades during a long animation, then attack or move while the fuses resolve. Repeat only after charges recover; random extra throws often reduce the next burst window.",
      "For mobile bosses, shorten the sequence. One grenade that lands is worth more than four placed where the boss used to be.",
    ],
    variants: [
      [
        "Campaign crossbow",
        "Explosive Grenade plus a simple clear skill",
        "Low",
        "Few buttons and rare gear; transition gradually.",
      ],
      [
        "Balanced mapper",
        "Explosive Shot clear plus grenade burst",
        "Medium",
        "Best general-purpose split for progression.",
      ],
      [
        "Cluster specialist",
        "Cluster and Explosive Grenade with quality scaling",
        "High",
        "Higher burst and effect density; requires cooldown and strong weapon gear.",
      ],
    ],
    troubleshooting: [
      [
        "Grenades explode after the pack has moved",
        [
          "Aim ahead of enemies.",
          "Use control or Oil first.",
          "Avoid stacking projectile-speed changes without retesting landing distance.",
        ],
      ],
      [
        "Boss rotation runs out of buttons",
        [
          "Stop spending every charge on cooldown.",
          "Separate clear and burst skills.",
          "Add cooldown recovery only after confirming the bottleneck.",
        ],
      ],
      [
        "Damage is high but deaths are frequent",
        [
          "Cap resistances.",
          "Add life to every flexible slot.",
          "Move immediately after throwing instead of watching the explosion.",
        ],
      ],
      [
        "The build feels expensive too early",
        [
          "Use a rare crossbow.",
          "Delay optional uniques.",
          "Invest in gem links and quality before luxury jewellery.",
        ],
      ],
    ],
    faq: [
      [
        "Which grenade should clear maps?",
        "Use the fastest reliable payload in your variant; many players keep Explosive Shot for normal packs and reserve grenades for dense targets.",
      ],
      [
        "Is Oil Grenade mandatory?",
        "No. It is valuable when the build ignites or needs control, but it is a wasted button if neither interaction matters.",
      ],
      [
        "Why use multiple grenade skills?",
        "Their charges and effects can cover different jobs, allowing a planned burst without waiting on one cooldown.",
      ],
      [
        "What is the first expensive upgrade?",
        "Usually a materially stronger crossbow or a complete core link, not a conditional unique.",
      ],
      [
        "Can this league-start?",
        "Yes, if the campaign uses accessible crossbow skills and transitions only as grenade recovery and Gemling nodes come online.",
      ],
    ],
    planner:
      "https://mobalytics.gg/poe-2/builds/grenade-gemling-leveling-and-endgame",
  },
  "lightning-arrow-deadeye": {
    overview: [
      "Lightning Arrow Deadeye is a fast bow mapper built around chaining clear, Lightning Rod interaction, and a separate single-target routine. The skill can feel excellent in open maps while still underperforming on bosses if the player treats the mapping link as the entire build.",
      "Start non-critical, secure a strong elemental bow and accurate attacks, then move into critical scaling only when gear supplies enough critical chance and damage without sacrificing life and resistances.",
    ],
    keyPoints: [
      "Lightning Arrow handles packs; Lightning Rod and the selected boss skill handle stationary priority targets.",
      "Deadeye mirages reward firing while moving, but they do not remove the need to maintain accuracy, defenses, and boss setup.",
      "Projectile behaviour, attack speed, and bow damage usually improve real mapping before expensive critical multipliers.",
    ],
    pros: [
      "Very fast clear in open layouts.",
      "Smooth movement-oriented play with ranged safety.",
      "Clear upgrade path from non-crit campaign gear to a critical endgame setup.",
    ],
    cons: [
      "Single target needs a separate setup and correct Lightning Rod placement.",
      "Fragile gear choices are punished by unavoidable hits and cramped arenas.",
      "High-end critical gear is expensive and should not be copied prematurely.",
    ],
    playstyle: [
      "Fire through the front edge of a pack and move with the projectiles rather than stopping at maximum range. Place Lightning Rods where dense or durable enemies will remain, then hit through that area to multiply the interaction.",
      "For bosses, establish rods, apply electrocution or a mark if the variant uses them, and attack during a stable animation. Rebuild the setup after the boss relocates; shooting old rods on empty ground is the most common damage loss.",
    ],
    skills: [
      [
        "Map clear",
        "Lightning Arrow",
        "Chains lightning through packs and activates the build's fast-clear identity.",
        ["martial-tempo", "primal-armament", "chain"],
        "Use a non-crit support package until the character can sustain a real critical setup.",
      ],
      [
        "Single-target anchor",
        "Lightning Rod",
        "Creates the target area that converts repeated bow hits into boss damage.",
        ["scattershot", "conduction"],
        "Place under a committed target and refresh after movement.",
      ],
      [
        "Control",
        "Electrocuting Arrow",
        "Builds electrocution on priority enemies and creates a safer damage window.",
        ["electrocute", "persistence"],
        "Use when the boss or rare is dangerous enough to justify the setup time.",
      ],
      [
        "Persistent clear",
        "Herald of Thunder",
        "Extends lightning clear after the first shock-based kill.",
        ["lightning-mastery", "precision"],
        "Keep only if Spirit and shock consistency support it.",
      ],
      [
        "Mobility or mirage",
        "Mirage Archer",
        "Maintains attacks while repositioning in variants built around the interaction.",
        ["lightning-arrow", "cooldown-recovery"],
        "Match the linked skill and Spirit cost to the referenced build version.",
      ],
    ],
    ascendancy: [
      [
        "Projectile foundation",
        "Take the Deadeye node that directly improves the chosen projectile behaviour first.",
      ],
      [
        "Movement and mirage",
        "Add the branch that supports mobile attacks or mirages once the main link is functional.",
      ],
      [
        "Endgame choice",
        "Use the final points to solve bossing or survivability; do not assume the fastest mapper node is also the safest progression node.",
      ],
    ],
    passive: [
      [
        "Campaign",
        "Take bow damage, projectile damage, accuracy, and life. Use temporary attribute nodes instead of wearing weak gear solely for requirements.",
      ],
      [
        "Early maps",
        "Add shock or lightning scaling, movement, and defensive clusters. Stay non-crit until the bow and quiver justify the transition.",
      ],
      [
        "Critical transition",
        "Respec into critical chance and multiplier together; a half-finished critical tree often loses damage and consistency.",
      ],
      [
        "Endgame",
        "Add jewel sockets and weapon-set-specific boss nodes only after the basic tree survives the intended content.",
      ],
    ],
    gear: [
      [
        "Bow",
        [
          "High combined elemental damage",
          "Attack speed",
          "Critical chance for crit variant",
        ],
        "The bow is the largest damage slot; calculate the total useful elemental damage rather than chasing one element.",
      ],
      [
        "Quiver",
        ["Flat damage to attacks", "Projectile or attack modifiers", "Life"],
        "A balanced quiver can outperform a flashy offensive roll that removes life.",
      ],
      [
        "Body armour",
        ["Evasion", "Life", "Resistances"],
        "Do not trade the entire defensive layer for a minor clear-speed gain.",
      ],
      [
        "Helmet and gloves",
        ["Life", "Resistances", "Accuracy", "Attributes"],
        "Use these slots to keep hit chance and requirements stable during upgrades.",
      ],
      [
        "Boots",
        ["Movement speed", "Life", "Resistances"],
        "Fast boots make the build safer and preserve Deadeye tempo.",
      ],
      [
        "Jewellery",
        ["Elemental damage to attacks", "Life", "Resistances", "Mana comfort"],
        "Add critical stats only after the build is truly critical.",
      ],
    ],
    stats: [
      ["Elemental resistances", "Cap before pushing map modifiers."],
      [
        "Bow elemental damage",
        "The primary source for an elemental attack build.",
      ],
      [
        "Accuracy",
        "Missed attacks lose both direct damage and Lightning Rod interactions.",
      ],
      [
        "Attack speed",
        "Improves clear feel and rod activation, within mana limits.",
      ],
      [
        "Projectile behaviour",
        "Chain, additional projectiles, and speed change coverage; test rather than stacking blindly.",
      ],
      [
        "Critical chance and multiplier",
        "Take as a pair after the non-crit foundation is complete.",
      ],
    ],
    upgrades: [
      [
        "Campaign bow",
        "Use the strongest practical elemental bow and keep accuracy healthy.",
      ],
      [
        "Map defenses",
        "Cap resistances and add life before buying a pure damage quiver.",
      ],
      [
        "Complete rod setup",
        "Fix support links and placement routine for bosses.",
      ],
      [
        "High-end bow",
        "Upgrade total elemental damage and attack speed together.",
      ],
      [
        "Critical conversion",
        "Respec tree, bow, quiver, and jewellery as one planned change rather than one item at a time.",
      ],
    ],
    mapping: [
      "Fire once or twice through each pack, let Herald or mirages finish stragglers, and keep moving. Place Lightning Rod only for dense rares or mechanics that hold enemies in one area.",
      "Prefer open layouts while gear is developing. In narrow rooms, approach corners diagonally so chained projectiles can find targets without exposing the character to the full pack.",
    ],
    bossing: [
      "Place rods under the boss, apply the control or mark layer, then fire the dedicated single-target sequence while the boss is stationary. When the boss moves, stop and rebuild rather than continuing a visually busy but empty rotation.",
      "Keep enough mana and attack time for movement. A maximum-damage support that causes the character to stall is worse than a slightly lower link with consistent uptime.",
    ],
    variants: [
      [
        "Non-crit progression",
        "Elemental bow, Lightning Arrow and Lightning Rod",
        "Low",
        "Reliable and easier to gear; recommended for campaign and early maps.",
      ],
      [
        "Hybrid endgame",
        "Improved bow and partial critical investment",
        "Medium",
        "Transition stage only when critical chance is already consistent.",
      ],
      [
        "Critical farmer",
        "High-end bow, quiver, jewels and complete boss setup",
        "High",
        "Fastest ceiling but least forgiving of missing defenses or accuracy.",
      ],
    ],
    troubleshooting: [
      [
        "Maps are fast but bosses take too long",
        [
          "Use Lightning Rod correctly.",
          "Add a dedicated boss link.",
          "Confirm the boss remains inside the rod area.",
        ],
      ],
      [
        "Damage varies wildly",
        [
          "Check accuracy.",
          "Verify shock and critical consistency.",
          "Avoid a partial critical transition.",
        ],
      ],
      [
        "Mana empties during burst",
        [
          "Reduce attack spam.",
          "Add mana recovery or cost efficiency.",
          "Replace one expensive support until gear improves.",
        ],
      ],
      [
        "The character dies in cramped maps",
        [
          "Cap resistances and add life.",
          "Choose open layouts.",
          "Stop firing from doorways where projectiles and movement are constrained.",
        ],
      ],
    ],
    faq: [
      [
        "When should I switch to critical strikes?",
        "When the bow, quiver, tree, and jewellery can provide consistent critical chance together without breaking defenses.",
      ],
      [
        "Is Lightning Rod optional?",
        "For casual mapping it can be skipped, but it is a major part of reliable single-target damage.",
      ],
      [
        "Why does my tooltip not match clear speed?",
        "Chain coverage, accuracy, rod placement, and movement uptime affect real damage more than one tooltip line.",
      ],
      [
        "Which map layouts are best?",
        "Open layouts with long sight lines and room to move alongside projectiles.",
      ],
      [
        "What should I buy first?",
        "A meaningful bow upgrade after resistances, life, and accuracy are secure.",
      ],
    ],
    planner: "https://mobalytics.gg/poe-2/builds/lightning-arrow-farmer-fubgun",
  },
};

function buildSections(article, spec) {
  let order = 10;
  const next = () => (order += 10);
  const skillGroups = spec.skills.map(
    ([label, displayName, role, , note], index) => ({
      label,
      skills: [
        {
          displayName,
          skillId: article.mainSkillIds[index] ?? article.mainSkillIds[0],
          role,
          supportSkillIds: [],
          notes: [note],
          whyUse: [role],
          whenReplace: [],
          mappingBossingDiff: [],
        },
      ],
    }),
  );
  return [
    narrative(
      "overview",
      order,
      "Build overview",
      "overview",
      spec.overview,
      spec.keyPoints,
    ),
    {
      ...baseSection(
        "pros-cons",
        next(),
        "Strengths and tradeoffs",
        "pros-cons",
      ),
      pros: spec.pros,
      cons: spec.cons,
    },
    narrative(
      "playstyle",
      next(),
      "How the build actually plays",
      "playstyle",
      spec.playstyle,
    ),
    {
      ...baseSection("leveling", next(), "Leveling and transition", "leveling"),
      steps: spec.passive.map(([label, body]) => ({ label, body: [body] })),
    },
    {
      ...baseSection("skills", next(), "Skills and links", "skills"),
      groups: skillGroups,
    },
    {
      ...baseSection("ascendancy", next(), "Ascendancy order", "ascendancy"),
      steps: spec.ascendancy.map(([label, body]) => ({ label, body: [body] })),
    },
    {
      ...baseSection(
        "passive-tree",
        next(),
        "Passive tree priorities",
        "passive-tree",
      ),
      steps: spec.passive.map(([label, body]) => ({ label, body: [body] })),
    },
    {
      ...baseSection("gear", next(), "Equipment by slot", "gear"),
      slots: spec.gear.map(([slot, priorities, note]) => ({
        slot,
        recommendations: [],
        notes: [note],
        statPriorities: priorities.map((label, index) => ({
          label,
          reason:
            index === 0
              ? "Highest-impact stat for this slot."
              : "Add after the earlier priorities are stable.",
          tier:
            index === 0 ? "required" : index < 3 ? "recommended" : "optional",
        })),
      })),
    },
    {
      ...baseSection(
        "stat-priority",
        next(),
        "Global stat priority",
        "stat-priority",
      ),
      priorities: spec.stats.map(([label, reason]) => ({ label, reason })),
    },
    {
      ...baseSection(
        "upgrade-priority",
        next(),
        "Upgrade order",
        "upgrade-priority",
      ),
      steps: spec.upgrades.map(([label, body]) => ({
        label,
        body: [body],
        upgrade: body,
      })),
    },
    narrative("mapping", next(), "Mapping rotation", "mapping", spec.mapping),
    narrative("bossing", next(), "Bossing rotation", "bossing", spec.bossing),
    {
      ...baseSection(
        "variants",
        next(),
        "Progression variants",
        "comparison-table",
      ),
      caption:
        "Choose the version that matches current gear, not the most expensive finished planner.",
      columns: ["Core package", "Budget", "When to use"],
      rows: spec.variants.map(([label, core, budget, use]) => ({
        label,
        cells: [core, budget, use],
      })),
    },
    {
      ...baseSection(
        "troubleshooting",
        next(),
        "Troubleshooting",
        "troubleshooting",
      ),
      problems: spec.troubleshooting.map(([symptom, checks]) => ({
        symptom,
        checks,
      })),
    },
    faqSection(spec.faq, next()),
    {
      ...baseSection(
        "build-planner",
        next(),
        "Reference planner",
        "build-planner",
      ),
      creatorName: "Named community build reference",
      creatorUrl: spec.planner,
      note: "Use the linked current-version planner for exact gem sockets and tree exports. This article explains the decisions so upgrades remain understandable when the planner changes.",
    },
    preservedSources(article, "sources", next()),
    changelogSection(
      [
        "Rebuilt the short launch version into a full progression guide with skills, gear, passive priorities, variants, rotations, and troubleshooting.",
      ],
      next(),
    ),
  ];
}

const skillSpecs = {
  tornado: {
    direct: [
      "Cast Tornado on top of the pack or boss path, then feed it an elemental ground surface when the build wants the corresponding debuff and extra elemental damage.",
      "The skill is a persistent control and damage-over-time zone. It is not a projectile and should not be scaled like Tornado Shot.",
    ],
    properties: [
      ["Gem tier", "11", "A Strength/Intelligence active skill."],
      [
        "Base duration",
        "8 seconds",
        "Quality can add duration and raise the Tornado limit.",
      ],
      [
        "Base radius",
        "3 metres",
        "Area modifiers change coverage but do not replace correct placement.",
      ],
      ["Base limit", "1 Tornado", "Quality can allow additional Tornadoes."],
      [
        "Damage model",
        "Physical non-ailment damage over time",
        "Spell Damage modifiers apply to the debuff damage over time.",
      ],
      [
        "Elemental interaction",
        "Absorbs allied elemental ground",
        "The Tornado copies that surface's debuff and gains damage of the matching element.",
      ],
    ],
    requirements: [
      "Needs enough Strength and Intelligence for the chosen gem level.",
      "Works best when another skill reliably creates fire, cold, or lightning ground.",
      "Requires the target to remain inside or near the moving storm long enough for duration scaling to matter.",
    ],
    mechanics: [
      "Tornado creates one moving storm that pulls nearby enemies and deals physical damage over time. Because the damage is a debuff rather than a sequence of hits, hit-only bonuses, critical strike modifiers, and on-hit effects do not scale its base physical component.",
      "When the Tornado overlaps an allied elemental ground surface, it absorbs that surface. Enemies inside receive the absorbed surface's debuff, and the storm adds damage of that element. Choose the ground effect for the build's damage plan rather than trying to maintain every element.",
      "The storm's control is strongest when placed slightly ahead of moving enemies. Casting behind a pack wastes both the pull and the duration.",
    ],
    table: [
      [
        "Physical DoT",
        "Spell Damage, physical damage, damage over time",
        "Critical strike, attack damage, projectile damage",
      ],
      [
        "Absorbed element",
        "Matching elemental and generic damage where applicable",
        "A different element that the build does not scale",
      ],
      [
        "Coverage",
        "Area of effect, duration, additional Tornado limit",
        "Repeated recasts that replace a well-positioned storm",
      ],
      [
        "Control",
        "Placement and pull uptime",
        "Raw damage supports that shrink practical coverage",
      ],
    ],
    supports: [
      [
        "Prolonged Duration",
        "Extends damage, pull, and absorbed-ground uptime; strongest when enemies stay in the area.",
        "core",
      ],
      [
        "Magnified Area",
        "Improves pack coverage and makes surface absorption easier.",
        "core",
      ],
      [
        "Brutality",
        "Strong for a pure physical version but disables the value of elemental damage; do not use in an absorption-focused setup.",
        "situational",
      ],
      [
        "Potent Exposure",
        "Useful only when the absorbed ground applies Exposure that the build can exploit.",
        "situational",
      ],
      [
        "Efficiency",
        "Helps high-level mana cost when repeated placement is required.",
        "optional",
      ],
    ],
    mapping: [
      "Create the desired elemental ground in the path of the next pack, cast Tornado so it overlaps the surface, then move with the storm instead of recasting on every surviving monster.",
      "In open maps, lead the pack. In narrow maps, place the storm at doorways or corners where the pull can group enemies without dragging the player into danger.",
    ],
    bossing: [
      "Place Tornado after the boss commits to an animation, then refresh the ground surface only when it expires or the boss relocates. Duration is valuable only if the storm remains on target.",
      "For highly mobile bosses, use shorter damage windows and prioritise area or extra-limit quality over a long theoretical duration that never connects.",
    ],
    useCases: [
      "Physical damage-over-time casters that need grouping.",
      "Elemental-ground builds that want to carry a surface debuff through a moving encounter.",
      "Support-oriented setups that value pull and control more than Tornado's standalone damage.",
    ],
    mistakes: [
      "Scaling critical strike or projectile damage because the visual looks like a spell projectile.",
      "Using Brutality while expecting absorbed elemental damage to remain valuable.",
      "Casting the storm behind enemies instead of on their route.",
      "Refreshing too early and replacing useful duration with another travel period.",
    ],
    troubleshooting: [
      [
        "The Tornado deals little damage",
        "Confirm the build scales non-ailment damage over time and the intended element, not hit damage.",
        "Check whether the target remains within the radius.",
      ],
      [
        "The ground interaction is inconsistent",
        "Create the surface first and place Tornado directly over it.",
        "Verify the ground is allied and still active.",
      ],
      [
        "Clear feels slower after adding duration",
        "Extra duration cannot fix poor travel direction.",
        "Try area, limit quality, or better placement before adding more duration.",
      ],
    ],
    faq: [
      [
        "Does Tornado hit?",
        "Its listed physical component is damage over time, so hit-only and critical modifiers are not the foundation of the skill.",
      ],
      [
        "Can it absorb more than one element?",
        "The database lists damage for each absorbed elemental type, but practical builds should plan around ground effects they can create and scale reliably.",
      ],
      [
        "Is Brutality always best?",
        "No. It suits a pure physical version but conflicts with the elemental-ground identity.",
      ],
      [
        "Why use duration?",
        "It increases the time the storm can pull, damage, and carry the absorbed debuff, provided targets remain nearby.",
      ],
      [
        "Is it the same as Tornado Shot?",
        "No. Tornado is a spell-based persistent storm; Tornado Shot is a separate attack interaction.",
      ],
    ],
  },
  "ball-lightning": {
    direct: [
      "Fire the slow orb through or beside a target so its repeated bolts remain in range as long as possible. The orb itself does not hit; the nearby lightning discharges do.",
      "Projectile speed is a tuning stat: slower travel can add time near a boss, while faster travel improves reach and mapping comfort.",
    ],
    properties: [
      ["Gem tier", "11", "An Intelligence active spell."],
      [
        "Cast time",
        "1.00 second",
        "Can be used while moving with the skill's movement penalty.",
      ],
      [
        "Bolt interval",
        "0.2 seconds",
        "An enemy in range can be targeted repeatedly as the orb travels.",
      ],
      [
        "Target radius",
        "1.8 metres",
        "Quality can increase the targeting radius.",
      ],
      [
        "Projectile speed",
        "4 metres per second",
        "Quality can reduce speed; projectile-speed modifiers change contact time.",
      ],
      [
        "Fire Infusion",
        "Consumed when available",
        "Creates ignited ground and an end explosion in addition to the lightning behaviour.",
      ],
    ],
    requirements: [
      "Needs Intelligence and enough mana for a sustained or repeated cast pattern.",
      "Single-target performance depends on placing a slow path close to the boss.",
      "Fire-Infused scaling is a separate branch; do not assume lightning supports improve the fire explosion or ignited ground.",
    ],
    mechanics: [
      "Ball Lightning passes through enemies without the ball itself dealing a hit. Its bolts select enemies within the listed radius every 0.2 seconds, which makes travel path and speed central to real damage.",
      "A large target or a target moving beside the projectile can remain in range for several discharges. Additional projectiles improve coverage, but they do not guarantee that every orb will repeatedly target the same enemy.",
      "When a Fire Infusion is consumed, the projectile slows over time, lays ignited ground, and explodes after dissipating. That fire package has its own critical chance and damage values and should be treated as a deliberate hybrid choice.",
    ],
    table: [
      [
        "Slow projectile",
        "More time near a stationary boss",
        "Shorter reach and slower map coverage",
      ],
      [
        "Fast projectile",
        "Better screen coverage",
        "Fewer possible bolt intervals near one target",
      ],
      [
        "More area or target radius",
        "Easier multi-target coverage",
        "Does not increase bolt frequency by itself",
      ],
      [
        "Additional projectiles",
        "Wider coverage and more paths",
        "May spread away from a single target",
      ],
      [
        "Fire Infusion",
        "Ignited ground and final fire explosion",
        "Requires fire scaling and reliable infusion generation",
      ],
    ],
    supports: [
      [
        "Considered Casting",
        "Strong self-cast damage when the cast-speed loss remains comfortable.",
        "core",
      ],
      [
        "Magnified Area",
        "Increases practical target coverage around each orb.",
        "core",
      ],
      [
        "Lightning Attunement",
        "Favours the pure lightning version while reducing other elements.",
        "core",
      ],
      [
        "Projectile Acceleration",
        "Mapping option; faster travel can reduce boss contact time.",
        "situational",
      ],
      [
        "Multishot",
        "Adds coverage but carries speed and damage tradeoffs that must be tested.",
        "situational",
      ],
    ],
    mapping: [
      "Cast across the pack's movement line rather than directly at its front edge. One well-angled orb can keep discharging while the character moves to the next group.",
      "Use faster projectiles or additional projectiles only when coverage is the bottleneck. If normal enemies already die, spend sockets on mana comfort or a boss-specific link.",
    ],
    bossing: [
      "Aim so the projectile travels through the boss's centre line or along its movement. Recast after it leaves the targeting radius, not simply whenever the cast animation is available.",
      "Against a stationary target, slower projectile speed and controlled casting can outperform frantic spam because more bolts remain eligible to fire.",
    ],
    useCases: [
      "Lightning self-cast builds that scale repeated hits and shock.",
      "Trigger or utility setups that need a sustained projectile in an area.",
      "Hybrid Fire Infusion builds prepared to scale the explosion and ground effect separately.",
    ],
    mistakes: [
      "Assuming the visible orb hits enemies.",
      "Stacking projectile speed for bosses without checking lost contact time.",
      "Expecting additional projectiles to shotgun one target automatically.",
      "Using a Fire Infusion without any fire or ignite plan.",
    ],
    troubleshooting: [
      [
        "Boss damage is lower than mapping damage",
        "Slow or redirect the projectile so the boss stays within 1.8 metres.",
        "Stop casting from maximum range.",
      ],
      [
        "The skill consumes too much mana",
        "Use fewer deliberate casts and add cost efficiency.",
        "Remove a support whose multiplier is not improving the intended component.",
      ],
      [
        "Fire Infusion feels weak",
        "Separate the lightning, explosion, and ignited-ground scaling.",
        "Confirm the build can generate the infusion often enough to justify the sockets.",
      ],
    ],
    faq: [
      [
        "Does the ball itself hit?",
        "No. Nearby bolts are the damaging lightning hits.",
      ],
      [
        "Is slower projectile speed always better?",
        "No. It helps stationary single targets but can make mapping and target acquisition worse.",
      ],
      [
        "Can one enemy be hit repeatedly?",
        "Yes, while it remains inside the bolt targeting radius across multiple 0.2-second intervals.",
      ],
      [
        "Does area increase bolt frequency?",
        "No. It improves coverage; the listed interval remains the same.",
      ],
      [
        "Should every build use Fire Infusion?",
        "Only builds that can generate it and scale the added fire package without weakening their core lightning plan.",
      ],
    ],
  },
  "gas-grenade": {
    direct: [
      "Throw Gas Grenade where enemies will remain, then either let the cloud poison or detonate it with a burning effect or Detonator skill for a fire explosion.",
      "Choose one main job—poison cloud, fire detonation, or utility. A link split across all three usually underperforms a focused setup.",
    ],
    properties: [
      ["Gem tier", "5", "A Strength/Dexterity crossbow attack."],
      [
        "Cooldown",
        "3 seconds with 3 uses",
        "Quality can improve cooldown recovery.",
      ],
      [
        "Impact fuse",
        "2 seconds",
        "The grenade bounces and follows its detonation timer.",
      ],
      [
        "Cloud duration",
        "6 seconds",
        "Persistent Ground supports can extend control and poison coverage.",
      ],
      ["Cloud limit", "6", "Throwing beyond the limit replaces older clouds."],
      [
        "Cloud growth",
        "20% more radius per second, up to 80%",
        "A fresh cloud has less coverage than a mature one.",
      ],
      [
        "Detonation",
        "Burning effects or Detonator skills",
        "Converts the explosion component to fire damage.",
      ],
    ],
    requirements: [
      "Requires a crossbow and enough Strength/Dexterity.",
      "Needs a reliable plan for cooldown charges and landing delayed grenades.",
      "Fire-detonation versions need a dependable igniter or Detonator; poison versions need poison and chaos scaling instead.",
    ],
    mechanics: [
      "The grenade's impact creates a poison cloud after the fuse. The cloud does not hit, but poisons as though it hit, so its ailment scaling differs from the initial impact and later fire explosion.",
      "The cloud grows over time and lasts six seconds. Immediate detonation trades that growing area and poison uptime for a fire burst, so the correct timing depends on whether the build values poison, crowd control, or fire damage.",
      "Only six poison clouds can be active. Extra throws can replace useful established clouds and waste cooldown charges.",
    ],
    table: [
      [
        "Poison cloud",
        "Chaos, poison, duration, persistent area",
        "Do not detonate immediately",
      ],
      [
        "Fire explosion",
        "Weapon damage, fire conversion, area, reliable igniter",
        "Detonate when the target is inside",
      ],
      [
        "Utility cloud",
        "Duration, area, cooldown recovery",
        "Use to control packs or enable another skill",
      ],
      [
        "Boss preload",
        "Multiple charges before a stationary phase",
        "Respect the six-cloud limit and boss movement",
      ],
    ],
    supports: [
      [
        "Second Wind",
        "Adds charge flexibility when the rotation regularly empties all uses.",
        "core",
      ],
      [
        "Persistent Ground",
        "Extends cloud uptime for poison or utility versions.",
        "core",
      ],
      [
        "Fire Mastery",
        "For a dedicated detonation build, not a pure poison setup.",
        "situational",
      ],
      [
        "Cooldown Recovery",
        "Improves sustained availability after the base link is functional.",
        "situational",
      ],
      [
        "Long Fuse",
        "Changes placement timing and can prevent premature detonation in specialised setups.",
        "optional",
      ],
    ],
    mapping: [
      "Throw ahead of the pack, not behind it. For fire versions, ignite or detonate after monsters enter the cloud. For poison versions, allow the cloud to grow and move enemies through it.",
      "Do not spend all three uses on the first small group. One charge in reserve keeps the build responsive when a rare or fast pack appears.",
    ],
    bossing: [
      "Preload clouds during a long animation and trigger the chosen detonation only while the boss is still inside. If the boss teleports frequently, use fewer throws per window.",
      "Track whether old clouds are still active. Replacing six mature clouds with fresh off-target clouds lowers both poison uptime and control.",
    ],
    useCases: [
      "Grenade builds using Oil or another burning effect for fire detonation.",
      "Poison crossbow builds that scale the non-hit cloud behaviour.",
      "Utility setups needing a persistent growing area and delayed burst.",
    ],
    mistakes: [
      "Mixing poison and fire supports without enough scaling for either.",
      "Throwing directly at a fast enemy instead of its path.",
      "Ignoring the six-cloud limit.",
      "Detonating a poison-focused cloud immediately.",
    ],
    troubleshooting: [
      [
        "Clouds form behind enemies",
        "Lead the target and account for the fuse.",
        "Use control or an adhesive support if compatible with the plan.",
      ],
      [
        "The fire explosion never occurs",
        "Confirm the activating effect is burning or a valid Detonator.",
        "Make sure it reaches the cloud rather than only the enemy.",
      ],
      [
        "Boss damage stalls after one burst",
        "Preserve charges and add cooldown recovery.",
        "Use a filler attack while charges recover.",
      ],
    ],
    faq: [
      [
        "Does the cloud hit?",
        "No. It poisons as though hitting, which matters for hit-only effects.",
      ],
      [
        "How many clouds can exist?",
        "Six according to the current skill data.",
      ],
      [
        "Should I ignite every cloud?",
        "Only in a fire-detonation version. Poison versions usually want the cloud to persist.",
      ],
      [
        "Why does a fresh cloud look small?",
        "Its radius grows over time up to the listed cap.",
      ],
      [
        "Is Scattershot always good?",
        "No. More grenades change spread, charge use, and placement; test whether they land where the target remains.",
      ],
    ],
  },
  "lightning-spear": {
    direct: [
      "Throw the main spear into a pack or priority target. On impact it releases five lightning bolts; with a Frenzy Charge, the main spear splits toward three targets before each copy bursts.",
      "Build around charge uptime for mapping coverage, but do not assume the consumed-charge benefit is a raw single-target multiplier in every arena.",
    ],
    properties: [
      ["Gem tier", "3", "A Dexterity spear attack."],
      [
        "Attack speed",
        "60% of base",
        "The deliberate animation makes timing and positioning important.",
      ],
      [
        "Main conversion",
        "80% physical to lightning",
        "The main spear retains a physical portion.",
      ],
      [
        "Bolt conversion",
        "100% physical to lightning",
        "Secondary bolts are fully lightning.",
      ],
      ["Secondary bolts", "5", "Quality can add bolts."],
      [
        "Frenzy Charge effect",
        "Splits main spear toward 3 targets",
        "The charge changes coverage and creates multiple burst origins.",
      ],
      [
        "Shock",
        "Main spear 100% more chance; bolts 200% more chance",
        "Shock reliability is a core identity, not proof of a fixed damage increase.",
      ],
    ],
    requirements: [
      "Requires a spear and enough Dexterity.",
      "Charge-focused play needs a reliable Frenzy Charge generator before Lightning Spear consumes them.",
      "Modifiers to projectile count affect the maximum secondary lightning bolts, not every part of the main spear behaviour.",
    ],
    mechanics: [
      "The main spear is a projectile attack with partial lightning conversion. When it hits, secondary bolts target enemies within five metres. The spear itself cannot pierce, fork, chain, or return, while the secondary projectile rules must be evaluated separately.",
      "Consuming a Frenzy Charge makes the main spear split toward three targets on impact. This is primarily a coverage multiplier; on a lone boss, the number of valid split targets and burst positions determines the real benefit.",
      "The skill has enhanced shock chance on both layers. Scale weapon damage, attack accuracy, and lightning effects before adding elaborate charge tech.",
    ],
    table: [
      [
        "Main spear",
        "80% conversion, partial physical",
        "Cannot pierce, fork, chain, or return",
      ],
      [
        "Lightning bolts",
        "100% conversion, five base projectiles",
        "Target enemies within five metres",
      ],
      ["No Frenzy Charge", "One burst origin", "Consistent and cheap"],
      [
        "Frenzy Charge consumed",
        "Splits toward three targets",
        "Best in packs or multi-target encounters",
      ],
      [
        "Additional projectiles",
        "Raises maximum bolt count",
        "Does not turn the main spear into generic multishot",
      ],
    ],
    supports: [
      [
        "Lightning Mastery",
        "Improves a focused lightning version after conversion is understood.",
        "core",
      ],
      [
        "Rapid Attacks",
        "Offsets the 60%-of-base attack speed when mana and animation safety allow.",
        "core",
      ],
      [
        "Magnified Area",
        "Improves burst coverage around impact points.",
        "core",
      ],
      [
        "Charge Profusion",
        "Useful only if it materially stabilises Frenzy Charge generation.",
        "situational",
      ],
      [
        "Chain",
        "Evaluate against the actual secondary bolt compatibility; it cannot change the main spear's explicit restriction.",
        "situational",
      ],
    ],
    mapping: [
      "Generate a Frenzy Charge before dense packs, aim the main spear at a central target, and let the split create several bolt origins. Do not consume charges on isolated stragglers if the next pack needs them.",
      "Attack while moving is supported, but the low base attack-speed multiplier still creates commitment. Throw from the side of a pack rather than directly into incoming melee enemies.",
    ],
    bossing: [
      "Against a single boss, prioritise weapon damage, accuracy, shock, and safe attack windows. A Frenzy Charge may add less than it does in a pack if there are no additional split targets.",
      "Save charges for add phases or mechanics that create multiple targets. Repeatedly consuming them without useful splits can weaken another charge-dependent skill.",
    ],
    useCases: [
      "Spear mappers that want charge-driven area clear.",
      "Lightning attack builds that value strong shock application.",
      "Hybrid setups pairing Lightning Spear clear with a dedicated single-target spear skill.",
    ],
    mistakes: [
      "Assuming the main spear can pierce or chain despite its explicit restriction.",
      "Spending Frenzy Charges on single stragglers.",
      "Ignoring accuracy because the secondary bolts look spell-like.",
      "Stacking projectile count without confirming which component receives it.",
    ],
    troubleshooting: [
      [
        "The charge version does not improve bosses",
        "Check whether there are valid split targets.",
        "Use the charge for add phases and scale the core hit for a lone boss.",
      ],
      [
        "Clear leaves enemies behind",
        "Aim at the centre of the pack and improve bolt count or area.",
        "Generate charges before the pack rather than after it.",
      ],
      [
        "The attack feels unsafe",
        "Add attack speed within mana limits.",
        "Throw from range and avoid starting the animation during a boss telegraph.",
      ],
    ],
    faq: [
      [
        "What does a Frenzy Charge do?",
        "It makes the main spear split toward three targets before the resulting bursts.",
      ],
      [
        "Can the main spear chain?",
        "No. The current skill text explicitly prevents the spear from piercing, forking, chaining, or returning.",
      ],
      [
        "Do extra projectiles add main spears?",
        "The current text says projectile-count modifiers affect the maximum number of lightning bolt projectiles.",
      ],
      [
        "Is the skill fully lightning?",
        "Secondary bolts are; the main spear converts 80% of physical damage.",
      ],
      [
        "Why pair it with another boss skill?",
        "Its charge split is strongest in packs, so a dedicated single-target skill can be more efficient on lone bosses.",
      ],
    ],
  },
};

function skillSections(article, spec) {
  let order = 10;
  const next = () => (order += 10);
  const rich = (
    id,
    title,
    type,
    paragraphs = [],
    bullets = [],
    extra = {},
  ) => ({
    ...baseSection(id, next(), title, type),
    paragraphs,
    bullets,
    ...extra,
  });
  return [
    {
      ...baseSection("quick-answer", order, "Quick answer", "quick-answer"),
      paragraphs: spec.direct,
      bullets: [],
      keyValues: [],
    },
    {
      ...baseSection("properties", next(), "Skill properties", "properties"),
      properties: spec.properties.map(([label, value, note]) => ({
        label,
        value,
        notes: [note],
      })),
    },
    rich(
      "requirements",
      "Requirements and setup",
      "requirements",
      [],
      spec.requirements,
    ),
    narrative(
      "mechanics",
      next(),
      "Core mechanics",
      "mechanics",
      spec.mechanics,
    ),
    {
      ...baseSection(
        "mechanics-table",
        next(),
        "What scales each component",
        "data-table",
      ),
      columns: ["Component", "Useful investment", "Common trap"],
      rows: spec.table,
    },
    {
      ...baseSection("supports", next(), "Support priorities", "supports"),
      supports: spec.supports.map(([label, note, priority]) => ({
        label,
        notes: [note],
        priority,
      })),
    },
    rich(
      "support-compatibility",
      "Support compatibility rules",
      "support-compatibility",
      [
        "Choose supports for the component that actually deals damage in the build. A support can be technically compatible while weakening placement, speed, conversion, or another component.",
      ],
      [
        "Re-test projectile speed, duration, and area after changing supports.",
        "Do not infer support behaviour from the visual effect alone.",
        "Keep one flexible socket for mapping or bossing needs.",
      ],
    ),
    rich(
      "mapping-rotation",
      "Mapping rotation",
      "mapping-rotation",
      spec.mapping,
      [],
    ),
    rich(
      "bossing-rotation",
      "Bossing rotation",
      "bossing-rotation",
      spec.bossing,
      [],
    ),
    narrative(
      "build-use-cases",
      next(),
      "Build use cases",
      "build-use-cases",
      [],
      spec.useCases,
    ),
    rich("troubleshooting", "Troubleshooting", "troubleshooting", [], [], {
      steps: spec.troubleshooting.map(([label, action, result]) => ({
        label,
        action,
        result,
      })),
    }),
    narrative(
      "common-mistakes",
      next(),
      "Common mistakes",
      "common-mistakes",
      [],
      spec.mistakes,
    ),
    faqSection(spec.faq, next()),
    preservedSources(article, "sources", next()),
    changelogSection(
      [
        "Expanded the skill page with current mechanical properties, component scaling, rotations, compatibility rules, and symptom-based troubleshooting.",
      ],
      next(),
    ),
  ];
}

const itemSpecs = {
  "adonias-ego": {
    callout:
      "Use it only when the build can generate and consume Power Charges without letting the resistance penalty become a permanent defensive failure.",
    detail: [
      "Adonia's Ego is a system item, not a generic +3 spell wand. Its value comes from Pinnacle of Power, charge generation, weapon-set behaviour, and a deliberately managed downside.",
    ],
    facts: [
      [
        "Base",
        "Siphoning Wand",
        "The inherent Power Siphon level can vary with the item.",
      ],
      [
        "Required level",
        "Depends on granted skill; drop level 65",
        "High-tier versions can grant higher inherent skill levels.",
      ],
      [
        "Spell levels",
        "+3 to all Spell Skills",
        "A broad offensive modifier for spell builds.",
      ],
      [
        "Mana",
        "+100–150 maximum Mana",
        "Useful for mana-based spell packages.",
      ],
      [
        "Cast speed",
        "15–30% increased",
        "A strong but replaceable conventional affix.",
      ],
      [
        "Power Charges",
        "−1 to +1 maximum",
        "The roll changes both ceiling and management.",
      ],
      [
        "Downside",
        "−10% all elemental resistances per Power Charge",
        "Must be evaluated at the charge count the build actually holds.",
      ],
      [
        "Granted buff",
        "Level 20 Pinnacle of Power",
        "The defining mechanic and reason to consider the wand.",
      ],
    ],
    mechanics: [
      "Pinnacle of Power converts a managed Power Charge state into a temporary offensive window. The resistance penalty is live while charges are held, so charge generation, consumption timing, and weapon-set assignment are part of the defensive plan.",
      "The community commonly places generation and consumption skills on deliberate weapon sets. Current wiki notes also warn that the Pinnacle of Power buff is removed when swapping weapons, so any setup depending on persistence across a swap must be treated as version-sensitive and tested rather than presented as guaranteed.",
      "Do not build around a bug report or an undocumented weapon-swap exception. Configure only interactions that survive the current client and keep enough uncapped resistance margin to avoid sudden vulnerability.",
    ],
    usage: [
      [
        "Measure the downside",
        "Multiply the resistance penalty by the maximum Power Charges you expect to hold and verify the character remains safe during generation.",
      ],
      [
        "Assign weapon sets",
        "Put the generator, consumer, and wand on explicit sets. Disable accidental set changes from unrelated skills.",
      ],
      [
        "Generate charges",
        "Use the chosen infusion or charge engine only during a safe window.",
      ],
      [
        "Consume deliberately",
        "Activate Pinnacle of Power as part of the damage rotation instead of carrying dangerous charges indefinitely.",
      ],
      [
        "Verify after every change",
        "Open the character panel and test the complete loop after changing a skill, weapon, rune, or maximum-charge modifier.",
      ],
    ],
    outcomes: [
      [
        "Self-cast spell build",
        "Large spell-level, mana, cast-speed, and buff package",
        "Resistance penalty during charge setup",
        "Use when the rotation is tested",
        "high",
      ],
      [
        "Weapon-set utility",
        "Can isolate part of the charge engine",
        "Swap behaviour is version-sensitive",
        "Use only after client verification",
        "medium",
      ],
      [
        "Generic caster",
        "Strong conventional stats",
        "Complexity and defensive downside",
        "Prefer a rare wand if the buff is unused",
        "low",
      ],
      [
        "Hardcore or fragile setup",
        "High ceiling",
        "A failed charge cycle can remove a large resistance margin",
        "Avoid unless the defense remains safe at worst case",
        "high",
      ],
    ],
    builds: [
      [
        "Power Charge spell caster",
        "Generates charges on command, consumes them immediately, and scales the granted buff.",
      ],
      [
        "Mana-stacking caster",
        "Uses maximum Mana and spell levels while reserving enough gear budget to cover resistances.",
      ],
      [
        "Trigger spell package",
        "Can use the wand only when weapon-set and buff persistence are proven in the current client.",
      ],
    ],
    alternatives: [
      "A well-rolled rare wand with spell levels, cast speed, mana, and useful damage offers lower complexity and no charge-based resistance penalty.",
      "For a build that only wants +spell levels, compare the full rare weapon and shield package; Adonia's Ego is not automatically best when Pinnacle of Power is inactive.",
      "Keep the unique in storage until the charge engine is complete rather than weakening a functioning build to equip it early.",
    ],
    acquisition: [
      [
        "World drop",
        "The item can drop in level-appropriate content; the current wiki lists a drop level of 65.",
      ],
      [
        "Chance route",
        "The wiki records that the base can be chanced, but this is not a recommendation to spend currency without checking current base availability and odds.",
      ],
      [
        "Trade",
        "Search by maximum-charge roll, spell/cast rolls, granted skill level, and price. Do not pay for a high roll that the build cannot use.",
      ],
    ],
    valuation: [
      "A usable copy has the charge roll and conventional stats the build needs; price is league-dependent and deliberately omitted.",
      "Sell when the roll is desirable to specialised charge builds but your character cannot safely use it.",
      "Hold a promising copy if the build plan is incomplete, but do not treat every roll as universally valuable.",
    ],
    risks: [
      [
        "Equip as a normal spell wand",
        "Good spell stats",
        "Unused buff and dangerous charge penalty",
        "Use a rare wand instead",
        "high",
      ],
      [
        "Maximum-charge stacking",
        "Higher theoretical buff ceiling",
        "Larger possible resistance loss",
        "Overcap for the worst held-charge state",
        "high",
      ],
      [
        "Weapon-set technique",
        "May isolate setup actions",
        "Behaviour can change or fail after a patch",
        "Retest in the current client",
        "medium",
      ],
      [
        "Low-charge controlled loop",
        "Simpler defense budget",
        "Lower ceiling",
        "Good progression entry if the rotation remains worthwhile",
        "low",
      ],
    ],
    troubleshooting: [
      [
        "Resistances collapse during setup",
        [
          "Count active Power Charges.",
          "Add overcap or consume sooner.",
          "Check that another maximum-charge modifier changed the worst case.",
        ],
      ],
      [
        "Pinnacle of Power disappears",
        [
          "Test whether a weapon swap removed it.",
          "Verify which set owns the granted skill.",
          "Do not rely on a reported persistence bug.",
        ],
      ],
      [
        "The wand is weaker than a rare",
        [
          "Confirm the buff is active in real combat.",
          "Compare the complete rare weapon setup.",
          "Check cast-speed and spell-level breakpoints rather than item rarity.",
        ],
      ],
    ],
    faq: [
      [
        "Why is the resistance penalty dangerous?",
        "It scales with held Power Charges, so a charge-heavy character can lose a large amount of all elemental resistance during setup.",
      ],
      [
        "Can I put the wand on the second weapon set?",
        "Weapon-set techniques exist, but current behaviour must be tested because the wiki notes the buff is removed on swapping.",
      ],
      [
        "Is +1 maximum Power Charge always the best roll?",
        "No. It raises potential upside and potential resistance loss; the build must safely manage both.",
      ],
      [
        "Is it good without Pinnacle of Power?",
        "It has strong conventional caster stats, but a rare wand can often provide those with less complexity.",
      ],
      [
        "What should I test first?",
        "Charge generation, resistance at maximum held charges, buff activation, and weapon-swap persistence in that order.",
      ],
    ],
    patch: [
      [
        "0.3.0",
        [
          "Items with inherent skills can rarely drop with skill levels up to 20 in high-tier maps.",
        ],
      ],
      ["0.2.1", ["Adonia's Ego was introduced."]],
    ],
  },
  "sire-of-shards": {
    callout:
      "Use Sire of Shards when radial projectile coverage is the build's engine; replace it when a directional spell or rare staff gives more useful damage and defenses.",
    detail: [
      "The staff forces projectile spells to fire in a circle and adds four projectiles. That changes how a skill reaches a target, so it can be an enabler or a liability rather than a simple damage upgrade.",
    ],
    facts: [
      ["Base", "Chiming Staff", "Grants Sigil of Power from the base type."],
      ["Required level", "25", "An accessible build-enabling unique."],
      ["Spell damage", "80–120% increased", "A broad damage roll."],
      ["Cast speed", "10–20% increased", "Improves many self-cast setups."],
      [
        "Resistances",
        "+5–10% all elemental",
        "Helpful but not enough to replace defensive rare slots.",
      ],
      [
        "Projectile rule",
        "+4 projectiles in a circle",
        "The defining modifier applies to projectile spells.",
      ],
      [
        "Opportunity cost",
        "Two-handed weapon slot",
        "You give up a shield or a second one-handed item.",
      ],
    ],
    mechanics: [
      "Projectile spells fire four additional projectiles and distribute them around the caster. Extra projectiles improve area coverage, but a radial pattern can send fewer projectiles toward a single distant target than a directional cast.",
      "The modifier belongs to spells. Attacks and non-projectile spells do not gain the signature benefit. Confirm the skill tags and observe the actual launch pattern before building around it.",
      "Sigil of Power is a separate granted skill from the Chiming Staff base. Its value depends on whether the build can stand in or reuse the area without compromising movement.",
    ],
    usage: [
      [
        "Check the skill",
        "Confirm it is a projectile spell and that a circular pattern creates useful coverage.",
      ],
      [
        "Test single target",
        "Cast at a lone target from realistic range and count how many projectiles can connect.",
      ],
      [
        "Plan defenses",
        "Replace the life, block, Energy Shield, or resistances that a shield or rare off-hand would have supplied.",
      ],
      [
        "Use Sigil deliberately",
        "Place it for a boss or stationary mechanic; do not interrupt every pack to cast it.",
      ],
      [
        "Set a replacement rule",
        "Move to a rare staff or one-hand setup when the radial pattern no longer compensates for lost affixes.",
      ],
    ],
    outcomes: [
      [
        "Nova-style projectile spell",
        "Excellent screen coverage",
        "Projectiles spread away from one target",
        "Strong use case",
        "low",
      ],
      [
        "Directional projectile spell",
        "More projectiles",
        "Pattern may lower focused damage",
        "Test before committing",
        "medium",
      ],
      [
        "Non-projectile spell",
        "Spell damage and cast speed only",
        "Signature modifier is unused",
        "Usually replace",
        "high",
      ],
      [
        "Defensive caster",
        "Some resistance",
        "No shield and limited defensive affixes",
        "Budget defenses elsewhere",
        "medium",
      ],
    ],
    builds: [
      [
        "Close-range projectile nova",
        "Uses the circular launch pattern to cover enemies around the character.",
      ],
      [
        "Triggered projectile package",
        "Can value extra projectile coverage if the trigger position is predictable.",
      ],
      [
        "Budget spell levelling",
        "Uses spell damage and cast speed until a rare weapon package becomes stronger.",
      ],
    ],
    alternatives: [
      "A rare staff can offer stronger spell levels or focused damage without forcing a circular pattern.",
      "A wand plus shield gives up the extra projectiles but can add defenses, mana, and more flexible affixes.",
      "For a skill that already covers the screen, replace Sire of Shards when the next upgrade improves boss damage or survival more than four extra radial projectiles.",
    ],
    acquisition: [
      [
        "World drop or trade",
        "Use the normal unique-item acquisition routes and compare current listings; no fixed market value is assumed.",
      ],
      [
        "Roll check",
        "Prioritise cast speed and spell damage only after confirming the projectile pattern suits the skill.",
      ],
      [
        "Socket and rune plan",
        "Do not spend scarce enhancements on a temporary copy before deciding whether it survives the endgame transition.",
      ],
    ],
    valuation: [
      "Use a low-cost copy when it immediately enables the intended radial skill.",
      "Sell a high roll when your build is directional, non-projectile, or already committed to a shield.",
      "Hold only when another planned character specifically needs the circular projectile rule.",
    ],
    risks: [
      [
        "Equip without tag check",
        "Generic spell stats",
        "Signature modifier may do nothing",
        "Confirm projectile spell tag",
        "high",
      ],
      [
        "Map-focused nova",
        "Fast omnidirectional clear",
        "Lower directional boss focus",
        "Keep a boss plan",
        "medium",
      ],
      [
        "Replace shield",
        "More projectiles",
        "Lost defense and utility",
        "Rebuild caps before equipping",
        "medium",
      ],
      [
        "Early levelling",
        "Accessible power spike",
        "Can delay learning the final weapon setup",
        "Define a map-transition checkpoint",
        "low",
      ],
    ],
    troubleshooting: [
      [
        "Only one projectile seems to hit a boss",
        [
          "Move closer or change angle.",
          "Confirm the skill can overlap projectiles.",
          "Use a separate single-target skill if overlap is not possible.",
        ],
      ],
      [
        "The build became fragile",
        [
          "Account for the lost shield.",
          "Add life and resistances on armour and jewellery.",
          "Do not count the staff's small all-resistance roll as a full defensive layer.",
        ],
      ],
      [
        "An attack skill does not gain projectiles",
        [
          "The unique modifier specifies spells.",
          "Check the active skill's tags.",
          "Use a spell or choose a different weapon.",
        ],
      ],
    ],
    faq: [
      [
        "Does it work with attacks?",
        "Its signature line specifies spells, so attack projectiles are not the intended beneficiary.",
      ],
      [
        "Do all projectiles hit one boss?",
        "Not automatically. The circular pattern and the skill's collision rules determine overlap.",
      ],
      [
        "Is it an endgame weapon?",
        "It can be for a build enabled by the pattern, but many casters eventually prefer stronger rare affixes or a shield.",
      ],
      [
        "Why is cast speed important?",
        "It improves self-cast responsiveness and is one of the staff's conventional variable rolls.",
      ],
      [
        "What is the biggest hidden cost?",
        "Occupying both hands while forcing a projectile pattern that may not suit single-target encounters.",
      ],
    ],
    patch: [
      [
        "0.2.0",
        [
          "Sire of Shards entered Path of Exile 2 during the Dawn of the Hunt era; verify current rolls against the linked database.",
        ],
      ],
    ],
  },
  "crown-of-the-pale-king": {
    callout:
      "A levelling and dedicated Thorns helmet: excellent when retaliating against hits is part of the build, replaceable when life, resistances, or a stronger Runeforged base matter more.",
    detail: [
      "The important line is not the small physical Thorns roll by itself; it is the permission for Thorns to retaliate against all hits.",
    ],
    facts: [
      ["Base", "Cultist Crown", "Armour/Energy Shield hybrid helmet."],
      [
        "Required level",
        "16",
        "Available early enough to shape a levelling setup.",
      ],
      [
        "Defenses",
        "50–100% increased Armour and Energy Shield",
        "Scales the base but does not provide elemental resistance.",
      ],
      ["Life", "+40–80 maximum Life", "A useful variable defensive roll."],
      [
        "Rarity",
        "10–20% increased item rarity",
        "A secondary benefit, not a reason to accept weak survival.",
      ],
      [
        "Thorns",
        "10–15 to 20–25 physical",
        "Base retaliation damage before other scaling.",
      ],
      [
        "Unique rule",
        "Thorns can retaliate against all hits",
        "Expands the triggers beyond the normal limitation.",
      ],
    ],
    mechanics: [
      "The unique allows Thorns to retaliate against all hits. It does not make Thorns trigger on damage over time, ground effects, or events that are not hits.",
      "The helmet supplies base physical Thorns, life, and hybrid defenses, but no elemental resistance. A character using it must solve resistance caps elsewhere.",
      "A dedicated Thorns build still needs enough mitigation and recovery to survive being hit. Deliberately taking avoidable boss slams is not a damage rotation.",
    ],
    usage: [
      [
        "Confirm the trigger",
        "Test that the incoming enemy action is a hit; damage over time will not produce the expected retaliation.",
      ],
      [
        "Cap resistances elsewhere",
        "Use body armour, gloves, boots, and jewellery to replace the helmet resistance slot.",
      ],
      [
        "Scale survival first",
        "Add armour, life, block or other mitigation so repeated hits do not overwhelm recovery.",
      ],
      [
        "Add Thorns scaling",
        "Invest only after the build can safely receive the small and frequent hits it wants.",
      ],
      [
        "Choose a replacement point",
        "Move on when a rare or Runeforged helmet solves more defense than the unique effect contributes.",
      ],
    ],
    outcomes: [
      [
        "Dedicated Thorns build",
        "Enables retaliation against all hits",
        "Requires planned mitigation",
        "Core or transition item",
        "low",
      ],
      [
        "Ordinary levelling build",
        "Life and hybrid defense",
        "No resistance affix",
        "Use only if caps remain intact",
        "medium",
      ],
      [
        "Evasion build",
        "Can retaliate when hit",
        "Avoided hits do not trigger retaliation",
        "Usually poor synergy",
        "high",
      ],
      [
        "Bossing",
        "Returns damage from valid hits",
        "Dangerous attacks may still kill the character",
        "Never tank telegraphed slams for damage",
        "high",
      ],
    ],
    builds: [
      [
        "Armour-based Thorns",
        "Uses mitigation and recovery to survive frequent small hits while retaliating.",
      ],
      [
        "Hybrid levelling character",
        "Temporarily values life and Armour/Energy Shield if resistance caps are already solved.",
      ],
      [
        "Runeforged transition",
        "May use the unique as an input or stepping stone only after verifying the current recipe and replacement stats.",
      ],
    ],
    alternatives: [
      "A rare helmet with life, resistances, and a strong defensive base is better for characters that do not scale Thorns.",
      "A specialised Runeforged version can raise the defensive ceiling but has a real material cost; compare the finished item rather than the unique name.",
      "If the character avoids most hits through evasion, spend the slot on defense or offense that works without being struck.",
    ],
    acquisition: [
      [
        "World drop or trade",
        "The item is a low-level unique; compare rolls on maximum Life and the hybrid defense modifier.",
      ],
      [
        "Runeforging",
        "The linked database lists a Runemastered Cultist Crown recipe. Verify material availability and the resulting item before consuming a good copy.",
      ],
      [
        "Levelling stash",
        "Keep one only if future characters can maintain resistance caps while using it.",
      ],
    ],
    valuation: [
      "Use when the all-hit retaliation line is central to the build or when the levelling defenses are a clear upgrade.",
      "Sell a well-rolled copy if there is specialised demand and your character does not use Thorns.",
      "Do not hold weak rolls solely for item rarity; market conditions and recipes can change.",
    ],
    risks: [
      [
        "Equip on non-Thorns build",
        "Some life and defense",
        "Lose rare helmet resistances and affixes",
        "Use a rare instead",
        "medium",
      ],
      [
        "Tank large boss hit",
        "One retaliation",
        "Possible death",
        "Dodge dangerous telegraphs",
        "high",
      ],
      [
        "Evasion stacking",
        "Retaliation on the hits that land",
        "Fewer triggers",
        "Choose a compatible defensive model",
        "medium",
      ],
      [
        "Runeforge a good copy",
        "Higher base outcome",
        "Material and item consumption",
        "Verify recipe and final stats first",
        "high",
      ],
    ],
    troubleshooting: [
      [
        "Thorns does not trigger",
        [
          "Confirm the damage was a hit.",
          "Check that the helmet is active and requirements are met.",
          "Do not test against ground damage over time.",
        ],
      ],
      [
        "The character dies despite high Thorns",
        [
          "Thorns is not mitigation.",
          "Add life, armour, recovery, and resistances.",
          "Avoid large telegraphed attacks.",
        ],
      ],
      [
        "Equipping it lowers overall defense",
        [
          "Compare the lost rare-helmet resistances.",
          "Check the base Armour/Energy Shield values.",
          "Use it only if the retaliation effect justifies the trade.",
        ],
      ],
    ],
    faq: [
      [
        "Does it retaliate against damage over time?",
        "No. The unique wording refers to hits.",
      ],
      [
        "Should I intentionally take boss slams?",
        "No. The helmet does not make lethal hits safe.",
      ],
      [
        "Is item rarity the main reason to use it?",
        "No. The Thorns permission is the build-enabling line; rarity is secondary.",
      ],
      [
        "Does evasion help the build?",
        "It helps survival but reduces the number of hits that can trigger retaliation, so the balance must be intentional.",
      ],
      [
        "When should I replace it?",
        "When a rare or Runeforged helmet provides more useful defense than the Thorns interaction contributes.",
      ],
    ],
    patch: [
      [
        "0.2.0e",
        [
          "Fixed an issue that could apply Thorns damage to the player through interactions including Crown of the Pale King.",
        ],
      ],
      [
        "0.1.0",
        ["The item has existed since the initial Early Access version."],
      ],
    ],
  },
};

function itemSections(article, spec) {
  let order = 10;
  const next = () => (order += 10);
  return [
    {
      ...baseSection("quick-answer", order, "30-second answer", "quick-answer"),
      callout: spec.callout,
      calloutDetail: spec.detail,
      answers: [
        {
          label: "Use",
          text: [
            "Equip when the defining mechanic is central and its opportunity cost is already covered.",
          ],
        },
        {
          label: "Sell",
          text: [
            "Sell when the roll has specialist value but the current build cannot use the mechanic safely.",
          ],
        },
        {
          label: "Hold",
          text: [
            "Hold only for a planned build or verified recipe; do not assume a fixed market price.",
          ],
        },
      ],
      links: [],
    },
    {
      ...baseSection("quick-facts", next(), "Quick facts", "quick-facts"),
      facts: spec.facts.map(([label, value, note]) => ({
        label,
        value,
        note: [note],
      })),
    },
    {
      ...baseSection(
        "properties",
        next(),
        "Important properties",
        "properties",
      ),
      properties: spec.facts.map(([label, value, note]) => ({
        label,
        value,
        notes: [note],
      })),
    },
    narrative("effect", next(), "How the item works", "effect", spec.mechanics),
    {
      ...baseSection("usage", next(), "How to use it", "usage"),
      steps: spec.usage.map(([label, body]) => ({ label, body: [body] })),
    },
    {
      ...baseSection(
        "outcomes",
        next(),
        "Fit and opportunity-cost matrix",
        "outcomes",
      ),
      filters: ["use", "risk"],
      rows: spec.outcomes.map(
        ([scenario, benefit, risk, recommendation, level]) => ({
          scenario,
          benefit,
          risk,
          recommendation,
          level,
          audience: scenario,
          tags: [level],
        }),
      ),
    },
    {
      ...baseSection("build-usage", next(), "Build use cases", "build-usage"),
      intro: [
        "These are mechanical use cases, not a promise that the unique is best in slot.",
      ],
      builds: spec.builds.map(([title, description]) => ({
        title,
        description,
      })),
    },
    narrative(
      "alternatives",
      next(),
      "Alternatives and replacement point",
      "alternatives",
      spec.alternatives,
    ),
    {
      ...baseSection(
        "acquisition",
        next(),
        "Acquisition and roll checks",
        "acquisition",
      ),
      intro: [
        "Availability and price change by league; the guide records routes and evaluation criteria rather than a fixed valuation.",
      ],
      routes: spec.acquisition.map(([label, body]) => ({
        label,
        body: [body],
      })),
    },
    {
      ...baseSection("valuation", next(), "Use, sell, or hold", "valuation"),
      marketNote: [
        "No live price is stored. Compare current listings with matching rolls and item level.",
      ],
      use: {
        condition: "The defining mechanic is active in the current build.",
        first: "Test the full interaction.",
        risk: "Opportunity cost of the item slot.",
        text: [spec.valuation[0]],
      },
      sell: {
        condition: "The item has specialist demand but no current use.",
        first: "Compare matching rolls.",
        risk: "League prices move quickly.",
        text: [spec.valuation[1]],
      },
      hold: {
        condition: "A specific future build or recipe is planned.",
        first: "Record the required roll.",
        risk: "The item may remain unused.",
        text: [spec.valuation[2]],
      },
    },
    {
      ...baseSection("risk-analysis", next(), "Risk analysis", "risk-analysis"),
      rows: spec.risks.map(([scenario, gain, loss, recommendation, level]) => ({
        scenario,
        gain,
        loss,
        recommendation,
        level,
      })),
    },
    {
      ...baseSection(
        "troubleshooting",
        next(),
        "Troubleshooting",
        "troubleshooting",
      ),
      problems: spec.troubleshooting.map(([symptom, checks]) => ({
        symptom,
        checks,
        directAnswer: [checks[0]],
        links: [],
      })),
    },
    faqSection(spec.faq, next()),
    {
      ...baseSection("patch-history", next(), "Patch history", "patch-history"),
      entries: spec.patch.map(([version, changes]) => ({ version, changes })),
    },
    preservedSources(article, "sources", next()),
    changelogSection(
      [
        "Replaced the short item summary with mechanical setup, opportunity-cost analysis, acquisition checks, patch history, and troubleshooting.",
      ],
      next(),
    ),
  ];
}

const guideSpecs = {
  "best-atlas-tree-0-5": {
    quick: [
      [
        "What is the best first tree?",
        "A sustain-first tree: Waystone quantity, tier and reliable map completion before expensive mechanic or boss multipliers.",
      ],
      [
        "When should I specialise?",
        "When the character can replace failed Waystones, clear the chosen mechanic without repeated deaths, and sell its rewards without filling the stash.",
      ],
      [
        "Which Atlas Master should I use?",
        "Jado for general utility and unique-focused maps, Doryani for heavily modified Waystones, and Hilda only when empowered unique monsters are already comfortable.",
      ],
      [
        "Should I copy a finished screenshot?",
        "No. Copy the objective and the pathing logic. Exact nodes change with patch, unlock state, and the mechanic you can actually finish.",
      ],
    ],
    overview: [
      "An Atlas tree is a production plan for maps, not a permanent character build. The early job is to keep Waystones flowing; the middle job is to make one mechanic repeatable; the late job is to spend risk and currency only where the build can convert them into completed encounters.",
      "Patch 0.5 adds the Atlas Master layer on top of ordinary passives. Master selection is a per-map decision, so the useful question is not which Master is universally best, but which one improves the next Waystone without making it fail.",
    ],
    stages: [
      [
        "Stage 1 — establish sustain",
        "Fresh endgame",
        "Waystone quantity, tier progression, completion reliability",
        "Do not buy premium tablets or boss pressure while replacing failed maps is difficult.",
      ],
      [
        "Stage 2 — choose one engine",
        "Stable low and mid tiers",
        "One mechanic, nearby density, and its reward multipliers",
        "Pick a mechanic the build clears quickly and the player is willing to sell.",
      ],
      [
        "Stage 3 — improve conversion",
        "Repeatable high tiers",
        "Better routing, tablet coverage, map modifiers and loot handling",
        "Measure profit after consumables, failed maps and selling time.",
      ],
      [
        "Stage 4 — add risk",
        "Defenses and boss damage proven",
        "Hilda, powerful bosses, high-mod Waystones, premium encounters",
        "Test a small batch before scaling the investment.",
      ],
    ],
    masters: [
      [
        "Jado",
        "Uniques, Strongboxes and flexible mapping utility",
        "General progression and maps where broad value matters",
        "Do not assume unique quantity is liquid profit; many drops have little demand.",
      ],
      [
        "Doryani",
        "Rewards and survivability around heavily modified Waystones",
        "Characters that already run four-modifier rare maps consistently",
        "The conditions must be present when the map opens; a mild map cannot use the full package.",
      ],
      [
        "Hilda",
        "Harder unique monsters and larger rare/unique reward potential",
        "Boss-ready builds with reliable single-target damage",
        "Empowered uniques turn a marginal build into failed maps, so begin with low-cost tests.",
      ],
    ],
    scenarios: [
      [
        "Waystones are running out",
        "Sustain passives",
        "Keep modifiers moderate and complete more maps",
        "Adding more difficulty before completion improves nothing.",
      ],
      [
        "Maps are stable but loot is scattered",
        "One mechanic cluster",
        "Remove mechanics you skip and strengthen the one you finish",
        "Atlas points spent on ignored encounters have zero realised value.",
      ],
      [
        "Four-mod maps are routine",
        "Doryani",
        "Run a measured batch with the same map-quality rule",
        "Separate the Master's value from unusually lucky drops.",
      ],
      [
        "Bosses die quickly and safely",
        "Hilda",
        "Test empowered uniques on replaceable Waystones",
        "Stop if deaths erase more maps than the reward gain replaces.",
      ],
      [
        "You want low-friction general mapping",
        "Jado",
        "Use broad utility and sell only genuinely liquid uniques",
        "Do not spend minutes pricing every low-demand item.",
      ],
    ],
    workflow: [
      "Write one sentence for the tree's job: sustain, one mechanic, bossing, or general mapping. If the sentence contains all four, the tree is unfocused.",
      "Allocate the shortest efficient path to that job, then reserve points for Waystone sustain and survival-friendly routing.",
      "Prepare a fixed test batch and record starts, completions, deaths, Waystones returned, saleable rewards, and consumable cost.",
      "Change one cluster or one Master at a time. A complete respec makes it impossible to identify the useful change.",
      "Keep a rollback screenshot or planner link so a failed experiment does not strand progression.",
    ],
    mistakes: [
      [
        "Copying a high-budget tree",
        "The reference assumes damage, defenses, tablets, and market access that are not present.",
        "Return to sustain and one accessible mechanic.",
      ],
      [
        "Valuing gross drops",
        "Listed value ignores failed maps, consumables, unsold stock and trading time.",
        "Track net realised value per hour.",
      ],
      [
        "Changing the Master mid-map",
        "Master effects are chosen for the map when it is opened.",
        "Confirm the active Master before inserting the Waystone.",
      ],
      [
        "Keeping every mechanic",
        "Travel points and interruptions dilute the farm.",
        "Remove encounters that are skipped or consistently failed.",
      ],
    ],
    faq: [
      [
        "Can I respec later?",
        "Yes. Treat the first tree as a progression tool, not a permanent commitment; keep enough currency and a recorded rollback plan.",
      ],
      [
        "Is Hilda always the most profitable?",
        "No. Her upside matters only if harder unique monsters are completed consistently and the resulting items are liquid.",
      ],
      [
        "How large should a test be?",
        "Use enough maps to include ordinary variance—at least a deliberate batch rather than one lucky map—and keep inputs comparable.",
      ],
      [
        "What if a published tree uses old node names?",
        "Follow its priorities, then rebuild the route against the current in-game tree and patch notes.",
      ],
      [
        "Should every map be fully juiced?",
        "No. Investment should rise only when completion rate and reward conversion remain healthy.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    quick: [
      [
        "Best no-capital farm",
        "Complete Waystones quickly, sell raw currency and liquid map inputs, and use one low-interruption mechanic.",
      ],
      [
        "Best general rule",
        "Choose a loop your build completes reliably and your trade routine can liquidate. Theoretical value that stays in a stash is not profit.",
      ],
      [
        "When to buy investment",
        "After a baseline batch proves stable completion and after you define the exact sellable output the investment is meant to increase.",
      ],
      [
        "What should I record?",
        "Starting cost, completed maps, failures, saleable returns, time spent mapping, and time spent pricing or trading.",
      ],
    ],
    overview: [
      "Currency farming has three separate skills: clearing the content, converting rewards into liquid stacks, and protecting the bankroll from bad variance. A strategy is suitable only when all three work for the same character and player.",
      "Patch 0.5 changes mechanics, Atlas Masters, and market demand, so this guide avoids fixed divines-per-hour promises. Use the matrices to select a repeatable loop, then test current prices before buying a large batch of inputs.",
    ],
    stages: [
      [
        "Bootstrap",
        "Little or no capital",
        "Waystone completion, raw currency, sellable bases",
        "Avoid strategies that need premium maps or a rare jackpot to repay the batch.",
      ],
      [
        "Stable loop",
        "Several failed maps can be replaced",
        "One familiar mechanic and bulk sale",
        "Optimise completion and stash handling before adding more encounters.",
      ],
      [
        "Invested mapping",
        "Build clears high modifiers",
        "Tablets, four-mod Waystones, Master synergy",
        "Price all inputs and count failures.",
      ],
      [
        "High variance",
        "Large protected bankroll",
        "Bosses, premium rituals, specialised gambles",
        "Set a loss limit before the session starts.",
      ],
    ],
    masters: [
      [
        "Waystone baseline",
        "Low",
        "Very high",
        "Raw currency, maps and ordinary sellable drops",
        "Best starting benchmark; easy to compare against later farms.",
      ],
      [
        "Expedition",
        "Low to medium",
        "High with planned explosives",
        "Currency and crafting/trade items",
        "Read remnants before detonating; immunities can invalidate the encounter.",
      ],
      [
        "Ritual",
        "Medium",
        "Medium",
        "Deferred high-value items and omens",
        "Tribute is not profit until the item is purchased and sold.",
      ],
      [
        "Delirium",
        "Medium",
        "Build-dependent",
        "Reward layers and specialised items",
        "Poor damage or recovery turns density into deaths and unfinished maps.",
      ],
      [
        "Boss rush",
        "Medium to high",
        "Low for marginal builds",
        "Boss-specific uniques and fragments",
        "Use only with proven single-target damage and a market for the target drops.",
      ],
      [
        "Premium gamble",
        "High",
        "Low",
        "Rare jackpot outcomes",
        "Entertainment is not an expected-value edge; protect the core bankroll.",
      ],
    ],
    scenarios: [
      [
        "Fast mapper, weak boss damage",
        "Waystones plus density mechanic",
        "Skip boss-heavy investment",
        "Sell inputs that stronger bossing characters value.",
      ],
      [
        "Slow mapper, strong boss damage",
        "Targeted bosses or compact encounters",
        "Avoid wide layouts and long backtracking",
        "Measure entry cost per successful kill.",
      ],
      [
        "Limited trade patience",
        "Raw currency and bulk commodities",
        "Avoid rare-item appraisal farms",
        "Accept slightly lower gross value for faster liquidation.",
      ],
      [
        "Small bankroll",
        "No-capital baseline",
        "Do not borrow from gear upgrades",
        "Grow inputs only from realised sales.",
      ],
      [
        "High-risk specialist",
        "Ritual, boss or gamble loop",
        "Define stop-loss and reserve",
        "Never let one session consume the currency needed to keep mapping.",
      ],
    ],
    workflow: [
      "Choose one output that has current buyers, then identify the mechanic and Atlas nodes that produce it.",
      "Set aside the character-upgrade budget. Only the remaining currency is farming capital.",
      "Run a baseline batch without expensive inputs and record total active time and deaths.",
      "Add one investment layer, repeat the same batch, and compare net—not gross—returns.",
      "Bulk-list liquid stacks at planned intervals; do not interrupt every map for a small sale.",
      "Stop or downgrade the farm when completion, liquidity, or bankroll falls below the written limit.",
    ],
    mistakes: [
      [
        "Counting listed value",
        "Items may never sell at the displayed price.",
        "Use completed sales or conservative bulk prices.",
      ],
      [
        "Ignoring downtime",
        "Price checks, stash sorting and trades reduce hourly output.",
        "Use dump tabs and fixed liquidation windows.",
      ],
      [
        "Buying too many inputs",
        "A patch or price change can trap the bankroll.",
        "Scale from small batches and keep a reserve.",
      ],
      [
        "Farming a mechanic the build fails",
        "High theoretical reward cannot compensate for lost maps.",
        "Select by completion rate before peak value.",
      ],
    ],
    faq: [
      [
        "Which strategy makes the most currency?",
        "The one with the best net realised return for your completion speed, capital and trade tolerance; there is no permanent universal winner.",
      ],
      [
        "Should I sell or use valuable inputs?",
        "Sell them until your own tested return from using them exceeds the reliable sale price.",
      ],
      [
        "How do I avoid market manipulation?",
        "Compare multiple live listings, exclude obvious outliers, and value rare items only after a real sale.",
      ],
      [
        "Can solo players use bulk strategies?",
        "Yes. Standardise map preparation and sell in larger stacks at scheduled intervals.",
      ],
      [
        "When should I stop a bad batch?",
        "At the predetermined loss or failure limit, not after chasing the next lucky drop.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    quick: [
      [
        "How many choices are covered?",
        "Eight base classes and the 22 ascendancies available in the current 0.5 reference set.",
      ],
      [
        "What should decide the class?",
        "The intended skill family, defensive model, resource engine and tolerance for setup—not a tier-list position alone.",
      ],
      [
        "Can another class use the same skill?",
        "Usually yes. Starting location and ascendancy change efficiency and mechanics, while skill requirements and weapon rules still apply.",
      ],
      [
        "When should I reroll?",
        "Reroll when the desired mechanic belongs to a different ascendancy; fix gear and skill links first when the problem is only damage or survival.",
      ],
    ],
    overview: [
      "A base class determines the starting point and campaign identity; an ascendancy supplies specialised rules that can change how charges, gems, companions, defenses, or skills work. Choose the mechanic you want to play, then select the class that reaches it with the fewest forced compromises.",
      "The summaries below describe tendencies rather than locking skills to classes. Patch notes can move individual nodes, so confirm the current ascendancy panel before following an older planner screenshot.",
    ],
    stages: [
      [
        "Warrior",
        "Strength, heavy attacks, armour and melee control",
        "Warbringer; Titan; Smith of Kitava",
        "Choose between warcry/totem utility, large-hit scaling, and forging-oriented equipment rules.",
      ],
      [
        "Ranger",
        "Fast projectiles, mobility and evasion",
        "Deadeye; Pathfinder; Oracle",
        "Choose between projectile tempo, flask/ailment systems, and foresight-oriented utility.",
      ],
      [
        "Witch",
        "Minions, life costs, curses and occult spell systems",
        "Infernalist; Blood Mage; Lich",
        "Choose by resource model and whether minions, life, or necromantic spell rules are central.",
      ],
      [
        "Sorceress",
        "Elemental spells, mana and time manipulation",
        "Stormweaver; Chronomancer; Disciple of Varashta",
        "Choose between elemental ailment scaling, cooldown/time control, and specialised elemental discipline.",
      ],
      [
        "Mercenary",
        "Crossbows, grenades and flexible gem engineering",
        "Witchhunter; Gemling Legionnaire; Tactician",
        "Choose between anti-magic pressure, gem quality/support flexibility, and battlefield control.",
      ],
      [
        "Monk",
        "Quarterstaff attacks, elemental combos and charges",
        "Invoker; Acolyte of Chayula; Martial Artist",
        "Choose between elemental spirit, darkness/chaos systems, and direct martial scaling.",
      ],
      [
        "Huntress",
        "Spears, companions and agile hybrid combat",
        "Amazon; Ritualist; Spirit Walker",
        "Choose between critical spear combat, ritual sacrifice, and captured-beast play.",
      ],
      [
        "Druid",
        "Shapeshifting and nature magic",
        "Shaman",
        "Choose it when form switching or nature spell interaction is the build's foundation.",
      ],
    ],
    masters: [
      [
        "Warbringer",
        "Warcries, totems and armour-breaking utility",
        "Active melee/control players",
        "Needs a rotation that actually uses the utility windows.",
      ],
      [
        "Titan",
        "Large hits, stun and broadly powerful body-based scaling",
        "Straightforward heavy melee",
        "Slow actions need enough defense and attack-speed comfort.",
      ],
      [
        "Deadeye",
        "Projectile speed, additional projectiles and tailwind-style tempo",
        "Bow or projectile clearing",
        "Damage does not replace defenses on a ranged character.",
      ],
      [
        "Pathfinder",
        "Flasks, poison and ailment-oriented sustain",
        "Players who enjoy resource management",
        "Weak flask planning leaves much of the ascendancy unused.",
      ],
      [
        "Gemling Legionnaire",
        "Gem quality, supports and attribute flexibility",
        "Multi-skill or grenade packages",
        "Complex sockets need a clear job for every skill.",
      ],
      [
        "Spirit Walker",
        "Captured companions and shared combat loops",
        "Companion-led gameplay",
        "Pathing and command uptime matter as much as tooltip damage.",
      ],
      [
        "Stormweaver",
        "Elemental spell and ailment interactions",
        "Direct elemental casters",
        "Select the element and ailment plan before allocating narrow nodes.",
      ],
      [
        "Chronomancer",
        "Cooldown and time-control tools",
        "Players comfortable planning windows",
        "A mechanically strong node can feel weak if the rotation ignores its timing.",
      ],
    ],
    scenarios: [
      [
        "I want the simplest heavy melee",
        "Warrior → Titan",
        "Clear large hits and sturdy gearing",
        "Confirm attack speed is comfortable before adding more damage.",
      ],
      [
        "I want fast bow mapping",
        "Ranger → Deadeye",
        "Projectile coverage and movement tempo",
        "Budget life, resistances and recovery separately.",
      ],
      [
        "I want grenade quality scaling",
        "Mercenary → Gemling Legionnaire",
        "Gem quality and support flexibility",
        "Plan attributes, cooldowns and sockets as one system.",
      ],
      [
        "I want a permanent combat companion",
        "Huntress → Spirit Walker",
        "Captured-beast commands and shared buffs",
        "Use a temporary beast until the intended capture is available.",
      ],
      [
        "I want elemental spell control",
        "Sorceress → Stormweaver or Chronomancer",
        "Choose damage/ailments versus timing/cooldowns",
        "The skill rotation should decide between them.",
      ],
    ],
    workflow: [
      "Choose one primary skill or mechanic and list its weapon, tags, resource cost and required combat range.",
      "Choose a defensive model that can function at that range: armour, evasion, Energy Shield, block, recovery, or a deliberate combination.",
      "Shortlist ascendancies whose defining nodes improve both the mechanic and the real rotation.",
      "Check the passive-tree distance, attributes and campaign levelling path before committing.",
      "Use an early-map checkpoint: if the problem is gear, fix gear; if the desired mechanic is missing, reroll before further investment.",
    ],
    mistakes: [
      [
        "Choosing by tier list",
        "Rankings assume a patch, budget and player goal.",
        "Choose a mechanic and failure tolerance first.",
      ],
      [
        "Treating base class as a skill lock",
        "Many skills are shared across classes.",
        "Compare ascendancy rules and starting pathing.",
      ],
      [
        "Ignoring levelling",
        "An endgame interaction may not exist during campaign.",
        "Prepare a temporary skill and transition milestone.",
      ],
      [
        "Copying old ascendancy nodes",
        "Names and values can change between patches.",
        "Verify against the current in-game panel and linked database.",
      ],
    ],
    faq: [
      [
        "Can I change ascendancy?",
        "Follow the current in-game respec rules and cost; do not assume a guide from another patch still describes the process.",
      ],
      [
        "Which class is best for a beginner?",
        "A class whose core loop is understandable and whose defenses work on rare gear—often Titan, Deadeye or a straightforward caster, depending on preferred combat.",
      ],
      [
        "Are all ascendancies equally complete?",
        "Early Access balance and content evolve. Evaluate the nodes available in the current client, not launch-era expectations.",
      ],
      [
        "Should I start from the class or the skill?",
        "Start from the skill and playstyle, then choose the ascendancy that supplies the most valuable mechanical rule.",
      ],
      [
        "When is an off-class skill worth it?",
        "When the ascendancy interaction outweighs extra passive travel, attributes and gear pressure.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    quick: [
      [
        "What counts as complete?",
        "The boss or quest is finished and any dropped reward item has been consumed or handed to the correct NPC.",
      ],
      [
        "What should I prioritise?",
        "Passive points, Weapon Set Passive points, Spirit, maximum Life and permanent resistances before optional loot-only detours.",
      ],
      [
        "Can I return later?",
        "Usually yes. Use the Waypoint, finish the objective, then verify that the reward state changed.",
      ],
      [
        "Why can a killed boss still be incomplete?",
        "Some permanent rewards come from a dropped consumable or a follow-up quest hand-in rather than the kill flag alone.",
      ],
    ],
    overview: [
      "This is a completion workflow for Acts 1–4, not a claim that every optional boss gives permanent power. The important distinction is mandatory story progression, optional permanent rewards, and optional loot encounters that can safely wait.",
      "Campaign routing and reward values can change during Early Access. Use the world-map reward icon and the linked current reward table as the final check, especially after a patch or alternate campaign path.",
    ],
    stages: [
      [
        "Act 1",
        "Beira of the Rotten Pack; The Crowbell; King in the Mists; Una's Lute; Candlemass",
        "Cold resistance, passive points, Spirit, passive points, maximum Life",
        "Consume dropped items and complete the associated quest hand-ins; do not leave Freythorn before confirming the Spirit reward.",
      ],
      [
        "Act 2",
        "Kabala; Final Letter; Ancient Vows; Garukhan Sisters",
        "Passive points, passive points, a permanent choice, lightning resistance",
        "Ancient Vows is a choice: read the current reward before committing rather than following an old recommendation.",
      ],
      [
        "Act 3",
        "Mighty Silverfist; Sacrificial Heart; Ignagduk; Venom Draught",
        "Passive or Weapon Set points, fire resistance, and a permanent choice",
        "Some rewards require an item interaction or NPC step after the boss.",
      ],
      [
        "Act 4",
        "Journey's End; Halls of the Dead; Trail of the Ancestors; Abandoned Prison; Whakapanu Island",
        "+2 Weapon Set Passive Points at Journey's End; three trial tattoo choices; +5% maximum Mana at Navali's Rest; +2 passive points from the completed trial; a flask-recovery choice; a permanent defense choice",
        "Complete the post-boss hand-ins: free Freya, speak to Hinekora, and confirm each tattoo or permanent choice before leaving the island chain.",
      ],
    ],
    masters: [
      [
        "Passive Skill Points",
        "Permanent tree flexibility",
        "Complete immediately",
        "Verify the passive-point total changed after consuming or handing in the reward.",
      ],
      [
        "Weapon Set Passive Points",
        "Separate allocation for weapon sets",
        "Complete before finalising swap setups",
        "These points are not ordinary global passive points.",
      ],
      [
        "Spirit",
        "Enables persistent skills and companions",
        "High priority for Spirit-dependent builds",
        "Confirm the quest reward was actually granted.",
      ],
      [
        "Maximum Life",
        "Permanent survival",
        "Complete on every character",
        "Small permanent bonuses compound with later defenses.",
      ],
      [
        "Elemental resistance",
        "Permanent resistance budget",
        "Complete before mapping",
        "Do not use it as an excuse to ignore gear caps.",
      ],
      [
        "Choice reward",
        "Permanent build-specific effect",
        "Pause and read",
        "A choice can be harder to reverse than an ordinary gear mistake.",
      ],
    ],
    scenarios: [
      [
        "Rushing the campaign",
        "Mandatory route first",
        "Mark permanent rewards to revisit before mapping",
        "Do not rely on memory after changing acts.",
      ],
      [
        "Spirit-starved build",
        "Prioritise King in the Mists and other current Spirit rewards",
        "Verify the Spirit total",
        "A kill without the reward step may leave the build unchanged.",
      ],
      [
        "Resistance problem",
        "Complete Beira, Garukhan and Ignagduk-type permanent objectives",
        "Then fix remaining caps on gear",
        "Permanent bonuses supplement rather than replace equipment.",
      ],
      [
        "Returning on a higher-level character",
        "Use Waypoints and clear only missing reward objectives",
        "Consume every reward item immediately",
        "Check the world map and passive totals before leaving.",
      ],
    ],
    workflow: [
      "Open the act world map and inspect every reward-bearing icon before moving to the next act.",
      "Classify each objective as mandatory, permanent reward, choice reward, or loot only.",
      "After the kill, pick up quest items and read them; right-click consumables or return them to the named NPC as instructed.",
      "Verify the character sheet, passive total, Spirit total, or quest state rather than trusting the boss corpse alone.",
      "At the end of Act 4, compare the current character against the linked quest-reward table and revisit any missing entries.",
    ],
    mistakes: [
      [
        "Leaving after the kill",
        "The permanent reward may be a consumable or hand-in.",
        "Finish the quest step and verify the stat.",
      ],
      [
        "Following an old reward value",
        "Early Access campaign rewards can move or change.",
        "Use the current world map and database.",
      ],
      [
        "Confusing passive-point types",
        "Weapon Set points do not behave like ordinary passive points.",
        "Check the allocation interface before planning the tree.",
      ],
      [
        "Picking a permanent choice blindly",
        "The popular option may not fit the current build.",
        "Read both effects in the current client.",
      ],
    ],
    faq: [
      [
        "Do I need every optional boss?",
        "No. Prioritise bosses and quests that grant permanent character power; loot-only encounters can wait.",
      ],
      [
        "Can the world map be trusted?",
        "It is the best current in-client indicator, but verify the reward was consumed or handed in.",
      ],
      [
        "Are Cruel and alternate-act rewards identical?",
        "Do not assume so during Early Access. Check the current campaign route and reward table for the character.",
      ],
      [
        "What should I check before maps?",
        "Passive totals, Weapon Set points, Spirit, permanent Life and resistance rewards, plus any unresolved choice reward.",
      ],
      [
        "Why does the checklist avoid some exact values?",
        "Values and Act 4 routing have changed; where a current primary or database record is not stable, the guide gives a verification method instead of inventing precision.",
      ],
    ],
  },
};

function guideSections(article, spec) {
  let order = 10;
  const next = () => (order += 10);
  const table = (id, title, labels, values) => {
    const columns = labels.map((label, index) => ({
      key: `column-${index + 1}`,
      label,
    }));
    return {
      ...baseSection(id, next(), title, "data-table"),
      caption: `${title} for the current article topic.`,
      columns,
      rows: values.map((row) => ({
        cells: Object.fromEntries(
          columns.map((column, index) => [column.key, row[index]]),
        ),
        tags: [],
      })),
    };
  };
  return [
    {
      ...baseSection("quick-answer", order, "Direct answers", "quick-answer"),
      items: spec.quick.map(([title, body]) => ({ title, body: [body] })),
    },
    narrative(
      "overview",
      next(),
      "How to use this guide",
      "overview",
      spec.overview,
    ),
    table(
      "progression",
      "Progression framework",
      ["Stage", "Readiness", "Priority", "Stop condition"],
      spec.stages,
    ),
    table(
      "comparison",
      "Decision matrix",
      ["Choice", "Strength", "Best fit", "Watch for"],
      spec.masters,
    ),
    table(
      "scenarios",
      "Scenario recommendations",
      ["Situation", "Recommendation", "Action", "Risk control"],
      spec.scenarios,
    ),
    {
      ...baseSection("workflow", next(), "Practical workflow", "card-grid"),
      intro:
        "Run the process in order and preserve a rollback point before spending heavily.",
      cards: spec.workflow.map((body, index) => ({
        title: `Step ${index + 1}`,
        tag: "Workflow",
        body: [body],
      })),
    },
    {
      ...baseSection(
        "mistakes",
        next(),
        "Common mistakes and fixes",
        "card-grid",
      ),
      intro:
        "These failures cost more time than a small difference between two reasonable choices.",
      cards: spec.mistakes.map(([title, reason, fix]) => ({
        title,
        tag: "Fix",
        body: [`Why it fails: ${reason}`, `Do this: ${fix}`],
      })),
    },
    {
      ...baseSection("diagnostic", next(), "Quick diagnostic", "diagnostic"),
      intro: "Choose the symptom that best matches the current problem.",
      controls: [
        {
          id: "symptom",
          label: "What is going wrong?",
          options: spec.mistakes.map(([title], index) => ({
            label: title,
            value: `problem-${index + 1}`,
          })),
        },
      ],
      rules: spec.mistakes.map(([title, reason, fix], index) => ({
        title,
        when: { symptom: `problem-${index + 1}` },
        steps: [reason, fix],
      })),
      defaultResult: {
        title: "Return to the baseline",
        steps: [
          "Reduce the plan to one objective.",
          "Run a controlled batch and record the result.",
          "Add complexity only after the baseline works.",
        ],
      },
    },
    faqSection(spec.faq, next()),
    article.slug === "act-1-4-boss-permanent-rewards-checklist"
      ? {
          ...preservedSources(article, "sources", next()),
          categories: [
            {
              label: "Current quest reward table",
              description:
                "Act-by-act objectives and permanent rewards, including the expanded Act 4 and Interlude route.",
              url: "https://poe2db.tw/us/Quest",
            },
            {
              label: "Independent reward cross-check",
              description:
                "Quest reward and permanent-character-bonus records used to resolve changed campaign locations.",
              url: "https://www.poe2wiki.net/wiki/Quest_rewards",
            },
          ],
        }
      : preservedSources(article, "sources", next()),
    changelogSection(
      [
        "Replaced the short summary with a decision framework, comparison matrices, a practical workflow, failure recovery, and current-version boundaries.",
      ],
      next(),
    ),
  ];
}

const executionerSpec = {
  preparation: [
    [
      "Physical mitigation and life",
      "Most direct weapon hits are physical and can remove a large portion of a campaign health pool.",
      "Upgrade body armour, add life on flexible rares, and do not trade survival for a small damage roll.",
    ],
    [
      "Fire resistance",
      "Burning ground and fire pressure can overlap with the boss and his mercenaries.",
      "Use a temporary fire-resistance ring or charm if the arena effects are the repeated cause of death.",
    ],
    [
      "Movement speed",
      "Sideways movement is the clean answer to the long frontal line and overhead attacks.",
      "Use movement-speed boots and leave space between the character and the arena edge.",
    ],
    [
      "Add control",
      "Ranged mercenaries can make a safe boss opening dangerous.",
      "Keep an area skill or fast clear link ready; kill ranged adds before resuming the boss rotation.",
    ],
    [
      "Sustainable single target",
      "The fight punishes long stationary casts and attacks.",
      "Use a shorter repeatable rotation and remove supports whose cost cannot be sustained.",
    ],
  ],
  phases: [
    [
      "opening",
      "Opening exchange",
      "The Executioner enters with the arena clear.",
      [
        "Learn the overhead and sweeping axe timings.",
        "Fight at medium range with a free lateral path.",
        "Use the recovery after a committed slam.",
      ],
      [
        "Do not back straight away from long frontal attacks; move to the side or cross behind after the target locks.",
      ],
    ],
    [
      "reinforcements",
      "Mercenary pressure",
      "The boss calls or is joined by additional attackers.",
      [
        "Remove ranged mercenaries that block movement.",
        "Keep the boss visible while clearing adds.",
        "Move out of fire or persistent ground before attacking.",
      ],
      [
        "The boss does not become safe because adds appeared. Use a short area clear and return attention to the axe telegraph.",
      ],
    ],
    [
      "final",
      "Low-health finish",
      "Attack cadence and arena clutter leave fewer clean windows.",
      [
        "Preserve one flask charge and a movement route.",
        "Take one safe rotation after each committed attack.",
        "Do not race the final health bar.",
      ],
      [
        "Most late deaths come from greed: one extra attack turns a solved telegraph into a hit.",
      ],
    ],
  ],
  attacks: [
    [
      "overhead-slam",
      "Overhead axe slam",
      ["opening", "reinforcements", "final"],
      ["physical"],
      "Raises the axe with a visible pause before bringing it down in front.",
      "Move to the side or pass behind after the aim commits, then use the recovery window.",
      "Rolling early and allowing the boss to re-aim.",
      "high",
    ],
    [
      "red-line",
      "Straight-line execution strike",
      ["opening", "final"],
      ["physical"],
      "The boss and attack line show a strong red commitment directly ahead.",
      "Leave the frontal lane laterally; do not retreat along the line.",
      "Continuing a long cast because the line appears narrow.",
      "critical",
    ],
    [
      "sweep",
      "Wide axe sweep",
      ["opening", "reinforcements", "final"],
      ["physical"],
      "The weapon pulls to one side before a broad horizontal swing.",
      "Create distance or roll through to the rear after the swing direction is clear.",
      "Standing at the boss's hip without enough movement space.",
      "high",
    ],
    [
      "mercenaries",
      "Summoned mercenaries",
      ["reinforcements", "final"],
      ["physical", "fire"],
      "Additional attackers enter and ranged projectiles begin crossing the arena.",
      "Kill ranged adds first while circling so the boss remains in view.",
      "Chasing a distant add and losing sight of the boss wind-up.",
      "medium",
    ],
    [
      "burning-ground",
      "Fire and burning ground pressure",
      ["reinforcements", "final"],
      ["fire"],
      "Fire effects remain on or cross part of the arena floor.",
      "Relocate before beginning the next damage rotation; use clean ground as the priority.",
      "Rolling out of the axe into persistent fire and staying there.",
      "high",
    ],
  ],
};

function bossSections(article) {
  let order = 10;
  const next = () => (order += 10);
  return [
    {
      ...baseSection(
        "quick-answer",
        order,
        "Three rules that win the fight",
        "quick-answer",
      ),
      callout:
        "Leave the frontal line first; attack during the long axe recovery.",
      calloutDetail: [
        "Circle at medium range, clear ranged mercenaries before the arena becomes crowded, and do not retreat along the red execution line.",
      ],
      answers: [
        {
          label: "Prepare",
          text: "Bring physical mitigation, life, movement speed and enough fire resistance for the arena pressure.",
        },
        {
          label: "React",
          text: "Move sideways on a committed overhead or red-line tell, then use one complete damage rotation.",
        },
        {
          label: "Recover",
          text: "If adds and ground effects overlap, reset to clean ground instead of forcing damage.",
        },
      ],
      links: [
        { label: "Jump to attack reference", href: "#attacks" },
        { label: "Jump to troubleshooting", href: "#troubleshooting" },
      ],
    },
    {
      ...baseSection(
        "access",
        next(),
        "Location, access and objective",
        "access",
      ),
      facts: [
        {
          label: "Campaign stage",
          value: "Act 1 — Ogham Village",
          note: "Reached during The Trail of Corruption.",
        },
        {
          label: "Fight profile",
          value: "Physical melee with adds and fire pressure",
          note: "Frontal weapon attacks are the main immediate threat.",
        },
        {
          label: "Failure cost",
          value: "Campaign checkpoint retry",
          note: "Re-enter after adjusting gear or skill links; no endgame invitation is consumed.",
        },
        {
          label: "Quest objective",
          value: "Defeat The Executioner and free Leitis",
          note: "Complete the post-fight interaction rather than leaving after loot.",
        },
      ],
      steps: [
        {
          label: "Reach Ogham Village",
          body: [
            "Travel through Ogham Village during The Trail of Corruption.",
          ],
        },
        {
          label: "Enter the arena",
          body: [
            "Keep the centre available for lateral movement rather than starting against the wall.",
          ],
        },
        {
          label: "Finish the objective",
          body: ["After victory, free Leitis and confirm the quest update."],
        },
      ],
    },
    {
      ...baseSection(
        "preparation",
        next(),
        "Pre-fight checklist",
        "preparation",
      ),
      items: executionerSpec.preparation.map(([label, why, fix]) => ({
        label,
        checks: [why],
        why,
        fix,
      })),
      links: [],
    },
    {
      ...baseSection("phases", next(), "Fight flow", "phases"),
      phases: executionerSpec.phases.map(
        ([phaseId, label, trigger, objectives, notes]) => ({
          phaseId,
          label,
          trigger,
          objectives,
          notes,
          tags: [phaseId],
          mediaId: "the-executioner-hero",
        }),
      ),
    },
    {
      ...baseSection("attacks", next(), "Attack reference", "attacks"),
      attacks: executionerSpec.attacks.map(
        ([
          attackId,
          name,
          phaseIds,
          damageTypes,
          telegraph,
          response,
          mistake,
          danger,
        ]) => ({
          attackId,
          name,
          phaseIds,
          damageTypes,
          telegraph: [telegraph],
          responses: [response],
          commonMistakes: [mistake],
          danger,
          notes: [],
          mediaIds: [],
          sourceIds: [],
        }),
      ),
    },
    narrative(
      "positioning",
      next(),
      "Positioning and damage windows",
      "arena",
      [
        "Medium range makes the overhead and red-line tells easier to read without forcing the boss to spend the fight walking. Keep circling around open floor rather than backing into the arena wall.",
        "Melee characters should cross to the rear after the attack locks, use one short combo, and leave before the next sweep. Ranged characters still need to move; distance alone does not solve the straight-line strike or add projectiles.",
      ],
      [
        "Clean ground is more valuable than maximum uptime.",
        "Keep the boss on-screen while clearing mercenaries.",
        "One safe rotation after a slam is the repeatable damage window.",
      ],
    ),
    narrative(
      "build-considerations",
      next(),
      "Build-specific adjustments",
      "build-considerations",
      [
        "Slow attacks and long casts should begin only after the axe lands. Minion or companion builds must keep the player moving while the summon attacks; do not stand behind the companion in the frontal lane.",
        "If the fight lasts too long, first check weapon damage, main-skill level, compatible supports and resource sustain. More buttons are not automatically more single-target damage.",
      ],
      [
        "Melee: cross behind after lock-in.",
        "Ranged: strafe instead of backpedalling.",
        "Minions: preserve player visibility and recovery.",
        "Grenades or delayed skills: place them where the boss will finish the animation.",
      ],
    ),
    {
      ...baseSection(
        "troubleshooting",
        next(),
        "Troubleshooting",
        "troubleshooting",
      ),
      problems: [
        {
          symptom: "The red attack keeps killing me",
          checks: [
            "Stop retreating along the attack line.",
            "Wait for the aim commitment, then move laterally.",
            "Keep the arena edge behind the boss rather than behind the character.",
          ],
          directAnswer: [
            "The reliable answer is sideways movement after target lock.",
          ],
        },
        {
          symptom: "Adds overwhelm the arena",
          checks: [
            "Use a compact area skill on ranged mercenaries.",
            "Keep circling so the boss remains visible.",
            "Do not chase harmless melee adds across the arena.",
          ],
          directAnswer: [
            "Remove ranged pressure first, then resume boss damage.",
          ],
        },
        {
          symptom: "I run out of flask or mana",
          checks: [
            "Shorten the damage rotation.",
            "Remove an inefficient high-cost support.",
            "Use safe recovery windows instead of attacking continuously.",
          ],
          directAnswer: [
            "Sustainable damage wins this fight more reliably than one expensive burst.",
          ],
        },
        {
          symptom: "Melee has no opening",
          checks: [
            "Bait the overhead slam at medium range.",
            "Cross behind after the weapon commits.",
            "Use one short combo and leave before the sweep.",
          ],
          directAnswer: ["The slam recovery is the primary melee window."],
        },
      ],
    },
    {
      ...baseSection(
        "rewards",
        next(),
        "Quest reward and next step",
        "rewards",
      ),
      rewards: [
        {
          itemId: "uncut-skill-gem-5",
          label: "Level 5 Uncut Skill Gem",
          condition: "Defeat The Executioner and free Leitis",
          notes: [
            "Complete the rescue interaction to progress The Trail of Corruption and receive the quest reward recorded by the current quest reference.",
          ],
        },
        {
          itemId: "boss-drops",
          label: "Campaign boss loot",
          condition: "Boss kill",
          notes: [
            "Evaluate life, resistances, movement speed and useful weapon upgrades before continuing Act 1.",
          ],
        },
      ],
    },
    {
      ...baseSection(
        "related-content",
        next(),
        "Related preparation",
        "related-content",
      ),
      items: [
        {
          contentId: "act-1-4-boss-permanent-rewards-checklist",
          title: "Acts 1–4 boss and permanent reward checklist",
          description:
            "Track campaign objectives and verify reward completion.",
          contentType: "guide",
          href: "/en/guides/act-1-4-boss-permanent-rewards-checklist/",
        },
        {
          contentId: "count-geonor",
          title: "Count Geonor guide",
          description: "Prepare for the Act 1 finale after Ogham Village.",
          contentType: "boss",
          href: "/en/bosses/count-geonor/",
        },
      ],
    },
    faqSection(
      [
        [
          "Is fire resistance mandatory?",
          "The main weapon threat is physical, but fire resistance helps when ground effects and mercenaries overlap; use it if fire is the repeated cause of death.",
        ],
        [
          "Should I kill every add?",
          "Kill ranged or movement-blocking mercenaries first. Do not lose boss visibility chasing a low-threat add.",
        ],
        [
          "Where is the safest place to stand?",
          "At medium range with room to move sideways and without the arena wall directly behind you.",
        ],
        [
          "What is the best damage window?",
          "The long recovery after an overhead or committed line attack.",
        ],
        [
          "What should I do after the kill?",
          "Free Leitis, collect the quest reward, and confirm The Trail of Corruption updated.",
        ],
      ],
      next(),
    ),
    preservedSources(article, "sources-section", next()),
    changelogSection(
      [
        "Rebuilt the boss page with access, preparation, fight flow, telegraph-by-telegraph responses, build adjustments, recovery advice, and quest completion checks.",
      ],
      next(),
    ),
  ];
}

/**
 * 把第一批文章替换为与成熟分类一致的深度结构，并统一推进英语修订锚点。
 */
export function enrichFirstBatchArticle(article) {
  let sections = article.sections;
  if (buildSpecs[article.slug])
    sections = buildSections(article, buildSpecs[article.slug]);
  if (skillSpecs[article.slug])
    sections = skillSections(article, skillSpecs[article.slug]);
  if (itemSpecs[article.slug])
    sections = itemSections(article, itemSpecs[article.slug]);
  if (guideSpecs[article.slug])
    sections = guideSections(article, guideSpecs[article.slug]);
  if (article.slug === "the-executioner") sections = bossSections(article);

  const revisionNumber =
    article.slug === "act-1-4-boss-permanent-rewards-checklist" ? "04" : "03";
  const enriched = {
    ...article,
    updatedAt: DATE,
    lastVerifiedAt: DATE,
    revision: `${article.slug}-${DATE}-${revisionNumber}`,
    sections,
  };
  if (article.type === "guide") {
    enriched.estimatedReadingMinutes = Math.max(
      10,
      Math.ceil(JSON.stringify(sections).length / 1400),
    );
  }
  if (article.slug === "act-1-4-boss-permanent-rewards-checklist") {
    enriched.sources = [
      article.sources[0],
      {
        label: "PoE2DB current quest reward table",
        sourceType: "tool",
        url: "https://poe2db.tw/us/Quest",
      },
      {
        label: "PoE2 Wiki quest reward cross-check",
        sourceType: "community",
        url: "https://www.poe2wiki.net/wiki/Quest_rewards",
      },
    ];
  }
  return enriched;
}

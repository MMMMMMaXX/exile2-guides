/** 文件职责：维护第一批 15 篇攻略的简体中文母语译文，不包含稳定标识与事实源 URL。 */
export const locale = "zh-cn";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "概览",
    "pros-cons": "优点与取舍",
    leveling: "升级与转型",
    mapping: "刷图循环",
    bossing: "Boss 循环",
    mechanics: "核心机制",
    supports: "辅助宝石优先级",
    "build-use-cases": "构筑用途",
    properties: "属性",
    alternatives: "替代品与升级路线",
    "common-mistakes": "常见错误",
    "quick-answer": "直接答案",
    "progression-steps": "推荐推进路线",
    decisions: "决策规则",
    strategy: "安全打法",
    "build-considerations": "构筑准备",
    faq: "常见问题",
    sources: "来源与核验",
  },
  sourceLabel: "当前资料与交叉核验",
  sourceDescription: "文章事实由官方补丁、当前数据库与所列社区资料交叉核对。",
  verificationNote:
    "机制与版本范围已通过官方补丁、当前数据库和社区攻略交叉核对；第一方 PC 实机状态单独记录，不据此虚构实测结论。",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "大猴子 Spirit Walker 构筑：从 Tame Beast 到终局",
      shortTitle: "大猴子 Spirit Walker",
      summary:
        "以同伴为核心的 Spirit Walker：驯服 Mighty Silverfist，通过同伴继承与 Pounce、Maul、Pain Offering 组成低预算也能成型的战役到终局构筑。",
      description:
        "PoE2 0.5 大猴子 Spirit Walker 攻略，包含 Twister 升级、Tame Beast 转型、Mighty Silverfist、同伴缩放、防御、刷图和 Boss 循环。",
      imageAlt: "大猴子 Spirit Walker 构筑使用的 Mighty Silverfist",
      seoTitle: "大猴子 Spirit Walker 构筑攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 大猴子 Spirit Walker：驯服 Mighty Silverfist，完成升级转型、同伴缩放、刷图与 Boss 循环。",
    },
    overview: [
      "这套构筑让已驯服的独特野兽承担主要输出，Huntress 则用 Pounce 与 Maul 保持主动参战。Mighty Silverfist 的暴击基础优秀，是战役阶段最清晰的单体驯服目标。",
      "Tame Beast 不是开局就能获得。先用 Twister 或稳定的 Huntress 技能升级，预留洗点金币，等同伴天赋和技能齐全后再转型。",
    ],
    keyPoints: [
      "在第三幕驯服 Mighty Silverfist。",
      "困难稀有怪和 Boss 保持 Pain Offering。",
      "用 Pounce 与 Maul 维持自身输出和吸血。",
    ],
    pros: [
      "低成本也有强伤害。",
      "拿到驯服目标后适合 SSF。",
      "同伴能替你承受刷图压力。",
    ],
    cons: [
      "理想的驯服词缀需要时间寻找。",
      "天赋转型需要金币。",
      "狭窄场地中同伴走位偶尔不稳定。",
    ],
    leveling: [
      [
        "第一至二幕",
        "用 Twister 与 Whirling Slash 升级，同时补生命、抗性和攻击附加伤害。",
      ],
      [
        "第三幕转型",
        "完成第二次升华里程碑后驯服 Mighty Silverfist，把天赋移到同伴和共享伤害缩放。",
      ],
      [
        "初期地图",
        "先稳定生命、魔力恢复和护甲，再投资昂贵涂油或豪华同伴装备。",
      ],
    ],
    mapping: [
      "Pounce 进入怪群，用 Maul 保持自身贡献，让野兽处理密集敌人。不要跑出同伴交战范围，必要时重新召回和定位。",
    ],
    bossing: [
      "以 Pain Offering 开场，保持同伴持续锁定 Boss，并用 Pounce 跨越危险地面。只在安全窗口刷新 Offering。",
    ],
    faq: [
      [
        "什么时候转 Tame Beast？",
        "宝石在第 7 阶可用，但通常等第二次升华、同伴天赋足够后转型更顺。",
      ],
      [
        "必须使用 Mighty Silverfist 吗？",
        "不是。其他独特野兽也能用，但 Mighty Silverfist 是战役阶段最明确的高单体选择。",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "手雷 Gemling Legionnaire：升级、清图与 Boss 攻略",
      shortTitle: "手雷 Gemling Legionnaire",
      summary:
        "以 Explosive Shot 清图、手雷组合爆发的十字弩开荒构筑，利用 Gemling 品质缩放、Mirage Archer 与多层防御从战役推进到终局。",
      description:
        "PoE2 0.5 手雷 Gemling Legionnaire 攻略，包含战役换技、Explosive/Cluster/Oil Grenade、装备优先级和完整循环。",
      imageAlt: "使用十字弩和手雷的 Gemling Legionnaire",
      seoTitle: "手雷 Gemling Legionnaire 构筑（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 手雷 Gemling 开荒与终局攻略：升级换技、技能品质、防御、刷图及 Boss 循环。",
    },
    overview: [
      "Explosive Shot 负责日常清图，Explosive Grenade 与 Cluster Grenade 提供爆发；Oil Grenade 服务火焰增伤，Flash Grenade 创造眩晕防守窗口。",
      "Gemling Legionnaire 重视宝石品质和等级。开荒时及时换高伤十字弩，比强行追逐单件昂贵暗金更重要。",
    ],
    keyPoints: [
      "升级期间保持十字弩伤害跟得上区域。",
      "用 Mirage Archer 自动补充部分手雷输出。",
      "豪华伤害前先补生命、抗性、闪避和偏斜。",
    ],
    pros: [
      "清图快，Boss 爆发强。",
      "战役路线直接。",
      "护甲、闪避和能量护盾兼顾。",
    ],
    cons: [
      "爆炸特效较杂乱。",
      "终局冷却和品质装备较贵。",
      "手雷需要理解引信和落点。",
    ],
    leveling: [
      [
        "第一幕",
        "用 Permafrost Bolts 与 Fragmentation Rounds，并持续更新高伤十字弩。",
      ],
      [
        "第二幕",
        "改用 Explosive Shot 清图，加入 Explosive Grenade 和 Flash Grenade。",
      ],
      [
        "第三幕以后",
        "加入 Mirage Archer，后期补 Cluster Grenade；当品质收益明确时再点品质升华。",
      ],
    ],
    mapping: [
      "移动中发射 Explosive Shot，对耐打怪群投 Explosive Grenade，让 Mirage Archer 清理残敌；危险稀有怪接近时留 Flash Grenade。",
    ],
    bossing: [
      "先放 Oil Grenade，再部署 Cluster 与 Explosive Grenade，随后持续用 Explosive Shot。阶段切换前不要耗尽全部手雷次数。",
    ],
    faq: [
      [
        "十字弩最重要的属性是什么？",
        "优先高武器伤害和可用的投射物技能等级；合适的稀有弩胜过无关暗金。",
      ],
      [
        "什么时候点 Advanced Thaumaturgy？",
        "当主要手雷已有足够品质，能实际获得冷却、投射物或伤害收益时再点。",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye：开荒到终局构筑攻略",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "以 Lightning Arrow、Lightning Rod 引爆、Herald of Thunder 和 Deadeye 镜像组成的高速弓系刷图构筑，并提供非暴击到暴击的分阶段路线。",
      description:
        "PoE2 0.5 Lightning Arrow Deadeye 攻略，覆盖升级、Lightning Rod Boss 布置、Mirage Archer、弓制作和防御优先级。",
      imageAlt: "使用高速弓系攻击的 Deadeye",
      seoTitle: "Lightning Arrow Deadeye 构筑攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Lightning Arrow Deadeye：升级、Lightning Rod 循环、弓升级、刷图和巅峰 Boss 配置。",
    },
    overview: [
      "Lightning Arrow 快速清理怪群，Lightning Rod 把连续箭矢转化为集中的 Boss 伤害。Herald of Thunder 和镜像扩大覆盖，但不能取代正确的 Rod 布置。",
      "先用强力物理弓走非暴击路线；只有命中、暴击率和防御都稳定后，才转入暴击版本。",
    ],
    keyPoints: [
      "普通刷图通常只需 Lightning Arrow。",
      "打 Boss 前先放多根 Lightning Rod。",
      "品质优先给 Lightning Rod，再处理次要工具。",
    ],
    pros: ["顶级清图速度。", "开荒推进平滑。", "可扩展到巅峰内容。"],
    cons: [
      "前期防御偏薄。",
      "Boss 伤害需要铺设组合。",
      "后期弓和暴击装备昂贵。",
    ],
    leveling: [
      [
        "战役",
        "用 Lightning Arrow 与 Lightning Rod 升级，物理弓伤害落后区域时立即更换。",
      ],
      ["初期地图", "使用非暴击天赋，补满抗性并稳定闪避。"],
      [
        "暴击转型",
        "只有命中、弓伤、暴击率和防御齐备，且新配置确实更强时再切换。",
      ],
    ],
    mapping: [
      "普通怪群只用 Lightning Arrow；耐打稀有怪脚下放 Lightning Rod，再持续射击，让连锁与引爆重叠。",
    ],
    bossing: [
      "先铺一组 Lightning Rod，按配置补 Tornado Shot，再连续使用 Lightning Arrow。巅峰战可把范围辅助换成集中伤害。",
    ],
    faq: [
      [
        "0.5 还需要 Lightning Rod 吗？",
        "需要。它曾被削弱，但依然是主要单体伤害组件。",
      ],
      [
        "可以开局直接暴击吗？",
        "不建议。非暴击版本在命中、装备和防御尚未就绪时更可靠。",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado 技能攻略：元素地面吸收、上限与持续伤害",
      shortTitle: "Tornado",
      summary:
        "Tornado 创造会拉扯敌人的物理持续伤害风暴，并能吸收元素地面减益，附加对应元素伤害。",
      description:
        "PoE2 Tornado 攻略：8 秒持续时间、风暴上限、元素地面吸收、法术伤害缩放、辅助宝石与构筑用途。",
      imageAlt: "Acolyte of Chayula 构筑制造的 Tornado 风暴",
      seoTitle: "Tornado 技能与地面吸收攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Tornado：物理持续伤害、元素地面吸收、持续时间、数量上限、辅助与构筑用途。",
    },
    overview: [
      "Tornado 生成会拉扯附近敌人的风暴并造成物理持续伤害。与元素地面重叠时，它会吸收地面的减益并附加对应元素伤害。",
      "基础持续 8 秒、上限 1 个；品质可以增加持续时间与同时存在数量。",
    ],
    keyPoints: [
      "法术伤害可作用于持续伤害减益。",
      "风暴半径为 3 米。",
      "元素变体高度依赖地面吸收。",
    ],
    mechanics: [
      "Tornado 的核心是持续伤害，不是连续命中。元素地面会改变它施加的减益与额外伤害类型。",
      "增加数量上限允许多风暴并存，持续时间决定每次施放的有效覆盖；不要把它与投射物技能 Tornado Shot 混淆。",
    ],
    mechanicBullets: [
      "基础持续：8 秒。",
      "基础上限：1 个 Tornado。",
      "品质可增加持续时间和数量上限。",
    ],
    supports: [
      ["Prolonged Duration", "延长覆盖，减少补放频率。", "core"],
      ["Magnified Area", "提升拉怪与刷图覆盖。", "situational"],
      ["Physical Mastery", "提高物理技能等级。", "core"],
    ],
    buildUse: [
      "适用于 Archon 触发链、物理持续伤害，以及能稳定在风暴下铺设目标元素地面的组合。",
    ],
    mistakes: [
      "不要只堆命中伤害；确认地面真正与风暴重叠，不要把附近地面误认为已经吸收。",
    ],
    faq: [
      [
        "Tornado 能吸收多种元素吗？",
        "它可从已吸收的元素地面获得对应额外伤害，实际配置需要逐项保证重叠和持续。",
      ],
      [
        "Tornado 和 Tornado Shot 相同吗？",
        "不同。前者是持续伤害法术风暴，后者是独立的投射物攻击。",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning 技能攻略：电弧频率、Fire Infusion 与感电",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning 发射缓慢移动且本体不命中的投射物，每 0.2 秒向附近目标放出闪电。",
      description:
        "PoE2 Ball Lightning 攻略：放电频率、感电、投射物速度、Fire Infusion、燃烧地面、辅助与 Blood Mage 用法。",
      imageAlt: "Blood Mage 施放 Ball Lightning",
      seoTitle: "Ball Lightning 放电与 Infusion 攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Ball Lightning：0.2 秒放电、感电、Fire Infusion、投射物速度、辅助与构筑。",
    },
    overview: [
      "Ball Lightning 让缓慢投射物穿过敌人；球体本身不命中，而是反复向范围内目标放出闪电，同一目标每 0.2 秒可被放电一次。",
      "消耗 Fire Infusion 后，球体减速、留下燃烧地面，并在消失时产生火焰爆炸。",
    ],
    keyPoints: [
      "投射物本体不命中。",
      "闪电搜索半径 1.8 米。",
      "技能自带很高的感电概率。",
    ],
    mechanics: [
      "较慢移动能延长贴近 Boss 的时间，速度过高反而可能减少放电次数。范围和站位决定目标能否持续处在放电半径内。",
      "Fire Infusion 是独立的火焰地面与爆炸分支，应有意识地缩放，而不是把它当作免费闪电伤害。",
    ],
    mechanicBullets: [
      "同目标放电间隔：0.2 秒。",
      "目标半径：1.8 米。",
      "基础暴击率：9%。",
    ],
    supports: [
      [
        "Considered Casting",
        "适合可承受施法速度代价的自施法配置。",
        "situational",
      ],
      ["Magnified Area", "刷图时降低站位压力。", "situational"],
      ["Lightning Mastery", "兼容时提高闪电配置的技能等级。", "core"],
    ],
    buildUse: [
      "Ballcano Blood Mage 用 Ball Lightning 清图和制造感电，再用 Volcano 或其他法术集中处理 Boss。",
    ],
    mistakes: [
      "不要从球体接触判断伤害，因为本体不命中；也不要把投射物速度堆到目标来不及承受足够放电。",
    ],
    faq: [
      ["球体穿过敌人时会命中吗？", "不会，伤害来自反复放出的闪电。"],
      [
        "为什么使用 Fire Infusion？",
        "它增加燃烧地面和终点火焰爆炸，适合能稳定产生并缩放 Infusion 的混合配置。",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade 技能攻略：毒云、引爆与冷却",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade 生成持续扩大的毒云，燃烧效果或 Detonator 技能可将其引爆为火焰爆发，最多同时存在 6 片毒云。",
      description:
        "PoE2 Gas Grenade 攻略：毒云上限、施毒、火焰引爆、冷却恢复、辅助与 Pathfinder 循环。",
      imageAlt: "Pathfinder 投掷 Gas Grenade",
      seoTitle: "Gas Grenade 毒云与引爆攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Gas Grenade：6 片毒云上限、火焰引爆、冷却、品质、辅助与构筑。",
    },
    overview: [
      "Gas Grenade 弹跳后在引信结束时释放毒气。毒云以类似命中的方式施毒但不属于普通命中，随后持续扩大；燃烧效果或兼容 Detonator 可触发火焰爆炸。",
      "技能有多次冷却储存且最多保留 6 片毒云，因此循环重点是重叠、持续时间和次数恢复。",
    ],
    keyPoints: [
      "最多 6 片毒云。",
      "燃烧或 Detonator 会引爆毒云。",
      "品质提高冷却恢复和火焰伤害。",
    ],
    mechanics: [
      "毒云与火焰爆炸的缩放不同。毒流派看重混沌、毒效和持续时间；引爆流还需要可靠的点燃或 Detonator。",
      "0.3 以后 Gas Grenade 严格遵循手雷引信，需预判移动目标，而不能依赖落地即爆。",
    ],
    mechanicBullets: [
      "拥有 3 次冷却储存。",
      "毒云会扩大到当前上限。",
      "毒云不普通命中，但会按命中方式施毒。",
    ],
    supports: [
      ["Second Wind", "提高爆发窗口中的冷却弹性。", "core"],
      ["Persistent Ground", "适合延长毒云覆盖。", "situational"],
      ["Fire Mastery", "服务火焰引爆分支。", "situational"],
    ],
    buildUse: [
      "Pathfinder 可在 Boss 出现前铺云，叠加 Wither 与 Despair，再选择维持毒伤或引爆获得火焰爆发。",
    ],
    mistakes: [
      "不要在没有明确主分支时同时堆毒与火焰；注意 6 云上限，也不要在 Boss 可选中前耗尽全部次数。",
    ],
    faq: [
      [
        "Gas Grenade 不命中也能施毒吗？",
        "能。毒云不是普通命中，但会像命中一样对敌人施毒。",
      ],
      [
        "什么能引爆毒云？",
        "燃烧效果以及兼容的 Detonator 技能可以触发火焰爆炸。",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear 技能攻略：Frenzy Charge 分裂、闪电弹与感电",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear 命中后爆出 5 枚闪电弹；若有 Frenzy Charge，会消耗一颗并让主长矛向 3 个目标分裂。",
      description:
        "PoE2 Lightning Spear 攻略：物理转闪电、Frenzy Charge 分裂、次级闪电弹、感电、品质与 Amazon 用法。",
      imageAlt: "Amazon 投掷 Lightning Spear",
      seoTitle: "Lightning Spear 分裂机制攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Lightning Spear：转伤、5 枚闪电弹、Frenzy Charge 分裂、感电、品质和构筑。",
    },
    overview: [
      "Lightning Spear 投出一根长矛，命中后向附近敌人释放 5 枚次级闪电弹。有 Frenzy Charge 时，主长矛会消耗一颗并向 3 个目标分裂，然后各自产生爆发。",
      "主长矛把大部分物理转为闪电，次级闪电弹则完全转为闪电，并拥有更强的感电能力。",
    ],
    keyPoints: [
      "主长矛：80% 物理转闪电。",
      "次级闪电弹：100% 转换且固定 5 枚。",
      "消耗 Frenzy Charge 后向 3 个目标分裂。",
    ],
    mechanics: [
      "额外投射物影响次级闪电弹上限，不会按普通方式增加主长矛。主长矛不能穿透、分叉、连锁或返回。",
      "持续伤害依赖 Frenzy Charge 生成；供给不稳会同时损失覆盖和多重爆发。",
    ],
    mechanicBullets: [
      "攻击速度：基础的 60%。",
      "次级闪电弹在 5 米内寻找目标。",
      "品质可增加闪电弹并概率翻倍充能收益。",
    ],
    supports: [
      ["Lightning Mastery", "兼容时提高闪电技能等级。", "core"],
      ["Rapid Attacks", "改善较低基础攻速的手感。", "core"],
      ["Magnified Area", "提升刷图爆发覆盖。", "situational"],
    ],
    buildUse: [
      "Amazon 结合命中、暴击与 Frenzy Charge 生成，让长矛分裂稳定清图，并保留独立的单体循环。",
    ],
    mistakes: [
      "不要以为普通投射物词缀会增加主长矛；先修复 Frenzy Charge 持续和攻速，再判断终局表现。",
    ],
    faq: [
      [
        "Frenzy Charge 有什么作用？",
        "它让主长矛向 3 个目标分裂，每根分裂长矛随后都会产生闪电弹爆发。",
      ],
      [
        "主长矛能穿透或连锁吗？",
        "不能，主长矛遵循自身分裂规则，不能穿透、分叉、连锁或返回。",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego：Power Charge 准备、武器切换与构筑用途",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego 是独特 Siphoning Wand，用 Infusion 与武器切换流程为高投入法术构筑建立 Power Charge。",
      description:
        "PoE2 Adonia's Ego 攻略：Power Charge 流程、武器组使用、常见失效原因与 Stormweaver 构筑关联。",
      seoTitle: "Adonia's Ego Power Charge 与武器切换攻略",
      seoDescription:
        "PoE2 0.5 Adonia's Ego：Infusion 准备、武器切换、Power Charge、常见错误和 Stormweaver 用途。",
    },
    overview: [
      "Adonia's Ego 用于主动生成并消耗 Infusion，以建立 Power Charge。它通常放在独立武器组，避免干扰主伤害武器。",
      "它不是被动充能来源；玩家必须正确设置技能和武器组，并在地图开场或 Boss 前执行流程。",
    ],
    keyPoints: [
      "使用独立武器组完成准备。",
      "确认 Infusion 技能在正确武器组启用。",
      "主伤害组可以使用更强的稀有法杖或其他核心装备。",
    ],
    properties: [
      [
        "底材",
        "Siphoning Wand",
        "服务 Infusion 与 Power Charge 流程的独特法杖。",
      ],
      ["主要用途", "Power Charge 准备", "它支持准备序列，不替代主伤害循环。"],
      ["关键风险", "武器组设置", "错误的技能启用状态会让装备看起来无效。"],
    ],
    buildUse: [
      "Adonia's Trifusion Stormweaver 等配置把它放在副手组，产生 Infusion 并获得充能，然后切回主伤害组。",
    ],
    alternatives: [
      "不需要充能流程时，稀有法杖加 Focus 往往更强；只有构筑明确说明如何消耗充能时才值得购买。",
    ],
    mistakes: [
      "常见问题是技能启用在错误武器组，或没有先生成所需 Infusion；两个武器组之间的唯一 Rune 冲突也可能禁用流程。",
    ],
    faq: [
      [
        "Adonia's Ego 应该作为主伤害武器吗？",
        "通常不是。很多 0.5 配置把它放副手，主手使用更强法杖或法杖加 Focus。",
      ],
      [
        "为什么没有获得充能？",
        "先检查 Infusion 来源、武器组技能开关和唯一 Rune 冲突。",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards：环形投射物、法术缩放与构筑用途",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards 是独特 Chiming Staff，提供 Sigil of Power、法术伤害和施法速度，并让法术以环形额外发射 4 个投射物。",
      description:
        "PoE2 Sire of Shards 攻略：词缀、环形投射物、Sigil of Power、Ball Lightning 用途、取舍和替代品。",
      seoTitle: "Sire of Shards 环形投射物攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Sire of Shards：环形 +4 投射物、法伤、施法速度、Sigil of Power 和替代方案。",
    },
    overview: [
      "Sire of Shards 让兼容法术以环形额外发射 4 个投射物，同时提供 10 级 Sigil of Power、法术伤害、施法速度和少量元素抗性。",
      "环形模式清图覆盖优秀，但可能降低集中单体效率；评估时要看技能几何，而不只看面板法伤。",
    ],
    keyPoints: [
      "法术额外发射 4 个投射物。",
      "投射物以环形发射。",
      "提供 10 级 Sigil of Power。",
    ],
    properties: [
      ["法术伤害", "提高 80–120%", "全局施法者词缀，区间较宽。"],
      ["施法速度", "提高 10–20%", "改善自施法手感。"],
      ["投射物词缀", "环形 +4", "同时改变清图覆盖与 Boss 站位。"],
      ["需求等级", "25", "当前底材需求。"],
    ],
    buildUse: [
      "Ball Lightning 等法术可利用环形散射覆盖怪群，或贴近大型目标制造重叠；Ballcano Blood Mage 可把它当作过渡或核心武器。",
    ],
    alternatives: [
      "当集中 Boss 伤害、防御或暴击缩放更重要时，稀有长杖、法杖加 Focus 或专用暗金可能更强。",
    ],
    mistakes: [
      "额外 4 个投射物不等于 Boss 伤害必然变为 5 倍；环形几何决定真正穿过目标的数量。",
    ],
    faq: [
      [
        "所有法术都会获得 4 个投射物吗？",
        "只对兼容的投射物法术生效，非投射物法术不会获得环形发射。",
      ],
      [
        "法伤最高的卷一定最好吗？",
        "很重要，但施法速度和环形模式是否适合构筑，可能比小幅法伤差异更关键。",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title: "Crown of the Pale King：Thorns 反击、词缀与 Runemaster 升级",
      shortTitle: "Crown of the Pale King",
      summary:
        "低等级独特 Cultist Crown，提供物理 Thorns，并让 Thorns 能对所有命中反击。",
      description:
        "PoE2 Crown of the Pale King 攻略：Thorns 反击、护甲与能量护盾、生命词缀、Runemaster 升级和 Warbringer 用途。",
      seoTitle: "Crown of the Pale King Thorns 攻略（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5 Crown of the Pale King：对所有命中反击、生命与防御、词缀、升级路线和构筑。",
    },
    overview: [
      "Crown of the Pale King 通过增加物理 Thorns，并允许 Thorns 对所有命中反击，让早期反伤构筑成型。",
      "它还提供护甲、能量护盾、最大生命和物品稀有度；需求低，后期可升级为 Runemastered Cultist Crown。",
    ],
    keyPoints: [
      "Thorns 可对所有命中反击。",
      "增加物理 Thorns 伤害。",
      "可升级为 Runemastered Cultist Crown。",
    ],
    properties: [
      ["防御", "护甲与能量护盾提高 50–100%", "本地防御词缀区间较宽。"],
      ["最大生命", "+40–80", "前期实用的生存词缀。"],
      ["Thorns", "10–15 至 20–25 物理", "当前显式反伤区间。"],
      ["独特效果", "对所有命中反击", "Thorns 构筑的核心词缀。"],
    ],
    buildUse: [
      "Thorns Warbringer 用头盔让承受的命中稳定触发反击，再通过 Thorns、破甲和生存缩放安全承受驱动伤害的攻击。",
    ],
    alternatives: [
      "如果构筑已经解决触发，或更需要高护甲、生命、抗性与特殊腐化，稀有防御头盔会更合适。",
    ],
    mistakes: [
      "头盔不代表可以忽略防御。Thorns 要先活过命中，危险 Boss 重击仍然必须躲。",
    ],
    faq: [
      [
        "它会让每次命中都触发 Thorns 吗？",
        "核心词缀允许对所有命中反击，但角色仍需承受并活过伤害。",
      ],
      [
        "可以升级吗？",
        "可以，当前 Runeforging 系统包含 Runemastered Cultist Crown 配方。",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "PoE2 0.5 最佳 Atlas 天赋：前 20、40、60 点路线",
      shortTitle: "0.5 Atlas 天赋",
      summary:
        "分阶段 Atlas 方案：先保证 Waystone 续航和安全推进，再通过 Atlas Master 与单一收益机制完成专精。",
      description:
        "PoE2 0.5 Atlas 天赋攻略，包含前 20/40/60 点、Waystone 续航、Atlas Master、机制专精和洗点规则。",
      imageAlt: "Doryani 与 PoE2 终局 Atlas 界面",
      seoTitle: "PoE2 0.5 最佳 Atlas 天赋：20/40/60 点",
      seoDescription:
        "PoE2 0.5 Atlas 天赋路线：前 20、40、60 点，Waystone 续航、Atlas Master、收益机制和洗点规则。",
    },
    quickAnswers: [
      ["第一优先级", "先拿稳定 Waystone 续航和推进，再点专门收益。"],
      [
        "何时专精",
        "地图与防御稳定后选择一个机制，并组合对应 Atlas Master 与 Tablet。",
      ],
      ["何时洗点", "构筑无法安全处理机制，或材料成本超过预期收益时就应调整。"],
    ],
    overview: [
      "不存在永久唯一的最佳 Atlas。第一套天赋解决进入与续航，收益天赋必须等角色能稳定完成目标内容后再建立。",
      "把 20/40/60 点当作检查点，不要照抄一套默认你已有装备和完整解锁的终局树。",
    ],
    keyPoints: [
      "先续航，后收益。",
      "先完整专精一个机制，再分散投资。",
      "Tablet 和地图词缀必须服务当前策略。",
    ],
    steps: [
      ["前 20 点", "优先 Waystone 续航、地图推进和提高普通地图稳定性的节点。"],
      ["约 40 点", "选择支持目标循环的 Atlas Master，并进入一个专门机制分支。"],
      [
        "约 60 点",
        "完成机制奖励簇，增加安全的数量与稀有度，并避开构筑不能跑的词缀。",
      ],
      ["60 点以后", "只有第一套策略稳定且材料可负担时，才加入互补机制。"],
    ],
    decisions: [
      "高速大范围构筑适合 Breach 或 Delirium；耐打且伤害可控的构筑能处理 Expedition 与危险 Remnant；SSF 应优先确定性材料，而非只在交易服有价值的收益。",
    ],
    mistakes: [
      "不要在刚进地图时照抄高投入收益树，也不要把点数平均分给四个机制，更不要在证明能完成基础遭遇前购买昂贵 Tablet。",
    ],
    faq: [
      [
        "要立即冲物品数量吗？",
        "不要。只有 Waystone 续航与生存稳定后，数量才有意义。",
      ],
      [
        "如何选 Atlas Master？",
        "选择能强化你最稳定、也愿意长期刷的单一机制的 Master。",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "PoE2 0.5 货币刷取：预算、Atlas 与风险策略",
      shortTitle: "0.5 货币刷取",
      summary:
        "按角色强度、入场成本、流动性和失败风险选择 0.5 刷钱策略，而不是照搬会快速过时的每小时收益数字。",
      description:
        "PoE2 0.5 货币攻略：Expedition、Runes of Aldur、Breach、Delirium、Ritual 和低预算地图的成本与风险。",
      imageAlt: "PoE2 货币与制作材料",
      seoTitle: "PoE2 0.5 货币刷取：按预算选择策略",
      seoDescription:
        "按预算和构筑选择 PoE2 0.5 刷钱策略：Expedition、Rune、Breach、Delirium、Ritual 与 Atlas 配置。",
    },
    quickAnswers: [
      [
        "低预算",
        "先跑带续航节点的普通地图，出售高流动材料，不要购买昂贵邀请。",
      ],
      [
        "稳定策略",
        "Expedition 和 Grand Expedition 有清晰可交易产物，但需要认真规划 Remnant。",
      ],
      [
        "高波动",
        "Ritual、Delirium Boss Rush 和高价 Rune 赌博需要更大本金和风险承受力。",
      ],
    ],
    overview: [
      "利润会随市场价格变化，所以本指南比较策略结构，不承诺固定的每小时 Divine Orb。",
      "至少记录 20 次运行的成本、完成数、可售产物和失败，再决定策略是否有效。",
    ],
    keyPoints: [
      "流动性比理论价值更重要。",
      "稳定完成的普通策略通常胜过频繁死亡的高阶策略。",
      "开始样本前先定价投入材料。",
    ],
    steps: [
      [
        "稳定地图",
        "用 Waystone 续航和便宜 Tablet，直到角色能不浪费传送门地完成目标阶级。",
      ],
      [
        "选择单一循环",
        "按构筑优势和当前材料价格选择 Expedition、Rune、Breach、Delirium 或 Ritual。",
      ],
      ["记录 20 次", "统计总成本、直接货币、流动材料、贵重物品和失败。"],
      [
        "验证后放大",
        "只有扣除未售库存后仍为正收益，才购买更好的 Tablet 或邀请。",
      ],
    ],
    decisions: [
      "Expedition 适合会规划且耐打的构筑；Breach 与 Delirium 奖励高速范围清图；Ritual 需要封闭场地单体；高价值 Runes of Aldur 投入若期望值低于市价，直接出售更合理。",
    ],
    mistakes: [
      "不要把卖不出的稀有装备按乐观价格计入利润，不要忽略失败地图，也不要因三次好运就更换策略；高价制作必须先定义结果和止损。",
    ],
    faq: [
      [
        "最安全的起步刷法是什么？",
        "带续航节点的普通地图和高流动掉落，比构筑未验证时购买昂贵门票更安全。",
      ],
      [
        "多久重算一次收益？",
        "补丁、热门攻略或市场变化影响供需时，都应重算投入与产出价格。",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "PoE2 职业与升华：0.5 按玩法选择",
      shortTitle: "职业与升华",
      summary:
        "把当前职业按近战、远程、法术、召唤、变形和低操作玩法匹配，避免把补丁版本榜单当成永久答案。",
      description:
        "按玩法、复杂度、防御、SSF 需求和现有构筑攻略选择 PoE2 0.5 职业与升华。",
      imageAlt: "用于说明 PoE2 职业与升华选择的战斗场景",
      seoTitle: "PoE2 职业与升华选择攻略（0.5）",
      seoDescription:
        "按玩法、难度、防御、SSF 和构筑选择适合你的 PoE2 0.5 职业与升华。",
    },
    quickAnswers: [
      [
        "最简单的选择",
        "先选想玩的操作方式，再找一套包含完整升级路线的当前构筑。",
      ],
      [
        "职业限制",
        "基础职业决定天赋起点和可选升华，但大多数技能宝石不锁职业。",
      ],
      [
        "能否更换",
        "可按当前系统规则调整升华，但不能把一个基础职业变成另一个。",
      ],
    ],
    overview: [
      "职业选择不是永久技能锁定；它决定天赋树起点、属性便利和可用升华。",
      "第一名角色最重要的是攻略完整，而不是理论 S 级上限；优先选择换技清晰、装备常见且防御好理解的开荒构筑。",
    ],
    keyPoints: [
      "Warrior：护甲、重击、盾牌与 Thorns。",
      "Ranger/Huntress：弓、长矛、机动与同伴。",
      "Sorceress/Witch：法术、触发、召唤和生命/能量护盾机制。",
      "Mercenary/Monk：十字弩、品质缩放、长杖与高速近战。",
      "Druid：变形、植物与混合攻击/法术。",
    ],
    steps: [
      ["选择战斗距离", "先决定近战、远程攻击、法术、召唤或变形。"],
      ["选择复杂度", "选择你愿意长期维持的低操作、连招、触发或资源型玩法。"],
      ["检查开荒门槛", "首个构筑不要依赖稀有暗金、昂贵涂油或隐藏升华才运作。"],
      [
        "打开对应构筑",
        "确认攻略包含战役技能、天赋里程碑、装备优先级和备用方案。",
      ],
    ],
    decisions: [
      "重视速度的新手可选 Deadeye 等远程开荒；偏好耐久可选盾牌或护甲 Warrior；召唤玩家比较 Infernalist 与 Spirit Walker；法术玩家先决定简单自施法还是高级触发和资源循环。",
    ],
    mistakes: [
      "不要只看榜单字母，不要把展示装备当开荒装备，也不要在确认核心机制符合手感前决定升华。",
    ],
    faq: [
      [
        "每个职业都能用所有技能吗？",
        "许多技能只要满足武器和属性要求即可跨职业使用，但天赋位置与升华仍会造成明显差异。",
      ],
      [
        "新手最好的职业是什么？",
        "拥有当前、便宜且完整升级路线，并且你理解其循环和防御的职业才是最好选择。",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "PoE2 第一至四幕 Boss 与永久奖励清单",
      shortTitle: "第一至四幕 Boss 清单",
      summary:
        "区分第一至四幕的主线 Boss、永久奖励可选 Boss 和容易漏掉的任务物品。",
      description:
        "PoE2 第一至四幕清单：Boss 顺序、永久生命、Spirit、抗性、武器组天赋点，以及漏领奖励的补救方式。",
      imageAlt: "代表 PoE2 战役 Boss 清单的 Count Geonor",
      seoTitle: "PoE2 第一至四幕 Boss 与永久奖励清单",
      seoDescription:
        "追踪 PoE2 第一至四幕 Boss、生命、Spirit、抗性、武器组天赋点、可选目标与漏领奖励。",
    },
    quickAnswers: [
      ["主线 Boss", "跟随主线标记，这些战斗会开启后续区域或下一幕。"],
      [
        "永久奖励",
        "离开一幕前检查提供生命、Spirit、抗性和武器组天赋点的可选目标。",
      ],
      [
        "漏领奖励",
        "通过 Waypoint 返回，完成目标，并按要求使用或交付任务物品。",
      ],
    ],
    overview: [
      "本页把战役 Boss 路线加入永久奖励清单，帮助判断：现在必须打、现在值得绕路，还是以后回来。",
      "奖励数值和路线可能随战役调整变化；招式看单独 Boss 页，完整数值矩阵看永久奖励专题。",
    ],
    keyPoints: [
      "第一幕：Beira、Crowbell、King in the Mists、Candlemass。",
      "第二幕：Balbala 开首次试炼，Kabala 给武器组点数。",
      "第三幕：Mighty Silverfist、Ignagduk 等提供永久力量。",
      "第四幕与过渡章节加入新的 Spirit、抗性和推进奖励。",
    ],
    steps: [
      ["进入新一幕", "打开奖励清单，只标记当前补丁已确认的奖励。"],
      ["推进主线", "先击败主线 Boss 并开 Waypoint，再决定长距离支线。"],
      ["领取沿途奖励", "靠近主路或能解决当前构筑问题的永久奖励应当立即完成。"],
      ["地图前审计", "重投入终局装备前，回收所有遗漏的永久奖励。"],
    ],
    decisions: [
      "生存已经吃紧时优先抗性或生命；依赖光环、召唤或持续技能的构筑应尽快拿 Spirit；武器组点数对真正使用两套专精树的构筑价值最高。",
    ],
    mistakes: [
      "不要以为击杀 Boss 就自动领取所有奖励：有些掉落需右键使用，有些任务物品需交 NPC；战役 King in the Mists 与终局巅峰版本不是同一场战斗。",
    ],
    faq: [
      [
        "漏掉永久奖励还能回来吗？",
        "可以。用对应 Waypoint 返回完成 Boss 或任务，并确认奖励是否要使用或交付。",
      ],
      [
        "所有可选 Boss 都要立刻打吗？",
        "永久属性 Boss 通常值得；普通掉落 Boss 若绕路过长且不解决当前问题，可以以后再打。",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title: "The Executioner Boss 攻略：重击读条、援军与 Ogham Village 路线",
      shortTitle: "The Executioner",
      summary:
        "第一幕 Ogham Village 主线 Boss，缓慢但致命的物理重击、直线红光攻击和持续召唤的佣兵会惩罚正面站桩。",
      description:
        "PoE2 The Executioner 攻略：Ogham Village 位置、重击预兆、援军、安全站位、火抗准备与任务推进。",
      seoTitle: "The Executioner 第一幕 Boss 攻略（PoE2）",
      seoDescription:
        "击败 PoE2 第一幕 The Executioner：Ogham Village 路线、红光重击、援军、站位、准备和任务推进。",
    },
    overview: [
      "The Executioner 挡在第一幕 Ogham Village 主线路径上。攻击缓慢，但正面命中惩罚很重；援军若不处理，场地会迅速失控。",
      "安全打法是在中距离绕圈，Boss 明确蓄力后横向翻滚或穿到身后，并在回收动作期间输出。",
    ],
    keyPoints: [
      "位置：Ogham Village 尽头的 Executioner's Block。",
      "主要威胁：物理重击和正面横扫。",
      "结果：推进 The Trail of Corruption。",
    ],
    strategy: [
      "武器举起或 Boss 闪红时离开正面直线；距离远就横滚，贴身则穿过到背后。只在重击长后摇期间攻击。",
      "召唤佣兵时先杀远程敌人，并沿场地外圈移动；不要在投射物和燃烧地面重叠时贪 Boss。",
    ],
    strategyBullets: [
      "蓄力时不要站正面。",
      "清理援军后再回头输出。",
      "至少保留一次翻滚应对红光直线重击。",
    ],
    preparation: [
      "进入 Ogham Village 前升级主技能和武器。火抗能缓解区域和燃烧地面，足够生命与位移则可避免重型物理攻击直接秒杀。",
    ],
    faq: [
      [
        "The Executioner 在哪里？",
        "第一幕 Ogham Village 尽头的 Executioner's Block，通常位于 Waypoint 另一端。",
      ],
      ["最优先躲什么？", "红光或举锤重击，其次避免在宽幅横扫期间停在正面。"],
      [
        "击败后解锁什么？",
        "推进 The Trail of Corruption，并开启前往 Manor Ramparts 的路线。",
      ],
    ],
  },
};

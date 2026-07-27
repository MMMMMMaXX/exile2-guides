<!-- 文件职责：统一 Exile2 Guides 后续中英文草稿的术语、版本、来源、原创性与审核表达，避免翻译和事实口径漂移。 -->

# Exile2 Guides 双语术语与写作规范

> 文档更新时间：2026-07-27 20:42（Asia/Shanghai）

## 1. 适用范围与优先级

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

本规范适用于 Build、Boss、Item、Skill、Guide、Patch 六类内容的英文和简体中文版本，以及相关的 Metadata、FAQ、图片 Alt、来源说明和审核记录。`EXILE2-GUIDES-PRD.md` 仍是 MVP 唯一需求事实源；游戏事实以 GGG 第一方公告和 Max 的 PC 实机核验为准。

所有未核验正文继续使用 `status: draft` 和 `draft: true`。本规范不授予发布权限，也不替代每篇文章的 `reviewer`、`verifiedAt`、来源和 Patch 字段。

## 2. 名称与双语表达

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

1. 英文正文中的游戏专名保留 GGG 原始大小写、连字符和标点，不自行改写为更利于 SEO 的拼写。
2. 简体中文首次出现专名时使用 `英文原名（中文名）`；若没有已核验的官方简体中文名称，写作 `英文原名（中文工作译名）`，并在来源/审核记录中标记待确认。
3. 同一篇文章、同一 `contentId` 的中英文版本必须指向同一个对象、同一 Patch 与同一核验日期；不能为了本地化改变推荐、掉落或战斗结论。
4. 英文标题采用句式大小写或标题式大小写中的一种，并在同一内容类型内保持一致；中文标题不夹杂无意义的英文复数或全角半角混用。
5. 不把社区简称、旧版本名称或猜测的译名写进 slug、`contentId`、正文主标题或 Schema 名称。确认前只能放在草稿编辑注释中。

## 3. 术语表

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

| 英文术语                | 简体中文写法                                  | 使用说明                                                           |
| ----------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| Path of Exile 2         | Path of Exile 2 / 流放之路 2                  | 首次出现使用完整名称；未核验官方中文品牌时不擅自断言官方译名。     |
| Early Access            | 抢先体验                                      | 仅描述当前发行阶段，不承诺正式版日期。                             |
| Patch                   | Patch / 版本更新                              | 正文首次出现写完整编号，例如 `0.5.4`。                             |
| Hotfix                  | 热修复                                        | 必须写明对应 Patch，例如 `0.5.4d 热修复`。                         |
| Runes of Aldur          | Runes of Aldur（中文工作译名待核验）          | 0.5.4 相关专名；发布前须核对官方简体中文客户端或公告。             |
| Expedition              | Expedition（中文工作译名待核验）              | 遇到专名、机制和区域时不要混用。                                   |
| Grand Expedition        | Grand Expedition（中文工作译名待核验）        | 作为 Expedition 的特定内容，不能泛译成普通远征。                   |
| Atlas Passive Tree      | Atlas Passive Tree（中文工作译名待核验）      | 与角色 Passive Skill Tree 区分。                                   |
| Atlas Passive Point     | Atlas Passive Point（中文工作译名待核验）     | 数量、获得条件必须有来源与实机记录。                               |
| Remnant / Runic Remnant | Remnant / Runic Remnant（中文工作译名待核验） | 写作前核对客户端显示与物品/交互对象名称。                          |
| Liquid Verisium         | Liquid Verisium（中文工作译名待核验）         | Item 文章标题与首次提及时保留英文原名。                            |
| Unique Item             | Unique / 暗金物品                             | 具体类别、词缀和掉落来源必须逐项核验。                             |
| skill-granting Unique   | 赋予技能的 Unique                             | 不将“可用”解释成“适合所有 Build”。                                 |
| Waystone                | Waystone（中文工作译名待核验）                | 不与地图、区域或 Atlas 混写。                                      |
| Build                   | Build / 配装方案                              | 只在有职业、技能、装备、预算和实测边界时使用。                     |
| starter build           | 开荒 Build                                    | 必须明确适用阶段、预算和失败条件，不以“最强”代替证据。             |
| boss / pinnacle boss    | Boss / Pinnacle Boss                          | 首次出现须写官方全名与所在内容；不能虚构阶段或掉落。               |
| under review            | 待复核                                        | 用于 Patch 变化后暂时不可靠的结论；不是公开发布状态。              |
| draft / published       | 草稿 / 已发布                                 | 对应 Schema 字段，内容消费者只读取 `published` 且 `draft: false`。 |

## 4. Patch、日期与适用范围

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

- 每篇正文开头必须有“适用版本”行，例如：`Patch: Path of Exile 2 Early Access 0.5.4; reviewed against Hotfix 0.5.4d on 2026-07-27.`
- 中文对应写作：`适用版本：Path of Exile 2 Early Access 0.5.4；已于 2026-07-27 按 Hotfix 0.5.4d 复核。`
- 使用 ISO 日期 `YYYY-MM-DD`；文档维护时间使用 `YYYY-MM-DD HH:mm（Asia/Shanghai）`。
- 只能说明已核验的 PC 平台范围：Standalone、Steam、Epic Games Store。不得承诺或推断 PlayStation、Xbox 的按键、UI、购买、交易、性能或差异。
- Patch 或 Hotfix 变更可能影响文章时，先把文章改为 `under-review`/草稿流程并重新核验；不得只改标题日期。

## 5. 来源与原创性

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

1. 每篇至少包含一条 GGG 第一方来源；优先官方论坛、游戏官网新闻、官方 Steam 新闻和游戏内界面。社区 Wiki、数据库、视频或第三方镜像只能用于发现与交叉检查。
2. 来源条目必须包含：发布者、标题、URL、发布日期/访问日期、支持的具体事实。不能只写“官方公告”。
3. 用自己的语言概括公告，避免复制完整补丁说明、大段机制文本或逐字翻译。只在必要时短引，且紧邻来源链接。
4. 所有数值、掉落、任务解锁、对象名称、技能标签、机制条件、Boss 阶段和版本影响都必须标出对应来源或 PC 复现记录。
5. Build、效率、收益、难度、强度和“最佳”结论必须写前提、测试范围和失败条件；没有可复现证据时写“候选”或删除结论。

推荐来源格式：

```text
Source: Grinding Gear Games, “0.5.4 Patch Notes”, <URL>, published YYYY-MM-DD, accessed YYYY-MM-DD.
Supports: Liquid Verisium unlock condition and use target.

PC verification: Max, Standalone/Steam/Epic, character level X, area Y, YYYY-MM-DD.
Result: <observed fact only>.
```

## 6. 六类文章最小写作契约

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

| 类型  | 必须回答的问题                                          | 不得写入的内容                                       |
| ----- | ------------------------------------------------------- | ---------------------------------------------------- |
| Patch | 变更了什么、受谁影响、哪些结论待复核、官方原文在哪里    | 复制完整 Patch Notes、把未测改动当作结论。           |
| Guide | 读者从哪里开始、按什么顺序做、何时停止/改路线、前置条件 | 未验证的捷径、平台专属按键、把一次成功写成通用保证。 |
| Skill | 标签、消耗、触发/限制、搭配原因、替代方案               | 只凭 tooltip 推断隐藏机制、未测 DPS 断言。           |
| Item  | 物品类型、已核验属性/用途、获得或使用限制、替代项       | 虚构掉率、市场价格或必得结论。                       |
| Build | 职业/升华、技能、升级阶段、装备门槛、优缺点、实测边界   | “最强/必玩”、未验证预算、精确 DPS 或跨平台承诺。     |
| Boss  | 名称、进入条件、阶段、关键攻击、应对、失败恢复          | 虚构攻击名、掉落、阶段顺序或无证据的安全承诺。       |

## 7. 草稿到发布的编辑检查

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

- 英文审核者 Max 与中文审核者 Max 分别确认语义一致，不以机器翻译代替审核。
- 游戏事实审核者 Max 对 Patch、来源和 PC 复现结果签字；`reviewer` 与 `verifiedAt` 写入 front matter。
- 关联内容只链接已发布且同 Patch 仍有效的页面；草稿、模板、未核验样例不得出现在正文、Sitemap 或搜索索引。
- 元描述不堆砌关键词，不许承诺收益、DPS、掉率或“官方合作”。
- 引入图片前确认原创性或授权，Alt 只描述图片实际内容，不把未核验游戏事实塞进 Alt。
- 发布前运行 `npm run quality`，并抽查构建 HTML、canonical、hreflang、Sitemap 与搜索索引。

## 8. 维护规则

> 本节更新时间：2026-07-27 20:42（Asia/Shanghai）

新增已核验术语时，先在本表追加英文原名、中文写法、适用 Patch、来源与审核日期，再使用到新的中英文草稿。若官方名称或机制发生变化，保留旧名称的历史说明并标记受影响文章为待复核；不要静默替换，避免读者与编辑无法追踪版本差异。

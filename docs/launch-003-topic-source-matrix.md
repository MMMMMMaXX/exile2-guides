<!-- 文件职责：记录 LAUNCH-003 的首发草稿、内部研究、官方来源和发布前核验边界；不得将本表当作已核验攻略正文。 -->

# LAUNCH-003 首发选题与官方来源矩阵

> 文档更新时间：2026-07-27 23:38（Asia/Shanghai）

## 使用边界

> 本节更新时间：2026-07-27 23:38（Asia/Shanghai）

本表的 Patch 基线为 `Path of Exile 2 Early Access 0.5.4`，客户端核验版本为 `0.5.4d`。两者是独立字段：0.5.4d 公告只可支持其明确列出的迁移调整，不能被用于推断其他机制变化。所有公开候选仍是 `draft`，不进入生产路由、Sitemap 或搜索索引。

指定的事实审核者在把草稿转为公开内容前，必须完成中英文事实审核、游戏内 PC 核验和逐篇发布批准。

## 来源登记

> 本节更新时间：2026-07-27 23:38（Asia/Shanghai）

| 编号    | 一手来源                                                                         | 用途                                                                             |
| ------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| SRC-001 | [0.5.4 Patch Preview](https://www.pathofexile.com/forum/view-thread/3975135)     | 确认 0.5.4 的官方预览范围。                                                      |
| SRC-002 | [0.5.4 Patch Notes](https://www.pathofexile.com/forum/view-thread/3975218)       | Liquid Verisium、Atziri's Vault / Orb of Sacrifice、赋予技能 Unique 等具体机制。 |
| SRC-003 | [0.5.4d Hotfix](https://www.pathofexile.com/forum/view-thread/3987607)           | 仅确认公告中列出的迁移调整。                                                     |
| SRC-004 | [官方 Ascendancy Classes](https://www.pathofexile.com/forum/view-thread/3592012) | 未来具体 Build 选题中的职业与 Ascendancy 命名核对。                              |

实际首发草稿直接引用 SRC-001、SRC-002 与 SRC-003；不再以 Steam 新闻列表作为主要事实来源。

## 当前公开候选（均为 draft）

> 本节更新时间：2026-07-27 23:38（Asia/Shanghai）

| ID       | 内容 ID                            | 类型              | 当前双语文件  | 事实边界                                                                                                                                                  | 状态         |
| -------- | ---------------------------------- | ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| TOPIC-01 | `patch-0-5-4-runes-of-aldur`       | Patch             | 英文/简中各 1 | 区分 0.5.4 与 0.5.4d 公告内容。                                                                                                                           | 草稿、待复核 |
| TOPIC-02 | `expedition-atlas-first-points`    | Guide             | 英文/简中各 1 | Expedition Atlas 的具体点数与路线仍须 PC 核验。                                                                                                           | 草稿、待复核 |
| TOPIC-03 | `liquid-verisium-safety-checklist` | Guide             | 英文/简中各 1 | 属于 Runes of Aldur / Expedition；使用后立即开始带随机 Runic Inscription 的 Runic Remnant Encounter；分配 Feeling Lucky? 后可向 Farrow 用 Verisium 购买。 | 草稿、待复核 |
| TOPIC-04 | `skill-granting-unique-scaling`    | Guide / Mechanics | 英文/简中各 1 | 记录赋予技能 Unique 的等级缩放规则，不作为具体 Skill 或 Build 推荐。                                                                                      | 草稿、待复核 |
| TOPIC-06 | `liquid-verisium`                  | Item              | 英文/简中各 1 | 不与 Atziri's Temple 直接关联。                                                                                                                           | 草稿、待复核 |
| TOPIC-07 | `orb-of-sacrifice-currencies`      | Guide / Mechanics | 英文/简中各 1 | Atziri's Vault 有机会掉落四种 Orb of Sacrifice 中的一种；系列用于升级 Corrupted Enchantment 并随机移除一个 Explicit Modifier。                            | 草稿、待复核 |
| TOPIC-10 | `atziri-red-queen`                 | Boss              | 英文/简中各 1 | 仅记录 Vault 与 Orb 的公告关系；地点、阶段和攻击字段尚未知。                                                                                              | 草稿、待复核 |
| TOPIC-11 | `arbiter-of-ash`                   | Boss              | 英文/简中各 1 | 所有遭遇细节仍须 PC 核验。                                                                                                                                | 草稿、待复核 |

## 内部 research/verification（不计入首发文章）

> 本节更新时间：2026-07-27 23:38（Asia/Shanghai）

`expedition-starter-build-candidate`、`level-scaling-unique-build-candidate` 与 `runic-skill-verification` 已移至 `research/verification/` 的中英文内部文件。它们不参与内容扫描、公开路由、Sitemap 或搜索索引。

## 新的具体公开主题提案

> 本节更新时间：2026-07-27 23:38（Asia/Shanghai）

以下是待创建的具体选题，不是现有文章，也不是已确认 Build 结论。创建草稿前仍须补齐对应一手来源和 PC 证据：

| 提案                                                                                                        | 明确元素                                                                                               | 创建前还需核验                                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `Sorceress Stormweaver Mana Drain Leveling Build` / `Sorceress Stormweaver Mana Drain 升级 Build`           | 职业 Sorceress、Ascendancy Stormweaver、主技能 Mana Drain、从可装备 Lifesprig 起到替换节点的升级路线。 | 完整技能来源、路线、装备替换与 PC 测试。           |
| `Lifesprig Mana Drain Sorceress Stormweaver Build` / `Lifesprig Mana Drain Sorceress Stormweaver Build`     | Unique Lifesprig、职业 Sorceress、技能 Mana Drain。                                                    | 物品当前文本、每个等级断点、可行性和替代方案。     |
| `Mana Drain from Lifesprig: Requirements and Level Scaling` / `Lifesprig 赋予的 Mana Drain：需求与等级缩放` | 明确技能 Mana Drain。                                                                                  | 当前客户端文字、标签、消耗、等级显示与可复现截图。 |

以上提案仅在审核字段齐全并完成逐篇批准后才可从 draft 转为 published。

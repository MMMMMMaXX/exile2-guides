<!-- 文件职责：记录 LAUNCH-011 的逐篇发布候选门禁、法律页技术复核和需要 Max 明确签核的发布决定；不构成法律意见或游戏事实核验。 -->

# LAUNCH-011 发布候选与法律复核台账

> 文档更新时间：2026-07-27 23:38（Asia/Shanghai）

## 1. 使用边界

> 本节更新时间：2026-07-27 22:47（Asia/Shanghai）

本台账只准备发布候选，不授予发布权限。`EXILE2-GUIDES-PRD.md` 仍是 MVP 唯一需求事实源；游戏事实审核、法律责任和对外发布决定只能由 Max 完成。未获得下表逐篇签核时，任何对应中英文文件都必须维持 `status: draft`、`draft: true` 和 `patchStatus: under-review`。

完成签核后，仍需逐篇补齐真实的 `reviewer`、`verifiedAt`、`publishedAt`、`updatedAt`、最终 Patch 状态和正文事实，再运行完整质量链。不得以这份台账、来源链接或候选标题代替 PC 实机复现。

## 2. 发布候选总览

> 本节更新时间：2026-07-27 22:47（Asia/Shanghai）

| 主题 ID  | 内容 ID                            | 类型              | 当前双语文件  | 当前状态     | 已具备的准备                        | 发布前仍缺少的强制项                                                 | Max 发布决定 |
| -------- | ---------------------------------- | ----------------- | ------------- | ------------ | ----------------------------------- | -------------------------------------------------------------------- | ------------ |
| TOPIC-01 | `patch-0-5-4-runes-of-aldur`       | Patch             | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、Patch/Hotfix 研究范围 | 逐条比对 0.5.4/0.5.4d 原文与 PC 结果；双语审核；审核字段             | 未批准       |
| TOPIC-02 | `expedition-atlas-first-points`    | Guide             | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、Atlas 核验清单        | 点数、节点、进入方式和路线的 PC 复现；双语审核；审核字段             | 未批准       |
| TOPIC-03 | `liquid-verisium-safety-checklist` | Guide             | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、交互核验清单          | 解锁、目标、限制与 0.5.4d 交互结果；双语审核；审核字段               | 未批准       |
| TOPIC-04 | `skill-granting-unique-scaling`    | Guide / Mechanics | 英文/简中各 1 | 草稿、待复核 | 0.5.4 一手机制说明                  | 具体 Unique/Skill 的客户端记录、多等级 PC 测试；双语审核；审核字段   | 未批准       |
| TOPIC-06 | `liquid-verisium`                  | Item              | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、物品核验范围          | 来源、堆叠、目标限制和使用结果的 PC 记录；双语审核；审核字段         | 未批准       |
| TOPIC-07 | `orb-of-sacrifice-currencies`      | Guide / Mechanics | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、系列机制风险框架      | 四个变体分别核验；Vault 来源、词缀移除与结果的 PC 记录；审核字段     | 未批准       |
| TOPIC-10 | `atziri-red-queen`                 | Boss              | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、战前核验范围          | 正确名称、入场、阶段、攻击、掉落和应对的 PC 记录；双语审核；审核字段 | 未批准       |
| TOPIC-11 | `arbiter-of-ash`                   | Boss              | 英文/简中各 1 | 草稿、待复核 | A 级来源定位、战斗核验范围          | 正确名称、机制、伤害窗口、失败恢复和 PC 记录；双语审核；审核字段     | 未批准       |

“英文/简中各 1”表示同一 `contentId` 的两个草稿文件均存在；它不表示两个版本已审核或允许公开。当前 9 个公开主题、18 个文件的 `reviewer` 为空，且未填写 `verifiedAt`，故都没有发布资格。原 TOPIC-05、TOPIC-08 与 TOPIC-09 已移至 `research/verification/`，不属于首发文章。

## 3. 指定事实审核者逐篇签核格式

> 本节更新时间：2026-07-27 22:47（Asia/Shanghai）

当且仅当所有必要事实已经在 PC（Standalone、Steam 或 Epic Games Store）实测并完成英/中文审核后，指定的事实审核者可按以下格式回复。每行只授权一个 `contentId`；未列出的主题继续为草稿。

```text
发布批准：<contentId>
Patch/Hotfix：Path of Exile 2 Early Access 0.5.4 / 0.5.4d
游戏事实审核：Max，已完成，日期 YYYY-MM-DD
英文审核：Max，已完成，日期 YYYY-MM-DD
中文审核：Max，已完成，日期 YYYY-MM-DD
视觉素材：无 / 已按 LAUNCH-010 台账确认
允许执行：将该主题的英文和简体中文文件改为 published，并运行完整 quality
```

若任一项未完成，请明确回复“保持草稿：`<contentId>`”，而不是填写未来日期或以“之后补充”替代核验。若 Patch 或 Hotfix 已变动，应先把相应主题继续留在待复核状态。

## 4. 公开法律页与联系信息：技术一致性复核

> 本节更新时间：2026-07-27 22:47（Asia/Shanghai）

本节只检查当前页面文案是否与已确认的 MVP 技术事实一致，不提供中国、目标市场或任何地区的法律意见。最终法律适用性、主体责任、保留期限和通知义务仍由 Max 负责，并已保留为 ACTION-006 的运营审批事项。

| 页面           | 路由                                            | 与当前 MVP 的技术一致性                                          | 复核结果 | 仍需运营者持续确认                     |
| -------------- | ----------------------------------------------- | ---------------------------------------------------------------- | -------- | -------------------------------------- |
| About          | `/en/about/`、`/zh-cn/about/`                   | 只读、人工核验、草稿排除、非官方身份                             | 通过     | 后续实际流程变动时更新文字             |
| Contact        | `/en/contact/`、`/zh-cn/contact/`               | 公开邮箱 `contact@stratlore.com`；无后端表单                     | 通过     | 持续监控邮箱及版权/更正请求            |
| Privacy Policy | `/en/privacy-policy/`、`/zh-cn/privacy-policy/` | 无账号、支付、上传、评论、数据库、分析、广告、联系表单或主动存储 | 通过     | 启用任何追踪、表单或偏好前先评估并更新 |
| Terms of Use   | `/en/terms-of-use/`、`/zh-cn/terms-of-use/`     | 内容仅作一般参考；版本可能变化；不作效果保证                     | 通过     | 发布范围或商业模式变化时复核           |
| Cookie Policy  | `/en/cookie-policy/`、`/zh-cn/cookie-policy/`   | 无主动 Cookie/LocalStorage；无分析/广告 Cookie                   | 通过     | 引入任何 Cookie 或本地偏好前更新       |
| Disclaimer     | `/en/disclaimer/`、`/zh-cn/disclaimer/`         | 独立非官方站；不作交易、投资或现实货币收益建议                   | 通过     | 商标、授权或站点用途变化时复核         |

## 5. 技术发布前门禁

> 本节更新时间：2026-07-27 22:47（Asia/Shanghai）

在收到逐篇批准、修改任何文章状态后，按以下顺序执行：

1. 检查中英文 front matter 的 `contentId`、`slug`、Patch、审核字段和日期一致；移除所有 `Draft:`、候选和未核验占位表述。
2. 确保发布文章不关联草稿、模板或过期 Patch；如无已发布的关联内容，保留空关联列表。
3. 运行 `VITE_SITE_URL=https://poe2.stratlore.com npm run quality`。
4. 逐篇检查构建产物：完整正文、canonical、hreflang、Article/Breadcrumb Schema、来源，及正确语言的 Sitemap 和搜索索引。
5. 抽查 404、空分类页、`robots.txt`，并确认未批准主题的 slug、标题、正文仍不存在于公开构建产物。
6. 保持 Analytics、Ads、第三方追踪、生产部署、DNS 修改和 Search Console Sitemap 提交为关闭状态；它们不属于 LAUNCH-011。

## 6. 当前阻塞与下一步

> 本节更新时间：2026-07-27 22:47（Asia/Shanghai）

LAUNCH-011 的技术准备可以继续，但“批量状态切换”和生产文章 HTML 抽查被 ACTION-008 阻塞：Max 尚未对任一 `contentId` 给出符合第 3 节格式的明确发布批准。ACTION-007 的真实 Safari/iOS/Android 设备验收也仍待记录。

在获得至少一篇批准前，不应把本任务标记为完成，也不应推进 LAUNCH-012。

<!-- 文件职责：记录 Boss 列表与详情契约，供内容编辑和后续扩展保持同一核验边界。 -->

# Bosses 页面说明

> 本节更新时间：2026-07-30 22:35（Asia/Shanghai）

## JSON 化改造

> 本节更新时间：2026-07-30 22:35（Asia/Shanghai）

Bosses 已完成与 Builds 相同的 JSON 化改造：

- **唯一 Schema**：`lib/bosses/schema.ts` 定义 `BossArticle` 与 12 种 `BossSection` 判别联合。
- **可替换数据层**：`BossRepository` 接口 + `InMemoryBossRepository` + `BossService`。
- **构建期加载**：`lib/bosses/json-repository.server.ts` 发现、解析并校验 JSON，浏览器不直接读取文件系统。
- **内容适配器**：`bossArticleToParsedContent` 投影到通用内容索引，保持搜索、SEO 和关联模块只有一套公共数据链。
- **结构化渲染**：`components/bosses/boss-section-renderer.tsx` 按 `section.type` 显式 switch 穷举 12 种章节。
- **聚合路由**：`/:locale/bosses/categories/:category` 和 `/:locale/bosses/acts/:act`。

## 公开数据边界

> 本节更新时间：2026-07-30 22:35（Asia/Shanghai）

`/:locale/bosses/` 只读取构建期虚拟内容模块中的 `published` Boss 页面；草稿、样例和未核验内容不会进入页面、站点地图或搜索索引。页面在每种语言少于两篇已发布 Boss 时输出 `noindex, follow`，但保留可访问的真实空状态。

## 列表与筛选

> 本节更新时间：2026-07-30 22:35（Asia/Shanghai）

列表按 `updatedAt` 倒序展示，筛选仅有四个维度：Campaign / Endgame（`campaignStage`）、Act / Area（`location`）、Difficulty（编辑字段）和 Patch。Boss 卡片只显示已通过 Schema 的名称、位置、建议等级（存在时）、战役阶段、主要伤害类型、摘要和更新时间。

## 详情页

> 本节更新时间：2026-07-30 22:35（Asia/Shanghai）

Boss 详情复用文章布局、面包屑、目录、关联内容和来源核验区块，并新增“战前快速准备”摘要。摘要只读取位置、战役/终局语境、建议等级、主要伤害类型和编辑难度；不会补造攻击模式、危险等级、掉落或“最佳 Build”结论。此类结论必须由后续已核验 JSON 正文及来源支持后才可发布。

## 发布门禁

> 本节更新时间：2026-07-30 22:35（Asia/Shanghai）

Boss 发布门禁采用 pending-pc 友好策略：

- 禁止占位符（TODO/REPLACE_WITH_/example.invalid/draft/草稿）。
- 必须有 sections、sources、reviewer、publishedAt。
- **不强制** difficulty/damageTypes/phases 完整——允许待核验 Boss 以结构化核验计划形式发布。
- `verificationStatus === "verified"` 时要求 verifiedClientVersion，且此时 difficulty/damageTypes/phases 必须完整。

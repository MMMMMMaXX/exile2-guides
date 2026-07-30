<!-- 文件职责：说明 TASK-012 的 Item 页面数据边界、筛选语义与详情页事实摘要。 -->

# Items 页面说明

> 本节更新时间：2026-07-30 23:30（Asia/Shanghai）

Items 不是完整物品数据库，只发布有明确攻略价值的 Unique Item、属性选择、物品选择或制作材料说明。公开列表仅消费已发布内容，并按 Item Type、Use Case 和 Patch 筛选；动态价格、个性化 Keep/Sell 判断、未经授权的官方图标不在 MVP 内。详情页展示 Schema 已核验的物品类型、稀有度、需求等级（存在时）与适用场景，正文负责 What It Does、词缀、适用 Build、替代、可核验的获取方式、误区、FAQ 与来源。

## JSON 化改造

> 本节更新时间：2026-07-30 23:30（Asia/Shanghai）

Items 已完成从 Markdown 到结构化 JSON 的迁移，与 Builds、Bosses 共享同一套基础层（`lib/content/section-schema.ts`）和管线架构。

### 数据层

- `lib/items/schema.ts`：ItemSection 判别联合（6 种章节类型）+ ItemArticle 顶层结构 + 发布门禁
- `lib/items/repository.ts`：抽象仓储接口 + 内存实现
- `lib/items/service.ts`：筛选、排序、查询参数解析
- `lib/items/json-repository.server.ts`：构建期 JSON 发现、解析、跨文件冲突检测
- `lib/items/content-adapter.ts`：投影到通用 ContentFrontMatter + ParsedContent
- `lib/items/taxonomy.ts`：聚合词表（itemCategorySlugs）和筛选规则

### 章节类型

| 类型                                                                               | 语义                           |
| ---------------------------------------------------------------------------------- | ------------------------------ |
| overview / acquisition / use-cases / alternatives / common-mistakes / verification | 叙述型（paragraphs + bullets） |
| properties                                                                         | 物品属性键值对                 |
| acquisition-steps                                                                  | 获取方式有序步骤               |
| faq / video / changelog                                                            | 复用共享结构                   |

### 聚合路由

- `/:locale/items/categories/:category`：按物品分类聚合，词表为 weapons / off-hand / armour / jewellery / currency / unique-items
- Sitemap ≥2 阈值：分类下不足两篇已发布内容时 noindex,follow

### 发布门禁

- pending-pc 友好：允许待核验物品以结构化核验计划形式发布
- verified 状态要求完整物品事实（itemType / rarity / itemCategory）
- 发布内容禁止占位符（TODO / REPLACE_WITH_ / 草稿）
- section id 和 order 文章内唯一

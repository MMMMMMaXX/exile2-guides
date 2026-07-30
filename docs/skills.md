<!-- 文件职责：说明 TASK-013 的 Skill 列表卡片和详情页内容契约，防止技能事实与编辑建议混淆。 -->

# Skills 页面说明

> 本节更新时间：2026-07-30 23:58（Asia/Shanghai）

Skills 列表只显示已发布条目的名称、技能类型、标签、可核验时的需求等级、摘要和版本。详情页的快速信息来自 Schema，正文首段必须先以通俗语言解释技能实际如何使用；随后区分官方事实、编辑建议和社区常见实践，并覆盖核心机制、成长、推荐辅助、兼容玩法、关联 Build、练级使用、常见错误、FAQ 和来源。

## JSON 化改造

> 本节更新时间：2026-07-30 23:58（Asia/Shanghai）

Skills 已完成从 Markdown 到结构化 JSON 的迁移，与 Builds、Bosses、Items 采用相同范式。

### Schema 结构

- **SkillArticle**：顶层结构，包含 `skillType`（active/support/passive）、`requiredLevel`、`skillCategory`、`skillTags` 等语义字段
- **SkillSection**：判别联合，支持 6 种叙述型章节 + supports + properties + faq/video/changelog

### 章节类型

| 类型                                                                    | 语义                           |
| ----------------------------------------------------------------------- | ------------------------------ |
| overview / mechanics / build-use-cases / common-mistakes / verification | 叙述型（paragraphs + bullets） |
| supports                                                                | 推荐辅助宝石列表               |
| properties                                                              | 技能属性键值对                 |
| faq / video / changelog                                                 | 复用共享结构                   |

### 聚合路由

- `/:locale/skills/categories/:category` — 按技能分类聚合
- 分类词表：active, support, spirit, meta, lineage, ascendancy
- 不足 2 篇已发布内容时 noindex,follow

### 发布门禁

- 草稿允许 `skillType`/`skillCategory` 为 null
- `verified` 状态要求完整技能事实（skillType + skillCategory）
- 已发布内容必须有 sections、sources、reviewer、publishedAt

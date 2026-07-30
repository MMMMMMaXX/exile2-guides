<!-- 文件职责：说明 Guides 模块的 JSON 内容契约、数据层、渲染器和聚合路由。 -->

# Guides 页面说明

> 本节更新时间：2026-07-31 00:35（Asia/Shanghai）

## 内容契约

Guides 使用结构化 JSON（`lib/guides/schema.ts`）作为唯一内容契约，不再使用 Markdown。

- **GuideArticle**：顶层结构，包含 `guideCategory`（beginner / campaign / mechanics / crafting-trading / endgame-atlas / troubleshooting）、`estimatedReadingMinutes`、`prerequisites` 和类型化关联 ID 列表。
- **GuideSection**：判别联合，支持 5 种叙述型（overview / preparation / decisions / common-mistakes / verification）、3 种步骤型（progression-steps / verification-steps / checklist）以及 faq / video / changelog。
- **发布门禁**：pending-pc 友好策略；verified 状态要求 guideCategory 完整；published 不允许 draft/TODO/placeholder 值。

## 数据层

- `lib/guides/repository.ts`：抽象仓储接口 + InMemory 实现。
- `lib/guides/json-repository.server.ts`：构建期 JSON 文件加载、Zod 校验、跨文件冲突检测。
- `lib/guides/service.ts`：筛选、排序和查询业务规则。
- `lib/guides/content-adapter.ts`：投影到通用 ContentFrontMatter 和 ParsedContent。
- `lib/guides/taxonomy.ts`：分类聚合词表与匹配规则。

## 渲染器

`components/guides/guide-section-renderer.tsx` 按 order 排序、跳过隐藏章节、编号 toc 章节，并输出双语外部资料免责声明。

## 聚合路由

- `app/routes/guide-collection.tsx`：渲染 `/:locale/guides/categories/:category` 聚合页。
- 不足 2 篇时 `noindex, follow`；≥2 篇进入 Sitemap。
- `lib/prerender/public-paths.ts` 枚举 12 个双语分类路径。

## 内容文件

10 个 JSON 文件位于 `content/{en,zh-cn}/guides/`：4 篇已发布（pending-pc）+ 1 个草稿模板 × 2 语言。

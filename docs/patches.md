<!-- 文件职责：说明 Patches 模块的 JSON 内容契约、数据层、渲染器和聚合路由。 -->

# Patch Notes 页面说明

> 本节更新时间：2026-08-01 01:05（Asia/Shanghai）

## 内容契约

Patches 使用结构化 JSON（`lib/patches/schema.ts`）作为唯一内容契约，不再使用 Markdown。

- **PatchArticle**：顶层结构，包含 `patchCategory`（major-updates / balance / hotfixes / bug-fixes）、`patchVersion` 和类型化关联 ID 列表。
- **PatchSection**：判别联合，支持 5 种叙述型（overview / important-changes / build-impact / re-verification / follow-up）、2 种步骤型（verification-steps / checklist）以及 faq / video / changelog。
- **发布门禁**：pending-pc 友好策略；verified 状态要求 patchCategory 完整；published 不允许 draft/TODO/placeholder 值。

## 数据层

- `lib/patches/repository.ts`：抽象仓储接口 + 内存实现。
- `lib/patches/service.ts`：筛选、排序和查询服务。
- `lib/patches/json-repository.server.ts`：构建期 JSON 发现、校验和跨文件冲突检测。
- `lib/patches/content-adapter.ts`：将 PatchArticle 投影到通用内容索引。
- `lib/patches/taxonomy.ts`：聚合词表与匹配规则。

## 渲染器

`components/patches/patch-section-renderer.tsx` 按判别联合渲染正文，复用共享 NarrativeContent、FaqList、VideoList、ChangelogList 组件。

## 聚合路由

`app/routes/patch-collection.tsx` 渲染 `/:locale/patches/categories/:category` 聚合页，不足两篇时 noindex。

## 原始定位

Patch 页面不复制整篇官方补丁说明。已发布页面提供官方链接、重要变化编辑摘要、对已发布 Build/Skill/Item 页面的影响，以及需要复查或标记 Legacy 的内容。`under-review` 与 `legacy` 状态会在详情页正文前显示可见提示；该提示也可用于其他受影响攻略。没有核验时不得虚构改动结论。

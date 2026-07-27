<!-- 文件职责：说明 TASK-025 草稿模板的使用方式、核验流程和安全发布清单。 -->

# 内容编写与发布流程

> 本节更新时间：2026-07-27 23:38（Asia/Shanghai）

## 模板范围

`content/` 中保留每种内容类型一组中英双语模板，共 12 个模板文件；另有 9 个真实研究主题（Patch 1 个、Guide 4 个、Item 1 个、Boss 2 个）的中英双语草稿，共 18 个文件，仍不公开：

| 类型  | 英文文件 | 中文文件 | 当前状态 |
| ----- | -------- | -------- | -------- |
| Boss  | 1        | 1        | 草稿     |
| Item  | 1        | 1        | 草稿     |
| Guide | 3        | 3        | 草稿     |
| Patch | 1        | 1        | 草稿     |

真实草稿为 `patch-0-5-4-runes-of-aldur`、`expedition-atlas-first-points`、`liquid-verisium-safety-checklist`、`skill-granting-unique-scaling`、`liquid-verisium`、`orb-of-sacrifice-currencies`、`atziri-red-queen` 与 `arbiter-of-ash`。它们同样使用 `status: draft`、`draft: true` 与 `patchStatus: under-review`，包含来源和待核验范围，但未填写审核人或 `verifiedAt`，因此不会进入生产消费者。三个候选核验文件已移至 `research/verification/`，不属于首发文章。

这些文件只演示 Schema、文章结构和双语映射，不代表真实游戏内容。所有模板均显式使用：

```yaml
status: draft
draft: true
patchStatus: under-review
patch: "REPLACE_WITH_VERIFIED_PATCH"
```

因此它们不会进入生产详情路由、Sitemap 或搜索索引。

## 创建真实文章

1. 复制对应类型和语言的模板，不要直接把模板标题当成正式选题。
2. 为真实主题设置稳定的 `contentId` 和 `slug`；同一文章的中英文版本必须共享这两个值。
3. 根据实际 Patch 完整重写 Front Matter 和正文，不保留模板中的虚构字段。
4. 优先使用官方补丁说明、官方游戏资料和可复现的游戏内验证。社区讨论只用于发现选题或补充背景，不能代替事实来源。
5. 保持草稿状态运行 `npm run validate:content`，先解决字段、Markdown、重复路由和翻译关系问题。
6. 由独立审核者检查事实、版本、来源、版权、内链和语言质量。

## 发布前核验清单

只有下列项目全部完成，才能把单个文件切换为已发布：

- 标题、SEO 说明、摘要和正文已经针对真实主题完整重写。
- `patch` 是实际核验版本，`verifiedClientVersion` 是实际核验客户端版本，`patchStatus` 与当前支持状态一致。
- 所有游戏机制、数值、等级、阶段、掉落和推荐均可追溯。
- `sources` 不包含 `example.invalid`，并至少有一个支持核心事实的真实来源。
- `verifiedAt` 是实际完成核验的日期，`reviewer` 记录真实审核责任。
- `publishedAt`、`updatedAt` 与实际编辑记录一致。
- 图片如存在，属于原创或已获得明确授权，使用 WebP/AVIF 并提供准确替代文本。
- 相关内容在相同语言中已经发布；不能让已发布文章关联草稿。
- 正文没有 `TODO`、`REPLACE_WITH_` 或其他占位文本。
- 中英文内容分别经过语言审核，不使用未审校的机器直译直接发布。

完成后才可同时修改：

```yaml
status: published
draft: false
```

不要提前填写未来日期，也不要为了通过门禁伪造核验或审核记录。

## 发布验证

> 本节更新时间：2026-07-27 21:15（Asia/Shanghai）

每次内容变更至少运行：

```bash
npm run validate:content
npm run quality
```

生产构建后还要确认：

1. 只有已经核验并发布的详情页出现在 `build/client/`。
2. 草稿 Slug 不存在于 `build/client/sitemap.xml`。
3. 草稿标题和 Slug 不存在于 `build/client/search-index/*.json`。
4. 每个公开详情 URL 都包含完整静态正文、Canonical、语言替代链接和来源信息。

如果任一步失败，应恢复该文章的草稿状态并重新核验，不能绕过校验脚本。

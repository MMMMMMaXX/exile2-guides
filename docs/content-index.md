<!-- 文件职责：说明内容索引的数据结构、生产过滤边界和关系校验规则。 -->

# 内容索引与关系映射

> 本节更新时间：2026-07-27 14:48（Asia/Shanghai）

## 索引入口

`loadContentIndex()` 是后续构建配置读取仓库内容的统一入口：

```text
content/**/*.md(x)
  -> discoverContentFiles
  -> parseContentSource
  -> validateIndexInvariants
  -> buildContentIndex
```

默认索引只包含同时满足 `status: published` 和 `draft: false` 的内容。开发期工具可显式
传入 `includeDrafts: true`，但所有输入仍会参与重复和翻译一致性校验。

## 索引维度

索引提供以下只读视图：

- `entries`：按规范 URL 稳定排序的内容。
- `byRoute`：按 `/:locale/:section/:slug/` 查询。
- `byLocale`：按语言获取分类前的内容集合。
- `byType`：按 Build、Boss、Item、Skill、Guide、Patch 分类。
- `byContentId`：按共享 `contentId` 和语言查询翻译版本。

类型到 URL 分区的映射集中在 `contentTypeSegments`，后续 TASK-005 必须复用
`contentRoutePath()`，不能再次手写路径规则。

## 构建失败条件

以下索引冲突会聚合为 `ContentIndexError`：

1. 同语言、同类型、同 Slug 形成重复路由。
2. 同一 `contentId` 在同一语言中出现多次。
3. 共享 `contentId` 的翻译拥有不同 `contentType`。
4. 共享 `contentId` 的翻译拥有不同稳定 Slug。
5. 已发布内容关联的目标在同语言中不存在或仍是草稿。

相关内容解析保持 Front Matter 声明顺序，并且只解析当前语言，避免详情页混入其他
语言内容。缺失翻译由调用方得到 `undefined`，后续 LanguageSwitcher 可据此回退到目标
语言分类页。

## 维护要求

修改索引键、路由分区或关系约束时，必须同步更新：

1. `tests/unit/content-index.test.ts`
2. `scripts/validate-content.ts`（若文件发现行为发生变化）
3. 本文对应章节及其“本节更新时间”
4. `docs/project-progress.md`
5. `tests/unit/content-templates.test.ts` 中的仓库模板生产隔离回归

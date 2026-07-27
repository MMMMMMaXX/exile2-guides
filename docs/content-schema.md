<!-- 文件职责：说明内容字段契约、发布门禁和 Schema 变更时的维护步骤。 -->

# 内容 Schema 与发布门禁

> 本节更新时间：2026-07-27 14:48（Asia/Shanghai）

## 模块边界

- `lib/content/schema.ts`：Front Matter 字段、六类内容判别联合和字段级发布约束。
- `lib/content/parse.ts`：分离 Front Matter 与正文，并对 Markdown/MDX 做无执行语法检查。
- `lib/content/publication.ts`：所有未来生产路由、Sitemap 和搜索索引共享的唯一发布过滤边界。
- `scripts/validate-content.ts`：遍历仓库 `content/` 目录并输出可定位的校验错误。

TASK-003 不负责建立按语言、类型、Slug 或 `contentId` 的内容索引；这些关系属于
TASK-004。

## 失败关闭规则

Front Matter 未显式设置发布状态时，默认：

```yaml
status: draft
draft: true
```

内容只有同时满足 `status: published` 和 `draft: false` 才能进入未来生产消费者。
发布内容还必须具有：

- `publishedAt`
- `updatedAt`
- `verifiedAt`
- 至少一个来源
- 非空正文
- 完整 SEO 标题与说明
- 明确 Patch
- 图片存在时对应的 `imageAlt`
- 正文卡片图片只使用 `.webp` 或 `.avif`；社交分享图遵循独立资源契约

发布内容中的 `TODO`、`REPLACE_WITH_` 和 `example.invalid` 会使校验失败。该限制同时
检查 Front Matter 与正文。

## 日期与 MDX

Front Matter 中未加引号的 ISO 日期可能被 YAML 解析器转换成 `Date`。Schema 会将其
统一归一化为 `YYYY-MM-DD` 字符串，避免不同编辑方式产生类型漂移。

解析器仅编译 Markdown/MDX 以检查语法，不执行 MDX 表达式。正文渲染与允许组件列表
将在后续页面实现任务中单独定义。

## 维护要求

修改字段或发布规则时，必须同步更新：

1. `tests/unit/content-schema.test.ts`
2. `scripts/validate-content.ts`（如果错误输出或文件发现规则受影响）
3. 本文对应章节及其“本节更新时间”
4. `content/` 中 TASK-025 创建的双语草稿模板
5. `docs/content-authoring.md` 中的发布前核验清单

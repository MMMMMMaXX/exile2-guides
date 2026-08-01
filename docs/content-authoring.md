<!-- 文件职责：说明结构模板隔离、真实文章生成即上线和自动发布门禁。 -->

# 内容编写与发布流程

> 文档更新时间：2026-08-02 01:36（Asia/Shanghai）

## 核心发布原则

> 本节更新时间：2026-08-02 01:36（Asia/Shanghai）

本项目由单人维护，不采用“Agent 先生成草稿、用户再逐篇审批”的默认流程。任何进入
`content/` 的真实文章都必须在生成任务内达到可上线质量，并直接满足：

```yaml
status: published
seo:
  noindex: false
```

`verificationStatus: pending-pc` 可以诚实表示尚未完成 PC 实机验证，但不能被 Agent
用作 `draft` 或 `noindex` 的理由。文章必须同时写清适用 Patch、已确认来源、尚未验证的
边界和责任主体；不得把猜测、未知数值或未验证结论包装成事实。

如果材料尚不足以生成完整文章，应继续保存在 `research/`，而不是在 `content/` 创建
不会上线的真实文章。生成任务不能把逐篇审核债务转交给用户。

## 模板隔离

> 本节更新时间：2026-08-02 01:36（Asia/Shanghai）

`content/` 中每种内容类型保留一组中英双语结构模板，共 12 个 `-template.json` 文件。
模板只演示 Schema 和章节结构，不代表真实游戏内容，是唯一允许保留以下状态的 JSON：

```yaml
status: draft
seo:
  noindex: true
```

模板不得进入生产详情路由、Sitemap 或静态搜索索引，也不得直接改名后发布；复制模板后
必须完整替换主题、事实、来源、媒体、SEO、关联内容和责任字段。

## 创建真实文章

> 本节更新时间：2026-08-02 01:36（Asia/Shanghai）

1. 从对应类型模板建立中英文文章；同一文章的双语版本共享稳定 `id` 与 `slug`。
2. 在同一任务中完整写出正文、摘要、SEO、FAQ/问答、来源、图片或视频权利信息和内链。
3. 优先使用 GGG 第一方公告、游戏官网资料和可复现记录；社区资料用于发现问题与交叉检查。
4. 对尚无 PC 实测的内容使用 `verificationStatus: pending-pc`，明确已确认事实和未知边界。
5. 写入真实 Patch、客户端版本、责任主体、发布日期和更新时间；不能伪造未来日期或实测日期。
6. 生成结果必须直接使用 `status: published` 和 `seo.noindex: false`。
7. 运行内容、图片、类型、Lint、测试和生产构建门禁；失败时继续修复，不能靠恢复 `noindex` 绕过。

## 生成完成清单

> 本节更新时间：2026-08-02 01:36（Asia/Shanghai）

- 标题、SEO 描述、摘要和正文针对真实搜索意图完整编写，不含占位文本。
- `patch`、`verifiedClientVersion`、`patchStatus` 与 `verificationStatus` 彼此一致。
- 游戏机制、数值、等级、阶段、掉落和推荐有来源，或明确标记为未完成的 PC 核验范围。
- `sources` 不含占位 URL，并至少有一条支持核心事实的可靠来源。
- `reviewer`/责任主体、`publishedAt` 与 `updatedAt` 已填写；没有实测时不伪造 `lastVerifiedAt`。
- 图片和视频具有可追溯来源或嵌入权利信息，Alt 与 Caption 描述实际内容。
- 关联链接指向相同语言的真实已发布页面，不指向模板或不存在的路由。
- 中英文语义一致，无 `TODO`、`REPLACE_WITH_`、`example.invalid`、虚构精确数值或机器翻译残留。
- `status: published` 且 `seo.noindex: false`。

## 自动门禁与生产验证

> 本节更新时间：2026-08-02 01:36（Asia/Shanghai）

每次内容变更至少运行：

```bash
npm run validate:content
npm run quality
```

`scripts/validate-content.ts` 会拒绝任何非模板文章的 `draft` 或 `seo.noindex != false`，
防止后续 Agent 擅自恢复人工逐篇审批流程。生产构建后还要确认：

1. 所有真实文章详情页均出现在 `build/client/`。
2. 所有真实文章规范 URL 均进入 `build/client/sitemap.xml`。
3. 双语文章进入对应静态搜索索引，并输出正确 canonical 与 hreflang。
4. 页面没有 `noindex`，模板、搜索页、404 和其他明确非内容页面继续保持隔离。
5. 任一门禁失败时修复内容或实现；不得用 `draft`、`noindex` 或删除 Sitemap 条目掩盖失败。

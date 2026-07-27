<!-- 文件职责：说明 Build 列表与详情页的数据来源、筛选边界和发布安全契约。 -->

# Builds

> 本节更新时间：2026-07-27 01:40（Asia/Shanghai）

## 列表页

`/en/builds/` 与 `/zh-cn/builds/` 在构建时生成完整 HTML。列表仅从构建期虚拟模块中的已发布
Build 派生，按 `updatedAt` 倒序展示。筛选只支持 Class、Difficulty、Budget 和 Patch 四个维度，使用
浏览器内状态而不生成筛选参数 URL；没有结果时可清除筛选，且不显示广告或样例卡片。

当前没有已发布 Build，因此页面显示编辑核验中的真实空状态。Build 数少于每语言两篇时列表页带有
`noindex, follow`，不得在后续 Sitemap 或搜索索引中加入；满足内容门槛后，列表会自动使用真实卡片。

## 详情页

已发布 Build 详情继续使用构建期正文 HTML，并追加仅由 Front Matter 提供的 Quick Summary：适合人群、
主伤害类型、玩法风格和装备依赖。页面不会编造 DPS、评分、装备清单或其他未提供字段。

来源和核验日期从 `sources` 与 `verifiedAt` 输出；关联内容仅从同语言已发布静态页解析。Build 的完整玩法、
技能、装备、升级和 FAQ 由经过核验的 Markdown/MDX 正文提供。

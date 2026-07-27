<!-- 文件职责：说明 Card、Callout、FAQ 和 Related Content 的数据与维护边界。 -->

# 内容基础组件

> 本节更新时间：2026-07-26 23:51（Asia/Shanghai）

## ContentCard

`ContentCard` 只接收已准备好的展示数据：类型、标题、摘要、Patch/更新时间、最多三个关键属性
和目标路径。整张卡只有一个链接，避免嵌套链接；没有图片时使用类型文字占位，不使用官方游戏资产。

## Callout 与 FAQ

`Callout` 提供 `info`、`success` 与 `warning` 三个语义等级，风险提示使用 `alert`。FAQ 使用原生
`details/summary`，只在编辑者提供真实问题与答案时渲染，绝不通过空内容填充页面。

## Related Content

`RelatedContent` 不自行查询内容或处理 `relatedContentIds`。调用页面必须先使用 TASK-004 的内容索引
解析同语言、已发布且可访问的关联条目，再把展示数据传入组件。这一边界可防止草稿、跨语言缺失内容
或不存在的路由进入公开页面。

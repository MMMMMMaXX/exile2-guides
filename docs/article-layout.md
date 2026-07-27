<!-- 文件职责：说明文章布局、目录锚点与面包屑结构化数据的维护边界。 -->

# 文章布局、目录与面包屑

> 本节更新时间：2026-07-26 23:42（Asia/Shanghai）

## 构建期目录契约

`lib/content/table-of-contents.ts` 只从 Markdown/MDX 正文中提取 H2 与 H3。它为标题
生成稳定、去重的锚点，并在 MDX 渲染后的 HTML 中注入相同 `id`。因此目录链接、静态 HTML
和文章标题始终由同一正文来源生成，浏览器无需重新解析 Markdown。

编辑正文时应使用 Markdown H2/H3。没有 H2/H3 的短内容不会显示空目录，也不会留下空侧栏。

## 响应式文章结构

`ArticleLayout` 负责详情页的共享结构：

- 面包屑；
- Patch、标题和摘要；
- 桌面端正文与 Sticky 目录侧栏；
- 窄屏正文与可展开目录；
- 目录当前章节高亮。

类型特有的 Hero、快速摘要、来源、FAQ 和关联内容由后续任务在该稳定骨架中扩展，避免在每个
内容路由重复布局逻辑。

## BreadcrumbList

详情页同时输出可见 Breadcrumb 和 `BreadcrumbList` JSON-LD。当前数据使用站内相对路径；
TASK-018 的 SEO 模块接入正式 `VITE_SITE_URL` 后，必须在不改变可见层级的前提下统一规范为
绝对 URL。

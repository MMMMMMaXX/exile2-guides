<!-- 文件职责：说明设计 Token 的维护边界及开发演示页的生产隔离规则。 -->

# Exile2 Guides Design System

> 本节更新时间：2026-07-26 15:22（Asia/Shanghai）

## 维护边界

`app/styles/app.css` 是 MVP 视觉语义的唯一 Token 来源。组件应优先使用
`--eg-*` 语义变量或由 `@theme inline` 映射出的 Tailwind utility，不应在业务组件中
重复硬编码颜色、间距和圆角。

当修改设计 Token 时，需要同时：

1. 检查正文、弱化文字、按钮和状态色的对比度。
2. 检查 320px、390px、1024px 和 1440px 布局。
3. 更新开发环境 `/__design-system` 中对应示例。
4. 在本节的实际变更位置更新“本节更新时间”。

## 开发演示页

`/__design-system` 仅在 `NODE_ENV=development` 时注册。生产路由清单和静态预渲染
配置不包含该页面，避免内部演示内容被搜索引擎收录。

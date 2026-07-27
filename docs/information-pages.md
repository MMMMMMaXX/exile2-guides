<!-- 文件职责：说明 Footer 信息/法律页的静态路由、实际数据披露和部署前维护边界。 -->

# 信息与法律页面

> 本节更新时间：2026-07-27 11:54（Asia/Shanghai）

## 已发布静态路由

每种语言均在构建时输出 About、Contact、Privacy Policy、Terms of Use、Cookie Policy 和
Disclaimer。Footer 使用当前语言 URL 链接这些页面及六个分类页，不再保留不可点击文本。

## 当前真实状态

当前 MVP 无账号、上传、评论、数据库、后端业务服务、分析、广告、联系表单、Cookie 或 LocalStorage
写入。隐私与 Cookie 页面只描述这些已实现的状态；任何分析、广告、偏好存储或联系渠道启用前，都必须
同步更新对应文案和绝对更新时间。

Contact 页面不虚构邮箱。正式公开部署前，运营者必须提供并配置可维护的公开联系邮箱，同时在 Contact
和 Privacy Policy 中更新同一地址。

## 后续边界

TASK-017 已补齐静态 404 文档、路由回退与 noindex 边界；具体静态托管要求见 `docs/not-found.md`。Sitemap
生成仍属于 TASK-019，但该任务必须排除错误页。

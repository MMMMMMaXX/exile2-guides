<!-- 文件职责：说明 TASK-018 的 canonical、hreflang、社交 Metadata 与生产域名配置边界。 -->

# Metadata、Canonical 与 hreflang

> 本节更新时间：2026-07-27 17:25（Asia/Shanghai）

## 统一输出

> 本节更新时间：2026-07-27 17:25（Asia/Shanghai）

所有公共预渲染页面通过 `lib/seo/metadata.ts` 输出唯一标题、description、自引用 canonical、Open Graph、Twitter Card 和语言 alternate。首页、分类页与信息页的 English、简体中文路径固定存在；详情页则根据构建期已发布内容按共享 `contentId` 查找翻译，只为真实页面输出 hreflang。

`x-default` 仅在真实英文版本存在时指向英文路径。中文详情页没有已发布英文翻译时不会生成虚构英文链接，也不会生成 `x-default`。

## URL 与生产域名

> 本节更新时间：2026-07-27 12:52（Asia/Shanghai）

POE2 生产环境使用 `https://poe2.stratlore.com`。本地未配置 `VITE_SITE_URL` 时使用根相对 URL，避免把本地地址写入公开 Metadata；同一实现会自动把 canonical、hreflang、`og:url` 和图片 URL 转为绝对地址。筛选或追踪 query 不参与 canonical，路由只传入规范无参数路径。

## 社交分享图

> 本节更新时间：2026-07-27 12:52（Asia/Shanghai）

全站默认使用原创 `public/og.png`。图片不含官方 Logo、角色或游戏 UI；内容详情若提供已经过 Schema 校验且具备合法来源的图片，会优先使用详情图片。

## 构建门禁

> 本节更新时间：2026-07-27 12:52（Asia/Shanghai）

生产构建逐页验证 canonical、至少一个真实 hreflang、Open Graph 图片和 Twitter Card。404 使用独立 noindex 门禁；缺少共享 SEO 契约的公共页面会使构建失败。

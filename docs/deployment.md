<!-- 文件职责：记录静态站点从上线前检查、构建、托管配置到验证和回滚的完整操作契约。 -->

# 部署与上线手册

> 本节更新时间：2026-07-27 17:25（Asia/Shanghai）

## 当前结论

本项目是纯静态、只读内容站。部署输入只有 `build/client/`，不需要 Node 服务、数据库、
登录、API、上传服务或其他后端业务能力。

TASK-024 完成代表部署流程已经写清并通过本地构建验证，不代表网站已经适合公开上线。
正式上线前仍必须完成：

1. TASK-025 的首发内容模板，并由人工核验真实游戏内容、Patch、来源和日期。
2. 已确认 POE2 生产域名为 `poe2.stratlore.com`；仍需完成域名及商标可用性检查。
3. 根据真实运营主体、联系方式和实际启用工具复核法律页面。
4. 保持 Analytics 和 Ads 关闭，除非隐私文本、同意机制及实际配置同步完成。

StratLore 根域名后续承载总入口；本项目只使用 `poe2.stratlore.com`，并继续保持独立仓库和
独立 Cloudflare Pages 项目。当前仓库没有 `.openai/hosting.json`，本任务不会创建 Sites 项目
或执行生产部署。

## 静态产物契约

运行：

```bash
npm ci
npm run quality
```

统一门禁通过后，待部署目录为：

```text
build/client/
```

该目录必须至少包含：

- `index.html` 以及每个公共路径各自的 `index.html`
- `404.html`
- `assets/` 指纹 CSS/JavaScript
- `search-index/en.json` 与 `search-index/zh-cn.json`
- `sitemap.xml`
- `robots.txt`
- `og.png`
- `_headers`

不得把 `build/server/` 当作生产服务部署，也不得设置“所有未知路径重写到
`index.html`”的 SPA fallback。未知路径必须由顶层 `404.html` 返回真实 HTTP 404。

## 推荐托管：Cloudflare Pages

Cloudflare Pages 可以直接部署自定义静态输出目录；项目存在顶层 `404.html` 时不会启用
默认 SPA fallback，并会将目录 `index.html` 映射到带尾斜杠的 URL。官方说明见
[Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) 和
[Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/)。

Git 集成建议配置：

| 配置项                 | 值                               |
| ---------------------- | -------------------------------- |
| Production branch      | `main`                           |
| Framework preset       | `None`                           |
| Build command          | `npm run build`                  |
| Build output directory | `build/client`                   |
| Root directory         | 仓库根目录                       |
| Node.js                | `.node-version` 固定的 `24.14.0` |

Pages 支持自定义构建命令、输出目录和构建期环境变量；具体入口见
[Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)。

### 环境变量

生产环境必须配置：

```text
VITE_SITE_URL=https://poe2.stratlore.com
VITE_SITE_BRAND=StratLore
VITE_SITE_NAME=Exile2 Guides
```

该值必须：

- 使用 `https://`。
- 不包含路径、查询参数或末尾斜杠。
- 与最终 canonical 域名完全一致。

它决定 canonical、hreflang、Open Graph、Sitemap 和 robots 中的绝对 URL。POE2 生产环境当前
确认值为 `https://poe2.stratlore.com`。本机开发服务可以使用本地地址，但本地地址只能用于
开发验证，禁止写入公开生产 Metadata、Sitemap 或 robots。

`.env.example` 中其余变量是 PRD 预留契约；当前代码尚未启用站点名覆盖、Analytics、
Ads 或公开联系邮箱。不要因为变量存在就认为相关功能已经开启，也不要在 `VITE_*`
变量中保存私钥。

### 响应头与缓存

`public/_headers` 会随构建复制到输出目录：

- 所有响应增加 `nosniff`、Referrer、Frame 和 Permissions 安全策略。
- `assets/` 中带内容哈希的资源使用一年浏览器缓存并标记 `immutable`。
- HTML、搜索 JSON、Sitemap 和 robots 不设置长期不可变缓存。

Cloudflare Pages 原生使用 ETag、部署失效、压缩和 CDN 缓存。官方建议通常不要再为整个
站点增加自定义“Cache Everything”，否则可能在新部署后继续提供旧 HTML。参见
[Caching and performance](https://developers.cloudflare.com/pages/configuration/serving-pages/#caching-and-performance)
及 [_headers 配置](https://developers.cloudflare.com/pages/configuration/headers/)。

## Preview 与生产发布流程

### 1. 内容变更

1. 新增或修改 Markdown/MDX。
2. 更新准确的 `patch`、`updatedAt`、`verifiedAt`、来源和 reviewer。
3. 未完成或未核验内容保持 `status: draft` 与 `draft: true`。
4. 执行 `npm run quality`。
5. 确认生产构建中没有测试夹具、草稿或占位符。

### 2. Preview

1. 提交分支并创建 Pull Request。
2. 等待仓库 Quality 工作流通过。
3. 检查 Pages Preview 部署；Cloudflare Pages 默认给 Preview 响应增加
   `X-Robots-Tag: noindex`，参见
   [Preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)。
4. 在 1440px、1024px、390px 和 320px 宽度进行人工验收。
5. 不向搜索引擎提交 Preview URL。

### 3. Production

1. 合并已经审核的提交到 `main`。
2. 确认生产环境 `VITE_SITE_URL` 指向最终 HTTPS 域名。
3. 等待生产构建与部署成功。
4. 若同时保留 `pages.dev` 地址，将其永久重定向到规范域名，避免双域名重复收录。官方
   操作见 [Redirect to a custom domain](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/)。
5. 完成下方上线后验收，再提交 Sitemap。

## 上线后验收

当前 POE2 生产域名验收命令：

```bash
curl -I https://poe2.stratlore.com/en/
curl -I https://poe2.stratlore.com/en
curl -I https://poe2.stratlore.com/path-that-does-not-exist
curl -I https://poe2.stratlore.com/assets/REPLACE_WITH_REAL_HASHED_ASSET.js
curl -I https://poe2.stratlore.com/search-index/en.json
curl -I https://poe2.stratlore.com/sitemap.xml
curl -I https://poe2.stratlore.com/robots.txt
```

必须确认：

- HTTP 自动跳转 HTTPS。
- `/en` 规范到 `/en/`，且不会形成循环或多跳。
- 已发布页面返回 200；未知路径返回真实 404，而不是 200 空壳。
- CSS、JavaScript、JSON、XML、WebP/AVIF 使用正确 MIME。
- 指纹资源有长期 immutable 缓存；HTML 和非指纹数据没有长期 immutable。
- 页面 HTML 首次响应已包含 H1、正文、title、description、canonical 和 hreflang。
- canonical、hreflang、OG、Sitemap 与 robots 中没有 localhost、Preview 域名或错误域名。
- 搜索页和 404 保持 noindex；草稿、测试夹具和空分类不在 Sitemap。
- `sitemap.xml` 中的 URL 均返回 200，且详情页 `lastmod` 等于真实 `updatedAt`。
- 中英文切换、移动菜单、搜索、Footer 和 404 恢复入口可用。

## 回滚

发生错误收录、白屏、资源 404、错误内容发布或大范围链接故障时：

1. 立即停止继续发布。
2. 在 Pages 的 Deployments 中选择最近一个已验证的成功生产部署并执行 Rollback。
3. 复测首页、一个中英文页面、404、Sitemap 和静态资源。
4. 在新分支修复根因并重新走 Preview、Quality 和人工验收，不直接覆盖线上文件。

Cloudflare Pages 允许回滚到任一成功的历史生产部署，但 Preview 不能作为回滚目标，参见
[Rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)。

## 使用其他静态 CDN

可以改用其他支持静态目录的 CDN，但必须逐项满足同一契约：

- 部署 `build/client/`，不启动 `build/server/`。
- 支持目录索引和 trailing slash。
- 顶层 `404.html` 对未知路径返回真实 404。
- 不设置全站 SPA rewrite。
- 支持 HTTPS、正确 MIME、自定义缓存/安全响应头和原子部署回滚。
- Preview 必须 noindex，并避免生成指向 Preview 域名的生产 canonical。

若平台无法满足其中任意一项，不应作为本项目的生产托管平台。

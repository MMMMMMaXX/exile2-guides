<!-- 文件职责：提供项目介绍、本地开发入口、验证命令和权威文档导航。 -->

# Exile2 Guides

> 本节更新时间：2026-07-29 17:27（Asia/Shanghai）

Exile2 Guides 是一个基于 React、TypeScript、React Router Framework Mode 和
Vite 的多语言静态攻略内容站。产品与技术需求以
`EXILE2-GUIDES-PRD.md` 为唯一事实源。

## 本地运行

### 1. 环境要求

- Node.js `>= 22.22.0`
- npm（随 Node.js 安装）

先确认版本：

```bash
node --version
npm --version
```

如果 Node.js 低于 `22.22.0`，请先通过 Node.js 官网、nvm、fnm 或其他版本管理器升级。

### 2. 安装依赖

进入项目目录：

```bash
cd /Users/manxin/Downloads/exile2-guides-prd
npm install
```

### 3. 创建本地环境变量

```bash
cp .env.example .env
```

当前默认值即可用于本地开发。`.env` 只允许保存公开的前端配置，不要写入私钥或其他敏感信息。

### 4. 启动开发服务

```bash
npm run dev
```

终端显示 `Local` 地址后，在浏览器打开该地址。默认通常为：

```text
http://127.0.0.1:5173/
```

停止服务时，在运行服务的终端按 `Ctrl+C`。

## 生产构建

```bash
npm run build
```

构建产物位于 `build/client/`。构建过程会枚举所有已发布公共路径，并验证每份 HTML
包含正文、标题和描述；草稿或未通过核验的内容不会进入生产路径。

POE2 生产环境使用 `https://poe2.stratlore.com`，品牌配置为 `StratLore` / `Exile2 Guides`。
公开部署前仍必须设置最终 HTTPS `VITE_SITE_URL`，并按
`docs/deployment.md` 完成 404、缓存、MIME、canonical、Sitemap 和回滚检查。

## 常用检查命令

```bash
# TypeScript 类型检查
npm run typecheck

# ESLint
npm run lint

# 单元与组件测试
npm test

# Playwright 核心浏览器流程
npm run test:e2e

# 中文文件及函数注释门禁
npm run check:comments

# 内容 Schema、发布状态和索引校验
npm run validate:content

# 图片路径、缺失文件和指纹目录校验
npm run check:images

# 检查格式
npm run format:check

# 自动格式化
npm run format
```

提交或交付功能前可运行统一门禁：

```bash
npm run quality
```

该命令依次检查格式、中文注释、内容发布边界、类型、Lint、单元/组件测试、生产构建
和 Playwright 核心浏览器流程。E2E 使用独立测试内容目录，不会把测试内容加入生产
路由、Sitemap 或搜索索引。

## 图片资源与缓存

> 本节更新时间：2026-07-29 14:48（Asia/Shanghai）

页面图片统一放入 `app/assets/images/`，并按用途保留子目录。例如：

```text
app/assets/images/prototype-v4/hero-skill.webp
```

代码或 Markdown 继续使用稳定路径：

```text
/images/prototype-v4/hero-skill.webp
```

`lib/assets/image-assets.ts` 会在开发和构建时自动发现目录内的 WebP、AVIF、PNG、JPEG、
GIF 与 SVG，并把稳定路径转换成 `/assets/文件名-内容哈希.扩展名`。新增或替换图片后只需
重新构建，不需要手写哈希，也不要在 `public/images/` 保存页面图片。

`npm run check:images` 会阻止缺失引用和旧 `public/images/` 文件进入交付；生产构建还会
确认全部输出图片都位于 `/assets/` 且文件名带内容指纹。现有 `_headers` 会对这些指纹
资源设置一年浏览器缓存和 `immutable`，文件内容改变时新哈希会自动绕开旧缓存。

## 常见问题

### 出现 `Unexpected token 'with'` 或 `styleText` 相关错误

这通常表示终端正在使用过旧的 Node.js，而不是项目代码错误。重新执行
`node --version`，确认版本满足 `>= 22.22.0`，切换版本后重新运行：

```bash
npm install
npm run dev
```

### 浏览器显示 Vite 错误遮罩

先查看启动开发服务的终端错误。修复问题后页面通常会自动刷新；如果旧的热更新状态没有恢复，
停止服务并重新执行 `npm run dev`。

## 项目文档

- `EXILE2-GUIDES-PRD.md`：MVP 产品与技术需求唯一事实源
- `docs/project-progress.md`：TASK-001～TASK-025、任务外事项和会话时间线
- `docs/content-schema.md`：内容字段和发布门禁
- `docs/build-article-json-spec.md`：Build JSON 字段、章节结构、路由和生成规范
- `docs/content-index.md`：内容索引、翻译与关联关系
- `docs/content-authoring.md`：草稿模板、事实核验和安全发布流程
- `docs/launch-execution-plan.md`：MVP 完成后的真实内容、上线与维护执行方案
- `docs/static-prerender.md`：公共路径与静态 HTML 构建门禁
- `docs/deployment.md`：静态托管配置、上线验收与回滚流程
- `docs/code-comments.md`：中文注释与维护规范

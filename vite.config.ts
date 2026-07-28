/** 文件职责：组合 React Router 与 Tailwind 构建插件，并固定本地开发地址。 */
import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

import { loadStaticContentPages } from "./lib/content/content-page.server";
import { buildSearchIndexes } from "./lib/search/search-index";

import { cloudflare } from "@cloudflare/vite-plugin";

const virtualContentPagesId = "virtual:content-pages";
const resolvedVirtualContentPagesId = `\0${virtualContentPagesId}`;
const virtualSearchIndexesId = "virtual:search-indexes";
const resolvedVirtualSearchIndexesId = `\0${virtualSearchIndexesId}`;

/**
 * 仅允许开发态 E2E 服务读取隔离夹具。
 * 生产构建始终使用仓库 content/，防止测试内容进入公共路由、Sitemap 或搜索索引。
 */
function getContentDirectory(): string | undefined {
  const testDirectory = process.env.E2E_CONTENT_DIRECTORY;
  return testDirectory && process.env.NODE_ENV !== "production"
    ? path.resolve(process.cwd(), testDirectory)
    : undefined;
}

/**
 * 在构建期把已发布正文编译为虚拟模块。
 * 这样 React Router 的 ssr:false 模式无需服务端 loader，也不会在浏览器请求 Markdown。
 */
function contentPagesPlugin(): Plugin {
  return {
    name: "exile2-content-pages",
    /** 只接管约定的内容虚拟模块标识，其他模块继续使用 Vite 默认解析。 */
    resolveId(id) {
      return id === virtualContentPagesId
        ? resolvedVirtualContentPagesId
        : null;
    },
    /** 生成只含已发布页面数据的静态源码，草稿不会进入浏览器产物。 */
    async load(id) {
      if (id !== resolvedVirtualContentPagesId) return null;
      const pages = await loadStaticContentPages(getContentDirectory());
      return `export default ${JSON.stringify(pages)};`;
    },
  };
}

/** 在构建期导出每种语言独立 JSON，同时提供同一份虚拟数据给浏览器本地搜索。 */
function searchIndexesPlugin(): Plugin {
  return {
    name: "exile2-search-indexes",
    /** 只解析搜索专用虚拟模块，避免和 Vite 的一般 JSON 解析规则冲突。 */
    resolveId(id) {
      return id === virtualSearchIndexesId
        ? resolvedVirtualSearchIndexesId
        : null;
    },
    /** 开发和生产运行时均只内联已发布内容索引，不读取原始草稿文件。 */
    async load(id) {
      if (id !== resolvedVirtualSearchIndexesId) return null;
      return `export default ${JSON.stringify(buildSearchIndexes(await loadStaticContentPages(getContentDirectory())))};`;
    },
    /** 输出可独立部署和检查的语言 JSON，满足静态搜索索引交付要求。 */
    async generateBundle() {
      const indexes = buildSearchIndexes(
        await loadStaticContentPages(getContentDirectory()),
      );
      for (const [locale, entries] of Object.entries(indexes)) {
        this.emitFile({
          fileName: `search-index/${locale}.json`,
          source: JSON.stringify(entries),
          type: "asset",
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    contentPagesPlugin(),
    searchIndexesPlugin(),
    tailwindcss(),
    reactRouter(),
    cloudflare({
      viteEnvironment: {
        name: "ssr"
      }
    })
  ],
  preview: {
    host: "127.0.0.1",
  },
  server: {
    host: "127.0.0.1",
  },
});
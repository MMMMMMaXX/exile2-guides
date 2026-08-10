/** 文件职责：组合 React Router 与 Tailwind 构建插件，并固定本地开发地址。 */
import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

import {
  clearStaticContentPagesCache,
  loadLocalBossDraftPreviewPages,
  loadLocalBuildDraftPreviewPages,
  loadStaticContentPages,
} from "./lib/content/content-page.server";
import {
  clearStaticContentCatalogCache,
  loadLocalDraftContentCatalog,
  loadStaticContentCatalog,
  projectStaticContentCatalogMetrics,
  projectStaticContentRoutes,
} from "./lib/content/content-catalog.server";
import { clearContentIndexCache } from "./lib/content/content-index";
import { buildSearchIndexes } from "./lib/search/search-index";

/**
 * 预热判别联合 schema 的惰性编译缓存。
 * exile2-content-pages 与 exile2-search-indexes 两个插件在构建期会并发调用
 * loadStaticContentPages，导致同一判别联合 schema 被并发首次解析；
 * zod v4 的 discriminatedUnion 在并发首次编译时会偶发
 * “option at index N / 读取 undefined.values” 的竞态而构建失败。
 * 在配置阶段（单线程）对每个联合强制编译一次，让插件复用已缓存结果，消除该偶发失败。
 */
import { itemSectionSchema } from "./lib/items/schema";
import { patchSectionSchema } from "./lib/patches/schema";
import { guideSectionSchema } from "./lib/guides/schema";
import { bossSectionSchema } from "./lib/bosses/schema";
import { buildSectionSchema } from "./lib/builds/schema";
import { skillSectionSchema } from "./lib/skills/schema";

[
  itemSectionSchema,
  patchSectionSchema,
  guideSectionSchema,
  bossSectionSchema,
  buildSectionSchema,
  skillSectionSchema,
].forEach((union) => {
  try {
    // 传入非法数据仅用于触发惰性编译与缓存，校验错误被 safeParse 吸收。
    union.safeParse({});
  } catch {
    // 预热不应阻断构建；仅作消除并发竞态的保险。
  }
});

const virtualContentPagesId = "virtual:content-pages";
const resolvedVirtualContentPagesId = `\0${virtualContentPagesId}`;
const virtualContentCatalogId = "virtual:content-catalog";
const resolvedVirtualContentCatalogId = `\0${virtualContentCatalogId}`;
const virtualContentCatalogLoadersId = "virtual:content-catalog-loaders";
const resolvedVirtualContentCatalogLoadersId = `\0${virtualContentCatalogLoadersId}`;
const virtualContentCatalogPrefix = "virtual:content-catalog/";
const resolvedVirtualContentCatalogPrefix = `\0${virtualContentCatalogPrefix}`;
const virtualContentCatalogMetricsId = "virtual:content-catalog-metrics";
const resolvedVirtualContentCatalogMetricsId = `\0${virtualContentCatalogMetricsId}`;
const virtualContentRoutesId = "virtual:content-routes";
const resolvedVirtualContentRoutesId = `\0${virtualContentRoutesId}`;
const virtualContentPageLoadersId = "virtual:content-page-loaders";
const resolvedVirtualContentPageLoadersId = `\0${virtualContentPageLoadersId}`;
const virtualContentPagePrefix = "virtual:content-page/";
const resolvedVirtualContentPagePrefix = `\0${virtualContentPagePrefix}`;
const virtualBuildDraftPreviewPagesId = "virtual:build-draft-preview-pages";
const resolvedVirtualBuildDraftPreviewPagesId = `\0${virtualBuildDraftPreviewPagesId}`;
const virtualBossDraftPreviewPagesId = "virtual:boss-draft-preview-pages";
const resolvedVirtualBossDraftPreviewPagesId = `\0${virtualBossDraftPreviewPagesId}`;
const virtualSearchIndexesId = "virtual:search-indexes";
const resolvedVirtualSearchIndexesId = `\0${virtualSearchIndexesId}`;

/**
 * 序列化虚拟模块数据。
 * 开发态若直接输出 55MB 级对象字面量，Vite 在浏览器首次加载客户端模块时
 * 会为 AST/source map 保留多份副本；改用 Base64 字符串让 Vite 只解析一个
 * 字符串节点，运行时再还原 JSON。生产构建保留对象字面量以维持静态产物。
 */
function serializeVirtualModuleData(
  value: unknown,
  command: "serve" | "build",
): string {
  const serialized = JSON.stringify(value);
  if (command === "build") return `export default ${serialized};`;

  const encoded = Buffer.from(serialized, "utf8").toString("base64");
  return [
    `const encoded = ${JSON.stringify(encoded)};`,
    "const binary = atob(encoded);",
    "const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));",
    "export default JSON.parse(new TextDecoder().decode(bytes));",
  ].join("\n");
}

/** 返回当前开发/生产边界内可见的正文页；正文按路由拆分前只在构建期存在。 */
async function loadRuntimeContentPages(
  command: "serve" | "build",
  contentDirectory: string | undefined,
) {
  const published = await loadStaticContentPages(contentDirectory);
  if (command === "build") return published;
  const drafts = await Promise.all([
    loadLocalBuildDraftPreviewPages(contentDirectory),
    loadLocalBossDraftPreviewPages(contentDirectory),
  ]);
  return Object.freeze({ ...published, ...drafts[0], ...drafts[1] });
}

/** 生成路由键到按文章动态模块的映射，Vite 会为每个文章模块单独切 chunk。 */
function serializeContentPageLoaders(routes: readonly string[]): string {
  const entries = routes.map((route) => {
    const moduleId = `${virtualContentPagePrefix}${route.slice(1, -1)}`;
    return `  ${JSON.stringify(route)}: () => import(${JSON.stringify(moduleId)}),`;
  });
  return `export default {\n${entries.join("\n")}\n};`;
}

/** 生成按语言拆分的目录加载器，列表/首页只下载当前语言的数据。 */
function serializeContentCatalogLoaders(locales: readonly string[]): string {
  const entries = locales.map(
    (locale) =>
      `  ${JSON.stringify(locale)}: () => import(${JSON.stringify(`${virtualContentCatalogPrefix}${locale}`)}),`,
  );
  return `export default {\n${entries.join("\n")}\n};`;
}

/**
 * 仅允许开发态 E2E 服务读取隔离夹具。
 * 生产构建始终使用仓库 content/，防止测试内容进入公共路由、Sitemap 或搜索索引。
 */
let configuredContentDirectory: string | undefined;

/** 返回已配置的内容目录；未配置时由调用方回退到生产内容根。 */
function getContentDirectory(): string | undefined {
  return configuredContentDirectory;
}

/** 返回当前命令实际读取的内容根目录，供缓存和热更新使用同一边界。 */
function getContentRoot(): string {
  return getContentDirectory() ?? path.resolve(process.cwd(), "content");
}

/**
 * 在构建期把已发布正文编译为虚拟模块。
 * 这样 React Router 的 ssr:false 模式无需服务端 loader，也不会在浏览器请求 Markdown。
 */
function contentPagesPlugin(command: "serve" | "build"): Plugin {
  return {
    name: "exile2-content-pages",
    /** 只接管约定的内容虚拟模块标识，其他模块继续使用 Vite 默认解析。 */
    resolveId(id) {
      if (id === virtualContentPagesId) return resolvedVirtualContentPagesId;
      if (id === virtualContentCatalogId)
        return resolvedVirtualContentCatalogId;
      if (id === virtualContentCatalogLoadersId) {
        return resolvedVirtualContentCatalogLoadersId;
      }
      if (id === virtualContentCatalogMetricsId) {
        return resolvedVirtualContentCatalogMetricsId;
      }
      if (id.startsWith(virtualContentCatalogPrefix)) {
        return `\0${id}`;
      }
      if (id === virtualContentRoutesId) return resolvedVirtualContentRoutesId;
      if (id === virtualContentPageLoadersId) {
        return resolvedVirtualContentPageLoadersId;
      }
      if (id.startsWith(virtualContentPagePrefix)) {
        return `\0${id}`;
      }
      return null;
    },
    /** 生成兼容旧工具的完整模块、轻量目录、路由索引和按文章正文模块。 */
    async load(id) {
      const contentDirectory = getContentDirectory();
      if (id === resolvedVirtualContentPagesId) {
        const pages = await loadStaticContentPages(contentDirectory);
        return serializeVirtualModuleData(pages, command);
      }

      if (
        id === resolvedVirtualContentCatalogId ||
        id === resolvedVirtualContentCatalogLoadersId ||
        id === resolvedVirtualContentCatalogMetricsId ||
        id.startsWith(resolvedVirtualContentCatalogPrefix) ||
        id === resolvedVirtualContentRoutesId ||
        id === resolvedVirtualContentPageLoadersId ||
        id.startsWith(resolvedVirtualContentPagePrefix)
      ) {
        const pages = await loadRuntimeContentPages(command, contentDirectory);
        const publishedCatalog =
          await loadStaticContentCatalog(contentDirectory);
        const runtimeCatalog =
          command === "build"
            ? publishedCatalog
            : {
                ...publishedCatalog,
                ...(await loadLocalDraftContentCatalog(contentDirectory)),
              };

        if (id === resolvedVirtualContentCatalogId) {
          return serializeVirtualModuleData(runtimeCatalog, command);
        }
        if (id === resolvedVirtualContentCatalogMetricsId) {
          return serializeVirtualModuleData(
            projectStaticContentCatalogMetrics(runtimeCatalog),
            command,
          );
        }
        if (id === resolvedVirtualContentCatalogLoadersId) {
          return serializeContentCatalogLoaders(
            Array.from(
              new Set(
                Object.values(runtimeCatalog).map(
                  (page) => page.frontMatter.locale,
                ),
              ),
            ),
          );
        }
        if (id.startsWith(resolvedVirtualContentCatalogPrefix)) {
          const locale = id.slice(resolvedVirtualContentCatalogPrefix.length);
          return serializeVirtualModuleData(
            Object.fromEntries(
              Object.entries(runtimeCatalog).filter(
                ([, page]) => page.frontMatter.locale === locale,
              ),
            ),
            command,
          );
        }
        if (id === resolvedVirtualContentRoutesId) {
          return serializeVirtualModuleData(
            projectStaticContentRoutes(runtimeCatalog),
            command,
          );
        }
        if (id === resolvedVirtualContentPageLoadersId) {
          return serializeContentPageLoaders(Object.keys(pages));
        }

        const route = id.slice(resolvedVirtualContentPagePrefix.length);
        const page = pages[`/${route}/`];
        return page
          ? serializeVirtualModuleData(page, command)
          : "export default undefined;";
      }

      return null;
    },
    /** 内容文件变更时清理共享缓存，并让所有依赖虚拟模块的路由重新加载。 */
    handleHotUpdate(ctx) {
      const contentRoot = getContentRoot();
      if (
        ctx.file !== contentRoot &&
        !ctx.file.startsWith(`${contentRoot}${path.sep}`)
      ) {
        return;
      }

      clearContentIndexCache(contentRoot);
      clearStaticContentPagesCache(contentRoot);
      clearStaticContentCatalogCache(contentRoot);

      const virtualModuleIds = [
        resolvedVirtualContentPagesId,
        resolvedVirtualContentCatalogId,
        resolvedVirtualContentCatalogLoadersId,
        resolvedVirtualContentCatalogMetricsId,
        resolvedVirtualContentRoutesId,
        resolvedVirtualContentPageLoadersId,
        resolvedVirtualSearchIndexesId,
        resolvedVirtualBuildDraftPreviewPagesId,
        resolvedVirtualBossDraftPreviewPagesId,
      ];
      const modules = virtualModuleIds.flatMap((id) => {
        const module = ctx.server.moduleGraph.getModuleById(id);
        return module ? [module] : [];
      });
      for (const [id, module] of ctx.server.moduleGraph.idToModuleMap) {
        if (id.startsWith(resolvedVirtualContentCatalogPrefix)) {
          modules.push(module);
        }
        if (id.startsWith(resolvedVirtualContentPagePrefix)) {
          modules.push(module);
        }
      }
      modules.forEach((module) => {
        ctx.server.moduleGraph.invalidateModule(module);
      });
      return modules;
    },
  };
}

/**
 * 只为本地 Vite 开发服务内联 Build 草稿。
 * 生产构建仍解析同一模块，但内容固定为空，避免草稿正文进入部署产物。
 */
function buildDraftPreviewPagesPlugin(enabled: boolean): Plugin {
  return {
    name: "exile2-build-draft-preview-pages",
    /** 仅接管本地 Build 草稿预览模块，不改变正式内容模块的语义。 */
    resolveId(id) {
      return id === virtualBuildDraftPreviewPagesId
        ? resolvedVirtualBuildDraftPreviewPagesId
        : null;
    },
    /** 本地开发读取非模板 Build 草稿，其他命令输出空映射。 */
    async load(id) {
      if (id !== resolvedVirtualBuildDraftPreviewPagesId) return null;
      const pages = enabled
        ? await loadLocalBuildDraftPreviewPages(getContentDirectory())
        : {};
      return `export default ${JSON.stringify(pages)};`;
    },
  };
}

/**
 * 只为本地 Vite 开发服务内联 Boss 草稿。
 * 生产构建仍解析同一模块，但内容固定为空，避免草稿正文进入部署产物。
 */
function bossDraftPreviewPagesPlugin(enabled: boolean): Plugin {
  return {
    name: "exile2-boss-draft-preview-pages",
    /** 仅接管本地 Boss 草稿预览模块，不改变正式内容模块的语义。 */
    resolveId(id) {
      return id === virtualBossDraftPreviewPagesId
        ? resolvedVirtualBossDraftPreviewPagesId
        : null;
    },
    /** 本地开发读取非模板 Boss 草稿，其他命令输出空映射。 */
    async load(id) {
      if (id !== resolvedVirtualBossDraftPreviewPagesId) return null;
      const pages = enabled
        ? await loadLocalBossDraftPreviewPages(getContentDirectory())
        : {};
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

export default defineConfig(({ command, mode }) => {
  // React Router dev 会重启子进程并可能重写环境变量；显式 Vite mode 可稳定保留测试边界。
  configuredContentDirectory =
    mode === "e2e"
      ? path.resolve(process.cwd(), ".e2e-content-fixtures")
      : undefined;
  if (configuredContentDirectory) {
    // 同步给 SSR loader；虚拟模块和服务端 loader 必须读取同一套隔离夹具。
    process.env.E2E_CONTENT_DIRECTORY = configuredContentDirectory;
  }

  return {
    plugins: [
      contentPagesPlugin(command),
      buildDraftPreviewPagesPlugin(command === "serve"),
      bossDraftPreviewPagesPlugin(command === "serve"),
      searchIndexesPlugin(),
      tailwindcss(),
      reactRouter(),
    ],
    preview: {
      host: "127.0.0.1",
    },
    server: {
      host: "127.0.0.1",
    },
  };
});

/** 文件职责：仅在构建阶段读取并渲染已发布正文，禁止客户端异步请求源文件。 */
import { evaluate } from "@mdx-js/mdx";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as jsxRuntime from "react/jsx-runtime";

import { contentRoutePath, loadContentIndex } from "./content-index";
import type { ParsedContent } from "./parse";
import type { StaticContentPageMap } from "./content-page";
import { getRuntimeContentDirectory } from "./runtime-content-directory";
import { addHeadingAnchors, extractTableOfContents } from "./table-of-contents";

/**
 * 缓存虚拟模块所需的静态页面映射，避免内容页和搜索索引同时启动时重复
 * 渲染、序列化 1936 个翻译内容页面。
 */
const staticContentPagesCache = new Map<
  string,
  Promise<StaticContentPageMap>
>();

/** 清理开发态静态页面缓存，使内容文件热更新后能重新生成虚拟模块。 */
export function clearStaticContentPagesCache(contentDirectory?: string): void {
  if (!contentDirectory) {
    staticContentPagesCache.clear();
    return;
  }

  staticContentPagesCache.delete(path.resolve(contentDirectory));
}

/** 将已通过语法校验的 Markdown/MDX 正文渲染为构建期 HTML。 */
export async function renderContentBody(
  body: string,
  format: "md" | "mdx",
): Promise<string> {
  const module = await evaluate(body, {
    ...jsxRuntime,
    development: false,
    format,
  });
  return renderToStaticMarkup(createElement(module.default));
}

/** 将指定索引条目渲染成浏览器可读取的静态页面映射，调用方负责先确定发布边界。 */
async function renderStaticContentPages(
  contents: readonly ParsedContent[],
): Promise<StaticContentPageMap> {
  const pages = await Promise.all(
    contents.map(async (content) => {
      // JSON 结构化文章（Build / Boss / Item / Skill / Guide / Patch）目录从 sections 派生，无需解析 Markdown 标题。
      const jsonArticle =
        content.buildArticle ??
        content.bossArticle ??
        content.itemArticle ??
        content.skillArticle ??
        content.guideArticle ??
        content.patchArticle;
      const tableOfContents = jsonArticle
        ? jsonArticle.sections
            .filter((section) => section.visible && section.toc)
            .sort((left, right) => left.order - right.order)
            .map((section) => ({
              id: section.id,
              level: 2 as const,
              text: section.title,
            }))
        : extractTableOfContents(content.body);
      const bodyHtml = jsonArticle
        ? ""
        : addHeadingAnchors(
            await renderContentBody(
              content.body,
              content.extension === ".md" ? "md" : "mdx",
            ),
            tableOfContents,
          );

      return [
        contentRoutePath(
          content.frontMatter.locale,
          content.frontMatter.contentType,
          content.frontMatter.slug,
        ),
        {
          bodyHtml,
          ...(content.buildArticle
            ? { buildArticle: content.buildArticle }
            : {}),
          ...(content.bossArticle ? { bossArticle: content.bossArticle } : {}),
          ...(content.itemArticle ? { itemArticle: content.itemArticle } : {}),
          ...(content.skillArticle
            ? { skillArticle: content.skillArticle }
            : {}),
          ...(content.guideArticle
            ? { guideArticle: content.guideArticle }
            : {}),
          ...(content.patchArticle
            ? { patchArticle: content.patchArticle }
            : {}),
          frontMatter: content.frontMatter,
          tableOfContents,
        },
      ] as const;
    }),
  );

  return Object.fromEntries(pages) as StaticContentPageMap;
}

/** 一次生成全部已发布页面数据，供生产路由、首页和搜索虚拟模块复用。 */
export async function loadStaticContentPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const key = path.resolve(contentDirectory);
  const cached = staticContentPagesCache.get(key);
  if (cached) return cached;

  const loading = loadContentIndex(contentDirectory).then((index) =>
    renderStaticContentPages(index.entries),
  );
  staticContentPagesCache.set(key, loading);

  try {
    return await loading;
  } catch (error) {
    // 失败结果不能阻止开发服务器在修复文件后重试。
    staticContentPagesCache.delete(key);
    throw error;
  }
}

/**
 * 生成仅供本地开发服务器读取的 Build 草稿映射。
 * 模板草稿始终排除；生产插件返回空映射，因此这些正文不会进入正式浏览器产物。
 */
export async function loadLocalBuildDraftPreviewPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return renderStaticContentPages(
    index.entries.filter(
      (content) =>
        content.frontMatter.contentType === "build" &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

/**
 * 生成仅供本地开发服务器读取的 Boss 草稿映射。
 * 模板草稿始终排除；生产插件返回空映射，因此这些正文不会进入正式浏览器产物。
 */
export async function loadLocalBossDraftPreviewPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return renderStaticContentPages(
    index.entries.filter(
      (content) =>
        content.frontMatter.contentType === "boss" &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

/**
 * 生成仅供本地开发服务器读取的 Item 草稿映射。
 * 模板草稿始终排除；生产插件返回空映射，因此这些正文不会进入正式浏览器产物。
 */
export async function loadLocalItemDraftPreviewPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return renderStaticContentPages(
    index.entries.filter(
      (content) =>
        content.frontMatter.contentType === "item" &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

/**
 * 生成仅供本地开发服务器读取的 Skill 草稿映射。
 * 模板草稿始终排除；生产插件返回空映射，因此这些正文不会进入正式浏览器产物。
 */
export async function loadLocalSkillDraftPreviewPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return renderStaticContentPages(
    index.entries.filter(
      (content) =>
        content.frontMatter.contentType === "skill" &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

/**
 * 生成仅供本地开发服务器读取的 Guide 草稿映射。
 * 模板草稿始终排除；生产插件返回空映射，因此这些正文不会进入正式浏览器产物。
 */
export async function loadLocalGuideDraftPreviewPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return renderStaticContentPages(
    index.entries.filter(
      (content) =>
        content.frontMatter.contentType === "guide" &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

/**
 * 生成仅供本地开发服务器读取的 Patch 草稿映射。
 * 模板草稿始终排除；生产插件返回空映射，因此这些正文不会进入正式浏览器产物。
 */
export async function loadLocalPatchDraftPreviewPages(
  contentDirectory = getRuntimeContentDirectory(),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory, {
    includeDrafts: true,
  });
  return renderStaticContentPages(
    index.entries.filter(
      (content) =>
        content.frontMatter.contentType === "patch" &&
        content.frontMatter.status === "draft" &&
        content.frontMatter.draft &&
        !content.frontMatter.contentId.endsWith("-template"),
    ),
  );
}

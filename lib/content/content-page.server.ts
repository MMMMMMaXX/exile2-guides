/** 文件职责：仅在构建阶段读取并渲染已发布正文，禁止客户端异步请求源文件。 */
import { evaluate } from "@mdx-js/mdx";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as jsxRuntime from "react/jsx-runtime";

import { contentRoutePath, loadContentIndex } from "./content-index";
import type { StaticContentPageMap } from "./content-page";
import { addHeadingAnchors, extractTableOfContents } from "./table-of-contents";

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

/** 一次生成全部已发布页面数据，供 Vite 虚拟模块在构建期内联到路由。 */
export async function loadStaticContentPages(
  contentDirectory = path.resolve(process.cwd(), "content"),
): Promise<StaticContentPageMap> {
  const index = await loadContentIndex(contentDirectory);
  const pages = await Promise.all(
    index.entries.map(async (content) => {
      // 目录和锚点必须从同一份正文派生，防止编辑修改标题后侧栏链接与正文脱节。
      const tableOfContents = extractTableOfContents(content.body);
      const bodyHtml = addHeadingAnchors(
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
          frontMatter: content.frontMatter,
          tableOfContents,
        },
      ] as const;
    }),
  );

  return Object.fromEntries(pages) as StaticContentPageMap;
}

/** 文件职责：在构建期生成并校验 sitemap.xml 与 robots.txt 静态发布文件。 */
import fs from "node:fs/promises";
import path from "node:path";

import type { ContentIndex } from "../content/content-index";
import { enumerateIndexablePaths } from "../prerender/public-paths";

const defaultProductionOrigin = "https://poe2.stratlore.com";

/** 解析构建使用的站点源地址；本地未配置时使用与 README 一致的开发地址。 */
export function getBuildSiteOrigin(
  configuredOrigin = process.env.VITE_SITE_URL,
): string {
  const value = configuredOrigin?.trim() || defaultProductionOrigin;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("VITE_SITE_URL must use http or https");
  }
  return url.origin;
}

/** 转义 XML 文本节点，保证未来路径扩展不会破坏 Sitemap。 */
function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** 从唯一生产内容索引生成 Sitemap，详情页 lastmod 使用实际 updatedAt。 */
export function renderSitemapXml(
  index: ContentIndex,
  siteOrigin = getBuildSiteOrigin(),
): string {
  const urls = enumerateIndexablePaths(index).map((publicPath) => {
    const content = index.byRoute.get(publicPath);
    const lastModified = content?.frontMatter.updatedAt;
    const location = new URL(publicPath, `${siteOrigin}/`).toString();
    return [
      "  <url>",
      `    <loc>${escapeXml(location)}</loc>`,
      ...(lastModified
        ? [`    <lastmod>${escapeXml(lastModified)}</lastmod>`]
        : []),
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

/** 生成允许抓取全部公开资源且声明 Sitemap 的 robots.txt。 */
export function renderRobotsTxt(siteOrigin = getBuildSiteOrigin()): string {
  return [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${new URL("/sitemap.xml", `${siteOrigin}/`).toString()}`,
    "",
  ].join("\n");
}

/** 写入构建输出目录；生成文件只来自已过滤的生产索引。 */
export async function writeSeoSiteFiles(
  outputDirectory: string,
  index: ContentIndex,
  siteOrigin = getBuildSiteOrigin(),
): Promise<void> {
  await Promise.all([
    fs.writeFile(
      path.join(outputDirectory, "sitemap.xml"),
      renderSitemapXml(index, siteOrigin),
    ),
    fs.writeFile(
      path.join(outputDirectory, "robots.txt"),
      renderRobotsTxt(siteOrigin),
    ),
  ]);
}

/** 校验生成文件与当前索引严格一致，避免搜索页、草稿或错误页泄漏。 */
export async function verifySeoSiteFiles(
  outputDirectory: string,
  index: ContentIndex,
  siteOrigin = getBuildSiteOrigin(),
): Promise<void> {
  const [sitemap, robots, redirects] = await Promise.all([
    fs.readFile(path.join(outputDirectory, "sitemap.xml"), "utf8"),
    fs.readFile(path.join(outputDirectory, "robots.txt"), "utf8"),
    fs.readFile(path.join(outputDirectory, "_redirects"), "utf8"),
  ]);
  if (sitemap !== renderSitemapXml(index, siteOrigin)) {
    throw new Error(
      "Generated sitemap.xml does not match the production index",
    );
  }
  if (robots !== renderRobotsTxt(siteOrigin)) {
    throw new Error(
      "Generated robots.txt does not declare the current Sitemap",
    );
  }
  if (!redirects.split(/\r?\n/).includes("/ /en/ 301")) {
    throw new Error("Cloudflare Pages redirects must consolidate / into /en/");
  }
}

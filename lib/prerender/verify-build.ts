/** 文件职责：验证每个公共路径均生成包含正文与基础 Metadata 的独立 HTML 文件。 */
import fs from "node:fs/promises";
import path from "node:path";

import type { ContentIndex } from "../content/content-index";

export type PrerenderVerificationIssue = {
  code:
    | "missing-html"
    | "missing-body"
    | "missing-canonical"
    | "missing-description"
    | "missing-hreflang"
    | "missing-internal-link-target"
    | "missing-open-graph"
    | "missing-structured-data"
    | "missing-title"
    | "missing-twitter-card"
    | "duplicate-h1"
    | "missing-anchor-target"
    | "missing-og-image-file";
  message: string;
  publicPath: string;
};

export class PrerenderVerificationError extends Error {
  readonly issues: PrerenderVerificationIssue[];

  /** 保存所有静态产物问题，避免开发者逐次构建才能发现多个遗漏。 */
  constructor(issues: PrerenderVerificationIssue[]) {
    super(`Prerender verification failed with ${issues.length} issue(s)`);
    this.name = "PrerenderVerificationError";
    this.issues = issues;
  }
}

/** 检查全部公共页面的共享 SEO 契约；错误页使用独立门禁，不进入此处。 */
export function inspectSeoMetadata(
  html: string,
  publicPath: string,
): PrerenderVerificationIssue[] {
  const issues: PrerenderVerificationIssue[] = [];
  const checks = [
    {
      code: "missing-canonical" as const,
      message: "HTML does not contain a canonical link",
      pattern: /<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']+["']/i,
    },
    {
      code: "missing-hreflang" as const,
      message: "HTML does not contain a language alternate",
      pattern: /<link[^>]+rel=["']alternate["'][^>]+hreflang=["'][^"']+["']/i,
    },
    {
      code: "missing-open-graph" as const,
      message: "HTML does not contain complete Open Graph metadata",
      pattern:
        /<meta[^>]+property=["']og:image["'][^>]+content=["'][^"']+["']/i,
    },
    {
      code: "missing-twitter-card" as const,
      message: "HTML does not contain a Twitter Card",
      pattern:
        /<meta[^>]+name=["']twitter:card["'][^>]+content=["']summary_large_image["']/i,
    },
  ];
  for (const check of checks) {
    if (!check.pattern.test(html)) {
      issues.push({ code: check.code, message: check.message, publicPath });
    }
  }
  return issues;
}

/** 检查仅适用于特定页面类型的 Schema，避免把虚构 FAQ 或评分强加给所有页面。 */
export function inspectStructuredData(
  html: string,
  publicPath: string,
  isContentRoute: boolean,
): PrerenderVerificationIssue[] {
  const requiredTypes = [
    ...(publicPath === "/" ? ["WebSite"] : []),
    ...(/^\/(?:en|zh-cn|pt-br|ru|de|es|fr|ja|ko|tr)\/(?:builds|bosses|items|skills|guides|patches)\/$/.test(
      publicPath,
    )
      ? ["ItemList"]
      : []),
    ...(isContentRoute ? ["Article", "BreadcrumbList"] : []),
  ];

  return requiredTypes.flatMap((type) =>
    new RegExp(
      `<script[^>]+type=["']application/ld\\+json["'][^>]*>[\\s\\S]*?"@type":"${type}"`,
      "i",
    ).test(html)
      ? []
      : [
          {
            code: "missing-structured-data" as const,
            message: `HTML does not contain required ${type} structured data`,
            publicPath,
          },
        ],
  );
}

/** 从相对或同站绝对 URL 提取规范路径；哈希、邮件和外站链接不属于页面门禁。 */
function getInternalPath(
  href: string,
  siteOrigin: string | undefined,
): string | undefined {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return undefined;
  }
  const fallbackOrigin = "https://static-build.invalid";
  const url = new URL(href, siteOrigin ?? fallbackOrigin);
  const isAbsolute = /^https?:\/\//i.test(href);
  if (
    (isAbsolute && (!siteOrigin || url.origin !== siteOrigin)) ||
    (!isAbsolute && url.origin !== (siteOrigin ?? fallbackOrigin))
  ) {
    return undefined;
  }
  return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
}

/** 验证页面可点击内链及 hreflang 都指向本次构建确实生成的公共 HTML。 */
export function inspectInternalLinkTargets(
  html: string,
  publicPath: string,
  publicPaths: readonly string[],
): PrerenderVerificationIssue[] {
  const availablePaths = new Set(publicPaths);
  const canonicalHref = html.match(
    /<link[^>]+\brel=["']canonical["'][^>]+\bhref=["']([^"']+)["']/i,
  )?.[1];
  const siteOrigin =
    canonicalHref && /^https?:\/\//i.test(canonicalHref)
      ? new URL(canonicalHref).origin
      : undefined;
  const tags = html.match(/<(?:a|link)\b[^>]*>/gi) ?? [];
  const hrefs = tags.flatMap((tag) => {
    if (tag.startsWith("<link") && !/\brel=["']alternate["']/i.test(tag)) {
      return [];
    }
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    return href ? [href] : [];
  });

  return hrefs.flatMap((href) => {
    const internalPath = getInternalPath(href, siteOrigin);
    return internalPath && !availablePaths.has(internalPath)
      ? [
          {
            code: "missing-internal-link-target" as const,
            message: `Internal link points to unavailable ${internalPath}`,
            publicPath,
          },
        ]
      : [];
  });
}

/** 内容详情页必须恰好一个 H1：标题由文章布局渲染，重复 H1 会稀释主题权重并干扰 SEO。 */
export function inspectSingleH1(
  html: string,
  publicPath: string,
): PrerenderVerificationIssue[] {
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  if (h1Count !== 1) {
    return [
      {
        code: "duplicate-h1",
        message: `Expected exactly 1 <h1> element, found ${h1Count}`,
        publicPath,
      },
    ];
  }
  return [];
}

/** 所有页内锚点链接（href="#id"）必须指向文档中真实存在的 id，防止目录与正文锚点脱节。 */
export function inspectAnchorTargets(
  html: string,
  publicPath: string,
): PrerenderVerificationIssue[] {
  const ids = new Set(
    [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]),
  );
  const issues: PrerenderVerificationIssue[] = [];
  for (const match of html.matchAll(/href=["']#([^"']+)["']/gi)) {
    const anchor = match[1];
    if (anchor && !ids.has(anchor)) {
      issues.push({
        code: "missing-anchor-target",
        message: `In-page anchor #${anchor} has no matching element id`,
        publicPath,
      });
    }
  }
  return issues;
}

/** 内容详情页引用的 og:image 必须在构建产物中存在，防止社交分享图 404（按 slug 生成的专属图）。 */
export async function inspectOgImageFile(
  html: string,
  publicPath: string,
  outputDirectory: string,
): Promise<PrerenderVerificationIssue[]> {
  const content = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  )?.[1];
  if (!content) return [];
  // 仅校验根相对路径；已配置 VITE_SITE_URL 输出的绝对地址由部署方保证可达。
  if (!content.startsWith("/")) return [];
  try {
    await fs.access(path.join(outputDirectory, content));
    return [];
  } catch {
    return [
      {
        code: "missing-og-image-file",
        message: `Referenced og:image ${content} is missing from build output`,
        publicPath,
      },
    ];
  }
}

/** 验证静态宿主可直接采用的 404 文档，防止部署时将未知地址回退到首页或空壳。 */
export async function verifyStaticNotFoundDocument(
  outputDirectory: string,
): Promise<void> {
  const notFoundFile = path.join(outputDirectory, "404.html");
  let html: string;
  try {
    html = await fs.readFile(notFoundFile, "utf8");
  } catch {
    throw new PrerenderVerificationError([
      {
        code: "missing-html",
        message: `Missing static 404 document ${notFoundFile}`,
        publicPath: "/404.html",
      },
    ]);
  }

  const issues = inspectPrerenderedHtml(html, "/404.html", false);
  if (!/name=["']robots["']\s+content=["']noindex, nofollow["']/i.test(html)) {
    issues.push({
      code: "missing-description",
      message: "Static 404 document must be noindex, nofollow",
      publicPath: "/404.html",
    });
  }
  if (issues.length > 0) throw new PrerenderVerificationError(issues);
}

/** 将规范 URL 映射为 React Router 在静态输出目录中的 HTML 文件位置。 */
export function publicPathToHtmlFile(
  outputDirectory: string,
  publicPath: string,
): string {
  if (publicPath === "/") return path.join(outputDirectory, "index.html");
  return path.join(
    outputDirectory,
    publicPath.replace(/^\/|\/$/g, ""),
    "index.html",
  );
}

/** 检查单份 HTML 是否具有可直接索引的标题、描述和服务端生成正文。 */
export function inspectPrerenderedHtml(
  html: string,
  publicPath: string,
  isContentRoute: boolean,
): PrerenderVerificationIssue[] {
  const issues: PrerenderVerificationIssue[] = [];

  if (!/<title>[^<]+<\/title>/i.test(html)) {
    issues.push({
      code: "missing-title",
      message: "HTML does not contain a non-empty title",
      publicPath,
    });
  }

  if (
    !/<meta\s+name=["']description["']\s+content=["'][^"']+["'][^>]*>/i.test(
      html,
    )
  ) {
    issues.push({
      code: "missing-description",
      message: "HTML does not contain a non-empty meta description",
      publicPath,
    });
  }

  const bodyPattern = isContentRoute
    ? /data-prerender-content=["']true["']/
    : /<main(?:\s|>)/i;
  if (!bodyPattern.test(html)) {
    issues.push({
      code: "missing-body",
      message: "HTML does not contain prerendered page body",
      publicPath,
    });
  }

  return issues;
}

/** 读取全部公共路径的构建产物并执行失败关闭验证。 */
export async function verifyPrerenderBuild(
  outputDirectory: string,
  publicPaths: readonly string[],
  index: ContentIndex,
): Promise<void> {
  const issues: PrerenderVerificationIssue[] = [];

  for (const publicPath of publicPaths) {
    const htmlFile = publicPathToHtmlFile(outputDirectory, publicPath);
    let html: string;
    try {
      html = await fs.readFile(htmlFile, "utf8");
    } catch {
      issues.push({
        code: "missing-html",
        message: `Missing generated HTML file ${htmlFile}`,
        publicPath,
      });
      continue;
    }

    const isContentRoute = index.byRoute.has(publicPath);
    issues.push(
      ...inspectPrerenderedHtml(html, publicPath, isContentRoute),
      ...inspectSeoMetadata(html, publicPath),
      ...inspectStructuredData(html, publicPath, isContentRoute),
      ...inspectInternalLinkTargets(html, publicPath, publicPaths),
    );

    if (isContentRoute) {
      issues.push(
        ...inspectSingleH1(html, publicPath),
        ...inspectAnchorTargets(html, publicPath),
        ...(await inspectOgImageFile(html, publicPath, outputDirectory)),
      );
    }
  }

  if (issues.length > 0) throw new PrerenderVerificationError(issues);
}

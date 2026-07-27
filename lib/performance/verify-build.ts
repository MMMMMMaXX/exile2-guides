/** 文件职责：验证客户端 JavaScript 预算与静态 HTML 图片性能契约，超限时阻止发布。 */
import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

import { publicPathToHtmlFile } from "../prerender/verify-build";

export const INITIAL_JAVASCRIPT_GZIP_BUDGET = 180 * 1024;

export type PerformanceVerificationIssue = {
  code: "image-contract" | "javascript-budget";
  message: string;
  publicPath: string;
};

export class PerformanceVerificationError extends Error {
  readonly issues: readonly PerformanceVerificationIssue[];

  /** 保存全部性能问题，让维护者一次修复而不必重复构建。 */
  constructor(issues: readonly PerformanceVerificationIssue[]) {
    super(`Performance verification failed with ${issues.length} issue(s)`);
    this.name = "PerformanceVerificationError";
    this.issues = issues;
  }
}

/** 检查图片是否预留尺寸并提供异步解码、响应式提示和首屏外懒加载。 */
export function inspectImagePerformance(
  html: string,
  publicPath: string,
): PerformanceVerificationIssue[] {
  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
  return imageTags.flatMap((tag) => {
    const requiredAttributes = [
      "width",
      "height",
      "decoding",
      "srcset",
      "sizes",
    ];
    const missing = requiredAttributes.filter(
      (attribute) =>
        !new RegExp(`\\s${attribute}=["'][^"']+["']`, "i").test(tag),
    );
    const hasLoadingStrategy =
      /\sloading=["']lazy["']/i.test(tag) ||
      /\sfetchpriority=["']high["']/i.test(tag);
    if (!hasLoadingStrategy) missing.push("loading or fetchpriority");
    return missing.length
      ? [
          {
            code: "image-contract" as const,
            message: `Image is missing ${missing.join(", ")}`,
            publicPath,
          },
        ]
      : [];
  });
}

/** 对入口脚本使用真实 gzip 大小执行 PRD 的 180KB 初始预算。 */
export function inspectJavaScriptBudget(
  source: Uint8Array,
  publicPath: string,
): PerformanceVerificationIssue[] {
  const gzipBytes = gzipSync(source).byteLength;
  return gzipBytes <= INITIAL_JAVASCRIPT_GZIP_BUDGET
    ? []
    : [
        {
          code: "javascript-budget",
          message: `Entry JavaScript is ${gzipBytes} gzip bytes; budget is ${INITIAL_JAVASCRIPT_GZIP_BUDGET}`,
          publicPath,
        },
      ];
}

/** 读取真实构建产物，统一验证入口脚本预算和每个公共 HTML 的图片契约。 */
export async function verifyClientPerformance(
  outputDirectory: string,
  publicPaths: readonly string[],
): Promise<void> {
  const assetDirectory = path.join(outputDirectory, "assets");
  const assetNames = await fs.readdir(assetDirectory);
  const entryName = assetNames.find(
    (name) => name.startsWith("entry.client-") && name.endsWith(".js"),
  );
  const issues: PerformanceVerificationIssue[] = [];

  if (!entryName) {
    issues.push({
      code: "javascript-budget",
      message: "Client entry JavaScript asset is missing",
      publicPath: "/assets/",
    });
  } else {
    const source = await fs.readFile(path.join(assetDirectory, entryName));
    issues.push(...inspectJavaScriptBudget(source, `assets/${entryName}`));
  }

  for (const publicPath of publicPaths) {
    const html = await fs.readFile(
      publicPathToHtmlFile(outputDirectory, publicPath),
      "utf8",
    );
    issues.push(...inspectImagePerformance(html, publicPath));
  }

  if (issues.length > 0) throw new PerformanceVerificationError(issues);
}

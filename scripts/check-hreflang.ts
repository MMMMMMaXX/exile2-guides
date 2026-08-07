/** 文件职责：核对预渲染 HTML 的 hreflang 仅指向本次构建真实生成的页面。 */
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { localeMeta } from "../lib/content/constants";

// Allow pointing the check at a stable copy of build/client (e.g. grabbed
// immediately after a build) to avoid the safe-delete shim quarantining the
// live build/ directory out from under the check.
const overrideDir = process.env.POE2_BUILD_CLIENT_OVERRIDE;
const buildDir = overrideDir
  ? path.resolve(overrideDir)
  : path.resolve(process.cwd(), "build", "client");
const knownHreflangs = new Set<string>(
  Object.values(localeMeta).map((meta) => meta.hreflang),
);

/** 递归遍历目录下所有 index.html 文件，返回完整路径列表。 */
async function walkHtml(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkHtml(entryPath);
      return entry.name === "index.html" ? [entryPath] : [];
    }),
  );
  return nested.flat();
}

/** 入口：扫描构建产物中所有 HTML 的 hreflang alternate 链接，校验值是否合法且指向已生成页面。 */
async function main(): Promise<void> {
  if (!existsSync(buildDir)) {
    console.log(
      `hreflang check skipped: build/client not found at ${buildDir}`,
    );
    return;
  }

  const htmlFiles = await walkHtml(buildDir);
  const linkPattern = /<link\b[^>]*rel=["']alternate["'][^>]*>/gi;
  const issues: string[] = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const publicPath =
      "/" +
      path
        .relative(buildDir, file)
        .split(path.sep)
        .join("/")
        .replace(/index\.html$/, "");

    let linkMatch: RegExpExecArray | null;
    linkPattern.lastIndex = 0;
    while ((linkMatch = linkPattern.exec(html))) {
      const tag = linkMatch[0];
      const hreflang = tag.match(/hreflang=["']([^"']+)["']/i)?.[1];
      const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
      if (!hreflang || !href) continue;
      if (hreflang === "x-default") continue;
      if (!knownHreflangs.has(hreflang)) {
        issues.push(`${publicPath}: unknown hreflang "${hreflang}"`);
        continue;
      }
      try {
        const url = new URL(href, "https://static-build.invalid");
        let targetPath = url.pathname;
        if (!targetPath.endsWith("/")) targetPath += "/";
        const targetFile = path.join(
          buildDir,
          targetPath.replace(/^\//, ""),
          "index.html",
        );
        await readFile(targetFile, "utf8");
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        issues.push(
          `${publicPath}: hreflang ${hreflang} points to missing ${href} (${reason})`,
        );
      }
    }
  }

  if (issues.length > 0) {
    for (const issue of issues) console.error(`  - ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `hreflang check passed: ${htmlFiles.length} HTML file(s) verified.`,
  );
}

await main();

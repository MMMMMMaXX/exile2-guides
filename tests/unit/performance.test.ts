/** 文件职责：验证图片发布契约与客户端 JavaScript gzip 预算的失败关闭行为。 */
import { randomBytes } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  INITIAL_DEPENDENCY_GZIP_BUDGET,
  INITIAL_JAVASCRIPT_GZIP_BUDGET,
  getInitialJavaScriptAssetPaths,
  inspectImagePerformance,
  inspectInitialJavaScriptDependencies,
  inspectJavaScriptBudget,
} from "../../lib/performance/verify-build";

describe("image performance contract", () => {
  it("accepts responsive, dimensioned and lazy-loaded image markup", () => {
    const html =
      '<img src="/image.webp" srcset="/image.webp 448w" sizes="7rem" width="448" height="576" decoding="async" loading="lazy" alt="Original art">';
    expect(inspectImagePerformance(html, "/en/guides/")).toEqual([]);
  });

  it("reports images that can cause layout shift or eager over-fetching", () => {
    expect(
      inspectImagePerformance(
        '<img src="/image.webp" alt="Original art">',
        "/en/guides/",
      ),
    ).toEqual([
      expect.objectContaining({
        code: "image-contract",
        message: expect.stringContaining("width"),
      }),
    ]);
  });
});

describe("JavaScript performance budget", () => {
  it("accepts a compact entry and rejects incompressible data over budget", () => {
    expect(
      inspectJavaScriptBudget(
        new TextEncoder().encode("export default 1"),
        "/",
      ),
    ).toEqual([]);

    const oversized = randomBytes(INITIAL_JAVASCRIPT_GZIP_BUDGET * 2);
    expect(inspectJavaScriptBudget(oversized, "/")).toEqual([
      expect.objectContaining({ code: "javascript-budget" }),
    ]);
  });

  it("budgets the real initial dependency graph and blocks full content pages", () => {
    const html =
      '<link rel="modulepreload" href="/assets/entry.js"><script type="module" src="/assets/root.js"></script>';
    expect(getInitialJavaScriptAssetPaths(html)).toEqual([
      "/assets/entry.js",
      "/assets/root.js",
    ]);
    expect(
      inspectInitialJavaScriptDependencies(
        html,
        "/en/skills/",
        new Map([
          ["entry.js", new TextEncoder().encode("export default 1")],
          ["root.js", new TextEncoder().encode("export default 2")],
        ]),
      ),
    ).toEqual([]);

    const oversized = randomBytes(INITIAL_DEPENDENCY_GZIP_BUDGET * 2);
    expect(
      inspectInitialJavaScriptDependencies(
        '<script type="module" src="/assets/content-pages-old.js"></script>',
        "/en/skills/",
        new Map([["content-pages-old.js", oversized]]),
      ),
    ).toEqual([
      expect.objectContaining({ code: "full-content-boundary" }),
      expect.objectContaining({ code: "initial-javascript-budget" }),
    ]);
  });
});

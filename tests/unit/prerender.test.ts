/** 文件职责：验证公共路径枚举、草稿隔离和静态 HTML 发布门禁。 */
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildContentIndex } from "../../lib/content";
import type { ParsedContent } from "../../lib/content/parse";
import { getV4SubtypePaths } from "../../lib/content/v4-taxonomy";
import {
  bossCollectionPaths,
  buildCollectionPaths,
  enumeratePublicPaths,
  guideCollectionPaths,
  inspectAnchorTargets,
  inspectInternalLinkTargets,
  inspectOgImageFile,
  inspectPrerenderedHtml,
  inspectSeoMetadata,
  inspectSingleH1,
  inspectStructuredData,
  itemCollectionPaths,
  patchCollectionPaths,
  PrerenderVerificationError,
  publicPathToHtmlFile,
  skillCollectionPaths,
  verifyPrerenderBuild,
  verifyStaticNotFoundDocument,
} from "../../lib/prerender";

/** 创建满足公共字段契约的测试内容，避免测试数据进入生产内容目录。 */
function createContent(
  overrides: Partial<ParsedContent["frontMatter"]> = {},
): ParsedContent {
  return {
    body: "# Verified body",
    extension: ".md",
    sourcePath: "/virtual/verified.md",
    frontMatter: {
      author: "Editorial Team",
      contentId: "verified-guide",
      contentType: "guide",
      draft: false,
      estimatedReadingMinutes: 3,
      featured: false,
      guideCategory: "beginner",
      locale: "en",
      patch: "0.4",
      patchStatus: "current",
      prerequisites: [],
      publishedAt: "2026-07-26",
      relatedContentIds: [],
      reviewer: "Reviewer",
      seoDescription: "A verified guide used only by the prerender unit test.",
      seoTitle: "Verified Guide | Exile2 Guides",
      slug: "verified-guide",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "Verified test summary.",
      tags: [],
      title: "Verified Guide",
      updatedAt: "2026-07-26",
      verifiedAt: "2026-07-26",
      ...overrides,
    },
  } as ParsedContent;
}

describe("public prerender paths", () => {
  it("枚举固定页面和已发布内容详情页", () => {
    const index = buildContentIndex([createContent()]);

    expect(enumeratePublicPaths(index)).toEqual([
      "/",
      "/en/",
      "/zh-cn/",
      "/en/bosses/",
      "/en/builds/",
      "/en/guides/",
      "/en/items/",
      "/en/patches/",
      "/en/skills/",
      "/zh-cn/bosses/",
      "/zh-cn/builds/",
      "/zh-cn/guides/",
      "/zh-cn/items/",
      "/zh-cn/patches/",
      "/zh-cn/skills/",
      "/en/about/",
      "/en/contact/",
      "/en/privacy-policy/",
      "/en/terms-of-use/",
      "/en/cookie-policy/",
      "/en/disclaimer/",
      "/zh-cn/about/",
      "/zh-cn/contact/",
      "/zh-cn/privacy-policy/",
      "/zh-cn/terms-of-use/",
      "/zh-cn/cookie-policy/",
      "/zh-cn/disclaimer/",
      "/en/search/",
      "/zh-cn/search/",
      ...buildCollectionPaths,
      ...bossCollectionPaths,
      ...itemCollectionPaths,
      ...skillCollectionPaths,
      ...guideCollectionPaths,
      ...patchCollectionPaths,
      ...getV4SubtypePaths(),
      "/en/guides/verified-guide/",
    ]);
  });

  it("不会把草稿内容加入生产路径", () => {
    const draft = createContent({
      draft: true,
      status: "draft",
      publishedAt: undefined,
      verifiedAt: undefined,
      sources: [],
    });

    expect(enumeratePublicPaths(buildContentIndex([draft]))).toEqual([
      "/",
      "/en/",
      "/zh-cn/",
      "/en/bosses/",
      "/en/builds/",
      "/en/guides/",
      "/en/items/",
      "/en/patches/",
      "/en/skills/",
      "/zh-cn/bosses/",
      "/zh-cn/builds/",
      "/zh-cn/guides/",
      "/zh-cn/items/",
      "/zh-cn/patches/",
      "/zh-cn/skills/",
      "/en/about/",
      "/en/contact/",
      "/en/privacy-policy/",
      "/en/terms-of-use/",
      "/en/cookie-policy/",
      "/en/disclaimer/",
      "/zh-cn/about/",
      "/zh-cn/contact/",
      "/zh-cn/privacy-policy/",
      "/zh-cn/terms-of-use/",
      "/zh-cn/cookie-policy/",
      "/zh-cn/disclaimer/",
      "/en/search/",
      "/zh-cn/search/",
      ...buildCollectionPaths,
      ...bossCollectionPaths,
      ...itemCollectionPaths,
      ...skillCollectionPaths,
      ...guideCollectionPaths,
      ...patchCollectionPaths,
      ...getV4SubtypePaths(),
    ]);
  });
});

describe("prerender HTML verification", () => {
  it("rejects internal anchors and hreflang that target missing pages", () => {
    const html =
      '<a href="/en/guides/missing/">Missing</a>' +
      '<link rel="alternate" hreflang="zh-CN" href="/zh-cn/guides/missing/">';
    expect(
      inspectInternalLinkTargets(html, "/en/", ["/en/", "/zh-cn/"]),
    ).toEqual([
      expect.objectContaining({ code: "missing-internal-link-target" }),
      expect.objectContaining({ code: "missing-internal-link-target" }),
    ]);
  });

  it("accepts existing pages, fragments and external links", () => {
    const html =
      '<a href="/en/guides/">Guides</a><a href="#section">Section</a>' +
      '<a href="https://www.pathofexile.com/">Official</a>';
    expect(
      inspectInternalLinkTargets(html, "/en/", ["/en/", "/en/guides/"]),
    ).toEqual([]);
  });

  it("按根页和详情页类型检查必要结构化数据", () => {
    expect(
      inspectStructuredData(
        '<script type="application/ld+json">{"@type":"WebSite"}</script>',
        "/",
        false,
      ),
    ).toEqual([]);
    expect(
      inspectStructuredData(
        '<script type="application/ld+json">{"@type":"BreadcrumbList"}</script>',
        "/en/guides/guide/",
        true,
      ),
    ).toEqual([
      expect.objectContaining({
        code: "missing-structured-data",
        message: expect.stringContaining("Article"),
      }),
    ]);
  });

  it("accepts canonical, hreflang, Open Graph and Twitter metadata", () => {
    const html =
      '<link rel="canonical" href="/en/"><link rel="alternate" hrefLang="en" href="/en/"><meta property="og:image" content="/og.png"><meta name="twitter:card" content="summary_large_image">';
    expect(inspectSeoMetadata(html, "/en/")).toEqual([]);
  });

  it("reports incomplete shared SEO metadata", () => {
    expect(
      inspectSeoMetadata("<html></html>", "/en/").map((issue) => issue.code),
    ).toEqual([
      "missing-canonical",
      "missing-hreflang",
      "missing-open-graph",
      "missing-twitter-card",
    ]);
  });

  it("accepts a complete noindex static 404 document", async () => {
    const outputDirectory = await mkdtemp(
      path.join(os.tmpdir(), "exile2-404-"),
    );
    await writeFile(
      path.join(outputDirectory, "404.html"),
      '<html><head><title>Not found</title><meta name="description" content="Missing"><meta name="robots" content="noindex, nofollow"></head><body><main>Not found</main></body></html>',
    );
    await expect(
      verifyStaticNotFoundDocument(outputDirectory),
    ).resolves.toBeUndefined();
  });

  it("接受包含标题、描述和服务端正文标记的内容 HTML", () => {
    const html =
      '<html><head><title>Guide</title><meta name="description" content="Useful guide"></head>' +
      '<body><main data-prerender-content="true">Complete body</main></body></html>';

    expect(inspectPrerenderedHtml(html, "/en/guides/guide/", true)).toEqual([]);
  });

  it("报告缺失的标题、描述和正文", () => {
    expect(inspectPrerenderedHtml("<html></html>", "/", false)).toEqual([
      expect.objectContaining({ code: "missing-title" }),
      expect.objectContaining({ code: "missing-description" }),
      expect.objectContaining({ code: "missing-body" }),
    ]);
  });

  it("逐路径读取独立 HTML 并对缺失产物失败关闭", async () => {
    const outputDirectory = await mkdtemp(
      path.join(os.tmpdir(), "exile2-prerender-"),
    );
    await mkdir(path.join(outputDirectory, "en/guides/verified-guide"), {
      recursive: true,
    });
    await writeFile(
      publicPathToHtmlFile(outputDirectory, "/"),
      '<title>Home</title><meta name="description" content="Home page"><main>Home</main>',
    );

    const index = buildContentIndex([createContent()]);
    await expect(
      verifyPrerenderBuild(outputDirectory, enumeratePublicPaths(index), index),
    ).rejects.toBeInstanceOf(PrerenderVerificationError);
  });
});

describe("content route structural gates", () => {
  it("要求内容详情页恰好一个 H1", () => {
    expect(inspectSingleH1("<h1>Title</h1>", "/en/guides/g/")).toEqual([]);
    expect(
      inspectSingleH1("<h1>A</h1><h1>B</h1>", "/en/guides/g/").map(
        (i) => i.code,
      ),
    ).toEqual(["duplicate-h1"]);
    expect(inspectSingleH1("<p>No heading</p>", "/en/guides/g/")[0]?.code).toBe(
      "duplicate-h1",
    );
  });

  it("要求页内锚点都指向真实存在的 id", () => {
    const okHtml =
      '<nav><a href="#scope">Scope</a><a href="#verification">Verify</a></nav>' +
      '<section id="scope"></section><section id="verification"></section>';
    expect(inspectAnchorTargets(okHtml, "/en/guides/g/")).toEqual([]);

    const brokenHtml =
      '<nav><a href="#scope">Scope</a><a href="#missing">Missing</a></nav>' +
      '<section id="scope"></section>';
    expect(inspectAnchorTargets(brokenHtml, "/en/guides/g/")).toEqual([
      expect.objectContaining({ code: "missing-anchor-target" }),
    ]);
  });

  it("要求引用的根相对 og:image 在构建产物中存在", async () => {
    const outputDirectory = await mkdtemp(path.join(os.tmpdir(), "exile2-og-"));
    const ogDir = path.join(outputDirectory, "images", "og", "guides");
    await mkdir(ogDir, { recursive: true });
    await writeFile(path.join(ogDir, "verified-guide.webp"), "webp");

    const okHtml =
      '<meta property="og:image" content="/images/og/guides/verified-guide.webp">';
    expect(
      await inspectOgImageFile(
        okHtml,
        "/en/guides/verified-guide/",
        outputDirectory,
      ),
    ).toEqual([]);

    const brokenHtml =
      '<meta property="og:image" content="/images/og/guides/absent.webp">';
    expect(
      (
        await inspectOgImageFile(
          brokenHtml,
          "/en/guides/verified-guide/",
          outputDirectory,
        )
      ).map((issue) => issue.code),
    ).toEqual(["missing-og-image-file"]);

    // 绝对地址（已配置 VITE_SITE_URL）不做本地产物校验
    const absoluteHtml =
      '<meta property="og:image" content="https://poe2.stratlore.com/og.png">';
    expect(
      await inspectOgImageFile(
        absoluteHtml,
        "/en/guides/verified-guide/",
        outputDirectory,
      ),
    ).toEqual([]);
  });
});

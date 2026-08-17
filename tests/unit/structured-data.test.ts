/** 文件职责：验证结构化数据、Sitemap 和 robots 只反映真实的生产内容索引。 */
import { describe, expect, it } from "vitest";

import { buildContentIndex } from "../../lib/content";
import type { ParsedContent } from "../../lib/content/parse";
import { enumerateIndexablePaths } from "../../lib/prerender";
import {
  getBuildSiteOrigin,
  renderRobotsTxt,
  renderSitemapXml,
} from "../../lib/seo/site-files.server";
import {
  createArticleJsonLd,
  createWebSiteJsonLd,
} from "../../lib/seo/structured-data";

/** 创建仅存在于内存中的已核验内容，用于证明 lastmod 与发布过滤逻辑。 */
function createPublishedGuide(
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
      seoDescription: "A verified guide used only by the sitemap unit test.",
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
      updatedAt: "2026-07-27",
      verifiedAt: "2026-07-27",
      ...overrides,
    },
  } as ParsedContent;
}

describe("structured data", () => {
  it("输出 WebSite 与真实文章字段，不制造 FAQ 或评分", () => {
    const frontMatter = createPublishedGuide().frontMatter;
    const website = createWebSiteJsonLd();
    const article = createArticleJsonLd(frontMatter);

    expect(website).toMatchObject({ "@type": "WebSite" });
    expect(article).toMatchObject({
      "@type": "Article",
      author: "Editorial Team",
      dateModified: "2026-07-27",
      datePublished: "2026-07-26",
      headline: "Verified Guide",
    });
    expect(JSON.stringify([website, article])).not.toMatch(
      /FAQPage|Review|AggregateRating/,
    );
  });
});

describe("SEO site files", () => {
  it("只枚举可索引页面，并在分类达到两篇时收录分类", () => {
    const first = createPublishedGuide();
    const second = createPublishedGuide({
      contentId: "second-guide",
      slug: "second-guide",
      title: "Second Guide",
    });
    const index = buildContentIndex([first, second]);
    const paths = enumerateIndexablePaths(index);

    expect(paths).toContain("/en/guides/");
    expect(paths).toContain("/en/guides/verified-guide/");
    expect(paths).not.toContain("/");
    expect(paths).not.toContain("/en/search/");
    expect(paths).not.toContain("/404.html");
  });

  it("详情 URL 使用 updatedAt，robots 允许资源并声明 Sitemap", () => {
    const index = buildContentIndex([createPublishedGuide()]);
    const sitemap = renderSitemapXml(index, "https://poe2.stratlore.com");
    const robots = renderRobotsTxt("https://poe2.stratlore.com");

    expect(sitemap).toContain(
      "<loc>https://poe2.stratlore.com/en/guides/verified-guide/</loc>",
    );
    expect(sitemap).toContain("<lastmod>2026-07-27</lastmod>");
    expect(sitemap).not.toContain("/en/search/");
    expect(sitemap).not.toContain("<loc>https://poe2.stratlore.com/</loc>");
    expect(robots).toBe(
      "User-agent: *\nAllow: /\nSitemap: https://poe2.stratlore.com/sitemap.xml\n",
    );
  });

  it("校验站点源地址并为生产构建提供明确默认值", () => {
    expect(getBuildSiteOrigin("https://poe2.stratlore.com/path")).toBe(
      "https://poe2.stratlore.com",
    );
    expect(getBuildSiteOrigin("")).toBe("https://poe2.stratlore.com");
    expect(() => getBuildSiteOrigin("ftp://poe2.stratlore.com")).toThrow(
      /http or https/,
    );
  });
});

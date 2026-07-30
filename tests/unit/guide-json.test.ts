/** 文件职责：验证 Guides JSON Schema、查询服务、保留路由和数据库替换边界。 */
import { describe, expect, it } from "vitest";

import { guideArticleToParsedContent } from "../../lib/guides/content-adapter";
import { InMemoryGuideRepository } from "../../lib/guides/repository";
import { guideArticleSchema, type GuideArticle } from "../../lib/guides/schema";
import {
  GuideService,
  filterGuides,
  parseGuideQuery,
} from "../../lib/guides/service";
import { matchesGuideCollection } from "../../lib/guides/taxonomy";
import { buildContentIndex } from "../../lib/content";
import { enumerateIndexablePaths } from "../../lib/prerender";

/** 创建完整发布数据，让用例只覆盖目标规则而不重复维护大量变体。 */
function createGuide(overrides: Partial<GuideArticle> = {}): GuideArticle {
  return guideArticleSchema.parse({
    id: "verified-guide",
    slug: "verified-guide",
    locale: "en",
    type: "guide",
    status: "published",
    featured: false,
    title: "Verified Guide",
    shortTitle: "Verified",
    summary: "A complete verified Guide used by unit tests.",
    description: "A complete description used by unit tests.",
    guideCategory: "mechanics",
    estimatedReadingMinutes: 5,
    prerequisites: [],
    patch: "test",
    league: "test",
    patchStatus: "current",
    verificationStatus: "verified",
    verifiedClientVersion: "test",
    author: "Test author",
    reviewer: "Test reviewer",
    createdAt: "2026-07-29",
    publishedAt: "2026-07-29",
    updatedAt: "2026-07-29",
    lastVerifiedAt: "2026-07-29",
    tags: ["test"],
    sections: [
      {
        id: "overview",
        type: "overview",
        title: "Overview",
        order: 1,
        visible: true,
        toc: true,
        paragraphs: ["Verified body."],
        bullets: [],
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: [],
    relatedItemIds: [],
    relatedPatchIds: [],
    relatedSkillIds: [],
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    seo: {
      title: "Verified Guide",
      description: "Verified Guide description.",
    },
    ...overrides,
  });
}

describe("Guide JSON contract", () => {
  it("accepts a complete article and adapts it to the shared content index", () => {
    const article = createGuide();
    const parsed = guideArticleToParsedContent(article);

    expect(parsed.extension).toBe(".json");
    expect(parsed.guideArticle).toBe(article);
    expect(parsed.frontMatter).toMatchObject({
      contentId: article.id,
      contentType: "guide",
      slug: article.slug,
      status: "published",
    });
  });

  it("rejects router-reserved slugs", () => {
    const result = guideArticleSchema.safeParse({
      ...createGuide(),
      slug: "categories",
    });
    expect(result.success).toBe(false);
  });

  it("rejects incomplete published content", () => {
    const result = guideArticleSchema.safeParse({
      ...createGuide(),
      sections: [],
      sources: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects placeholder values in published content", () => {
    const result = guideArticleSchema.safeParse({
      ...createGuide(),
      description: "TODO: replace this claim.",
    });
    expect(result.success).toBe(false);
  });

  it("requires imageAlt when an image is present", () => {
    const result = guideArticleSchema.safeParse({
      ...createGuide(),
      heroImage: "/images/prototype-v4/guide-liquid.webp",
      imageAlt: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("requires verifiedClientVersion for verified status", () => {
    const result = guideArticleSchema.safeParse({
      ...createGuide(),
      verificationStatus: "verified",
      verifiedClientVersion: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("filters the same article for query and aggregation consumers", () => {
    const article = createGuide();
    expect(filterGuides([article], { category: "mechanics" })).toEqual([
      article,
    ]);
    expect(filterGuides([article], { category: "beginner" })).toEqual([]);
    expect(
      matchesGuideCollection(article, {
        kind: "category",
        value: "mechanics",
      }),
    ).toBe(true);
  });

  it("parses controlled query values and keeps repository access replaceable", async () => {
    const article = createGuide();
    const query = parseGuideQuery(
      new URLSearchParams("category=mechanics&sort=title"),
    );
    expect(query).toEqual({
      filters: { category: "mechanics" },
      sort: "title",
    });

    const service = new GuideService(new InMemoryGuideRepository([article]));
    await expect(
      service.list("en", { category: "mechanics" }, "title"),
    ).resolves.toEqual([article]);
    await expect(service.findPublished("en", "verified-guide")).resolves.toBe(
      article,
    );
  });

  it("indexes populated collections but never query combinations", () => {
    const first = createGuide();
    const second = createGuide({
      id: "second-guide",
      slug: "second-guide",
      title: "Second Guide",
      shortTitle: "Second",
    });
    const paths = enumerateIndexablePaths(
      buildContentIndex([
        guideArticleToParsedContent(first),
        guideArticleToParsedContent(second),
      ]),
    );

    expect(paths).toContain("/en/guides/categories/mechanics/");
    expect(paths.some((path) => path.includes("?"))).toBe(false);
  });

  it("does not index a single-article collection", () => {
    const article = createGuide();
    const paths = enumerateIndexablePaths(
      buildContentIndex([guideArticleToParsedContent(article)]),
    );

    expect(paths).not.toContain("/en/guides/categories/mechanics/");
  });
});

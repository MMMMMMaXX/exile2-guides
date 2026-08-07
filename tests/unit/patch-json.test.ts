/** 文件职责：验证 Patches JSON Schema、查询服务、保留路由和数据库替换边界。 */
import { describe, expect, it } from "vitest";

import { patchArticleToParsedContent } from "../../lib/patches/content-adapter";
import { InMemoryPatchRepository } from "../../lib/patches/repository";
import {
  patchArticleSchema,
  type PatchArticle,
} from "../../lib/patches/schema";
import { filterPatches, parsePatchQuery } from "../../lib/patches/service";
import { matchesPatchCollection } from "../../lib/patches/taxonomy";
import { buildContentIndex } from "../../lib/content";
import { enumerateIndexablePaths } from "../../lib/prerender";

/** 创建完整发布数据，让用例只覆盖目标规则而不重复维护大量变体。 */
function createPatch(overrides: Partial<PatchArticle> = {}): PatchArticle {
  return patchArticleSchema.parse({
    id: "verified-patch",
    slug: "verified-patch",
    locale: "en",
    type: "patch",
    status: "published",
    featured: false,
    title: "Verified Patch",
    shortTitle: "Verified",
    summary: "A verified patch summary.",
    description: "A verified patch description.",
    patchCategory: "major-updates",
    patchVersion: "0.5.4",
    patch: "Path of Exile 2 Early Access 0.5.4",
    league: "Standard",
    patchStatus: "current",
    verificationStatus: "pending-pc",
    verifiedClientVersion: "0.5.4d",
    author: "Editorial Team",
    reviewer: "Max",
    createdAt: "2026-07-27",
    publishedAt: "2026-07-28",
    updatedAt: "2026-07-28",
    tags: ["patch"],
    sections: [
      {
        id: "overview",
        order: 1,
        title: "Overview",
        toc: true,
        visible: true,
        type: "overview",
        paragraphs: ["Confirmed scope."],
        bullets: [],
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: [],
    relatedItemIds: [],
    relatedGuideIds: [],
    relatedSkillIds: [],
    sources: [
      {
        label: "Official notes",
        url: "https://www.pathofexile.com/forum/view-thread/3975218",
        sourceType: "official",
      },
    ],
    seo: {
      title: "Verified Patch SEO",
      description: "A verified patch SEO description.",
    },
    ...overrides,
  });
}

describe("patchArticleSchema", () => {
  it("accepts a complete published patch", () => {
    const article = createPatch();
    expect(article.id).toBe("verified-patch");
    expect(article.patchCategory).toBe("major-updates");
  });

  it("rejects reserved slugs", () => {
    const result = patchArticleSchema.safeParse({
      id: "bad",
      slug: "categories",
      locale: "en",
      type: "patch",
      status: "draft",
      title: "Bad",
      shortTitle: "Bad",
      summary: "Bad",
      description: "Bad",
      patchVersion: "0.1",
      patch: "Test",
      league: "Standard",
      patchStatus: "current",
      author: "Team",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      tags: [],
      sections: [],
      sources: [],
      seo: { title: "Bad", description: "Bad" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate section ids", () => {
    const result = patchArticleSchema.safeParse({
      id: "dup-sections",
      slug: "dup-sections",
      locale: "en",
      type: "patch",
      status: "draft",
      title: "Dup",
      shortTitle: "Dup",
      summary: "Dup",
      description: "Dup",
      patchVersion: "0.1",
      patch: "Test",
      league: "Standard",
      patchStatus: "current",
      author: "Team",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      tags: [],
      sections: [
        {
          id: "a",
          order: 1,
          title: "A",
          type: "overview",
          paragraphs: [],
          bullets: [],
        },
        {
          id: "a",
          order: 2,
          title: "B",
          type: "overview",
          paragraphs: [],
          bullets: [],
        },
      ],
      sources: [],
      seo: { title: "Dup", description: "Dup" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects published patch with placeholder values", () => {
    const result = patchArticleSchema.safeParse({
      id: "placeholder-patch",
      slug: "placeholder-patch",
      locale: "en",
      type: "patch",
      status: "published",
      title: "TODO patch",
      shortTitle: "TODO",
      summary: "TODO summary",
      description: "TODO desc",
      patchVersion: "0.1",
      patch: "Test",
      league: "Standard",
      patchStatus: "current",
      author: "Team",
      reviewer: "Max",
      createdAt: "2026-01-01",
      publishedAt: "2026-01-01",
      updatedAt: "2026-01-01",
      tags: [],
      sections: [
        {
          id: "s1",
          order: 1,
          title: "S",
          type: "overview",
          paragraphs: ["Text"],
          bullets: [],
        },
      ],
      sources: [
        { label: "Src", url: "https://example.com", sourceType: "official" },
      ],
      seo: { title: "TODO", description: "TODO" },
    });
    expect(result.success).toBe(false);
  });

  it("requires imageAlt when heroImage is present", () => {
    const result = patchArticleSchema.safeParse({
      id: "img-patch",
      slug: "img-patch",
      locale: "en",
      type: "patch",
      status: "draft",
      title: "Img",
      shortTitle: "Img",
      summary: "Img",
      description: "Img",
      patchVersion: "0.1",
      patch: "Test",
      league: "Standard",
      patchStatus: "current",
      author: "Team",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      heroImage: "/images/test.webp",
      tags: [],
      sections: [],
      sources: [],
      seo: { title: "Img", description: "Img" },
    });
    expect(result.success).toBe(false);
  });
});

describe("patchArticleToParsedContent", () => {
  it("projects patch article into the shared content index", () => {
    const article = createPatch();
    const parsed = patchArticleToParsedContent(article);
    expect(parsed.frontMatter.contentType).toBe("patch");
    expect(parsed.frontMatter.contentId).toBe("verified-patch");
    expect(parsed.patchArticle).toBe(article);
  });
});

describe("PatchService and filters", () => {
  it("filters by category", () => {
    const articles = [
      createPatch({ id: "a", slug: "a", patchCategory: "major-updates" }),
      createPatch({ id: "b", slug: "b", patchCategory: "hotfixes" }),
    ];
    const result = filterPatches(articles, { category: "hotfixes" });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("b");
  });

  it("parses query parameters", () => {
    const params = new URLSearchParams("category=balance&sort=version");
    const { filters, sort } = parsePatchQuery(params);
    expect(filters.category).toBe("balance");
    expect(sort).toBe("version");
  });

  it("matches collection taxonomy", () => {
    const article = createPatch({ patchCategory: "bug-fixes" });
    expect(
      matchesPatchCollection(article, { kind: "category", value: "bug-fixes" }),
    ).toBe(true);
    expect(
      matchesPatchCollection(article, { kind: "category", value: "balance" }),
    ).toBe(false);
  });
});

describe("InMemoryPatchRepository", () => {
  it("returns only published articles from getBySlug", async () => {
    const published = createPatch({ id: "pub", slug: "pub" });
    const repo = new InMemoryPatchRepository([published]);
    expect(await repo.getBySlug("en", "pub")).toBeDefined();
    expect(await repo.getBySlug("zh-cn", "pub")).toBeUndefined();
  });
});

describe("Sitemap indexable paths", () => {
  it("excludes noindex patch articles from indexable paths", () => {
    const article = createPatch({
      seo: { title: "T", description: "D", noindex: true },
    });
    const parsed = patchArticleToParsedContent(article);
    const index = buildContentIndex([parsed]);
    const paths = enumerateIndexablePaths(index);
    expect(paths).not.toContain("/en/patches/verified-patch/");
  });
});

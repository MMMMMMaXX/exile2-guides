/** 文件职责：验证 Bosses JSON Schema、发布门禁、保留路由和数据库替换边界。 */
import { describe, expect, it } from "vitest";

import { bossArticleToParsedContent } from "../../lib/bosses/content-adapter";
import { InMemoryBossRepository } from "../../lib/bosses/repository";
import { bossArticleSchema, type BossArticle } from "../../lib/bosses/schema";
import {
  BossService,
  filterBosses,
  parseBossQuery,
} from "../../lib/bosses/service";
import { matchesBossCollection } from "../../lib/bosses/taxonomy";
import { buildContentIndex } from "../../lib/content";
import { enumerateIndexablePaths } from "../../lib/prerender";

/** 创建完整发布数据，让用例只覆盖目标规则而不重复维护大量变体。 */
function createBoss(overrides: Partial<BossArticle> = {}): BossArticle {
  return bossArticleSchema.parse({
    id: "verified-boss",
    slug: "verified-boss",
    locale: "en",
    type: "boss",
    status: "published",
    featured: false,
    title: "Verified Boss",
    shortTitle: "Verified",
    summary: "A complete verified Boss used by unit tests.",
    description: "A complete description used by unit tests.",
    location: "Test location",
    campaignStage: "Act 1",
    recommendedLevel: "20-25",
    difficulty: "medium",
    damageTypes: ["fire"],
    phases: 2,
    bossCategory: "campaign",
    act: "act-1",
    isOptional: false,
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
        order: 10,
        visible: true,
        paragraphs: ["Verified body."],
        bullets: [],
      },
    ],
    relatedBuildIds: [],
    relatedGuideIds: [],
    relatedItemIds: [],
    relatedPatchIds: [],
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    seo: {
      title: "Verified Boss",
      description: "Verified Boss description.",
    },
    ...overrides,
  });
}

describe("Boss JSON contract", () => {
  it("accepts a complete article and adapts it to the shared content index", () => {
    const article = createBoss();
    const parsed = bossArticleToParsedContent(article);

    expect(parsed.extension).toBe(".json");
    expect(parsed.bossArticle).toBe(article);
    expect(parsed.frontMatter).toMatchObject({
      contentId: article.id,
      contentType: "boss",
      slug: article.slug,
      status: "published",
    });
  });

  it("rejects router-reserved slugs", () => {
    expect(() => createBoss({ slug: "categories" })).toThrow(
      /slug is reserved/,
    );
    expect(() => createBoss({ slug: "act-1" })).toThrow(/slug is reserved/);
    expect(() => createBoss({ slug: "endgame" })).toThrow(/slug is reserved/);
  });

  it("rejects incomplete published content", () => {
    expect(() => createBoss({ sections: [], sources: [] })).toThrow(
      /published boss requires/,
    );
    expect(() => createBoss({ reviewer: "" })).toThrow(/reviewer/);
    expect(() =>
      createBoss({ description: "TODO: replace this claim." }),
    ).toThrow(/placeholder/);
  });

  it("enforces section id and order uniqueness", () => {
    const duplicateSections = [
      {
        id: "overview",
        type: "overview" as const,
        title: "First",
        order: 10,
        toc: true,
        visible: true,
        paragraphs: ["First."],
        bullets: [],
      },
      {
        id: "overview",
        type: "overview" as const,
        title: "Second",
        order: 20,
        toc: true,
        visible: true,
        paragraphs: ["Second."],
        bullets: [],
      },
    ];
    expect(() => createBoss({ sections: duplicateSections })).toThrow(
      /section id must be unique/,
    );

    const duplicateOrder = [
      {
        id: "first",
        type: "overview" as const,
        title: "First",
        order: 10,
        toc: true,
        visible: true,
        paragraphs: ["First."],
        bullets: [],
      },
      {
        id: "second",
        type: "overview" as const,
        title: "Second",
        order: 10,
        toc: true,
        visible: true,
        paragraphs: ["Second."],
        bullets: [],
      },
    ];
    expect(() => createBoss({ sections: duplicateOrder })).toThrow(
      /section order must be unique/,
    );
  });

  it("requires complete encounter fields when verified", () => {
    expect(() =>
      createBoss({
        verificationStatus: "verified",
        verifiedClientVersion: "test",
        difficulty: null,
      }),
    ).toThrow(/complete encounter fields/);
    expect(() =>
      createBoss({
        verificationStatus: "verified",
        verifiedClientVersion: "test",
        damageTypes: [],
      }),
    ).toThrow(/complete encounter fields/);
    expect(() =>
      createBoss({
        verificationStatus: "verified",
        verifiedClientVersion: "test",
        phases: null,
      }),
    ).toThrow(/complete encounter fields/);
  });

  it("allows pending-pc bosses without complete encounter fields", () => {
    const article = createBoss({
      verificationStatus: "pending-pc",
      difficulty: null,
      damageTypes: [],
      phases: null,
    });
    expect(article.verificationStatus).toBe("pending-pc");
    expect(article.difficulty).toBeNull();
  });

  it("filters the same article for query and aggregation consumers", () => {
    const article = createBoss();
    expect(
      filterBosses([article], {
        category: "campaign",
        act: "act-1",
      }),
    ).toEqual([article]);
    expect(
      matchesBossCollection(article, { kind: "category", value: "campaign" }),
    ).toBe(true);
    expect(
      matchesBossCollection(article, { kind: "act", value: "act-1" }),
    ).toBe(true);
  });

  it("parses controlled query values and keeps repository access replaceable", async () => {
    const article = createBoss();
    const query = parseBossQuery(
      new URLSearchParams("category=campaign&difficulty=unknown&sort=title"),
    );
    expect(query).toEqual({
      filters: { category: "campaign" },
      sort: "title",
    });

    const service = new BossService(new InMemoryBossRepository([article]));
    await expect(
      service.list("en", { category: "campaign" }, "title"),
    ).resolves.toEqual([article]);
    await expect(service.findPublished("en", "verified-boss")).resolves.toBe(
      article,
    );
  });

  it("indexes populated collections but never query combinations", () => {
    const first = createBoss();
    const second = createBoss({
      id: "second-boss",
      slug: "second-boss",
      title: "Second Boss",
      shortTitle: "Second",
    });
    const paths = enumerateIndexablePaths(
      buildContentIndex([
        bossArticleToParsedContent(first),
        bossArticleToParsedContent(second),
      ]),
    );

    expect(paths).toContain("/en/bosses/categories/campaign/");
    expect(paths).toContain("/en/bosses/acts/act-1/");
    expect(paths.some((path) => path.includes("?"))).toBe(false);
  });
});

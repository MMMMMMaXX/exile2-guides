/** 文件职责：验证 Builds JSON Schema、查询服务、保留路由和数据库替换边界。 */
import { describe, expect, it } from "vitest";

import { buildArticleToParsedContent } from "../../lib/builds/content-adapter";
import { InMemoryBuildRepository } from "../../lib/builds/repository";
import { buildArticleSchema, type BuildArticle } from "../../lib/builds/schema";
import {
  BuildService,
  filterBuilds,
  parseBuildQuery,
} from "../../lib/builds/service";
import { matchesBuildCollection } from "../../lib/builds/taxonomy";
import { buildContentIndex } from "../../lib/content";
import { enumerateIndexablePaths } from "../../lib/prerender";

/** 创建完整发布数据，让用例只覆盖目标规则而不重复维护大量变体。 */
function createBuild(overrides: Partial<BuildArticle> = {}): BuildArticle {
  return buildArticleSchema.parse({
    id: "verified-build",
    slug: "verified-build",
    locale: "en",
    type: "build",
    status: "published",
    featured: false,
    title: "Verified Build",
    shortTitle: "Verified",
    summary: "A complete verified Build used by unit tests.",
    description: "A complete description used by unit tests.",
    classId: "ranger",
    ascendancyId: "deadeye",
    mainSkillIds: ["test-skill"],
    secondarySkillIds: [],
    stages: ["starter"],
    budgets: ["low"],
    difficulty: "beginner",
    playstyleTags: ["ranged"],
    damageTypes: ["cold"],
    bestFor: ["beginners"],
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
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    seo: {
      title: "Verified Build",
      description: "Verified Build description.",
    },
    ...overrides,
  });
}

describe("Build JSON contract", () => {
  it("accepts a complete article and adapts it to the shared content index", () => {
    const article = createBuild();
    const parsed = buildArticleToParsedContent(article);

    expect(parsed.extension).toBe(".json");
    expect(parsed.buildArticle).toBe(article);
    expect(parsed.frontMatter).toMatchObject({
      contentId: article.id,
      contentType: "build",
      slug: article.slug,
      status: "published",
    });
  });

  it("rejects router-reserved slugs and incomplete published content", () => {
    expect(() => createBuild({ slug: "starter" })).toThrow(/slug is reserved/);
    expect(() => createBuild({ sections: [], sources: [] })).toThrow(
      /published build requires/,
    );
    expect(() =>
      createBuild({ description: "TODO: replace this claim." }),
    ).toThrow(/placeholder/);
  });

  it("requires attribution URLs for non-generated body images", () => {
    const article = createBuild();

    expect(() =>
      buildArticleSchema.parse({
        ...article,
        sections: [
          {
            id: "community-image",
            type: "figure",
            title: "Community image",
            order: 10,
            visible: true,
            toc: false,
            image: {
              src: "/images/prototype-v4/hero-build.webp",
              alt: "Community image",
              caption: "An attributed external image.",
              credit: "Community author",
              sourceKind: "community",
            },
          },
        ],
      }),
    ).toThrow(/require sourceUrl/);
  });

  it("filters the same article for query and aggregation consumers", () => {
    const article = createBuild();
    expect(
      filterBuilds([article], {
        budget: "low",
        class: "ranger",
        stage: "starter",
      }),
    ).toEqual([article]);
    expect(
      matchesBuildCollection(article, {
        kind: "ascendancy",
        value: "deadeye",
      }),
    ).toBe(true);
  });

  it("parses controlled query values and keeps repository access replaceable", async () => {
    const article = createBuild();
    const query = parseBuildQuery(
      new URLSearchParams(
        "class=ranger&budget=low&difficulty=unknown&sort=title",
      ),
    );
    expect(query).toEqual({
      filters: { budget: "low", class: "ranger" },
      sort: "title",
    });

    const service = new BuildService(new InMemoryBuildRepository([article]));
    await expect(
      service.list("en", { class: "ranger" }, "title"),
    ).resolves.toEqual([article]);
    await expect(service.findPublished("en", "verified-build")).resolves.toBe(
      article,
    );
  });

  it("indexes populated collections but never query combinations", () => {
    const first = createBuild();
    const second = createBuild({
      id: "second-build",
      slug: "second-build",
      title: "Second Build",
      shortTitle: "Second",
    });
    const paths = enumerateIndexablePaths(
      buildContentIndex([
        buildArticleToParsedContent(first),
        buildArticleToParsedContent(second),
      ]),
    );

    expect(paths).toContain("/en/builds/classes/ranger/");
    expect(paths).toContain("/en/builds/ascendancies/deadeye/");
    expect(paths).toContain("/en/builds/starter/");
    expect(paths.some((path) => path.includes("?"))).toBe(false);
  });
});

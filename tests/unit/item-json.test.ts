/** 文件职责：验证 Items JSON Schema、发布门禁、保留路由和数据库替换边界。 */
import { describe, expect, it } from "vitest";

import { itemArticleToParsedContent } from "../../lib/items/content-adapter";
import { InMemoryItemRepository } from "../../lib/items/repository";
import { itemArticleSchema, type ItemArticle } from "../../lib/items/schema";
import {
  ItemService,
  filterItems,
  parseItemQuery,
} from "../../lib/items/service";
import { matchesItemCollection } from "../../lib/items/taxonomy";
import { buildContentIndex } from "../../lib/content";
import { enumerateIndexablePaths } from "../../lib/prerender";

/** 创建完整发布数据，让用例只覆盖目标规则而不重复维护大量变体。 */
function createItem(overrides: Partial<ItemArticle> = {}): ItemArticle {
  return itemArticleSchema.parse({
    id: "verified-item",
    slug: "verified-item",
    locale: "en",
    type: "item",
    status: "published",
    featured: false,
    title: "Verified Item",
    shortTitle: "Verified",
    summary: "A complete verified Item used by unit tests.",
    description: "A complete description used by unit tests.",
    itemType: "currency",
    rarity: "normal",
    requiredLevel: null,
    useCases: ["verification"],
    itemCategory: "currency",
    patch: "test",
    league: "test",
    patchStatus: "current",
    verificationStatus: "verified",
    verifiedClientVersion: "test",
    author: "Test author",
    reviewer: "Test reviewer",
    createdAt: "2026-07-30",
    publishedAt: "2026-07-30",
    updatedAt: "2026-07-30",
    lastVerifiedAt: "2026-07-30",
    tags: ["test"],
    sections: [
      {
        id: "overview",
        type: "overview",
        title: "Overview",
        order: 10,
        toc: true,
        visible: true,
        paragraphs: ["Verified body."],
        bullets: [],
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: [],
    relatedGuideIds: [],
    relatedPatchIds: [],
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    seo: {
      title: "Verified Item",
      description: "Verified Item description.",
    },
    ...overrides,
  });
}

describe("Item JSON contract", () => {
  it("accepts a complete article and adapts it to the shared content index", () => {
    const article = createItem();
    const parsed = itemArticleToParsedContent(article);

    expect(parsed.extension).toBe(".json");
    expect(parsed.itemArticle).toBe(article);
    expect(parsed.frontMatter).toMatchObject({
      contentId: article.id,
      contentType: "item",
      slug: article.slug,
      status: "published",
    });
  });

  it("rejects router-reserved slugs", () => {
    expect(() => createItem({ slug: "categories" })).toThrow(
      /slug is reserved/,
    );
    expect(() => createItem({ slug: "currency" })).toThrow(/slug is reserved/);
    expect(() => createItem({ slug: "weapons" })).toThrow(/slug is reserved/);
  });

  it("rejects incomplete published content", () => {
    expect(() => createItem({ sections: [], sources: [] })).toThrow(
      /published item requires/,
    );
    expect(() => createItem({ reviewer: "" })).toThrow(/reviewer/);
    expect(() =>
      createItem({ description: "TODO: replace this claim." }),
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
    expect(() => createItem({ sections: duplicateSections })).toThrow(
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
    expect(() => createItem({ sections: duplicateOrder })).toThrow(
      /section order must be unique/,
    );
  });

  it("requires complete identity fields when verified", () => {
    expect(() =>
      createItem({
        verificationStatus: "verified",
        verifiedClientVersion: "test",
        itemType: null,
      }),
    ).toThrow(/complete identity fields/);
    expect(() =>
      createItem({
        verificationStatus: "verified",
        verifiedClientVersion: "test",
        rarity: null,
      }),
    ).toThrow(/complete identity fields/);
    expect(() =>
      createItem({
        verificationStatus: "verified",
        verifiedClientVersion: "test",
        itemCategory: null,
      }),
    ).toThrow(/complete identity fields/);
  });

  it("allows pending-pc items without complete identity fields", () => {
    const article = createItem({
      verificationStatus: "pending-pc",
      itemType: null,
      rarity: null,
      itemCategory: null,
    });
    expect(article.verificationStatus).toBe("pending-pc");
    expect(article.itemType).toBeNull();
  });

  it("filters the same article for query and aggregation consumers", () => {
    const article = createItem();
    expect(
      filterItems([article], {
        category: "currency",
        rarity: "normal",
      }),
    ).toEqual([article]);
    expect(
      matchesItemCollection(article, { kind: "category", value: "currency" }),
    ).toBe(true);
  });

  it("parses controlled query values and keeps repository access replaceable", async () => {
    const article = createItem();
    const query = parseItemQuery(
      new URLSearchParams("category=currency&rarity=unknown&sort=title"),
    );
    expect(query).toEqual({
      filters: { category: "currency" },
      sort: "title",
    });

    const service = new ItemService(new InMemoryItemRepository([article]));
    await expect(
      service.list("en", { category: "currency" }, "title"),
    ).resolves.toEqual([article]);
    await expect(service.findPublished("en", "verified-item")).resolves.toBe(
      article,
    );
  });

  it("indexes populated collections but never query combinations", () => {
    const first = createItem();
    const second = createItem({
      id: "second-item",
      slug: "second-item",
      title: "Second Item",
      shortTitle: "Second",
    });
    const paths = enumerateIndexablePaths(
      buildContentIndex([
        itemArticleToParsedContent(first),
        itemArticleToParsedContent(second),
      ]),
    );

    expect(paths).toContain("/en/items/categories/currency/");
    expect(paths.some((path) => path.includes("?"))).toBe(false);
  });
});

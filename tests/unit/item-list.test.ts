/** 文件职责：验证 Item 列表仅按 PRD 的 Item Type、Use Case 与 Patch 筛选真实静态内容。 */
import { describe, expect, it } from "vitest";

import {
  createDefaultItemFilters,
  filterItemListItems,
  getItemListItems,
  type ItemListItem,
} from "../../lib/content/item-list";

/** 创建最小已发布 Item，保证筛选测试不依赖生产内容目录。 */
function createItem(
  overrides: Partial<ItemListItem["frontMatter"]> = {},
): ItemListItem {
  return {
    bodyHtml: "<h2>Item</h2>",
    frontMatter: {
      author: "Editorial Team",
      contentId: "verified-item",
      contentType: "item",
      draft: false,
      featured: false,
      itemType: "unique-bow",
      locale: "en",
      patch: "0.1",
      patchStatus: "current",
      publishedAt: "2026-07-27",
      rarity: "unique",
      relatedContentIds: [],
      requiredLevel: "20",
      reviewer: "Reviewer",
      seoDescription: "Verified Item description.",
      seoTitle: "Verified Item | Exile2 Guides",
      slug: "verified-item",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "Verified Item summary.",
      tags: [],
      title: "Verified Item",
      updatedAt: "2026-07-27",
      useCases: ["ranged-builds"],
      verifiedAt: "2026-07-27",
      ...overrides,
    },
    tableOfContents: [],
  };
}

describe("item list", () => {
  it("filters a use-case array by containment and preserves source data", () => {
    const bow = createItem();
    const armor = createItem({
      contentId: "verified-armour",
      itemType: "unique-armour",
      patch: "0.2",
      slug: "verified-armour",
      useCases: ["melee-builds"],
    });
    const filters = {
      ...createDefaultItemFilters(),
      itemType: "unique-armour",
      useCase: "melee-builds",
      patch: "0.2",
    };
    expect(filterItemListItems([bow, armor], filters)).toEqual([armor]);
    expect(bow.frontMatter.useCases).toEqual(["ranged-builds"]);
  });

  it("drops non-Item static pages before list consumers receive them", () => {
    const item = createItem();
    const guide = {
      ...item,
      frontMatter: {
        ...item.frontMatter,
        contentType: "guide" as const,
        contentId: "guide",
        estimatedReadingMinutes: 3,
        guideCategory: "beginner" as const,
        prerequisites: [],
      },
    } as never;
    expect(getItemListItems([item, guide])).toEqual([item]);
  });
});

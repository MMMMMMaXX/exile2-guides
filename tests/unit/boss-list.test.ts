/** 文件职责：验证 Boss 列表只读取真实静态页面，并严格使用 PRD 的四个筛选维度。 */
import { describe, expect, it } from "vitest";

import {
  createDefaultBossFilters,
  filterBossListItems,
  getBossListItems,
  type BossFilters,
  type BossListItem,
} from "../../lib/content/boss-list";
import type { StaticContentPageMap } from "../../lib/content/content-page";

/** 生成最小已发布 Boss 静态页，使列表测试不依赖未核验的生产内容。 */
function createBossItem(
  overrides: Partial<BossListItem["frontMatter"]> = {},
): BossListItem {
  return {
    bodyHtml: "<h2>Verified boss</h2>",
    frontMatter: {
      author: "Editorial Team",
      campaignStage: "act-2",
      contentId: "verified-boss",
      contentType: "boss",
      damageTypes: ["fire"],
      difficulty: "high",
      draft: false,
      featured: false,
      locale: "en",
      location: "Dreadkeep",
      patch: "0.1",
      patchStatus: "current",
      phases: 2,
      publishedAt: "2026-07-27",
      recommendedLevel: "20",
      relatedContentIds: [],
      reviewer: "Reviewer",
      seoDescription: "Verified Boss description.",
      seoTitle: "Verified Boss | Exile2 Guides",
      slug: "verified-boss",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "A verified Boss summary.",
      tags: [],
      title: "Verified Boss",
      updatedAt: "2026-07-27",
      verifiedAt: "2026-07-27",
      ...overrides,
    },
    tableOfContents: [],
  };
}

describe("boss list", () => {
  it("reads only Bosses in the requested locale and sorts by update date", () => {
    const older = createBossItem({
      contentId: "older-boss",
      slug: "older-boss",
      updatedAt: "2026-07-20",
    });
    const newer = createBossItem({
      contentId: "newer-boss",
      slug: "newer-boss",
      updatedAt: "2026-07-27",
    });
    const chinese = createBossItem({
      contentId: "chinese-boss",
      locale: "zh-cn",
      slug: "chinese-boss",
    });
    const pages: StaticContentPageMap = {
      "/en/bosses/newer-boss/": newer,
      "/en/bosses/older-boss/": older,
      "/zh-cn/bosses/chinese-boss/": chinese,
    };

    expect(getBossListItems(pages, "en")).toEqual([newer, older]);
  });

  it("filters by campaign context, area, difficulty and patch without changing source data", () => {
    const campaign = createBossItem();
    const endgame = createBossItem({
      campaignStage: "endgame",
      contentId: "endgame-boss",
      difficulty: "medium",
      location: "Citadel",
      patch: "0.2",
      slug: "endgame-boss",
    });
    const filters: BossFilters = {
      ...createDefaultBossFilters(),
      campaignStage: "endgame",
      location: "Citadel",
      difficulty: "medium",
    };

    expect(filterBossListItems([campaign, endgame], filters)).toEqual([
      endgame,
    ]);
    expect(campaign.frontMatter.location).toBe("Dreadkeep");
  });
});

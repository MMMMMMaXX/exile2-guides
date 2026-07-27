/** 文件职责：验证 Build 列表只消费真实静态页面，并按四个首发筛选维度稳定过滤。 */
import { describe, expect, it } from "vitest";

import {
  createDefaultBuildFilters,
  filterBuildListItems,
  getBuildListItems,
  type BuildFilters,
  type BuildListItem,
} from "../../lib/content/build-list";
import type { StaticContentPageMap } from "../../lib/content/content-page";

/** 生成最小已发布 Build 静态页，确保测试不会依赖生产内容目录。 */
function createBuildItem(
  overrides: Partial<BuildListItem["frontMatter"]> = {},
): BuildListItem {
  return {
    bodyHtml: "<h2>Verified build</h2>",
    frontMatter: {
      ascendancy: "",
      author: "Editorial Team",
      bestFor: ["mapping"],
      budget: "low",
      className: "Ranger",
      contentId: "ranger-build",
      contentType: "build",
      damageTypes: ["lightning"],
      difficulty: "beginner",
      draft: false,
      featured: false,
      locale: "en",
      patch: "0.1",
      patchStatus: "current",
      playstyle: ["ranged"],
      primarySkill: "Lightning Arrow",
      publishedAt: "2026-07-27",
      relatedContentIds: [],
      reviewer: "Reviewer",
      seoDescription: "Verified Build description.",
      seoTitle: "Verified Build | Exile2 Guides",
      slug: "ranger-build",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "A verified Build summary.",
      tags: [],
      title: "Verified Ranger Build",
      updatedAt: "2026-07-27",
      verifiedAt: "2026-07-27",
      ...overrides,
    },
    tableOfContents: [],
  };
}

describe("build list", () => {
  it("reads only Builds in the requested locale and sorts by update date", () => {
    const older = createBuildItem({
      contentId: "older-build",
      slug: "older-build",
      updatedAt: "2026-07-20",
    });
    const newer = createBuildItem({
      contentId: "newer-build",
      slug: "newer-build",
      updatedAt: "2026-07-27",
    });
    const chinese = createBuildItem({
      contentId: "chinese-build",
      locale: "zh-cn",
      slug: "chinese-build",
    });
    const pages: StaticContentPageMap = {
      "/en/builds/newer-build/": newer,
      "/en/builds/older-build/": older,
      "/zh-cn/builds/chinese-build/": chinese,
    };

    expect(getBuildListItems(pages, "en")).toEqual([newer, older]);
  });

  it("filters by class, difficulty, budget and patch without changing source data", () => {
    const ranger = createBuildItem();
    const warrior = createBuildItem({
      budget: "high",
      className: "Warrior",
      contentId: "warrior-build",
      difficulty: "advanced",
      patch: "0.2",
      slug: "warrior-build",
    });
    const filters: BuildFilters = {
      ...createDefaultBuildFilters(),
      className: "Warrior",
      difficulty: "advanced",
    };

    expect(filterBuildListItems([ranger, warrior], filters)).toEqual([warrior]);
    expect(ranger.frontMatter.className).toBe("Ranger");
  });
});

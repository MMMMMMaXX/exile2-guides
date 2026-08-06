/** 文件职责：验证静态搜索索引语言隔离、草稿隔离继承和标题优先的本地搜索排序。 */
import { describe, expect, it } from "vitest";

import {
  buildSearchIndexes,
  searchDocuments,
} from "../../lib/search/search-index";

describe("search index", () => {
  it("creates separate language indexes from already-public static pages", () => {
    const indexes = buildSearchIndexes({
      "/en/guides/leveling/": {
        bodyHtml: "",
        frontMatter: {
          contentType: "guide",
          locale: "en",
          summary: "Leveling advice",
          tags: ["beginner"],
          title: "Leveling Guide",
        } as never,
        tableOfContents: [{ id: "steps", level: 2, text: "Steps" }],
      },
      "/zh-cn/guides/leveling/": {
        bodyHtml: "",
        frontMatter: {
          contentType: "guide",
          locale: "zh-cn",
          summary: "升级建议",
          tags: ["新手"],
          title: "升级指南",
        } as never,
        tableOfContents: [],
      },
    });
    expect(indexes.en).toHaveLength(1);
    expect(indexes["zh-cn"]).toHaveLength(1);
    expect(indexes.en?.[0]?.headings).toEqual(["Steps"]);
  });

  it("requires every search term and ranks title matches before other fields", () => {
    const documents = [
      {
        category: "guide" as const,
        description: "Leveling route",
        headings: [],
        locale: "en" as const,
        patch: "0.5.4",
        path: "/en/guides/one/",
        tags: [],
        title: "Campaign notes",
        updatedAt: "2025-01-01",
      },
      {
        category: "guide" as const,
        description: "Route notes",
        headings: [],
        locale: "en" as const,
        patch: "0.5.4",
        path: "/en/guides/two/",
        tags: [],
        title: "Leveling Guide",
        updatedAt: "2025-01-01",
      },
    ];
    expect(
      searchDocuments(documents, "leveling").map((item) => item.path),
    ).toEqual(["/en/guides/two/", "/en/guides/one/"]);
    expect(searchDocuments(documents, "leveling missing")).toEqual([]);
  });
});

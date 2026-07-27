/** 文件职责：验证 TASK-025 仓库草稿模板的数量、双语关系和生产消费者隔离边界。 */
import { describe, expect, it } from "vitest";

import { loadContentIndex } from "../../lib/content";
import { loadStaticContentPages } from "../../lib/content/content-page.server";
import { contentTypes, supportedLocales } from "../../lib/content/constants";
import {
  enumerateIndexablePaths,
  enumeratePublicPaths,
} from "../../lib/prerender";
import { buildSearchIndexes } from "../../lib/search/search-index";
import { renderSitemapXml } from "../../lib/seo/site-files.server";

describe("repository content templates", () => {
  it("keeps exactly one bilingual draft pair per content type template", async () => {
    const editingIndex = await loadContentIndex(undefined, {
      includeDrafts: true,
    });

    const templateEntries = editingIndex.entries.filter((entry) =>
      entry.frontMatter.contentId.endsWith("-template"),
    );
    expect(templateEntries).toHaveLength(
      contentTypes.length * supportedLocales.length,
    );
    for (const contentType of contentTypes) {
      const entries = templateEntries.filter(
        (entry) =>
          entry.frontMatter.contentType === contentType &&
          entry.frontMatter.contentId.endsWith("-template"),
      );
      expect(entries).toHaveLength(2);
      expect(entries.map((entry) => entry.frontMatter.locale).sort()).toEqual([
        "en",
        "zh-cn",
      ]);
      expect(
        new Set(entries.map((entry) => entry.frontMatter.contentId)).size,
      ).toBe(1);
      expect(new Set(entries.map((entry) => entry.frontMatter.slug)).size).toBe(
        1,
      );
    }
  });

  it("marks every sample as unverified draft content", async () => {
    const editingIndex = await loadContentIndex(undefined, {
      includeDrafts: true,
    });
    const templateEntries = editingIndex.entries.filter((entry) =>
      entry.frontMatter.contentId.endsWith("-template"),
    );

    for (const entry of templateEntries) {
      expect(entry.frontMatter).toMatchObject({
        draft: true,
        patchStatus: "under-review",
        status: "draft",
      });
      expect(entry.frontMatter.patch).toContain("REPLACE_WITH_");
      expect(entry.frontMatter.verifiedAt).toBeUndefined();
      expect(entry.frontMatter.publishedAt).toBeUndefined();
    }
  });

  it("excludes every sample from routes, sitemap, and search indexes", async () => {
    const productionIndex = await loadContentIndex();
    const staticPages = await loadStaticContentPages();
    const publicPaths = enumeratePublicPaths(productionIndex);
    const indexablePaths = enumerateIndexablePaths(productionIndex);
    const sitemap = renderSitemapXml(
      productionIndex,
      "https://poe2.stratlore.com",
    );
    const searchIndexes = buildSearchIndexes(staticPages);

    expect(
      productionIndex.entries.some((entry) =>
        entry.frontMatter.contentId.endsWith("-template"),
      ),
    ).toBe(false);
    expect(
      Object.keys(staticPages).some((path) => path.includes("-template/")),
    ).toBe(false);
    expect(publicPaths.some((path) => path.includes("-template/"))).toBe(false);
    expect(indexablePaths.some((path) => path.includes("-template/"))).toBe(
      false,
    );
    expect(sitemap).not.toContain("-template/");
    for (const entries of Object.values(searchIndexes)) {
      expect(entries.some((entry) => entry.path.includes("-template/"))).toBe(
        false,
      );
    }
  });
});

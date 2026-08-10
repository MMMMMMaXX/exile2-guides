/** 文件职责：验证结构模板隔离，以及真实文章生成即发布并允许索引的仓库边界。 */
import { describe, expect, it } from "vitest";

import { loadContentIndex } from "../../lib/content";
import {
  loadLocalBuildDraftPreviewPages,
  loadStaticContentPages,
} from "../../lib/content/content-page.server";
import { contentTypes, supportedLocales } from "../../lib/content/constants";
import {
  enumerateIndexablePaths,
  enumeratePublicPaths,
} from "../../lib/prerender";
import { buildSearchIndexes } from "../../lib/search/search-index";
import { renderSitemapXml } from "../../lib/seo/site-files.server";

describe("repository content templates", () => {
  it("keeps exactly one 10-locale draft set per content type template", async () => {
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
      expect(entries).toHaveLength(supportedLocales.length);
      expect(entries.map((entry) => entry.frontMatter.locale).sort()).toEqual(
        [...supportedLocales].sort(),
      );
      expect(
        new Set(entries.map((entry) => entry.frontMatter.contentId)).size,
      ).toBe(1);
      expect(new Set(entries.map((entry) => entry.frontMatter.slug)).size).toBe(
        1,
      );
    }
  });

  it("keeps every structural template in draft state", async () => {
    const editingIndex = await loadContentIndex(undefined, {
      includeDrafts: true,
    });
    const templateEntries = editingIndex.entries.filter((entry) =>
      entry.frontMatter.contentId.endsWith("-template"),
    );

    for (const entry of templateEntries) {
      expect(entry.frontMatter).toMatchObject({
        draft: true,
        status: "draft",
      });
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

  it("does not leave non-template Build drafts for local-only preview", async () => {
    const previewPages = await loadLocalBuildDraftPreviewPages();
    expect(previewPages).toEqual({});
  });
});

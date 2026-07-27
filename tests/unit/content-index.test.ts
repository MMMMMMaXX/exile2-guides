/** 文件职责：验证内容索引、翻译、关联、路由和文件发现的核心不变量。 */
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  buildContentIndex,
  ContentIndexError,
  contentRoutePath,
  discoverContentFiles,
  getContentByRoute,
  getContentTranslation,
  parseContentSource,
  resolveRelatedContent,
  type ContentLocale,
  type ContentType,
  type ParsedContent,
} from "../../lib/content";

type ContentFixtureOptions = {
  contentId: string;
  contentType?: "guide" | "patch";
  locale?: ContentLocale;
  published?: boolean;
  relatedContentIds?: string[];
  slug?: string;
};

/** 生成通过 TASK-003 Schema 的最小内容源，便于索引测试聚焦关系而非字段拼装。 */
function createContentSource({
  contentId,
  contentType = "patch",
  locale = "en",
  published = true,
  relatedContentIds = [],
  slug = contentId,
}: ContentFixtureOptions): string {
  const publicationFields = published
    ? `
status: published
draft: false
publishedAt: 2026-07-26
verifiedAt: 2026-07-26
verifiedClientVersion: 0.5.4d
reviewer: Assigned fact reviewer
sources:
  - label: Official source
    url: https://www.pathofexile.com/
    sourceType: official`
    : `
status: draft
draft: true`;
  const typeFields =
    contentType === "guide"
      ? `
guideCategory: beginner
estimatedReadingMinutes: 5
prerequisites: []`
      : "";
  const relatedFields =
    relatedContentIds.length > 0
      ? `
relatedContentIds:
${relatedContentIds.map((id) => `  - ${id}`).join("\n")}`
      : "";

  return `---
contentId: ${contentId}
locale: ${locale}
contentType: ${contentType}
slug: ${slug}
title: ${contentId} title
seoTitle: ${contentId} SEO title
seoDescription: A complete description for the content index fixture.
summary: A concise fixture summary.
patch: "0.1"
patchStatus: current
author: Exile2 Guides Editorial Team
updatedAt: 2026-07-26
${publicationFields}
${typeFields}
${relatedFields}
---

# Verified fixture

This body exists only to verify content index behavior.
`;
}

/** 解析测试内容并生成符合实际目录规则的来源路径。 */
async function createParsedContent(
  options: ContentFixtureOptions,
): Promise<ParsedContent> {
  const contentType = options.contentType ?? "patch";
  const locale = options.locale ?? "en";
  const slug = options.slug ?? options.contentId;
  const directory = contentType === "patch" ? "patches" : "guides";
  return parseContentSource(
    createContentSource(options),
    `content/${locale}/${directory}/${slug}.md`,
  );
}

// 生产过滤、唯一性、跨语言映射和相关内容是 TASK-004 的核心回归边界。
describe("content index", () => {
  it("indexes published content by route, locale, type, and contentId", async () => {
    const published = await createParsedContent({
      contentId: "patch-published",
    });
    const draft = await createParsedContent({
      contentId: "patch-draft",
      published: false,
    });

    const index = buildContentIndex([draft, published]);

    expect(index.entries).toEqual([published]);
    expect(index.byLocale.get("en")).toEqual([published]);
    expect(index.byType.get("patch")).toEqual([published]);
    expect(index.byContentId.get("patch-published")?.get("en")).toBe(published);
    expect(getContentByRoute(index, "en", "patch", "patch-published")).toBe(
      published,
    );
  });

  it("includes drafts only when an editing consumer opts in", async () => {
    const draft = await createParsedContent({
      contentId: "patch-draft",
      published: false,
    });

    const index = buildContentIndex([draft], { includeDrafts: true });

    expect(index.entries).toEqual([draft]);
  });

  it("rejects duplicate localized routes", async () => {
    const first = await createParsedContent({
      contentId: "patch-first",
      slug: "shared-route",
    });
    const second = await createParsedContent({
      contentId: "patch-second",
      slug: "shared-route",
    });

    expect(() => buildContentIndex([first, second])).toThrowError(
      ContentIndexError,
    );
    try {
      buildContentIndex([first, second]);
    } catch (error) {
      expect(error).toMatchObject({
        issues: expect.arrayContaining([
          expect.objectContaining({ code: "duplicate-route" }),
        ]),
      });
    }
  });

  it("rejects duplicate contentId values within one locale", async () => {
    const first = await createParsedContent({
      contentId: "patch-shared-id",
      slug: "first-slug",
    });
    const second = await createParsedContent({
      contentId: "patch-shared-id",
      slug: "second-slug",
    });

    try {
      buildContentIndex([first, second]);
      throw new Error("expected duplicate contentId validation to fail");
    } catch (error) {
      expect(error).toMatchObject({
        issues: expect.arrayContaining([
          expect.objectContaining({ code: "duplicate-content-locale" }),
        ]),
      });
    }
  });

  it("maps translations by shared contentId", async () => {
    const english = await createParsedContent({
      contentId: "patch-translated",
      locale: "en",
      slug: "shared-slug",
    });
    const chinese = await createParsedContent({
      contentId: "patch-translated",
      locale: "zh-cn",
      slug: "shared-slug",
    });
    const index = buildContentIndex([english, chinese]);

    expect(getContentTranslation(index, english, "zh-cn")).toBe(chinese);
    expect(getContentTranslation(index, chinese, "en")).toBe(english);
  });

  it("rejects translations with different slugs or content types", async () => {
    const english = await createParsedContent({
      contentId: "content-mismatch",
      locale: "en",
      slug: "english-slug",
    });
    const chinese = await createParsedContent({
      contentId: "content-mismatch",
      contentType: "guide",
      locale: "zh-cn",
      slug: "chinese-slug",
    });

    try {
      buildContentIndex([english, chinese]);
      throw new Error("expected translation validation to fail");
    } catch (error) {
      expect(error).toMatchObject({
        issues: expect.arrayContaining([
          expect.objectContaining({ code: "translation-slug-mismatch" }),
          expect.objectContaining({ code: "translation-type-mismatch" }),
        ]),
      });
    }
  });

  it("resolves related content in declared order and the same locale", async () => {
    const firstTarget = await createParsedContent({
      contentId: "patch-related-first",
    });
    const secondTarget = await createParsedContent({
      contentId: "patch-related-second",
    });
    const source = await createParsedContent({
      contentId: "patch-source",
      relatedContentIds: ["patch-related-second", "patch-related-first"],
    });
    const index = buildContentIndex([firstTarget, secondTarget, source]);

    expect(resolveRelatedContent(index, source)).toEqual([
      secondTarget,
      firstTarget,
    ]);
  });

  it("rejects published relations that only point to a draft", async () => {
    const draftTarget = await createParsedContent({
      contentId: "patch-draft-target",
      published: false,
    });
    const source = await createParsedContent({
      contentId: "patch-source",
      relatedContentIds: ["patch-draft-target"],
    });

    try {
      buildContentIndex([draftTarget, source]);
      throw new Error("expected related content validation to fail");
    } catch (error) {
      expect(error).toMatchObject({
        issues: expect.arrayContaining([
          expect.objectContaining({ code: "missing-related-content" }),
        ]),
      });
    }
  });

  it.each<[ContentType, string]>([
    ["build", "builds"],
    ["boss", "bosses"],
    ["item", "items"],
    ["skill", "skills"],
    ["guide", "guides"],
    ["patch", "patches"],
  ])("maps %s to its stable URL segment", (contentType, segment) => {
    expect(contentRoutePath("zh-cn", contentType, "stable-slug")).toBe(
      `/zh-cn/${segment}/stable-slug/`,
    );
  });

  it("discovers only Markdown and MDX files in stable order", async () => {
    const temporaryRoot = await mkdtemp(
      path.join(tmpdir(), "exile2-content-index-"),
    );
    const nestedDirectory = path.join(temporaryRoot, "nested");

    try {
      await mkdir(nestedDirectory);
      await Promise.all([
        writeFile(path.join(temporaryRoot, "b.mdx"), ""),
        writeFile(path.join(nestedDirectory, "a.md"), ""),
        writeFile(path.join(temporaryRoot, "ignored.txt"), ""),
      ]);

      expect(await discoverContentFiles(temporaryRoot)).toEqual([
        path.join(temporaryRoot, "b.mdx"),
        path.join(nestedDirectory, "a.md"),
      ]);
    } finally {
      await rm(temporaryRoot, { force: true, recursive: true });
    }
  });
});

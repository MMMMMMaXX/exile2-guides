/** 文件职责：覆盖内容 Schema、发布门禁和 Markdown/MDX 解析的关键不变量。 */
import { describe, expect, it } from "vitest";

import {
  ContentParseError,
  parseContentSource,
  publishedContentOnly,
} from "../../lib/content";

const commonDraftFrontMatter = `
locale: en
slug: schema-example
title: Schema Example
seoTitle: Schema Example for Path of Exile 2
seoDescription: A complete description used to validate the content contract.
summary: A concise summary for the content card.
patch: "0.1"
patchStatus: current
author: Exile2 Guides Editorial Team
updatedAt: 2026-07-26
`;

/** 生成最小内容源，集中维护测试 Front Matter，避免用例之间字段规则漂移。 */
function createSource(
  contentType: string,
  typeFields: string,
  overrides = "",
  body = "# Verified heading\n\nThis body contains useful verified guidance.",
) {
  return `---
contentId: ${contentType}-schema-example
contentType: ${contentType}
${commonDraftFrontMatter}
${typeFields}
${overrides}
---

${body}
`;
}

const buildFields = `
className: Ranger
ascendancy: ""
primarySkill: Lightning Arrow
playstyle: [ranged, fast-clear]
difficulty: beginner
budget: medium
damageTypes: [lightning]
bestFor: [mapping, beginners]
`;

const publishedFields = `
status: published
draft: false
publishedAt: 2026-07-26
verifiedAt: 2026-07-26
verifiedClientVersion: 0.5.4d
reviewer: Assigned fact reviewer
sources:
  - label: Official patch notes
    url: https://www.pathofexile.com/
    sourceType: official
`;

// 六类内容、失败关闭默认值和生产占位符是 TASK-003 的核心回归边界。
describe("content schema", () => {
  it("parses a verified published build and normalizes YAML dates", async () => {
    const parsed = await parseContentSource(
      createSource("build", buildFields, publishedFields),
      "content/en/builds/schema-example.mdx",
    );

    expect(parsed.frontMatter.status).toBe("published");
    expect(parsed.frontMatter.updatedAt).toBe("2026-07-26");
    expect(publishedContentOnly([parsed.frontMatter])).toHaveLength(1);
  });

  it("defaults omitted publication flags to draft and excludes the content", async () => {
    const parsed = await parseContentSource(
      createSource("build", buildFields),
      "content/en/builds/schema-example.md",
    );

    expect(parsed.frontMatter).toMatchObject({
      draft: true,
      status: "draft",
    });
    expect(publishedContentOnly([parsed.frontMatter])).toEqual([]);
  });

  it.each([
    ["build", buildFields],
    [
      "boss",
      `
location: Flooded Depths
campaignStage: act-2
recommendedLevel: 20
difficulty: high
damageTypes: [cold]
phases: 2
`,
    ],
    [
      "item",
      `
itemType: unique-bow
rarity: unique
requiredLevel: 20
useCases: [ranged-builds]
`,
    ],
    [
      "skill",
      `
skillType: active
requiredLevel: 1
tags: [projectile, lightning]
`,
    ],
    [
      "guide",
      `
guideCategory: beginner
estimatedReadingMinutes: 12
prerequisites: []
`,
    ],
    ["patch", ""],
  ])("accepts a valid %s draft", async (contentType, typeFields) => {
    const parsed = await parseContentSource(
      createSource(contentType, typeFields),
      `content/en/${contentType}/schema-example.md`,
    );

    expect(parsed.frontMatter.contentType).toBe(contentType);
    expect(parsed.frontMatter.status).toBe("draft");
  });

  it("rejects published Front Matter containing placeholders", async () => {
    const source = createSource("build", buildFields, publishedFields).replace(
      'patch: "0.1"',
      'patch: "REPLACE_WITH_PATCH"',
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.md"),
    ).rejects.toMatchObject({
      issues: expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-front-matter",
          path: ["patch"],
        }),
      ]),
    });
  });

  it("rejects published content without verification", async () => {
    const source = createSource(
      "build",
      buildFields,
      `
status: published
draft: false
publishedAt: 2026-07-26
sources:
  - label: Official source
    url: https://www.pathofexile.com/
    sourceType: official
`,
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.md"),
    ).rejects.toMatchObject({
      issues: expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-front-matter",
          path: ["verifiedAt"],
        }),
      ]),
    });
  });

  it("allows draft-only unknown fields to be null or empty arrays", async () => {
    const parsed = await parseContentSource(
      createSource(
        "boss",
        `
location: null
campaignStage: null
recommendedLevel: null
difficulty: null
damageTypes: []
phases: null
`,
      ),
      "content/en/bosses/schema-example.md",
    );

    expect(parsed.frontMatter).toMatchObject({
      damageTypes: [],
      difficulty: null,
      phases: null,
    });
  });

  it.each([
    ["reviewer: Assigned fact reviewer", 'reviewer: ""', "reviewer"],
    ["verifiedAt: 2026-07-26", "verifiedAt: null", "verifiedAt"],
    ["title: Schema Example", 'title: "Draft: Schema Example"', "title"],
    ["sources:", "tags: [template]\nsources:", "tags"],
    ["className: Ranger", "className: Unassigned", "className"],
  ])(
    "rejects published content with forbidden release state %s",
    async (searchValue, replacementValue, path) => {
      const replacement = createSource(
        "build",
        buildFields,
        publishedFields,
      ).replace(searchValue, replacementValue);

      await expect(
        parseContentSource(replacement, "content/en/builds/schema-example.md"),
      ).rejects.toMatchObject({
        issues: expect.arrayContaining([
          expect.objectContaining({
            code: "invalid-front-matter",
            path: [path],
          }),
        ]),
      });
    },
  );

  it("rejects Draft in a published pending-pc title", async () => {
    const pendingPcFields = publishedFields
      .replace("verifiedAt: 2026-07-26\n", "")
      .concat("verificationStatus: pending-pc\n");
    const source = createSource("build", buildFields, pendingPcFields).replace(
      "title: Schema Example",
      'title: "Draft: Schema Example"',
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.md"),
    ).rejects.toMatchObject({
      issues: expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-front-matter",
          path: ["title"],
        }),
      ]),
    });
  });

  it("rejects a published body that still marks PC verification as pending", async () => {
    await expect(
      parseContentSource(
        createSource(
          "build",
          buildFields,
          publishedFields,
          "# Guide\n\nPC verification is pending.",
        ),
        "content/en/builds/schema-example.md",
      ),
    ).rejects.toMatchObject({
      issues: expect.arrayContaining([
        expect.objectContaining({ code: "published-unverified-body" }),
      ]),
    });
  });

  it("rejects an image without alt text", async () => {
    const source = createSource(
      "build",
      `${buildFields}\nimage: /images/builds/schema-example.webp`,
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.md"),
    ).rejects.toBeInstanceOf(ContentParseError);
  });

  it("rejects non-WebP and non-AVIF content images", async () => {
    const source = createSource(
      "build",
      `${buildFields}
image: /images/builds/schema-example.jpg
imageAlt: Original build illustration`,
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.md"),
    ).rejects.toMatchObject({
      issues: expect.arrayContaining([
        expect.objectContaining({
          code: "invalid-front-matter",
          path: ["image"],
        }),
      ]),
    });
  });

  it("rejects placeholders in a published body", async () => {
    const source = createSource(
      "build",
      buildFields,
      publishedFields,
      "# Guide\n\nTODO: replace this paragraph.",
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.md"),
    ).rejects.toMatchObject({
      issues: [
        expect.objectContaining({
          code: "published-placeholder",
        }),
      ],
    });
  });

  it("rejects invalid MDX syntax without evaluating it", async () => {
    const source = createSource(
      "build",
      buildFields,
      "",
      "# Guide\n\n<Callout",
    );

    await expect(
      parseContentSource(source, "content/en/builds/schema-example.mdx"),
    ).rejects.toMatchObject({
      issues: [
        expect.objectContaining({
          code: "invalid-markdown",
        }),
      ],
    });
  });
});

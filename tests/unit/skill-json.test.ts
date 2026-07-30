/** 文件职责：验证 Skill JSON Schema、发布门禁和跨文件冲突检测。 */
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { skillArticleSchema } from "../../lib/skills/schema";
import {
  SkillJsonError,
  loadSkillArticles,
} from "../../lib/skills/json-repository.server";
import { skillArticleToParsedContent } from "../../lib/skills/content-adapter";
import {
  filterSkills,
  parseSkillQuery,
  sortSkills,
} from "../../lib/skills/service";
import type { SkillArticle } from "../../lib/skills/schema";

/** 创建满足最小发布门禁的 Skill 草稿，供各用例按需覆盖字段。 */
function createSkillArticle(
  overrides: Partial<SkillArticle> = {},
): SkillArticle {
  return skillArticleSchema.parse({
    author: "Editorial Team",
    createdAt: "2026-07-27",
    description: "A test skill article.",
    id: "skill-test-article",
    league: "Standard",
    locale: "en",
    patch: "0.5.4",
    patchStatus: "current",
    sections: [
      {
        bullets: [],
        id: "overview",
        order: 1,
        paragraphs: ["Test overview paragraph."],
        title: "Overview",
        toc: true,
        type: "overview",
        visible: true,
      },
    ],
    seo: {
      description: "Test skill SEO description.",
      title: "Test Skill | Exile2 Guides",
    },
    shortTitle: "Test Skill",
    slug: "test-skill",
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    status: "draft",
    summary: "A test skill summary.",
    tags: ["test"],
    title: "Test Skill Article",
    type: "skill",
    updatedAt: "2026-07-27",
    ...overrides,
  });
}

describe("skillArticleSchema", () => {
  it("接受最小草稿 Skill", () => {
    const article = createSkillArticle();
    expect(article.id).toBe("skill-test-article");
    expect(article.skillType).toBeNull();
    expect(article.skillCategory).toBeNull();
  });

  it("拒绝保留 slug", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      sections: [],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      slug: "categories",
      sources: [],
      status: "draft",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
    });
    expect(result.success).toBe(false);
  });

  it("拒绝重复 section id", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      sections: [
        {
          bullets: [],
          id: "overview",
          order: 1,
          paragraphs: ["First."],
          title: "Overview",
          toc: true,
          type: "overview",
          visible: true,
        },
        {
          bullets: [],
          id: "overview",
          order: 2,
          paragraphs: ["Duplicate."],
          title: "Duplicate",
          toc: true,
          type: "mechanics",
          visible: true,
        },
      ],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      slug: "test-skill",
      sources: [],
      status: "draft",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
    });
    expect(result.success).toBe(false);
  });

  it("拒绝重复 section order", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      sections: [
        {
          bullets: [],
          id: "overview",
          order: 1,
          paragraphs: ["First."],
          title: "Overview",
          toc: true,
          type: "overview",
          visible: true,
        },
        {
          bullets: [],
          id: "mechanics",
          order: 1,
          paragraphs: ["Duplicate order."],
          title: "Mechanics",
          toc: true,
          type: "mechanics",
          visible: true,
        },
      ],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      slug: "test-skill",
      sources: [],
      status: "draft",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
    });
    expect(result.success).toBe(false);
  });

  it("已发布 Skill 必须有 sections 和 sources", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      publishedAt: "2026-07-27",
      reviewer: "Reviewer",
      sections: [],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      slug: "test-skill",
      sources: [],
      status: "published",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
    });
    expect(result.success).toBe(false);
  });

  it("已发布 Skill 必须有 reviewer 和 publishedAt", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      sections: [
        {
          bullets: [],
          id: "overview",
          order: 1,
          paragraphs: ["Test."],
          title: "Overview",
          toc: true,
          type: "overview",
          visible: true,
        },
      ],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      slug: "test-skill",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
    });
    expect(result.success).toBe(false);
  });

  it("verified Skill 必须有 verifiedClientVersion", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      publishedAt: "2026-07-27",
      reviewer: "Reviewer",
      sections: [
        {
          bullets: [],
          id: "overview",
          order: 1,
          paragraphs: ["Test."],
          title: "Overview",
          toc: true,
          type: "overview",
          visible: true,
        },
      ],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      skillCategory: "active",
      skillType: "active",
      slug: "test-skill",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
      verificationStatus: "verified",
    });
    expect(result.success).toBe(false);
  });

  it("verified Skill 必须有完整技能事实", () => {
    const result = skillArticleSchema.safeParse({
      author: "Editorial Team",
      createdAt: "2026-07-27",
      description: "A test skill article.",
      id: "skill-test-article",
      league: "Standard",
      locale: "en",
      patch: "0.5.4",
      patchStatus: "current",
      publishedAt: "2026-07-27",
      reviewer: "Reviewer",
      sections: [
        {
          bullets: [],
          id: "overview",
          order: 1,
          paragraphs: ["Test."],
          title: "Overview",
          toc: true,
          type: "overview",
          visible: true,
        },
      ],
      seo: {
        description: "Test skill SEO description.",
        title: "Test Skill | Exile2 Guides",
      },
      shortTitle: "Test Skill",
      slug: "test-skill",
      sources: [
        {
          label: "Official source",
          sourceType: "official",
          url: "https://www.pathofexile.com/",
        },
      ],
      status: "published",
      summary: "A test skill summary.",
      tags: ["test"],
      title: "Test Skill Article",
      type: "skill",
      updatedAt: "2026-07-27",
      verificationStatus: "verified",
      verifiedClientVersion: "0.5.4",
    });
    expect(result.success).toBe(false);
  });

  it("接受完整已发布 Skill", () => {
    const article = createSkillArticle({
      publishedAt: "2026-07-27",
      reviewer: "Reviewer",
      skillCategory: "active",
      skillType: "active",
      status: "published",
      verificationStatus: "verified",
      verifiedClientVersion: "0.5.4",
    });
    expect(article.status).toBe("published");
    expect(article.skillType).toBe("active");
  });
});

describe("loadSkillArticles", () => {
  it("从临时目录加载有效 Skill JSON", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "skill-json-"));
    const skillsDir = path.join(dir, "en", "skills");
    await mkdir(skillsDir, { recursive: true });
    await writeFile(
      path.join(skillsDir, "test-skill.json"),
      JSON.stringify(createSkillArticle()),
    );
    const articles = await loadSkillArticles(dir, dir);
    expect(articles).toHaveLength(1);
    expect(articles[0]?.slug).toBe("test-skill");
  });

  it("报告文件名与 slug 不匹配", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "skill-json-"));
    const skillsDir = path.join(dir, "en", "skills");
    await mkdir(skillsDir, { recursive: true });
    await writeFile(
      path.join(skillsDir, "wrong-name.json"),
      JSON.stringify(createSkillArticle()),
    );
    await expect(loadSkillArticles(dir, dir)).rejects.toThrow(SkillJsonError);
  });

  it("报告重复 id:locale", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "skill-json-"));
    const skillsDir = path.join(dir, "en", "skills");
    await mkdir(skillsDir, { recursive: true });
    await writeFile(
      path.join(skillsDir, "test-skill.json"),
      JSON.stringify(createSkillArticle()),
    );
    await writeFile(
      path.join(skillsDir, "test-skill-copy.json"),
      JSON.stringify(createSkillArticle({ slug: "test-skill-copy" })),
    );
    await expect(loadSkillArticles(dir, dir)).rejects.toThrow(SkillJsonError);
  });
});

describe("skillArticleToParsedContent", () => {
  it("投影到通用内容索引", () => {
    const article = createSkillArticle();
    const parsed = skillArticleToParsedContent(article);
    expect(parsed.frontMatter.contentType).toBe("skill");
    expect(parsed.frontMatter.contentId).toBe("skill-test-article");
    expect(parsed.skillArticle).toBe(article);
  });
});

describe("skill service helpers", () => {
  it("filterSkills 按 category 和 skillType 筛选", () => {
    const articles = [
      createSkillArticle({
        id: "skill-a",
        skillCategory: "active",
        skillType: "active",
        slug: "skill-a",
      }),
      createSkillArticle({
        id: "skill-b",
        skillCategory: "support",
        skillType: "support",
        slug: "skill-b",
      }),
    ];
    expect(filterSkills(articles, { category: "active" })).toHaveLength(1);
    expect(filterSkills(articles, { skillType: "support" })).toHaveLength(1);
    expect(filterSkills(articles, {})).toHaveLength(2);
  });

  it("parseSkillQuery 忽略未知枚举值", () => {
    const params = new URLSearchParams("skillType=unknown&sort=title");
    const { filters, sort } = parseSkillQuery(params);
    expect(filters.skillType).toBeUndefined();
    expect(sort).toBe("title");
  });

  it("sortSkills 按 updatedAt 降序", () => {
    const articles = [
      createSkillArticle({ id: "skill-old", slug: "old", updatedAt: "2026-01-01" }),
      createSkillArticle({ id: "skill-new", slug: "new", updatedAt: "2026-07-01" }),
    ];
    const sorted = sortSkills(articles, "updated");
    expect(sorted[0]?.id).toBe("skill-new");
  });
});

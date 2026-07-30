/** 文件职责：验证 Builds 结构化章节按文章语言渲染共享标签，避免中文正文混入英文界面词。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  BuildMediaNotice,
  BuildSectionRenderer,
} from "../../components/builds/build-section-renderer";
import { buildArticleSchema, type BuildArticle } from "../../lib/builds/schema";

afterEach(cleanup);

/** 创建仅覆盖 Renderer 本地化边界的最小草稿，避免测试依赖磁盘内容文件。 */
function createArticle(locale: "en" | "zh-cn"): BuildArticle {
  return buildArticleSchema.parse({
    id: "renderer-label-test",
    slug: "renderer-label-test",
    locale,
    type: "build",
    status: "draft",
    featured: false,
    title: "Renderer label test",
    shortTitle: "Renderer test",
    summary: "A minimal renderer localization fixture.",
    description: "A minimal renderer localization fixture.",
    classId: "monk",
    ascendancyId: "martial-artist",
    mainSkillIds: ["whirling-assault"],
    secondarySkillIds: [],
    stages: ["starter"],
    budgets: ["low"],
    difficulty: "intermediate",
    playstyleTags: ["melee"],
    damageTypes: ["physical"],
    bestFor: ["testing"],
    patch: "test",
    league: "test",
    patchStatus: "under-review",
    verificationStatus: "pending-pc",
    author: "Test author",
    reviewer: "",
    createdAt: "2026-07-29",
    updatedAt: "2026-07-29",
    tags: ["test"],
    sections: [
      {
        id: "pros-cons",
        type: "pros-cons",
        title: "Pros and cons",
        order: 10,
        visible: true,
        pros: ["Fast"],
        cons: ["Unverified"],
      },
      {
        id: "skills",
        type: "skills",
        title: "Skills",
        order: 20,
        visible: true,
        groups: [
          {
            label: "Core",
            skills: [
              {
                skillId: "whirling-assault",
                role: "Primary",
                supportSkillIds: ["test-support"],
                notes: [],
              },
            ],
          },
        ],
      },
      {
        id: "comparison",
        type: "comparison-table",
        title: "Comparison",
        order: 30,
        visible: true,
        caption: "A controlled comparison.",
        columns: ["Starter", "Endgame"],
        rows: [
          {
            label: "Priority",
            cells: ["Defence", "Damage"],
          },
        ],
      },
      {
        id: "community",
        type: "community-voices",
        title: "Community",
        order: 40,
        visible: true,
        note: "Attributed source context.",
        entries: [
          {
            context: "The claim still needs verification.",
            label: "Discussion",
            representation: "paraphrase",
            sourceType: "reddit",
            statement: "Players compare two transition routes.",
            url: "https://www.reddit.com/r/pathofexile2builds/",
          },
        ],
      },
      {
        id: "answers",
        type: "question-answer",
        title: "Answers",
        order: 50,
        visible: true,
        items: [
          {
            question: "What should I check first?",
            answer: ["Check the current stage."],
            bullets: ["Verify the active weapon set."],
            relatedLinks: [
              {
                href: "/en/builds/related-build/",
                label: "Related build",
              },
            ],
          },
        ],
      },
      {
        id: "figure",
        type: "figure",
        title: "Mechanic diagram",
        order: 55,
        visible: true,
        toc: false,
        image: {
          src: "/images/prototype-v4/hero-build.webp",
          alt: "A controlled mechanic diagram",
          caption: "The image explains the controlled sequence.",
          credit: "Test editorial team",
          sourceKind: "generated",
        },
      },
      {
        id: "video",
        type: "video",
        title: "Video",
        order: 60,
        visible: true,
        entries: [
          {
            creator: "Test creator",
            description: "A gameplay reference.",
            label: "Test gameplay",
            takeaway: "Watch the setup order.",
            url: "https://youtu.be/CuDrHBZP2R8",
          },
        ],
      },
    ],
    relatedBuildIds: [],
    relatedGuideIds: [],
    sources: [],
    seo: {
      title: "Renderer label test",
      description: "A minimal renderer localization fixture.",
      noindex: true,
    },
  });
}

describe("BuildSectionRenderer", () => {
  it("renders Chinese labels for Chinese Build JSON", () => {
    render(<BuildSectionRenderer article={createArticle("zh-cn")} />);

    expect(screen.getByRole("heading", { name: "优点" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "缺点" })).toBeTruthy();
    expect(screen.getByText(/辅助技能: test-support/)).toBeTruthy();
  });

  it("keeps English labels for English Build JSON", () => {
    const view = render(<BuildSectionRenderer article={createArticle("en")} />);

    expect(view.getByRole("heading", { name: "Pros" })).toBeTruthy();
    expect(view.getByRole("heading", { name: "Cons" })).toBeTruthy();
    expect(view.getByText(/Supports: test-support/)).toBeTruthy();
    expect(view.getByText("A controlled comparison.")).toBeTruthy();
    expect(view.getByText(/Editorial paraphrase/)).toBeTruthy();
    expect(
      view.getByRole("link", { name: /Related build/ }).getAttribute("href"),
    ).toBe("/en/builds/related-build/");
    expect(view.getByAltText("A controlled mechanic diagram")).toBeTruthy();
    expect(
      view
        .getByRole("link", {
          name: /Open the original video: Test gameplay/,
        })
        .getAttribute("href"),
    ).toBe("https://youtu.be/CuDrHBZP2R8");
    expect(view.queryByTitle("Test gameplay")).toBeNull();
  });

  it("renders the localized external-media notice after Build content", () => {
    const view = render(<BuildMediaNotice locale="zh-cn" />);

    expect(view.getByText(/信息整理自公开网络资料/)).toBeTruthy();
    expect(view.getByText(/如有侵权，请联系我们删除/)).toBeTruthy();
  });
});

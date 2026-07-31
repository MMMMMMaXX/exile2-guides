/** 文件职责：验证 Guides 结构化章节按文章语言渲染共享标签，避免中文正文混入英文界面词。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  GuideMediaNotice,
  GuideSectionRenderer,
} from "../../components/guides/guide-section-renderer";
import { guideArticleSchema, type GuideArticle } from "../../lib/guides/schema";

afterEach(cleanup);

/** 创建仅覆盖 Renderer 本地化边界的最小草稿，避免测试依赖磁盘内容文件。 */
function createArticle(locale: "en" | "zh-cn"): GuideArticle {
  return guideArticleSchema.parse({
    id: "renderer-label-test",
    slug: "renderer-label-test",
    locale,
    type: "guide",
    status: "draft",
    featured: false,
    title: "Renderer label test",
    shortTitle: "Renderer test",
    summary: "A minimal renderer localization fixture.",
    description: "A minimal renderer localization fixture.",
    guideCategory: "mechanics",
    estimatedReadingMinutes: 5,
    prerequisites: [],
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
        id: "overview",
        type: "overview",
        title: "Overview",
        order: 1,
        visible: true,
        toc: true,
        paragraphs: ["This is the overview paragraph."],
        bullets: ["First bullet point."],
      },
      {
        id: "steps",
        type: "progression-steps",
        title: "Progression",
        order: 2,
        visible: true,
        toc: true,
        steps: [
          {
            label: "Step one",
            body: ["Complete the first task."],
          },
        ],
      },
      {
        id: "faq",
        type: "faq",
        title: "FAQ",
        order: 3,
        visible: true,
        toc: true,
        items: [
          {
            question: "What is this?",
            answer: ["A test fixture."],
          },
        ],
      },
      {
        id: "video",
        type: "video",
        title: "Video",
        order: 4,
        visible: true,
        toc: true,
        entries: [
          {
            label: "Test gameplay",
            url: "https://youtu.be/CuDrHBZP2R8",
            takeaway: "Watch the setup order.",
          },
        ],
      },
      {
        id: "hidden",
        type: "common-mistakes",
        title: "Hidden section",
        order: 5,
        visible: false,
        toc: true,
        paragraphs: ["Should not appear."],
        bullets: [],
      },
    ],
    relatedBuildIds: [],
    relatedBossIds: [],
    relatedItemIds: [],
    relatedPatchIds: [],
    relatedSkillIds: [],
    sources: [],
    seo: {
      title: "Renderer label test",
      description: "A minimal renderer localization fixture.",
      noindex: true,
    },
  });
}

describe("GuideSectionRenderer", () => {
  it("renders narrative sections with paragraphs and bullets", () => {
    render(<GuideSectionRenderer article={createArticle("en")} />);

    expect(screen.getByText("This is the overview paragraph.")).toBeTruthy();
    expect(screen.getByText("First bullet point.")).toBeTruthy();
  });

  it("renders step sections as ordered lists", () => {
    const { container } = render(
      <GuideSectionRenderer article={createArticle("en")} />,
    );

    const stepsList = container.querySelector(".guide-steps--progression-steps");
    expect(stepsList).toBeTruthy();
    expect(stepsList!.textContent).toContain("Step one");
    expect(stepsList!.textContent).toContain("Complete the first task.");
  });

  it("renders FAQ sections", () => {
    render(<GuideSectionRenderer article={createArticle("en")} />);

    expect(screen.getByText("What is this?")).toBeTruthy();
    expect(screen.getByText("A test fixture.")).toBeTruthy();
  });

  it("renders video sections with localized labels", () => {
    const view = render(<GuideSectionRenderer article={createArticle("en")} />);

    expect(
      view.getByRole("button", {
        name: /Open the original video: Test gameplay/,
      }),
    ).toBeTruthy();
  });

  it("renders Chinese video labels for zh-cn articles", () => {
    const view = render(
      <GuideSectionRenderer article={createArticle("zh-cn")} />,
    );

    expect(
      view.getByRole("button", {
        name: /打开原始视频: Test gameplay/,
      }),
    ).toBeTruthy();
  });

  it("hides sections marked as not visible", () => {
    render(<GuideSectionRenderer article={createArticle("en")} />);

    expect(screen.queryByText("Should not appear.")).toBeNull();
    expect(screen.queryByText("Hidden section")).toBeNull();
  });

  it("numbers only toc-visible major sections", () => {
    const { container } = render(
      <GuideSectionRenderer article={createArticle("en")} />,
    );

    const numbers = container.querySelectorAll(".guide-section__number");
    expect(numbers.length).toBe(4);
    expect(numbers[0]!.textContent).toBe("1");
    expect(numbers[3]!.textContent).toBe("4");
  });

  it("renders the localized external-media notice", () => {
    const zhView = render(<GuideMediaNotice locale="zh-cn" />);
    expect(zhView.getByText(/信息整理自公开网络资料/)).toBeTruthy();

    cleanup();
    const enView = render(<GuideMediaNotice locale="en" />);
    expect(enView.getByText(/compiled from public web sources/)).toBeTruthy();
  });
});

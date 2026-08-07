/** 文件职责：验证 Patches 结构化章节按文章语言渲染共享标签，避免中文正文混入英文界面词。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  PatchMediaNotice,
  PatchSectionRenderer,
} from "../../components/patches/patch-section-renderer";
import {
  patchArticleSchema,
  type PatchArticle,
} from "../../lib/patches/schema";

afterEach(cleanup);

/** 创建仅覆盖 Renderer 本地化边界的最小草稿，避免测试依赖磁盘内容文件。 */
function createArticle(locale: "en" | "zh-cn"): PatchArticle {
  return patchArticleSchema.parse({
    id: "renderer-label-test",
    slug: "renderer-label-test",
    locale,
    type: "patch",
    status: "draft",
    featured: false,
    title: "Renderer label test",
    shortTitle: "Renderer test",
    summary: "A minimal renderer localization fixture.",
    description: "A minimal renderer localization fixture.",
    patchVersion: "0.5.4",
    patch: "Path of Exile 2 Early Access 0.5.4",
    league: "Standard",
    patchStatus: "current",
    author: "Editorial Team",
    createdAt: "2026-07-27",
    updatedAt: "2026-07-27",
    tags: [],
    sections: [
      {
        id: "overview",
        order: 1,
        title: locale === "zh-cn" ? "补丁概览" : "Patch overview",
        toc: true,
        visible: true,
        type: "overview",
        paragraphs: [
          locale === "zh-cn"
            ? "已确认的范围说明。"
            : "Confirmed scope statement.",
        ],
        bullets: [],
      },
      {
        id: "changes",
        order: 2,
        title: locale === "zh-cn" ? "重要改动" : "Important changes",
        toc: true,
        visible: true,
        type: "important-changes",
        paragraphs: [],
        bullets: [
          locale === "zh-cn" ? "第一项已确认改动。" : "First confirmed change.",
        ],
      },
      {
        id: "steps",
        order: 3,
        title: locale === "zh-cn" ? "核验步骤" : "Verification steps",
        toc: true,
        visible: true,
        type: "verification-steps",
        steps: [
          {
            label: locale === "zh-cn" ? "步骤一" : "Step one",
            body: [
              locale === "zh-cn"
                ? "打开客户端确认。"
                : "Open the client to confirm.",
            ],
          },
        ],
      },
      {
        id: "video",
        order: 4,
        title: locale === "zh-cn" ? "视频参考" : "Video references",
        toc: true,
        visible: true,
        type: "video",
        entries: [
          {
            label: "Test video",
            url: "https://www.youtube.com/watch?v=test",
          },
        ],
      },
      {
        id: "hidden",
        order: 5,
        title: "Hidden section",
        toc: false,
        visible: false,
        type: "overview",
        paragraphs: ["Should not render."],
        bullets: [],
      },
    ],
    sources: [],
    seo: { title: "Renderer test", description: "Renderer test" },
  });
}

describe("PatchSectionRenderer", () => {
  it("renders narrative sections with paragraphs and bullets", () => {
    render(<PatchSectionRenderer article={createArticle("en")} />);
    expect(screen.getByText("Confirmed scope statement.")).toBeTruthy();
    expect(screen.getByText("First confirmed change.")).toBeTruthy();
  });

  it("renders step sections as ordered lists", () => {
    const { container } = render(
      <PatchSectionRenderer article={createArticle("en")} />,
    );
    const stepsList = container.querySelector(
      ".patch-steps--verification-steps",
    );
    expect(stepsList).toBeTruthy();
    expect(stepsList!.textContent).toContain("Step one");
  });

  it("hides sections marked visible=false", () => {
    render(<PatchSectionRenderer article={createArticle("en")} />);
    expect(screen.queryByText("Should not render.")).toBeNull();
  });

  it("renders Chinese labels for zh-cn articles", () => {
    render(<PatchSectionRenderer article={createArticle("zh-cn")} />);
    expect(screen.getByText("已确认的范围说明。")).toBeTruthy();
    expect(screen.getByText("第一项已确认改动。")).toBeTruthy();
  });

  it("renders video section with localized labels", () => {
    const { container } = render(
      <PatchSectionRenderer article={createArticle("zh-cn")} />,
    );
    expect(container.textContent).toContain("查看来源");
  });

  it("numbers only toc-visible major sections", () => {
    const { container } = render(
      <PatchSectionRenderer article={createArticle("en")} />,
    );

    const numbers = container.querySelectorAll(".patch-section__number");
    expect(numbers.length).toBe(4);
    expect(numbers[0]!.textContent).toBe("1");
    expect(numbers[3]!.textContent).toBe("4");
  });

  it("renders the localized external-media notice", () => {
    const zhView = render(<PatchMediaNotice locale="zh-cn" />);
    expect(zhView.getByText(/信息整理自公开网络资料/)).toBeTruthy();

    cleanup();
    const enView = render(<PatchMediaNotice locale="en" />);
    expect(enView.getByText(/compiled from public web sources/)).toBeTruthy();
  });
});

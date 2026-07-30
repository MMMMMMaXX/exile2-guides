/** 文件职责：验证 Item Section Renderer 的章节渲染、排序和隐藏跳过逻辑。 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ItemMediaNotice,
  ItemSectionRenderer,
} from "../../components/items/item-section-renderer";
import { itemArticleSchema, type ItemArticle } from "../../lib/items/schema";

/** 创建包含多种章节类型的测试文章，验证渲染器穷举处理。 */
function createItemArticle(sections: ItemArticle["sections"]): ItemArticle {
  return itemArticleSchema.parse({
    id: "test-item",
    slug: "test-item",
    locale: "en",
    type: "item",
    status: "published",
    featured: false,
    title: "Test Item",
    shortTitle: "Test",
    summary: "Test summary.",
    description: "Test description.",
    patch: "test",
    league: "test",
    patchStatus: "current",
    verificationStatus: "pending-pc",
    author: "Test author",
    reviewer: "Test reviewer",
    createdAt: "2026-07-30",
    publishedAt: "2026-07-30",
    updatedAt: "2026-07-30",
    tags: [],
    sections,
    relatedBuildIds: [],
    relatedBossIds: [],
    relatedGuideIds: [],
    relatedPatchIds: [],
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    seo: { title: "Test Item", description: "Test description." },
  });
}

describe("ItemSectionRenderer", () => {
  it("renders sections sorted by order and skips hidden ones", () => {
    const article = createItemArticle([
      {
        id: "second",
        type: "overview",
        title: "Second Section",
        order: 20,
        toc: true,
        visible: true,
        paragraphs: ["Second content."],
        bullets: [],
      },
      {
        id: "hidden",
        type: "overview",
        title: "Hidden Section",
        order: 15,
        toc: true,
        visible: false,
        paragraphs: ["Should not appear."],
        bullets: [],
      },
      {
        id: "first",
        type: "overview",
        title: "First Section",
        order: 10,
        toc: true,
        visible: true,
        paragraphs: ["First content."],
        bullets: [],
      },
    ]);

    const { container, queryByText } = render(
      <ItemSectionRenderer article={article} />,
    );

    expect(queryByText("Hidden Section")).toBeNull();
    expect(queryByText("First Section")).not.toBeNull();
    expect(queryByText("Second Section")).not.toBeNull();

    const sections = container.querySelectorAll("section");
    expect(sections).toHaveLength(2);
    expect(sections[0]?.id).toBe("first");
    expect(sections[1]?.id).toBe("second");
  });

  it("renders properties section as a definition list", () => {
    const article = createItemArticle([
      {
        id: "properties",
        type: "properties",
        title: "Item Properties",
        order: 10,
        toc: true,
        visible: true,
        properties: [
          {
            label: "Stack Size",
            value: "10",
            notes: ["Maximum stack is 10."],
          },
        ],
      },
    ]);

    const { queryByText } = render(<ItemSectionRenderer article={article} />);

    expect(queryByText("Item Properties")).not.toBeNull();
    expect(queryByText("Stack Size")).not.toBeNull();
    expect(queryByText("10")).not.toBeNull();
    expect(queryByText("Maximum stack is 10.")).not.toBeNull();
  });

  it("renders acquisition-steps section as ordered list", () => {
    const article = createItemArticle([
      {
        id: "acquisition",
        type: "acquisition-steps",
        title: "How to Obtain",
        order: 10,
        toc: true,
        visible: true,
        steps: [
          {
            label: "Visit Farrow",
            body: ["Travel to the Expedition encampment."],
          },
        ],
      },
    ]);

    const { queryByText } = render(<ItemSectionRenderer article={article} />);

    expect(queryByText("How to Obtain")).not.toBeNull();
    expect(queryByText("Visit Farrow")).not.toBeNull();
    expect(
      queryByText("Travel to the Expedition encampment."),
    ).not.toBeNull();
  });

  it("renders narrative sections with paragraphs and bullets", () => {
    const article = createItemArticle([
      {
        id: "use-cases",
        type: "use-cases",
        title: "Use Cases",
        order: 10,
        toc: true,
        visible: true,
        paragraphs: ["Primary use case paragraph."],
        bullets: ["First bullet.", "Second bullet."],
      },
    ]);

    const { queryByText } = render(<ItemSectionRenderer article={article} />);

    expect(queryByText("Use Cases")).not.toBeNull();
    expect(queryByText("Primary use case paragraph.")).not.toBeNull();
    expect(queryByText("First bullet.")).not.toBeNull();
    expect(queryByText("Second bullet.")).not.toBeNull();
  });
});

describe("ItemMediaNotice", () => {
  it("renders localized disclaimer", () => {
    const { queryByText } = render(<ItemMediaNotice locale="en" />);
    expect(queryByText(/public web sources/)).not.toBeNull();

    const { queryByText: queryZh } = render(<ItemMediaNotice locale="zh-cn" />);
    expect(queryZh(/公开网络资料/)).not.toBeNull();
  });
});

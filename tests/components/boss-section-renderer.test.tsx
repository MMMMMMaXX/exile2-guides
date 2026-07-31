/** 文件职责：验证 Boss Section Renderer 的章节渲染、排序和隐藏跳过逻辑。 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  BossMediaNotice,
  BossSectionRenderer,
} from "../../components/bosses/boss-section-renderer";
import { bossArticleSchema, type BossArticle } from "../../lib/bosses/schema";

/** 创建包含多种章节类型的测试文章，验证渲染器穷举处理。 */
function createBossArticle(sections: BossArticle["sections"]): BossArticle {
  return bossArticleSchema.parse({
    id: "test-boss",
    slug: "test-boss",
    locale: "en",
    type: "boss",
    status: "published",
    featured: false,
    title: "Test Boss",
    shortTitle: "Test",
    summary: "Test summary.",
    description: "Test description.",
    patch: "test",
    league: "test",
    patchStatus: "current",
    verificationStatus: "pending-pc",
    author: "Test author",
    reviewer: "Test reviewer",
    createdAt: "2026-07-29",
    publishedAt: "2026-07-29",
    updatedAt: "2026-07-29",
    tags: [],
    sections,
    relatedBuildIds: [],
    relatedGuideIds: [],
    relatedItemIds: [],
    relatedPatchIds: [],
    sources: [
      {
        label: "Official source",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    seo: { title: "Test Boss", description: "Test description." },
  });
}

describe("BossSectionRenderer", () => {
  it("renders sections sorted by order and skips hidden ones", () => {
    const article = createBossArticle([
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
      <BossSectionRenderer article={article} />,
    );

    expect(queryByText("Hidden Section")).toBeNull();
    expect(queryByText("First Section")).not.toBeNull();
    expect(queryByText("Second Section")).not.toBeNull();

    const sections = container.querySelectorAll("section");
    expect(sections).toHaveLength(2);
    expect(sections[0]?.id).toBe("first");
    expect(sections[1]?.id).toBe("second");
  });

  it("renders attacks section with attack cards", () => {
    const article = createBossArticle([
      {
        id: "attacks",
        type: "attacks",
        title: "Attack Patterns",
        order: 10,
        toc: true,
        visible: true,
        attacks: [
          {
            attackId: "slam",
            name: "Ground Slam",
            phaseIds: ["phase-1"],
            telegraph: ["Raises weapon high."],
            damageTypes: ["physical"],
            responses: ["Dodge backwards."],
            notes: [],
            commonMistakes: [],
            mediaIds: [],
            sourceIds: [],
          },
        ],
      },
    ]);

    const { queryByText } = render(<BossSectionRenderer article={article} />);

    expect(queryByText("Attack Patterns")).not.toBeNull();
    expect(queryByText("Ground Slam")).not.toBeNull();
    expect(queryByText("Raises weapon high.")).not.toBeNull();
    expect(queryByText("Dodge backwards.")).not.toBeNull();
  });

  it("renders phases section as interactive tabs", () => {
    const article = createBossArticle([
      {
        id: "phases",
        type: "phases",
        title: "Fight Phases",
        order: 10,
        toc: true,
        visible: true,
        phases: [
          {
            phaseId: "phase-1",
            label: "Phase 1",
            trigger: "At 100% HP",
            objectives: ["Survive the opening."],
            notes: [],
            tags: [],
          },
        ],
      },
    ]);

    const { getAllByText, queryByText } = render(
      <BossSectionRenderer article={article} />,
    );

    expect(queryByText("Fight Phases")).not.toBeNull();
    expect(queryByText("Phase 1")).not.toBeNull();
    // V5 标签页结构：触发条件同时出现在标签按钮和详情视图中
    expect(getAllByText(/At 100% HP/).length).toBeGreaterThan(0);
  });

  it("renders quick-preparation as a definition list", () => {
    const article = createBossArticle([
      {
        id: "prep",
        type: "quick-preparation",
        title: "Quick Preparation",
        order: 10,
        toc: true,
        visible: true,
        items: [{ label: "Resistances", checks: ["Cap fire resistance."] }],
        links: [],
      },
    ]);

    const { queryByText } = render(<BossSectionRenderer article={article} />);

    expect(queryByText("Quick Preparation")).not.toBeNull();
    expect(queryByText("Resistances")).not.toBeNull();
    expect(queryByText("Cap fire resistance.")).not.toBeNull();
  });

  it("renders rewards section", () => {
    const article = createBossArticle([
      {
        id: "rewards",
        type: "rewards",
        title: "Rewards",
        order: 10,
        toc: true,
        visible: true,
        rewards: [
          {
            itemId: "unique-sword",
            label: "Unique Sword",
            condition: "First kill",
            notes: [],
          },
        ],
      },
    ]);

    const { queryByText } = render(<BossSectionRenderer article={article} />);

    expect(queryByText("Rewards")).not.toBeNull();
    expect(queryByText("Unique Sword")).not.toBeNull();
    expect(queryByText(/First kill/)).not.toBeNull();
  });
});

describe("BossMediaNotice", () => {
  it("renders localized disclaimer", () => {
    const { queryByText } = render(<BossMediaNotice locale="en" />);
    expect(queryByText(/public web sources/)).not.toBeNull();

    const { queryByText: queryZh } = render(<BossMediaNotice locale="zh-cn" />);
    expect(queryZh(/公开网络资料/)).not.toBeNull();
  });
});

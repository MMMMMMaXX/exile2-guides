/** 文件职责：验证 SkillSectionRenderer 按章节类型输出受控结构。 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  SkillMediaNotice,
  SkillSectionRenderer,
} from "../../components/skills/skill-section-renderer";
import { skillArticleSchema, type SkillArticle } from "../../lib/skills/schema";

/** 创建包含多种章节类型的测试 Skill。 */
function createTestSkill(): SkillArticle {
  return skillArticleSchema.parse({
    author: "Editorial Team",
    createdAt: "2026-07-27",
    description: "A test skill.",
    id: "skill-renderer-test",
    league: "Standard",
    locale: "en",
    patch: "0.5.4",
    patchStatus: "current",
    sections: [
      {
        bullets: ["Bullet one", "Bullet two"],
        id: "overview",
        order: 1,
        paragraphs: ["Overview paragraph."],
        title: "Skill Overview",
        toc: true,
        type: "overview",
        visible: true,
      },
      {
        bullets: [],
        id: "mechanics",
        order: 2,
        paragraphs: ["Mechanics paragraph."],
        title: "Mechanics",
        toc: true,
        type: "mechanics",
        visible: true,
      },
      {
        id: "supports",
        order: 3,
        supports: [
          {
            label: "Increased Area of Effect",
            notes: ["Widens the blast radius."],
            priority: "core",
          },
          {
            label: "Concentrated Effect",
            notes: ["More damage in smaller area."],
            priority: "situational",
          },
        ],
        title: "Recommended Supports",
        toc: true,
        type: "supports",
        visible: true,
      },
      {
        id: "properties",
        order: 4,
        properties: [
          {
            label: "Cast Time",
            notes: ["Base cast time at level 1."],
            value: "0.70s",
          },
        ],
        title: "Properties",
        toc: false,
        type: "properties",
        visible: true,
      },
      {
        bullets: [],
        id: "hidden-section",
        order: 5,
        paragraphs: ["This should not render."],
        title: "Hidden",
        toc: false,
        type: "verification",
        visible: false,
      },
    ],
    seo: {
      description: "Test skill SEO.",
      title: "Test Skill | Exile2 Guides",
    },
    shortTitle: "Test Skill",
    skillCategory: "active",
    skillType: "active",
    slug: "renderer-test-skill",
    sources: [
      {
        label: "Official",
        sourceType: "official",
        url: "https://www.pathofexile.com/",
      },
    ],
    status: "draft",
    summary: "Test summary.",
    tags: ["test"],
    title: "Renderer Test Skill",
    type: "skill",
    updatedAt: "2026-07-27",
  });
}

describe("SkillSectionRenderer", () => {
  it("渲染叙述型章节的段落和列表", () => {
    const article = createTestSkill();
    render(<SkillSectionRenderer article={article} />);
    expect(screen.getByText("Overview paragraph.")).toBeDefined();
    expect(screen.getByText("Bullet one")).toBeDefined();
    expect(screen.getByText("Bullet two")).toBeDefined();
  });

  it("渲染推荐辅助宝石列表", () => {
    const article = createTestSkill();
    const { container } = render(<SkillSectionRenderer article={article} />);
    const supportsSection = container.querySelector(".skill-supports");
    expect(supportsSection).not.toBeNull();
    expect(supportsSection?.textContent).toContain(
      "Increased Area of Effect",
    );
    expect(supportsSection?.textContent).toContain("Core");
    expect(supportsSection?.textContent).toContain("Situational");
  });

  it("渲染技能属性键值对", () => {
    const article = createTestSkill();
    const { container } = render(<SkillSectionRenderer article={article} />);
    const propertiesSection = container.querySelector(".skill-properties");
    expect(propertiesSection).not.toBeNull();
    expect(propertiesSection?.textContent).toContain("Cast Time");
    expect(propertiesSection?.textContent).toContain("0.70s");
  });

  it("跳过隐藏章节", () => {
    const article = createTestSkill();
    render(<SkillSectionRenderer article={article} />);
    expect(screen.queryByText("This should not render.")).toBeNull();
  });

  it("为主要章节生成编号", () => {
    const article = createTestSkill();
    const { container } = render(<SkillSectionRenderer article={article} />);
    const numbers = container.querySelectorAll(".skill-section__number");
    expect(numbers.length).toBe(3);
    expect(numbers[0]?.textContent).toBe("1");
    expect(numbers[1]?.textContent).toBe("2");
    expect(numbers[2]?.textContent).toBe("3");
  });
});

describe("SkillMediaNotice", () => {
  it("渲染英文免责声明", () => {
    render(<SkillMediaNotice locale="en" />);
    expect(
      screen.getByText(/Information is compiled from public web sources/),
    ).toBeDefined();
  });

  it("渲染中文免责声明", () => {
    render(<SkillMediaNotice locale="zh-cn" />);
    expect(screen.getByText(/本文信息整理自公开网络资料/)).toBeDefined();
  });
});

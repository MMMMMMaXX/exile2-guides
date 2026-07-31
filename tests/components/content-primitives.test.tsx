/** 文件职责：验证卡片、提示、FAQ 和关联内容组件的语义、限制与空状态。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Callout } from "../../components/content/callout";
import { ContentCard } from "../../components/content/content-card";
import { FaqAccordion } from "../../components/content/faq-accordion";
import { RelatedContent } from "../../components/content/related-content";

// 每个用例清理 DOM，避免 details 默认展开状态或重复 id 影响后续断言。
afterEach(cleanup);

const sampleCard = {
  attributes: ["Beginner", "Low budget", "Current patch", "Hidden fourth"],
  href: "/en/guides/verified-guide/",
  meta: "Updated today",
  summary: "A concise and verified guide summary.",
  title: "Verified Guide",
  typeLabel: "Guide",
} as const;

describe("content card", () => {
  it("uses one whole-card link and limits displayed attributes to three", () => {
    render(<ContentCard content={sampleCard} />);

    expect(
      screen
        .getByRole("link", { name: /Verified Guide/i })
        .getAttribute("href"),
    ).toBe(sampleCard.href);
    expect(screen.getByText("Beginner")).toBeTruthy();
    expect(screen.queryByText("Hidden fourth")).toBeNull();
  });
});

describe("callout and FAQ", () => {
  it("uses alert semantics for warnings and native details for real FAQ entries", () => {
    render(
      <>
        <Callout variant="warning">
          Check the latest patch before following this step.
        </Callout>
        <FaqAccordion
          items={[
            {
              answer: "Use the verified route.",
              question: "Where do I start?",
            },
          ]}
        />
      </>,
    );

    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText("Where do I start?").tagName).toBe("SUMMARY");
  });

  it("does not render an empty FAQ or related content region", () => {
    const { container } = render(
      <>
        <FaqAccordion items={[]} />
        <RelatedContent items={[]} />
      </>,
    );

    expect(container.innerHTML).toBe("");
  });
});

describe("related content", () => {
  it("renders supplied published-card data without resolving content itself", () => {
    render(<RelatedContent items={[sampleCard]} />);

    expect(
      screen.getByRole("heading", { name: "Related content" }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: /Verified Guide/i })).toBeTruthy();
  });
});


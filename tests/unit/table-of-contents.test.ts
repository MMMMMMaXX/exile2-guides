/** 文件职责：验证目录提取、重复标题锚点与静态正文标题注入规则。 */
import { describe, expect, it } from "vitest";

import {
  addHeadingAnchors,
  extractTableOfContents,
} from "../../lib/content/table-of-contents";

describe("table of contents extraction", () => {
  it("only extracts H2 and H3 headings with stable nested anchors", () => {
    expect(
      extractTableOfContents(
        "# Page title\n\n## Getting Started\n\n### First step\n\n#### Hidden\n\n## Getting Started",
      ),
    ).toEqual([
      { id: "getting-started", level: 2, text: "Getting Started" },
      { id: "first-step", level: 3, text: "First step" },
      { id: "getting-started-2", level: 2, text: "Getting Started" },
    ]);
  });

  it("adds each extracted anchor to its matching rendered heading", () => {
    const items = extractTableOfContents("## Overview\n\n### Details");

    expect(
      addHeadingAnchors("<h2>Overview</h2><p>Text</p><h3>Details</h3>", items),
    ).toBe(
      '<h2 id="overview">Overview</h2><p>Text</p><h3 id="details">Details</h3>',
    );
  });
});

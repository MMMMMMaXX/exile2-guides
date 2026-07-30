/** 文件职责：验证本地 Build 草稿提示的显示边界与双语文案。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DraftPreviewNotice } from "../../components/content/draft-preview-notice";

afterEach(cleanup);

describe("DraftPreviewNotice", () => {
  it("renders a Chinese warning for a local draft", () => {
    render(
      <DraftPreviewNotice frontMatter={{ draft: true, locale: "zh-cn" }} />,
    );

    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText("本地草稿预览")).toBeTruthy();
    expect(screen.getByText(/不会进入生产站点/)).toBeTruthy();
  });

  it("does not render for published content", () => {
    const { container } = render(
      <DraftPreviewNotice frontMatter={{ draft: false, locale: "en" }} />,
    );

    expect(container.innerHTML).toBe("");
  });
});

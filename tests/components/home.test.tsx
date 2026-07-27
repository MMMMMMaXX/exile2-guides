/** 文件职责：验证根语言选择页保留独立语言 URL，且不展示 AI 或虚构内容入口。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import IndexRoute from "../../app/routes/index";

// 每个用例后清理 DOM，避免页面级链接影响后续断言。
afterEach(cleanup);

describe("language landing", () => {
  it("links visitors to both independently addressable home pages", () => {
    render(<IndexRoute />);

    expect(
      screen.getByRole("link", { name: /English/i }).getAttribute("href"),
    ).toBe("/en/");
    expect(
      screen.getByRole("link", { name: /简体中文/i }).getAttribute("href"),
    ).toBe("/zh-cn/");
    expect(screen.queryByText(/Ask AI/i)).toBeNull();
  });
});

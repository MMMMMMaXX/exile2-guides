/** 文件职责：验证开发设计系统页持续展示核心 Token 与基础组件入口。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import DesignSystemRoute from "../../app/routes/design-system";

// 每个用例后清理 DOM，避免组件状态在测试之间泄漏。
afterEach(cleanup);

// 这些断言保护设计系统的信息架构，不承担具体视觉回归职责。
describe("design system preview", () => {
  it("documents the shared foundations and primitives", () => {
    render(<DesignSystemRoute />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Exile2 Guides Design System",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Semantic colors")).toBeTruthy();
    expect(screen.getByText("Controls and surfaces")).toBeTruthy();
  });
});

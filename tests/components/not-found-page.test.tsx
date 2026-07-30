/** 文件职责：验证 404 页面可恢复、不可索引，并且不会把未知地址自动送回首页。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { NotFoundPage } from "../../components/content/not-found-page";
import { getNotFoundMeta } from "../../lib/seo/not-found";

// 每个用例清理 DOM，确保链接断言不会受到其他页面组件残留影响。
afterEach(cleanup);

describe("not found page", () => {
  it("provides recovery links and explicitly excludes error pages from indexing", () => {
    render(<NotFoundPage locale="zh-cn" />);
    expect(
      screen.getByRole("heading", { name: "使用搜索或返回内容中心。" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "返回首页" }).getAttribute("href"),
    ).toBe("/zh-cn/");
    expect(
      screen.getByRole("link", { name: "搜索攻略" }).getAttribute("href"),
    ).toBe("/zh-cn/search/");
    expect(getNotFoundMeta("zh-cn")).toContainEqual({
      name: "robots",
      content: "noindex, nofollow",
    });
  });
});

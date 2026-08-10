/** 文件职责：验证共享 Header、Footer 的关键信息架构与移动菜单交互。 */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";

import { Footer } from "../../components/layout/footer";
import { Header } from "../../components/layout/header";

// 每个用例后清理 DOM，防止移动菜单状态影响后续断言。
afterEach(cleanup);

/** 为依赖路由位置的页头提供稳定的内存路由测试环境。 */
function renderHeader(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Header />
    </MemoryRouter>,
  );
}

describe("site header", () => {
  it("renders the brand, category routes and working language controls", () => {
    renderHeader("/en/");

    expect(
      screen
        .getByRole("link", { name: "Exile2 Guides home" })
        .getAttribute("href"),
    ).toBe("/en/");
    expect(
      screen.getByRole("link", { name: "Builds" }).getAttribute("href"),
    ).toBe("/en/builds/");
    expect(
      screen.getByRole("link", { name: "Patch Notes" }).getAttribute("href"),
    ).toBe("/en/patches/");
    expect(
      screen.getByRole("link", { name: "Search" }).getAttribute("href"),
    ).toBe("/en/search/");
    const languageToggle = screen.getByRole("button", { name: "English" });
    expect(languageToggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(languageToggle);
    expect(
      screen
        .getByRole("menuitem", { name: "English" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("menuitem", { name: "简体中文" }).getAttribute("href"),
    ).toBe("/zh-cn/");
    expect(screen.queryByText("Pricing")).toBeNull();
  });

  it("keeps the brand and active language scoped to the Chinese home", () => {
    renderHeader("/zh-cn/");

    expect(
      screen
        .getByRole("link", { name: "Exile2 Guides home" })
        .getAttribute("href"),
    ).toBe("/zh-cn/");
    const languageToggle = screen.getByRole("button", {
      name: "简体中文",
    });
    fireEvent.click(languageToggle);
    expect(
      screen
        .getByRole("menuitem", { name: "简体中文" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });

  it("stores an explicit locale choice without replacing the language URL", () => {
    renderHeader("/en/");
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "简体中文" }));

    expect(localStorage.getItem("exile2-guides-locale")).toBe("zh-cn");
  });

  it("opens the mobile menu when category routes are available", () => {
    renderHeader();
    const menuButton = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });

    expect(menuButton.hasAttribute("disabled")).toBe(false);
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
  });

  it("localizes navigation accessible names on Chinese routes", () => {
    renderHeader("/zh-cn/");

    expect(screen.getByRole("navigation", { name: "主导航" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "语言选择" })).toBeTruthy();
  });
});

describe("site footer", () => {
  it("renders the unofficial disclaimer, categories and legal information", () => {
    render(
      <MemoryRouter initialEntries={["/zh-cn/"]}>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/非官方玩家制作攻略站/)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Build 攻略" }).getAttribute("href"),
    ).toBe("/zh-cn/builds/");
    expect(
      screen.getByRole("link", { name: "隐私政策" }).getAttribute("href"),
    ).toBe("/zh-cn/privacy-policy/");
    expect(
      screen.getByRole("link", { name: "免责声明" }).getAttribute("href"),
    ).toBe("/zh-cn/disclaimer/");
    expect(screen.getByText(/Exile2 Guides. 保留所有权利。/)).toBeTruthy();
  });
});

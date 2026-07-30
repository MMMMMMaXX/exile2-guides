/** 文件职责：覆盖 MVP 公共站点的导航、刷新、语言、404、移动菜单和搜索核心流程。 */
import { expect, test } from "@playwright/test";

const categories = [
  ["builds", "E2E Build Fixture"],
  ["bosses", "E2E Boss Fixture"],
  ["items", "E2E Item Fixture"],
  ["skills", "E2E Skill Fixture"],
  ["guides", "E2E Guide Fixture"],
  ["patches", "E2E Patch Fixture"],
] as const;

test.describe("public content routes", () => {
  for (const [section, title] of categories) {
    test(`${section} list opens a detail that survives refresh`, async ({
      page,
    }) => {
      await page.goto(`/en/${section}/`);
      await page.getByRole("link", { name: title }).click();
      await expect(page).toHaveURL(new RegExp(`/en/${section}/e2e-`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      await page.reload();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    });
  }

  test("switches a detail page to the matching contentId translation", async ({
    page,
  }) => {
    await page.goto("/en/guides/e2e-guide/");
    await page.getByRole("button", { name: "EN" }).click();
    await page.getByRole("menuitem", { name: "简体中文" }).click();
    await expect(page).toHaveURL("/zh-cn/guides/e2e-guide/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "端到端指南夹具",
    );
  });

  test("shows a recoverable noindex 404 interface", async ({ page }) => {
    await page.goto("/en/route-that-does-not-exist/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Use search or return to a content hub.",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });

  test("opens and uses the mobile navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/");
    const menu = page.getByRole("button", { name: "Toggle navigation menu" });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Builds", exact: true })
      .click();
    await expect(page).toHaveURL("/en/builds/");
  });

  test("searches only the current language fixture index", async ({ page }) => {
    await page.goto("/en/search/?q=E2E%20Build");
    await expect(
      page.getByRole("link", { name: "E2E Build Fixture" }),
    ).toBeVisible();
  });

  test("serves Build JSON through collection, query, detail and 404 routes", async ({
    page,
  }) => {
    await page.goto("/en/builds/");
    const publishedCard = page.getByRole("link", {
      name: "E2E Build Fixture",
    });
    await expect(publishedCard).toHaveClass(/v4-prototype-card--content/);
    await expect(page.locator(".v4-published-content")).toHaveCount(0);
    await expect(
      page.getByRole("region", { name: "Build filters" }),
    ).toHaveCount(0);

    await page.goto("/en/builds/classes/ranger/");
    await expect(
      page.getByRole("link", { name: "E2E Build Fixture" }),
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );

    await page.goto("/en/builds/ascendancies/deadeye/");
    await expect(
      page.getByRole("link", { name: "E2E Build Fixture" }),
    ).toBeVisible();

    await page.goto("/en/builds/starter/");
    await expect(
      page.getByRole("link", { name: "E2E Build Fixture" }),
    ).toBeVisible();

    await page.goto("/en/builds/?class=ranger&budget=low");
    await expect(
      page.getByRole("link", { name: "E2E Build Fixture" }),
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/en\/builds\/$/,
    );

    await page.goto("/en/builds/not-exist/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });

  test("previews Build drafts locally without adding them to search", async ({
    page,
  }) => {
    await page.goto("/en/builds/");
    const draftCard = page.getByRole("link", {
      name: "Local Build Draft Fixture",
    });
    await expect(draftCard).toHaveClass(/v4-prototype-card--content/);
    await expect(
      draftCard.getByText("Local draft", { exact: true }),
    ).toBeVisible();
    await expect(page.locator(".v4-published-content")).toHaveCount(0);
    await draftCard.click();
    await expect(page).toHaveURL("/en/builds/e2e-build-draft/");
    await expect(
      page.getByText("Local draft preview", { exact: true }),
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );

    await page.goto("/en/search/?q=Local%20Build%20Draft%20Fixture");
    await expect(page.getByText("0 results", { exact: true })).toBeVisible();
  });

  test("keeps unified Build content cards single-column on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/builds/");
    const draftCard = page.getByRole("link", {
      name: "Local Build Draft Fixture",
    });
    await expect(draftCard).toBeVisible();
    await expect(page.locator(".v4-published-content")).toHaveCount(0);
    await expect
      .poll(() =>
        draftCard.evaluate(
          (element) =>
            getComputedStyle(element).gridTemplateColumns.split(" ").length,
        ),
      )
      .toBe(1);
  });
});

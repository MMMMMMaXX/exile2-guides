/** 文件职责：验证文章布局中的面包屑、目录入口和 BreadcrumbList 结构化数据。 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ArticleLayout } from "../../components/layout/article-layout";
import { createBreadcrumbJsonLd } from "../../lib/seo/breadcrumb";
import { toPublicUrl } from "../../lib/seo/metadata";

// 每个用例清理渲染结果，避免目录观察状态影响下一个组件断言。
afterEach(cleanup);

const breadcrumbs = [
  { label: "Home", path: "/" },
  { label: "Guides", path: "/en/guides/" },
  { label: "Verified Guide", path: "/en/guides/verified-guide/" },
] as const;

describe("article layout", () => {
  it("renders breadcrumb hierarchy and desktop/mobile table of contents", () => {
    render(
      <ArticleLayout
        breadcrumbs={breadcrumbs}
        patch="0.4"
        summary="A verified summary."
        tableOfContents={[
          { id: "overview", level: 2, text: "Overview" },
          { id: "details", level: 3, text: "Details" },
        ]}
        title="Verified Guide"
      >
        <p>Body</p>
      </ArticleLayout>,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(
      screen
        .getAllByText("Verified Guide")
        .find((element) => element.getAttribute("aria-current") === "page"),
    ).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Overview" })).toHaveLength(2);
    expect(screen.getAllByText("On this page")).toHaveLength(2);
  });

  it("returns BreadcrumbList entries in visible order", () => {
    expect(createBreadcrumbJsonLd(breadcrumbs)).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          item: toPublicUrl("/"),
          name: "Home",
          position: 1,
        },
        {
          "@type": "ListItem",
          item: toPublicUrl("/en/guides/"),
          name: "Guides",
          position: 2,
        },
        {
          "@type": "ListItem",
          item: toPublicUrl("/en/guides/verified-guide/"),
          name: "Verified Guide",
          position: 3,
        },
      ],
    });
  });
});

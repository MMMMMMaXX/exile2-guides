/** 文件职责：验证详情侧栏的十语言公开文案、作者归属和内部工作流状态隔离。 */

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ArticleSidebar } from "../../components/content/article-sidebar";
import { ChangelogList } from "../../components/content/sections/changelog-list";
import { supportedLocales } from "../../lib/content/constants";

afterEach(cleanup);

describe("ArticleSidebar", () => {
  it("为十种语言输出读者文案，且不公开内部状态或虚构团队作者", () => {
    for (const locale of supportedLocales) {
      const { container, unmount } = render(
        <ArticleSidebar
          categoryHref={`/${locale}/guides/`}
          categoryLabel="Guides"
          contentType="guide"
          locale={locale}
          patch="0.5.4"
          tags={["campaign"]}
          updatedAt="2026-08-19"
          verificationStatus="pending-pc"
        />,
      );

      expect(container.textContent).not.toContain("pending-pc");
      expect(container.textContent).not.toContain("Editorial Team");
      expect(
        container.querySelector(`a[href="/${locale}/about/"]`)?.textContent,
      ).toBe("Exile2 Guides");
      unmount();
    }
  });

  it("未知内部状态使用安全兜底，不把原值带入公开页面", () => {
    const { container } = render(
      <ArticleSidebar
        categoryHref="/en/guides/"
        categoryLabel="Guides"
        contentType="guide"
        locale="en"
        patch="0.5.4"
        tags={[]}
        updatedAt="2026-08-19"
        verificationStatus="internal-review-code"
      />,
    );

    expect(container.textContent).toContain("Evidence scope stated");
    expect(container.textContent).not.toContain("internal-review-code");
  });
});

describe("ChangelogList", () => {
  it("只展示内容变化，不展示机器生成或内部核验说明", () => {
    const { container } = render(
      <ChangelogList
        entries={[
          {
            changes: [
              "Initial version generated from patch notes.",
              "Added a sourced attack table.",
              "Status remains pending-pc.",
            ],
            date: "2026-08-19",
          },
        ]}
      />,
    );

    expect(container.textContent).toContain("Added a sourced attack table.");
    expect(container.textContent).not.toContain("generated from");
    expect(container.textContent).not.toContain("pending-pc");
  });
});

/** 文件职责：验证首页内容选择的语言隔离、发布日期排序和数量上限。 */
import { describe, expect, it } from "vitest";

import type { StaticContentPageMap } from "../../lib/content/content-page";
import { getHomeContentItems } from "../../lib/content/home-content";

/** 构造首页选择器所需的最小静态页面，避免测试依赖磁盘内容文件。 */
function createPage(
  contentId: string,
  locale: "en" | "zh-cn",
  publishedAt: string,
) {
  return {
    bodyHtml: `<h1>${contentId}</h1>`,
    frontMatter: {
      contentId,
      locale,
      publishedAt,
      title: contentId,
      updatedAt: "2026-07-27",
    },
    tableOfContents: [],
  };
}

describe("home content", () => {
  it("keeps the requested locale and sorts newest content first", () => {
    const pages = {
      "/en/older/": createPage("older", "en", "2026-07-27"),
      "/en/newer/": createPage("newer", "en", "2026-07-28"),
      "/zh-cn/newer/": createPage("newer", "zh-cn", "2026-07-28"),
    } as unknown as StaticContentPageMap;

    expect(
      getHomeContentItems(pages, "en").map(
        (page) => page.frontMatter.contentId,
      ),
    ).toEqual(["newer", "older"]);
  });

  it("honours the requested display limit", () => {
    const pages = {
      "/en/one/": createPage("one", "en", "2026-07-28"),
      "/en/two/": createPage("two", "en", "2026-07-27"),
    } as unknown as StaticContentPageMap;

    expect(getHomeContentItems(pages, "en", 1)).toHaveLength(1);
  });
});

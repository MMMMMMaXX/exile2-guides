/** 文件职责：验证浏览器语言回退与公开路径语言识别不会生成未知语言 URL。 */
import { describe, expect, it } from "vitest";

import {
  getLocaleFromPathname,
  localeHomePath,
  resolveBrowserLocale,
  resolveLanguageSwitchTarget,
} from "../../lib/i18n/locale-routing";
import type { StaticContentPageMap } from "../../lib/content/content-page";

describe("locale routing", () => {
  it("maps supported simplified Chinese browser tags to zh-cn", () => {
    expect(resolveBrowserLocale(["zh-CN"])).toBe("zh-cn");
    expect(resolveBrowserLocale(["zh-Hans-CN"])).toBe("zh-cn");
    expect(resolveBrowserLocale(["zh-SG"])).toBe("zh-cn");
  });

  it("falls back to English when the primary browser language is unsupported", () => {
    expect(resolveBrowserLocale(["fr-FR", "zh-CN"])).toBe("en");
    expect(resolveBrowserLocale(["zh-TW"])).toBe("en");
    expect(resolveBrowserLocale(undefined)).toBe("en");
  });

  it("recognizes only supported leading locale segments", () => {
    expect(getLocaleFromPathname("/en/builds/")).toBe("en");
    expect(getLocaleFromPathname("/zh-cn/")).toBe("zh-cn");
    expect(getLocaleFromPathname("/fr/")).toBeUndefined();
    expect(localeHomePath("zh-cn")).toBe("/zh-cn/");
  });

  it("switches details by contentId and falls back to the translated category", () => {
    const englishPage = {
      bodyHtml: "<h2>Body</h2>",
      frontMatter: {
        contentId: "shared-guide",
        contentType: "guide",
        locale: "en",
        slug: "shared-guide",
      },
      tableOfContents: [],
    };
    const chinesePage = {
      ...englishPage,
      frontMatter: { ...englishPage.frontMatter, locale: "zh-cn" },
    };
    const bilingualPages = {
      "/en/guides/shared-guide/": englishPage,
      "/zh-cn/guides/shared-guide/": chinesePage,
    } as unknown as StaticContentPageMap;

    expect(
      resolveLanguageSwitchTarget(
        "/en/guides/shared-guide/",
        "zh-cn",
        bilingualPages,
      ),
    ).toEqual({
      href: "/zh-cn/guides/shared-guide/",
      translationMissing: false,
    });
    expect(
      resolveLanguageSwitchTarget("/en/guides/shared-guide/", "zh-cn", {
        "/en/guides/shared-guide/": englishPage,
      } as unknown as StaticContentPageMap),
    ).toEqual({
      href: "/zh-cn/guides/?translation=missing",
      translationMissing: true,
    });
  });

  it("preserves mirrored fixed-page paths when switching languages", () => {
    expect(
      resolveLanguageSwitchTarget("/en/privacy-policy/", "zh-cn", {}),
    ).toEqual({
      href: "/zh-cn/privacy-policy/",
      translationMissing: false,
    });
  });
});

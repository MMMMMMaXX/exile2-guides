/** 文件职责：验证无语言、非法语言和静态资源路径的英语兜底规则。 */
import { describe, expect, it } from "vitest";

import { getEnglishFallbackPath } from "../../lib/i18n/locale-routing";

describe("English fallback routing", () => {
  it("adds en to unprefixed application paths without mistaking route slugs for locales", () => {
    expect(getEnglishFallbackPath("/")).toBe("/en/");
    expect(getEnglishFallbackPath("/levels/")).toBe("/en/levels/");
    expect(getEnglishFallbackPath("/hard-levels/34/")).toBe(
      "/en/hard-levels/34/",
    );
  });

  it("replaces invalid locale-shaped prefixes and preserves valid or static paths", () => {
    expect(getEnglishFallbackPath("/xx/levels/")).toBe("/en/levels/");
    expect(getEnglishFallbackPath("/zh-hans/levels/")).toBe("/en/levels/");
    expect(getEnglishFallbackPath("/zh-cn/levels/")).toBeUndefined();
    expect(getEnglishFallbackPath("/assets/app.js")).toBeUndefined();
  });
});

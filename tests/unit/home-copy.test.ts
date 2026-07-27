/** 文件职责：验证双语首页文案与未知语言路径的失败关闭行为。 */
import { describe, expect, it } from "vitest";

import { getHomeCopy, isHomeLocale } from "../../lib/i18n/home-copy";

describe("home copy", () => {
  it("provides the PRD hero copy for both supported home locales", () => {
    expect(getHomeCopy("en")?.heroTitle).toBe(
      "Path of Exile 2 Builds, Boss Guides and Beginner Help",
    );
    expect(getHomeCopy("zh-cn")?.heroTitle).toBe(
      "Path of Exile 2 Build、Boss 与新手攻略",
    );
  });

  it("rejects unsupported locales instead of serving an unintended home page", () => {
    expect(isHomeLocale("ja")).toBe(false);
    expect(getHomeCopy("ja")).toBeUndefined();
  });
});

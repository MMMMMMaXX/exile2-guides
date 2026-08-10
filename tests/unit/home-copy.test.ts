/** 文件职责：验证 10 语言首页文案与未知语言路径的失败关闭行为。 */
import { describe, expect, it } from "vitest";

import { getHomeCopy, isHomeLocale } from "../../lib/i18n/home-copy";

describe("home copy", () => {
  it("provides keyword-focused hero copy for supported home locales", () => {
    expect(getHomeCopy("en")?.heroTitle).toBe(
      "PoE 2 Builds, Boss Guides & Skill Database",
    );
    expect(getHomeCopy("zh-cn")?.heroTitle).toBe(
      "PoE 2 Build、Boss 攻略与技能数据库",
    );
    expect(getHomeCopy("ja")?.heroTitle).toContain("PoE 2");
  });

  it("rejects unsupported locales instead of serving an unintended home page", () => {
    expect(isHomeLocale("it")).toBe(false);
    expect(getHomeCopy("it")).toBeUndefined();
  });
});

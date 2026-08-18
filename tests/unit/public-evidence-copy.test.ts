/** 文件职责：验证内部核验状态在十语言公开正文中都会转换为读者可理解的证据边界。 */

import { describe, expect, it } from "vitest";

import { supportedLocales } from "../../lib/content/constants";
import { formatPublicEvidenceText } from "../../lib/i18n/public-evidence-copy";

describe("formatPublicEvidenceText", () => {
  it.each(supportedLocales)(
    "removes the raw pending status for %s",
    (locale) => {
      const text = formatPublicEvidenceText(locale, "Value pending-pc.");

      expect(text).not.toContain("pending-pc");
      expect(text.length).toBeGreaterThan("Value .".length);
    },
  );

  it("replaces an internal publication instruction with reader guidance", () => {
    expect(
      formatPublicEvidenceText(
        "en",
        "Confirm the current client mana cost before publishing numbers.",
      ),
    ).toBe(
      "Use the current in-game tooltip for the mana cost; this page does not state a fixed value.",
    );
  });
});

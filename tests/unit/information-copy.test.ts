/** 文件职责：验证法律与信息页只接受受控路由段，并保留部署前联系渠道的真实状态。 */
import { describe, expect, it } from "vitest";

import {
  getInformationPageCopy,
  isInformationPageSlug,
} from "../../lib/i18n/information-copy";

describe("information page copy", () => {
  it("accepts only registered information page slugs", () => {
    expect(isInformationPageSlug("privacy-policy")).toBe(true);
    expect(isInformationPageSlug("builds")).toBe(false);
  });

  it("discloses the confirmed public contact address without implying a backend form", () => {
    const copy = getInformationPageCopy("en", "contact");

    expect(copy.title).toBe("Contact Us");
    expect(copy.sections[0]?.paragraphs?.join(" ")).toMatch(
      /contact@exile2guides\.com/i,
    );
  });
});

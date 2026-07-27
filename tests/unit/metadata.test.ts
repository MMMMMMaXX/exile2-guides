/** 文件职责：验证 canonical、真实语言 alternate 与社交 Metadata 使用同一稳定 URL 契约。 */
import { describe, expect, it } from "vitest";

import {
  createBilingualAlternatePaths,
  createSeoMetadata,
  toPublicUrl,
} from "../../lib/seo/metadata";

describe("SEO metadata", () => {
  it("creates self canonical, bilingual alternates and x-default", () => {
    const metadata = createSeoMetadata({
      alternatePaths: createBilingualAlternatePaths("guides/"),
      description: "Verified guides.",
      locale: "en",
      path: "/en/guides/",
      title: "Guides",
    });
    expect(metadata).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: toPublicUrl("/en/guides/"),
    });
    expect(metadata).toContainEqual({
      tagName: "link",
      rel: "alternate",
      hrefLang: "zh-CN",
      href: toPublicUrl("/zh-cn/guides/"),
    });
    expect(metadata).toContainEqual({
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: toPublicUrl("/en/guides/"),
    });
    expect(metadata).toContainEqual({
      property: "og:image",
      content: toPublicUrl("/og.png"),
    });
  });

  it("does not create x-default when an English translation does not exist", () => {
    const metadata = createSeoMetadata({
      alternatePaths: { "zh-cn": "/zh-cn/guides/only/" },
      description: "仅中文。",
      locale: "zh-cn",
      path: "/zh-cn/guides/only/",
      title: "仅中文",
    });
    expect(metadata.some((entry) => entry.hrefLang === "x-default")).toBe(
      false,
    );
  });
});

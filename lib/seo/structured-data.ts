/** 文件职责：从已验证的页面数据生成最小、真实且可维护的 Schema.org 结构化数据。 */
import { contentRoutePath } from "../content/constants";
import type { ContentFrontMatter } from "../content/schema";
import { toPublicUrl } from "./metadata";
import { siteConfig } from "./site-config";

/** 生成站点级 WebSite 数据；不声明尚未确认的运营组织或个人。 */
export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description:
      "Unofficial multilingual guides for Path of Exile 2, with patch-aware and source-verified content.",
    inLanguage: ["en", "zh-CN"],
    name: siteConfig.siteName,
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
    },
    url: toPublicUrl("/"),
  };
}

/**
 * 从发布 Front Matter 生成 Article 数据。
 * author 保留为编辑者提供的真实名称字符串，避免擅自推断其属于 Person 或 Organization。
 */
export function createArticleJsonLd(frontMatter: ContentFrontMatter) {
  const path = contentRoutePath(
    frontMatter.locale,
    frontMatter.contentType,
    frontMatter.slug,
  );
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    author: frontMatter.author,
    dateModified: frontMatter.updatedAt,
    datePublished: frontMatter.publishedAt,
    description: frontMatter.seoDescription,
    headline: frontMatter.title,
    image: toPublicUrl(frontMatter.image ?? "/og.png"),
    inLanguage: frontMatter.locale === "zh-cn" ? "zh-CN" : "en",
    mainEntityOfPage: toPublicUrl(path),
  };
}

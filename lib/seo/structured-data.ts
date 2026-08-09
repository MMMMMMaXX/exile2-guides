/** 文件职责：从已验证的页面数据生成最小、真实且可维护的 Schema.org 结构化数据。 */
import { contentRoutePath, type ContentLocale } from "../content/constants";
import type { ContentFrontMatter } from "../content/schema";
import { toPublicUrl } from "./metadata";
import { siteConfig } from "./site-config";

/** 将内容 locale 映射为 Schema.org BCP-47 语言标签，与 createArticleJsonLd 保持一致。 */
function toLanguageTag(locale: ContentLocale): string {
  return locale === "zh-cn" ? "zh-CN" : "en";
}

/**
 * 从章节数组提取 FAQ 条目。
 * 数据源：type==="faq"（全六类）+ type==="question-answer"（仅 builds）。
 * 每条 answer 为段落数组，question-answer 还带 bullets；合并为单段文本。
 * 章节已在加载期经 Zod 校验，此处做宽松运行时读取，避免与六类判别联合类型纠缠。
 */
function extractFaqItems(
  sections: readonly unknown[],
): Array<{ question: string; text: string }> {
  const out: Array<{ question: string; text: string }> = [];
  for (const raw of sections) {
    const section = raw as {
      type?: string;
      items?: Array<{
        question?: string;
        answer?: unknown;
        bullets?: unknown;
      }>;
    };
    if (section.type !== "faq" && section.type !== "question-answer") continue;
    if (!Array.isArray(section.items)) continue;
    for (const item of section.items) {
      if (!item || typeof item.question !== "string") continue;
      const question = item.question.trim();
      if (question === "") continue;
      const parts: string[] = [];
      if (Array.isArray(item.answer)) {
        for (const p of item.answer) if (typeof p === "string") parts.push(p);
      }
      if (Array.isArray(item.bullets)) {
        for (const b of item.bullets) if (typeof b === "string") parts.push(b);
      }
      const text = parts.join(" ").trim();
      if (text === "") continue;
      out.push({ question, text });
    }
  }
  return out;
}

/**
 * 从章节数组提取 HowTo 步骤。
 * 数据源：含 steps:[{label, body[]}] 的步骤型章节（bosses access、builds 四个 progression、
 * guides/patch 三步类、items 两步类、skills rich 的可选 steps）。
 * 排除 patches 的 migration-guide（steps 为 {from,to,note}，无 label/body）。
 * skill 的 steps 用 {label, action, result}，拼接 action+result 作为文本。
 */
function extractHowToSteps(
  sections: readonly unknown[],
): Array<{ name: string; text: string }> {
  const out: Array<{ name: string; text: string }> = [];
  for (const raw of sections) {
    const section = raw as {
      type?: string;
      steps?: Array<{
        label?: unknown;
        body?: unknown;
        action?: unknown;
        result?: unknown;
      }>;
    };
    if (!Array.isArray(section.steps)) continue;
    for (const step of section.steps) {
      if (!step) continue;
      const name = typeof step.label === "string" ? step.label.trim() : "";
      if (name === "") continue;
      const textParts: string[] = [];
      if (Array.isArray(step.body)) {
        for (const b of step.body) if (typeof b === "string") textParts.push(b);
      }
      if (typeof step.action === "string" && step.action.trim()) {
        textParts.push(step.action.trim());
      }
      if (typeof step.result === "string" && step.result.trim()) {
        textParts.push(step.result.trim());
      }
      const text = textParts.join(" ").trim();
      if (text === "") continue;
      out.push({ name, text });
    }
  }
  return out;
}

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

/**
 * 从可见章节生成 FAQPage 结构化数据，抢「People Also Ask」富结果。
 * 无 FAQ 内容时返回 null（调用方据此跳过注入）。
 */
export function createFaqJsonLd(
  locale: ContentLocale,
  sections: readonly unknown[],
): object | null {
  const items = extractFaqItems(sections);
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: toLanguageTag(locale),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.text,
      },
    })),
  };
}

/**
 * 从显式 FAQ 条目生成 FAQPage 结构化数据，供非文章路由（如 patches 聚合页）复用。
 * 无条目时返回 null（调用方据此跳过注入）。
 */
export function createFaqJsonLdFromItems(
  locale: ContentLocale,
  items: ReadonlyArray<{ question: string; answer: string }>,
): object | null {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: toLanguageTag(locale),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * 从步骤型章节生成 HowTo 结构化数据，抢步骤富摘要。
 * 无步骤内容时返回 null（调用方据此跳过注入）。
 */
export function createHowToJsonLd(
  locale: ContentLocale,
  sections: readonly unknown[],
): object | null {
  const steps = extractHowToSteps(sections);
  if (steps.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: toLanguageTag(locale),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

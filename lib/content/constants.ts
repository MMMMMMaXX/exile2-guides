/** 文件职责：提供浏览器与构建端共享的语言、内容类型和规范路径常量。 */

/** 全站支持的 10 种语言，顺序即导航/语言切换器展示顺序。 */
export const supportedLocales = [
  "en",
  "zh-cn",
  "pt-br",
  "ru",
  "de",
  "es",
  "fr",
  "ja",
  "ko",
  "tr",
] as const;

export const contentTypes = [
  "build",
  "boss",
  "item",
  "skill",
  "guide",
  "patch",
] as const;

export type ContentLocale = (typeof supportedLocales)[number];
export type ContentType = (typeof contentTypes)[number];

/** 英语是事实源语言，也是 x-default 与缺省回退语言。 */
export const defaultLocale: ContentLocale = "en";

/**
 * 每种语言的展示与 SEO 元数据。
 * htmlLang 用于 <html lang> 与 Open Graph；hreflang 用于 <link rel="alternate">；
 * label 用于语言切换器与无障碍标签；ogLocale 用于 Open Graph locale 格式。
 */
export const localeMeta = {
  en: { htmlLang: "en", hreflang: "en", label: "English", ogLocale: "en_US" },
  "zh-cn": {
    htmlLang: "zh-CN",
    hreflang: "zh-CN",
    label: "简体中文",
    ogLocale: "zh_CN",
  },
  "pt-br": {
    htmlLang: "pt-BR",
    hreflang: "pt-BR",
    label: "Português (Brasil)",
    ogLocale: "pt_BR",
  },
  ru: { htmlLang: "ru", hreflang: "ru", label: "Русский", ogLocale: "ru_RU" },
  de: { htmlLang: "de", hreflang: "de", label: "Deutsch", ogLocale: "de_DE" },
  es: { htmlLang: "es", hreflang: "es", label: "Español", ogLocale: "es_ES" },
  fr: { htmlLang: "fr", hreflang: "fr", label: "Français", ogLocale: "fr_FR" },
  ja: { htmlLang: "ja", hreflang: "ja", label: "日本語", ogLocale: "ja_JP" },
  ko: { htmlLang: "ko", hreflang: "ko", label: "한국어", ogLocale: "ko_KR" },
  tr: { htmlLang: "tr", hreflang: "tr", label: "Türkçe", ogLocale: "tr_TR" },
} as const satisfies Record<
  ContentLocale,
  {
    htmlLang: string;
    hreflang: string;
    label: string;
    ogLocale: string;
  }
>;

export const contentTypeSegments = {
  boss: "bosses",
  build: "builds",
  guide: "guides",
  item: "items",
  patch: "patches",
  skill: "skills",
} as const satisfies Record<ContentType, string>;

/** 根据稳定语言、类型和 Slug 生成规范内容路径。 */
export function contentRoutePath(
  locale: ContentLocale,
  contentType: ContentType,
  slug: string,
): string {
  return `/${locale}/${contentTypeSegments[contentType]}/${slug}/`;
}

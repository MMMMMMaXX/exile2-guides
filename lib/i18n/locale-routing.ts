/** 文件职责：集中处理公开 URL 的语言识别、浏览器语言回退和语言首页路径生成。 */
import {
  contentTypeSegments,
  supportedLocales,
  type ContentLocale,
} from "../content/constants";
import type {
  StaticContentPageMap,
  StaticContentRoute,
  StaticContentRouteMap,
} from "../content/content-page";

const simplifiedChineseLocalePattern = /^zh(?:-(?:cn|sg|hans))(?:-|$)/;

/** 判断首段是否像语言标签，以便从非法语言 URL 中剥离该段。 */
export function looksLikeLocaleSegment(segment: string | undefined): boolean {
  return Boolean(segment && /^[a-z]{2}(?:-[a-z0-9]{2,8})*$/i.test(segment));
}

/** 从公开路径读取受支持语言；未知路径返回 undefined，避免误判业务 Slug。 */
export function getLocaleFromPathname(
  pathname: string,
): ContentLocale | undefined {
  const localeSegment = pathname.split("/").filter(Boolean)[0];
  return supportedLocales.includes(localeSegment as ContentLocale)
    ? (localeSegment as ContentLocale)
    : undefined;
}

/**
 * 将根路径、缺少语言段或非法语言段统一转换为英语路径。
 * 已有有效语言段返回 undefined；静态资源不在应用路由内，不参与此转换。
 */
export function getEnglishFallbackPath(pathname: string): string | undefined {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized.startsWith("/__design-system")) return undefined;
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length === 0) return "/en/";
  if (supportedLocales.includes(parts[0] as ContentLocale)) return undefined;
  if (parts.at(-1)?.includes(".")) return undefined;

  const rest = looksLikeLocaleSegment(parts[0]) ? parts.slice(1) : parts;
  return rest.length > 0 ? `/en/${rest.join("/")}/` : "/en/";
}

/**
 * 根据浏览器首选语言选择 MVP 语言。
 * 将 Accept-Language 中的语言标签映射到受支持语言；无匹配时回退英语。
 */
export function resolveBrowserLocale(
  browserLanguages: readonly string[] | undefined,
): ContentLocale {
  if (!browserLanguages || browserLanguages.length === 0) return "en";

  for (const raw of browserLanguages) {
    const language = raw.trim().toLowerCase();
    const primary = language.split("-")[0];

    // 简体中文相关标签（zh / zh-CN / zh-SG / zh-Hans）映射到 zh-cn。
    if (primary === "zh" && simplifiedChineseLocalePattern.test(language)) {
      return "zh-cn";
    }
    if (primary === "zh") return "zh-cn";

    if (primary === "pt") return "pt-br";
    if (primary === "ru") return "ru";
    if (primary === "de") return "de";
    if (primary === "es") return "es";
    if (primary === "fr") return "fr";
    if (primary === "ja") return "ja";
    if (primary === "ko") return "ko";
    if (primary === "tr") return "tr";
    if (primary === "en") return "en";
  }

  return "en";
}

/** 返回指定语言的稳定首页 URL，供 Logo、语言切换和根路径初始化共同复用。 */
export function localeHomePath(locale: ContentLocale): string {
  return `/${locale}/`;
}

export type LanguageSwitchTarget = {
  href: string;
  translationMissing: boolean;
};

type LanguageSwitchPages = StaticContentRouteMap | StaticContentPageMap;

/** 兼容旧测试夹具并让生产路径索引只读取四个稳定路由字段。 */
function toContentRoute(
  value:
    | StaticContentRoute
    | { frontMatter: StaticContentPageMap[string]["frontMatter"] },
): StaticContentRoute {
  if ("contentId" in value) return value;
  return {
    contentId: value.frontMatter.contentId,
    contentType: value.frontMatter.contentType,
    locale: value.frontMatter.locale,
    slug: value.frontMatter.slug,
  };
}

/**
 * 优先按共享 contentId 定位目标译文。
 * 若详情页译文缺失，则回退到目标语言分类并携带提示标记；固定双语页面保留原路径。
 */
export function resolveLanguageSwitchTarget(
  pathname: string,
  targetLocale: ContentLocale,
  pages: LanguageSwitchPages,
): LanguageSwitchTarget {
  const currentPage = pages[pathname]
    ? toContentRoute(pages[pathname]!)
    : undefined;
  if (currentPage) {
    const translation = Object.values(pages)
      .map((page) => toContentRoute(page))
      .find(
        (candidate) =>
          candidate.contentId === currentPage.contentId &&
          candidate.locale === targetLocale,
      );
    if (translation) {
      return {
        href: `/${targetLocale}/${contentTypeSegments[translation.contentType]}/${translation.slug}/`,
        translationMissing: false,
      };
    }

    const segment = contentTypeSegments[currentPage.contentType];
    return {
      href: `/${targetLocale}/${segment}/?translation=missing`,
      translationMissing: true,
    };
  }

  const currentLocale = getLocaleFromPathname(pathname);
  if (!currentLocale) {
    return { href: localeHomePath(targetLocale), translationMissing: false };
  }
  return {
    href: pathname.replace(`/${currentLocale}/`, `/${targetLocale}/`),
    translationMissing: false,
  };
}

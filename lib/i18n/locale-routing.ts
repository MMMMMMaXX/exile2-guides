/** 文件职责：集中处理公开 URL 的语言识别、浏览器语言回退和语言首页路径生成。 */
import {
  contentTypeSegments,
  supportedLocales,
  type ContentLocale,
} from "../content/constants";
import type { StaticContentPageMap } from "../content/content-page";

const simplifiedChineseLocalePattern = /^zh(?:-(?:cn|sg|hans))(?:-|$)/;

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
 * 根据浏览器首选语言选择 MVP 语言。
 * 当前只把简体中文相关标签映射到 zh-cn，其余语言统一回退英文。
 */
export function resolveBrowserLocale(
  browserLanguages: readonly string[] | undefined,
): ContentLocale {
  const primaryLanguage = browserLanguages?.[0]?.trim().toLowerCase();
  if (
    primaryLanguage === "zh" ||
    (primaryLanguage && simplifiedChineseLocalePattern.test(primaryLanguage))
  ) {
    return "zh-cn";
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

/**
 * 优先按共享 contentId 定位目标译文。
 * 若详情页译文缺失，则回退到目标语言分类并携带提示标记；固定双语页面保留原路径。
 */
export function resolveLanguageSwitchTarget(
  pathname: string,
  targetLocale: ContentLocale,
  pages: StaticContentPageMap,
): LanguageSwitchTarget {
  const currentPage = pages[pathname];
  if (currentPage) {
    const translation = Object.values(pages).find(
      (candidate) =>
        candidate.frontMatter.contentId === currentPage.frontMatter.contentId &&
        candidate.frontMatter.locale === targetLocale,
    );
    if (translation) {
      const { contentType, slug } = translation.frontMatter;
      return {
        href: `/${targetLocale}/${contentTypeSegments[contentType]}/${slug}/`,
        translationMissing: false,
      };
    }

    const segment = contentTypeSegments[currentPage.frontMatter.contentType];
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

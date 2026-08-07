/** 文件职责：集中语言元数据查询与跨子域语言 Cookie 约定，供切换器、SEO 与布局复用。 */
import {
  defaultLocale,
  localeMeta,
  supportedLocales,
  type ContentLocale,
} from "../content/constants";

/** 统一的父域语言 Cookie 名（与 StratLore 主站、Block Out 站保持一致）。 */
export const STRATLORE_LOCALE_COOKIE = "stratlore_locale";

/** 父域 Cookie 域，使语言偏好可跨 poe2/主站/Block Out 三个子域读取。 */
export const LOCALE_COOKIE_DOMAIN = ".stratlore.com";

/** 一年有效期（秒），与三个仓库的 locale contract 一致。 */
export const LOCALE_COOKIE_MAX_AGE = 31_536_000;

/** 读取某语言的完整元数据；未知语言回退英语元数据。 */
export function getLocaleMeta(locale: ContentLocale) {
  return localeMeta[locale];
}

/** 返回 hreflang 值（用于 <link rel="alternate" hreflang>）。 */
export function getHrefLang(locale: ContentLocale): string {
  return localeMeta[locale].hreflang;
}

/** 返回 <html lang> 与 Open Graph 使用的语言区域值。 */
export function getHtmlLang(locale: ContentLocale): string {
  return localeMeta[locale].htmlLang;
}

/** 返回 Open Graph locale 格式（下划线分隔，如 pt_BR）。 */
export function getOgLocale(locale: ContentLocale): string {
  return localeMeta[locale].ogLocale;
}

/** 语言切换器展示用的有序语言列表（含 label 与 hreflang）。 */
export function getLocaleSwitcherOptions() {
  return supportedLocales.map((locale) => ({
    hrefLang: localeMeta[locale].hreflang,
    label: localeMeta[locale].label,
    locale,
  }));
}

/** 判断给定字符串是否为受支持语言。 */
export function isSupportedLocale(
  value: string | undefined,
): value is ContentLocale {
  return supportedLocales.includes(value as ContentLocale);
}

/**
 * 保存用户主动选择的语言。
 * 同时写入 localStorage（站内即时生效）与父域 Cookie（跨子域共享）。
 * 任一存储失败都不影响 URL 导航这一核心行为。
 */
export function saveLocalePreference(locale: ContentLocale): void {
  try {
    localStorage.setItem("exile2-guides-locale", locale);
  } catch {
    // 隐私模式可能禁用 localStorage；语言 URL 仍是完整可分享的状态来源。
  }
  try {
    document.cookie = [
      `${STRATLORE_LOCALE_COOKIE}=${locale}`,
      `Domain=${LOCALE_COOKIE_DOMAIN}`,
      "Path=/",
      "SameSite=Lax",
      "Secure",
      `Max-Age=${LOCALE_COOKIE_MAX_AGE}`,
    ].join("; ");
  } catch {
    // 非浏览器环境或 Cookie 被禁用时静默跳过；URL 仍是权威状态来源。
  }
}

/** 从 Cookie 或 localStorage 读取已保存的语言偏好；缺失或不合法时返回 undefined。 */
export function readSavedLocalePreference(): ContentLocale | undefined {
  try {
    const match = document.cookie
      .split("; ")
      .find((pair) => pair.startsWith(`${STRATLORE_LOCALE_COOKIE}=`));
    const cookieLocale = match?.split("=")[1] as ContentLocale | undefined;
    if (cookieLocale && isSupportedLocale(cookieLocale)) return cookieLocale;
  } catch {
    // Cookie 不可用时忽略。
  }
  try {
    const stored = localStorage.getItem(
      "exile2-guides-locale",
    ) as ContentLocale | null;
    if (stored && isSupportedLocale(stored)) return stored;
  } catch {
    // localStorage 不可用时忽略。
  }
  return undefined;
}

/** 语言优先级：URL 语言 > Cookie/localStorage > 浏览器语言 > 英语。 */
export { defaultLocale };

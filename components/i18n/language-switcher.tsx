/** 文件职责：提供同内容优先、缺译文安全回退的全站语言切换入口。 */
import { useLocation } from "react-router";

import type { ContentLocale } from "../../lib/content/constants";
import type { StaticContentPageMap } from "../../lib/content/content-page";
import {
  getLocaleFromPathname,
  resolveLanguageSwitchTarget,
} from "../../lib/i18n/locale-routing";

const localeOptions = [
  { label: "EN", lang: "en", locale: "en" },
  { label: "简体中文", lang: "zh-CN", locale: "zh-cn" },
] as const;

/** 保存用户主动选择；存储失败不影响 URL 导航这一核心行为。 */
function saveLocalePreference(locale: ContentLocale): void {
  try {
    localStorage.setItem("exile2-guides-locale", locale);
  } catch {
    // 隐私模式可能禁用存储；语言 URL 本身仍是完整、可分享的状态来源。
  }
}

/** 渲染两种语言的稳定链接，并按构建期已发布内容映射决定目标。 */
export function LanguageSwitcher({ pages }: { pages: StaticContentPageMap }) {
  const { pathname } = useLocation();
  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <nav
      className="site-header__languages"
      aria-label={currentLocale === "zh-cn" ? "语言选择" : "Language selection"}
    >
      {localeOptions.map((option) => {
        const target = resolveLanguageSwitchTarget(
          pathname,
          option.locale,
          pages,
        );
        return (
          <a
            aria-current={currentLocale === option.locale ? "page" : undefined}
            className="site-header__language"
            data-translation-missing={target.translationMissing || undefined}
            href={target.href}
            hrefLang={option.lang}
            key={option.locale}
            lang={option.lang}
            onClick={() => saveLocalePreference(option.locale)}
          >
            {option.label}
          </a>
        );
      })}
    </nav>
  );
}

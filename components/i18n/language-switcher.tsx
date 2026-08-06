/** 文件职责：提供同内容优先、缺译文安全回退的全站语言下拉切换入口，覆盖 10 种语言。 */
import { useState } from "react";
import { useLocation } from "react-router";

import type { ContentLocale } from "../../lib/content/constants";
import type { StaticContentRouteMap } from "../../lib/content/content-page";
import {
  getLocaleFromPathname,
  resolveLanguageSwitchTarget,
} from "../../lib/i18n/locale-routing";
import {
  getLocaleSwitcherOptions,
  saveLocalePreference,
} from "../../lib/i18n/locale-meta";

/** 渲染当前语言按钮与十种语言的下拉入口，并按构建期内容映射决定目标。 */
export function LanguageSwitcher({
  routes,
}: {
  routes: StaticContentRouteMap;
}) {
  const { pathname } = useLocation();
  // 根语言选择页没有语言段时按英文默认值渲染，移动端仍只显示一个可切换目标。
  const currentLocale = getLocaleFromPathname(pathname) ?? "en";
  const [isOpen, setIsOpen] = useState(false);
  const localeOptions = getLocaleSwitcherOptions();
  const currentOption = localeOptions.find(
    (option) => option.locale === currentLocale,
  )!;

  return (
    <nav
      className="site-header__languages"
      aria-label={currentLocale === "zh-cn" ? "语言选择" : "Language selection"}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="site-header__language-toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true">◎</span>
        <span>{currentOption.label}</span>
        <span aria-hidden="true">⌄</span>
      </button>
      {isOpen ? (
        <div className="site-header__language-menu" role="menu">
          {localeOptions.map((option) => {
            const target = resolveLanguageSwitchTarget(
              pathname,
              option.locale as ContentLocale,
              routes,
            );
            return (
              <a
                aria-current={
                  currentLocale === option.locale ? "page" : undefined
                }
                className="site-header__language"
                data-translation-missing={
                  target.translationMissing || undefined
                }
                href={target.href}
                hrefLang={option.hrefLang}
                key={option.locale}
                lang={option.hrefLang}
                onClick={() => {
                  saveLocalePreference(option.locale as ContentLocale);
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                <span className="site-header__language-icon" aria-hidden="true">
                  ◎
                </span>
                <span className="site-header__language-label">
                  {option.label}
                </span>
              </a>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
}

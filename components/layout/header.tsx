/** 文件职责：提供原型 V2 风格的全站主导航、搜索入口、语言入口和移动菜单控制。 */
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router";

import type { ContentLocale } from "../../lib/content/constants";
import type { StaticContentRouteMap } from "../../lib/content/content-page";
import { t } from "../../lib/i18n/ui";
import { resolveImageAsset } from "../../lib/assets/image-assets";
import {
  getLocaleFromPathname,
  localeHomePath,
} from "../../lib/i18n/locale-routing";
import { LanguageSwitcher } from "../i18n/language-switcher";
import { availablePrimaryNavigation, navigationLabel } from "./site-navigation";

/** 站点 Logo 图片资源路径。 */
const siteLogoSrc = resolveImageAsset("/images/logo.png");

/** 根据当前 URL 判断一级栏目，后续分类页注册后不需要在组件中复制路由规则。 */
function getActiveNavigationId(pathname: string): string | undefined {
  return availablePrimaryNavigation.find((item) =>
    pathname.includes(`/${item.id}/`),
  )?.id;
}

/** 水合状态不依赖外部订阅；空订阅用于为服务端与客户端提供稳定的快照边界。 */
function subscribeToHydration() {
  return () => undefined;
}

/** 渲染共享页头；未注册的未来页面以禁用状态展示，避免当前版本生成 404 内链。 */
export function Header({
  contentRoutes = {},
}: {
  contentRoutes?: StaticContentRouteMap;
}) {
  const { pathname } = useLocation();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeNavigationId = getActiveNavigationId(pathname);
  const currentLocale = getLocaleFromPathname(pathname);
  const locale: ContentLocale = currentLocale ?? "en";
  const brandHref = currentLocale ? localeHomePath(currentLocale) : "/";
  const hasPrimaryNavigation = availablePrimaryNavigation.length > 0;

  // 菜单展开时支持 Escape 收起，避免键盘用户必须反向遍历所有导航项。
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  // “/” 快捷键只负责进入现有静态搜索页，不复制另一套搜索索引或结果逻辑。
  useEffect(() => {
    /** 在非输入状态下将“/”转换为当前语言的搜索页导航。 */
    function openSearchOnShortcut(event: KeyboardEvent) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable);
      if (event.key !== "/" || isTyping || event.metaKey || event.ctrlKey) {
        return;
      }
      event.preventDefault();
      window.location.assign(`/${locale}/search/`);
    }

    document.addEventListener("keydown", openSearchOnShortcut);
    return () => document.removeEventListener("keydown", openSearchOnShortcut);
  }, [locale]);

  /** 切换移动菜单，并用 aria-expanded 保持读屏状态与实际界面同步。 */
  function toggleMobileMenu() {
    setIsMenuOpen((previousValue) => !previousValue);
  }

  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <a
          className="site-brand"
          href={brandHref}
          aria-label="Exile2 Guides home"
        >
          <img
            className="site-brand__logo"
            src={siteLogoSrc}
            srcSet={`${siteLogoSrc} 80w`}
            sizes="3rem"
            alt="POE2 Guides"
            width="40"
            height="48"
            decoding="async"
            fetchPriority="high"
          />
        </a>

        {hasPrimaryNavigation ? (
          <>
            <button
              className="site-header__menu-button"
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={isMenuOpen}
              aria-label={t(locale, "header.toggleNav")}
              disabled={!isHydrated}
              onClick={toggleMobileMenu}
            >
              <span aria-hidden="true">☰</span>
            </button>

            <nav
              id="primary-navigation"
              className={`site-header__navigation${isMenuOpen ? " is-open" : ""}`}
              aria-label={t(locale, "header.navAria")}
            >
              <ul>
                <li>
                  <a
                    className="site-header__nav-item"
                    href={brandHref}
                    aria-current={
                      pathname === brandHref ||
                      pathname === brandHref.slice(0, -1)
                        ? "page"
                        : undefined
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(locale, "nav.home")}
                  </a>
                </li>
                {availablePrimaryNavigation.map((item) => (
                  <li key={item.id}>
                    <a
                      className="site-header__nav-item"
                      href={`/${locale}/${item.id}/`}
                      aria-current={
                        activeNavigationId === item.id ? "page" : undefined
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {navigationLabel(locale, item.id)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <div className="site-header__navigation" />
        )}

        <div
          className="site-header__utilities"
          aria-label={t(locale, "header.utilitiesAria")}
        >
          <a
            className="site-header__search"
            href={`/${locale}/search/`}
            aria-label={t(locale, "header.searchLabel")}
          >
            <span aria-hidden="true">⌕</span>
            <span>{t(locale, "header.searchPlaceholder")}</span>
            <kbd aria-hidden="true">/</kbd>
          </a>
          <LanguageSwitcher routes={contentRoutes} />
        </div>
      </div>
    </header>
  );
}

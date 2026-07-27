/** 文件职责：提供全站主导航、语言入口和可访问的移动端菜单控制。 */
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router";

import type { StaticContentPageMap } from "../../lib/content/content-page";
import {
  getLocaleFromPathname,
  localeHomePath,
} from "../../lib/i18n/locale-routing";
import { LanguageSwitcher } from "../i18n/language-switcher";
import {
  availablePrimaryNavigation,
  primaryNavigation,
} from "./site-navigation";

/** 根据当前 URL 判断一级栏目，后续分类页注册后不需要在组件中复制路由规则。 */
function getActiveNavigationId(pathname: string): string | undefined {
  return primaryNavigation.find((item) => pathname.includes(`/${item.id}/`))
    ?.id;
}

/** 水合状态不依赖外部订阅；空订阅用于为服务端与客户端提供稳定的快照边界。 */
function subscribeToHydration() {
  return () => undefined;
}

/** 渲染共享页头；未注册的未来页面以禁用状态展示，避免当前版本生成 404 内链。 */
export function Header({
  contentPages = {},
}: {
  contentPages?: StaticContentPageMap;
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
  const brandHref = currentLocale ? localeHomePath(currentLocale) : "/";
  const hasPrimaryNavigation = availablePrimaryNavigation.length > 0;
  const zh = currentLocale === "zh-cn";

  // 菜单展开时支持 Escape 收起，避免键盘用户必须反向遍历所有导航项。
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

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
          <span className="site-brand__mark" aria-hidden="true">
            E2
          </span>
          <span>Exile2 Guides</span>
        </a>

        {hasPrimaryNavigation ? (
          <>
            <button
              className="site-header__menu-button"
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={isMenuOpen}
              aria-label={zh ? "切换主导航菜单" : "Toggle navigation menu"}
              disabled={!isHydrated}
              onClick={toggleMobileMenu}
            >
              <span aria-hidden="true">☰</span>
            </button>

            <nav
              id="primary-navigation"
              className={`site-header__navigation${isMenuOpen ? " is-open" : ""}`}
              aria-label={zh ? "主导航" : "Primary navigation"}
            >
              <ul>
                {availablePrimaryNavigation.map((item) => (
                  <li key={item.id}>
                    <a
                      className="site-header__nav-item"
                      href={`/${currentLocale ?? "en"}/${item.id}/`}
                      aria-current={
                        activeNavigationId === item.id ? "page" : undefined
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
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
          aria-label={zh ? "站点工具" : "Site utilities"}
        >
          <a
            className="site-header__search"
            href={`/${currentLocale ?? "en"}/search/`}
          >
            Search
          </a>
          <LanguageSwitcher pages={contentPages} />
        </div>
      </div>
    </header>
  );
}

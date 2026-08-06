/** 文件职责：提供全站品牌、非官方声明、分类入口和法律信息的统一页脚。 */
import { useLocation } from "react-router";

import type { ContentLocale } from "../../lib/content/constants";
import { t } from "../../lib/i18n/ui";
import { getLocaleFromPathname } from "../../lib/i18n/locale-routing";
import {
  availablePrimaryNavigation,
  footerInformationLinks,
  informationLinkLabel,
  navigationLabel,
} from "./site-navigation";

/** 返回当前年份，集中在渲染时读取以免每年维护静态文案。 */
function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** 渲染共享页脚；全部入口使用当前语言前缀，避免跳转到根路径或不存在的语言页面。 */
export function Footer() {
  const locale: ContentLocale =
    getLocaleFromPathname(useLocation().pathname) ?? "en";

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <section className="site-footer__brand" aria-labelledby="footer-brand">
          <h2 id="footer-brand">Exile2 Guides</h2>
          <p>{t(locale, "footer.tagline")}</p>
          <p className="site-footer__disclaimer">
            {t(locale, "footer.disclaimer")}
          </p>
        </section>

        <nav aria-label={t(locale, "footer.guidesHeading")}>
          <h2>{t(locale, "footer.guidesHeading")}</h2>
          <ul className="site-footer__link-list">
            {availablePrimaryNavigation.map((item) => (
              <li key={item.id}>
                <a href={`/${locale}/${item.id}/`}>
                  {navigationLabel(locale, item.id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t(locale, "footer.infoHeading")}>
          <h2>{t(locale, "footer.infoHeading")}</h2>
          <ul className="site-footer__link-list">
            {footerInformationLinks.map((item) => (
              <li key={item.slug}>
                <a href={`/${locale}/${item.slug}/`}>
                  {informationLinkLabel(locale, item.slug)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="page-shell site-footer__copyright">
        © {getCurrentYear()} Exile2 Guides. {t(locale, "footer.copyright")}
      </div>
    </footer>
  );
}

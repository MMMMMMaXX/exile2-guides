/** 文件职责：提供全站品牌、非官方声明、分类入口和法律信息的统一页脚。 */
import { useLocation } from "react-router";

import { getLocaleFromPathname } from "../../lib/i18n/locale-routing";
import { footerInformationLinks, primaryNavigation } from "./site-navigation";

/** 返回当前年份，集中在渲染时读取以免每年维护静态文案。 */
function getCurrentYear(): number {
  return new Date().getFullYear();
}

/** 渲染共享页脚；全部入口使用当前语言前缀，避免跳转到根路径或不存在的语言页面。 */
export function Footer() {
  const locale = getLocaleFromPathname(useLocation().pathname) ?? "en";

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <section className="site-footer__brand" aria-labelledby="footer-brand">
          <h2 id="footer-brand">Exile2 Guides</h2>
          <p>
            Clear, patch-aware guides for Path of Exile 2 builds, bosses, items,
            skills and progression.
          </p>
          <p className="site-footer__disclaimer">
            Exile2 Guides is an unofficial fan-made guide site and is not
            affiliated with or endorsed by Grinding Gear Games.
          </p>
        </section>

        <nav aria-label="Guide categories">
          <h2>Guides</h2>
          <ul className="site-footer__link-list">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <a href={`/${locale}/${item.id}/`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site information">
          <h2>Information</h2>
          <ul className="site-footer__link-list">
            {footerInformationLinks.map((item) => (
              <li key={item.slug}>
                <a href={`/${locale}/${item.slug}/`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="page-shell site-footer__copyright">
        © {getCurrentYear()} Exile2 Guides. All rights reserved.
      </div>
    </footer>
  );
}

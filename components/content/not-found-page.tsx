/** 文件职责：统一渲染未知路径的可恢复 404 内容，避免将用户和搜索引擎重定向至首页。 */
import { resolveImageAsset } from "../../lib/assets/image-assets";
import type { ContentLocale } from "../../lib/content/constants";
import { t } from "../../lib/i18n/ui";
import { navigationLabel } from "../layout/site-navigation";

const notFoundImage = resolveImageAsset("/images/prototype-v4/hero-home.webp");

/** 提供返回首页、搜索与热门分类的明确出口，不使用自动跳转掩盖错误地址。 */
export function NotFoundPage({ locale = "en" }: { locale?: ContentLocale }) {
  const homePath = `/${locale}/`;
  return (
    <main className="not-found-page" data-prerender-content="true">
      <section className="page-shell not-found-page__grid">
        <div>
          <span className="not-found-page__code">404</span>
          <p className="eyebrow">{t(locale, "notFound.eyebrow")}</p>
          <h1>{t(locale, "notFound.title")}</h1>
          <p className="text-lead">{t(locale, "notFound.lead")}</p>
          <div className="not-found-page__actions">
            <a className="button" href={homePath}>
              {t(locale, "notFound.returnHome")}
            </a>
            <a className="button button--secondary" href={`/${locale}/search/`}>
              {t(locale, "notFound.searchGuides")}
            </a>
          </div>
          <nav
            aria-label={t(locale, "notFound.popular")}
            className="not-found-page__links"
          >
            <a href={`/${locale}/builds/`}>
              {navigationLabel(locale, "builds")}
            </a>
            <a href={`/${locale}/bosses/`}>
              {navigationLabel(locale, "bosses")}
            </a>
            <a href={`/${locale}/guides/`}>
              {navigationLabel(locale, "guides")}
            </a>
          </nav>
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="not-found-page__image"
          decoding="async"
          height="788"
          loading="lazy"
          sizes="(max-width: 920px) calc(100vw - 2rem), 42vw"
          src={notFoundImage}
          srcSet={`${notFoundImage} 1400w`}
          width="1400"
        />
      </section>
    </main>
  );
}

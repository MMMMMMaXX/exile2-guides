/** 文件职责：提供无语言入口的英语重定向页，避免根路径成为重复首页。 */
import { InitialLocaleRedirect } from "../../components/i18n/initial-locale-redirect";
import { StructuredData } from "../../components/seo/structured-data";
import { createWebSiteJsonLd } from "../../lib/seo/structured-data";
import {
  createAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { localeMeta, supportedLocales } from "../../lib/content/constants";

/** 返回根语言选择页的基础 Metadata，完整 SEO 契约将在后续任务统一扩展。 */
export function meta() {
  return createSeoMetadata({
    alternatePaths: createAlternatePaths(""),
    description: "Choose your language for Exile2 Guides.",
    locale: "en",
    path: "/en/",
    title: "Exile2 Guides | Choose your language",
  });
}

/** 渲染带无脚本兜底的英语重定向页；语言入口仍可由站内选择器访问。 */
export default function IndexRoute() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <StructuredData data={createWebSiteJsonLd()} />
      <main className="page-shell language-landing">
        <InitialLocaleRedirect />
        <section className="language-landing__panel">
          <p className="eyebrow">Unofficial Path of Exile 2 guide site</p>
          <h1>Exile2 Guides</h1>
          <p className="text-lead">
            Choose your language to read patch-aware guides for Path of Exile 2.
          </p>
          <div className="language-landing__choices">
            {supportedLocales.map((locale) => (
              <a key={locale} href={`/${locale}/`}>
                <strong>{localeMeta[locale].label}</strong>
                <span>Path of Exile 2 guides</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

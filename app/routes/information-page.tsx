/** 文件职责：以 V4 信息页布局渲染多语言 About、Contact 与法律内容，支持段落、列表、卡片网格与表格。 */
import { useParams } from "react-router";

import { Breadcrumbs } from "../../components/layout/breadcrumbs";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import {
  getInformationPageCopy,
  isInformationPageSlug,
  type InformationPageSlug,
} from "../../lib/i18n/information-copy";
import { t } from "../../lib/i18n/ui";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";

/** 校验语言和指定静态页段；静态路由包装器会传入受控的 slug。 */
function getInformationRoute(
  localeValue: string | undefined,
  slug: InformationPageSlug,
): { locale: ContentLocale; slug: InformationPageSlug } | undefined {
  const locale = localeValue as ContentLocale | undefined;
  return locale &&
    supportedLocales.includes(locale) &&
    isInformationPageSlug(slug)
    ? { locale, slug }
    : undefined;
}

/** 为各个静态信息路由生成共用 Metadata，避免在六个包装器中复制政策文案。 */
export function createInformationMeta(slug: InformationPageSlug) {
  return ({ params }: { params: Record<string, string | undefined> }) => {
    const route = getInformationRoute(params.locale, slug);
    if (!route) return [{ title: "Not Found | Exile2 Guides" }];

    const copy = getInformationPageCopy(route.locale, route.slug);
    return createSeoMetadata({
      alternatePaths: createBilingualAlternatePaths(`${route.slug}/`),
      description: copy.description,
      locale: route.locale,
      path: `/${route.locale}/${route.slug}/`,
      title: `${copy.title} | Exile2 Guides`,
    });
  };
}

/** 渲染指定静态信息页正文；全部文案来自受控本地副本，不依赖网络或用户数据。 */
export function InformationPage({ slug }: { slug: InformationPageSlug }) {
  const route = getInformationRoute(useParams().locale, slug);
  if (!route) {
    return (
      <main className="page-shell">
        <h1>Not Found</h1>
      </main>
    );
  }

  const copy = getInformationPageCopy(route.locale, route.slug);
  return (
    <main className="v4-information-page" data-prerender-content="true">
      <div className="page-shell">
        <Breadcrumbs
          items={[
            { label: t(route.locale, "nav.home"), path: `/${route.locale}/` },
            { label: copy.title, path: `/${route.locale}/${route.slug}/` },
          ]}
        />
      </div>
      <header className="v4-information-page__hero">
        <div className="page-shell">
          <p className="eyebrow">Exile2 Guides</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
      </header>
      <div className="page-shell v4-information-page__layout">
        <nav
          className="v4-information-page__rail"
          aria-label={t(route.locale, "info.onThisPage")}
        >
          {copy.sections.map((section, index) => (
            <a href={`#information-${index + 1}`} key={section.title}>
              {section.title}
            </a>
          ))}
        </nav>
        <div className="v4-information-page__content">
          {copy.sections.map((section, index) => (
            <section id={`information-${index + 1}`} key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.connectionLinks ? (
                  <div className="info-connection-grid">
                    {section.connectionLinks.map((link) => (
                      <a href={link.href} key={link.href}>
                        <strong>{link.label}</strong>
                        <span>{link.description}</span>
                      </a>
                    ))}
                  </div>
                ) : null}
                {section.issueCards ? (
                  <div className="info-issue-grid">
                    {section.issueCards.map((card) => (
                      <article key={card.title}>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
                {section.table ? (
                  <div className="info-table-wrap">
                    <table className="info-table">
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

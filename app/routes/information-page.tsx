/** 文件职责：渲染多语言 About、Contact 与法律信息页，保证它们在构建时输出完整可读 HTML。 */
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
    <main className="page-shell information-page" data-prerender-content="true">
      <Breadcrumbs
        items={[
          { label: "Home", path: `/${route.locale}/` },
          { label: copy.title, path: `/${route.locale}/${route.slug}/` },
        ]}
      />
      <header className="information-page__header">
        <p className="eyebrow">Exile2 Guides</p>
        <h1>{copy.title}</h1>
      </header>
      <div className="information-page__content">
        {copy.sections.map((section) => (
          <section key={section.title}>
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
          </section>
        ))}
      </div>
    </main>
  );
}

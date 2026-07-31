/** 文件职责：以 V4 信息页布局渲染多语言 About、Contact 与法律内容，支持段落、列表、卡片网格、表格与表单。 */
import { useState } from "react";
import { useParams } from "react-router";

import { Breadcrumbs } from "../../components/layout/breadcrumbs";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import {
  getInformationPageCopy,
  isInformationPageSlug,
  type InformationContactField,
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

/** 渲染单个表单字段，按类型输出 select / input / textarea。 */
function ContactFormField({
  field,
  locale,
}: {
  field: InformationContactField;
  locale: ContentLocale;
}) {
  const placeholder =
    locale === "zh-cn"
      ? field.type === "select"
        ? `请选择`
        : field.type === "email"
          ? "your@email.com"
          : field.type === "url"
            ? "https://..."
            : ""
      : field.type === "select"
        ? "Select"
        : field.type === "email"
          ? "your@email.com"
          : field.type === "url"
            ? "https://..."
            : "";

  return (
    <label>
      {field.label}
      {field.type === "select" ? (
        <select name={field.name} required={field.required}>
          <option value="">{placeholder}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          name={field.name}
          placeholder={placeholder}
          required={field.required}
          rows={6}
        />
      ) : (
        <input
          name={field.name}
          placeholder={placeholder}
          required={field.required}
          type={field.type}
        />
      )}
    </label>
  );
}

/** 渲染联系表单，包含客户端校验和提交反馈。 */
function ContactForm({
  form,
  locale,
}: {
  form: NonNullable<
    ReturnType<typeof getInformationPageCopy>["form"]
  >;
  locale: ContentLocale;
}) {
  const [submitted, setSubmitted] = useState(false);
  const zh = locale === "zh-cn";

  /** 阻止默认提交并展示校验通过提示（MVP 无后端）。 */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className="info-contact-form"
      onSubmit={handleSubmit}
    >
      {form.fields.map((field) => (
        <ContactFormField field={field} key={field.name} locale={locale} />
      ))}
      <button className="info-contact-form__submit" type="submit">
        {form.submitLabel}
      </button>
      {submitted ? (
        <p className="info-contact-form__message" aria-live="polite">
          {zh
            ? "✓ 表单校验通过。当前 MVP 尚未接入后端，消息未实际发送。"
            : "✓ Form validated. The current MVP has no backend — message was not actually sent."}
        </p>
      ) : null}
    </form>
  );
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
            { label: "Home", path: `/${route.locale}/` },
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
          aria-label={route.locale === "zh-cn" ? "本页目录" : "On this page"}
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
          {copy.form ? (
            <section className="v4-information-page__form-section">
              <ContactForm form={copy.form} locale={route.locale} />
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}

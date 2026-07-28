/** 文件职责：渲染 English 与简体中文独立首页，并从构建期生产内容中提供真实入口。 */
import { useParams } from "react-router";
import contentPages from "virtual:content-pages";

import type { Route } from "./+types/home";
import { CategoryCardList } from "../../components/content/category-card-list";
import { getHomeContentItems } from "../../lib/content/home-content";
import { getHomeCopy } from "../../lib/i18n/home-copy";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";

/** 返回对应语言首页的静态 Metadata，未知语言由路由级 404 文案处理。 */
export function meta({ params }: Route.MetaArgs) {
  const copy = getHomeCopy(params.locale);
  if (!copy) return [{ title: "Not Found | Exile2 Guides" }];
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(),
    description: copy.metaDescription,
    locale: params.locale as "en" | "zh-cn",
    path: `/${params.locale}/`,
    title: copy.metaTitle,
  });
}

/** 渲染当前语言首页；内容卡片只消费构建期已发布页面，避免重新发现草稿。 */
export default function HomeRoute() {
  const locale = useParams().locale;
  const copy = getHomeCopy(locale);
  if (!copy) {
    return (
      <main className="page-shell home-page home-page--not-found">
        <h1>Not Found</h1>
      </main>
    );
  }
  const items = getHomeContentItems(contentPages, locale as "en" | "zh-cn");

  return (
    <main className="page-shell home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="home-title">{copy.heroTitle}</h1>
        <p className="text-lead">{copy.description}</p>
        <div className="home-hero__actions">
          <a className="button button--primary" href={`/${locale}/guides/`}>
            {copy.primaryCta}
          </a>
          <a className="button button--secondary" href={`/${locale}/patches/`}>
            {copy.secondaryCta}
          </a>
        </div>
      </section>

      <section
        id="content-status"
        className="home-content-status"
        aria-labelledby="content-status-title"
      >
        <p className="eyebrow">Content status</p>
        <h2 id="content-status-title">{copy.contentStatusTitle}</h2>
        <p className="text-lead">{copy.contentStatusDescription}</p>
        <CategoryCardList
          copy={{
            emptyDescription: copy.emptyDescription,
            emptyTitle: copy.emptyTitle,
          }}
          items={items}
          locale={locale as "en" | "zh-cn"}
        />
      </section>
    </main>
  );
}

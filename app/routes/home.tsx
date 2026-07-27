/** 文件职责：渲染 English 与简体中文独立首页，且不在无已发布内容时伪造攻略数据。 */
import { useParams } from "react-router";

import type { Route } from "./+types/home";
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

/** 渲染当前语言的首页；暂未发布内容时保留真实状态而不使用占位卡片。 */
export default function HomeRoute() {
  const copy = getHomeCopy(useParams().locale);
  if (!copy) {
    return (
      <main className="page-shell home-page home-page--not-found">
        <h1>Not Found</h1>
      </main>
    );
  }

  return (
    <main className="page-shell home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="home-title">{copy.heroTitle}</h1>
        <p className="text-lead">{copy.description}</p>
        <div className="home-hero__actions">
          <a className="button button--primary" href="#content-status">
            {copy.ctaBuilds}
          </a>
          <a className="button button--secondary" href="#content-status">
            {copy.ctaGuides}
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
      </section>
    </main>
  );
}

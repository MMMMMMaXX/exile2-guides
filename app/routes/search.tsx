/** 文件职责：注册语言隔离、构建期预渲染且默认 noindex 的站内搜索页面。 */
import { useParams } from "react-router";
import searchIndexes from "virtual:search-indexes";

import type { Route } from "./+types/search";
import { SearchPage } from "../../components/search/search-page";
import { getV4SkeletonSearchDocuments } from "../../lib/content/v4-taxonomy";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";

/** 为搜索页输出固定 noindex Metadata，避免任意关键词 URL 成为可索引变体。 */
export function meta({ params }: Route.MetaArgs) {
  const locale = params.locale as ContentLocale | undefined;
  const zh = locale === "zh-cn";
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths("search/"),
    description: zh
      ? "搜索当前语言的已发布 Path of Exile 2 攻略。"
      : "Search published Path of Exile 2 guides in the current language.",
    locale: zh ? "zh-cn" : "en",
    path: `/${zh ? "zh-cn" : "en"}/search/`,
    robots: "noindex, follow",
    title: zh ? "站内搜索 | Exile2 Guides" : "Search | Exile2 Guides",
  });
}

/** 渲染当前语言搜索；未知 locale 不读取任何跨语言索引。 */
export default function SearchRoute() {
  const locale = useParams().locale as ContentLocale | undefined;
  if (!locale || !supportedLocales.includes(locale))
    return (
      <main className="page-shell">
        <h1>Not Found</h1>
      </main>
    );
  const documents = [
    ...searchIndexes[locale],
    ...getV4SkeletonSearchDocuments(locale),
  ];
  return <SearchPage documents={documents} locale={locale} />;
}

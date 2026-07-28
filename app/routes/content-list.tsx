/** 文件职责：提供各内容分类的静态列表路由，并让 Build 使用真实数据驱动的轻量筛选页面。 */
import { useParams, useSearchParams } from "react-router";
import contentPages from "virtual:content-pages";

import type { Route } from "./+types/content-list";
import { BuildList } from "../../components/builds/build-list";
import { BossList } from "../../components/bosses/boss-list";
import { CategoryCardList } from "../../components/content/category-card-list";
import { ItemList } from "../../components/items/item-list";
import { NotFoundPage } from "../../components/content/not-found-page";
import { CategoryHero } from "../../components/catalog/category-hero";
import { getBuildListItems } from "../../lib/content/build-list";
import { getBossListItems } from "../../lib/content/boss-list";
import { getCategoryListItems } from "../../lib/content/category-list";
import {
  contentTypeSegments,
  supportedLocales,
  type ContentLocale,
  type ContentType,
} from "../../lib/content/constants";
import { getItemListItems } from "../../lib/content/item-list";
import { getCategoryCopy } from "../../lib/i18n/category-copy";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { getNotFoundMeta } from "../../lib/seo/not-found";

const contentTypeBySegment = new Map<string, ContentType>(
  Object.entries(contentTypeSegments).map(([contentType, segment]) => [
    segment,
    contentType as ContentType,
  ]),
);

/** 解析列表路由参数；未知语言或分类不会伪装成可索引的空页面。 */
function getListRoute(
  params: Record<string, string | undefined>,
): { contentType: ContentType; locale: ContentLocale } | undefined {
  const contentType = params.section
    ? contentTypeBySegment.get(params.section)
    : undefined;
  const locale = params.locale as ContentLocale | undefined;
  return locale && supportedLocales.includes(locale) && contentType
    ? { contentType, locale }
    : undefined;
}

/** 生成固定分类 Metadata；内容不足时 noindex，避免空分类页进入搜索消费者。 */
export function meta({ params }: Route.MetaArgs) {
  const route = getListRoute(params);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");

  const copy = getCategoryCopy(route.locale, route.contentType);
  const publishedCount =
    route.contentType === "build"
      ? getBuildListItems(contentPages, route.locale).length
      : route.contentType === "boss"
        ? getBossListItems(contentPages, route.locale).length
        : getCategoryListItems(contentPages, route.locale, route.contentType)
            .length;
  const segment = contentTypeSegments[route.contentType];
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(`${segment}/`),
    description: copy.metaDescription,
    locale: route.locale,
    path: `/${route.locale}/${segment}/`,
    ...(publishedCount < 2 ? { robots: "noindex, follow" } : {}),
    title: copy.metaTitle,
  });
}

/** 渲染分类导语、面包屑与真实空状态；Build 和 Boss 使用各自的 PRD 筛选器。 */
export default function ContentListRoute() {
  const params = useParams();
  const route = getListRoute(params);
  const [searchParams] = useSearchParams();
  if (!route) {
    return <NotFoundPage locale={params.locale === "zh-cn" ? "zh-cn" : "en"} />;
  }

  const copy = getCategoryCopy(route.locale, route.contentType);
  const buildItems =
    route.contentType === "build"
      ? getBuildListItems(contentPages, route.locale)
      : [];
  const bossItems =
    route.contentType === "boss"
      ? getBossListItems(contentPages, route.locale)
      : [];
  const categoryItems = getCategoryListItems(
    contentPages,
    route.locale,
    route.contentType,
  );

  const publishedCount =
    route.contentType === "build"
      ? buildItems.length
      : route.contentType === "boss"
        ? bossItems.length
        : categoryItems.length;

  return (
    <main className="content-list-page" data-prerender-content="true">
      <CategoryHero
        contentType={route.contentType}
        copy={copy}
        locale={route.locale}
        publishedCount={publishedCount}
      />
      {searchParams.get("translation") === "missing" ? (
        <p className="page-shell translation-notice" role="status">
          {route.locale === "zh-cn"
            ? "该内容尚未翻译，已为你打开对应分类。"
            : "This content has not been translated yet. We opened the matching category instead."}
        </p>
      ) : null}
      {route.contentType === "build" ? (
        <BuildList copy={copy} items={buildItems} locale={route.locale} />
      ) : route.contentType === "boss" ? (
        <BossList copy={copy} items={bossItems} locale={route.locale} />
      ) : route.contentType === "item" ? (
        <ItemList
          copy={copy}
          items={getItemListItems(categoryItems)}
          locale={route.locale}
        />
      ) : (
        <CategoryCardList
          copy={copy}
          items={categoryItems}
          locale={route.locale}
        />
      )}
    </main>
  );
}

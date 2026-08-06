/** 文件职责：将六类内容的列表路由收束为 V4 目录页，并保留构建期 SEO 与双语地址。 */
import type { Route } from "./+types/content-list";
import { NotFoundPage } from "../../components/content/not-found-page";
import { V4CatalogPage } from "../../components/v4/catalog-page";
import {
  contentTypeSegments,
  supportedLocales,
  type ContentLocale,
  type ContentType,
} from "../../lib/content/constants";
import { getCategoryListItems } from "../../lib/content/category-list";
import { getCategoryCopy } from "../../lib/i18n/category-copy";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { getNotFoundMeta } from "../../lib/seo/not-found";
import {
  contentCatalogMetrics,
  loadContentCatalog,
} from "../../lib/content/content-catalog";
import { loadStaticContentCatalogForLocale } from "../../lib/content/content-catalog.server";

const contentTypeBySegment = new Map<string, ContentType>(
  Object.entries(contentTypeSegments).map(([type, segment]) => [
    segment,
    type as ContentType,
  ]),
);

/** 只加载当前语言目录，避免分类页为渲染卡片下载其它九种语言。 */
export async function loader({ params }: Route.LoaderArgs) {
  return { catalog: await loadStaticContentCatalogForLocale(params.locale) };
}

/** 客户端导航只加载当前语言目录，避免跨语言重复解析内容卡片。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { catalog: await loadContentCatalog(params.locale) };
}

/** 校验列表路径，不将未知语言或分类渲染为可索引的空目录。 */
function getListRoute(
  params: Record<string, string | undefined>,
): { contentType: ContentType; locale: ContentLocale } | undefined {
  const locale = params.locale as ContentLocale | undefined;
  const contentType = params.section
    ? contentTypeBySegment.get(params.section)
    : undefined;
  return locale && contentType && supportedLocales.includes(locale)
    ? { contentType, locale }
    : undefined;
}

/** 为目录路由保留 canonical、hreflang 和内容不足时的 noindex 策略。 */
export function meta({ params, location }: Route.MetaArgs) {
  const route = getListRoute(params);
  if (!route) return getNotFoundMeta(params.locale as ContentLocale);
  const copy = getCategoryCopy(route.locale, route.contentType);
  const segment = contentTypeSegments[route.contentType];
  const publishedCount =
    contentCatalogMetrics[`${route.locale}/${segment}/`] ?? 0;
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(`${segment}/`),
    description: copy.metaDescription,
    locale: route.locale,
    path: `/${route.locale}/${segment}/`,
    ...(publishedCount < 2 ||
    ((route.contentType === "build" ||
      route.contentType === "boss" ||
      route.contentType === "item" ||
      route.contentType === "skill" ||
      route.contentType === "guide") &&
      location.search)
      ? { robots: "noindex, follow" }
      : {}),
    title: copy.metaTitle,
  });
}

/** 渲染 V4 目录；真实 Markdown 与设计稿的已验证骨架数据在同一筛选器中展示。 */
export default function ContentListRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const route = getListRoute(params);
  if (!route) return <NotFoundPage locale={params.locale as ContentLocale} />;
  return (
    <V4CatalogPage
      contentType={route.contentType}
      items={getCategoryListItems(
        loaderData.catalog,
        route.locale,
        route.contentType,
      )}
      locale={route.locale}
    />
  );
}

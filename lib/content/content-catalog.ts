/** 文件职责：为首页、目录和聚合路由提供当前语言目录的懒加载边界与数量指标。 */
import contentCatalogLoadersModule from "virtual:content-catalog-loaders";
import contentCatalogMetricsModule from "virtual:content-catalog-metrics";

import type {
  StaticContentCatalogMetrics,
  StaticContentCatalogPage,
} from "./content-page";

type CatalogPageMap = Readonly<Record<string, StaticContentCatalogPage>>;
type CatalogLoaders = Readonly<
  Record<string, () => Promise<{ default: CatalogPageMap }>>
>;

const contentCatalogLoaders = contentCatalogLoadersModule as CatalogLoaders;

/** 构建期预计算的数量只服务 Metadata，不携带文章卡片或正文。 */
export const contentCatalogMetrics =
  contentCatalogMetricsModule as StaticContentCatalogMetrics;

/** 加载当前语言目录；跨语言切换由根级路由索引处理，不会重复下载其它语言。 */
export async function loadContentCatalog(
  locale: string | undefined,
): Promise<CatalogPageMap> {
  const load = locale ? contentCatalogLoaders[locale] : undefined;
  return load ? (await load()).default : {};
}

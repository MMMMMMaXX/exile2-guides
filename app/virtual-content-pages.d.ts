/** 文件职责：声明 Vite 构建期内容虚拟模块的只读类型契约。 */
declare module "virtual:content-pages" {
  import type { StaticContentPageMap } from "../lib/content/content-page";

  const pages: StaticContentPageMap;
  export default pages;
}

declare module "virtual:build-draft-preview-pages" {
  import type { StaticContentPageMap } from "../lib/content/content-page";

  const pages: StaticContentPageMap;
  export default pages;
}

declare module "virtual:boss-draft-preview-pages" {
  import type { StaticContentPageMap } from "../lib/content/content-page";

  const pages: StaticContentPageMap;
  export default pages;
}

declare module "virtual:content-catalog" {
  import type { StaticContentCatalogPageMap } from "../lib/content/content-page";

  const pages: StaticContentCatalogPageMap;
  export default pages;
}

declare module "virtual:content-catalog-loaders" {
  import type { StaticContentCatalogPage } from "../lib/content/content-page";

  const loaders: Readonly<
    Record<
      string,
      () => Promise<{
        default: Readonly<Record<string, StaticContentCatalogPage>>;
      }>
    >
  >;
  export default loaders;
}

declare module "virtual:content-catalog-metrics" {
  import type { StaticContentCatalogMetrics } from "../lib/content/content-page";

  const metrics: StaticContentCatalogMetrics;
  export default metrics;
}

declare module "virtual:content-routes" {
  import type { StaticContentRouteMap } from "../lib/content/content-page";

  const routes: StaticContentRouteMap;
  export default routes;
}

declare module "virtual:content-page-loaders" {
  import type { StaticContentPage } from "../lib/content/content-page";

  const loaders: Readonly<
    Record<string, () => Promise<{ default: StaticContentPage }>>
  >;
  export default loaders;
}

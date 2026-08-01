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

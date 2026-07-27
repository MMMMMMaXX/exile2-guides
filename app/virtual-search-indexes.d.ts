/** 文件职责：声明构建期搜索虚拟模块的类型，避免路由将任意 JSON 当作搜索索引。 */
declare module "virtual:search-indexes" {
  import type { SearchIndexByLocale } from "../lib/search/search-index";
  const searchIndexes: SearchIndexByLocale;
  export default searchIndexes;
}

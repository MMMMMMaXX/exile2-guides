/** 文件职责：合并正式页面与仅由本地开发插件提供的 Build 草稿，集中维护运行时可见内容边界。 */
import buildDraftPreviewPages from "virtual:build-draft-preview-pages";
import publishedContentPages from "virtual:content-pages";

/**
 * 列表、详情和语言切换读取该映射。
 * 生产构建中的草稿模块恒为空，因此合并不会改变公开页面、搜索或 Sitemap。
 */
export const locallyVisibleContentPages = Object.freeze({
  ...publishedContentPages,
  ...buildDraftPreviewPages,
});

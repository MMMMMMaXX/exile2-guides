/** 文件职责：枚举当前已注册的公共静态路径，并保证生产清单只接收已发布内容。 */
import type { ContentIndex } from "../content/content-index";
import { loadContentIndex } from "../content/content-index";
import { contentTypeSegments, supportedLocales } from "../content/constants";
import { informationPageSlugs } from "../i18n/information-copy";
import { getV4SubtypePaths } from "../content/v4-taxonomy";

// 这里只维护已经注册且必须公开的固定路由；后续任务新增页面时必须同步扩展。
export const categoryListPaths = supportedLocales.flatMap((locale) =>
  Object.values(contentTypeSegments).map((segment) => `/${locale}/${segment}/`),
);
export const informationPagePaths = supportedLocales.flatMap((locale) =>
  informationPageSlugs.map((slug) => `/${locale}/${slug}/`),
);
const searchPaths = supportedLocales.map((locale) => `/${locale}/search/`);

export const fixedPublicPaths = [
  "/",
  "/en/",
  "/zh-cn/",
  ...categoryListPaths,
  ...informationPagePaths,
  ...searchPaths,
  ...getV4SubtypePaths(),
];

/** 合并固定页面和已发布内容详情页，输出稳定、去重的预渲染路径清单。 */
export function enumeratePublicPaths(index: ContentIndex): string[] {
  const contentPaths = [...index.byRoute.keys()].sort((left, right) =>
    left.localeCompare(right),
  );

  return [...new Set([...fixedPublicPaths, ...contentPaths])];
}

/**
 * 枚举允许被索引的规范路径。
 * 空分类仍会预渲染供导航使用，但只有至少两篇已发布内容时才进入 Sitemap，
 * 防止“Coming soon”式薄内容被搜索引擎发现。
 */
export function enumerateIndexablePaths(index: ContentIndex): string[] {
  const contentPaths = [...index.byRoute.keys()].sort((left, right) =>
    left.localeCompare(right),
  );
  const populatedCategoryPaths = supportedLocales.flatMap((locale) =>
    Object.entries(contentTypeSegments).flatMap(([contentType, segment]) => {
      const count = index.entries.filter(
        (entry) =>
          entry.frontMatter.locale === locale &&
          entry.frontMatter.contentType === contentType,
      ).length;
      return count >= 2 ? [`/${locale}/${segment}/`] : [];
    }),
  );

  return [
    "/",
    "/en/",
    "/zh-cn/",
    ...populatedCategoryPaths,
    ...informationPagePaths,
    ...contentPaths,
  ];
}

/** 从生产内容索引生成 React Router 构建期预渲染清单。 */
export async function getPublicPrerenderPaths(): Promise<string[]> {
  const index = await loadContentIndex();
  return enumeratePublicPaths(index);
}

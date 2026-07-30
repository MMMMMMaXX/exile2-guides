/** 文件职责：枚举当前已注册的公共静态路径，并保证生产清单只接收已发布内容。 */
import type { ContentIndex } from "../content/content-index";
import { loadContentIndex } from "../content/content-index";
import {
  contentRoutePath,
  contentTypeSegments,
  supportedLocales,
} from "../content/constants";
import { informationPageSlugs } from "../i18n/information-copy";
import { getV4SubtypePaths } from "../content/v4-taxonomy";
import {
  buildAscendancySlugs,
  buildClassSlugs,
  matchesBuildCollection,
} from "../builds/taxonomy";
import { buildCategorySlugs } from "../builds/schema";
import { bossActSlugs, bossCategorySlugs } from "../bosses/schema";
import { matchesBossCollection } from "../bosses/taxonomy";
import { itemCategorySlugs } from "../items/schema";
import { matchesItemCollection } from "../items/taxonomy";
import { skillCategorySlugs } from "../skills/schema";
import { matchesSkillCollection } from "../skills/taxonomy";
import { guideCategorySlugs } from "../guides/schema";
import { matchesGuideCollection } from "../guides/taxonomy";
import { patchCategorySlugs } from "../patches/schema";
import { matchesPatchCollection } from "../patches/taxonomy";

// 这里只维护已经注册且必须公开的固定路由；后续任务新增页面时必须同步扩展。
export const categoryListPaths = supportedLocales.flatMap((locale) =>
  Object.values(contentTypeSegments).map((segment) => `/${locale}/${segment}/`),
);
export const informationPagePaths = supportedLocales.flatMap((locale) =>
  informationPageSlugs.map((slug) => `/${locale}/${slug}/`),
);
const searchPaths = supportedLocales.map((locale) => `/${locale}/search/`);
export const buildCollectionPaths = supportedLocales.flatMap((locale) => [
  ...buildClassSlugs.map(
    (classSlug) => `/${locale}/builds/classes/${classSlug}/`,
  ),
  ...buildAscendancySlugs.map(
    (ascendancySlug) => `/${locale}/builds/ascendancies/${ascendancySlug}/`,
  ),
  ...buildCategorySlugs.map(
    (categorySlug) => `/${locale}/builds/${categorySlug}/`,
  ),
]);
export const bossCollectionPaths = supportedLocales.flatMap((locale) => [
  ...bossCategorySlugs.map(
    (categorySlug) => `/${locale}/bosses/categories/${categorySlug}/`,
  ),
  ...bossActSlugs.map((actSlug) => `/${locale}/bosses/acts/${actSlug}/`),
]);
export const itemCollectionPaths = supportedLocales.flatMap((locale) =>
  itemCategorySlugs.map(
    (categorySlug) => `/${locale}/items/categories/${categorySlug}/`,
  ),
);
export const skillCollectionPaths = supportedLocales.flatMap((locale) =>
  skillCategorySlugs.map(
    (categorySlug) => `/${locale}/skills/categories/${categorySlug}/`,
  ),
);
export const guideCollectionPaths = supportedLocales.flatMap((locale) =>
  guideCategorySlugs.map(
    (categorySlug) => `/${locale}/guides/categories/${categorySlug}/`,
  ),
);
export const patchCollectionPaths = supportedLocales.flatMap((locale) =>
  patchCategorySlugs.map(
    (categorySlug) => `/${locale}/patches/categories/${categorySlug}/`,
  ),
);

export const fixedPublicPaths = [
  "/",
  "/en/",
  "/zh-cn/",
  ...categoryListPaths,
  ...informationPagePaths,
  ...searchPaths,
  ...buildCollectionPaths,
  ...bossCollectionPaths,
  ...itemCollectionPaths,
  ...skillCollectionPaths,
  ...guideCollectionPaths,
  ...patchCollectionPaths,
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
  const contentPaths = index.entries
    .filter(
      (entry) =>
        !entry.buildArticle?.seo.noindex &&
        !entry.bossArticle?.seo.noindex &&
        !entry.itemArticle?.seo.noindex &&
        !entry.skillArticle?.seo.noindex &&
        !entry.guideArticle?.seo.noindex &&
        !entry.patchArticle?.seo.noindex,
    )
    .map((entry) =>
      contentRoutePath(
        entry.frontMatter.locale,
        entry.frontMatter.contentType,
        entry.frontMatter.slug,
      ),
    )
    .sort((left, right) => left.localeCompare(right));
  const populatedCategoryPaths = supportedLocales.flatMap((locale) =>
    Object.entries(contentTypeSegments).flatMap(([contentType, segment]) => {
      const count = index.entries.filter(
        (entry) =>
          entry.frontMatter.locale === locale &&
          entry.frontMatter.contentType === contentType &&
          !entry.buildArticle?.seo.noindex &&
          !entry.bossArticle?.seo.noindex &&
          !entry.itemArticle?.seo.noindex &&
          !entry.skillArticle?.seo.noindex &&
          !entry.guideArticle?.seo.noindex &&
          !entry.patchArticle?.seo.noindex,
      ).length;
      return count >= 2 ? [`/${locale}/${segment}/`] : [];
    }),
  );
  const populatedBuildCollectionPaths = supportedLocales.flatMap((locale) => {
    const articles = index.entries.flatMap((entry) =>
      entry.buildArticle?.locale === locale && !entry.buildArticle.seo.noindex
        ? [entry.buildArticle]
        : [],
    );
    return [
      ...buildClassSlugs.flatMap((value) =>
        articles.filter((article) =>
          matchesBuildCollection(article, { kind: "class", value }),
        ).length >= 2
          ? [`/${locale}/builds/classes/${value}/`]
          : [],
      ),
      ...buildAscendancySlugs.flatMap((value) =>
        articles.filter((article) =>
          matchesBuildCollection(article, { kind: "ascendancy", value }),
        ).length >= 2
          ? [`/${locale}/builds/ascendancies/${value}/`]
          : [],
      ),
      ...buildCategorySlugs.flatMap((value) =>
        articles.filter((article) =>
          matchesBuildCollection(article, { kind: "category", value }),
        ).length >= 2
          ? [`/${locale}/builds/${value}/`]
          : [],
      ),
    ];
  });
  const populatedBossCollectionPaths = supportedLocales.flatMap((locale) => {
    const articles = index.entries.flatMap((entry) =>
      entry.bossArticle?.locale === locale && !entry.bossArticle.seo.noindex
        ? [entry.bossArticle]
        : [],
    );
    return [
      ...bossCategorySlugs.flatMap((value) =>
        articles.filter((article) =>
          matchesBossCollection(article, { kind: "category", value }),
        ).length >= 2
          ? [`/${locale}/bosses/categories/${value}/`]
          : [],
      ),
      ...bossActSlugs.flatMap((value) =>
        articles.filter((article) =>
          matchesBossCollection(article, { kind: "act", value }),
        ).length >= 2
          ? [`/${locale}/bosses/acts/${value}/`]
          : [],
      ),
    ];
  });
  const populatedItemCollectionPaths = supportedLocales.flatMap((locale) => {
    const articles = index.entries.flatMap((entry) =>
      entry.itemArticle?.locale === locale && !entry.itemArticle.seo.noindex
        ? [entry.itemArticle]
        : [],
    );
    return itemCategorySlugs.flatMap((value) =>
      articles.filter((article) =>
        matchesItemCollection(article, { kind: "category", value }),
      ).length >= 2
        ? [`/${locale}/items/categories/${value}/`]
        : [],
    );
  });
  const populatedSkillCollectionPaths = supportedLocales.flatMap((locale) => {
    const articles = index.entries.flatMap((entry) =>
      entry.skillArticle?.locale === locale && !entry.skillArticle.seo.noindex
        ? [entry.skillArticle]
        : [],
    );
    return skillCategorySlugs.flatMap((value) =>
      articles.filter((article) =>
        matchesSkillCollection(article, { kind: "category", value }),
      ).length >= 2
        ? [`/${locale}/skills/categories/${value}/`]
        : [],
    );
  });
  const populatedGuideCollectionPaths = supportedLocales.flatMap((locale) => {
    const articles = index.entries.flatMap((entry) =>
      entry.guideArticle?.locale === locale && !entry.guideArticle.seo.noindex
        ? [entry.guideArticle]
        : [],
    );
    return guideCategorySlugs.flatMap((value) =>
      articles.filter((article) =>
        matchesGuideCollection(article, { kind: "category", value }),
      ).length >= 2
        ? [`/${locale}/guides/categories/${value}/`]
        : [],
    );
  });
  const populatedPatchCollectionPaths = supportedLocales.flatMap((locale) => {
    const articles = index.entries.flatMap((entry) =>
      entry.patchArticle?.locale === locale && !entry.patchArticle.seo.noindex
        ? [entry.patchArticle]
        : [],
    );
    return patchCategorySlugs.flatMap((value) =>
      articles.filter((article) =>
        matchesPatchCollection(article, { kind: "category", value }),
      ).length >= 2
        ? [`/${locale}/patches/categories/${value}/`]
        : [],
    );
  });

  return [
    "/",
    "/en/",
    "/zh-cn/",
    ...populatedCategoryPaths,
    ...populatedBuildCollectionPaths,
    ...populatedBossCollectionPaths,
    ...populatedItemCollectionPaths,
    ...populatedSkillCollectionPaths,
    ...populatedGuideCollectionPaths,
    ...populatedPatchCollectionPaths,
    ...informationPagePaths,
    ...contentPaths,
  ];
}

/** 从生产内容索引生成 React Router 构建期预渲染清单。 */
export async function getPublicPrerenderPaths(): Promise<string[]> {
  const index = await loadContentIndex();
  return enumeratePublicPaths(index);
}

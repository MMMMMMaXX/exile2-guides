/** 文件职责：提供浏览器与构建端共享的语言、内容类型和规范路径常量。 */
export const supportedLocales = ["en", "zh-cn"] as const;
export const contentTypes = [
  "build",
  "boss",
  "item",
  "skill",
  "guide",
  "patch",
] as const;

export type ContentLocale = (typeof supportedLocales)[number];
export type ContentType = (typeof contentTypes)[number];

export const contentTypeSegments = {
  boss: "bosses",
  build: "builds",
  guide: "guides",
  item: "items",
  patch: "patches",
  skill: "skills",
} as const satisfies Record<ContentType, string>;

/** 根据稳定语言、类型和 Slug 生成规范内容路径。 */
export function contentRoutePath(
  locale: ContentLocale,
  contentType: ContentType,
  slug: string,
): string {
  return `/${locale}/${contentTypeSegments[contentType]}/${slug}/`;
}

/**
 * 文件职责：提供目标语言可用性的只读查询，供语言切换器与 hreflang 生成使用。
 *
 * 与“字符串替换 URL 后假定页面存在”相反，本模块直接探测内容文件是否真实
 * 存在于对应 locale 目录，从而避免生成指向不存在译文的死链或混合语言页。
 */
import { existsSync } from "node:fs";
import path from "node:path";

import {
  contentTypeSegments,
  supportedLocales,
  type ContentLocale,
  type ContentType,
} from "./constants";

/** 返回某内容类型+slug 在指定 locale 的内容文件路径（基于仓库根）。 */
export function getContentFilePath(
  locale: ContentLocale,
  type: ContentType,
  slug: string,
): string {
  return path.join(
    process.cwd(),
    "content",
    locale,
    contentTypeSegments[type],
    `${slug}.json`,
  );
}

/**
 * 扫描全部 10 个 locale 目录，返回该内容真实存在的 locale 列表。
 * 仅依赖文件系统存在性检查，不读取或解析文件，零副作用。
 */
export function getAvailableLocales(
  type: ContentType,
  slug: string,
): readonly ContentLocale[] {
  return supportedLocales.filter((locale) =>
    existsSync(getContentFilePath(locale, type, slug)),
  );
}

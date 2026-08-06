/**
 * 文件职责：解析关联内容卡片与章节内硬编码的内部链接，使其始终指向构建产物中
 * 真实存在的页面。当同语言目标页尚未翻译时，回退到规范语言（en）对应页面，
 * 避免生成死链触发构建期 verify-build 的 missing-internal-link-target 门禁。
 *
 * 背景：各语言（de/es/ja/ko/pt-br/ru/tr 等）的 related-content / build-usage 等
 * 章节常把 href 硬编码为自身语言路径，但目标实体可能尚未翻译，导致内部链接指向
 * 未生成的页面。统一的回退策略既能修复现有死链，也能防止新增翻译内容再次引入。
 */
import contentRoutesModule from "virtual:content-routes";
import type { StaticContentRouteMap } from "./content-page";
import {
  contentTypeSegments,
  contentRoutePath,
  defaultLocale,
  type ContentLocale,
  type ContentType,
} from "./constants";

const contentRoutes = contentRoutesModule as StaticContentRouteMap;

/** 关联内容卡片的最小链接描述；与章节渲染器消费的条目字段对齐。 */
export type RelatedLinkItem = {
  contentId?: string;
  contentType: string;
  href: string;
};

type ResolvedTarget = {
  locale: string;
  contentType: ContentType;
  slug: string;
};

/** 预计算两种索引，构建期/运行期只算一次。 */
const PAGES_BY_CONTENT_ID: Map<string, ResolvedTarget[]> = new Map();
/** slug|contentType -> 已发布语言列表；用于解析纯 href 字符串。 */
const PAGES_BY_SLUG: Map<string, string[]> = new Map();

for (const { contentId, contentType, locale, slug } of Object.values(
  contentRoutes,
)) {
  if (contentId) {
    const arr = PAGES_BY_CONTENT_ID.get(contentId) ?? [];
    arr.push({ locale, contentType, slug });
    PAGES_BY_CONTENT_ID.set(contentId, arr);
  }
  const slugKey = `${slug}|${contentType}`;
  const locales = PAGES_BY_SLUG.get(slugKey) ?? [];
  if (!locales.includes(locale)) locales.push(locale);
  PAGES_BY_SLUG.set(slugKey, locales);
}

/** 反向映射：URL 段 -> contentType，用于解析硬编码 href。 */
const SEGMENT_TO_CONTENT_TYPE: Record<string, ContentType> = (
  Object.entries(contentTypeSegments) as [ContentType, string][]
).reduce<Record<string, ContentType>>((acc, [type, segment]) => {
  acc[segment] = type;
  return acc;
}, {});

const INTERNAL_HREF_RE =
  /^\/([a-z-]+)\/(bosses|builds|items|skills|guides|patches)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/;

/**
 * 将关联内容条目解析为可点击且构建期存在的链接路径。
 * 优先同语言页面；缺失时回退规范语言页面；均无则保留原始 href
 * （仍会被 verify 标记，属真实内容缺口，不应静默掩盖）。
 */
export function resolveRelatedContentHref(
  item: RelatedLinkItem,
  currentLocale: string,
): string {
  if (!item.contentId) return item.href;
  const candidates = PAGES_BY_CONTENT_ID.get(item.contentId);
  if (!candidates || candidates.length === 0) return item.href;

  const sameLocale = candidates.find(
    (candidate) =>
      candidate.locale === currentLocale &&
      candidate.contentType === (item.contentType as ContentType),
  );
  if (sameLocale) {
    return contentRoutePath(
      sameLocale.locale as ContentLocale,
      sameLocale.contentType,
      sameLocale.slug,
    );
  }

  const fallback =
    candidates.find(
      (candidate) =>
        candidate.locale === defaultLocale &&
        candidate.contentType === (item.contentType as ContentType),
    ) ??
    candidates.find((candidate) => candidate.contentType === item.contentType);
  if (fallback) {
    return contentRoutePath(
      fallback.locale as ContentLocale,
      fallback.contentType,
      fallback.slug,
    );
  }
  return item.href;
}

/**
 * 解析章节内硬编码的内部链接（如 build-usage 的 build.href）。
 * 仅重写匹配 `/{locale}/{type}/{slug}/` 的内部内容链接；外链或非内容链接原样透传。
 * 同语言目标存在则保持；缺失则回退规范语言；目标完全未发布则保留原串。
 */
export function resolveInternalContentHref(
  href: string,
  currentLocale: string,
): string {
  const match = INTERNAL_HREF_RE.exec(href);
  if (!match) return href;
  const hrefLocale = match[1];
  const segment = match[2];
  const slug = match[3];
  if (!hrefLocale || !segment || !slug) return href;
  const contentType = SEGMENT_TO_CONTENT_TYPE[segment];
  if (!contentType) return href;

  const locales = PAGES_BY_SLUG.get(`${slug}|${contentType}`);
  if (!locales || locales.length === 0) return href;
  // 链接自身指向的语言已发布，无需改写。
  if (locales.includes(hrefLocale)) return href;
  // 同语言缺失：优先停留在读者的当前语言，其次规范语言，最后任一已有语言。
  const fallbackLocale = locales.includes(currentLocale)
    ? currentLocale
    : locales.includes(defaultLocale)
      ? defaultLocale
      : locales[0];
  if (!fallbackLocale) return href;
  return contentRoutePath(fallbackLocale as ContentLocale, contentType, slug);
}

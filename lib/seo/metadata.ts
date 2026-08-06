/** 文件职责：统一生成 canonical、hreflang、Open Graph 与 Twitter Metadata，避免各路由重复并产生冲突。 */
import {
  supportedLocales,
  type ContentLocale,
} from "../content/constants";
import { getHrefLang, getOgLocale } from "../i18n/locale-meta";

type AlternatePaths = Partial<Record<ContentLocale, string>>;

export type SeoMetadataOptions = {
  alternatePaths?: AlternatePaths;
  description: string;
  imagePath?: string;
  locale: ContentLocale;
  path: string;
  robots?: string;
  title: string;
  type?: "article" | "website";
};

/** 读取可公开的站点源地址；未配置域名时保留根相对 URL，避免写入虚构生产域名。 */
function getSiteOrigin(): string | undefined {
  const value = import.meta.env.VITE_SITE_URL?.trim();
  return value ? value.replace(/\/$/, "") : undefined;
}

/** 将规范路径转换为公开 URL；配置 VITE_SITE_URL 后自动输出搜索引擎推荐的绝对地址。 */
export function toPublicUrl(path: string): string {
  const origin = getSiteOrigin();
  return origin ? new URL(path, `${origin}/`).toString() : path;
}

/** 将内部 locale 转换为 Open Graph 使用的语言区域格式（如 pt_BR）。 */
function toOpenGraphLocale(locale: ContentLocale): string {
  return getOgLocale(locale);
}

/** 构建页面完整 SEO 描述；x-default 只在真实英文版本存在时输出。 */
export function createSeoMetadata(options: SeoMetadataOptions) {
  const imageUrl = toPublicUrl(options.imagePath ?? "/og.png");
  const metadata: Record<string, string>[] = [
    { title: options.title },
    { name: "description", content: options.description },
    ...(options.robots ? [{ name: "robots", content: options.robots }] : []),
    { tagName: "link", rel: "canonical", href: toPublicUrl(options.path) },
    { property: "og:title", content: options.title },
    { property: "og:description", content: options.description },
    { property: "og:type", content: options.type ?? "website" },
    { property: "og:locale", content: toOpenGraphLocale(options.locale) },
    { property: "og:url", content: toPublicUrl(options.path) },
    { property: "og:image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: options.title },
    { name: "twitter:description", content: options.description },
    { name: "twitter:image", content: imageUrl },
  ];

  for (const [locale, path] of Object.entries(options.alternatePaths ?? {})) {
    if (!path) continue;
    metadata.push({
      tagName: "link",
      rel: "alternate",
      hrefLang: getHrefLang(locale as ContentLocale),
      href: toPublicUrl(path),
    });
  }

  const englishPath = options.alternatePaths?.en;
  if (englishPath) {
    metadata.push({
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: toPublicUrl(englishPath),
    });
  }

  return metadata;
}

/**
 * 为给定路径生成全部可用语言的 alternate 路径，供首页、分类、搜索与法律页共用。
 * 默认输出所有受支持语言；详情页可传入实际已发布语言集合以避免指向 404 页面。
 */
export function createAlternatePaths(
  pathAfterLocale = "",
  locales: readonly ContentLocale[] = supportedLocales,
): AlternatePaths {
  const paths: AlternatePaths = {};
  for (const locale of locales) {
    paths[locale] = `/${locale}/${pathAfterLocale}`;
  }
  return paths;
}

/**
 * 历史别名：语义上不再只是双语，而是输出全部受支持语言。
 * 保留以兼容尚未迁移的调用点；新代码请直接使用 createAlternatePaths。
 */
export function createBilingualAlternatePaths(
  pathAfterLocale = "",
): AlternatePaths {
  return createAlternatePaths(pathAfterLocale, supportedLocales);
}

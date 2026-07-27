/** 文件职责：统一生成 canonical、hreflang、Open Graph 与 Twitter Metadata，避免各路由重复并产生冲突。 */
import type { ContentLocale } from "../content/constants";

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

/** 将内部 locale 转换为 Open Graph 使用的语言区域格式。 */
function toOpenGraphLocale(locale: ContentLocale): string {
  return locale === "zh-cn" ? "zh_CN" : "en_US";
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
      hrefLang: locale === "zh-cn" ? "zh-CN" : "en",
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

/** 为两种固定存在的语言页面建立 alternate 路径，供首页、分类和信息页共用。 */
export function createBilingualAlternatePaths(
  pathAfterLocale = "",
): AlternatePaths {
  return {
    en: `/en/${pathAfterLocale}`,
    "zh-cn": `/zh-cn/${pathAfterLocale}`,
  };
}

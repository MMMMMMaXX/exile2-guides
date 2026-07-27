/** 文件职责：定义面包屑共享数据契约，并生成与可见路径一致的 BreadcrumbList 数据。 */
import { toPublicUrl } from "./metadata";

export type BreadcrumbItem = {
  label: string;
  path?: string;
};

/** 将可见面包屑转换为 JSON-LD，并复用全站规范 URL 配置。 */
export function createBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      ...(item.path ? { item: toPublicUrl(item.path) } : {}),
      name: item.label,
      position: index + 1,
    })),
  };
}

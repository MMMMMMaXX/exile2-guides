/** 文件职责：集中维护 StratLore 总品牌与当前 Exile2 Guides 子站的公开身份。 */

/**
 * 读取公开站点身份配置；该模块只允许非敏感 VITE_* 值，不能放置账户或部署凭据。
 * 默认值与 LAUNCH-001 已确认的 POE2 站点保持一致，避免生产构建回退到占位身份。
 */
function readPublicValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export const siteConfig = {
  brandName: readPublicValue(import.meta.env.VITE_SITE_BRAND, "StratLore"),
  siteName: readPublicValue(import.meta.env.VITE_SITE_NAME, "Exile2 Guides"),
} as const;

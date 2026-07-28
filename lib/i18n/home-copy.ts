/** 文件职责：集中维护根语言选择与双语首页文案，避免路由组件分散硬编码。 */
import { supportedLocales, type ContentLocale } from "../content/constants";

export type HomeCopy = {
  contentStatusDescription: string;
  contentStatusTitle: string;
  description: string;
  emptyDescription: string;
  emptyTitle: string;
  eyebrow: string;
  heroTitle: string;
  metaDescription: string;
  metaTitle: string;
  primaryCta: string;
  secondaryCta: string;
};

const homeCopyByLocale: Record<ContentLocale, HomeCopy> = {
  en: {
    contentStatusDescription:
      "Browse the latest source-linked pages. Entries marked as pending verification remain public under the site's editorial policy and clearly state that boundary.",
    contentStatusTitle: "Latest published content",
    description:
      "Clear, patch-aware guides for builds, bosses, items, skills and progression.",
    emptyDescription:
      "Published content will appear here after editorial approval. Templates and internal research are never shown.",
    emptyTitle: "Published content is being prepared",
    eyebrow: "Unofficial Path of Exile 2 guide site",
    heroTitle: "Path of Exile 2 Builds, Boss Guides and Beginner Help",
    metaDescription:
      "Clear, patch-aware Path of Exile 2 guides for builds, bosses, items, skills and beginners.",
    metaTitle:
      "Exile2 Guides - Path of Exile 2 Builds, Boss Guides & Beginner Help",
    primaryCta: "Browse Guides",
    secondaryCta: "View Patch Notes",
  },
  "zh-cn": {
    contentStatusDescription:
      "浏览最新的来源链接页面。按编辑规则公开但仍待实机核验的内容会明确标注核验边界。",
    contentStatusTitle: "最新公开内容",
    description: "提供清晰、适配当前版本的 Build、Boss、物品、技能与成长攻略。",
    emptyDescription:
      "内容会在编辑批准后显示于此；模板和内部研究不会进入公开首页。",
    emptyTitle: "公开内容正在准备中",
    eyebrow: "非官方 Path of Exile 2 攻略站",
    heroTitle: "Path of Exile 2 Build、Boss 与新手攻略",
    metaDescription:
      "清晰、适配当前版本的 Path of Exile 2 Build、Boss、物品、技能与新手攻略。",
    metaTitle: "Exile2 Guides - Path of Exile 2 Build、Boss 与新手攻略",
    primaryCta: "浏览 Guides",
    secondaryCta: "查看 Patch Notes",
  },
};

/** 判断路由参数是否为当前 MVP 支持的语言，防止未知路径伪装成首页。 */
export function isHomeLocale(
  value: string | undefined,
): value is ContentLocale {
  return supportedLocales.includes(value as ContentLocale);
}

/** 获取指定语言首页文案；未知语言返回 undefined 以交由路由显示 404。 */
export function getHomeCopy(locale: string | undefined): HomeCopy | undefined {
  return isHomeLocale(locale) ? homeCopyByLocale[locale] : undefined;
}

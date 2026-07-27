/** 文件职责：集中维护根语言选择与双语首页文案，避免路由组件分散硬编码。 */
import { supportedLocales, type ContentLocale } from "../content/constants";

export type HomeCopy = {
  contentStatusDescription: string;
  contentStatusTitle: string;
  ctaBuilds: string;
  ctaGuides: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  metaDescription: string;
  metaTitle: string;
};

const homeCopyByLocale: Record<ContentLocale, HomeCopy> = {
  en: {
    contentStatusDescription:
      "Verified guides will appear here as they are published. No sample or unreviewed content is shown.",
    contentStatusTitle: "Verified content is being prepared",
    ctaBuilds: "Explore Builds",
    ctaGuides: "Start with Beginner Guides",
    description:
      "Clear, patch-aware guides for builds, bosses, items, skills and progression.",
    eyebrow: "Unofficial Path of Exile 2 guide site",
    heroTitle: "Path of Exile 2 Builds, Boss Guides and Beginner Help",
    metaDescription:
      "Clear, patch-aware Path of Exile 2 guides for builds, bosses, items, skills and beginners.",
    metaTitle:
      "Exile2 Guides - Path of Exile 2 Builds, Boss Guides & Beginner Help",
  },
  "zh-cn": {
    contentStatusDescription:
      "经人工核验的攻略会在发布后显示于此；本站不会展示示例或未经审核的内容。",
    contentStatusTitle: "已核验攻略正在准备中",
    ctaBuilds: "浏览 Build 攻略",
    ctaGuides: "从新手攻略开始",
    description: "提供清晰、适配当前版本的 Build、Boss、物品、技能与成长攻略。",
    eyebrow: "非官方 Path of Exile 2 攻略站",
    heroTitle: "Path of Exile 2 Build、Boss 与新手攻略",
    metaDescription:
      "清晰、适配当前版本的 Path of Exile 2 Build、Boss、物品、技能与新手攻略。",
    metaTitle: "Exile2 Guides - Path of Exile 2 Build、Boss 与新手攻略",
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

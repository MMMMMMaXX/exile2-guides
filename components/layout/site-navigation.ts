/** 文件职责：集中声明全站导航项及其暂不可用状态，避免页面重复维护链接信息。 */
import type { ContentLocale } from "../../lib/content/constants";
import { getInformationLinkLabel, getNavigationLabel } from "../../lib/i18n/ui";

export type NavigationItem = {
  id: "builds" | "bosses" | "items" | "skills" | "guides" | "patches";
  releaseTask:
    | "TASK-010"
    | "TASK-011"
    | "TASK-012"
    | "TASK-013"
    | "TASK-014"
    | "TASK-015";
};

// 分类列表页会在后续页面任务注册；releaseTask 让启用入口时能回溯对应验收边界。
export const primaryNavigation: readonly NavigationItem[] = [
  { id: "builds", releaseTask: "TASK-010" },
  { id: "bosses", releaseTask: "TASK-011" },
  { id: "items", releaseTask: "TASK-012" },
  { id: "skills", releaseTask: "TASK-013" },
  { id: "guides", releaseTask: "TASK-014" },
  { id: "patches", releaseTask: "TASK-015" },
];

// 用户要求分类始终可从 Header 进入；每个入口都对应静态分类路由，并在没有已发布内容时
// 显示真实空状态。详情和专属列表能力仍由 releaseTask 中的正式任务逐步完成。
export const availablePrimaryNavigation: readonly NavigationItem[] =
  primaryNavigation;

export type InformationLinkItem = {
  slug:
    | "about"
    | "contact"
    | "privacy-policy"
    | "terms-of-use"
    | "cookie-policy"
    | "disclaimer";
};

export const footerInformationLinks: readonly InformationLinkItem[] = [
  { slug: "about" },
  { slug: "contact" },
  { slug: "privacy-policy" },
  { slug: "terms-of-use" },
  { slug: "cookie-policy" },
  { slug: "disclaimer" },
];

/** 返回当前语言的导航标签；集中来自 ui.ts，避免组件内重复维护 10 种语言文案。 */
export function navigationLabel(
  locale: ContentLocale | undefined,
  id: NavigationItem["id"],
): string {
  return getNavigationLabel(locale, id);
}

/** 返回当前语言的法律/信息页标签。 */
export function informationLinkLabel(
  locale: ContentLocale | undefined,
  slug: InformationLinkItem["slug"],
): string {
  return getInformationLinkLabel(locale, slug);
}

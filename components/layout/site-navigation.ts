/** 文件职责：集中声明全站导航项及其暂不可用状态，避免页面重复维护链接信息。 */

export type NavigationItem = {
  id: "builds" | "bosses" | "items" | "skills" | "guides" | "patches";
  label: string;
  releaseTask:
    "TASK-010" | "TASK-011" | "TASK-012" | "TASK-013" | "TASK-014" | "TASK-015";
};

// 分类列表页会在后续页面任务注册；releaseTask 让启用入口时能回溯对应验收边界。
export const primaryNavigation: readonly NavigationItem[] = [
  { id: "builds", label: "Builds", releaseTask: "TASK-010" },
  { id: "bosses", label: "Bosses", releaseTask: "TASK-011" },
  { id: "items", label: "Items", releaseTask: "TASK-012" },
  { id: "skills", label: "Skills", releaseTask: "TASK-013" },
  { id: "guides", label: "Guides", releaseTask: "TASK-014" },
  { id: "patches", label: "Patch Notes", releaseTask: "TASK-015" },
];

// 用户要求分类始终可从 Header 进入；每个入口都对应静态分类路由，并在没有已发布内容时
// 显示真实空状态。详情和专属列表能力仍由 releaseTask 中的正式任务逐步完成。
export const availablePrimaryNavigation: readonly NavigationItem[] =
  primaryNavigation;

export const footerInformationLinks = [
  { label: "About", slug: "about" },
  { label: "Contact", slug: "contact" },
  { label: "Privacy Policy", slug: "privacy-policy" },
  { label: "Terms of Use", slug: "terms-of-use" },
  { label: "Cookie Policy", slug: "cookie-policy" },
  { label: "Disclaimer", slug: "disclaimer" },
] as const;

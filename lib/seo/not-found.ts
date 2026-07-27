/** 文件职责：集中提供 404 的不可索引 Metadata，避免错误页面在各路由中形成不同的搜索边界。 */
import type { ContentLocale } from "../content/constants";

/** 返回不可索引的错误页 Metadata，避免未知 URL 形成可抓取页面变体。 */
export function getNotFoundMeta(locale: ContentLocale = "en") {
  const zh = locale === "zh-cn";
  return [
    {
      title: zh
        ? "页面未找到 | Exile2 Guides"
        : "Page Not Found | Exile2 Guides",
    },
    {
      name: "description",
      content: zh ? "请求的页面不存在。" : "The requested page does not exist.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

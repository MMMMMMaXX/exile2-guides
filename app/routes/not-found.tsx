/** 文件职责：为所有未匹配路由提供可恢复的 404 页面与不可索引 Metadata。 */
import type { Route } from "./+types/not-found";
import { useLocation } from "react-router";
import { NotFoundPage } from "../../components/content/not-found-page";
import {
  supportedLocales,
  type ContentLocale,
} from "../../lib/content/constants";
import { getNotFoundMeta } from "../../lib/seo/not-found";

/** 从未知路径首段推断可用语言；不可信或缺失时回退英语以保证页面可访问。 */
function getNotFoundLocale(pathname: string): ContentLocale {
  const locale = pathname.split("/").filter(Boolean)[0] as
    ContentLocale | undefined;
  return locale && supportedLocales.includes(locale) ? locale : "en";
}

/** 输出 404 的固定 noindex Metadata，防止错误路径被搜索引擎视作内容页。 */
export function meta({ location }: Route.MetaArgs) {
  return getNotFoundMeta(getNotFoundLocale(location.pathname));
}

/** 渲染未知路由的可恢复界面；真实 HTTP 404 由静态主机返回 public/404.html 实现。 */
export default function NotFoundRoute() {
  const { pathname } = useLocation();
  return <NotFoundPage locale={getNotFoundLocale(pathname)} />;
}

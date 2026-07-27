/** 文件职责：注册 Cookie Policy 静态路由并复用共享信息页实现。 */
import type { Route } from "./+types/cookie-policy";
import { createInformationMeta, InformationPage } from "./information-page";

/** 输出 Cookie Policy 页 Metadata。 */
export function meta({ params }: Route.MetaArgs) {
  return createInformationMeta("cookie-policy")({ params });
}

/** 渲染 Cookie Policy 页面。 */
export default function CookiePolicyRoute() {
  return <InformationPage slug="cookie-policy" />;
}

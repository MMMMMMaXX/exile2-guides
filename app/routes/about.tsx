/** 文件职责：注册 About 静态路由并复用共享信息页实现。 */
import type { Route } from "./+types/about";
import { createInformationMeta, InformationPage } from "./information-page";

/** 输出 About 页 Metadata。 */
export function meta({ params }: Route.MetaArgs) {
  return createInformationMeta("about")({ params });
}

/** 渲染 About 页面。 */
export default function AboutRoute() {
  return <InformationPage slug="about" />;
}

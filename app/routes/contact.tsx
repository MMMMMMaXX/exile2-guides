/** 文件职责：注册 Contact 静态路由并复用共享信息页实现。 */
import type { Route } from "./+types/contact";
import { createInformationMeta, InformationPage } from "./information-page";

/** 输出 Contact 页 Metadata。 */
export function meta({ params }: Route.MetaArgs) {
  return createInformationMeta("contact")({ params });
}

/** 渲染 Contact 页面。 */
export default function ContactRoute() {
  return <InformationPage slug="contact" />;
}

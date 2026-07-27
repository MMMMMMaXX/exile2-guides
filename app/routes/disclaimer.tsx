/** 文件职责：注册 Disclaimer 静态路由并复用共享信息页实现。 */
import type { Route } from "./+types/disclaimer";
import { createInformationMeta, InformationPage } from "./information-page";

/** 输出 Disclaimer 页 Metadata。 */
export function meta({ params }: Route.MetaArgs) {
  return createInformationMeta("disclaimer")({ params });
}

/** 渲染 Disclaimer 页面。 */
export default function DisclaimerRoute() {
  return <InformationPage slug="disclaimer" />;
}

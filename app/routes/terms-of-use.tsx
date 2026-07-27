/** 文件职责：注册 Terms of Use 静态路由并复用共享信息页实现。 */
import type { Route } from "./+types/terms-of-use";
import { createInformationMeta, InformationPage } from "./information-page";

/** 输出 Terms of Use 页 Metadata。 */
export function meta({ params }: Route.MetaArgs) {
  return createInformationMeta("terms-of-use")({ params });
}

/** 渲染 Terms of Use 页面。 */
export default function TermsOfUseRoute() {
  return <InformationPage slug="terms-of-use" />;
}

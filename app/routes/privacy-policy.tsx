/** 文件职责：注册 Privacy Policy 静态路由并复用共享信息页实现。 */
import type { Route } from "./+types/privacy-policy";
import { createInformationMeta, InformationPage } from "./information-page";

/** 输出 Privacy Policy 页 Metadata。 */
export function meta({ params }: Route.MetaArgs) {
  return createInformationMeta("privacy-policy")({ params });
}

/** 渲染 Privacy Policy 页面。 */
export default function PrivacyPolicyRoute() {
  return <InformationPage slug="privacy-policy" />;
}

/** 文件职责：以统一的语义和视觉等级呈现重要内容提示，不耦合具体攻略类型。 */
import type { ReactNode } from "react";

export type CalloutVariant = "info" | "success" | "warning";

const calloutLabels: Record<CalloutVariant, string> = {
  info: "Note",
  success: "Verified",
  warning: "Important",
};

/** 渲染说明、核验或风险提示；warning 使用 alert 语义以提高辅助技术的优先级。 */
export function Callout({
  children,
  title,
  variant = "info",
}: {
  children: ReactNode;
  title?: string;
  variant?: CalloutVariant;
}) {
  return (
    <aside
      className={`callout callout--${variant}`}
      role={variant === "warning" ? "alert" : "status"}
    >
      <p className="callout__title">{title ?? calloutLabels[variant]}</p>
      <div className="callout__content">{children}</div>
    </aside>
  );
}

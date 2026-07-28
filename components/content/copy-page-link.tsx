/** 文件职责：提供详情页复制当前链接的渐进增强按钮，不持久化或上传用户数据。 */
import { useState } from "react";

/** 复制浏览器当前地址，并以短状态文案反馈成功或失败。 */
export function CopyPageLink({ locale }: { locale: "en" | "zh-cn" }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const zh = locale === "zh-cn";

  /** 仅在用户点击时访问剪贴板；失败时保留地址栏作为可用回退。 */
  async function copyCurrentPage() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const label =
    status === "copied"
      ? zh
        ? "已复制"
        : "Copied"
      : status === "failed"
        ? zh
          ? "请从地址栏复制"
          : "Copy from address bar"
        : zh
          ? "复制链接"
          : "Copy link";

  return (
    <button
      className="article-copy-link"
      onClick={copyCurrentPage}
      type="button"
    >
      <span aria-hidden="true">⌘</span>
      {label}
    </button>
  );
}

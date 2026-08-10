/** 文件职责：把没有语言标识的入口稳定重定向到英语首页。 */

/**
 * 生成根路径初始化脚本。
 * 英语是没有语言选择、无法读取浏览器语言或语言偏好失效时的唯一安全回退。
 */
function createInitialLocaleRedirectScript(): string {
  return String.raw`
    (() => {
      if (window.location.pathname !== "/") return;
      window.location.replace("/en/");
    })();
  `;
}

/** 渲染只在根路径执行的轻量客户端脚本，使地址栏从一开始就进入英语页面。 */
export function InitialLocaleRedirect() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: createInitialLocaleRedirectScript(),
      }}
    />
  );
}

/** 文件职责：在根语言选择页首次加载时，按浏览器默认语言尽早写入语言 URL。 */

/**
 * 生成根路径初始化脚本。
 * 静态 HTML 仍保留完整语言选择作为无脚本回退；脚本仅增强真实浏览器首次访问。
 */
function createInitialLocaleRedirectScript(): string {
  return String.raw`
    (() => {
      if (window.location.pathname !== "/") return;
      const primaryLanguage = (navigator.languages?.[0] || navigator.language || "")
        .trim()
        .toLowerCase();
      const usesSimplifiedChinese =
        primaryLanguage === "zh" ||
        /^zh(?:-(?:cn|sg|hans))(?:-|$)/.test(primaryLanguage);
      window.location.replace(usesSimplifiedChinese ? "/zh-cn/" : "/en/");
    })();
  `;
}

/** 渲染只在根路径执行的轻量客户端脚本，使地址栏从一开始就包含语言段。 */
export function InitialLocaleRedirect() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: createInitialLocaleRedirectScript(),
      }}
    />
  );
}

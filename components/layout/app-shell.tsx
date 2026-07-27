/** 文件职责：将 Header、页面路由出口与 Footer 组合为统一的全站结构。 */
import type { ReactNode } from "react";
import contentPages from "virtual:content-pages";

import { Footer } from "./footer";
import { Header } from "./header";

/** 包装所有公开页面，保证全站共享导航、页脚和一致的纵向布局。 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header contentPages={contentPages} />
      <div className="site-shell__content" id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

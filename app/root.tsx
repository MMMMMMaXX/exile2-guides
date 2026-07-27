/** 文件职责：提供全站 HTML 外壳和路由出口；页面级内容与 SEO 由子路由负责。 */
import type { ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import { AppShell } from "../components/layout/app-shell";
import { getLocaleFromPathname } from "../lib/i18n/locale-routing";
import { siteConfig } from "../lib/seo/site-config";
import "./styles/app.css";

/** 渲染所有路由共享的文档结构，并集中挂载全局资源和客户端恢复脚本。 */
export function Layout({ children }: { children: ReactNode }) {
  const locale = getLocaleFromPathname(useLocation().pathname) ?? "en";

  return (
    <html lang={locale === "zh-cn" ? "zh-CN" : "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content={siteConfig.siteName} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/** 提供 React Router 的根级路由出口，不在此处耦合具体页面逻辑。 */
export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

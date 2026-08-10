/** 文件职责：提供全站 HTML 外壳和路由出口；页面级内容与 SEO 由子路由负责。 */
import { useEffect, type ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import { AppShell } from "../components/layout/app-shell";
import {
  getEnglishFallbackPath,
  getLocaleFromPathname,
} from "../lib/i18n/locale-routing";
import { getHtmlLang } from "../lib/i18n/locale-meta";
import { siteConfig } from "../lib/seo/site-config";
import "./styles/app.css";
import "./styles/boss-phase-fix.css";
import "./styles/guides-prototype.css";
import "./styles/patch-prototype.css";

/** 渲染所有路由共享的文档结构，并集中挂载全局资源和客户端恢复脚本。 */
export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = getLocaleFromPathname(pathname) ?? "en";
  return (
    <html lang={getHtmlLang(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content={siteConfig.siteName} />
        <link rel="icon" type="image/png" href="/favicon.png" />
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

/**
 * 在 Router 上下文内同步文档语言，避免根 Layout 在 Router 外调用路由 Hook。
 *
 * Layout 还负责错误页和初始文档外壳，因此只能提供英文安全回退；页面恢复后再以
 * 实际 URL 更新 `lang`，保证中文页面的读屏和浏览器语言信息正确。
 */
function DocumentLocaleSynchronizer() {
  const { pathname } = useLocation();
  const locale = getLocaleFromPathname(pathname) ?? "en";

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(locale);
  }, [locale]);

  return null;
}

/**
 * 在静态主机返回 404 外壳或开发服务器命中宽泛路由时，补齐英语语言段。
 * 查询参数和 hash 由浏览器保留，避免搜索页或外部分享链接丢失上下文。
 */
function EnglishLocaleRedirect() {
  const { pathname } = useLocation();

  useEffect(() => {
    const target = getEnglishFallbackPath(pathname);
    if (!target || target === pathname) return;
    window.location.replace(
      `${target}${window.location.search}${window.location.hash}`,
    );
  }, [pathname]);

  return null;
}

/** 提供 React Router 的根级路由出口，不在此处耦合具体页面逻辑。 */
export default function App() {
  return (
    <>
      <EnglishLocaleRedirect />
      <DocumentLocaleSynchronizer />
      <AppShell>
        <Outlet />
      </AppShell>
    </>
  );
}

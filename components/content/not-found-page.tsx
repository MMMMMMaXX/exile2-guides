/** 文件职责：统一渲染未知路径的可恢复 404 内容，避免将用户和搜索引擎重定向至首页。 */
import type { ContentLocale } from "../../lib/content/constants";

/** 提供返回首页、搜索与热门分类的明确出口，不使用自动跳转掩盖错误地址。 */
export function NotFoundPage({ locale = "en" }: { locale?: ContentLocale }) {
  const zh = locale === "zh-cn";
  const homePath = `/${locale}/`;
  return (
    <main className="page-shell not-found-page" data-prerender-content="true">
      <p className="eyebrow">404</p>
      <h1>{zh ? "未找到该页面" : "Page not found"}</h1>
      <p className="text-lead">
        {zh
          ? "该地址不存在、已移动，或尚未发布。你可以返回首页、搜索已发布内容，或浏览主要分类。"
          : "This address does not exist, has moved, or is not published yet. Return home, search published content, or browse a main category."}
      </p>
      <div className="not-found-page__actions">
        <a className="button" href={homePath}>
          {zh ? "返回首页" : "Return home"}
        </a>
        <a className="button button--secondary" href={`/${locale}/search/`}>
          {zh ? "搜索攻略" : "Search guides"}
        </a>
      </div>
      <nav
        aria-label={zh ? "热门分类" : "Popular categories"}
        className="not-found-page__links"
      >
        <a href={`/${locale}/builds/`}>Builds</a>
        <a href={`/${locale}/bosses/`}>Bosses</a>
        <a href={`/${locale}/guides/`}>Guides</a>
      </nav>
    </main>
  );
}

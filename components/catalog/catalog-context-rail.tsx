/** 文件职责：生成分类目录共用的上下文栏，提供下一步阅读、Patch 提醒和分类入口而不虚构攻略。 */
import type { ContentLocale, ContentType } from "../../lib/content/constants";

const categorySegments: Record<ContentType, string> = {
  boss: "bosses",
  build: "builds",
  guide: "guides",
  item: "items",
  patch: "patches",
  skill: "skills",
};

/** 返回当前分类之外的三个真实站内入口，固定顺序使静态输出稳定。 */
function getRelatedTypes(contentType: ContentType): ContentType[] {
  return (Object.keys(categorySegments) as ContentType[])
    .filter((type) => type !== contentType)
    .slice(0, 3);
}

/** 渲染与当前分类相邻的公开入口及 Patch 说明，所有链接均指向现有静态路由。 */
export function CatalogContextRail({
  contentType,
  locale,
}: {
  contentType: ContentType;
  locale: ContentLocale;
}) {
  const zh = locale === "zh-cn";
  const labels: Record<ContentType, string> = zh
    ? {
        boss: "首领",
        build: "Build",
        guide: "攻略",
        item: "物品",
        patch: "补丁说明",
        skill: "技能",
      }
    : {
        boss: "Bosses",
        build: "Builds",
        guide: "Guides",
        item: "Items",
        patch: "Patch Notes",
        skill: "Skills",
      };
  return (
    <>
      <section className="sidebar-panel">
        <p className="section-kicker">{zh ? "继续浏览" : "Explore next"}</p>
        <h2>{zh ? "关联分类" : "Related categories"}</h2>
        <nav
          className="catalog-rail__links"
          aria-label={zh ? "关联分类" : "Related categories"}
        >
          {getRelatedTypes(contentType).map((type) => (
            <a href={`/${locale}/${categorySegments[type]}/`} key={type}>
              <strong>{labels[type]}</strong>
              <small>{zh ? "查看已发布内容" : "View published entries"}</small>
              <span aria-hidden="true">›</span>
            </a>
          ))}
        </nav>
      </section>
      <section className="sidebar-panel compact-patch-card">
        <p className="section-kicker">{zh ? "版本追踪" : "Patch tracking"}</p>
        <strong>0.5.4</strong>
        <p>
          {zh
            ? "仅展示已按当前版本复核的公开内容。"
            : "Only entries reviewed for the tracked patch are listed."}
        </p>
        <a href={`/${locale}/patches/`}>
          {zh ? "查看补丁说明 →" : "View patch notes →"}
        </a>
      </section>
    </>
  );
}

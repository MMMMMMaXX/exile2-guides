/** 文件职责：为原型 V2 详情页右栏集中展示可核验元数据与安全导航，不重复正文结论。 */

import type { ContentType } from "../../lib/content/constants";

/** Boss tag slug 到显示名的映射；侧栏标签读取此表。 */
const bossTagLabels: Record<string, { en: string; zh: string }> = {
  "act-1": { en: "Act 1", zh: "Act 1" },
  "act-2": { en: "Act 2", zh: "Act 2" },
  campaign: { en: "Campaign", zh: "剧情" },
  chaos: { en: "Chaos", zh: "混沌" },
  cold: { en: "Cold", zh: "冰霜" },
  elemental: { en: "Elemental", zh: "元素" },
  endgame: { en: "Endgame", zh: "终局" },
  fire: { en: "Fire", zh: "火焰" },
  holy: { en: "Holy", zh: "神圣" },
  "league-mechanic": { en: "League", zh: "赛季" },
  lightning: { en: "Lightning", zh: "闪电" },
  "map-boss": { en: "Map Boss", zh: "地图 Boss" },
  "multi-phase": { en: "Multi-phase", zh: "多阶段" },
  "permanent-reward": { en: "Reward", zh: "奖励" },
  physical: { en: "Physical", zh: "物理" },
  pinnacle: { en: "Pinnacle", zh: "巅峰" },
  sekhemas: { en: "Sekhemas", zh: "Sekhemas" },
  trial: { en: "Trial", zh: "试炼" },
};

/** 将 tag slug 转为当前语言的显示名；未知标签直接返回原始值。 */
function formatTag(tag: string, contentType: ContentType, zh: boolean): string {
  if (contentType === "boss") {
    const entry = bossTagLabels[tag];
    return entry ? (zh ? entry.zh : entry.en) : tag;
  }
  return tag;
}

export type ArticleSidebarProps = {
  author: string;
  categoryHref: string;
  categoryLabel: string;
  contentType: ContentType;
  locale: "en" | "zh-cn";
  patch: string;
  tags: readonly string[];
  updatedAt: string;
  verificationStatus?: string;
};

/** 渲染详情页右侧事实摘要、分类入口和核验边界。 */
export function ArticleSidebar({
  author,
  categoryHref,
  categoryLabel,
  contentType,
  locale,
  patch,
  tags,
  updatedAt,
  verificationStatus,
}: ArticleSidebarProps) {
  const zh = locale === "zh-cn";

  return (
    <>
      <section className="article-rail-panel">
        <h2>{zh ? "页面信息" : "Page facts"}</h2>
        <dl>
          <div>
            <dt>Patch</dt>
            <dd>{patch}</dd>
          </div>
          <div>
            <dt>{zh ? "更新日期" : "Updated"}</dt>
            <dd>{updatedAt}</dd>
          </div>
          <div>
            <dt>{zh ? "作者" : "Author"}</dt>
            <dd>{author}</dd>
          </div>
          {verificationStatus ? (
            <div>
              <dt>{zh ? "核验状态" : "Verification"}</dt>
              <dd>{verificationStatus}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="article-rail-panel">
        <h2>{zh ? "内容标签" : "Content tags"}</h2>
        <div className="article-rail-tags">
          {tags.slice(0, 6).map((tag) => (
            <span key={tag}>{formatTag(tag, contentType, zh)}</span>
          ))}
        </div>
        <a className="article-rail-link" href={categoryHref}>
          {zh ? `浏览全部${categoryLabel}` : `Browse all ${categoryLabel}`} →
        </a>
      </section>

      <section className="article-rail-panel article-rail-panel--notice">
        <h2>{zh ? "核验边界" : "Verification boundary"}</h2>
        <p>
          {zh
            ? "来源与 Patch 范围会在正文中明确区分；本站不会把尚未经实机确认的内容表述为实测结论。"
            : "Sources, patch scope and pending in-game checks remain visibly separated. Pending work is never presented as tested fact."}
        </p>
      </section>
    </>
  );
}

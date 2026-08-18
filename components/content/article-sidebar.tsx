/** 文件职责：为原型 V2 详情页右栏集中展示可核验元数据与安全导航，不重复正文结论。 */

import type { ContentLocale, ContentType } from "../../lib/content/constants";
import {
  formatPublicVerificationStatus,
  getArticleSidebarCopy,
} from "../../lib/i18n/article-sidebar-copy";
import { siteConfig } from "../../lib/seo/site-config";

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
  categoryHref: string;
  categoryLabel: string;
  contentType: ContentType;
  locale: ContentLocale;
  patch: string;
  tags: readonly string[];
  updatedAt: string;
  verificationStatus?: string;
};

/** 渲染详情页右侧事实摘要、分类入口和核验边界。 */
export function ArticleSidebar({
  categoryHref,
  categoryLabel,
  contentType,
  locale,
  patch,
  tags,
  updatedAt,
  verificationStatus,
}: ArticleSidebarProps) {
  const copy = getArticleSidebarCopy(locale);
  const zh = locale === "zh-cn";
  const aboutHref = `/${locale}/about/`;
  const browseAllLabel = copy.browseAll.replace("{category}", categoryLabel);

  return (
    <>
      <section className="article-rail-panel">
        <h2>{copy.pageFacts}</h2>
        <dl>
          <div>
            <dt>{copy.patch}</dt>
            <dd>{patch}</dd>
          </div>
          <div>
            <dt>{copy.updated}</dt>
            <dd>{updatedAt}</dd>
          </div>
          <div>
            <dt>{copy.author}</dt>
            <dd>
              <a href={aboutHref}>{siteConfig.siteName}</a>
            </dd>
          </div>
          {verificationStatus ? (
            <div>
              <dt>{copy.evidenceStatus}</dt>
              <dd>
                {formatPublicVerificationStatus(locale, verificationStatus)}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="article-rail-panel">
        <h2>{copy.contentTags}</h2>
        <div className="article-rail-tags">
          {tags.slice(0, 6).map((tag) => (
            <span key={tag}>{formatTag(tag, contentType, zh)}</span>
          ))}
        </div>
        <a className="article-rail-link" href={categoryHref}>
          {browseAllLabel} →
        </a>
      </section>

      <section className="article-rail-panel article-rail-panel--notice">
        <h2>{copy.evidenceScope}</h2>
        <p>{copy.evidenceScopeBody}</p>
        <a className="article-rail-link" href={aboutHref}>
          {copy.editorialProcess} →
        </a>
      </section>
    </>
  );
}

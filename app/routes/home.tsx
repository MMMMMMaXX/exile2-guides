/** 文件职责：按交互原型 V2 渲染高信息密度双语首页，并只展示真实公开内容。 */
import { useParams } from "react-router";
import contentPages from "virtual:content-pages";

import { resolveImageAsset } from "../../lib/assets/image-assets";
import { ContentCard } from "../../components/content/content-card";
import { ReadingProgress } from "../../components/content/reading-progress";
import {
  contentTypeSegments,
  type ContentType,
} from "../../lib/content/constants";
import type { StaticContentPage } from "../../lib/content/content-page";
import { getHomeContentItems } from "../../lib/content/home-content";
import { getHomeCopy } from "../../lib/i18n/home-copy";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import type { Route } from "./+types/home";

const homeHeroImage = resolveImageAsset("/images/prototype-v2/hero-home.webp");
const currentGameVersion = "0.5.4e";
const latestMajorPatchVersion = "0.5.4";
const historicalPatchRange = `0.3.0–${currentGameVersion}`;

const homeSectionOrder = [
  "build",
  "boss",
  "item",
  "skill",
  "guide",
  "patch",
] as const satisfies readonly ContentType[];

const sectionLabels = {
  en: {
    boss: ["Encounter library", "Boss Guides"],
    build: ["Build library", "Builds"],
    guide: ["Recently updated", "Latest Guides"],
    item: ["Browse mechanics", "Items Database"],
    patch: ["Patch library", "Major Patches"],
    skill: ["Skill reference", "Skills"],
  },
  "zh-cn": {
    boss: ["首领资料库", "Boss 攻略"],
    build: ["Build 资料库", "Build 攻略"],
    guide: ["最近更新", "最新攻略"],
    item: ["机制速查", "物品资料"],
    patch: ["补丁资料库", "大型补丁"],
    skill: ["技能速查", "技能资料"],
  },
} as const;

const quickAccessItems = [
  ["builds", "♙", "Starter Builds", "Build 入门"],
  ["bosses", "♛", "Boss Guides", "Boss 攻略"],
  ["guides", "⌁", "Guides", "综合攻略"],
  ["items", "◆", "Items", "物品资料"],
  ["skills", "✦", "Skills", "技能资料"],
  ["patches", "◈", "Patch Notes", "版本更新"],
] as const;

/** 返回对应语言首页的静态 Metadata，未知语言由路由级 404 文案处理。 */
export function meta({ params }: Route.MetaArgs) {
  const copy = getHomeCopy(params.locale);
  if (!copy) return [{ title: "Not Found | Exile2 Guides" }];
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(),
    description: copy.metaDescription,
    locale: params.locale as "en" | "zh-cn",
    path: `/${params.locale}/`,
    title: copy.metaTitle,
  });
}

/** 按内容类型分组，首页模块与分类路由继续消费同一份构建期公开数据。 */
function groupHomeItems(items: readonly StaticContentPage[]) {
  return Object.fromEntries(
    homeSectionOrder.map((contentType) => [
      contentType,
      items.filter((item) => item.frontMatter.contentType === contentType),
    ]),
  ) as Record<(typeof homeSectionOrder)[number], StaticContentPage[]>;
}

/** 渲染一个真实内容模块；没有公开内容的类型不生成空白“建设中”区块。 */
function HomeContentSection({
  contentType,
  items,
  locale,
}: {
  contentType: (typeof homeSectionOrder)[number];
  items: readonly StaticContentPage[];
  locale: "en" | "zh-cn";
}) {
  if (items.length === 0) return null;
  const [kicker, title] = sectionLabels[locale][contentType];
  const typeLabels: Record<ContentType, string> = {
    boss: "Boss",
    build: "Build",
    guide: "Guide",
    item: "Item",
    patch: "Patch",
    skill: "Skill",
  };

  return (
    <section
      className={`home-panel home-content-section home-content-section--${contentType}`}
      aria-labelledby={`home-${contentType}-title`}
    >
      <header className="home-section-heading">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 id={`home-${contentType}-title`}>{title}</h2>
        </div>
        <a href={`/${locale}/${contentTypeSegments[contentType]}/`}>
          {locale === "zh-cn" ? "查看全部" : "View all"}{" "}
          <span aria-hidden="true">›</span>
        </a>
      </header>
      <div className="content-card-grid home-content-section__grid">
        {items.slice(0, 4).map((page) => {
          const { frontMatter } = page;
          return (
            <ContentCard
              key={frontMatter.contentId}
              content={{
                href: `/${locale}/${contentTypeSegments[frontMatter.contentType]}/${frontMatter.slug}/`,
                meta: `${frontMatter.patch} · ${frontMatter.updatedAt}`,
                summary: frontMatter.summary,
                title: frontMatter.title,
                typeLabel: typeLabels[frontMatter.contentType],
                ...(frontMatter.image
                  ? {
                      image: frontMatter.image,
                      ...(frontMatter.imageAlt
                        ? { imageAlt: frontMatter.imageAlt }
                        : {}),
                    }
                  : {}),
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

/** 渲染版本范围和编辑状态侧栏，避免把历史补丁误标为当前版本。 */
function HomeSidebar({
  items,
  locale,
}: {
  items: readonly StaticContentPage[];
  locale: "en" | "zh-cn";
}) {
  const latestMajorPatch = items.find(
    (item) =>
      item.frontMatter.contentType === "patch" &&
      item.patchArticle?.patchVersion === latestMajorPatchVersion,
  );
  const zh = locale === "zh-cn";

  return (
    <aside
      className="home-sidebar"
      aria-label={zh ? "补充内容" : "More content"}
    >
      {latestMajorPatch ? (
        <section className="home-sidebar__panel">
          <header className="home-sidebar__heading">
            <h2>{zh ? "最新大型内容补丁" : "Latest major content patch"}</h2>
            <span>{zh ? "大型补丁" : "Major patch"}</span>
          </header>
          <p className="home-sidebar__patch">
            {latestMajorPatch.frontMatter.patch}
          </p>
          <p>{latestMajorPatch.frontMatter.summary}</p>
          <a href={`/${locale}/patches/${latestMajorPatch.frontMatter.slug}/`}>
            {zh ? "阅读版本分析" : "Read patch analysis"} →
          </a>
        </section>
      ) : null}

      <section className="home-sidebar__panel">
        <h2>{zh ? "版本范围" : "Version scope"}</h2>
        <p>
          <strong>{zh ? "当前游戏版本" : "Current game version"}</strong>
          <br />
          {currentGameVersion}
        </p>
        <p>
          <strong>{zh ? "历史补丁资料库" : "Historical patch library"}</strong>
          <br />
          {historicalPatchRange}
        </p>
      </section>

      <section className="home-sidebar__panel">
        <h2>{zh ? "公开内容状态" : "Published content"}</h2>
        <ol className="home-ranking-list">
          {homeSectionOrder.map((contentType, index) => {
            const count = items.filter(
              (item) => item.frontMatter.contentType === contentType,
            ).length;
            const [, label] = sectionLabels[locale][contentType];
            return (
              <li key={contentType}>
                <span>{index + 1}</span>
                <div>
                  <strong>{label}</strong>
                  <small>
                    {zh ? `${count} 篇公开内容` : `${count} published page(s)`}
                  </small>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home-sidebar__panel home-sidebar__notice">
        <h2>{zh ? "编辑说明" : "Editorial note"}</h2>
        <p>
          {zh
            ? "所有公开内容均保留 Patch、来源与实机核验状态；待核验不等于已实测。"
            : "Every public page keeps its patch, sources and verification status visible. Pending verification is not presented as tested fact."}
        </p>
      </section>
    </aside>
  );
}

/** 渲染当前语言首页；内容卡片只消费构建期已发布页面，避免重新发现草稿。 */
export default function HomeRoute() {
  const localeParam = useParams().locale;
  const copy = getHomeCopy(localeParam);
  if (!copy) {
    return (
      <main className="page-shell home-page home-page--not-found">
        <h1>Not Found</h1>
      </main>
    );
  }
  const locale = localeParam as "en" | "zh-cn";
  const items = getHomeContentItems(contentPages, locale, 100);
  const groupedItems = groupHomeItems(items);
  const zh = locale === "zh-cn";
  const publishedCountByType = (contentType: ContentType) =>
    items.filter((item) => item.frontMatter.contentType === contentType).length;

  return (
    <main className="home-page" data-prerender-content="true">
      <ReadingProgress />
      <section className="home-hero-v2" aria-labelledby="home-title">
        <img
          alt=""
          aria-hidden="true"
          className="home-hero-v2__image"
          decoding="async"
          fetchPriority="high"
          height="760"
          sizes="100vw"
          src={homeHeroImage}
          srcSet={`${homeHeroImage} 1920w`}
          width="1920"
        />
        <div className="home-hero-v2__overlay" aria-hidden="true" />
        <div className="page-shell home-hero-v2__content">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="home-title">{copy.heroTitle}</h1>
          <p className="home-hero-v2__lead">{copy.description}</p>

          <div
            className="home-stat-row"
            aria-label={zh ? "站点状态" : "Site status"}
          >
            <div className="home-stat-chip">
              <span aria-hidden="true">◉</span>
              <span>
                <strong>{currentGameVersion}</strong>
                <small>{zh ? "当前游戏版本" : "Current game version"}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">◇</span>
              <span>
                <strong>{publishedCountByType("guide")}</strong>
                <small>{zh ? "攻略" : "Guides"}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">♜</span>
              <span>
                <strong>{publishedCountByType("boss")}</strong>
                <small>{zh ? "首领" : "Bosses"}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">◇</span>
              <span>
                <strong>{publishedCountByType("item")}</strong>
                <small>{zh ? "物品" : "Items"}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">✦</span>
              <span>
                <strong>{publishedCountByType("skill")}</strong>
                <small>{zh ? "技能" : "Skills"}</small>
              </span>
            </div>
          </div>

          <form
            action={`/${locale}/search/`}
            className="home-hero-search"
            method="get"
            role="search"
          >
            <label className="visually-hidden" htmlFor="home-search">
              {zh ? "搜索攻略" : "Search guides"}
            </label>
            <input
              id="home-search"
              name="q"
              placeholder={
                zh
                  ? "搜索 Build、Boss、物品、技能与攻略…"
                  : "Search builds, bosses, items, skills and guides…"
              }
              type="search"
            />
            <button type="submit">{zh ? "搜索" : "Search"}</button>
          </form>
          <div className="home-popular-searches">
            <span>{zh ? "快速搜索：" : "Popular:"}</span>
            {["Liquid Verisium", "Atziri", currentGameVersion].map((term) => (
              <a
                href={`/${locale}/search/?q=${encodeURIComponent(term)}`}
                key={term}
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="page-shell home-page-grid">
        <div className="home-main-column">
          <section
            className="home-panel home-quick-access"
            aria-labelledby="quick-access-title"
          >
            <header className="home-section-heading home-section-heading--compact">
              <div>
                <p className="section-kicker">
                  {zh ? "从这里开始" : "Start here"}
                </p>
                <h2 id="quick-access-title">
                  {zh ? "快捷入口" : "Quick Access"}
                </h2>
              </div>
            </header>
            <div className="home-quick-access__grid">
              {quickAccessItems.map(([segment, icon, enLabel, zhLabel]) => (
                <a href={`/${locale}/${segment}/`} key={segment}>
                  <span aria-hidden="true">{icon}</span>
                  <strong>{zh ? zhLabel : enLabel}</strong>
                </a>
              ))}
            </div>
          </section>

          {homeSectionOrder.map((contentType) => (
            <HomeContentSection
              contentType={contentType}
              items={groupedItems[contentType]}
              key={contentType}
              locale={locale}
            />
          ))}
        </div>
        <HomeSidebar items={items} locale={locale} />
      </div>
    </main>
  );
}

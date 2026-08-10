/** 文件职责：按交互原型 V2 渲染高信息密度多语言首页，并只展示真实公开内容。 */
import { resolveImageAsset } from "../../lib/assets/image-assets";
import { ContentCard } from "../../components/content/content-card";
import { ReadingProgress } from "../../components/content/reading-progress";
import { StructuredData } from "../../components/seo/structured-data";
import {
  contentTypeSegments,
  type ContentLocale,
  type ContentType,
} from "../../lib/content/constants";
import type { StaticContentCatalogPage } from "../../lib/content/content-page";
import { loadContentCatalog } from "../../lib/content/content-catalog";
import { contentCatalogMetrics } from "../../lib/content/content-catalog";
import { loadStaticContentCatalogForLocale } from "../../lib/content/content-catalog.server";
import { getHomeContentItems } from "../../lib/content/home-content";
import { getHomeCopy } from "../../lib/i18n/home-copy";
import { t } from "../../lib/i18n/ui";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { createWebSiteJsonLd } from "../../lib/seo/structured-data";
import type { Route } from "./+types/home";

const homeHeroImage = resolveImageAsset("/images/prototype-v2/hero-home.webp");
const currentGameVersion = "0.5.4e";
const latestMajorPatchVersion = "0.5.4";
const historicalPatchRange = `0.3.0–${currentGameVersion}`;

/** 将内容类型或路径片段的首字母大写，用于派生首页文案键。 */
function cap<S extends string>(s: S): Capitalize<S> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<S>;
}

const homeSectionOrder = [
  "build",
  "boss",
  "item",
  "skill",
  "guide",
  "patch",
] as const satisfies readonly ContentType[];

const quickAccessItems = [
  ["builds", "♙"],
  ["bosses", "♛"],
  ["guides", "⌁"],
  ["items", "◆"],
  ["skills", "✦"],
  ["patches", "◈"],
] as const;

/**
 * 首页每类只渲染四张卡片，因此 loader 只序列化真正使用的 24 条目录数据。
 * 数量从构建期指标读取；最新大版本补丁单独保留，避免全量目录进入 HTML hydration 数据。
 */
function createHomeLoaderData(
  catalog: Readonly<Record<string, StaticContentCatalogPage>>,
  locale: ContentLocale,
) {
  const allItems = Object.values(catalog).filter(
    (page) => page.frontMatter.locale === locale,
  );
  const selectedItems = homeSectionOrder.flatMap((contentType) =>
    getHomeContentItems(
      Object.fromEntries(
        allItems
          .filter((page) => page.frontMatter.contentType === contentType)
          .map((page) => [page.frontMatter.contentId, page]),
      ),
      locale,
      4,
    ),
  );
  const latestMajorPatch = allItems.find(
    (page) => page.patchArticle?.patchVersion === latestMajorPatchVersion,
  );
  if (
    latestMajorPatch &&
    !selectedItems.some(
      (page) =>
        page.frontMatter.contentId === latestMajorPatch.frontMatter.contentId,
    )
  ) {
    selectedItems.push(latestMajorPatch);
  }

  return {
    counts: Object.fromEntries(
      homeSectionOrder.map((contentType) => [
        contentType,
        contentCatalogMetrics[
          `${locale}/${contentTypeSegments[contentType]}/`
        ] ?? 0,
      ]),
    ) as Record<ContentType, number>,
    items: selectedItems,
  };
}

/** 首页服务端只回传可见卡片与指标，避免把整份当前语言目录嵌入 HTML。 */
export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale as ContentLocale;
  return createHomeLoaderData(
    await loadStaticContentCatalogForLocale(params.locale),
    locale,
  );
}

/** 客户端导航沿用同一投影契约，保证服务端与浏览器渲染结果一致。 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const locale = params.locale as ContentLocale;
  return createHomeLoaderData(await loadContentCatalog(params.locale), locale);
}

/** 返回对应语言首页的静态 Metadata，未知语言由路由级 404 文案处理。 */
export function meta({ params }: Route.MetaArgs) {
  const copy = getHomeCopy(params.locale);
  if (!copy) return [{ title: "Not Found | Exile2 Guides" }];
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(),
    description: copy.metaDescription,
    locale: params.locale as ContentLocale,
    path: `/${params.locale}/`,
    title: copy.metaTitle,
  });
}

/** 按内容类型分组，首页模块与分类路由继续消费同一份构建期公开数据。 */
function groupHomeItems(items: readonly StaticContentCatalogPage[]) {
  return Object.fromEntries(
    homeSectionOrder.map((contentType) => [
      contentType,
      items.filter((item) => item.frontMatter.contentType === contentType),
    ]),
  ) as Record<(typeof homeSectionOrder)[number], StaticContentCatalogPage[]>;
}

/** 渲染一个真实内容模块；没有公开内容的类型不生成空白“建设中”区块。 */
function HomeContentSection({
  contentType,
  items,
  locale,
}: {
  contentType: (typeof homeSectionOrder)[number];
  items: readonly StaticContentCatalogPage[];
  locale: ContentLocale;
}) {
  if (items.length === 0) return null;
  const [kicker, title] = [
    t(locale, `home.section${cap(contentType)}Kicker` as const),
    t(locale, `home.section${cap(contentType)}Title` as const),
  ];

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
          {t(locale, "home.viewAll")} <span aria-hidden="true">›</span>
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
                typeLabel: t(
                  locale,
                  `home.type${cap(frontMatter.contentType)}` as const,
                ),
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
  counts,
  items,
  locale,
}: {
  counts: Record<ContentType, number>;
  items: readonly StaticContentCatalogPage[];
  locale: ContentLocale;
}) {
  const latestMajorPatch = items.find(
    (item) =>
      item.frontMatter.contentType === "patch" &&
      item.patchArticle?.patchVersion === latestMajorPatchVersion,
  );

  return (
    <aside
      className="home-sidebar"
      aria-label={t(locale, "home.publishedContent")}
    >
      {latestMajorPatch ? (
        <section className="home-sidebar__panel">
          <header className="home-sidebar__heading">
            <h2>{t(locale, "home.latestMajorPatch")}</h2>
            <span>{t(locale, "home.majorPatch")}</span>
          </header>
          <p className="home-sidebar__patch">
            {latestMajorPatch.frontMatter.patch}
          </p>
          <p>{latestMajorPatch.frontMatter.summary}</p>
          <a href={`/${locale}/patches/${latestMajorPatch.frontMatter.slug}/`}>
            {t(locale, "home.readPatch")} →
          </a>
        </section>
      ) : null}

      <section className="home-sidebar__panel">
        <h2>{t(locale, "home.versionScope")}</h2>
        <p>
          <strong>{t(locale, "home.currentVersion")}</strong>
          <br />
          {currentGameVersion}
        </p>
        <p>
          <strong>{t(locale, "home.historicalPatch")}</strong>
          <br />
          {historicalPatchRange}
        </p>
      </section>

      <section className="home-sidebar__panel">
        <h2>{t(locale, "home.publishedContent")}</h2>
        <ol className="home-ranking-list">
          {homeSectionOrder.map((contentType, index) => {
            const count = counts[contentType];
            const label = t(
              locale,
              `home.section${cap(contentType)}Title` as const,
            );
            return (
              <li key={contentType}>
                <span>{index + 1}</span>
                <div>
                  <strong>{label}</strong>
                  <small>
                    {t(locale, "search.resultsCount", { count: String(count) })}
                  </small>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home-sidebar__panel home-sidebar__notice">
        <h2>{t(locale, "home.editorialNote")}</h2>
        <p>{t(locale, "home.editorialNoteBody")}</p>
      </section>
    </aside>
  );
}

/** 渲染当前语言首页；内容卡片只消费构建期已发布页面，避免重新发现草稿。 */
export default function HomeRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const localeParam = params.locale;
  const copy = getHomeCopy(localeParam);
  if (!copy) {
    return (
      <main className="page-shell home-page home-page--not-found">
        <h1>Not Found</h1>
      </main>
    );
  }
  const locale = localeParam as ContentLocale;
  const items = loaderData.items;
  const counts = loaderData.counts;
  const groupedItems = groupHomeItems(items);
  const publishedCountByType = (contentType: ContentType) =>
    counts[contentType];

  return (
    <main className="home-page" data-prerender-content="true">
      <StructuredData data={createWebSiteJsonLd(locale)} />
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
            aria-label={t(locale, "home.siteStatus")}
          >
            <div className="home-stat-chip">
              <span aria-hidden="true">◉</span>
              <span>
                <strong>{currentGameVersion}</strong>
                <small>{t(locale, "home.currentVersion")}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">◇</span>
              <span>
                <strong>{publishedCountByType("guide")}</strong>
                <small>{t(locale, "home.typeGuide")}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">♜</span>
              <span>
                <strong>{publishedCountByType("boss")}</strong>
                <small>{t(locale, "home.typeBoss")}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">◇</span>
              <span>
                <strong>{publishedCountByType("item")}</strong>
                <small>{t(locale, "home.typeItem")}</small>
              </span>
            </div>
            <div className="home-stat-chip">
              <span aria-hidden="true">✦</span>
              <span>
                <strong>{publishedCountByType("skill")}</strong>
                <small>{t(locale, "home.typeSkill")}</small>
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
              {t(locale, "home.searchPlaceholder")}
            </label>
            <input
              id="home-search"
              name="q"
              placeholder={t(locale, "home.searchPlaceholder")}
              type="search"
            />
            <button type="submit">{t(locale, "home.searchSubmit")}</button>
          </form>
          <div className="home-popular-searches">
            <span>{t(locale, "home.popular")}</span>
            {[
              ["Path of Exile 2 Items", `/${locale}/items/`],
              [
                "Power, Frenzy & Endurance Charges",
                `/${locale}/guides/power-frenzy-endurance-charges/`,
              ],
              [currentGameVersion, `/${locale}/patches/`],
            ].map(([term, href]) => (
              <a href={href} key={term}>
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
                <p className="section-kicker">{t(locale, "home.startHere")}</p>
                <h2 id="quick-access-title">{t(locale, "home.quickAccess")}</h2>
              </div>
            </header>
            <div className="home-quick-access__grid">
              {quickAccessItems.map(([segment, icon]) => (
                <a href={`/${locale}/${segment}/`} key={segment}>
                  <span aria-hidden="true">{icon}</span>
                  <strong>
                    {t(locale, `home.quick${cap(segment)}` as const)}
                  </strong>
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
        <HomeSidebar counts={counts} items={items} locale={locale} />
      </div>
    </main>
  );
}

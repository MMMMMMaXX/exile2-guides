/** 文件职责：渲染 V4 各模块的受控子类聚合页；它只展示结构入口和真实内容摘要，不创建薄详情。 */
import { useParams } from "react-router";

import {
  CatalogCard,
  EmptyState,
  FactsRail,
  PageHero,
  StickyToc,
} from "../../components/v4/page-primitives";
import {
  contentTypeSegments,
  supportedLocales,
  type ContentLocale,
  type ContentType,
} from "../../lib/content/constants";
import { isV4Subtype } from "../../lib/content/v4-taxonomy";
import {
  createBilingualAlternatePaths,
  createSeoMetadata,
} from "../../lib/seo/metadata";
import { getNotFoundMeta } from "../../lib/seo/not-found";

const typeBySegment = new Map<string, ContentType>(
  Object.entries(contentTypeSegments).map(([type, segment]) => [
    segment,
    type as ContentType,
  ]),
);

/** 解析子类 URL，Build 的 class 段和其他模块的 category/group 段均使用同一受控词表。 */
function getSubtypeRoute(
  params: Record<string, string | undefined>,
):
  | { contentType: ContentType; locale: ContentLocale; subtype: string }
  | undefined {
  const locale = params.locale as ContentLocale | undefined;
  const contentType = params.class
    ? "build"
    : params.section
      ? typeBySegment.get(params.section)
      : undefined;
  const subtype = params.class ?? params.subtype;
  return locale &&
    contentType &&
    subtype &&
    supportedLocales.includes(locale) &&
    isV4Subtype(contentType, subtype)
    ? { contentType, locale, subtype }
    : undefined;
}

/** 为 V4 子类骨架输出可镜像的元数据；页面不含可索引正文时保持 noindex。 */
export function meta({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const route = getSubtypeRoute(params);
  if (!route)
    return getNotFoundMeta(params.locale === "zh-cn" ? "zh-cn" : "en");
  const prefix =
    route.contentType === "build"
      ? `builds/classes/${route.subtype}/`
      : `${contentTypeSegments[route.contentType]}/${route.subtype}/`;
  return createSeoMetadata({
    alternatePaths: createBilingualAlternatePaths(prefix),
    description: `V4 ${route.contentType} ${route.subtype} structure.`,
    locale: route.locale,
    path: `/${route.locale}/${prefix}`,
    robots: "noindex, follow",
    title: `${route.subtype} | Exile2 Guides`,
  });
}

/** 输出模块堆栈、导航和事实栏，作为未来真实分类内容的稳定挂载点。 */
export default function ContentSubtypeRoute() {
  const params = useParams();
  const route = getSubtypeRoute(params);
  if (!route)
    return <EmptyState title="This aggregation page is not available" />;
  const zh = route.locale === "zh-cn";
  const title = route.subtype.replace(/-/g, " ");
  const sectionItems = [
    "Overview",
    "Available entries",
    "Connections",
    "Publication rule",
  ];
  return (
    <main className="v4-subtype-page" data-prerender-content="true">
      <PageHero
        eyebrow={zh ? "分类聚合" : "Subtype aggregation"}
        title={title}
      />
      <div className="page-shell v4-subtype-layout">
        <StickyToc
          items={sectionItems.map((label, index) => ({
            href: `#v4-subtype-${index + 1}`,
            label,
          }))}
        />
        <article>
          <section className="v4-module-stack">
            {sectionItems.map((label, index) => (
              <section
                className="panel"
                id={`v4-subtype-${index + 1}`}
                key={label}
              >
                <p className="section-kicker">Module {index + 1}</p>
                <h2>{label}</h2>
                {index === 1 ? (
                  <div className="content-card-grid">
                    <CatalogCard
                      meta="Development index row · no detail page"
                      title={`${title} skeleton row`}
                    />
                  </div>
                ) : (
                  <EmptyState
                    title={`${label} is ready for reviewed ${route.contentType} content`}
                  />
                )}
              </section>
            ))}
          </section>
        </article>
        <FactsRail
          facts={[
            { label: "Module", value: route.contentType },
            { label: "Subtype", value: title },
            { label: "Publishing", value: "No thin details" },
          ]}
        />
      </div>
    </main>
  );
}

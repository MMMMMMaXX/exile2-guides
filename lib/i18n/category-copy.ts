/** 文件职责：集中维护分类页可索引导语和无内容状态文案，避免路由分散硬编码。 */
import type { ContentLocale, ContentType } from "../content/constants";

type CategoryCopy = {
  emptyDescription: string;
  emptyTitle: string;
  intro: string;
  label: string;
  metaDescription: string;
  metaTitle: string;
};

const categoryLabelByType: Record<ContentType, string> = {
  boss: "Bosses",
  build: "Builds",
  guide: "Guides",
  item: "Items",
  patch: "Patch Notes",
  skill: "Skills",
};

const buildCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Build guides will appear here after editorial review. Drafts and unverified sample builds are never shown on this public page.",
    emptyTitle: "Verified Builds are being prepared",
    intro:
      "This Build index is designed to make Path of Exile 2 choices easier to compare without reducing a guide to a single score. Each published Build explains its class, main skill, patch context, expected budget and learning curve, then links to the full progression guide. Use the light filters to narrow a small launch catalogue by class, difficulty, budget or patch. A Build only appears after its written advice, supporting sources and verification date are ready for publication. That means this page will stay intentionally quiet while the editorial catalogue is being prepared, rather than filling the list with copied, speculative or untested setups. When a guide is available, read the full page before committing resources: a good choice depends on your preferred playstyle, current patch and the gear you can realistically obtain.",
    label: "Builds",
    metaDescription:
      "Verified Path of Exile 2 Build guides, filterable by class, difficulty, budget and patch.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过编辑核验的 Build 攻略会在发布后显示于此。草稿、示例和未经核验的 Build 不会进入公开页面。",
    emptyTitle: "已核验 Build 攻略正在准备中",
    intro:
      "本页用于帮助玩家比较 Path of Exile 2 的 Build 选择，而不是用单一分数替代实际攻略。每一篇已发布 Build 都会说明职业、核心技能、适用版本、预算与上手难度，并链接到完整的成长路线。首发内容较少时，可通过职业、难度、预算和版本四个轻量条件缩小范围。只有在文字建议、核验来源和核验日期都准备完成后，Build 才会显示在这里。因此内容库准备期间，本页会保持真实的空状态，不会用搬运、猜测或未经测试的配置填充。攻略发布后，仍建议先阅读完整页面再投入资源：适合的选择取决于你的玩法偏好、当前版本，以及你实际能够取得的装备。",
    label: "Build 攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 Build 攻略，可按职业、难度、预算和版本筛选。",
    metaTitle: "Path of Exile 2 Build 攻略 | Exile2 Guides",
  },
};

const bossCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Boss guides will appear here after the encounter notes, sources and review date are ready. Drafts, placeholders and unverified sample bosses are never shown on this public page.",
    emptyTitle: "Verified Boss guides are being prepared",
    intro:
      "This Boss index collects verified Path of Exile 2 encounter guidance without pretending that every fight has a single universal solution. A published entry identifies its Campaign or Endgame context, Act or area when known, editorial difficulty, patch, recommended level when verified and the primary damage types worth preparing for. The light filters are deliberately limited to those facts, so the page remains useful with a small editorial catalogue and does not imply precision that the sources cannot support. Each Boss card leads to a full preparation page with its observed patterns, phase-by-phase notes, defensive considerations, common failure points, rewards only where verifiable, related guides and the sources behind the advice. Until those notes have been reviewed, this index stays honestly empty instead of filling a production route, sitemap or search index with speculative encounter details.",
    label: "Bosses",
    metaDescription:
      "Verified Path of Exile 2 Boss guides, filterable by campaign context, area, editorial difficulty and patch.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "首领攻略会在战斗笔记、来源和核验日期准备完成后显示。草稿、占位内容和未经核验的示例首领不会进入公开页面。",
    emptyTitle: "已核验首领攻略正在准备中",
    intro:
      "本页汇集经过核验的 Path of Exile 2 首领战攻略，不会假装每场战斗都存在唯一的通用解法。已发布条目会说明战役或终局语境、已知的章节或区域、编辑难度、适用版本、已核验时的建议等级，以及需要准备的主要伤害类型。筛选条件只保留这些可追溯事实，既能在首发内容较少时保持实用，也不会把来源无法支持的信息包装成精确结论。每张首领卡片都会通往完整的战前准备页面，其中包含已观察到的攻击提示、阶段笔记、防御准备、常见失误、仅在可核验时提供的掉落信息、关联攻略和来源。在这些内容经过审核前，本页会保持真实空状态，不会用猜测性的战斗细节填充生产路由、站点地图或搜索索引。",
    label: "首领攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 首领攻略，可按战役语境、区域、编辑难度和版本筛选。",
    metaTitle: "Path of Exile 2 首领攻略 | Exile2 Guides",
  },
};

/** 返回分类标题；Build 与 Boss 使用专属本地化名称，其他类型沿用稳定英文术语。 */
function getCategoryLabel(
  locale: ContentLocale,
  contentType: ContentType,
): string {
  if (contentType === "build") return buildCopyByLocale[locale].label;
  if (contentType === "boss") return bossCopyByLocale[locale].label;
  return categoryLabelByType[contentType];
}

/** 返回当前任务可用的分类文案；未单独实现的分类保持诚实的通用准备状态。 */
export function getCategoryCopy(
  locale: ContentLocale,
  contentType: ContentType,
): CategoryCopy {
  if (contentType === "build") return buildCopyByLocale[locale];
  if (contentType === "boss") return bossCopyByLocale[locale];

  const label = getCategoryLabel(locale, contentType);
  const isChinese = locale === "zh-cn";
  return {
    emptyDescription: isChinese
      ? "该分类的已核验内容将在完成编辑与发布后显示；本站不会使用草稿或样例填充页面。"
      : "Verified entries will appear after editorial review and publication. Drafts and sample content are not shown here.",
    emptyTitle: isChinese
      ? `${label} 正在准备中`
      : `${label} are being prepared`,
    intro: isChinese
      ? "该分类路由已经提供稳定的公开地址，方便从导航直接访问。专属列表、详情结构和内容核验将按项目任务逐步完成。"
      : "This category has a stable public URL for direct navigation. Its dedicated list, detail structure and verified editorial content will be completed in its scheduled project task.",
    label,
    metaDescription: isChinese
      ? `${label} 的已核验内容准备状态。`
      : `Verified ${label} content status on Exile2 Guides.`,
    metaTitle: `${label} | Exile2 Guides`,
  };
}

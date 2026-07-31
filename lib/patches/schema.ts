/** 文件职责：定义 Patches JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
import { z } from "zod";

import {
  patchStatuses,
  supportedLocales,
  verificationStatuses,
} from "../content/schema";
import {
  baseSectionShape,
  changelogEntriesSchema,
  faqItemsSchema,
  identifierList,
  isoDate,
  optionalImagePath,
  paragraphList,
  requiredText,
  sourceCategorySchema,
  sourceSchema,
  sourceVerificationChecklistSchema,
  stableIdentifier,
  videoEntriesSchema,
} from "../content/section-schema";

export const patchCategorySlugs = [
  "major-updates",
  "balance",
  "hotfixes",
  "bug-fixes",
] as const;
export const patchReservedSlugs = [
  "categories",
  ...patchCategorySlugs,
] as const;

// --- Patch 专属 Section 判别联合 ---

/** 叙述型章节：overview、important-changes、build-impact、re-verification、follow-up。 */
const patchNarrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "important-changes",
    "build-impact",
    "re-verification",
    "follow-up",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
});

/** 有序步骤章节：verification-steps、checklist。 */
const patchStepsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum(["verification-steps", "checklist"]),
  steps: z
    .array(
      z.strictObject({
        label: requiredText,
        body: paragraphList,
      }),
    )
    .default([]),
});

/** FAQ 复用共享结构。 */
const patchFaqSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("faq"),
  items: faqItemsSchema,
});

/** 视频复用共享结构。 */
const patchVideoSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("video"),
  entries: videoEntriesSchema,
});

/** 变更日志复用共享结构。 */
const patchChangelogSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("changelog"),
  entries: changelogEntriesSchema,
});

/** 来源与核验：分类展示来源并附带核验清单。 */
const patchSourcesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("sources"),
  categories: z.array(sourceCategorySchema).default([]),
  verificationChecklist: sourceVerificationChecklistSchema,
});

// --- Patch 专属富内容模块（视觉原型 realization） ---

/** Patch Family 时间线：同一版本族的多个节点（主 Patch、Hotfix、技术补丁）。 */
const patchFamilyTimelineSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("patch-family-timeline"),
  versions: z
    .array(
      z.strictObject({
        code: requiredText,
        date: requiredText,
        kind: requiredText,
        summary: requiredText,
        tags: identifierList,
      }),
    )
    .min(1),
});

/** 影响仪表盘：一张卡片说明一个受影响域（Atlas、Builds、Bosses、Items 等）。 */
const patchImpactDashboardSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("impact-dashboard"),
  cards: z
    .array(
      z.strictObject({
        area: requiredText,
        verdict: requiredText,
        detail: requiredText,
      }),
    )
    .min(1),
});

/** 改动浏览器：每条官方改动按玩家问题重组，并标注分类/类型/影响范围。 */
const patchChangeExplorerSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("change-explorer"),
  changes: z
    .array(
      z.strictObject({
        category: z.enum([
          "new",
          "buff",
          "nerf",
          "fix",
          "qol",
          "technical",
          "balance",
          "atlas",
          "boss",
          "item",
        ]),
        title: requiredText,
        detail: requiredText,
        scope: requiredText,
      }),
    )
    .min(1),
});

/** Before/After 对照：旧内容风险 vs 当前内容要求。 */
const patchBeforeAfterSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("before-after"),
  oldLabel: requiredText,
  oldText: requiredText,
  newLabel: requiredText,
  newText: requiredText,
});

/** Boss 影响网格：逐个 Boss 说明本次连续改动。 */
const patchBossImpactSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("boss-impact"),
  bosses: z
    .array(
      z.strictObject({
        name: requiredText,
        detail: requiredText,
        action: requiredText,
      }),
    )
    .min(1),
});

/** Item 影响标签页：逐个新增/变化物品给出说明与依赖关系。 */
const patchItemImpactSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("item-impact"),
  items: z
    .array(
      z.strictObject({
        kind: requiredText,
        title: requiredText,
        detail: requiredText,
        tags: identifierList,
      }),
    )
    .min(1),
});

/** 受影响内容更新队列：驱动站内实际维护的 Affected Content Queue。 */
const patchAffectedContentSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("affected-content"),
  rows: z
    .array(
      z.strictObject({
        name: requiredText,
        type: z.enum([
          "boss",
          "build",
          "item",
          "skill",
          "guide",
          "patch",
          "other",
        ]),
        trigger: requiredText,
        action: requiredText,
        status: z.enum(["ready", "reviewing", "queued"]),
      }),
    )
    .min(1),
});

/** 社区证据：玩家报告用于判断问题是否解决，不替代官方事实。 */
const patchCommunityEvidenceSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("community-evidence"),
  reports: z
    .array(
      z.strictObject({
        source: requiredText,
        context: requiredText,
        quote: requiredText,
        analysis: requiredText,
      }),
    )
    .min(1),
});

/** 技术环境矩阵：不同 Renderer / 平台 / 运行阶段拆开说明。 */
const patchTechnicalEnvironmentSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("technical-environment"),
  environments: z
    .array(
      z.strictObject({
        key: z.enum([
          "steam-vulkan",
          "steam-dx12",
          "standalone",
          "console",
        ]),
        note: requiredText,
      }),
    )
    .min(1),
});

/** 已知问题面板：官方仍未修复或社区仍在报告的现象。 */
const patchKnownIssuesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("known-issues"),
  issues: z
    .array(
      z.strictObject({
        text: requiredText,
        status: z.enum(["open", "tracking", "fixed"]).default("open"),
      }),
    )
    .min(1),
});

/** Patch 后续链：薄 Hotfix 与主 Patch、技术补丁之间的衔接关系。 */
const patchFollowupSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("patch-followup"),
  children: z
    .array(
      z.strictObject({
        code: requiredText,
        relation: requiredText,
      }),
    )
    .min(1),
});

export const patchSectionSchema = z.discriminatedUnion("type", [
  patchNarrativeSectionSchema,
  patchStepsSectionSchema,
  patchFaqSectionSchema,
  patchVideoSectionSchema,
  patchChangelogSectionSchema,
  patchSourcesSectionSchema,
  patchFamilyTimelineSectionSchema,
  patchImpactDashboardSectionSchema,
  patchChangeExplorerSectionSchema,
  patchBeforeAfterSectionSchema,
  patchBossImpactSectionSchema,
  patchItemImpactSectionSchema,
  patchAffectedContentSectionSchema,
  patchCommunityEvidenceSectionSchema,
  patchTechnicalEnvironmentSectionSchema,
  patchKnownIssuesSectionSchema,
  patchFollowupSectionSchema,
]);

// --- PatchArticle 顶层结构 ---

const patchArticleBaseSchema = z.strictObject({
  id: stableIdentifier,
  slug: stableIdentifier,
  locale: z.enum(supportedLocales),
  type: z.literal("patch"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),

  title: requiredText,
  shortTitle: requiredText,
  summary: requiredText,
  description: requiredText,

  // Patch 语义字段
  patchCategory: z.enum(patchCategorySlugs).nullable().default(null),
  patchVersion: requiredText,

  patch: requiredText,
  league: requiredText,
  patchStatus: z.enum(patchStatuses),
  verificationStatus: z.enum(verificationStatuses).optional(),
  verifiedClientVersion: requiredText.optional(),

  author: requiredText,
  reviewer: z.string().trim().default(""),
  createdAt: isoDate,
  publishedAt: isoDate.optional(),
  updatedAt: isoDate,
  lastVerifiedAt: isoDate.optional(),

  heroImage: optionalImagePath,
  cardImage: optionalImagePath,
  imageAlt: requiredText.optional(),

  tags: identifierList,
  sections: z.array(patchSectionSchema).default([]),
  relatedBuildIds: identifierList,
  relatedBossIds: identifierList,
  relatedItemIds: identifierList,
  relatedGuideIds: identifierList,
  relatedSkillIds: identifierList,
  sources: z.array(sourceSchema).default([]),

  seo: z.strictObject({
    title: requiredText,
    description: requiredText,
    noindex: z.boolean().optional(),
  }),
});

/**
 * 发布门禁采用 pending-pc 友好策略：允许待核验 Patch 以结构化编辑摘要形式发布。
 * verified 状态下才要求完整 Patch 事实（patchCategory）。
 */
export const patchArticleSchema = patchArticleBaseSchema.superRefine(
  (article, context) => {
    if (
      patchReservedSlugs.includes(
        article.slug as (typeof patchReservedSlugs)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "slug is reserved by the Patches router",
        path: ["slug"],
      });
    }

    const sectionIds = new Set<string>();
    const sectionOrders = new Set<number>();
    article.sections.forEach((section, index) => {
      if (sectionIds.has(section.id)) {
        context.addIssue({
          code: "custom",
          message: "section id must be unique within an article",
          path: ["sections", index, "id"],
        });
      }
      if (sectionOrders.has(section.order)) {
        context.addIssue({
          code: "custom",
          message: "section order must be unique within an article",
          path: ["sections", index, "order"],
        });
      }
      sectionIds.add(section.id);
      sectionOrders.add(section.order);
    });

    if ((article.heroImage || article.cardImage) && !article.imageAlt) {
      context.addIssue({
        code: "custom",
        message: "imageAlt is required when an article image is present",
        path: ["imageAlt"],
      });
    }

    if (article.status !== "published") return;

    if (
      /\bTODO\b|REPLACE_WITH_|example\.invalid|\bdraft\b|草稿/i.test(
        JSON.stringify(article),
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "published patch cannot contain draft or placeholder values",
      });
    }

    if (article.sections.length === 0 || article.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "published patch requires sections and sources",
      });
    }

    if (!article.reviewer || !article.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "published patch requires reviewer and publication date",
      });
    }

    if (
      article.verificationStatus === "verified" &&
      !article.verifiedClientVersion
    ) {
      context.addIssue({
        code: "custom",
        message: "verified patch requires verifiedClientVersion",
        path: ["verifiedClientVersion"],
      });
    }

    // verified 状态要求完整 Patch 事实
    if (article.verificationStatus === "verified") {
      if (!article.patchCategory) {
        context.addIssue({
          code: "custom",
          message: "verified patch requires patchCategory",
        });
      }
    }
  },
);

export type PatchArticle = z.infer<typeof patchArticleSchema>;
export type PatchSection = z.infer<typeof patchSectionSchema>;
export type PatchCategory = (typeof patchCategorySlugs)[number];

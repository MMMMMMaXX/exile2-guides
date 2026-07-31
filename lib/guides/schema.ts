/** 文件职责：定义 Guides JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
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

export const guideCategorySlugs = [
  "beginner",
  "campaign",
  "mechanics",
  "crafting-trading",
  "endgame-atlas",
  "troubleshooting",
] as const;
export const guideReservedSlugs = [
  "categories",
  ...guideCategorySlugs,
] as const;

// --- Guide 专属 Section 判别联合 ---

/** 叙述型章节：overview、preparation、decisions、common-mistakes、verification。 */
const guideNarrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "preparation",
    "decisions",
    "common-mistakes",
    "verification",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
});

/** 有序步骤章节：progression-steps、verification-steps、checklist。 */
const guideStepsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum(["progression-steps", "verification-steps", "checklist"]),
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
const guideFaqSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("faq"),
  items: faqItemsSchema,
});

/** 视频复用共享结构。 */
const guideVideoSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("video"),
  entries: videoEntriesSchema,
});

/** 变更日志复用共享结构。 */
const guideChangelogSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("changelog"),
  entries: changelogEntriesSchema,
});

/** 来源与核验：分类展示来源并附带核验清单。 */
const guideSourcesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("sources"),
  categories: z.array(sourceCategorySchema).default([]),
  verificationChecklist: sourceVerificationChecklistSchema,
});

/** 速答卡片网格：quick-answer 章节用于页面顶部直接答案。 */
const guideQuickAnswerSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("quick-answer"),
  items: z
    .array(
      z.strictObject({
        body: paragraphList,
        link: z.url().optional(),
        linkLabel: requiredText.optional(),
        title: requiredText,
      }),
    )
    .min(1),
});

/** 关键数字概览：stat-grid 章节用于进度/总量速览。 */
const guideStatGridSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("stat-grid"),
  stats: z
    .array(
      z.strictObject({
        label: requiredText,
        note: requiredText.optional(),
        value: requiredText,
      }),
    )
    .min(1),
  note: requiredText.optional(),
});

/** 可筛选数据表：data-table 章节用于奖励矩阵、对比表等。 */
const guideDataTableSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("data-table"),
  caption: requiredText.optional(),
  columns: z
    .array(z.strictObject({ key: requiredText, label: requiredText }))
    .min(1),
  filters: z
    .array(z.strictObject({ id: requiredText, label: requiredText }))
    .default([]),
  rows: z
    .array(
      z.strictObject({
        cells: z.record(requiredText, requiredText),
        tags: identifierList,
      }),
    )
    .min(1),
  note: requiredText.optional(),
});

/** 标签切换面板：tabs 章节用于阶段/模式/平台切换说明。 */
const guideTabsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("tabs"),
  intro: requiredText.optional(),
  tabs: z
    .array(
      z.strictObject({
        bullets: paragraphList,
        id: stableIdentifier,
        label: requiredText,
        paragraphs: paragraphList,
        steps: z
          .array(
            z.strictObject({ body: paragraphList, label: requiredText }),
          )
          .default([]),
      }),
    )
    .min(1),
});

/** 卡片网格：card-grid 章节用于路线步骤、社区证据、用例等。 */
const guideCardGridSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("card-grid"),
  intro: requiredText.optional(),
  cards: z
    .array(
      z.strictObject({
        body: paragraphList,
        link: z.url().optional(),
        linkLabel: requiredText.optional(),
        tag: requiredText.optional(),
        title: requiredText,
      }),
    )
    .min(1),
});

/** 交互诊断器：diagnostic 章节用于从症状反查原因与修复步骤。 */
const guideDiagnosticSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("diagnostic"),
  intro: requiredText.optional(),
  controls: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        label: requiredText,
        options: z
          .array(z.strictObject({ label: requiredText, value: requiredText }))
          .min(1),
      }),
    )
    .min(1),
  rules: z
    .array(
      z.strictObject({
        link: z.url().optional(),
        linkLabel: requiredText.optional(),
        steps: paragraphList,
        title: requiredText,
        when: z.record(requiredText, requiredText),
      }),
    )
    .default([]),
  defaultResult: z
    .strictObject({
      link: z.url().optional(),
      linkLabel: requiredText.optional(),
      steps: paragraphList,
      title: requiredText,
    })
    .optional(),
});

export const guideSectionSchema = z.discriminatedUnion("type", [
  guideNarrativeSectionSchema,
  guideStepsSectionSchema,
  guideFaqSectionSchema,
  guideVideoSectionSchema,
  guideChangelogSectionSchema,
  guideSourcesSectionSchema,
  guideQuickAnswerSectionSchema,
  guideStatGridSectionSchema,
  guideDataTableSectionSchema,
  guideTabsSectionSchema,
  guideCardGridSectionSchema,
  guideDiagnosticSectionSchema,
]);

// --- GuideArticle 顶层结构 ---

const guideArticleBaseSchema = z.strictObject({
  id: stableIdentifier,
  slug: stableIdentifier,
  locale: z.enum(supportedLocales),
  type: z.literal("guide"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),

  title: requiredText,
  shortTitle: requiredText,
  summary: requiredText,
  description: requiredText,

  // Guide 语义字段
  guideCategory: z.enum(guideCategorySlugs).nullable().default(null),
  estimatedReadingMinutes: z.number().int().positive().nullable().default(null),
  prerequisites: paragraphList,

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
  sections: z.array(guideSectionSchema).default([]),
  relatedBuildIds: identifierList,
  relatedBossIds: identifierList,
  relatedItemIds: identifierList,
  relatedPatchIds: identifierList,
  relatedSkillIds: identifierList,
  sources: z.array(sourceSchema).default([]),

  seo: z.strictObject({
    title: requiredText,
    description: requiredText,
    noindex: z.boolean().optional(),
  }),
});

/**
 * 发布门禁采用 pending-pc 友好策略：允许待核验 Guide 以结构化核验计划形式发布。
 * verified 状态下才要求完整 Guide 事实（guideCategory）。
 */
export const guideArticleSchema = guideArticleBaseSchema.superRefine(
  (article, context) => {
    if (
      guideReservedSlugs.includes(
        article.slug as (typeof guideReservedSlugs)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "slug is reserved by the Guides router",
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
        message: "published guide cannot contain draft or placeholder values",
      });
    }

    if (article.sections.length === 0 || article.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "published guide requires sections and sources",
      });
    }

    if (!article.reviewer || !article.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "published guide requires reviewer and publication date",
      });
    }

    if (
      article.verificationStatus === "verified" &&
      !article.verifiedClientVersion
    ) {
      context.addIssue({
        code: "custom",
        message: "verified guide requires verifiedClientVersion",
        path: ["verifiedClientVersion"],
      });
    }

    // verified 状态要求完整 Guide 事实
    if (article.verificationStatus === "verified") {
      if (!article.guideCategory) {
        context.addIssue({
          code: "custom",
          message: "verified guide requires guideCategory",
        });
      }
    }
  },
);

export type GuideArticle = z.infer<typeof guideArticleSchema>;
export type GuideSection = z.infer<typeof guideSectionSchema>;
export type GuideCategory = (typeof guideCategorySlugs)[number];

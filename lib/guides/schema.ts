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
  sourceSchema,
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

export const guideSectionSchema = z.discriminatedUnion("type", [
  guideNarrativeSectionSchema,
  guideStepsSectionSchema,
  guideFaqSectionSchema,
  guideVideoSectionSchema,
  guideChangelogSectionSchema,
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

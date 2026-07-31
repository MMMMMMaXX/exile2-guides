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

export const patchSectionSchema = z.discriminatedUnion("type", [
  patchNarrativeSectionSchema,
  patchStepsSectionSchema,
  patchFaqSectionSchema,
  patchVideoSectionSchema,
  patchChangelogSectionSchema,
  patchSourcesSectionSchema,
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

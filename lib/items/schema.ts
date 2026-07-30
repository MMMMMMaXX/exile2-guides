/** 文件职责：定义 Items JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
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

export const itemCategorySlugs = [
  "weapons",
  "off-hand",
  "armour",
  "jewellery",
  "currency",
  "unique-items",
] as const;
export const itemRarities = ["normal", "magic", "rare", "unique"] as const;
export const itemReservedSlugs = ["categories", ...itemCategorySlugs] as const;

// --- Item 专属 Section 判别联合 ---

/** 叙述型章节：overview、acquisition、use-cases、alternatives、common-mistakes、verification。 */
const itemNarrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "acquisition",
    "use-cases",
    "alternatives",
    "common-mistakes",
    "verification",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
});

/** 物品属性键值对。 */
const itemPropertiesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("properties"),
  properties: z
    .array(
      z.strictObject({
        label: requiredText,
        notes: paragraphList,
        value: requiredText,
      }),
    )
    .default([]),
});

/** 获取方式有序步骤。 */
const itemAcquisitionStepsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("acquisition-steps"),
  steps: z
    .array(
      z.strictObject({
        body: paragraphList,
        label: requiredText,
      }),
    )
    .default([]),
});

/** FAQ 复用共享结构。 */
const itemFaqSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("faq"),
  items: faqItemsSchema,
});

/** 视频复用共享结构。 */
const itemVideoSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("video"),
  entries: videoEntriesSchema,
});

/** 变更日志复用共享结构。 */
const itemChangelogSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("changelog"),
  entries: changelogEntriesSchema,
});

export const itemSectionSchema = z.discriminatedUnion("type", [
  itemNarrativeSectionSchema,
  itemPropertiesSectionSchema,
  itemAcquisitionStepsSectionSchema,
  itemFaqSectionSchema,
  itemVideoSectionSchema,
  itemChangelogSectionSchema,
]);

// --- ItemArticle 顶层结构 ---

const itemArticleBaseSchema = z.strictObject({
  id: stableIdentifier,
  slug: stableIdentifier,
  locale: z.enum(supportedLocales),
  type: z.literal("item"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),

  title: requiredText,
  shortTitle: requiredText,
  summary: requiredText,
  description: requiredText,

  // Item 语义字段（nullable，允许待核验内容发布）
  itemType: z.string().trim().nullable().default(null),
  rarity: z.enum(itemRarities).nullable().default(null),
  requiredLevel: z.string().trim().nullable().default(null),
  useCases: identifierList,
  itemCategory: z.enum(itemCategorySlugs).nullable().default(null),

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
  sections: z.array(itemSectionSchema).default([]),
  relatedBuildIds: identifierList,
  relatedBossIds: identifierList,
  relatedGuideIds: identifierList,
  relatedPatchIds: identifierList,
  sources: z.array(sourceSchema).default([]),

  seo: z.strictObject({
    title: requiredText,
    description: requiredText,
    noindex: z.boolean().optional(),
  }),
});

/**
 * 发布门禁采用 pending-pc 友好策略：允许待核验 Item 以结构化核验计划形式发布。
 * verified 状态下才要求完整物品事实（itemType/rarity/itemCategory）。
 */
export const itemArticleSchema = itemArticleBaseSchema.superRefine(
  (article, context) => {
    if (
      itemReservedSlugs.includes(
        article.slug as (typeof itemReservedSlugs)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "slug is reserved by the Items router",
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
        message: "published item cannot contain draft or placeholder values",
      });
    }

    if (article.sections.length === 0 || article.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "published item requires sections and sources",
      });
    }

    if (!article.reviewer || !article.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "published item requires reviewer and publication date",
      });
    }

    if (
      article.verificationStatus === "verified" &&
      !article.verifiedClientVersion
    ) {
      context.addIssue({
        code: "custom",
        message: "verified item requires verifiedClientVersion",
        path: ["verifiedClientVersion"],
      });
    }

    // verified 状态要求完整物品事实
    if (article.verificationStatus === "verified") {
      if (!article.itemType || !article.rarity || !article.itemCategory) {
        context.addIssue({
          code: "custom",
          message:
            "verified item requires complete identity fields (itemType, rarity, itemCategory)",
        });
      }
    }
  },
);

export type ItemArticle = z.infer<typeof itemArticleSchema>;
export type ItemSection = z.infer<typeof itemSectionSchema>;
export type ItemRarity = (typeof itemRarities)[number];
export type ItemCategory = (typeof itemCategorySlugs)[number];

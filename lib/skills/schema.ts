/** 文件职责：定义 Skills JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
import { z } from "zod";

import {
  patchStatuses,
  supportedLocales,
  verificationStatuses,
} from "../content/schema";
import { translationMetaSchema } from "../content/translation";
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

export const skillCategorySlugs = [
  "active",
  "support",
  "spirit",
  "meta",
  "lineage",
  "ascendancy",
] as const;
export const skillTypes = ["active", "support", "passive"] as const;
export const skillReservedSlugs = [
  "categories",
  ...skillCategorySlugs,
] as const;

// --- Skill 专属 Section 判别联合 ---

/** 叙述型章节：overview、mechanics、build-use-cases、common-mistakes、verification。 */
const skillNarrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "mechanics",
    "build-use-cases",
    "common-mistakes",
    "verification",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
});

/** 推荐辅助宝石列表。 */
const skillSupportsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("supports"),
  supports: z
    .array(
      z.strictObject({
        label: requiredText,
        notes: paragraphList,
        priority: z.enum(["core", "situational", "optional", "incompatible"]).default("core"),
      }),
    )
    .default([]),
});

/** 技能标签与属性键值对。 */
const skillPropertiesSectionSchema = z.strictObject({
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

/** FAQ 复用共享结构。 */
const skillFaqSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("faq"),
  items: faqItemsSchema,
});

/** 视频复用共享结构。 */
const skillVideoSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("video"),
  entries: videoEntriesSchema,
});

/** 变更日志复用共享结构。 */
const skillChangelogSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("changelog"),
  entries: changelogEntriesSchema,
});

/** 来源与核验：分类展示来源并附带核验清单。 */
const skillSourcesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("sources"),
  categories: z.array(sourceCategorySchema).default([]),
  verificationChecklist: sourceVerificationChecklistSchema,
});

/** 结构化数据表：支持家族对比、Debuff 矩阵、能量规则、连锁优先级等需表格呈现的章节。 */
const skillDataTableSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("data-table"),
  columns: z.array(requiredText).min(1),
  rows: z.array(z.array(requiredText)).default([]),
});

/**
 * 富结构章节：承载第三批所需的多种复用业务模型
 * （quick-answer、requirements、ammunition-reload、deployed-object、hit-sequence 等）。
 * 统一携带叙述(paragraphs/bullets)、步骤(steps)、键值(keyValues)与表格(columns/rows)等可选字段，
 * 由渲染层按可用字段渲染，避免为单篇文章引入一次性类型。
 */
const skillRichSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "quick-answer",
    "requirements",
    "ammunition-reload",
    "detonator-interaction",
    "deployed-object",
    "object-limits",
    "skill-interactions",
    "combo-sequence",
    "weapon-set",
    "mapping-rotation",
    "bossing-rotation",
    "support-compatibility",
    "support-loadouts",
    "troubleshooting",
    "community-evidence",
    "attack-empowerment",
    "charge-generation",
    "hit-sequence",
    "hit-behaviour",
    "persistent-buff",
    "remnant-revival",
    "spirit-budget",
    "quality",
    "clone-meta",
    "socketed-attacks",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
  steps: z
    .array(
      z.strictObject({
        label: requiredText,
        action: requiredText,
        result: requiredText,
      }),
    )
    .optional(),
  keyValues: z
    .array(
      z.strictObject({
        label: requiredText,
        value: requiredText,
        notes: paragraphList,
      }),
    )
    .optional(),
  columns: z.array(requiredText).optional(),
  rows: z.array(z.array(requiredText)).optional(),
});

export const skillSectionSchema = z.discriminatedUnion("type", [
  skillNarrativeSectionSchema,
  skillSupportsSectionSchema,
  skillPropertiesSectionSchema,
  skillFaqSectionSchema,
  skillVideoSectionSchema,
  skillChangelogSectionSchema,
  skillSourcesSectionSchema,
  skillDataTableSectionSchema,
  skillRichSectionSchema,
]);

// --- SkillArticle 顶层结构 ---

const skillArticleBaseSchema = z.strictObject({
  id: stableIdentifier,
  slug: stableIdentifier,
  locale: z.enum(supportedLocales),
  type: z.literal("skill"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),

  title: requiredText,
  shortTitle: requiredText,
  summary: requiredText,
  description: requiredText,

  // Skill 语义字段（nullable，允许待核验内容发布）
  skillType: z.enum(skillTypes).nullable().default(null),
  requiredLevel: z.string().trim().nullable().default(null),
  gemLevel: z.string().trim().nullable().default(null),
  uncutGemTier: z.number().int().positive().nullable().default(null),
  minimumCharacterLevel: z.number().int().nonnegative().nullable().default(null),
  spiritReservation: z.number().int().nonnegative().nullable().default(null),
  skillCategory: z.enum(skillCategorySlugs).nullable().default(null),
  skillTags: identifierList,

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
  sections: z.array(skillSectionSchema).default([]),
  relatedBuildIds: identifierList,
  relatedBossIds: identifierList,
  relatedGuideIds: identifierList,
  relatedItemIds: identifierList,
  relatedPatchIds: identifierList,
  relatedSkillIds: identifierList,
  sources: z.array(sourceSchema).default([]),

  seo: z.strictObject({
    title: requiredText,
    description: requiredText,
    noindex: z.boolean().optional(),
  }),

  // 目标语言译文元数据（可选）。由翻译流水线写入，不影响既有英语/中文内容。
  translation: translationMetaSchema.optional(),

  // 英语事实源修订号：修改 en 源时必须 bump，供 translations:stale 检测译文是否过期；可选，老文件可不含。
  revision: z.string().trim().min(1).optional(),
});

/**
 * 发布门禁采用 pending-pc 友好策略：允许待核验 Skill 以结构化核验计划形式发布。
 * verified 状态下才要求完整技能事实（skillType/skillCategory）。
 */
export const skillArticleSchema = skillArticleBaseSchema.superRefine(
  (article, context) => {
    if (
      skillReservedSlugs.includes(
        article.slug as (typeof skillReservedSlugs)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "slug is reserved by the Skills router",
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

    // 译文元数据块（translation.translationStatus 可能为 "machine-draft"）属于正常翻译状态，
    // 不应触发针对正文占位的 draft 检测，因此扫描时排除该块。
    const articleContent = { ...article };
    delete articleContent.translation;
    if (
      /\bTODO\b|REPLACE_WITH_|example\.invalid|\bdraft\b|草稿/.test(
        JSON.stringify(articleContent),
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "published skill cannot contain draft or placeholder values",
      });
    }

    if (article.sections.length === 0 || article.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "published skill requires sections and sources",
      });
    }

    if (!article.reviewer || !article.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "published skill requires reviewer and publication date",
      });
    }

    if (
      article.verificationStatus === "verified" &&
      !article.verifiedClientVersion
    ) {
      context.addIssue({
        code: "custom",
        message: "verified skill requires verifiedClientVersion",
        path: ["verifiedClientVersion"],
      });
    }

    // verified 状态要求完整技能事实
    if (article.verificationStatus === "verified") {
      if (!article.skillType || !article.skillCategory) {
        context.addIssue({
          code: "custom",
          message:
            "verified skill requires complete identity fields (skillType, skillCategory)",
        });
      }
    }
  },
);

export type SkillArticle = z.infer<typeof skillArticleSchema>;
export type SkillSection = z.infer<typeof skillSectionSchema>;
export type SkillRichSection = z.infer<typeof skillRichSectionSchema>;
export type SkillType = (typeof skillTypes)[number];
export type SkillCategory = (typeof skillCategorySlugs)[number];

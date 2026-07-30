/** 文件职责：定义 Builds JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
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
  figureImageSchema,
  identifierList,
  isoDate,
  optionalImagePath,
  paragraphList,
  requiredText,
  sourceSchema,
  stableIdentifier,
  videoEntriesSchema,
} from "../content/section-schema";

export const buildStages = [
  "starter",
  "leveling",
  "early-endgame",
  "endgame",
  "bossing",
] as const;
export const buildBudgets = ["low", "medium", "high", "luxury"] as const;
export const buildDifficulties = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
export const buildCategorySlugs = [
  "starter",
  "leveling",
  "endgame",
  "bossing",
  "budget",
] as const;
export const buildReservedSlugs = [
  "classes",
  "ascendancies",
  ...buildCategorySlugs,
] as const;

const narrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "playstyle",
    "mapping",
    "bossing",
    "transformation",
    "crossbow",
    "dot-rotation",
    "community",
    "sources",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
});

const prosConsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("pros-cons"),
  pros: paragraphList,
  cons: paragraphList,
});

const progressionSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum(["leveling", "passive-tree", "ascendancy", "upgrade-priority"]),
  steps: z
    .array(
      z.strictObject({
        body: paragraphList,
        label: requiredText,
        levelRange: requiredText.optional(),
      }),
    )
    .default([]),
});

const skillsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("skills"),
  groups: z
    .array(
      z.strictObject({
        label: requiredText,
        skills: z
          .array(
            z.strictObject({
              notes: paragraphList,
              role: requiredText,
              skillId: stableIdentifier,
              supportSkillIds: identifierList,
            }),
          )
          .default([]),
      }),
    )
    .default([]),
});

const gearSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("gear"),
  slots: z
    .array(
      z.strictObject({
        notes: paragraphList,
        recommendations: paragraphList,
        slot: requiredText,
      }),
    )
    .default([]),
});

const statPrioritySectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("stat-priority"),
  priorities: z
    .array(
      z.strictObject({
        label: requiredText,
        reason: requiredText,
      }),
    )
    .default([]),
});

const troubleshootingSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("troubleshooting"),
  problems: z
    .array(
      z.strictObject({
        checks: paragraphList,
        symptom: requiredText,
      }),
    )
    .default([]),
});

/** 复用共享 faqItemsSchema；Build 专属 Section 类型声明仍保留在本模块。 */
const faqSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("faq"),
  items: faqItemsSchema,
});

/** 复用共享 videoEntriesSchema。 */
const videoSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("video"),
  entries: videoEntriesSchema,
});

const figureSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("figure"),
  image: figureImageSchema,
});

const comparisonTableSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("comparison-table"),
  caption: requiredText,
  columns: z.array(requiredText).min(1),
  rows: z
    .array(
      z.strictObject({
        cells: z.array(requiredText).min(1),
        label: requiredText,
      }),
    )
    .default([]),
});

const communityVoicesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("community-voices"),
  entries: z
    .array(
      z.strictObject({
        context: requiredText,
        label: requiredText,
        representation: z.enum(["quote", "paraphrase"]),
        sourceType: z.enum(["forum", "reddit", "guide", "video"]),
        statement: requiredText,
        url: z.url(),
      }),
    )
    .default([]),
  note: requiredText,
});

const questionAnswerSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("question-answer"),
  items: z
    .array(
      z.strictObject({
        answer: paragraphList,
        bullets: paragraphList,
        question: requiredText,
        relatedLinks: z
          .array(
            z.strictObject({
              href: z.string().trim().startsWith("/"),
              label: requiredText,
            }),
          )
          .default([]),
      }),
    )
    .default([]),
});

/** 复用共享 changelogEntriesSchema。 */
const changelogSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("changelog"),
  entries: changelogEntriesSchema,
});

export const buildSectionSchema = z.discriminatedUnion("type", [
  narrativeSectionSchema,
  prosConsSectionSchema,
  progressionSectionSchema,
  skillsSectionSchema,
  gearSectionSchema,
  statPrioritySectionSchema,
  troubleshootingSectionSchema,
  faqSectionSchema,
  videoSectionSchema,
  figureSectionSchema,
  comparisonTableSectionSchema,
  communityVoicesSectionSchema,
  questionAnswerSectionSchema,
  changelogSectionSchema,
]);

const buildArticleBaseSchema = z.strictObject({
  id: stableIdentifier,
  slug: stableIdentifier,
  locale: z.enum(supportedLocales),
  type: z.literal("build"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),

  title: requiredText,
  shortTitle: requiredText,
  summary: requiredText,
  description: requiredText,

  classId: stableIdentifier,
  ascendancyId: stableIdentifier.nullable().default(null),
  mainSkillIds: identifierList,
  secondarySkillIds: identifierList,
  stages: z.array(z.enum(buildStages)).default([]),
  budgets: z.array(z.enum(buildBudgets)).default([]),
  difficulty: z.enum(buildDifficulties).nullable().default(null),
  playstyleTags: identifierList,
  damageTypes: identifierList,
  bestFor: identifierList,

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
  sections: z.array(buildSectionSchema).default([]),
  relatedBuildIds: identifierList,
  relatedGuideIds: identifierList,
  sources: z.array(sourceSchema).default([]),

  seo: z.strictObject({
    title: requiredText,
    description: requiredText,
    noindex: z.boolean().optional(),
  }),
});

/**
 * 发布门禁只接受完整且可追溯的数据；草稿可以保留待核验字段，但仍须通过结构校验。
 * canonical 始终从 locale 和 slug 推导，禁止在 JSON 中维护可能漂移的第二份 URL。
 */
export const buildArticleSchema = buildArticleBaseSchema.superRefine(
  (article, context) => {
    if (
      buildReservedSlugs.includes(
        article.slug as (typeof buildReservedSlugs)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "slug is reserved by the Builds router",
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
        message: "published build cannot contain draft or placeholder values",
      });
    }

    const requiredPublishedFields = [
      article.mainSkillIds.length,
      article.stages.length,
      article.budgets.length,
      article.playstyleTags.length,
      article.damageTypes.length,
      article.bestFor.length,
      article.sections.length,
      article.sources.length,
    ];
    if (requiredPublishedFields.some((length) => length === 0)) {
      context.addIssue({
        code: "custom",
        message:
          "published build requires skills, taxonomy, sections, facts and sources",
      });
    }
    if (
      !article.difficulty ||
      !article.reviewer ||
      !article.publishedAt ||
      (!article.lastVerifiedAt && article.verificationStatus !== "pending-pc")
    ) {
      context.addIssue({
        code: "custom",
        message:
          "published build requires difficulty, reviewer, publication and verification dates",
      });
    }
    if (
      article.verificationStatus === "verified" &&
      !article.verifiedClientVersion
    ) {
      context.addIssue({
        code: "custom",
        message: "verified build requires verifiedClientVersion",
        path: ["verifiedClientVersion"],
      });
    }
  },
);

export type BuildArticle = z.infer<typeof buildArticleSchema>;
export type BuildSection = z.infer<typeof buildSectionSchema>;
export type BuildStage = (typeof buildStages)[number];
export type BuildBudget = (typeof buildBudgets)[number];
export type BuildDifficulty = (typeof buildDifficulties)[number];

/** 文件职责：定义 Builds JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
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
  figureImageSchema,
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
        symptom: z.string().trim().optional(),
        checks: paragraphList.optional(),
        upgrade: z.string().trim().optional(),
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
              displayName: requiredText,
              skillId: stableIdentifier,
              role: requiredText,
              supportSkillIds: identifierList,
              icon: optionalImagePath,
              whyUse: paragraphList.optional(),
              whenReplace: paragraphList.optional(),
              mappingBossingDiff: paragraphList.optional(),
              notes: paragraphList,
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
        statPriorities: z
          .array(
            z.strictObject({
              label: requiredText,
              reason: z.string().trim().default(""),
              tier: z.enum([
                "required",
                "recommended",
                "optional",
                "luxury",
              ]),
            }),
          )
          .default([]),
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

/** 来源与核验：分类展示来源并附带核验清单，与 Items/Bosses 保持同一视觉结构。 */
const buildSourcesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("sources"),
  categories: z.array(sourceCategorySchema).default([]),
  verificationChecklist: sourceVerificationChecklistSchema,
});

/**
 * Build Planner 入口：至少提供一个可点击的操作链接，避免页面给出不可导入的空洞配置。
 * 真实 .build 导入串/下载地址需在 PC 核验后回填；pending-pc 阶段可用创作者攻略或
 * 官方 Build Planner 工具链接，但不得编造不存在的导入码。
 */
const buildPlannerSectionSchema = z
  .strictObject({
    ...baseSectionShape,
    type: z.literal("build-planner"),
    note: z.string().trim().default(""),
    creatorName: z.string().trim().default(""),
    importUrl: z.url().optional(),
    buildPlannerUrl: z.url().optional(),
    downloadUrl: z.url().optional(),
    creatorUrl: z.url().optional(),
  })
  .superRefine((section, context) => {
    const hasLink = [
      section.importUrl,
      section.buildPlannerUrl,
      section.downloadUrl,
      section.creatorUrl,
    ].some((value) => Boolean(value));
    if (!hasLink) {
      context.addIssue({
        code: "custom",
        message:
          "build-planner section must provide at least one of importUrl, buildPlannerUrl, downloadUrl or creatorUrl",
      });
    }
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
  buildPlannerSectionSchema,
  buildSourcesSectionSchema,
]);

/**
 * Build 顶层变更日志：复用共享 changelogEntriesSchema 的条目结构，
 * 额外允许可选的 version 字段以记录版本号。所有 Build JSON 已携带该字段。
 */
const buildChangelogSchema = z
  .strictObject({
    entries: z
      .array(
        z.strictObject({
          date: isoDate,
          version: z.string().trim().optional(),
          changes: paragraphList,
        }),
      )
      .default([]),
  })
  .optional();

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

  changelog: buildChangelogSchema,

  // 翻译元数据块：与通用内容 schema 对齐，允许目标语言译文携带 translation 块而不破坏严格校验。
  translation: translationMetaSchema.optional(),

  // 英语事实源修订号：修改 en 源时必须 bump，供 translations:stale 检测译文是否过期；可选，老文件可不含。
  revision: z.string().trim().min(1).optional(),

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

    // 第四批流程调整：已发布文章不得停留在待实机核验或版本复核中。
    if (article.verificationStatus === "pending-pc") {
      context.addIssue({
        code: "custom",
        message: "published build cannot remain pending-pc",
        path: ["verificationStatus"],
      });
    }
    if (article.patchStatus === "under-review") {
      context.addIssue({
        code: "custom",
        message: "published build cannot remain under-review",
        path: ["patchStatus"],
      });
    }

    if (
      /\bTODO\b|REPLACE_WITH_|example\.invalid|\bdraft\b|草稿/.test(
        JSON.stringify({ ...article, translation: undefined }),
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

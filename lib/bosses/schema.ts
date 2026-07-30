/** 文件职责：定义 Bosses JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
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

export const bossCategorySlugs = [
  "campaign",
  "optional",
  "trial",
  "endgame",
  "pinnacle",
  "permanent-reward",
] as const;
export const bossActSlugs = ["act-1", "act-2", "act-3", "act-4"] as const;
export const bossDifficulties = ["low", "medium", "high"] as const;
export const bossReservedSlugs = [
  "categories",
  "acts",
  ...bossCategorySlugs,
  ...bossActSlugs,
] as const;

// --- Boss 专属 Section 判别联合 ---

/** 叙述型章节：overview、arena、strategy、build-considerations、community、verification。 */
const bossNarrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "arena",
    "strategy",
    "build-considerations",
    "community",
    "verification",
  ]),
  paragraphs: paragraphList,
  bullets: paragraphList,
});

/** 战前快速准备清单。 */
const bossQuickPreparationSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("quick-preparation"),
  items: z
    .array(
      z.strictObject({
        checks: paragraphList,
        label: requiredText,
      }),
    )
    .default([]),
});

/** 进入方式的有序步骤。 */
const bossAccessSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("access"),
  steps: z
    .array(
      z.strictObject({
        body: paragraphList,
        label: requiredText,
      }),
    )
    .default([]),
});

/** 入场需求键值对。 */
const bossRequirementsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("requirements"),
  requirements: z
    .array(
      z.strictObject({
        label: requiredText,
        notes: paragraphList,
        value: requiredText,
      }),
    )
    .default([]),
});

/** 战斗阶段时间轴。 */
const bossPhaseSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("phases"),
  phases: z
    .array(
      z.strictObject({
        label: requiredText,
        notes: paragraphList,
        objectives: paragraphList,
        phaseId: stableIdentifier,
        trigger: requiredText,
      }),
    )
    .default([]),
});

/** 攻击识别与应对——Boss 最重要的专属结构。 */
const bossAttackSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("attacks"),
  attacks: z
    .array(
      z.strictObject({
        attackId: stableIdentifier,
        damageTypes: identifierList,
        name: requiredText,
        notes: paragraphList,
        phaseIds: identifierList,
        responses: paragraphList,
        telegraph: paragraphList,
      }),
    )
    .default([]),
});

/** 伤害类型概览。 */
const bossDamageTypesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("damage-types"),
  types: z
    .array(
      z.strictObject({
        label: requiredText,
        mitigation: paragraphList,
        notes: paragraphList,
      }),
    )
    .default([]),
});

/** 掉落与奖励。 */
const bossRewardsSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("rewards"),
  rewards: z
    .array(
      z.strictObject({
        condition: requiredText,
        itemId: stableIdentifier,
        label: requiredText,
        notes: paragraphList,
      }),
    )
    .default([]),
});

/** 故障排查：症状 + 检查清单。 */
const bossTroubleshootingSectionSchema = z.strictObject({
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

/** FAQ 复用共享结构。 */
const bossFaqSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("faq"),
  items: faqItemsSchema,
});

/** 视频复用共享结构。 */
const bossVideoSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("video"),
  entries: videoEntriesSchema,
});

/** 变更日志复用共享结构。 */
const bossChangelogSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("changelog"),
  entries: changelogEntriesSchema,
});

export const bossSectionSchema = z.discriminatedUnion("type", [
  bossNarrativeSectionSchema,
  bossQuickPreparationSectionSchema,
  bossAccessSectionSchema,
  bossRequirementsSectionSchema,
  bossPhaseSectionSchema,
  bossAttackSectionSchema,
  bossDamageTypesSectionSchema,
  bossRewardsSectionSchema,
  bossTroubleshootingSectionSchema,
  bossFaqSectionSchema,
  bossVideoSectionSchema,
  bossChangelogSectionSchema,
]);

// --- BossArticle 顶层结构 ---

const bossArticleBaseSchema = z.strictObject({
  id: stableIdentifier,
  slug: stableIdentifier,
  locale: z.enum(supportedLocales),
  type: z.literal("boss"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),

  title: requiredText,
  shortTitle: requiredText,
  summary: requiredText,
  description: requiredText,

  // Boss 语义字段（nullable，允许待核验内容发布）
  location: z.string().trim().nullable().default(null),
  campaignStage: z.string().trim().nullable().default(null),
  recommendedLevel: z.string().trim().nullable().default(null),
  difficulty: z.enum(bossDifficulties).nullable().default(null),
  damageTypes: identifierList,
  phases: z.number().int().positive().nullable().default(null),
  bossCategory: z.enum(bossCategorySlugs).nullable().default(null),
  act: z.enum(bossActSlugs).nullable().default(null),
  isOptional: z.boolean().default(false),

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
  sections: z.array(bossSectionSchema).default([]),
  relatedBuildIds: identifierList,
  relatedGuideIds: identifierList,
  relatedItemIds: identifierList,
  relatedPatchIds: identifierList,
  sources: z.array(sourceSchema).default([]),

  seo: z.strictObject({
    title: requiredText,
    description: requiredText,
    noindex: z.boolean().optional(),
  }),
});

/**
 * 发布门禁采用 pending-pc 友好策略：允许待核验 Boss 以结构化核验计划形式发布。
 * verified 状态下才要求完整战斗事实（difficulty/damageTypes/phases）。
 */
export const bossArticleSchema = bossArticleBaseSchema.superRefine(
  (article, context) => {
    if (
      bossReservedSlugs.includes(
        article.slug as (typeof bossReservedSlugs)[number],
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "slug is reserved by the Bosses router",
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
        message: "published boss cannot contain draft or placeholder values",
      });
    }

    if (article.sections.length === 0 || article.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "published boss requires sections and sources",
      });
    }

    if (!article.reviewer || !article.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "published boss requires reviewer and publication date",
      });
    }

    if (
      article.verificationStatus === "verified" &&
      !article.verifiedClientVersion
    ) {
      context.addIssue({
        code: "custom",
        message: "verified boss requires verifiedClientVersion",
        path: ["verifiedClientVersion"],
      });
    }

    // verified 状态要求完整战斗事实
    if (article.verificationStatus === "verified") {
      if (
        !article.difficulty ||
        article.damageTypes.length === 0 ||
        !article.phases
      ) {
        context.addIssue({
          code: "custom",
          message:
            "verified boss requires complete encounter fields (difficulty, damageTypes, phases)",
        });
      }
    }
  },
);

export type BossArticle = z.infer<typeof bossArticleSchema>;
export type BossSection = z.infer<typeof bossSectionSchema>;
export type BossDifficulty = (typeof bossDifficulties)[number];
export type BossCategory = (typeof bossCategorySlugs)[number];
export type BossAct = (typeof bossActSlugs)[number];

/** 文件职责：定义 Guides JSON 的唯一内容契约和发布门禁，供本地文件与未来数据库适配器共享。 */
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

/** Atlas Masters 三方对比：卡片 + 场景推荐表。 */
const masterComparisonSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("master-comparison"),
  intro: requiredText.optional(),
  masters: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        name: requiredText,
        tagline: requiredText,
        unlock: requiredText,
        strengths: paragraphList,
        watchOuts: paragraphList,
      }),
    )
    .min(1),
  scenarios: z
    .array(
      z.strictObject({
        goal: requiredText,
        recommendedMaster: requiredText,
        why: requiredText,
        cost: requiredText,
        stage: requiredText,
        verifiedAt: requiredText,
      }),
    )
    .min(1),
});

/** Atlas Master 解锁与四点分配路线。 */
const masterUnlockRouteSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("master-unlock-route"),
  intro: requiredText.optional(),
  masters: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        name: requiredText,
        location: requiredText,
        unlockSteps: paragraphList,
      }),
    )
    .min(1),
});

/** 至多四点的交互式节点 Planner。 */
const passivePlannerSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("passive-planner"),
  intro: requiredText.optional(),
  maxPoints: z.number().int().positive().default(4),
  masters: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        name: requiredText,
        maxPoints: z.number().int().positive().default(4),
        nodes: z
          .array(
            z.strictObject({
              id: stableIdentifier,
              name: requiredText,
              effect: requiredText,
              tier: requiredText,
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

/** 场景 → 推荐 Master 与依据。 */
const scenarioRecommendationsSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("scenario-recommendations"),
  intro: requiredText.optional(),
  scenarios: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        scenario: requiredText,
        recommendedMaster: requiredText,
        alternatives: requiredText,
        rationale: requiredText,
        cost: requiredText,
        verifiedAt: requiredText,
      }),
    )
    .min(1),
});

/** Master 切换生效时机规则。 */
const activationTimingSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("activation-timing"),
  intro: requiredText.optional(),
  rules: z
    .array(
      z.strictObject({
        situation: requiredText,
        takesEffect: requiredText,
        note: requiredText,
      }),
    )
    .min(1),
  note: requiredText.optional(),
});

/** Runes of Aldur Remnant 配方看板。 */
const recipeBoardSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("recipe-board"),
  intro: requiredText.optional(),
  runes: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        name: requiredText,
        description: requiredText,
        risk: requiredText,
        reward: requiredText,
      }),
    )
    .min(1),
  recipes: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        name: requiredText,
        runeCount: requiredText,
        waves: requiredText,
        danger: requiredText,
        reward: requiredText,
        suitableFor: requiredText,
        exitCondition: requiredText,
      }),
    )
    .min(1),
});

/** 风险 / 收益矩阵（绿黄红分级）。 */
const riskRewardMatrixSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("risk-reward-matrix"),
  intro: requiredText.optional(),
  rows: z
    .array(
      z.strictObject({
        choice: requiredText,
        riskLevel: z.enum(["green", "yellow", "red"]),
        risk: requiredText,
        reward: requiredText,
        when: requiredText,
      }),
    )
    .min(1),
});

/** Waystone 词缀矩阵（按 Build 类型定危险等级）。 */
const mapModifierMatrixSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("map-modifier-matrix"),
  intro: requiredText.optional(),
  modifiers: z
    .array(
      z.strictObject({
        modifier: requiredText,
        affects: requiredText,
        danger: z.enum(["green", "yellow", "red"]),
        symptom: requiredText,
        action: requiredText,
        version: requiredText,
      }),
    )
    .min(1),
});

/** Loot Filter 安装方法。 */
const filterInstallationSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("filter-installation"),
  intro: requiredText.optional(),
  methods: z
    .array(
      z.strictObject({
        id: stableIdentifier,
        name: requiredText,
        platform: requiredText,
        steps: paragraphList,
        note: requiredText.optional(),
      }),
    )
    .min(1),
});

/** 交互式选择器基类结构（严格度 / 兼容性 / 资源诊断复用）。 */
const interactiveSelectorSchema = z.strictObject({
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

const strictnessSelectorSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("strictness-selector"),
  ...interactiveSelectorSchema.shape,
});

const compatibilityDiagnosticSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("compatibility-diagnostic"),
  ...interactiveSelectorSchema.shape,
});

const resourceDiagnosticSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("resource-diagnostic"),
  ...interactiveSelectorSchema.shape,
});

/** Respec 边界矩阵。 */
const respecMatrixSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("respec-matrix"),
  intro: requiredText.optional(),
  rows: z
    .array(
      z.strictObject({
        respecType: requiredText,
        npc: requiredText,
        prerequisite: requiredText,
        risk: requiredText,
        needsTrial: z.boolean(),
        cost: requiredText,
      }),
    )
    .min(1),
});

/** 重置成本明细。 */
const costBreakdownSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("cost-breakdown"),
  intro: requiredText.optional(),
  rows: z
    .array(
      z.strictObject({
        item: requiredText,
        cost: requiredText,
        detail: requiredText.optional(),
        currency: requiredText.optional(),
      }),
    )
    .min(1),
  note: requiredText.optional(),
});

/** 版本冲突 / 旧推荐失效记录。 */
const versionConflictsSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("version-conflicts"),
  intro: requiredText.optional(),
  conflicts: z
    .array(
      z.strictObject({
        recommendation: requiredText,
        status: z.enum(["valid", "outdated", "conflict", "fixed"]),
        detail: requiredText,
        sinceVersion: requiredText,
      }),
    )
    .min(1),
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
  masterComparisonSchema,
  masterUnlockRouteSchema,
  passivePlannerSchema,
  scenarioRecommendationsSchema,
  activationTimingSchema,
  recipeBoardSchema,
  riskRewardMatrixSchema,
  mapModifierMatrixSchema,
  filterInstallationSchema,
  strictnessSelectorSchema,
  compatibilityDiagnosticSchema,
  resourceDiagnosticSchema,
  respecMatrixSchema,
  costBreakdownSchema,
  versionConflictsSchema,
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

  // 目标语言译文元数据（可选）。由翻译流水线写入，不影响既有英语/中文内容。
  translation: translationMetaSchema.optional(),
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

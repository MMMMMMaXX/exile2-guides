/** 文件职责：定义 Bosses JSON 的唯一内容契约和发布门禁（V5 富内容结构），供本地文件与未来数据库适配器共享。 */
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
  sourceVerificationChecklistSchema,
  stableIdentifier,
  videoEntriesSchema,
} from "../content/section-schema";
import { translationMetaSchema } from "../content/translation";

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
export const bossDangerLevels = ["low", "medium", "high", "critical"] as const;
export const bossMediaRights = [
  "owned",
  "official",
  "permission",
  "embedded",
  "generated",
] as const;
export const bossReservedSlugs = [
  "categories",
  "acts",
  ...bossCategorySlugs,
  ...bossActSlugs,
] as const;

// --- 顶层媒体对象 ---

/** Boss 文章顶层媒体资源结构；每张图片、视频和 Embed 统一在此声明版权与来源。 */
export const bossMediaItemSchema = z.strictObject({
  id: stableIdentifier,
  type: z.enum(["image", "youtube", "reddit-embed", "forum-quote", "generated"]),
  src: z.string().trim().optional(),
  url: z.string().trim().optional(),
  alt: z.string().trim().optional(),
  caption: z.string().trim().optional(),
  credit: z.string().trim().optional(),
  rights: z.enum(bossMediaRights),
  sourceUrl: z.string().trim().nullable().optional(),
  timestamps: z
    .array(z.strictObject({ time: requiredText, label: requiredText }))
    .optional(),
}).superRefine((media, context) => {
  // 域名门禁：仅当来源确为 GGG 官方域名时才允许标记为 official，
  // 防止把第三方（sportskeeda / ign / destructoid / youtube 等）配图误标为官方。
  if (media.rights !== "official") return;
  const OFFICIAL_HOSTS = [
    "pathofexile.com",
    "www.pathofexile.com",
    "poe2.com",
    "www.poe2.com",
  ];
  const url = media.sourceUrl;
  if (!url) {
    context.addIssue({
      code: "custom",
      message: "official media requires an official GGG sourceUrl",
      path: ["sourceUrl"],
    });
    return;
  }
  const parsed = (() => {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  })();
  if (!parsed) {
    context.addIssue({
      code: "custom",
      message: "official media sourceUrl must be a valid URL",
      path: ["sourceUrl"],
    });
    return;
  }
  const host = parsed.hostname;
  if (!OFFICIAL_HOSTS.includes(host)) {
    context.addIssue({
      code: "custom",
      message: `official media sourceUrl must be a GGG domain, got ${host}`,
      path: ["sourceUrl"],
    });
  }
});

// --- Boss 专属 Section 判别联合（V5 富内容结构） ---

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

/** V5 首屏快速结论：高亮叫牌 + 三张答案卡片 + 内链。 */
const bossQuickAnswerSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("quick-answer"),
  callout: requiredText,
  calloutDetail: paragraphList,
  answers: z
    .array(
      z.strictObject({
        label: requiredText,
        text: requiredText,
      }),
    )
    .default([]),
  links: z
    .array(
      z.strictObject({
        label: requiredText,
        href: requiredText,
      }),
    )
    .default([]),
});

/** 战前准备检查表（V5 增加 why/fix 列）。 */
const bossPreparationSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum(["quick-preparation", "preparation"]),
  items: z
    .array(
      z.strictObject({
        checks: paragraphList,
        label: requiredText,
        why: z.string().trim().optional(),
        fix: z.string().trim().optional(),
      }),
    )
    .default([]),
  links: z
    .array(
      z.strictObject({
        label: requiredText,
        href: requiredText,
      }),
    )
    .default([]),
});

/** 进入方式的有序步骤（V5 增加事实卡片）。 */
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
  facts: z
    .array(
      z.strictObject({
        label: requiredText,
        value: requiredText,
        note: z.string().trim().optional(),
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

/** 战斗阶段时间轴（V5 增加标签和媒体引用）。 */
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
        tags: z.array(requiredText).default([]),
        mediaId: stableIdentifier.optional(),
      }),
    )
    .default([]),
});

/** 攻击识别与应对（V5 增加危险等级、常见失败、媒体和来源引用）。 */
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
        danger: z.enum(bossDangerLevels).optional(),
        commonMistakes: paragraphList,
        mediaIds: identifierList,
        sourceIds: identifierList,
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

/** 故障排查（V5 增加直接答案和站内关联）。 */
const bossTroubleshootingSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("troubleshooting"),
  problems: z
    .array(
      z.strictObject({
        checks: paragraphList,
        symptom: requiredText,
        directAnswer: paragraphList,
        relatedContentIds: identifierList,
      }),
    )
    .default([]),
});

/** V5 社区证据：摘要、编辑分析与本站解答。 */
const bossCommunityEvidenceSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("community-evidence"),
  entries: z
    .array(
      z.strictObject({
        sourceId: stableIdentifier,
        kind: z.enum(["embed", "quote", "summary"]),
        question: requiredText.optional(),
        summary: paragraphList,
        editorialAnalysis: paragraphList,
        officialAnswer: paragraphList,
        relatedQuestionIds: identifierList,
        linkHref: z.string().trim().optional(),
        linkLabel: z.string().trim().optional(),
      }),
    )
    .default([]),
});

/** V5 截图画廊：引用顶层 media 数组中的图片。 */
const bossGallerySectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("gallery"),
  mediaIds: identifierList,
});

/** V5 相关内容卡片：按当前问题推荐站内文档。 */
const bossRelatedContentSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("related-content"),
  items: z
    .array(
      z.strictObject({
        contentId: stableIdentifier,
        title: requiredText,
        description: requiredText,
        contentType: requiredText,
        href: requiredText,
      }),
    )
    .default([]),
});

/** V5 来源与核验：分类展示来源并附带核验清单。 */
const bossSourcesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("sources-section"),
  categories: z
    .array(
      z.strictObject({
        label: requiredText,
        description: requiredText,
        url: z.string().trim().optional(),
      }),
    )
    .default([]),
  verificationChecklist: sourceVerificationChecklistSchema,
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
  bossQuickAnswerSectionSchema,
  bossPreparationSectionSchema,
  bossAccessSectionSchema,
  bossRequirementsSectionSchema,
  bossPhaseSectionSchema,
  bossAttackSectionSchema,
  bossDamageTypesSectionSchema,
  bossRewardsSectionSchema,
  bossTroubleshootingSectionSchema,
  bossCommunityEvidenceSectionSchema,
  bossGallerySectionSchema,
  bossRelatedContentSectionSchema,
  bossSourcesSectionSchema,
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
  reviewMethod: z.string().trim().optional(),
  verificationMethod: z.string().trim().optional(),
  createdAt: isoDate,
  publishedAt: isoDate.optional(),
  updatedAt: isoDate,
  lastVerifiedAt: isoDate.optional(),

  heroImage: optionalImagePath,
  cardImage: optionalImagePath,
  imageAlt: requiredText.optional(),

  tags: identifierList,
  sections: z.array(bossSectionSchema).default([]),
  media: z.array(bossMediaItemSchema).default([]),
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

  // 可选翻译元数据；携带时由 translationMetaSchema 单独校验（与全局 content schema 一致）。
  translation: translationMetaSchema.optional(),

  // 英语事实源修订号：修改 en 源时必须 bump，供 translations:stale 检测译文是否过期；可选，老文件可不含。
  revision: z.string().trim().min(1).optional(),
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
      /\bTODO\b|REPLACE_WITH_|example\.invalid|(?<!machine-)\bdraft\b|草稿/.test(
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

    if (!article.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "published boss requires publication date",
      });
    }
    if (!article.reviewer && !article.reviewMethod) {
      context.addIssue({
        code: "custom",
        message:
          "published boss requires either a reviewer or a reviewMethod",
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
export type BossMediaItem = z.infer<typeof bossMediaItemSchema>;
export type BossDifficulty = (typeof bossDifficulties)[number];
export type BossDangerLevel = (typeof bossDangerLevels)[number];
export type BossCategory = (typeof bossCategorySlugs)[number];
export type BossAct = (typeof bossActSlugs)[number];
export type BossMediaRights = (typeof bossMediaRights)[number];

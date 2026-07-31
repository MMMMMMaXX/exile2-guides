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

/** 受控内容分类词表；socketables 与 unique-armour 为 0.5.x 新增家族与独立 Unique 类型。 */
export const itemCategorySlugs = [
  "weapons",
  "off-hand",
  "armour",
  "jewellery",
  "currency",
  "unique-items",
  "socketables",
  "unique-armour",
] as const;
export const itemRarities = ["normal", "magic", "rare", "unique"] as const;
export const itemReservedSlugs = ["categories", ...itemCategorySlugs] as const;

// --- Item 专属 Section 判别联合 ---

/** 叙述型章节：overview、effect、modifiers、crafting、skill-interactions、use-cases、alternatives、common-mistakes、verification。 */
const itemNarrativeSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.enum([
    "overview",
    "effect",
    "modifiers",
    "crafting",
    "skill-interactions",
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

/** 30 秒结论：适合使用 / 先卖掉 / 先保留 + 内联跳转链接。 */
const itemQuickAnswerSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("quick-answer"),
  callout: requiredText,
  calloutDetail: paragraphList,
  answers: z
    .array(
      z.strictObject({ label: requiredText, text: paragraphList }),
    )
    .default([]),
  links: z
    .array(z.strictObject({ href: requiredText, label: requiredText }))
    .default([]),
});

/** 关键事实网格。 */
const itemQuickFactsSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("quick-facts"),
  facts: z
    .array(
      z.strictObject({
        label: requiredText,
        note: paragraphList,
        value: requiredText,
      }),
    )
    .default([]),
});

/** 物品家族概览：对应四种 Orb / Rune 与 Soul Core 等可切换卡片。 */
const itemFamilyOverviewSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("family-overview"),
  intro: paragraphList,
  members: z
    .array(
      z.strictObject({
        body: paragraphList,
        eyebrow: requiredText,
        id: stableIdentifier,
        sub: requiredText,
        tags: identifierList,
        title: requiredText,
      }),
    )
    .default([]),
});

/** 合法目标兼容矩阵：列 = 候选 Orb / 槽位，单元格 = 可用 / 不可用 / 说明。 */
const itemEligibilitySchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("eligibility"),
  note: paragraphList,
  columns: z.array(requiredText).default([]),
  rows: z
    .array(
      z.strictObject({
        label: requiredText,
        note: requiredText.optional(),
        values: z.array(
          z.strictObject({
            kind: z.enum(["yes", "no", "text"]),
            text: requiredText,
          }),
        ),
      }),
    )
    .default([]),
});

/** 获取路线：编号卡片，可选跳转链接。 */
const itemAcquisitionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("acquisition"),
  intro: paragraphList,
  routes: z
    .array(
      z.strictObject({
        body: paragraphList,
        href: requiredText.optional(),
        label: requiredText,
      }),
    )
    .default([]),
});

/** 使用流程 + 可选的前后对比结论。 */
const itemUsageSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("usage"),
  steps: z
    .array(
      z.strictObject({ body: paragraphList, label: requiredText }),
    )
    .default([]),
  compare: z
    .strictObject({
      after: paragraphList,
      before: paragraphList,
      note: requiredText,
    })
    .optional(),
});

/** 使用前检查清单；复用 Boss 准备清单交互组件（localStorage 持久化）。 */
const itemPreUseChecklistSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("pre-use-checklist"),
  items: z
    .array(
      z.strictObject({
        checks: paragraphList,
        fix: requiredText.optional(),
        label: requiredText,
        why: requiredText.optional(),
      }),
    )
    .default([]),
});

/** 结果 / 收益风险矩阵，带可选筛选标签。 */
const itemOutcomesSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("outcomes"),
  filters: z.array(requiredText).default([]),
  rows: z
    .array(
      z.strictObject({
        audience: requiredText,
        benefit: requiredText,
        level: z.enum(["low", "medium", "high"]),
        recommendation: requiredText,
        risk: requiredText,
        scenario: requiredText,
        tags: identifierList,
      }),
    )
    .default([]),
});

/** 风险分析矩阵：场景 -> 收益 / 损失 / 建议。 */
const itemRiskAnalysisSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("risk-analysis"),
  rows: z
    .array(
      z.strictObject({
        gain: requiredText,
        level: z.enum(["low", "medium", "high"]),
        loss: requiredText,
        recommendation: requiredText,
        scenario: requiredText,
      }),
    )
    .default([]),
});

/** 使用 / 出售 / 保留决策器。 */
const itemValuationSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("valuation"),
  marketNote: paragraphList,
  use: z.strictObject({
    condition: requiredText,
    first: requiredText,
    risk: requiredText,
    text: paragraphList,
  }),
  sell: z.strictObject({
    condition: requiredText,
    first: requiredText,
    risk: requiredText,
    text: paragraphList,
  }),
  hold: z.strictObject({
    condition: requiredText,
    first: requiredText,
    risk: requiredText,
    text: paragraphList,
  }),
});

/** Build / 技能关联说明。 */
const itemBuildUsageSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("build-usage"),
  intro: paragraphList,
  builds: z
    .array(
      z.strictObject({
        description: requiredText,
        href: requiredText.optional(),
        title: requiredText,
      }),
    )
    .default([]),
});

/** 社区证据：原问题 -> 症状 -> 本站分析 -> 直接答案 -> 检查 -> 站内链接。 */
const itemCommunityEvidenceSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("community-evidence"),
  entries: z
    .array(
      z.strictObject({
        editorialAnalysis: paragraphList,
        kind: requiredText,
        officialAnswer: paragraphList,
        question: requiredText.optional(),
        sourceId: requiredText,
        summary: paragraphList,
        linkHref: requiredText.optional(),
        linkLabel: requiredText.optional(),
      }),
    )
    .default([]),
});

/** 问题下方立即出现直接答案、检查步骤与站内链接。 */
const itemTroubleshootingSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("troubleshooting"),
  problems: z
    .array(
      z.strictObject({
        checks: paragraphList,
        directAnswer: paragraphList,
        links: z
          .array(z.strictObject({ href: requiredText, label: requiredText }))
          .default([]),
        symptom: requiredText,
      }),
    )
    .default([]),
});

/** 截图 / 视频素材清单（避免内嵌指纹图片，仅描述 + 来源）。 */
const itemMediaGallerySchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("media-gallery"),
  items: z
    .array(
      z.strictObject({
        caption: requiredText,
        note: requiredText.optional(),
        sourceUrl: requiredText.optional(),
      }),
    )
    .default([]),
});

/** 站内关联内容卡片。 */
const itemRelatedContentSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("related-content"),
  items: z
    .array(
      z.strictObject({
        contentType: requiredText,
        description: requiredText,
        href: requiredText,
        title: requiredText,
        contentId: stableIdentifier,
      }),
    )
    .default([]),
});

/** 版本变化时间线。 */
const itemPatchHistorySchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("patch-history"),
  entries: z
    .array(
      z.strictObject({
        changes: paragraphList,
        date: isoDate.optional(),
        version: requiredText,
      }),
    )
    .default([]),
});

/** 来源与核验边界；categories 与顶层 sources 互补，避免重复维护法律文案。 */
const itemSourcesSectionSchema = z.strictObject({
  ...baseSectionShape,
  type: z.literal("sources"),
  categories: z
    .array(
      z.strictObject({
        description: requiredText,
        label: requiredText,
        url: requiredText.optional(),
      }),
    )
    .default([]),
  verificationChecklist: paragraphList,
});

export const itemSectionSchema = z.discriminatedUnion("type", [
  itemNarrativeSectionSchema,
  itemPropertiesSectionSchema,
  itemAcquisitionStepsSectionSchema,
  itemFaqSectionSchema,
  itemVideoSectionSchema,
  itemChangelogSectionSchema,
  itemQuickAnswerSchema,
  itemQuickFactsSchema,
  itemFamilyOverviewSchema,
  itemEligibilitySchema,
  itemAcquisitionSchema,
  itemUsageSchema,
  itemPreUseChecklistSchema,
  itemOutcomesSchema,
  itemRiskAnalysisSchema,
  itemValuationSchema,
  itemBuildUsageSchema,
  itemCommunityEvidenceSchema,
  itemTroubleshootingSchema,
  itemMediaGallerySchema,
  itemRelatedContentSchema,
  itemPatchHistorySchema,
  itemSourcesSectionSchema,
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

  // 0.5.x 扩展语义字段（可选，供 Quick Facts / 家族筛选使用）
  subcategoryId: stableIdentifier.optional(),
  itemClass: z.string().trim().optional(),
  baseType: z.string().trim().optional(),
  stackSize: z.number().int().positive().optional(),
  dropLevel: z.number().int().nonnegative().optional(),
  tradeable: z.boolean().optional(),
  consumedOnUse: z.boolean().optional(),

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
  relatedSkillIds: identifierList,
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

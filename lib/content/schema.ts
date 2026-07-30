/** 文件职责：定义六类内容 Front Matter 契约及发布前的跨字段校验规则。 */
import { z } from "zod";

import { supportedLocales } from "./constants";

export { contentTypes, supportedLocales } from "./constants";
export const patchStatuses = [
  "current",
  "supported",
  "legacy",
  "under-review",
] as const;

/** 公开内容的核验状态；pending-pc 允许已批准内容先上线，但不得伪造实机结论。 */
export const verificationStatuses = ["pending-pc", "verified"] as const;

const requiredText = z.string().trim().min(1);
const optionalText = z.string().trim().default("");
// 草稿允许未知的游戏字段显式留空；发布状态会在下方跨字段门禁中要求完整事实。
const unverifiedText = z.string().trim().min(1).nullable().default(null);
const optionalUnverifiedText = z.string().trim().nullable().default(null);
const stableIdentifier = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "must use lowercase letters, numbers, and single hyphens",
  });
const unverifiedIdentifierArray = z.array(stableIdentifier).default([]);

// YAML 会把未加引号的 ISO 日期转换为 Date；这里统一归一化为字符串，避免编辑习惯
// 影响下游类型契约。
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

const optionalScalarText = z.preprocess(
  (value) => (typeof value === "number" ? String(value) : value),
  z.string().trim().nullable().default(null),
);

const sourceSchema = z.strictObject({
  label: requiredText,
  url: z
    .url()
    .refine(
      (value) => value.startsWith("https://") || value.startsWith("http://"),
      {
        message: "must use an http or https URL",
      },
    ),
  sourceType: z.enum(["official", "in-game", "community", "tool", "other"]),
});

const commonFrontMatterShape = {
  contentId: stableIdentifier,
  locale: z.enum(supportedLocales),
  slug: stableIdentifier,
  title: requiredText,
  seoTitle: requiredText,
  seoDescription: requiredText,
  summary: requiredText,
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  patch: requiredText,
  verifiedClientVersion: z.string().trim().optional(),
  verificationStatus: z.enum(verificationStatuses).optional(),
  patchStatus: z.enum(patchStatuses),
  author: requiredText,
  reviewer: optionalText,
  publishedAt: isoDate.optional(),
  updatedAt: isoDate,
  verifiedAt: isoDate.optional(),
  image: z
    .string()
    .trim()
    .startsWith("/")
    .regex(/\.(?:avif|webp)$/i, {
      message: "must use an AVIF or WebP image",
    })
    .optional(),
  imageAlt: requiredText.optional(),
  tags: z.array(stableIdentifier).default([]),
  relatedContentIds: z.array(stableIdentifier).default([]),
  sources: z.array(sourceSchema).default([]),
};

export const buildFrontMatterSchema = z.strictObject({
  ...commonFrontMatterShape,
  contentType: z.literal("build"),
  className: unverifiedText,
  ascendancy: optionalText,
  primarySkill: unverifiedText,
  playstyle: unverifiedIdentifierArray,
  difficulty: z
    .enum(["beginner", "intermediate", "advanced"])
    .nullable()
    .default(null),
  budget: z.enum(["low", "medium", "high"]).nullable().default(null),
  damageTypes: unverifiedIdentifierArray,
  bestFor: unverifiedIdentifierArray,
});

export const bossFrontMatterSchema = z.strictObject({
  ...commonFrontMatterShape,
  contentType: z.literal("boss"),
  location: optionalUnverifiedText,
  campaignStage: optionalUnverifiedText,
  recommendedLevel: optionalScalarText,
  difficulty: z.enum(["low", "medium", "high"]).nullable().default(null),
  damageTypes: unverifiedIdentifierArray,
  phases: z.number().int().positive().nullable().default(null),
});

export const itemFrontMatterSchema = z.strictObject({
  ...commonFrontMatterShape,
  contentType: z.literal("item"),
  itemType: unverifiedText,
  rarity: z
    .enum(["normal", "magic", "rare", "unique"])
    .nullable()
    .default(null),
  requiredLevel: optionalScalarText,
  useCases: unverifiedIdentifierArray,
});

export const skillFrontMatterSchema = z.strictObject({
  ...commonFrontMatterShape,
  contentType: z.literal("skill"),
  skillType: z.enum(["active", "support", "passive"]).nullable().default(null),
  requiredLevel: optionalScalarText,
});

export const guideFrontMatterSchema = z.strictObject({
  ...commonFrontMatterShape,
  contentType: z.literal("guide"),
  guideCategory: z
    .enum([
      "beginner",
      "campaign",
      "mechanics",
      "crafting-trading",
      "endgame-atlas",
      "troubleshooting",
    ])
    .nullable()
    .default(null),
  estimatedReadingMinutes: z.number().int().positive().nullable().default(null),
  prerequisites: z.array(requiredText).default([]),
});

// Patch 页不添加 PRD 之外的推测字段；影响关系由 TASK-004 推导，避免在 Front
// Matter 中维护重复且可能失真的关系数据。
export const patchFrontMatterSchema = z.strictObject({
  ...commonFrontMatterShape,
  contentType: z.literal("patch"),
});

const rawContentFrontMatterSchema = z.discriminatedUnion("contentType", [
  buildFrontMatterSchema,
  bossFrontMatterSchema,
  itemFrontMatterSchema,
  skillFrontMatterSchema,
  guideFrontMatterSchema,
  patchFrontMatterSchema,
]);

const placeholderPatterns = [
  { label: "example.invalid", pattern: /example\.invalid/i },
  { label: "TODO", pattern: /\bTODO\b/i },
  { label: "REPLACE_WITH_", pattern: /REPLACE_WITH_/i },
] as const;

const publishedForbiddenValuePatterns = [
  { label: "unassigned", pattern: /\bunassigned\b|未指定/i },
  {
    label: "replace-after-verification",
    pattern: /replace-after-verification/i,
  },
  {
    label: "REPLACE_WITH_VERIFIED_PATCH",
    pattern: /REPLACE_WITH_VERIFIED_PATCH/i,
  },
] as const;

/**
 * 深度查找第一个发布占位符，并返回其字段路径，便于编辑快速定位问题。
 */
function findPlaceholder(
  value: unknown,
  path: PropertyKey[] = [],
): { label: string; path: PropertyKey[] } | undefined {
  if (typeof value === "string") {
    const match = placeholderPatterns.find(({ pattern }) =>
      pattern.test(value),
    );
    return match ? { label: match.label, path } : undefined;
  }

  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const match = findPlaceholder(item, [...path, index]);
      if (match) return match;
    }
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const match = findPlaceholder(item, [...path, key]);
      if (match) return match;
    }
  }

  return undefined;
}

/** 查找发布内容中不允许保留的未知值，避免占位符被伪装成看似合法的字段。 */
function findPublishedForbiddenValue(
  value: unknown,
  path: PropertyKey[] = [],
): { label: string; path: PropertyKey[] } | undefined {
  if (typeof value === "string") {
    const match = publishedForbiddenValuePatterns.find(({ pattern }) =>
      pattern.test(value),
    );
    return match ? { label: match.label, path } : undefined;
  }

  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const match = findPublishedForbiddenValue(item, [...path, index]);
      if (match) return match;
    }
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const match = findPublishedForbiddenValue(item, [...path, key]);
      if (match) return match;
    }
  }

  return undefined;
}

// 该跨字段回调是发布门禁的一部分：单字段合法并不代表内容具备上线资格。
export const contentFrontMatterSchema = rawContentFrontMatterSchema.superRefine(
  (data, context) => {
    if (data.image && !data.imageAlt) {
      context.addIssue({
        code: "custom",
        message: "imageAlt is required when image is present",
        path: ["imageAlt"],
      });
    }

    if (!data.image && data.imageAlt) {
      context.addIssue({
        code: "custom",
        message: "image is required when imageAlt is present",
        path: ["image"],
      });
    }

    if (data.status !== "published") return;

    if (data.draft) {
      context.addIssue({
        code: "custom",
        message: "published content cannot have draft: true",
        path: ["draft"],
      });
    }

    if (!data.publishedAt) {
      context.addIssue({
        code: "custom",
        message: "publishedAt is required for published content",
        path: ["publishedAt"],
      });
    }

    if (data.verificationStatus !== "pending-pc" && !data.verifiedAt) {
      context.addIssue({
        code: "custom",
        message: "verifiedAt is required for published content",
        path: ["verifiedAt"],
      });
    }

    if (!data.reviewer) {
      context.addIssue({
        code: "custom",
        message: "reviewer is required for published content",
        path: ["reviewer"],
      });
    }

    if (data.verificationStatus === "verified" && !data.verifiedClientVersion) {
      context.addIssue({
        code: "custom",
        message:
          "verifiedClientVersion is required when verificationStatus is verified",
        path: ["verifiedClientVersion"],
      });
    }

    if (data.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "at least one source is required for published content",
        path: ["sources"],
      });
    }

    const placeholder = findPlaceholder(data);
    if (placeholder) {
      context.addIssue({
        code: "custom",
        message: `published content contains placeholder ${placeholder.label}`,
        path: placeholder.path,
      });
    }

    const forbiddenValue = findPublishedForbiddenValue(data);
    if (forbiddenValue) {
      context.addIssue({
        code: "custom",
        message: `published content contains forbidden value ${forbiddenValue.label}`,
        path: forbiddenValue.path,
      });
    }

    if (data.tags.includes("template")) {
      context.addIssue({
        code: "custom",
        message: "published content tags cannot include template",
        path: ["tags"],
      });
    }

    if (data.contentId.includes("template") || data.slug.includes("template")) {
      context.addIssue({
        code: "custom",
        message: "published contentId and slug cannot include template",
        path: data.contentId.includes("template") ? ["contentId"] : ["slug"],
      });
    }

    // 公开与已核验是两个独立维度：pending-pc 页面可以上线，但标题仍不得伪装成草稿。
    if (/\bdraft\b|草稿/i.test(data.title)) {
      context.addIssue({
        code: "custom",
        message: "published title cannot contain Draft or 草稿",
        path: ["title"],
      });
    }

    if (data.verificationStatus === "pending-pc") return;

    switch (data.contentType) {
      case "build":
        if (
          !data.className ||
          !data.primarySkill ||
          !data.playstyle.length ||
          !data.difficulty ||
          !data.budget ||
          !data.damageTypes.length ||
          !data.bestFor.length
        ) {
          context.addIssue({
            code: "custom",
            message: "published build requires complete verified build fields",
          });
        }
        break;
      case "boss":
        if (!data.difficulty || !data.damageTypes.length || !data.phases) {
          context.addIssue({
            code: "custom",
            message:
              "published boss requires complete verified encounter fields",
          });
        }
        break;
      case "item":
        if (!data.itemType || !data.rarity || !data.useCases.length) {
          context.addIssue({
            code: "custom",
            message: "published item requires complete verified item fields",
          });
        }
        break;
      case "skill":
        if (!data.skillType) {
          context.addIssue({
            code: "custom",
            message: "published skill requires a verified skillType",
          });
        }
        break;
      case "guide":
        if (!data.guideCategory || !data.estimatedReadingMinutes) {
          context.addIssue({
            code: "custom",
            message:
              "published guide requires a verified category and reading time",
          });
        }
        break;
      case "patch":
        break;
    }
  },
);

export type ContentFrontMatter = z.infer<typeof contentFrontMatterSchema>;
export type BuildFrontMatter = z.infer<typeof buildFrontMatterSchema>;
export type BossFrontMatter = z.infer<typeof bossFrontMatterSchema>;
export type ItemFrontMatter = z.infer<typeof itemFrontMatterSchema>;
export type SkillFrontMatter = z.infer<typeof skillFrontMatterSchema>;
export type GuideFrontMatter = z.infer<typeof guideFrontMatterSchema>;
export type PatchFrontMatter = z.infer<typeof patchFrontMatterSchema>;

/** 判断字符串是否包含生产环境禁止的占位标记。 */
export function containsPublishedPlaceholder(value: string): boolean {
  return placeholderPatterns.some(({ pattern }) => pattern.test(value));
}

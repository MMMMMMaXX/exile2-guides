/** 文件职责：提供全站内容模块共享的 Section 底层原语和通用 Schema 工具，避免各模块重复定义。 */
import { z } from "zod";

export const requiredText = z.string().trim().min(1);
export const stableIdentifier = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "must use lowercase letters, numbers, and single hyphens",
  });
export const isoDate = z.iso.date();
export const paragraphList = z.array(requiredText).default([]);
export const identifierList = z.array(stableIdentifier).default([]);
const localImagePath = z
  .string()
  .trim()
  .startsWith("/")
  .regex(/\.(?:avif|webp)$/i, {
    message: "local images must use an AVIF or WebP image",
  });
const externalImageUrl = z.url().refine(
  (value) => {
    try {
      const url = new URL(value);
      return (
        url.protocol === "https:" &&
        /\.(?:avif|gif|jpe?g|png|webp)$/i.test(url.pathname)
      );
    } catch {
      return false;
    }
  },
  {
    message:
      "external images must use HTTPS and identify a supported image file",
  },
);

/** 图片可使用站内指纹资源或经编辑核验的 HTTPS 外部来源；外部来源必须在内容研究台账中留痕。 */
export const imagePath = z.union([localImagePath, externalImageUrl]);
export const optionalImagePath = imagePath.optional();

/** 全部章节类型共享的基础字段；id 和 order 的文章内唯一性由各模块发布门禁校验。 */
export const baseSectionShape = {
  id: stableIdentifier,
  order: z.number().int().nonnegative(),
  title: requiredText,
  toc: z.boolean().default(true),
  visible: z.boolean().default(true),
};

/** 统一来源结构；各模块顶层 sources 数组共用，不在每个 Section 中重复维护。 */
export const sourceSchema = z.strictObject({
  /** 可选稳定标识，供文章内 attack/sourceId 等字段交叉引用；缺失时仅作展示用途。 */
  id: stableIdentifier.optional(),
  label: requiredText,
  sourceType: z.enum(["official", "in-game", "community", "tool", "other"]),
  url: z.url(),
});

/** 来源与核验章节的分类卡片结构，供各内容模块复用。 */
export const sourceCategorySchema = z.strictObject({
  label: requiredText,
  description: requiredText,
  url: z.url().optional(),
});

/**
 * 来源与核验章节的核验清单结构，供各内容模块复用。
 * 原为字符串数组占位（["Verification completed"]），已改为结构化对象，
 * 以承载核验状态、方式与客户端版本等可追溯元数据，避免误导性的“已完成”字面量。
 */
export const sourceVerificationChecklistSchema = z
  .strictObject({
    /** 核验状态：pending-pc 表示待客户端核验，verified 表示已通过核验。 */
    status: z.enum(["pending-pc", "verified"]).default("pending-pc"),
    /** 核验方式：官方资料 / 实机 / 社区 / 工具 / 其他。 */
    method: z
      .enum(["official", "in-game", "community", "tool", "other"])
      .optional(),
    /** 核验所依据的客户端版本。 */
    verifiedClientVersion: z.string().trim().optional(),
    /** 核验完成日期（ISO），已核验时填写。 */
    verifiedAt: isoDate.optional(),
    /** 核验执行者或流程标识。 */
    verifiedBy: z.string().trim().optional(),
    /** 自由核验备注，承载交叉核验、待客户端核验等可追溯说明。 */
    notes: z.array(requiredText).optional(),
  })
  .default({ status: "pending-pc" });

/** 文章配图结构；非 generated 来源必须附带 sourceUrl 以尊重版权。 */
export const figureImageSchema = z
  .strictObject({
    alt: requiredText,
    caption: requiredText,
    credit: requiredText,
    sourceKind: z.enum([
      "generated",
      "official",
      "community",
      "video",
      "other",
    ]),
    sourceUrl: z.url().optional(),
    src: imagePath,
  })
  .superRefine((image, context) => {
    if (image.sourceKind !== "generated" && !image.sourceUrl) {
      context.addIssue({
        code: "custom",
        message: "non-generated figure images require sourceUrl",
        path: ["sourceUrl"],
      });
    }
  });

/** 共享 FAQ 条目结构，供各模块的 faq Section 复用。 */
export const faqItemsSchema = z
  .array(
    z.strictObject({
      answer: paragraphList,
      question: requiredText,
    }),
  )
  .default([]);

/** 共享视频条目结构，供各模块的 video Section 复用；poster 提供页面内封面，timestamps 提供可跳转的重要节点。 */
export const videoEntriesSchema = z
  .array(
    z.strictObject({
      creator: requiredText.optional(),
      description: requiredText.optional(),
      label: requiredText,
      poster: imagePath.optional(),
      takeaway: requiredText.optional(),
      timestamps: z
        .array(
          z.strictObject({
            label: requiredText,
            time: requiredText,
          }),
        )
        .default([]),
      url: z.url(),
    }),
  )
  .default([]);

/** 共享变更日志条目结构，供各模块的 changelog Section 复用。 */
export const changelogEntriesSchema = z
  .array(
    z.strictObject({
      changes: paragraphList,
      date: isoDate,
    }),
  )
  .default([]);

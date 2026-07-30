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
export const imagePath = z
  .string()
  .trim()
  .startsWith("/")
  .regex(/\.(?:avif|webp)$/i, {
    message: "must use an AVIF or WebP image",
  });
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
  label: requiredText,
  sourceType: z.enum(["official", "in-game", "community", "tool", "other"]),
  url: z.url(),
});

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

/** 共享视频条目结构，供各模块的 video Section 复用。 */
export const videoEntriesSchema = z
  .array(
    z.strictObject({
      creator: requiredText.optional(),
      description: requiredText.optional(),
      label: requiredText,
      takeaway: requiredText.optional(),
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

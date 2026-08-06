/**
 * 文件职责：定义内容翻译元数据契约与辅助函数。
 *
 * 该模块刻意保持“独立可选”：翻译元数据不是文章 Front Matter 的强制字段，
 * 现有 212 篇内容文件无需改动即可继续通过校验。未来生成目标语言译文时，
 * 文章可携带 `translation` 块，该块通过本模块的 {@link translationMetaSchema}
 * 单独校验，不会污染各内容类型的严格 JSON Schema。
 */
import { z } from "zod";

import { supportedLocales } from "./constants";

/** 翻译状态机：source=英语事实源；machine-draft=机器草稿未审；review-needed=待二审；reviewed=已审可发；stale=源已更新待重译。 */
export const translationStatuses = [
  "source",
  "machine-draft",
  "review-needed",
  "reviewed",
  "stale",
] as const;
export type TranslationStatus = (typeof translationStatuses)[number];

/** 过期风险等级：low=排版/措辞变化可保留索引；mechanic-critical=机制变化需 noindex 并从 Sitemap 移除。 */
export const translationRisks = ["low", "mechanic-critical"] as const;
export type TranslationRisk = (typeof translationRisks)[number];

const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

/**
 * 通用翻译元数据。所有字段在文章中均为可选；当文件确实携带 `translation`
 * 块时，使用 {@link translationMetaSchema} 校验其结构，避免把占位符或错字
 * 当作合法译文发布。
 */
export const translationMetaSchema = z.object({
  sourceLocale: z.enum(supportedLocales).default("en"),
  sourceContentId: z.string().trim().min(1),
  sourceRevision: z.string().trim().min(1),
  translationStatus: z.enum(translationStatuses).default("source"),
  translatedAt: isoDate.optional(),
  reviewedAt: isoDate.optional(),
  translator: z.string().trim().min(1).optional(),
  reviewer: z.string().trim().min(1).optional(),
  translationRisk: z.enum(translationRisks).optional(),
});

export type TranslationMeta = z.infer<typeof translationMetaSchema>;

/** 从文章原始对象安全提取翻译元数据；缺失或非法时返回 undefined，绝不抛错。 */
export function translationMetaFromRaw(
  raw: unknown,
): TranslationMeta | undefined {
  if (raw == null || typeof raw !== "object") return undefined;
  const result = translationMetaSchema.safeParse(raw);
  return result.success ? result.data : undefined;
}

/**
 * 判断译文当前是否可进入生产索引（Sitemap/搜索）。
 * 英语 source 永远可发；reviewed 可发；machine-draft/review-needed 不可发；
 * 机制级过期的 reviewed 译文在源修订号变化后不可发，直到重新 review。
 */
export function isPublishableTranslation(
  meta: TranslationMeta | undefined,
  sourceRevision: string | undefined,
): boolean {
  if (!meta) return false;
  if (meta.translationStatus === "source") return true;
  if (meta.translationStatus !== "reviewed") return false;
  if (
    meta.translationRisk === "mechanic-critical" &&
    sourceRevision &&
    meta.sourceRevision !== sourceRevision
  ) {
    return false;
  }
  return true;
}

/** 译文源修订号与英语事实源不一致即为过期。 */
export function isTranslationStale(
  meta: TranslationMeta | undefined,
  sourceRevision: string | undefined,
): boolean {
  if (!meta || !sourceRevision) return false;
  return meta.sourceRevision !== sourceRevision;
}

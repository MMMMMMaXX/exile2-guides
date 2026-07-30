/** 文件职责：定义 V4 骨架阶段的类型专属内容契约，供开发 mock、未来 Front Matter 校验和详情模板共享。 */
import { z } from "zod";

import { contentFrontMatterSchema } from "./schema";
import { buildArticleSchema, type BuildArticle } from "../builds/schema";

const skeletonText = z.string().trim().min(1);
const skeletonList = z.array(skeletonText).default([]);
const factSchema = z.strictObject({ label: skeletonText, value: skeletonText });
const sourceSchema = z.strictObject({ label: skeletonText, url: z.url() });

// Builds 已迁移到可直接映射数据库的独立 JSON 契约；这里保留兼容出口，避免形成第二套 Schema。
export const buildContentSchema = buildArticleSchema;

/** BossContent 描述战前准备、阶段和攻击表的模板数据边界。 */
export const bossContentSchema = contentFrontMatterSchema.and(
  z.object({
    contentType: z.literal("boss"),
    attacks: z.array(z.record(skeletonText, skeletonText)).default([]),
    preparation: skeletonList,
    rewards: skeletonList,
  }),
);

/** ItemContent 描述物品参考页的来源、用途和 FAQ 结构，不代表任何游戏数值。 */
export const itemContentSchema = contentFrontMatterSchema.and(
  z.object({
    contentType: z.literal("item"),
    effect: skeletonText.optional(),
    obtain: skeletonText.optional(),
    relatedSkills: skeletonList,
    useLocations: skeletonList,
  }),
);

/** SkillContent 描述技能页的连接、限制与常见组合结构。 */
export const skillContentSchema = contentFrontMatterSchema.and(
  z.object({
    contentType: z.literal("skill"),
    incompatibleSupports: skeletonList,
    recommendedSupports: skeletonList,
    relatedBuilds: skeletonList,
  }),
);

/** GuideContent 描述问题型攻略的快速答案、症状和解决方案结构。 */
export const guideContentSchema = contentFrontMatterSchema.and(
  z.object({
    contentType: z.literal("guide"),
    quickAnswer: skeletonText.optional(),
    requirements: skeletonList,
    solutions: skeletonList,
    symptoms: skeletonList,
  }),
);

/** PatchContent 描述补丁影响与复核队列结构，避免复制官方完整补丁说明。 */
export const patchContentSchema = contentFrontMatterSchema.and(
  z.object({
    contentType: z.literal("patch"),
    affectedPages: skeletonList,
    impacts: skeletonList,
    officialUrl: z.url().optional(),
    recheckQueue: skeletonList,
  }),
);

/** V4 骨架页共用的详情模块数据契约。 */
export const detailSkeletonSchema = z.strictObject({
  facts: z.array(factSchema).default([]),
  sources: z.array(sourceSchema).default([]),
  sections: z
    .array(z.strictObject({ id: skeletonText, title: skeletonText }))
    .default([]),
});

export type BuildContent = BuildArticle;
export type BossContent = z.infer<typeof bossContentSchema>;
export type ItemContent = z.infer<typeof itemContentSchema>;
export type SkillContent = z.infer<typeof skillContentSchema>;
export type GuideContent = z.infer<typeof guideContentSchema>;
export type PatchContent = z.infer<typeof patchContentSchema>;
export type DetailSkeleton = z.infer<typeof detailSkeletonSchema>;

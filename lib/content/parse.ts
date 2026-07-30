/** 文件职责：解析单个 Markdown/MDX 内容文件，并返回统一、可定位的校验结果。 */
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import path from "node:path";
import type { ZodIssue } from "zod";

import {
  type ContentFrontMatter,
  containsPublishedPlaceholder,
  contentFrontMatterSchema,
} from "./schema";
import type { BuildArticle } from "../builds/schema";
import type { BossArticle } from "../bosses/schema";
import type { ItemArticle } from "../items/schema";
import type { SkillArticle } from "../skills/schema";
import type { GuideArticle } from "../guides/schema";
import type { PatchArticle } from "../patches/schema";

export type ContentExtension = ".json" | ".md" | ".mdx";

export type ParsedContent = {
  body: string;
  bossArticle?: BossArticle;
  buildArticle?: BuildArticle;
  extension: ContentExtension;
  frontMatter: ContentFrontMatter;
  guideArticle?: GuideArticle;
  itemArticle?: ItemArticle;
  patchArticle?: PatchArticle;
  skillArticle?: SkillArticle;
  sourcePath: string;
};

export type ContentParseIssue = {
  code:
    | "invalid-extension"
    | "invalid-front-matter"
    | "invalid-markdown"
    | "published-empty-body"
    | "published-placeholder"
    | "published-unverified-body";
  message: string;
  path?: PropertyKey[];
};

export class ContentParseError extends Error {
  readonly issues: ContentParseIssue[];
  readonly sourcePath: string;

  /** 保存来源路径和结构化问题，供 CLI、测试及未来编辑工具统一消费。 */
  constructor(sourcePath: string, issues: ContentParseIssue[]) {
    super(`Content validation failed for ${sourcePath}`);
    this.name = "ContentParseError";
    this.sourcePath = sourcePath;
    this.issues = issues;
  }
}

/** 将 Zod 错误转换为不依赖校验库实现细节的公共错误结构。 */
function fromZodIssue(issue: ZodIssue): ContentParseIssue {
  return {
    code: "invalid-front-matter",
    message: issue.message,
    path: issue.path,
  };
}

/**
 * 解析并校验单个内容文件，但不会执行 MDX。
 * 编译步骤只检查语法，原始正文仍是后续构建期渲染的唯一事实源。
 */
export async function parseContentSource(
  source: string,
  sourcePath: string,
): Promise<ParsedContent> {
  const extension = path.extname(sourcePath);

  if (extension !== ".md" && extension !== ".mdx") {
    throw new ContentParseError(sourcePath, [
      {
        code: "invalid-extension",
        message: "content files must use .md or .mdx",
      },
    ]);
  }

  let parsedMatter: matter.GrayMatterFile<string>;
  try {
    parsedMatter = matter(source);
  } catch (error) {
    throw new ContentParseError(sourcePath, [
      {
        code: "invalid-front-matter",
        message:
          error instanceof Error ? error.message : "invalid Front Matter",
      },
    ]);
  }

  const frontMatterResult = contentFrontMatterSchema.safeParse(
    parsedMatter.data,
  );
  if (!frontMatterResult.success) {
    throw new ContentParseError(
      sourcePath,
      frontMatterResult.error.issues.map(fromZodIssue),
    );
  }

  const body = parsedMatter.content.trim();
  const publicationIssues: ContentParseIssue[] = [];
  if (frontMatterResult.data.status === "published") {
    if (!body) {
      publicationIssues.push({
        code: "published-empty-body",
        message: "published content must include a non-empty body",
      });
    }

    if (containsPublishedPlaceholder(body)) {
      publicationIssues.push({
        code: "published-placeholder",
        message:
          "published body contains TODO, REPLACE_WITH_, or example.invalid",
      });
    }

    if (
      frontMatterResult.data.verificationStatus !== "pending-pc" &&
      /PC verification is pending|PC 核验尚未完成/i.test(body)
    ) {
      publicationIssues.push({
        code: "published-unverified-body",
        message:
          "published body cannot state that PC verification is still pending",
      });
    }
  }

  if (publicationIssues.length > 0) {
    throw new ContentParseError(sourcePath, publicationIssues);
  }

  try {
    await compile(body, {
      development: false,
      format: extension === ".md" ? "md" : "mdx",
      outputFormat: "function-body",
    });
  } catch (error) {
    throw new ContentParseError(sourcePath, [
      {
        code: "invalid-markdown",
        message:
          error instanceof Error ? error.message : "invalid Markdown/MDX",
      },
    ]);
  }

  return {
    body,
    extension,
    frontMatter: frontMatterResult.data,
    sourcePath,
  };
}

/** 文件职责：在构建阶段发现、解析并校验 Builds JSON，浏览器运行时不得直接读取文件系统。 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ZodIssue } from "zod";

import { InMemoryBuildRepository } from "./repository";
import { buildArticleSchema, type BuildArticle } from "./schema";

export type BuildJsonIssue = {
  code:
    | "invalid-json"
    | "invalid-schema"
    | "duplicate-id-locale"
    | "duplicate-route"
    | "translation-slug-mismatch";
  message: string;
  path?: PropertyKey[];
  sourcePaths: string[];
};

export class BuildJsonError extends Error {
  readonly issues: readonly BuildJsonIssue[];

  /** 保存全部 JSON 问题，使 CLI 能一次向内容编辑者报告所有待修文件。 */
  constructor(issues: readonly BuildJsonIssue[]) {
    super(`Build JSON validation failed with ${issues.length} issue(s)`);
    this.name = "BuildJsonError";
    this.issues = issues;
  }
}

/** 递归发现位于任意语言 builds 目录中的 JSON，兼容生产内容和隔离测试目录。 */
export async function discoverBuildJsonFiles(
  contentDirectory: string,
): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(contentDirectory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(contentDirectory, entry.name);
      if (entry.isDirectory()) return discoverBuildJsonFiles(entryPath);
      const segments = entryPath.split(path.sep);
      return entry.name.endsWith(".json") && segments.includes("builds")
        ? [entryPath]
        : [];
    }),
  );
  return files.flat().sort();
}

/** 将 Zod 问题转换为与内容 CLI 无关的稳定错误结构。 */
function schemaIssue(issue: ZodIssue, sourcePath: string): BuildJsonIssue {
  return {
    code: "invalid-schema",
    message: issue.message,
    path: issue.path,
    sourcePaths: [sourcePath],
  };
}

/**
 * 加载全部 Build JSON 并一次报告跨文件冲突。
 * 文件名必须等于 slug，防止内容移动或导入数据库时出现隐含别名。
 */
export async function loadBuildArticles(
  contentDirectory = path.resolve(process.cwd(), "content"),
  projectRoot = process.cwd(),
): Promise<BuildArticle[]> {
  const files = await discoverBuildJsonFiles(contentDirectory);
  const articles: { article: BuildArticle; sourcePath: string }[] = [];
  const issues: BuildJsonIssue[] = [];

  for (const file of files) {
    const sourcePath = path.relative(projectRoot, file);
    let value: unknown;
    try {
      value = JSON.parse(await readFile(file, "utf8"));
    } catch (error) {
      issues.push({
        code: "invalid-json",
        message: error instanceof Error ? error.message : "invalid JSON",
        sourcePaths: [sourcePath],
      });
      continue;
    }
    const result = buildArticleSchema.safeParse(value);
    if (!result.success) {
      issues.push(
        ...result.error.issues.map((issue) => schemaIssue(issue, sourcePath)),
      );
      continue;
    }
    if (path.basename(file, ".json") !== result.data.slug) {
      issues.push({
        code: "invalid-schema",
        message: "file name must match article slug",
        path: ["slug"],
        sourcePaths: [sourcePath],
      });
      continue;
    }
    articles.push({ article: result.data, sourcePath });
  }

  const localizedIds = new Map<string, (typeof articles)[number]>();
  const routes = new Map<string, (typeof articles)[number]>();
  const translations = new Map<string, (typeof articles)[number][]>();
  for (const entry of articles) {
    const localizedId = `${entry.article.id}:${entry.article.locale}`;
    const route = `${entry.article.locale}:${entry.article.slug}`;
    const existingId = localizedIds.get(localizedId);
    const existingRoute = routes.get(route);
    if (existingId) {
      issues.push({
        code: "duplicate-id-locale",
        message: `${localizedId} is declared more than once`,
        sourcePaths: [existingId.sourcePath, entry.sourcePath],
      });
    } else {
      localizedIds.set(localizedId, entry);
    }
    if (existingRoute) {
      issues.push({
        code: "duplicate-route",
        message: `/${entry.article.locale}/builds/${entry.article.slug}/ is declared more than once`,
        sourcePaths: [existingRoute.sourcePath, entry.sourcePath],
      });
    } else {
      routes.set(route, entry);
    }
    const group = translations.get(entry.article.id) ?? [];
    group.push(entry);
    translations.set(entry.article.id, group);
  }

  for (const [id, group] of translations) {
    const reference = group[0];
    if (!reference) continue;
    for (const translation of group.slice(1)) {
      if (translation.article.slug !== reference.article.slug) {
        issues.push({
          code: "translation-slug-mismatch",
          message: `translations for ${id} must share one stable slug`,
          sourcePaths: [reference.sourcePath, translation.sourcePath],
        });
      }
    }
  }

  if (issues.length > 0) throw new BuildJsonError(issues);
  return articles.map((entry) => entry.article);
}

/** 创建当前 JSON 数据源仓储；未来数据库实现只需遵守 BuildRepository。 */
export async function createJsonBuildRepository(
  contentDirectory?: string,
): Promise<InMemoryBuildRepository> {
  return new InMemoryBuildRepository(await loadBuildArticles(contentDirectory));
}

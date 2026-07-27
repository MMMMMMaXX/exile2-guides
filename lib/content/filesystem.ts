/** 文件职责：发现并解析仓库内容文件；不负责建立路由、翻译或关联索引。 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { parseContentSource, type ParsedContent } from "./parse";

const supportedContentExtensions = new Set([".md", ".mdx"]);

/** 判断错误是否表示目标路径不存在，避免把权限或读取错误误判为空内容目录。 */
function isMissingPathError(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

/** 递归发现 Markdown/MDX 文件，并排序以保证不同机器上的构建顺序一致。 */
export async function discoverContentFiles(
  directory: string,
): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (isMissingPathError(error)) return [];
    throw error;
  }

  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return discoverContentFiles(entryPath);
      return supportedContentExtensions.has(path.extname(entry.name))
        ? [entryPath]
        : [];
    }),
  );

  return nestedFiles.flat().sort();
}

/** 读取并校验指定目录中的全部内容文件，保留相对项目路径用于错误定位。 */
export async function loadContentFiles(
  directory: string,
  projectRoot = process.cwd(),
): Promise<ParsedContent[]> {
  const files = await discoverContentFiles(directory);
  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(file, "utf8");
      return parseContentSource(source, path.relative(projectRoot, file));
    }),
  );
}

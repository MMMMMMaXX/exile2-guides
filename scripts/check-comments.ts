/** 文件职责：自动检查中文文件头和具名函数注释，防止维护规范随新增代码失效。 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();
const scannedDirectories = ["app", "lib", "scripts", "tests", "docs"];
const scannedRootFiles = [
  ".env.example",
  ".gitignore",
  ".prettierignore",
  "AGENTS.md",
  "README.md",
  "eslint.config.js",
  "playwright.config.ts",
  "prettier.config.js",
  "react-router.config.ts",
  "vite.config.ts",
  "vitest.config.ts",
];
const supportedExtensions = new Set([".ts", ".tsx", ".js", ".css", ".md"]);
const chineseCharacter = /[\u3400-\u4dbf\u4e00-\u9fff]/;

/** 递归收集需要检查的人工维护文件；生成目录不会从这里进入扫描范围。 */
async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(entryPath);
      return supportedExtensions.has(path.extname(entry.name))
        ? [entryPath]
        : [];
    }),
  );
  return nestedFiles.flat();
}

/** 判断文件开头是否使用该格式支持的注释语法，并且包含中文职责说明。 */
function hasChineseFileHeader(filePath: string, source: string): boolean {
  const extension = path.extname(filePath);
  const prefix = source.slice(0, 500);

  if (extension === ".md") {
    return /^\s*<!--[\s\S]*?-->/.test(prefix) && chineseCharacter.test(prefix);
  }

  if (extension === ".css") {
    return /^\s*\/\*[\s\S]*?\*\//.test(prefix) && chineseCharacter.test(prefix);
  }

  if (extension === ".ts" || extension === ".tsx" || extension === ".js") {
    return (
      /^\s*\/(?:\*[\s\S]*?\*\/|\/[^\n]*)/.test(prefix) &&
      chineseCharacter.test(prefix)
    );
  }

  return /^\s*#[^\n]*/.test(prefix) && chineseCharacter.test(prefix);
}

/** 判断节点前紧邻的注释中是否包含中文，避免把远处的文件头误算作函数说明。 */
function hasChineseLeadingComment(
  sourceFile: ts.SourceFile,
  node: ts.Node,
): boolean {
  const source = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(source, node.getFullStart()) ?? [];
  const nearest = ranges.at(-1);
  if (!nearest) return false;

  const betweenCommentAndNode = source.slice(nearest.end, node.getStart());
  return (
    betweenCommentAndNode.trim() === "" &&
    chineseCharacter.test(source.slice(nearest.pos, nearest.end))
  );
}

/** 返回缺少中文说明的具名函数、方法和构造函数，供错误输出精确定位。 */
function findUncommentedFunctions(filePath: string, source: string): string[] {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : filePath.endsWith(".js")
      ? ts.ScriptKind.JS
      : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
  const failures: string[] = [];

  /** 深度遍历语法树，只检查具有稳定名称、值得维护说明的函数节点。 */
  function visit(node: ts.Node) {
    let displayName: string | undefined;

    if (ts.isFunctionDeclaration(node) && node.name) {
      displayName = node.name.text;
    } else if (ts.isMethodDeclaration(node) && node.name) {
      displayName = node.name.getText(sourceFile);
    } else if (ts.isConstructorDeclaration(node)) {
      displayName = "constructor";
    }

    if (displayName && !hasChineseLeadingComment(sourceFile, node)) {
      const line =
        sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      failures.push(`${displayName}:${line}`);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return failures;
}

/** 执行仓库检查并汇总全部缺失项，方便一次性修复而不是逐文件失败。 */
async function main() {
  const directoryFiles = (
    await Promise.all(
      scannedDirectories.map((directory) =>
        collectFiles(path.join(projectRoot, directory)),
      ),
    )
  ).flat();
  const files = [
    ...directoryFiles,
    ...scannedRootFiles.map((file) => path.join(projectRoot, file)),
  ].sort();
  const failures: string[] = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const relativePath = path.relative(projectRoot, file);

    if (!hasChineseFileHeader(file, source)) {
      failures.push(`${relativePath}: 缺少中文文件级职责注释`);
    }

    if (/\.(?:ts|tsx|js)$/.test(file)) {
      for (const functionName of findUncommentedFunctions(file, source)) {
        failures.push(
          `${relativePath}:${functionName}: 缺少紧邻函数定义的中文注释`,
        );
      }
    }
  }

  if (failures.length > 0) {
    console.error("中文注释检查失败：");
    failures.forEach((failure) => console.error(`  - ${failure}`));
    process.exitCode = 1;
    return;
  }

  console.log(`中文注释检查通过：${files.length} 个文件。`);
}

await main();

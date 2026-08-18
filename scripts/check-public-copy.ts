/** 文件职责：扫描预渲染 HTML，阻止内部审核、机器生成和占位状态文案进入公开搜索页面。 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const buildRoot = path.resolve("build/client");

/**
 * 只检查明确属于内部工作流的稳定短语，避免把正常的证据边界说明误判为失败。
 * 十语言旧文案均列入门禁，保证翻译页不会成为内部状态的泄漏通道。
 */
const forbiddenPublicPhrases = [
  "pending-pc",
  "machine-draft",
  "Editorial Team",
  "StratLore Editorial",
  "Before publication",
  "assigned fact reviewer",
  "Initial version generated from",
  "Vor der Veröffentlichung",
  "Erstversion erzeugt",
  "Antes de la publicación",
  "Versión inicial generada",
  "Avant publication",
  "Version initiale générée",
  "公開前の確認",
  "初版を生成",
  "게시 이전",
  "초기 버전 생성",
  "Antes da publicação",
  "Versão inicial gerada",
  "Перед публикацией",
  "Начальная версия, сгенерированная",
  "Yayınlanmadan önce",
  "oluşturulan ilk sürüm",
  "标记为已核验前的检查",
  "初始版本：基于",
] as const;

/** 递归列出目录内全部 HTML；只扫描最终用户会看到的产物，不检查源码或内部研究文件。 */
async function listHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(absolutePath);
      return entry.isFile() && entry.name.endsWith(".html")
        ? [absolutePath]
        : [];
    }),
  );
  return nested.flat();
}

/** 执行公开文案门禁并输出精确文件与命中短语，便于内容作者定点修复。 */
async function main(): Promise<void> {
  const htmlFiles = await listHtmlFiles(buildRoot);
  const failures: Array<{ file: string; phrase: string }> = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    // React Router 会把内部数据序列化到 hydration script；门禁检查可见正文，
    // 结构化数据的作者实体由 structured-data 单测独立验证，避免把不可见运行时数据误报为页面文案。
    const visibleHtml = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
    for (const phrase of forbiddenPublicPhrases) {
      if (visibleHtml.includes(phrase)) {
        failures.push({ file: path.relative(buildRoot, file), phrase });
      }
    }
  }

  if (failures.length > 0) {
    const details = failures
      .slice(0, 30)
      .map(({ file, phrase }) => `- ${file}: ${JSON.stringify(phrase)}`)
      .join("\n");
    throw new Error(
      `公开 HTML 含内部工作流文案（${failures.length} 处）：\n${details}`,
    );
  }

  console.log(`Public copy check passed: ${htmlFiles.length} HTML files.`);
}

await main();

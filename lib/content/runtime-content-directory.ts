/** 文件职责：统一解析 SSR 内容目录，确保 Playwright 隔离夹具不会与生产 content/ 混用。 */
import path from "node:path";

/** E2E 仅由 Vite e2e mode 注入目录；常规开发与生产始终回退正式 content/。 */
export function getRuntimeContentDirectory(): string {
  const testDirectory = process.env.E2E_CONTENT_DIRECTORY;
  return testDirectory
    ? path.resolve(testDirectory)
    : path.resolve(process.cwd(), "content");
}

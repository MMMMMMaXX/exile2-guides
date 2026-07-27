/** 文件职责：定义浏览器端到端测试的运行环境；具体场景由 TASK-023 补充。 */
import path from "node:path";

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // 本地复用已安装 Chrome；CI 使用前置步骤下载的 Playwright Chromium。
        ...(process.env.CI ? {} : { channel: "chrome" as const }),
      },
    },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    env: {
      ...process.env,
      E2E_CONTENT_DIRECTORY: path.resolve(
        process.cwd(),
        ".e2e-content-fixtures",
      ),
    },
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});

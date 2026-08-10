/** 文件职责：定义浏览器端到端测试的运行环境；具体场景由 TASK-023 补充。 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  // React Router dev 首次编译虚拟内容模块时串行更稳定，也能避免多个浏览器同时触发重复预热。
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  workers: 1,
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
    command: "npm run dev -- --mode e2e --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});

/** 文件职责：限定单元与组件测试范围，并提供浏览器 DOM 模拟环境。 */
import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // 单元测试不加载生产内容清单；相关链接测试使用空路由夹具验证安全回退。
    alias: {
      "virtual:content-routes": path.resolve(
        __dirname,
        "tests/fixtures/virtual-content-routes.ts",
      ),
    },
  },
  test: {
    environment: "jsdom",
    include: [
      "tests/unit/**/*.test.{ts,tsx}",
      "tests/components/**/*.test.{ts,tsx}",
    ],
  },
});

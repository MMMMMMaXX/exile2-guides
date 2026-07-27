/** 文件职责：限定单元与组件测试范围，并提供浏览器 DOM 模拟环境。 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: [
      "tests/unit/**/*.test.{ts,tsx}",
      "tests/components/**/*.test.{ts,tsx}",
    ],
  },
});

/** 文件职责：提供最小测试环境烟雾检查，确保基础测试命令可持续运行。 */
import { describe, expect, it } from "vitest";

// 该用例只验证测试基础设施；具体业务行为由对应模块测试覆盖。
describe("project foundation", () => {
  it("runs the test environment", () => {
    expect("Exile2 Guides").toContain("Guides");
  });
});

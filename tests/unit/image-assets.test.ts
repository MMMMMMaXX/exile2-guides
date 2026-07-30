/** 文件职责：验证稳定图片路径会进入统一的 Vite 指纹资源注册表。 */
import { describe, expect, it } from "vitest";

import {
  getRegisteredImageAssetPaths,
  resolveImageAsset,
} from "../../lib/assets/image-assets";

describe("image assets", () => {
  it("把仓库图片路径解析为 Vite 资源 URL", () => {
    const stablePath = "/images/prototype-v4/hero-skill.webp";

    expect(resolveImageAsset(stablePath)).not.toBe(stablePath);
    expect(getRegisteredImageAssetPaths()).toContain(stablePath);
  });

  it("保留外部图片 URL", () => {
    const externalUrl = "https://example.com/image.webp";

    expect(resolveImageAsset(externalUrl)).toBe(externalUrl);
  });

  it("保留未知路径并交给构建门禁报告", () => {
    const missingPath = "/images/missing.webp";

    expect(resolveImageAsset(missingPath)).toBe(missingPath);
  });
});

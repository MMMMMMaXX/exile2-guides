/** 文件职责：将稳定的内容图片路径统一解析为 Vite 构建生成的带指纹资源 URL。 */

const imageAssetModules = import.meta.glob<string>(
  "/app/assets/images/**/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const sourcePrefix = "/app/assets/images/";
const publicPrefix = "/images/";

const fingerprintedImageAssets = new Map(
  Object.entries(imageAssetModules).map(([sourcePath, builtUrl]) => [
    `${publicPrefix}${sourcePath.slice(sourcePrefix.length)}`,
    builtUrl,
  ]),
);

/**
 * 把内容层的稳定 `/images/…` 路径转换为构建指纹 URL。
 * 外部 URL 和数据 URL 保持原样；未知本地路径也保留，交由构建门禁报告缺失文件。
 */
export function resolveImageAsset(source: string): string {
  if (!source.startsWith(publicPrefix)) return source;
  return fingerprintedImageAssets.get(source) ?? source;
}

/** 返回已注册的稳定图片路径，供构建门禁确认新增文件已进入统一资源管线。 */
export function getRegisteredImageAssetPaths(): readonly string[] {
  return [...fingerprintedImageAssets.keys()].sort();
}

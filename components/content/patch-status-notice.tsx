/** 文件职责：明确标示需要复核或已过期的 Patch 内容，避免旧攻略被误解为当前结论。 */
import type { ContentFrontMatter } from "../../lib/content/schema";

/** 只在 Patch 状态需要额外风险说明时渲染提示，当前或支持内容不制造冗余警告。 */
export function PatchStatusNotice({
  frontMatter,
}: {
  frontMatter: ContentFrontMatter;
}) {
  if (
    frontMatter.patchStatus !== "under-review" &&
    frontMatter.patchStatus !== "legacy"
  )
    return null;
  const zh = frontMatter.locale === "zh-cn";
  return (
    <aside className="patch-status-notice" role="status">
      <strong>{zh ? "旧版本内容" : "Legacy content"}</strong>
      <p>
        {zh
          ? "本内容对应较早版本，仅供历史参考。"
          : "This content covers an older patch and is kept for historical reference."}
      </p>
    </aside>
  );
}

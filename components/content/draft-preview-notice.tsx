/** 文件职责：在本地草稿详情页明确提示非公开状态，避免预览内容被误认为正式发布。 */
import type { ContentFrontMatter } from "../../lib/content/schema";

type DraftPreviewFrontMatter = Pick<ContentFrontMatter, "draft" | "locale">;

/** 仅为草稿渲染双语预览提示；生产内容模块不会提供此类页面。 */
export function DraftPreviewNotice({
  frontMatter,
}: {
  frontMatter: DraftPreviewFrontMatter;
}) {
  if (!frontMatter.draft) return null;
  const zh = frontMatter.locale === "zh-cn";
  return (
    <aside className="draft-preview-notice" role="status">
      <strong>{zh ? "本地草稿预览" : "Local draft preview"}</strong>
      <p>
        {zh
          ? "此页面仅在本地开发环境可见，尚未完成审核，不会进入生产站点、站内搜索或 Sitemap。"
          : "This page is visible only in local development. It is not approved and will not enter the production site, search index, or Sitemap."}
      </p>
    </aside>
  );
}

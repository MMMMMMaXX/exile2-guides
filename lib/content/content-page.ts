/** 文件职责：定义构建期内容页面数据契约，供虚拟模块与路由共享而不依赖文件系统。 */
import type { ContentFrontMatter } from "./schema";
import type { TableOfContentsItem } from "./table-of-contents";
import type { BuildArticle } from "../builds/schema";
import type { BossArticle } from "../bosses/schema";
import type { ItemArticle } from "../items/schema";
import type { SkillArticle } from "../skills/schema";
import type { GuideArticle } from "../guides/schema";
import type { PatchArticle } from "../patches/schema";

export type StaticContentPage = {
  bodyHtml: string;
  bossArticle?: BossArticle;
  buildArticle?: BuildArticle;
  frontMatter: ContentFrontMatter;
  guideArticle?: GuideArticle;
  itemArticle?: ItemArticle;
  patchArticle?: PatchArticle;
  skillArticle?: SkillArticle;
  tableOfContents: readonly TableOfContentsItem[];
};

export type StaticContentPageMap = Readonly<Record<string, StaticContentPage>>;

/** 文件职责：定义 Skills 数据源抽象；页面和服务不得依赖 JSON 或未来数据库的具体读取方式。 */
import type { ContentLocale } from "../content/constants";
import type { SkillArticle } from "./schema";

export interface SkillRepository {
  getAll(): Promise<readonly SkillArticle[]>;
  getById(id: string, locale: ContentLocale): Promise<SkillArticle | undefined>;
  getBySlug(
    locale: ContentLocale,
    slug: string,
  ): Promise<SkillArticle | undefined>;
  getPublished(locale?: ContentLocale): Promise<readonly SkillArticle[]>;
}

/** 内存实现承接已校验数据；JSON 与未来 API 适配器均可复用相同查询语义。 */
export class InMemorySkillRepository implements SkillRepository {
  readonly #articles: readonly SkillArticle[];

  /** 复制已校验输入，避免外部数组后续变更影响同一次构建结果。 */
  constructor(articles: readonly SkillArticle[]) {
    this.#articles = [...articles];
  }

  /** 返回全部编辑记录；发布过滤由明确的公开查询承担。 */
  async getAll(): Promise<readonly SkillArticle[]> {
    return this.#articles;
  }

  /** 按稳定 ID 和语言定位编辑记录，供翻译及数据库关系使用。 */
  async getById(
    id: string,
    locale: ContentLocale,
  ): Promise<SkillArticle | undefined> {
    return this.#articles.find(
      (article) => article.id === id && article.locale === locale,
    );
  }

  /** 详情查询只返回已发布记录，避免路由消费者意外公开草稿或归档。 */
  async getBySlug(
    locale: ContentLocale,
    slug: string,
  ): Promise<SkillArticle | undefined> {
    return this.#articles.find(
      (article) =>
        article.locale === locale &&
        article.slug === slug &&
        article.status === "published",
    );
  }

  /** 枚举公开内容，可选语言条件用于列表、预渲染和 Sitemap。 */
  async getPublished(locale?: ContentLocale): Promise<readonly SkillArticle[]> {
    return this.#articles.filter(
      (article) =>
        article.status === "published" &&
        (!locale || article.locale === locale),
    );
  }
}

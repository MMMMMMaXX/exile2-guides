/** 文件职责：集中实现 Skill 查询、筛选和排序业务规则，确保页面与未来 API 使用一致结果。 */
import type { ContentLocale } from "../content/constants";
import type { SkillRepository } from "./repository";
import type { SkillArticle, SkillType } from "./schema";

export type SkillFilters = {
  category?: string;
  skillType?: SkillType;
};

export type SkillSort = "title" | "updated";

/** 对已发布 Skill 执行交集筛选；空字段不参与判断。 */
export function filterSkills(
  articles: readonly SkillArticle[],
  filters: SkillFilters,
): SkillArticle[] {
  return articles.filter(
    (article) =>
      (!filters.category || article.skillCategory === filters.category) &&
      (!filters.skillType || article.skillType === filters.skillType),
  );
}

const validSkillTypes = new Set<SkillType>(["active", "support", "passive"]);

/** 从公开查询参数读取受控筛选，未知枚举值被忽略而不会污染业务状态。 */
export function parseSkillQuery(searchParams: URLSearchParams): {
  filters: SkillFilters;
  sort: SkillSort;
} {
  const skillType = searchParams.get("skillType") as SkillType | null;
  const sort = searchParams.get("sort");
  return {
    filters: {
      ...(searchParams.get("category")
        ? { category: searchParams.get("category")! }
        : {}),
      ...(skillType && validSkillTypes.has(skillType) ? { skillType } : {}),
    },
    sort: sort === "title" ? "title" : "updated",
  };
}

/** 返回新数组并应用稳定排序，避免调用方意外改变共享构建数据。 */
export function sortSkills(
  articles: readonly SkillArticle[],
  sort: SkillSort = "updated",
): SkillArticle[] {
  return [...articles].sort((left, right) =>
    sort === "title"
      ? left.title.localeCompare(right.title)
      : right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
  );
}

export class SkillService {
  readonly #repository: SkillRepository;

  /** 接收抽象仓储，使未来数据库接入不改变页面业务服务。 */
  constructor(repository: SkillRepository) {
    this.#repository = repository;
  }

  /** 读取同语言公开内容并使用共享筛选器返回确定顺序。 */
  async list(
    locale: ContentLocale,
    filters: SkillFilters = {},
    sort: SkillSort = "updated",
  ): Promise<readonly SkillArticle[]> {
    return sortSkills(
      filterSkills(await this.#repository.getPublished(locale), filters),
      sort,
    );
  }

  /** 通过统一发布边界读取详情，页面不得绕过服务直接访问源数据。 */
  async findPublished(
    locale: ContentLocale,
    slug: string,
  ): Promise<SkillArticle | undefined> {
    return this.#repository.getBySlug(locale, slug);
  }
}

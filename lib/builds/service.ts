/** 文件职责：集中实现 Build 查询、筛选和排序业务规则，确保页面与未来 API 使用一致结果。 */
import type { ContentLocale } from "../content/constants";
import type { BuildRepository } from "./repository";
import type {
  BuildArticle,
  BuildBudget,
  BuildDifficulty,
  BuildStage,
} from "./schema";

export type BuildFilters = {
  ascendancy?: string;
  budget?: BuildBudget;
  class?: string;
  difficulty?: BuildDifficulty;
  skill?: string;
  stage?: BuildStage;
  playstyle?: string;
};

export type BuildSort = "title" | "updated";

/** 对已发布 Build 执行交集筛选；空字段不参与判断。 */
export function filterBuilds(
  articles: readonly BuildArticle[],
  filters: BuildFilters,
): BuildArticle[] {
  return articles.filter(
    (article) =>
      (!filters.class || article.classId === filters.class) &&
      (!filters.ascendancy || article.ascendancyId === filters.ascendancy) &&
      (!filters.stage || article.stages.includes(filters.stage)) &&
      (!filters.budget || article.budgets.includes(filters.budget)) &&
      (!filters.difficulty || article.difficulty === filters.difficulty) &&
      (!filters.skill ||
        article.mainSkillIds.includes(filters.skill) ||
        article.secondarySkillIds.includes(filters.skill)) &&
      (!filters.playstyle || article.playstyleTags.includes(filters.playstyle)),
  );
}

const validBudgets = new Set<BuildBudget>(["low", "medium", "high", "luxury"]);
const validDifficulties = new Set<BuildDifficulty>([
  "beginner",
  "intermediate",
  "advanced",
]);
const validStages = new Set<BuildStage>([
  "starter",
  "leveling",
  "early-endgame",
  "endgame",
  "bossing",
]);

/** 从公开查询参数读取受控筛选，未知枚举值被忽略而不会污染业务状态。 */
export function parseBuildQuery(searchParams: URLSearchParams): {
  filters: BuildFilters;
  sort: BuildSort;
} {
  const budget = searchParams.get("budget") as BuildBudget | null;
  const difficulty = searchParams.get("difficulty") as BuildDifficulty | null;
  const stage = searchParams.get("stage") as BuildStage | null;
  const sort = searchParams.get("sort");
  return {
    filters: {
      ...(searchParams.get("ascendancy")
        ? { ascendancy: searchParams.get("ascendancy")! }
        : {}),
      ...(budget && validBudgets.has(budget) ? { budget } : {}),
      ...(searchParams.get("class")
        ? { class: searchParams.get("class")! }
        : {}),
      ...(difficulty && validDifficulties.has(difficulty)
        ? { difficulty }
        : {}),
      ...(searchParams.get("playstyle")
        ? { playstyle: searchParams.get("playstyle")! }
        : {}),
      ...(searchParams.get("skill")
        ? { skill: searchParams.get("skill")! }
        : {}),
      ...(stage && validStages.has(stage) ? { stage } : {}),
    },
    sort: sort === "title" ? "title" : "updated",
  };
}

/** 返回新数组并应用稳定排序，避免调用方意外改变共享构建数据。 */
export function sortBuilds(
  articles: readonly BuildArticle[],
  sort: BuildSort = "updated",
): BuildArticle[] {
  return [...articles].sort((left, right) =>
    sort === "title"
      ? left.title.localeCompare(right.title)
      : right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
  );
}

export class BuildService {
  readonly #repository: BuildRepository;

  /** 接收抽象仓储，使未来数据库接入不改变页面业务服务。 */
  constructor(repository: BuildRepository) {
    this.#repository = repository;
  }

  /** 读取同语言公开内容并使用共享筛选器返回确定顺序。 */
  async list(
    locale: ContentLocale,
    filters: BuildFilters = {},
    sort: BuildSort = "updated",
  ): Promise<readonly BuildArticle[]> {
    return sortBuilds(
      filterBuilds(await this.#repository.getPublished(locale), filters),
      sort,
    );
  }

  /** 通过统一发布边界读取详情，页面不得绕过服务直接访问源数据。 */
  async findPublished(
    locale: ContentLocale,
    slug: string,
  ): Promise<BuildArticle | undefined> {
    return this.#repository.getBySlug(locale, slug);
  }
}

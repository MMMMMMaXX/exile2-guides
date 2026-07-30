/** 文件职责：集中实现 Boss 查询、筛选和排序业务规则，确保页面与未来 API 使用一致结果。 */
import type { ContentLocale } from "../content/constants";
import type { BossRepository } from "./repository";
import type { BossArticle, BossDifficulty } from "./schema";

export type BossFilters = {
  act?: string;
  category?: string;
  damage?: string;
  difficulty?: BossDifficulty;
  optional?: boolean;
};

export type BossSort = "title" | "updated";

/** 对已发布 Boss 执行交集筛选；空字段不参与判断。 */
export function filterBosses(
  articles: readonly BossArticle[],
  filters: BossFilters,
): BossArticle[] {
  return articles.filter(
    (article) =>
      (!filters.category || article.bossCategory === filters.category) &&
      (!filters.act || article.act === filters.act) &&
      (!filters.damage || article.damageTypes.includes(filters.damage)) &&
      (!filters.difficulty || article.difficulty === filters.difficulty) &&
      (filters.optional === undefined ||
        article.isOptional === filters.optional),
  );
}

const validDifficulties = new Set<BossDifficulty>(["low", "medium", "high"]);

/** 从公开查询参数读取受控筛选，未知枚举值被忽略而不会污染业务状态。 */
export function parseBossQuery(searchParams: URLSearchParams): {
  filters: BossFilters;
  sort: BossSort;
} {
  const difficulty = searchParams.get("difficulty") as BossDifficulty | null;
  const sort = searchParams.get("sort");
  const optional = searchParams.get("optional");
  return {
    filters: {
      ...(searchParams.get("act") ? { act: searchParams.get("act")! } : {}),
      ...(searchParams.get("category")
        ? { category: searchParams.get("category")! }
        : {}),
      ...(searchParams.get("damage")
        ? { damage: searchParams.get("damage")! }
        : {}),
      ...(difficulty && validDifficulties.has(difficulty)
        ? { difficulty }
        : {}),
      ...(optional === "true"
        ? { optional: true }
        : optional === "false"
          ? { optional: false }
          : {}),
    },
    sort: sort === "title" ? "title" : "updated",
  };
}

/** 返回新数组并应用稳定排序，避免调用方意外改变共享构建数据。 */
export function sortBosses(
  articles: readonly BossArticle[],
  sort: BossSort = "updated",
): BossArticle[] {
  return [...articles].sort((left, right) =>
    sort === "title"
      ? left.title.localeCompare(right.title)
      : right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
  );
}

export class BossService {
  readonly #repository: BossRepository;

  /** 接收抽象仓储，使未来数据库接入不改变页面业务服务。 */
  constructor(repository: BossRepository) {
    this.#repository = repository;
  }

  /** 读取同语言公开内容并使用共享筛选器返回确定顺序。 */
  async list(
    locale: ContentLocale,
    filters: BossFilters = {},
    sort: BossSort = "updated",
  ): Promise<readonly BossArticle[]> {
    return sortBosses(
      filterBosses(await this.#repository.getPublished(locale), filters),
      sort,
    );
  }

  /** 通过统一发布边界读取详情，页面不得绕过服务直接访问源数据。 */
  async findPublished(
    locale: ContentLocale,
    slug: string,
  ): Promise<BossArticle | undefined> {
    return this.#repository.getBySlug(locale, slug);
  }
}

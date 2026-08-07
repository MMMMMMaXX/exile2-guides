/** 文件职责：集中实现 Patch 查询、筛选和排序业务规则，确保页面与未来 API 使用一致结果。 */
import type { ContentLocale } from "../content/constants";
import type { PatchRepository } from "./repository";
import type { PatchArticle } from "./schema";

export type PatchFilters = {
  category?: string;
};

export type PatchSort = "title" | "updated" | "version";

/** 对已发布 Patch 执行交集筛选；空字段不参与判断。 */
export function filterPatches(
  articles: readonly PatchArticle[],
  filters: PatchFilters,
): PatchArticle[] {
  return articles.filter(
    (article) =>
      !filters.category || article.patchCategory === filters.category,
  );
}

/** 从公开查询参数读取受控筛选，未知枚举值被忽略而不会污染业务状态。 */
export function parsePatchQuery(searchParams: URLSearchParams): {
  filters: PatchFilters;
  sort: PatchSort;
} {
  const sort = searchParams.get("sort");
  return {
    filters: {
      ...(searchParams.get("category")
        ? { category: searchParams.get("category")! }
        : {}),
    },
    sort:
      sort === "title" ? "title" : sort === "version" ? "version" : "updated",
  };
}

/** 返回新数组并应用稳定排序，避免调用方意外改变共享构建数据。 */
export function sortPatches(
  articles: readonly PatchArticle[],
  sort: PatchSort = "updated",
): PatchArticle[] {
  return [...articles].sort((left, right) => {
    if (sort === "title") return left.title.localeCompare(right.title);
    if (sort === "version") {
      return (
        right.patchVersion.localeCompare(left.patchVersion) ||
        left.title.localeCompare(right.title)
      );
    }
    return (
      right.updatedAt.localeCompare(left.updatedAt) ||
      left.title.localeCompare(right.title)
    );
  });
}

export class PatchService {
  readonly #repository: PatchRepository;

  /** 接收抽象仓储，使未来数据库接入不改变页面业务服务。 */
  constructor(repository: PatchRepository) {
    this.#repository = repository;
  }

  /** 读取同语言公开内容并使用共享筛选器返回确定顺序。 */
  async list(
    locale: ContentLocale,
    filters: PatchFilters = {},
    sort: PatchSort = "updated",
  ): Promise<readonly PatchArticle[]> {
    return sortPatches(
      filterPatches(await this.#repository.getPublished(locale), filters),
      sort,
    );
  }

  /** 通过统一发布边界读取详情，页面不得绕过服务直接访问源数据。 */
  async findPublished(
    locale: ContentLocale,
    slug: string,
  ): Promise<PatchArticle | undefined> {
    return this.#repository.getBySlug(locale, slug);
  }
}

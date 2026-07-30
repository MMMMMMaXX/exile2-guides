/** 文件职责：集中实现 Item 查询、筛选和排序业务规则，确保页面与未来 API 使用一致结果。 */
import type { ContentLocale } from "../content/constants";
import type { ItemRepository } from "./repository";
import type { ItemArticle, ItemRarity } from "./schema";

export type ItemFilters = {
  category?: string;
  rarity?: ItemRarity;
  useCase?: string;
};

export type ItemSort = "title" | "updated";

/** 对已发布 Item 执行交集筛选；空字段不参与判断。 */
export function filterItems(
  articles: readonly ItemArticle[],
  filters: ItemFilters,
): ItemArticle[] {
  return articles.filter(
    (article) =>
      (!filters.category || article.itemCategory === filters.category) &&
      (!filters.rarity || article.rarity === filters.rarity) &&
      (!filters.useCase || article.useCases.includes(filters.useCase)),
  );
}

const validRarities = new Set<ItemRarity>([
  "normal",
  "magic",
  "rare",
  "unique",
]);

/** 从公开查询参数读取受控筛选，未知枚举值被忽略而不会污染业务状态。 */
export function parseItemQuery(searchParams: URLSearchParams): {
  filters: ItemFilters;
  sort: ItemSort;
} {
  const rarity = searchParams.get("rarity") as ItemRarity | null;
  const sort = searchParams.get("sort");
  return {
    filters: {
      ...(searchParams.get("category")
        ? { category: searchParams.get("category")! }
        : {}),
      ...(rarity && validRarities.has(rarity) ? { rarity } : {}),
      ...(searchParams.get("useCase")
        ? { useCase: searchParams.get("useCase")! }
        : {}),
    },
    sort: sort === "title" ? "title" : "updated",
  };
}

/** 返回新数组并应用稳定排序，避免调用方意外改变共享构建数据。 */
export function sortItems(
  articles: readonly ItemArticle[],
  sort: ItemSort = "updated",
): ItemArticle[] {
  return [...articles].sort((left, right) =>
    sort === "title"
      ? left.title.localeCompare(right.title)
      : right.updatedAt.localeCompare(left.updatedAt) ||
        left.title.localeCompare(right.title),
  );
}

export class ItemService {
  readonly #repository: ItemRepository;

  /** 接收抽象仓储，使未来数据库接入不改变页面业务服务。 */
  constructor(repository: ItemRepository) {
    this.#repository = repository;
  }

  /** 读取同语言公开内容并使用共享筛选器返回确定顺序。 */
  async list(
    locale: ContentLocale,
    filters: ItemFilters = {},
    sort: ItemSort = "updated",
  ): Promise<readonly ItemArticle[]> {
    return sortItems(
      filterItems(await this.#repository.getPublished(locale), filters),
      sort,
    );
  }

  /** 通过统一发布边界读取详情，页面不得绕过服务直接访问源数据。 */
  async findPublished(
    locale: ContentLocale,
    slug: string,
  ): Promise<ItemArticle | undefined> {
    return this.#repository.getBySlug(locale, slug);
  }
}

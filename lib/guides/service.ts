/** 文件职责：集中实现 Guide 查询、筛选和排序业务规则，确保页面与未来 API 使用一致结果。 */
import type { ContentLocale } from "../content/constants";
import type { GuideRepository } from "./repository";
import type { GuideArticle } from "./schema";

export type GuideFilters = {
  category?: string;
};

export type GuideSort = "title" | "updated" | "reading-time";

/** 对已发布 Guide 执行交集筛选；空字段不参与判断。 */
export function filterGuides(
  articles: readonly GuideArticle[],
  filters: GuideFilters,
): GuideArticle[] {
  return articles.filter(
    (article) =>
      !filters.category || article.guideCategory === filters.category,
  );
}

/** 从公开查询参数读取受控筛选，未知枚举值被忽略而不会污染业务状态。 */
export function parseGuideQuery(searchParams: URLSearchParams): {
  filters: GuideFilters;
  sort: GuideSort;
} {
  const sort = searchParams.get("sort");
  return {
    filters: {
      ...(searchParams.get("category")
        ? { category: searchParams.get("category")! }
        : {}),
    },
    sort:
      sort === "title"
        ? "title"
        : sort === "reading-time"
          ? "reading-time"
          : "updated",
  };
}

/** 返回新数组并应用稳定排序，避免调用方意外改变共享构建数据。 */
export function sortGuides(
  articles: readonly GuideArticle[],
  sort: GuideSort = "updated",
): GuideArticle[] {
  return [...articles].sort((left, right) => {
    if (sort === "title") return left.title.localeCompare(right.title);
    if (sort === "reading-time") {
      const leftMinutes = left.estimatedReadingMinutes ?? 999;
      const rightMinutes = right.estimatedReadingMinutes ?? 999;
      return (
        leftMinutes - rightMinutes || left.title.localeCompare(right.title)
      );
    }
    return (
      right.updatedAt.localeCompare(left.updatedAt) ||
      left.title.localeCompare(right.title)
    );
  });
}

export class GuideService {
  readonly #repository: GuideRepository;

  /** 接收抽象仓储，使未来数据库接入不改变页面业务服务。 */
  constructor(repository: GuideRepository) {
    this.#repository = repository;
  }

  /** 读取同语言公开内容并使用共享筛选器返回确定顺序。 */
  async list(
    locale: ContentLocale,
    filters: GuideFilters = {},
    sort: GuideSort = "updated",
  ): Promise<readonly GuideArticle[]> {
    return sortGuides(
      filterGuides(await this.#repository.getPublished(locale), filters),
      sort,
    );
  }

  /** 通过统一发布边界读取详情，页面不得绕过服务直接访问源数据。 */
  async findPublished(
    locale: ContentLocale,
    slug: string,
  ): Promise<GuideArticle | undefined> {
    return this.#repository.getBySlug(locale, slug);
  }
}

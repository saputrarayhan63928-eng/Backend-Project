import { CategoryRepository } from "../repositories/category.repository";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  static async getAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: "title" | "publishedYear";
    sortOrder?: "asc" | "desc";
  }) {
    const safePage = Math.max(1, params.page || 1);
    const safeLimit = Math.max(1, params.limit || 10);
    const normalizedSearch = params.search?.trim();
    const safeSortBy = params.sortBy === "publishedYear" ? "publishedYear" : "title";
    const safeSortOrder = params.sortOrder === "desc" ? "desc" : "asc";

    const queryOptions: {
      page: number;
      limit: number;
      search?: string;
      sortBy: "title" | "publishedYear";
      sortOrder: "asc" | "desc";
    } = {
      page: safePage,
      limit: safeLimit,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    };
    if (normalizedSearch) queryOptions.search = normalizedSearch;

    const [products, total] = await Promise.all([
      ProductRepository.findMany(queryOptions),
      ProductRepository.countAll(normalizedSearch),
    ]);

    return {
      products,
      total,
      page: safePage,
      limit: safeLimit,
      search: normalizedSearch || null,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    };
  }

  static async getById(id: string) {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error("Product not found");

    return product;
  }

  static async create(data: {
    name: string;
    author?: string;
    publishedYear?: number;
    coverImageUrl?: string;
    description?: string;
    price: number;
    stock: number;
    categoryId?: string;
  }) {
    if (data.price <= 0) throw new Error("Harga harus lebih dari 0");
    if (data.stock < 0) throw new Error("Stock harus 0 atau lebih");

    if (
      typeof data.publishedYear === "number" &&
      (data.publishedYear < 1000 || data.publishedYear > 9999)
    ) {
      throw new Error("publishedYear harus 4 digit tahun yang valid");
    }

    if (data.categoryId) {
      const category = await CategoryRepository.findActiveById(data.categoryId);
      if (!category) throw new Error("Category not found");
    }

    const payload: {
      name: string;
      author?: string;
      publishedYear?: number;
      coverImageUrl?: string;
      price: number;
      stock: number;
      description?: string;
      categoryId?: string;
    } = {
      name: data.name.trim(),
      price: data.price,
      stock: data.stock,
    };

    if (typeof data.description === "string") {
      payload.description = data.description.trim();
    }
    if (typeof data.author === "string") payload.author = data.author.trim();
    if (typeof data.publishedYear === "number") {
      payload.publishedYear = data.publishedYear;
    }
    if (typeof data.coverImageUrl === "string") {
      payload.coverImageUrl = data.coverImageUrl;
    }

    if (data.categoryId) {
      payload.categoryId = data.categoryId;
    }

    return ProductRepository.create(payload);
  }

  static async update(
    id: string,
    data: {
      name?: string;
      author?: string;
      publishedYear?: number;
      coverImageUrl?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: string;
    },
  ) {
    const product = await ProductRepository.findActiveById(id);
    if (!product) throw new Error("Product not found");

    if (typeof data.price === "number" && data.price <= 0) {
      throw new Error("Harga harus lebih dari 0");
    }

    if (typeof data.stock === "number" && data.stock < 0) {
      throw new Error("Stock harus 0 atau lebih");
    }
    if (
      typeof data.publishedYear === "number" &&
      (data.publishedYear < 1000 || data.publishedYear > 9999)
    ) {
      throw new Error("publishedYear harus 4 digit tahun yang valid");
    }

    if (data.categoryId) {
      const category = await CategoryRepository.findActiveById(data.categoryId);
      if (!category) throw new Error("Category not found");
    }

    const payload: {
      name?: string;
      author?: string;
      publishedYear?: number;
      coverImageUrl?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: string;
    } = {};

    if (typeof data.name === "string") payload.name = data.name.trim();
    if (typeof data.author === "string") payload.author = data.author.trim();
    if (typeof data.publishedYear === "number") {
      payload.publishedYear = data.publishedYear;
    }
    if (typeof data.coverImageUrl === "string") {
      payload.coverImageUrl = data.coverImageUrl;
    }
    if (typeof data.description === "string") {
      payload.description = data.description.trim();
    }
    if (typeof data.price === "number") payload.price = data.price;
    if (typeof data.stock === "number") payload.stock = data.stock;
    if (typeof data.categoryId === "string") payload.categoryId = data.categoryId;

    return ProductRepository.update(id, payload);
  }

  static async delete(id: string) {
    const product = await ProductRepository.findActiveById(id);
    if (!product) throw new Error("Product not found");

    return ProductRepository.softDelete(id);
  }

  static async search(keyword: string, page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const normalizedKeyword = keyword?.trim();

    if (!normalizedKeyword) throw new Error("Keyword pencarian wajib diisi");

    const [products, total] = await Promise.all([
      ProductRepository.search(normalizedKeyword, safePage, safeLimit),
      ProductRepository.countSearch(normalizedKeyword),
    ]);

    return { products, total, page: safePage, limit: safeLimit };
  }
}

import { CategoryRepository } from "../repositories/category.repository";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  static async getAll(page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const [products, total] = await Promise.all([
      ProductRepository.findMany(safePage, safeLimit),
      ProductRepository.countAll(),
    ]);

    return { products, total, page: safePage, limit: safeLimit };
  }

  static async getById(id: string) {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error("Product not found");

    return product;
  }

  static async create(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId?: string;
  }) {
    if (data.price <= 0) throw new Error("Harga harus lebih dari 0");
    if (data.stock < 0) throw new Error("Stock harus 0 atau lebih");

    if (data.categoryId) {
      const category = await CategoryRepository.findActiveById(data.categoryId);
      if (!category) throw new Error("Category not found");
    }

    const payload: {
      name: string;
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

    if (data.categoryId) {
      payload.categoryId = data.categoryId;
    }

    return ProductRepository.create(payload);
  }

  static async update(
    id: string,
    data: {
      name?: string;
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

    if (data.categoryId) {
      const category = await CategoryRepository.findActiveById(data.categoryId);
      if (!category) throw new Error("Category not found");
    }

    const payload: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: string;
    } = {};

    if (typeof data.name === "string") payload.name = data.name.trim();
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

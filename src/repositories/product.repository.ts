import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";

type CreateProductInput = {
  name: string;
  author?: string;
  publishedYear?: number;
  coverImageUrl?: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: string;
};

type UpdateProductInput = {
  name?: string;
  author?: string;
  publishedYear?: number;
  coverImageUrl?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
};

type ProductQueryOptions = {
  page: number;
  limit: number;
  search?: string;
  categories?: string[];
  inStock?: boolean;
  startYear?: number;
  endYear?: number;
  sortBy?: "title" | "publishedYear";
  sortOrder?: "asc" | "desc";
};

const buildProductWhere = (options: {
  search?: string;
  categories?: string[];
  inStock?: boolean;
  startYear?: number;
  endYear?: number;
}) => {
  const andFilters: Prisma.ProductWhereInput[] = [];

  if (options.search) {
    andFilters.push({
      OR: [
        { name: { contains: options.search, mode: "insensitive" } },
        { author: { contains: options.search, mode: "insensitive" } },
      ],
    });
  }

  if (options.categories && options.categories.length > 0) {
    andFilters.push({
      OR: options.categories.map((categoryName) => ({
        category: {
          name: {
            equals: categoryName,
            mode: "insensitive",
          },
        },
      })),
    });
  }

  if (typeof options.inStock === "boolean") {
    andFilters.push(options.inStock ? { stock: { gt: 0 } } : { stock: 0 });
  }

  if (typeof options.startYear === "number" || typeof options.endYear === "number") {
    andFilters.push({
      publishedYear: {
        ...(typeof options.startYear === "number" ? { gte: options.startYear } : {}),
        ...(typeof options.endYear === "number" ? { lte: options.endYear } : {}),
      },
    });
  }

  return {
    deletedAt: null,
    ...(andFilters.length > 0 ? { AND: andFilters } : {}),
  };
};

export class ProductRepository {
  static findMany(options: ProductQueryOptions) {
    const skip = (options.page - 1) * options.limit;
    const where = buildProductWhere(options);

    const orderBy =
      options.sortBy === "publishedYear"
        ? { publishedYear: options.sortOrder || "desc" }
        : { name: options.sortOrder || "asc" };

    return prisma.product.findMany({
      where,
      include: { category: true },
      skip,
      take: options.limit,
      orderBy,
    });
  }

  static countAll(options: {
    search?: string;
    categories?: string[];
    inStock?: boolean;
    startYear?: number;
    endYear?: number;
  }) {
    return prisma.product.count({
      where: buildProductWhere(options),
    });
  }

  static countAvailableTitles() {
    return prisma.product.count({
      where: {
        deletedAt: null,
        stock: { gt: 0 },
      },
    });
  }

  static findById(id: string) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
  }

  static findActiveById(id: string) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static findActiveByIds(ids: string[], db: Prisma.TransactionClient | typeof prisma = prisma) {
    return db.product.findMany({
      where: {
        id: { in: ids },
        deletedAt: null,
      },
    });
  }

  static decreaseStock(
    id: string,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    return db.product.updateMany({
      where: {
        id,
        deletedAt: null,
        stock: { gte: quantity },
      },
      data: {
        stock: { decrement: quantity },
      },
    });
  }

  static increaseStock(
    id: string,
    quantity: number,
    db: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    return db.product.updateMany({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        stock: { increment: quantity },
      },
    });
  }

  static create(data: CreateProductInput) {
    return prisma.product.create({
      data,
      include: { category: true },
    });
  }

  static update(id: string, data: UpdateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  static softDelete(id: string) {
    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static search(keyword: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.product.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { author: { contains: keyword, mode: "insensitive" } },
        ],
      },
      include: { category: true },
      skip,
      take: limit,
      orderBy: { name: "asc" },
    });
  }

  static countSearch(keyword: string) {
    return prisma.product.count({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { author: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
  }
}

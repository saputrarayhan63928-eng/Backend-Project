import { prisma } from "../lib/prisma";

type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: string;
};

type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
};

export class ProductRepository {
  static findMany(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.product.findMany({
      where: { deletedAt: null },
      include: { category: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countAll() {
    return prisma.product.count({ where: { deletedAt: null } });
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
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      },
      include: { category: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countSearch(keyword: string) {
    return prisma.product.count({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
  }
}

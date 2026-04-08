import { prisma } from "../lib/prisma";

type CreateCategoryInput = {
  name: string;
};

type UpdateCategoryInput = {
  name?: string;
};

export class CategoryRepository {
  static findMany(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.category.findMany({
      where: { deletedAt: null },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countAll() {
    return prisma.category.count({ where: { deletedAt: null } });
  }

  static findById(id: string) {
    return prisma.category.findFirst({
      where: { id, deletedAt: null },
      include: { products: { where: { deletedAt: null } } },
    });
  }

  static findActiveById(id: string) {
    return prisma.category.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  }

  static update(id: string, data: UpdateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static softDelete(id: string) {
    return prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static search(keyword: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.category.findMany({
      where: {
        deletedAt: null,
        name: { contains: keyword, mode: "insensitive" },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countSearch(keyword: string) {
    return prisma.category.count({
      where: {
        deletedAt: null,
        name: { contains: keyword, mode: "insensitive" },
      },
    });
  }
}

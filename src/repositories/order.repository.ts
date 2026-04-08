import { prisma } from "../lib/prisma";

type CreateOrderInput = {
  total: number;
  status?: string;
  userId: string;
};

type UpdateOrderInput = {
  total?: number;
  status?: string;
  userId?: string;
};

export class OrderRepository {
  static findMany(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.order.findMany({
      where: { deletedAt: null },
      include: { user: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countAll() {
    return prisma.order.count({ where: { deletedAt: null } });
  }

  static findById(id: string) {
    return prisma.order.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });
  }

  static findActiveById(id: string) {
    return prisma.order.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static create(data: CreateOrderInput) {
    return prisma.order.create({
      data,
      include: { user: true },
    });
  }

  static update(id: string, data: UpdateOrderInput) {
    return prisma.order.update({
      where: { id },
      data,
      include: { user: true },
    });
  }

  static softDelete(id: string) {
    return prisma.order.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static search(keyword: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.order.findMany({
      where: {
        deletedAt: null,
        OR: [
          { status: { contains: keyword, mode: "insensitive" } },
          { user: { name: { contains: keyword, mode: "insensitive" } } },
        ],
      },
      include: { user: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countSearch(keyword: string) {
    return prisma.order.count({
      where: {
        deletedAt: null,
        OR: [
          { status: { contains: keyword, mode: "insensitive" } },
          { user: { name: { contains: keyword, mode: "insensitive" } } },
        ],
      },
    });
  }
}

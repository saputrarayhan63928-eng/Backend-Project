import { prisma } from "../lib/prisma";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserInput = {
  name?: string;
  email?: string;
  password?: string;
};

export class UserRepository {
  static findMany(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.user.findMany({
      where: { deletedAt: null },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countAll() {
    return prisma.user.count({ where: { deletedAt: null } });
  }

  static findById(id: string) {
    return prisma.user.findFirst({
      where: { id, deletedAt: null },
      include: { orders: { where: { deletedAt: null } } },
    });
  }

  static findActiveById(id: string) {
    return prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  static create(data: CreateUserInput) {
    return prisma.user.create({ data });
  }

  static update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static search(keyword: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.user.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { email: { contains: keyword, mode: "insensitive" } },
        ],
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countSearch(keyword: string) {
    return prisma.user.count({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { email: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
  }
}

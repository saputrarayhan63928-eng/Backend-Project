import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

type CreateBorrowRecordInput = {
  userId: string;
  dueDate?: Date;
  notes?: string;
};

type CreateBorrowItemInput = {
  productId: string;
  quantity: number;
};

type BorrowRecordFilters = {
  status?: "BORROWED" | "RETURNED";
  startDate?: Date;
  endDate?: Date;
  memberName?: string;
};

const buildBorrowRecordWhere = (filters: BorrowRecordFilters = {}): Prisma.BorrowRecordWhereInput => {
  const andFilters: Prisma.BorrowRecordWhereInput[] = [];

  if (filters.status) {
    andFilters.push({ status: filters.status });
  }

  if (filters.startDate || filters.endDate) {
    andFilters.push({
      createdAt: {
        ...(filters.startDate ? { gte: filters.startDate } : {}),
        ...(filters.endDate ? { lte: filters.endDate } : {}),
      },
    });
  }

  if (filters.memberName) {
    andFilters.push({
      user: {
        name: {
          contains: filters.memberName,
          mode: "insensitive",
        },
      },
    });
  }

  return {
    deletedAt: null,
    ...(andFilters.length > 0 ? { AND: andFilters } : {}),
  };
};

export class BorrowRepository {
  static findMany(page: number, limit: number, filters: BorrowRecordFilters = {}) {
    const skip = (page - 1) * limit;
    return prisma.borrowRecord.findMany({
      where: buildBorrowRecordWhere(filters),
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countAll(filters: BorrowRecordFilters = {}) {
    return prisma.borrowRecord.count({ where: buildBorrowRecordWhere(filters) });
  }

  static findManyByUserId(
    userId: string,
    page: number,
    limit: number,
    filters: Omit<BorrowRecordFilters, "memberName"> = {},
  ) {
    const skip = (page - 1) * limit;
    return prisma.borrowRecord.findMany({
      where: {
        ...buildBorrowRecordWhere(filters),
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  static countByUserId(userId: string, filters: Omit<BorrowRecordFilters, "memberName"> = {}) {
    return prisma.borrowRecord.count({
      where: {
        ...buildBorrowRecordWhere(filters),
        userId,
      },
    });
  }

  static findById(id: string) {
    return prisma.borrowRecord.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    });
  }

  static findByIdForUpdate(
    id: string,
    db: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    return db.borrowRecord.findFirst({
      where: { id, deletedAt: null },
      include: { items: true },
    });
  }

  static createBorrowRecord(
    data: CreateBorrowRecordInput,
    db: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    return db.borrowRecord.create({
      data,
    });
  }

  static createBorrowItems(
    borrowRecordId: string,
    items: CreateBorrowItemInput[],
    db: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    return db.borrowItem.createMany({
      data: items.map((item) => ({
        borrowRecordId,
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  }

  static markAsReturned(
    id: string,
    db: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    return db.borrowRecord.update({
      where: { id },
      data: {
        status: "RETURNED",
        returnedAt: new Date(),
      },
    });
  }

  static countActiveTransactions() {
    return prisma.borrowRecord.count({
      where: {
        deletedAt: null,
        status: "BORROWED",
      },
    });
  }

  static async findMostPopularBook() {
    const topBorrowed = await prisma.borrowItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 1,
    });

    const topItem = topBorrowed[0];
    if (!topItem) return null;

    const product = await prisma.product.findFirst({
      where: {
        id: topItem.productId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        author: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      totalBorrowed: topItem._sum.quantity || 0,
    };
  }
}

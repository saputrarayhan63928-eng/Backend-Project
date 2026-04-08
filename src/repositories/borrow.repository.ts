import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

type CreateBorrowRecordInput = {
  userId: string;
  dueDate?: Date;
  notes?: string;
};

type CreateBorrowItemInput = {
  productId: string;
  quantity: number;
};

export class BorrowRepository {
  static findMany(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.borrowRecord.findMany({
      where: { deletedAt: null },
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

  static countAll() {
    return prisma.borrowRecord.count({ where: { deletedAt: null } });
  }

  static findManyByUserId(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return prisma.borrowRecord.findMany({
      where: { deletedAt: null, userId },
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

  static countByUserId(userId: string) {
    return prisma.borrowRecord.count({ where: { deletedAt: null, userId } });
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
}

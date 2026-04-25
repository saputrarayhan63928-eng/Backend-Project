import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
const buildBorrowRecordWhere = (filters = {}) => {
    const andFilters = [];
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
    static findMany(page, limit, filters = {}) {
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
    static countAll(filters = {}) {
        return prisma.borrowRecord.count({ where: buildBorrowRecordWhere(filters) });
    }
    static findManyByUserId(userId, page, limit, filters = {}) {
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
    static countByUserId(userId, filters = {}) {
        return prisma.borrowRecord.count({
            where: {
                ...buildBorrowRecordWhere(filters),
                userId,
            },
        });
    }
    static findById(id) {
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
    static findByIdForUpdate(id, db = prisma) {
        return db.borrowRecord.findFirst({
            where: { id, deletedAt: null },
            include: { items: true },
        });
    }
    static createBorrowRecord(data, db = prisma) {
        return db.borrowRecord.create({
            data,
        });
    }
    static createBorrowItems(borrowRecordId, items, db = prisma) {
        return db.borrowItem.createMany({
            data: items.map((item) => ({
                borrowRecordId,
                productId: item.productId,
                quantity: item.quantity,
            })),
        });
    }
    static markAsReturned(id, db = prisma) {
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
        if (!topItem)
            return null;
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
        if (!product)
            return null;
        return {
            ...product,
            totalBorrowed: topItem._sum.quantity || 0,
        };
    }
}
//# sourceMappingURL=borrow.repository.js.map
import { prisma } from "../lib/prisma.js";
export class OrderRepository {
    static findMany(page, limit) {
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
    static findManyByUserId(userId, page, limit) {
        const skip = (page - 1) * limit;
        return prisma.order.findMany({
            where: { deletedAt: null, userId },
            include: { user: true },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        });
    }
    static countByUserId(userId) {
        return prisma.order.count({ where: { deletedAt: null, userId } });
    }
    static findById(id) {
        return prisma.order.findFirst({
            where: { id, deletedAt: null },
            include: { user: true },
        });
    }
    static findActiveById(id) {
        return prisma.order.findFirst({
            where: { id, deletedAt: null },
        });
    }
    static create(data) {
        return prisma.order.create({
            data,
            include: { user: true },
        });
    }
    static update(id, data) {
        return prisma.order.update({
            where: { id },
            data,
            include: { user: true },
        });
    }
    static softDelete(id) {
        return prisma.order.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    static search(keyword, page, limit) {
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
    static countSearch(keyword) {
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
    static searchByUserId(userId, keyword, page, limit) {
        const skip = (page - 1) * limit;
        return prisma.order.findMany({
            where: {
                deletedAt: null,
                userId,
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
    static countSearchByUserId(userId, keyword) {
        return prisma.order.count({
            where: {
                deletedAt: null,
                userId,
                OR: [
                    { status: { contains: keyword, mode: "insensitive" } },
                    { user: { name: { contains: keyword, mode: "insensitive" } } },
                ],
            },
        });
    }
}
//# sourceMappingURL=order.repository.js.map
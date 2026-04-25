import { prisma } from "../lib/prisma.js";
export class UserRepository {
    static findMany(page, limit) {
        const skip = (page - 1) * limit;
        return prisma.user.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        });
    }
    static countAll() {
        return prisma.user.count({ where: { deletedAt: null } });
    }
    static findById(id) {
        return prisma.user.findFirst({
            where: { id, deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                orders: { where: { deletedAt: null } },
            },
        });
    }
    static findActiveById(id) {
        return prisma.user.findFirst({
            where: { id, deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }
    static findByEmail(email) {
        return prisma.user.findFirst({
            where: { email, deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }
    static findByEmailWithPassword(email) {
        return prisma.user.findFirst({
            where: { email, deletedAt: null },
        });
    }
    static create(data) {
        return prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }
    static update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }
    static softDelete(id) {
        return prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    static search(keyword, page, limit) {
        const skip = (page - 1) * limit;
        return prisma.user.findMany({
            where: {
                deletedAt: null,
                OR: [
                    { name: { contains: keyword, mode: "insensitive" } },
                    { email: { contains: keyword, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        });
    }
    static countSearch(keyword) {
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
//# sourceMappingURL=user.repository.js.map
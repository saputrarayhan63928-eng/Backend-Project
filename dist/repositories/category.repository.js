import { prisma } from "../lib/prisma.js";
export class CategoryRepository {
    static findMany(page, limit) {
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
    static findById(id) {
        return prisma.category.findFirst({
            where: { id, deletedAt: null },
            include: { products: { where: { deletedAt: null } } },
        });
    }
    static findActiveById(id) {
        return prisma.category.findFirst({
            where: { id, deletedAt: null },
        });
    }
    static create(data) {
        return prisma.category.create({ data });
    }
    static update(id, data) {
        return prisma.category.update({
            where: { id },
            data,
        });
    }
    static softDelete(id) {
        return prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    static search(keyword, page, limit) {
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
    static countSearch(keyword) {
        return prisma.category.count({
            where: {
                deletedAt: null,
                name: { contains: keyword, mode: "insensitive" },
            },
        });
    }
}
//# sourceMappingURL=category.repository.js.map
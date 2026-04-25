import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";
const buildProductWhere = (options) => {
    const andFilters = [];
    if (options.search) {
        andFilters.push({
            OR: [
                { name: { contains: options.search, mode: "insensitive" } },
                { author: { contains: options.search, mode: "insensitive" } },
            ],
        });
    }
    if (options.categories && options.categories.length > 0) {
        andFilters.push({
            OR: options.categories.map((categoryName) => ({
                category: {
                    name: {
                        equals: categoryName,
                        mode: "insensitive",
                    },
                },
            })),
        });
    }
    if (typeof options.inStock === "boolean") {
        andFilters.push(options.inStock ? { stock: { gt: 0 } } : { stock: 0 });
    }
    if (typeof options.startYear === "number" || typeof options.endYear === "number") {
        andFilters.push({
            publishedYear: {
                ...(typeof options.startYear === "number" ? { gte: options.startYear } : {}),
                ...(typeof options.endYear === "number" ? { lte: options.endYear } : {}),
            },
        });
    }
    return {
        deletedAt: null,
        ...(andFilters.length > 0 ? { AND: andFilters } : {}),
    };
};
export class ProductRepository {
    static findMany(options) {
        const skip = (options.page - 1) * options.limit;
        const where = buildProductWhere(options);
        const orderBy = options.sortBy === "publishedYear"
            ? { publishedYear: options.sortOrder || "desc" }
            : { name: options.sortOrder || "asc" };
        return prisma.product.findMany({
            where,
            include: { category: true },
            skip,
            take: options.limit,
            orderBy,
        });
    }
    static countAll(options) {
        return prisma.product.count({
            where: buildProductWhere(options),
        });
    }
    static countAvailableTitles() {
        return prisma.product.count({
            where: {
                deletedAt: null,
                stock: { gt: 0 },
            },
        });
    }
    static findById(id) {
        return prisma.product.findFirst({
            where: { id, deletedAt: null },
            include: { category: true },
        });
    }
    static findActiveById(id) {
        return prisma.product.findFirst({
            where: { id, deletedAt: null },
        });
    }
    static findActiveByIds(ids, db = prisma) {
        return db.product.findMany({
            where: {
                id: { in: ids },
                deletedAt: null,
            },
        });
    }
    static decreaseStock(id, quantity, db = prisma) {
        return db.product.updateMany({
            where: {
                id,
                deletedAt: null,
                stock: { gte: quantity },
            },
            data: {
                stock: { decrement: quantity },
            },
        });
    }
    static increaseStock(id, quantity, db = prisma) {
        return db.product.updateMany({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                stock: { increment: quantity },
            },
        });
    }
    static create(data) {
        return prisma.product.create({
            data,
            include: { category: true },
        });
    }
    static update(id, data) {
        return prisma.product.update({
            where: { id },
            data,
            include: { category: true },
        });
    }
    static softDelete(id) {
        return prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    static search(keyword, page, limit) {
        const skip = (page - 1) * limit;
        return prisma.product.findMany({
            where: {
                deletedAt: null,
                OR: [
                    { name: { contains: keyword, mode: "insensitive" } },
                    { author: { contains: keyword, mode: "insensitive" } },
                ],
            },
            include: { category: true },
            skip,
            take: limit,
            orderBy: { name: "asc" },
        });
    }
    static countSearch(keyword) {
        return prisma.product.count({
            where: {
                deletedAt: null,
                OR: [
                    { name: { contains: keyword, mode: "insensitive" } },
                    { author: { contains: keyword, mode: "insensitive" } },
                ],
            },
        });
    }
}
//# sourceMappingURL=product.repository.js.map
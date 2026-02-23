import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
    static async getAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [categories, total] = await Promise.all([
            prisma.category.findMany({
                where: { deletedAt: null },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.category.count({ where: { deletedAt: null } })
        ]);
        return { categories, total, page, limit };
    }

    static async getById(id: string) {
        const category = await prisma.category.findUnique({
            where: { id, deletedAt: null },
            include: { products: { where: { deletedAt: null } } }
        });
        if (!category) throw new Error('Category not found');
        return category;
    }

    static async create(data: { name: string }) {
        return await prisma.category.create({ data });
    }

    static async update(id: string, data: { name?: string }) {
        const category = await prisma.category.findUnique({ where: { id, deletedAt: null } });
        if (!category) throw new Error('Category not found');
        return await prisma.category.update({ where: { id }, data });
    }

    static async delete(id: string) {
        const category = await prisma.category.findUnique({ where: { id, deletedAt: null } });
        if (!category) throw new Error('Category not found');
        return await prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    static async search(keyword: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [categories, total] = await Promise.all([
            prisma.category.findMany({
                where: {
                    deletedAt: null,
                    name: { contains: keyword, mode: 'insensitive' }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.category.count({
                where: {
                    deletedAt: null,
                    name: { contains: keyword, mode: 'insensitive' }
                }
            })
        ]);
        return { categories, total, page, limit };
    }
}
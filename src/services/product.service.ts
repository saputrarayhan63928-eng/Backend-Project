import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
    static async getAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where: { deletedAt: null },
                include: { category: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.product.count({ where: { deletedAt: null } })
        ]);
        return { products, total, page, limit };
    }

    static async getById(id: string) {
        const product = await prisma.product.findUnique({
            where: { id, deletedAt: null },
            include: { category: true }
        });
        if (!product) throw new Error('Product not found');
        return product;
    }

    static async create(data: { name: string; description?: string; price: number; stock: number; categoryId?: string }) {
        return await prisma.product.create({ data, include: { category: true } });
    }

    static async update(id: string, data: { name?: string; description?: string; price?: number; stock?: number; categoryId?: string }) {
        const product = await prisma.product.findUnique({ where: { id, deletedAt: null } });
        if (!product) throw new Error('Product not found');
        return await prisma.product.update({ where: { id }, data, include: { category: true } });
    }

    static async delete(id: string) {
        const product = await prisma.product.findUnique({ where: { id, deletedAt: null } });
        if (!product) throw new Error('Product not found');
        return await prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    static async search(keyword: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where: {
                    deletedAt: null,
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { description: { contains: keyword, mode: 'insensitive' } }
                    ]
                },
                include: { category: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.product.count({
                where: {
                    deletedAt: null,
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { description: { contains: keyword, mode: 'insensitive' } }
                    ]
                }
            })
        ]);
        return { products, total, page, limit };
    }
}
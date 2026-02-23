import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderService {
    static async getAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: { deletedAt: null },
                include: { user: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.order.count({ where: { deletedAt: null } })
        ]);
        return { orders, total, page, limit };
    }

    static async getById(id: string) {
        const order = await prisma.order.findUnique({
            where: { id, deletedAt: null },
            include: { user: true }
        });
        if (!order) throw new Error('Order not found');
        return order;
    }

    static async create(data: { total: number; status?: string; userId: string }) {
        return await prisma.order.create({ data, include: { user: true } });
    }

    static async update(id: string, data: { total?: number; status?: string; userId?: string }) {
        const order = await prisma.order.findUnique({ where: { id, deletedAt: null } });
        if (!order) throw new Error('Order not found');
        return await prisma.order.update({ where: { id }, data, include: { user: true } });
    }

    static async delete(id: string) {
        const order = await prisma.order.findUnique({ where: { id, deletedAt: null } });
        if (!order) throw new Error('Order not found');
        return await prisma.order.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    static async search(keyword: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: {
                    deletedAt: null,
                    OR: [
                        { status: { contains: keyword, mode: 'insensitive' } },
                        { user: { name: { contains: keyword, mode: 'insensitive' } } }
                    ]
                },
                include: { user: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.order.count({
                where: {
                    deletedAt: null,
                    OR: [
                        { status: { contains: keyword, mode: 'insensitive' } },
                        { user: { name: { contains: keyword, mode: 'insensitive' } } }
                    ]
                }
            })
        ]);
        return { orders, total, page, limit };
    }
}
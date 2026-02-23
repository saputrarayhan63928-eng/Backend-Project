import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
    static async getAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where: { deletedAt: null },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where: { deletedAt: null } })
        ]);
        return { users, total, page, limit };
    }

    static async getById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id, deletedAt: null },
            include: { orders: { where: { deletedAt: null } } }
        });
        if (!user) throw new Error('User not found');
        return user;
    }

    static async create(data: { name: string; email: string; password: string }) {
        return await prisma.user.create({ data });
    }

    static async update(id: string, data: { name?: string; email?: string; password?: string }) {
        const user = await prisma.user.findUnique({ where: { id, deletedAt: null } });
        if (!user) throw new Error('User not found');
        return await prisma.user.update({ where: { id }, data });
    }

    static async delete(id: string) {
        const user = await prisma.user.findUnique({ where: { id, deletedAt: null } });
        if (!user) throw new Error('User not found');
        return await prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    static async search(keyword: string, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where: {
                    deletedAt: null,
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { email: { contains: keyword, mode: 'insensitive' } }
                    ]
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({
                where: {
                    deletedAt: null,
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { email: { contains: keyword, mode: 'insensitive' } }
                    ]
                }
            })
        ]);
        return { users, total, page, limit };
    }
}
type CreateOrderInput = {
    total: number;
    status?: string;
    userId: string;
};
type UpdateOrderInput = {
    total?: number;
    status?: string;
    userId?: string;
};
export declare class OrderRepository {
    static findMany(page: number, limit: number): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    })[]>;
    static countAll(): import("@prisma/client").Prisma.PrismaPromise<number>;
    static findManyByUserId(userId: string, page: number, limit: number): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    })[]>;
    static countByUserId(userId: string): import("@prisma/client").Prisma.PrismaPromise<number>;
    static findById(id: string): import("@prisma/client").Prisma.Prisma__OrderClient<({
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findActiveById(id: string): import("@prisma/client").Prisma.Prisma__OrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static create(data: CreateOrderInput): import("@prisma/client").Prisma.Prisma__OrderClient<{
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static update(id: string, data: UpdateOrderInput): import("@prisma/client").Prisma.Prisma__OrderClient<{
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static softDelete(id: string): import("@prisma/client").Prisma.Prisma__OrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static search(keyword: string, page: number, limit: number): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    })[]>;
    static countSearch(keyword: string): import("@prisma/client").Prisma.PrismaPromise<number>;
    static searchByUserId(userId: string, keyword: string, page: number, limit: number): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    })[]>;
    static countSearchByUserId(userId: string, keyword: string): import("@prisma/client").Prisma.PrismaPromise<number>;
}
export {};
//# sourceMappingURL=order.repository.d.ts.map
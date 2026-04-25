type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    role?: "ADMIN" | "MEMBER";
};
type UpdateUserInput = {
    name?: string;
    email?: string;
    password?: string;
    role?: "ADMIN" | "MEMBER";
};
export declare class UserRepository {
    static findMany(page: number, limit: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    static countAll(): import("@prisma/client").Prisma.PrismaPromise<number>;
    static findById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            total: import("@prisma/client-runtime-utils").Decimal;
            status: string;
            userId: string;
        }[];
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findActiveById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findByEmailWithPassword(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static create(data: CreateUserInput): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static update(id: string, data: UpdateUserInput): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static softDelete(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static search(keyword: string, page: number, limit: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    static countSearch(keyword: string): import("@prisma/client").Prisma.PrismaPromise<number>;
}
export {};
//# sourceMappingURL=user.repository.d.ts.map
export declare class UserService {
    static getAll(page?: number, limit?: number): Promise<{
        users: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    static getById(id: string): Promise<{
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
    }>;
    static create(data: {
        name: string;
        email: string;
        password: string;
        role?: "ADMIN" | "MEMBER";
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    static update(id: string, data: {
        name?: string;
        email?: string;
        password?: string;
        role?: "ADMIN" | "MEMBER";
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    static delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    static search(keyword: string, page?: number, limit?: number): Promise<{
        users: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map
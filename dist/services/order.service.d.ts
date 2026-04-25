type AuthContext = {
    userId: string;
    role: "ADMIN" | "MEMBER";
};
export declare class OrderService {
    static getAll(page: number | undefined, limit: number | undefined, authUser: AuthContext): Promise<{
        orders: ({
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    static getById(id: string, authUser: AuthContext): Promise<{
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
    }>;
    static create(data: {
        total: number;
        status?: string;
        userId?: string;
    }, authUser: AuthContext): Promise<{
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
    }>;
    static update(id: string, data: {
        total?: number;
        status?: string;
        userId?: string;
    }, authUser: AuthContext): Promise<{
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
    }>;
    static delete(id: string, authUser: AuthContext): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: string;
        userId: string;
    }>;
    static search(keyword: string, page: number | undefined, limit: number | undefined, authUser: AuthContext): Promise<{
        orders: ({
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
export {};
//# sourceMappingURL=order.service.d.ts.map
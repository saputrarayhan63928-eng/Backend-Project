type AuthContext = {
    userId: string;
    role: "ADMIN" | "MEMBER";
};
type BorrowItemInput = {
    productId: string;
    quantity: number;
};
type CreateBorrowInput = {
    userId?: string;
    dueDate?: string;
    notes?: string;
    items: BorrowItemInput[];
};
type BorrowListFilters = {
    startDate?: string;
    endDate?: string;
    status?: string;
    memberName?: string;
};
export declare class BorrowService {
    static getAll(page: number | undefined, limit: number | undefined, authUser: AuthContext, filters?: BorrowListFilters): Promise<{
        records: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            };
            items: ({
                product: {
                    category: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        deletedAt: Date | null;
                    } | null;
                } & {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    publishedYear: number | null;
                    author: string | null;
                    coverImageUrl: string | null;
                    description: string | null;
                    price: import("@prisma/client-runtime-utils").Decimal;
                    stock: number;
                    categoryId: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                borrowRecordId: string;
                productId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            status: import("@prisma/client").$Enums.BorrowStatus;
            userId: string;
            dueDate: Date | null;
            returnedAt: Date | null;
            notes: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        filters: {
            status: "BORROWED" | "RETURNED" | null;
            startDate: string | null;
            endDate: string | null;
            memberName: string | null;
        };
    }>;
    static getById(id: string, authUser: AuthContext): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                } | null;
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                publishedYear: number | null;
                author: string | null;
                coverImageUrl: string | null;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                categoryId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            borrowRecordId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import("@prisma/client").$Enums.BorrowStatus;
        userId: string;
        dueDate: Date | null;
        returnedAt: Date | null;
        notes: string | null;
    }>;
    static create(data: CreateBorrowInput, authUser: AuthContext): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                } | null;
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                publishedYear: number | null;
                author: string | null;
                coverImageUrl: string | null;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                categoryId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            borrowRecordId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import("@prisma/client").$Enums.BorrowStatus;
        userId: string;
        dueDate: Date | null;
        returnedAt: Date | null;
        notes: string | null;
    }>;
    static returnBorrow(id: string, authUser: AuthContext): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                } | null;
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                publishedYear: number | null;
                author: string | null;
                coverImageUrl: string | null;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                categoryId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            borrowRecordId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import("@prisma/client").$Enums.BorrowStatus;
        userId: string;
        dueDate: Date | null;
        returnedAt: Date | null;
        notes: string | null;
    }>;
    static getAdminStats(): Promise<{
        totalAvailableBooks: number;
        activeBorrowTransactions: number;
        mostPopularBook: {
            totalBorrowed: number;
            category: {
                id: string;
                name: string;
            } | null;
            id: string;
            name: string;
            author: string | null;
        } | null;
    }>;
}
export {};
//# sourceMappingURL=borrow.service.d.ts.map
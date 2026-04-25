import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
type CreateBorrowRecordInput = {
    userId: string;
    dueDate?: Date;
    notes?: string;
};
type CreateBorrowItemInput = {
    productId: string;
    quantity: number;
};
type BorrowRecordFilters = {
    status?: "BORROWED" | "RETURNED";
    startDate?: Date;
    endDate?: Date;
    memberName?: string;
};
export declare class BorrowRepository {
    static findMany(page: number, limit: number, filters?: BorrowRecordFilters): Prisma.PrismaPromise<({
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
                price: Prisma.Decimal;
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
    })[]>;
    static countAll(filters?: BorrowRecordFilters): Prisma.PrismaPromise<number>;
    static findManyByUserId(userId: string, page: number, limit: number, filters?: Omit<BorrowRecordFilters, "memberName">): Prisma.PrismaPromise<({
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
                price: Prisma.Decimal;
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
    })[]>;
    static countByUserId(userId: string, filters?: Omit<BorrowRecordFilters, "memberName">): Prisma.PrismaPromise<number>;
    static findById(id: string): Prisma.Prisma__BorrowRecordClient<({
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
                price: Prisma.Decimal;
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findByIdForUpdate(id: string, db?: Prisma.TransactionClient | typeof prisma): Prisma.Prisma__BorrowRecordClient<({
        items: {
            id: string;
            createdAt: Date;
            borrowRecordId: string;
            productId: string;
            quantity: number;
        }[];
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static createBorrowRecord(data: CreateBorrowRecordInput, db?: Prisma.TransactionClient | typeof prisma): Prisma.Prisma__BorrowRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import("@prisma/client").$Enums.BorrowStatus;
        userId: string;
        dueDate: Date | null;
        returnedAt: Date | null;
        notes: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static createBorrowItems(borrowRecordId: string, items: CreateBorrowItemInput[], db?: Prisma.TransactionClient | typeof prisma): Prisma.PrismaPromise<Prisma.BatchPayload>;
    static markAsReturned(id: string, db?: Prisma.TransactionClient | typeof prisma): Prisma.Prisma__BorrowRecordClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import("@prisma/client").$Enums.BorrowStatus;
        userId: string;
        dueDate: Date | null;
        returnedAt: Date | null;
        notes: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static countActiveTransactions(): Prisma.PrismaPromise<number>;
    static findMostPopularBook(): Promise<{
        totalBorrowed: number;
        category: {
            id: string;
            name: string;
        } | null;
        id: string;
        name: string;
        author: string | null;
    } | null>;
}
export {};
//# sourceMappingURL=borrow.repository.d.ts.map
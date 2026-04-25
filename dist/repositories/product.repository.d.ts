import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";
type CreateProductInput = {
    name: string;
    author?: string;
    publishedYear?: number;
    coverImageUrl?: string;
    description?: string;
    price: number;
    stock: number;
    categoryId?: string;
};
type UpdateProductInput = {
    name?: string;
    author?: string;
    publishedYear?: number;
    coverImageUrl?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
};
type ProductQueryOptions = {
    page: number;
    limit: number;
    search?: string;
    categories?: string[];
    inStock?: boolean;
    startYear?: number;
    endYear?: number;
    sortBy?: "title" | "publishedYear";
    sortOrder?: "asc" | "desc";
};
export declare class ProductRepository {
    static findMany(options: ProductQueryOptions): Prisma.PrismaPromise<({
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
    })[]>;
    static countAll(options: {
        search?: string;
        categories?: string[];
        inStock?: boolean;
        startYear?: number;
        endYear?: number;
    }): Prisma.PrismaPromise<number>;
    static countAvailableTitles(): Prisma.PrismaPromise<number>;
    static findById(id: string): Prisma.Prisma__ProductClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findActiveById(id: string): Prisma.Prisma__ProductClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static findActiveByIds(ids: string[], db?: Prisma.TransactionClient | typeof prisma): Prisma.PrismaPromise<{
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
    }[]>;
    static decreaseStock(id: string, quantity: number, db?: Prisma.TransactionClient | typeof prisma): Prisma.PrismaPromise<Prisma.BatchPayload>;
    static increaseStock(id: string, quantity: number, db?: Prisma.TransactionClient | typeof prisma): Prisma.PrismaPromise<Prisma.BatchPayload>;
    static create(data: CreateProductInput): Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static update(id: string, data: UpdateProductInput): Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static softDelete(id: string): Prisma.Prisma__ProductClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }>;
    static search(keyword: string, page: number, limit: number): Prisma.PrismaPromise<({
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
    })[]>;
    static countSearch(keyword: string): Prisma.PrismaPromise<number>;
}
export {};
//# sourceMappingURL=product.repository.d.ts.map
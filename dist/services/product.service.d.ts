export declare class ProductService {
    static getAll(params: {
        page?: number;
        limit?: number;
        search?: string;
        categories?: string[];
        inStock?: boolean;
        startYear?: number;
        endYear?: number;
        sortBy?: "title" | "publishedYear";
        sortOrder?: "asc" | "desc";
    }): Promise<{
        products: ({
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
        })[];
        total: number;
        page: number;
        limit: number;
        search: string | null;
        categories: string[];
        inStock: boolean | null;
        yearRange: {
            startYear: number | null;
            endYear: number | null;
        };
        sortBy: string;
        sortOrder: string;
    }>;
    static getById(id: string): Promise<{
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
    }>;
    static create(data: {
        name: string;
        author?: string;
        publishedYear?: number;
        coverImageUrl?: string;
        description?: string;
        price: number;
        stock: number;
        categoryId?: string;
    }): Promise<{
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
    }>;
    static update(id: string, data: {
        name?: string;
        author?: string;
        publishedYear?: number;
        coverImageUrl?: string;
        description?: string;
        price?: number;
        stock?: number;
        categoryId?: string;
    }): Promise<{
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
    }>;
    static delete(id: string): Promise<{
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
    }>;
    static search(keyword: string, page?: number, limit?: number): Promise<{
        products: ({
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=product.service.d.ts.map
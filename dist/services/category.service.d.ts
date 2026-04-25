export declare class CategoryService {
    static getAll(page?: number, limit?: number): Promise<{
        categories: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    static getById(id: string): Promise<{
        products: {
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
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static create(data: {
        name: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static update(id: string, data: {
        name?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static search(keyword: string, page?: number, limit?: number): Promise<{
        categories: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=category.service.d.ts.map
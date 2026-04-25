import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
export class ProductService {
    static async getAll(params) {
        const safePage = Math.max(1, params.page || 1);
        const safeLimit = Math.max(1, params.limit || 10);
        const normalizedSearch = params.search?.trim();
        const normalizedCategories = params.categories
            ?.map((category) => category.trim())
            .filter(Boolean);
        const safeStartYear = typeof params.startYear === "number" && params.startYear >= 1000 && params.startYear <= 9999
            ? params.startYear
            : undefined;
        const safeEndYear = typeof params.endYear === "number" && params.endYear >= 1000 && params.endYear <= 9999
            ? params.endYear
            : undefined;
        if (typeof safeStartYear === "number" &&
            typeof safeEndYear === "number" &&
            safeStartYear > safeEndYear) {
            throw new Error("startYear tidak boleh lebih besar dari endYear");
        }
        const safeSortBy = params.sortBy === "publishedYear" ? "publishedYear" : "title";
        const safeSortOrder = params.sortOrder === "desc" ? "desc" : "asc";
        const queryOptions = {
            page: safePage,
            limit: safeLimit,
            sortBy: safeSortBy,
            sortOrder: safeSortOrder,
        };
        if (normalizedSearch)
            queryOptions.search = normalizedSearch;
        if (normalizedCategories && normalizedCategories.length > 0) {
            queryOptions.categories = normalizedCategories;
        }
        if (typeof params.inStock === "boolean")
            queryOptions.inStock = params.inStock;
        if (typeof safeStartYear === "number")
            queryOptions.startYear = safeStartYear;
        if (typeof safeEndYear === "number")
            queryOptions.endYear = safeEndYear;
        const [products, total] = await Promise.all([
            ProductRepository.findMany(queryOptions),
            ProductRepository.countAll(queryOptions),
        ]);
        return {
            products,
            total,
            page: safePage,
            limit: safeLimit,
            search: normalizedSearch || null,
            categories: normalizedCategories || [],
            inStock: typeof params.inStock === "boolean" ? params.inStock : null,
            yearRange: {
                startYear: safeStartYear ?? null,
                endYear: safeEndYear ?? null,
            },
            sortBy: safeSortBy,
            sortOrder: safeSortOrder,
        };
    }
    static async getById(id) {
        const product = await ProductRepository.findById(id);
        if (!product)
            throw new Error("Product not found");
        return product;
    }
    static async create(data) {
        if (data.price <= 0)
            throw new Error("Harga harus lebih dari 0");
        if (data.stock < 0)
            throw new Error("Stock harus 0 atau lebih");
        if (typeof data.publishedYear === "number" &&
            (data.publishedYear < 1000 || data.publishedYear > 9999)) {
            throw new Error("publishedYear harus 4 digit tahun yang valid");
        }
        if (data.categoryId) {
            const category = await CategoryRepository.findActiveById(data.categoryId);
            if (!category)
                throw new Error("Category not found");
        }
        const payload = {
            name: data.name.trim(),
            price: data.price,
            stock: data.stock,
        };
        if (typeof data.description === "string") {
            payload.description = data.description.trim();
        }
        if (typeof data.author === "string")
            payload.author = data.author.trim();
        if (typeof data.publishedYear === "number") {
            payload.publishedYear = data.publishedYear;
        }
        if (typeof data.coverImageUrl === "string") {
            payload.coverImageUrl = data.coverImageUrl;
        }
        if (data.categoryId) {
            payload.categoryId = data.categoryId;
        }
        return ProductRepository.create(payload);
    }
    static async update(id, data) {
        const product = await ProductRepository.findActiveById(id);
        if (!product)
            throw new Error("Product not found");
        if (typeof data.price === "number" && data.price <= 0) {
            throw new Error("Harga harus lebih dari 0");
        }
        if (typeof data.stock === "number" && data.stock < 0) {
            throw new Error("Stock harus 0 atau lebih");
        }
        if (typeof data.publishedYear === "number" &&
            (data.publishedYear < 1000 || data.publishedYear > 9999)) {
            throw new Error("publishedYear harus 4 digit tahun yang valid");
        }
        if (data.categoryId) {
            const category = await CategoryRepository.findActiveById(data.categoryId);
            if (!category)
                throw new Error("Category not found");
        }
        const payload = {};
        if (typeof data.name === "string")
            payload.name = data.name.trim();
        if (typeof data.author === "string")
            payload.author = data.author.trim();
        if (typeof data.publishedYear === "number") {
            payload.publishedYear = data.publishedYear;
        }
        if (typeof data.coverImageUrl === "string") {
            payload.coverImageUrl = data.coverImageUrl;
        }
        if (typeof data.description === "string") {
            payload.description = data.description.trim();
        }
        if (typeof data.price === "number")
            payload.price = data.price;
        if (typeof data.stock === "number")
            payload.stock = data.stock;
        if (typeof data.categoryId === "string")
            payload.categoryId = data.categoryId;
        return ProductRepository.update(id, payload);
    }
    static async delete(id) {
        const product = await ProductRepository.findActiveById(id);
        if (!product)
            throw new Error("Product not found");
        return ProductRepository.softDelete(id);
    }
    static async search(keyword, page = 1, limit = 10) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, limit);
        const normalizedKeyword = keyword?.trim();
        if (!normalizedKeyword)
            throw new Error("Keyword pencarian wajib diisi");
        const [products, total] = await Promise.all([
            ProductRepository.search(normalizedKeyword, safePage, safeLimit),
            ProductRepository.countSearch(normalizedKeyword),
        ]);
        return { products, total, page: safePage, limit: safeLimit };
    }
}
//# sourceMappingURL=product.service.js.map
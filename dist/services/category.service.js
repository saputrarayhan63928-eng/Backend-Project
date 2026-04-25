import { CategoryRepository } from "../repositories/category.repository.js";
export class CategoryService {
    static async getAll(page = 1, limit = 10) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, limit);
        const [categories, total] = await Promise.all([
            CategoryRepository.findMany(safePage, safeLimit),
            CategoryRepository.countAll(),
        ]);
        return { categories, total, page: safePage, limit: safeLimit };
    }
    static async getById(id) {
        const category = await CategoryRepository.findById(id);
        if (!category)
            throw new Error("Category not found");
        return category;
    }
    static async create(data) {
        return CategoryRepository.create({ name: data.name.trim() });
    }
    static async update(id, data) {
        const category = await CategoryRepository.findActiveById(id);
        if (!category)
            throw new Error("Category not found");
        const payload = {};
        if (typeof data.name === "string")
            payload.name = data.name.trim();
        return CategoryRepository.update(id, payload);
    }
    static async delete(id) {
        const category = await CategoryRepository.findActiveById(id);
        if (!category)
            throw new Error("Category not found");
        return CategoryRepository.softDelete(id);
    }
    static async search(keyword, page = 1, limit = 10) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, limit);
        const normalizedKeyword = keyword?.trim();
        if (!normalizedKeyword)
            throw new Error("Keyword pencarian wajib diisi");
        const [categories, total] = await Promise.all([
            CategoryRepository.search(normalizedKeyword, safePage, safeLimit),
            CategoryRepository.countSearch(normalizedKeyword),
        ]);
        return { categories, total, page: safePage, limit: safeLimit };
    }
}
//# sourceMappingURL=category.service.js.map
import {} from "express";
import { CategoryService } from "../services/category.service.js";
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
export const getAllCategories = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await CategoryService.getAll(page, limit);
    return successResponse(res, 'Daftar Kategori', result);
});
export const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string')
        throw new Error('ID is required and must be string');
    const category = await CategoryService.getById(id);
    return successResponse(res, 'Kategori Ditemukan', category);
});
export const createCategory = asyncHandler(async (req, res) => {
    const category = await CategoryService.create(req.body);
    return successResponse(res, 'Kategori berhasil ditambahkan', category, null, 201);
});
export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string')
        throw new Error('ID is required and must be string');
    const category = await CategoryService.update(id, req.body);
    return successResponse(res, 'Kategori Berhasil di Update', category);
});
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string')
        throw new Error('ID is required and must be string');
    const category = await CategoryService.delete(id);
    return successResponse(res, 'Kategori Berhasil di Hapus (Soft Delete)', category);
});
export const searchCategory = asyncHandler(async (req, res) => {
    const { keyword } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await CategoryService.search(keyword, page, limit);
    return successResponse(res, 'Hasil Pencarian Kategori', result);
});
//# sourceMappingURL=category.controller.js.map
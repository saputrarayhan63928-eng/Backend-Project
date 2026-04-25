import {} from "express";
import { UserService } from "../services/user.service.js";
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
export const getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await UserService.getAll(page, limit);
    return successResponse(res, 'Daftar User', result);
});
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string')
        throw new Error('ID is required and must be string');
    const user = await UserService.getById(id);
    return successResponse(res, 'User Ditemukan', user);
});
export const createUser = asyncHandler(async (req, res) => {
    const user = await UserService.create(req.body);
    return successResponse(res, 'User berhasil ditambahkan', user, null, 201);
});
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string')
        throw new Error('ID is required and must be string');
    const user = await UserService.update(id, req.body);
    return successResponse(res, 'User Berhasil di Update', user);
});
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string')
        throw new Error('ID is required and must be string');
    const user = await UserService.delete(id);
    return successResponse(res, 'User Berhasil di Hapus (Soft Delete)', user);
});
export const searchUser = asyncHandler(async (req, res) => {
    const { keyword } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await UserService.search(keyword, page, limit);
    return successResponse(res, 'Hasil Pencarian User', result);
});
//# sourceMappingURL=user.controller.js.map
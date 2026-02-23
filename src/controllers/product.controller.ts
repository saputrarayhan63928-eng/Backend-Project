import { type Request, type Response } from "express";
import { ProductService } from "../services/product.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await ProductService.getAll(page, limit);
    return successResponse(res, 'Daftar Produk', result);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const product = await ProductService.getById(id);
    return successResponse(res, 'Produk Ditemukan', product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductService.create(req.body);
    return successResponse(res, 'Produk berhasil ditambahkan', product, null, 201);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const product = await ProductService.update(id, req.body);
    return successResponse(res, 'Produk Berhasil di Update', product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const product = await ProductService.delete(id);
    return successResponse(res, 'Produk Berhasil di Hapus (Soft Delete)', product);
});

export const searchProduct = asyncHandler(async (req: Request, res: Response) => {
    const { keyword } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await ProductService.search(keyword as string, page, limit);
    return successResponse(res, 'Hasil Pencarian Produk', result);
});
import { type Request, type Response } from "express";
import { OrderService } from "../services/order.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await OrderService.getAll(page, limit);
    return successResponse(res, 'Daftar Order', result);
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const order = await OrderService.getById(id);
    return successResponse(res, 'Order Ditemukan', order);
});

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderService.create(req.body);
    return successResponse(res, 'Order berhasil ditambahkan', order, null, 201);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const order = await OrderService.update(id, req.body);
    return successResponse(res, 'Order Berhasil di Update', order);
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const order = await OrderService.delete(id);
    return successResponse(res, 'Order Berhasil di Hapus (Soft Delete)', order);
});

export const searchOrder = asyncHandler(async (req: Request, res: Response) => {
    const { keyword } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await OrderService.search(keyword as string, page, limit);
    return successResponse(res, 'Hasil Pencarian Order', result);
});
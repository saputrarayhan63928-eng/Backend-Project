import { type Request, type Response } from "express";
import { BorrowService } from "../services/borrow.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";
import { AppError } from "../utils/app.error";

export const getAllBorrows = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  if (!req.authUser) throw new Error("Unauthorized");

  const result = await BorrowService.getAll(page, limit, req.authUser);
  return successResponse(res, "Daftar Riwayat Peminjaman", result);
});

export const getBorrowById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id !== "string") throw new Error("ID is required and must be string");
  if (!req.authUser) throw new Error("Unauthorized");

  const result = await BorrowService.getById(id, req.authUser);
  return successResponse(res, "Detail Peminjaman Ditemukan", result);
});

export const createBorrow = asyncHandler(async (req: Request, res: Response) => {
  if (!req.authUser) throw new Error("Unauthorized");

  const result = await BorrowService.create(req.body, req.authUser);
  return successResponse(res, "Peminjaman berhasil dibuat", result, null, 201);
});

export const returnBorrow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id !== "string") throw new Error("ID is required and must be string");
  if (!req.authUser) throw new Error("Unauthorized");

  const result = await BorrowService.returnBorrow(id, req.authUser);
  return successResponse(res, "Buku berhasil dikembalikan", result);
});

export const borrowBooks = asyncHandler(async (req: Request, res: Response) => {
  if (!req.authUser) throw new Error("Unauthorized");

  const rawItems = req.body as Array<{ bookId: string; qty: number }>;
  const payload = {
    items: rawItems.map((item) => ({
      productId: item.bookId,
      quantity: item.qty,
    })),
  };

  const result = await BorrowService.create(payload, req.authUser);
  return successResponse(res, "Peminjaman berhasil dibuat", result, null, 201);
});

export const returnBooks = asyncHandler(async (req: Request, res: Response) => {
  if (!req.authUser) throw new Error("Unauthorized");
  const borrowId = req.body?.borrowId;
  if (!borrowId || typeof borrowId !== "string") {
    throw new AppError("borrowId wajib diisi", 400);
  }

  const result = await BorrowService.returnBorrow(borrowId, req.authUser);
  return successResponse(res, "Buku berhasil dikembalikan", result);
});

export const getMyBorrowings = asyncHandler(async (req: Request, res: Response) => {
  if (!req.authUser) throw new Error("Unauthorized");
  if (req.authUser.role !== "MEMBER") {
    throw new AppError("Akses ditolak: endpoint ini hanya untuk MEMBER", 403);
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await BorrowService.getAll(page, limit, req.authUser);
  return successResponse(res, "Riwayat peminjaman saya", result);
});

import { type Request, type Response } from "express";
import { BorrowService } from "../services/borrow.service.js";
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../utils/app.error.js";

const parseString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized ? normalized : undefined;
};

export const getAllBorrows = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  if (!req.authUser) throw new Error("Unauthorized");

  const filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
    memberName?: string;
  } = {};
  const startDate = parseString(req.query.startDate);
  const endDate = parseString(req.query.endDate);
  const status = parseString(req.query.status);
  const memberName = parseString(req.query.memberName);
  if (startDate) filters.startDate = startDate;
  if (endDate) filters.endDate = endDate;
  if (status) filters.status = status;
  if (memberName) filters.memberName = memberName;

  const result = await BorrowService.getAll(page, limit, req.authUser, filters);
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

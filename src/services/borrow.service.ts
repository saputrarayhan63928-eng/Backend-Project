import { BorrowRepository } from "../repositories/borrow.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/app.error";

type AuthContext = {
  userId: string;
  role: "ADMIN" | "MEMBER";
};

type BorrowItemInput = {
  productId: string;
  quantity: number;
};

type CreateBorrowInput = {
  userId?: string;
  dueDate?: string;
  notes?: string;
  items: BorrowItemInput[];
};

export class BorrowService {
  static async getAll(page: number = 1, limit: number = 10, authUser: AuthContext) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const [records, total] =
      authUser.role === "ADMIN"
        ? await Promise.all([
            BorrowRepository.findMany(safePage, safeLimit),
            BorrowRepository.countAll(),
          ])
        : await Promise.all([
            BorrowRepository.findManyByUserId(authUser.userId, safePage, safeLimit),
            BorrowRepository.countByUserId(authUser.userId),
          ]);

    return { records, total, page: safePage, limit: safeLimit };
  }

  static async getById(id: string, authUser: AuthContext) {
    const record = await BorrowRepository.findById(id);
    if (!record) throw new AppError("Data peminjaman tidak ditemukan", 404);

    if (authUser.role === "MEMBER" && record.userId !== authUser.userId) {
      throw new AppError("Akses ditolak: bukan riwayat milikmu", 403);
    }

    return record;
  }

  static async create(data: CreateBorrowInput, authUser: AuthContext) {
    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new AppError("Daftar buku yang dipinjam wajib diisi", 400);
    }

    const targetUserId = authUser.role === "MEMBER" ? authUser.userId : data.userId;
    if (!targetUserId) throw new AppError("userId wajib diisi oleh admin", 400);

    const user = await UserRepository.findActiveById(targetUserId);
    if (!user) throw new AppError("User tidak ditemukan", 404);

    const groupedItems = new Map<string, number>();
    for (const item of data.items) {
      if (!item.productId) throw new AppError("productId wajib diisi", 400);
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new AppError("quantity harus bilangan bulat lebih dari 0", 400);
      }
      groupedItems.set(
        item.productId,
        (groupedItems.get(item.productId) || 0) + item.quantity,
      );
    }

    const normalizedItems = Array.from(groupedItems.entries()).map(
      ([productId, quantity]) => ({ productId, quantity }),
    );

    const dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
    if (dueDate && Number.isNaN(dueDate.getTime())) {
      throw new AppError("Format dueDate tidak valid", 400);
    }

    const createdRecordId = await prisma.$transaction(async (tx) => {
      const products = await ProductRepository.findActiveByIds(
        normalizedItems.map((item) => item.productId),
        tx,
      );

      if (products.length !== normalizedItems.length) {
        throw new AppError("Ada buku yang tidak ditemukan", 404);
      }

      const stockMap = new Map(products.map((product) => [product.id, product.stock]));
      for (const item of normalizedItems) {
        const stock = stockMap.get(item.productId) || 0;
        if (stock < item.quantity) {
          throw new AppError(`Stok buku tidak cukup untuk productId ${item.productId}`, 400);
        }
      }

      for (const item of normalizedItems) {
        const updated = await ProductRepository.decreaseStock(
          item.productId,
          item.quantity,
          tx,
        );
        if (updated.count === 0) {
          throw new AppError("Gagal update stok, silakan coba lagi", 409);
        }
      }

      const borrowRecordPayload: {
        userId: string;
        dueDate?: Date;
        notes?: string;
      } = {
        userId: targetUserId,
      };
      if (dueDate) borrowRecordPayload.dueDate = dueDate;
      if (typeof data.notes === "string" && data.notes.trim()) {
        borrowRecordPayload.notes = data.notes.trim();
      }

      const record = await BorrowRepository.createBorrowRecord(
        borrowRecordPayload,
        tx,
      );

      await BorrowRepository.createBorrowItems(record.id, normalizedItems, tx);
      return record.id;
    });

    const createdRecord = await BorrowRepository.findById(createdRecordId);
    if (!createdRecord) throw new AppError("Gagal membuat data peminjaman", 500);

    return createdRecord;
  }

  static async returnBorrow(id: string, authUser: AuthContext) {
    await prisma.$transaction(async (tx) => {
      const record = await BorrowRepository.findByIdForUpdate(id, tx);
      if (!record) throw new AppError("Data peminjaman tidak ditemukan", 404);

      if (authUser.role === "MEMBER" && record.userId !== authUser.userId) {
        throw new AppError("Akses ditolak: bukan riwayat milikmu", 403);
      }

      if (record.status === "RETURNED") {
        throw new AppError("Peminjaman ini sudah dikembalikan", 400);
      }

      for (const item of record.items) {
        const updated = await ProductRepository.increaseStock(
          item.productId,
          item.quantity,
          tx,
        );
        if (updated.count === 0) {
          throw new AppError("Gagal mengembalikan stok buku", 409);
        }
      }

      await BorrowRepository.markAsReturned(id, tx);
    });

    const updatedRecord = await BorrowRepository.findById(id);
    if (!updatedRecord) throw new AppError("Data peminjaman tidak ditemukan", 404);
    return updatedRecord;
  }
}

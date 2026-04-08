import { OrderRepository } from "../repositories/order.repository";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/app.error";

type AuthContext = {
  userId: string;
  role: "ADMIN" | "MEMBER";
};

export class OrderService {
  static async getAll(
    page: number = 1,
    limit: number = 10,
    authUser: AuthContext,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const [orders, total] =
      authUser.role === "ADMIN"
        ? await Promise.all([
            OrderRepository.findMany(safePage, safeLimit),
            OrderRepository.countAll(),
          ])
        : await Promise.all([
            OrderRepository.findManyByUserId(authUser.userId, safePage, safeLimit),
            OrderRepository.countByUserId(authUser.userId),
          ]);

    return { orders, total, page: safePage, limit: safeLimit };
  }

  static async getById(id: string, authUser: AuthContext) {
    const order = await OrderRepository.findById(id);
    if (!order) throw new Error("Order not found");
    if (authUser.role === "MEMBER" && order.userId !== authUser.userId) {
      throw new AppError("Akses ditolak: bukan history milikmu", 403);
    }

    return order;
  }

  static async create(
    data: { total: number; status?: string; userId?: string },
    authUser: AuthContext,
  ) {
    if (data.total <= 0) throw new Error("Total harus lebih dari 0");

    const targetUserId =
      authUser.role === "MEMBER" ? authUser.userId : data.userId;
    if (!targetUserId) throw new AppError("userId wajib diisi oleh admin", 400);

    const user = await UserRepository.findActiveById(targetUserId);
    if (!user) throw new Error("User not found");

    const payload: { total: number; userId: string; status?: string } = {
      total: data.total,
      userId: targetUserId,
    };
    if (typeof data.status === "string") payload.status = data.status;

    return OrderRepository.create(payload);
  }

  static async update(
    id: string,
    data: { total?: number; status?: string; userId?: string },
    authUser: AuthContext,
  ) {
    if (authUser.role !== "ADMIN") {
      throw new AppError("Akses ditolak: hanya admin", 403);
    }

    const order = await OrderRepository.findActiveById(id);
    if (!order) throw new Error("Order not found");

    if (typeof data.total === "number" && data.total <= 0) {
      throw new Error("Total harus lebih dari 0");
    }

    if (data.userId) {
      const user = await UserRepository.findActiveById(data.userId);
      if (!user) throw new Error("User not found");
    }

    return OrderRepository.update(id, data);
  }

  static async delete(id: string, authUser: AuthContext) {
    if (authUser.role !== "ADMIN") {
      throw new AppError("Akses ditolak: hanya admin", 403);
    }

    const order = await OrderRepository.findActiveById(id);
    if (!order) throw new Error("Order not found");

    return OrderRepository.softDelete(id);
  }

  static async search(
    keyword: string,
    page: number = 1,
    limit: number = 10,
    authUser: AuthContext,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const normalizedKeyword = keyword?.trim();

    if (!normalizedKeyword) throw new Error("Keyword pencarian wajib diisi");

    const [orders, total] =
      authUser.role === "ADMIN"
        ? await Promise.all([
            OrderRepository.search(normalizedKeyword, safePage, safeLimit),
            OrderRepository.countSearch(normalizedKeyword),
          ])
        : await Promise.all([
            OrderRepository.searchByUserId(
              authUser.userId,
              normalizedKeyword,
              safePage,
              safeLimit,
            ),
            OrderRepository.countSearchByUserId(authUser.userId, normalizedKeyword),
          ]);

    return { orders, total, page: safePage, limit: safeLimit };
  }
}

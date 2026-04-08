import { OrderRepository } from "../repositories/order.repository";
import { UserRepository } from "../repositories/user.repository";

export class OrderService {
  static async getAll(page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const [orders, total] = await Promise.all([
      OrderRepository.findMany(safePage, safeLimit),
      OrderRepository.countAll(),
    ]);

    return { orders, total, page: safePage, limit: safeLimit };
  }

  static async getById(id: string) {
    const order = await OrderRepository.findById(id);
    if (!order) throw new Error("Order not found");

    return order;
  }

  static async create(data: { total: number; status?: string; userId: string }) {
    if (data.total <= 0) throw new Error("Total harus lebih dari 0");

    const user = await UserRepository.findActiveById(data.userId);
    if (!user) throw new Error("User not found");

    return OrderRepository.create(data);
  }

  static async update(
    id: string,
    data: { total?: number; status?: string; userId?: string },
  ) {
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

  static async delete(id: string) {
    const order = await OrderRepository.findActiveById(id);
    if (!order) throw new Error("Order not found");

    return OrderRepository.softDelete(id);
  }

  static async search(keyword: string, page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const normalizedKeyword = keyword?.trim();

    if (!normalizedKeyword) throw new Error("Keyword pencarian wajib diisi");

    const [orders, total] = await Promise.all([
      OrderRepository.search(normalizedKeyword, safePage, safeLimit),
      OrderRepository.countSearch(normalizedKeyword),
    ]);

    return { orders, total, page: safePage, limit: safeLimit };
  }
}

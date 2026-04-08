import { UserRepository } from "../repositories/user.repository";

export class UserService {
  static async getAll(page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const [users, total] = await Promise.all([
      UserRepository.findMany(safePage, safeLimit),
      UserRepository.countAll(),
    ]);

    return { users, total, page: safePage, limit: safeLimit };
  }

  static async getById(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");

    return user;
  }

  static async create(data: { name: string; email: string; password: string }) {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) throw new Error("Email sudah digunakan");

    return UserRepository.create({
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
    });
  }

  static async update(
    id: string,
    data: { name?: string; email?: string; password?: string },
  ) {
    const user = await UserRepository.findActiveById(id);
    if (!user) throw new Error("User not found");

    if (data.email) {
      const existingUser = await UserRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email sudah digunakan");
      }
    }

    const payload: { name?: string; email?: string; password?: string } = {};
    if (typeof data.name === "string") payload.name = data.name.trim();
    if (typeof data.email === "string") {
      payload.email = data.email.trim().toLowerCase();
    }
    if (typeof data.password === "string") payload.password = data.password;

    return UserRepository.update(id, payload);
  }

  static async delete(id: string) {
    const user = await UserRepository.findActiveById(id);
    if (!user) throw new Error("User not found");

    return UserRepository.softDelete(id);
  }

  static async search(keyword: string, page: number = 1, limit: number = 10) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const normalizedKeyword = keyword?.trim();

    if (!normalizedKeyword) throw new Error("Keyword pencarian wajib diisi");

    const [users, total] = await Promise.all([
      UserRepository.search(normalizedKeyword, safePage, safeLimit),
      UserRepository.countSearch(normalizedKeyword),
    ]);

    return { users, total, page: safePage, limit: safeLimit };
  }
}

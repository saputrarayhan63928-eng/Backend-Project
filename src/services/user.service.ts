import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";

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

  static async create(data: {
    name: string;
    email: string;
    password: string;
    role?: "ADMIN" | "MEMBER";
  }) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const existingUser = await UserRepository.findByEmail(normalizedEmail);
    if (existingUser) throw new Error("Email sudah digunakan");

    const hashedPassword = await hashPassword(data.password);
    const payload: {
      name: string;
      email: string;
      password: string;
      role?: "ADMIN" | "MEMBER";
    } = {
      name: data.name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    };

    if (data.role) payload.role = data.role;

    return UserRepository.create(payload);
  }

  static async update(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      role?: "ADMIN" | "MEMBER";
    },
  ) {
    const user = await UserRepository.findActiveById(id);
    if (!user) throw new Error("User not found");

    if (data.email) {
      const normalizedEmail = data.email.trim().toLowerCase();
      const existingUser = await UserRepository.findByEmail(normalizedEmail);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email sudah digunakan");
      }
    }

    const payload: {
      name?: string;
      email?: string;
      password?: string;
      role?: "ADMIN" | "MEMBER";
    } = {};
    if (typeof data.name === "string") payload.name = data.name.trim();
    if (typeof data.email === "string") {
      payload.email = data.email.trim().toLowerCase();
    }
    if (typeof data.password === "string") {
      payload.password = await hashPassword(data.password);
    }
    if (data.role) payload.role = data.role;

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

import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/app.error.js";
import { signToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
export class AuthService {
    static async register(data) {
        const normalizedEmail = data.email.trim().toLowerCase();
        const existingUser = await UserRepository.findByEmail(normalizedEmail);
        if (existingUser)
            throw new AppError("Email sudah digunakan", 409);
        const passwordHash = await hashPassword(data.password);
        const user = await UserRepository.create({
            name: data.name.trim(),
            email: normalizedEmail,
            password: passwordHash,
            role: "MEMBER",
        });
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { user, token };
    }
    static async login(data) {
        const normalizedEmail = data.email.trim().toLowerCase();
        const user = await UserRepository.findByEmailWithPassword(normalizedEmail);
        if (!user)
            throw new AppError("Email atau password salah", 401);
        const isValidPassword = await comparePassword(data.password, user.password);
        if (!isValidPassword)
            throw new AppError("Email atau password salah", 401);
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
            token,
        };
    }
}
//# sourceMappingURL=auth.service.js.map
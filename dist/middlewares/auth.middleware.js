import {} from "express";
import { AppError } from "../utils/app.error.js";
import { verifyTokenPayload } from "../utils/jwt.js";
export const verifyToken = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        throw new AppError("Token tidak ditemukan", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!token)
        throw new AppError("Token tidak valid", 401);
    try {
        const payload = verifyTokenPayload(token);
        req.authUser = payload;
        next();
    }
    catch {
        throw new AppError("Token tidak valid atau kadaluarsa", 401);
    }
};
export const adminOnly = (req, _res, next) => {
    if (!req.authUser) {
        throw new AppError("Unauthorized", 401);
    }
    if (req.authUser.role !== "ADMIN") {
        throw new AppError("Akses ditolak: hanya admin", 403);
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map
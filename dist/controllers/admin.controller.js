import {} from "express";
import { BorrowService } from "../services/borrow.service.js";
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";
export const getAdminStats = asyncHandler(async (_req, res) => {
    const stats = await BorrowService.getAdminStats();
    return successResponse(res, "Statistik admin berhasil diambil", stats);
});
//# sourceMappingURL=admin.controller.js.map
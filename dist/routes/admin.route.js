import { Router } from "express";
import { getAdminStats } from "../controllers/admin.controller.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/stats", verifyToken, adminOnly, getAdminStats);
export default router;
//# sourceMappingURL=admin.route.js.map
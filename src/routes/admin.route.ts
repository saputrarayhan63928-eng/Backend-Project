import { Router } from "express";
import { getAdminStats } from "../controllers/admin.controller.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";

export const adminPaths = {
  "/api/admin/stats": {
    get: {
      tags: ["Admin"],
      summary: "Statistik admin",
      security: [{ BearerAuth: [] }],
      responses: {
        "200": { $ref: "#/components/responses/AdminStatsSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/admin/stats": {
    get: {
      tags: ["Admin"],
      summary: "Alias statistik admin",
      security: [{ BearerAuth: [] }],
      responses: {
        "200": { $ref: "#/components/responses/AdminStatsSuccess" },
      },
    },
  },
};

const router = Router();

router.get("/stats", verifyToken, adminOnly, getAdminStats);

export default router;

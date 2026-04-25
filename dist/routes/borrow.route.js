import { Router } from "express";
import { createBorrow, getAllBorrows, getBorrowById, returnBorrow, } from "../controllers/borrow.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createBorrowValidation, getBorrowByIdValidation, validate, } from "../validations/borrow.validation.js";
const router = Router();
router.use(verifyToken);
router.get("/", getAllBorrows);
router.get("/:id", validate(getBorrowByIdValidation), getBorrowById);
router.post("/", validate(createBorrowValidation), createBorrow);
router.patch("/:id/return", validate(getBorrowByIdValidation), returnBorrow);
export default router;
//# sourceMappingURL=borrow.route.js.map
import { Router } from "express";
import {
  createBorrow,
  getAllBorrows,
  getBorrowById,
  returnBorrow,
} from "../controllers/borrow.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  createBorrowValidation,
  getBorrowByIdValidation,
  validate,
} from "../validations/borrow.validation";

const router = Router();

router.use(verifyToken);
router.get("/", getAllBorrows);
router.get("/:id", validate(getBorrowByIdValidation), getBorrowById);
router.post("/", validate(createBorrowValidation), createBorrow);
router.patch("/:id/return", validate(getBorrowByIdValidation), returnBorrow);

export default router;

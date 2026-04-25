import {
  body,
  param,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { type NextFunction, type Request, type Response } from "express";
import { errorResponse } from "../utils/response.js";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorList = errors.array().map((err: any) => ({
      field: err.path || err.param || "unknown",
      message: err.msg,
    }));

    return errorResponse(res, "Validasi Gagal", 400, errorList);
  };
};

export const createBorrowValidation = [
  body("userId").optional().isUUID().withMessage("User ID harus UUID valid"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("dueDate harus format tanggal ISO8601"),
  body("notes").optional().isString().withMessage("notes harus string"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("items wajib diisi minimal 1 buku"),
  body("items.*.productId")
    .isUUID()
    .withMessage("productId di items harus UUID valid"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("quantity harus bilangan bulat minimal 1"),
];

export const getBorrowByIdValidation = [
  param("id").isUUID().withMessage("ID harus UUID valid"),
];

export const borrowValidation = [
  body()
    .isArray({ min: 1 })
    .withMessage("Body harus array minimal 1 item buku"),
  body("*.bookId").isUUID().withMessage("bookId harus UUID valid"),
  body("*.qty")
    .isInt({ min: 1 })
    .withMessage("qty harus bilangan bulat minimal 1"),
];

export const returnBorrowValidation = [
  body("borrowId").isUUID().withMessage("borrowId harus UUID valid"),
];

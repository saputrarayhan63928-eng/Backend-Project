import {
  body,
  param,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
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

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nama kategori wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Nama kategori minimal 3 karakter"),
];

export const getCategoryByIdValidation = [
  param('id')
    .isUUID().withMessage('ID harus UUID valid')
];
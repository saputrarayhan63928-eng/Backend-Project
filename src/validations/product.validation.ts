import {
  body,
  param,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import { errorResponse } from "../utils/response";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next;
    }

    const errorList = errors.array().map((err: any) => ({
      field: err.path || err.param || "unknown",
      message: err.msg,
    }));

    return errorResponse(res, "Validasi Gagal", 400, errorList);
  };
};

export const createItemValidation = [
  body("nama")
    .trim()
    .notEmpty()
    .withMessage("Nama Item wajib di isi")
    .isLength({ min: 3 })
    .withMessage("Nama item minimal 3 karakter"),

  body("penulis").trim().notEmpty().withMessage("Penulis wajib diisi"),

  body("rilis").trim().notEmpty().withMessage("Rilis wajib diisi"),

  body("stock")
    .isNumeric()
    .withMessage("Stock harus angka")
    .custom((value) => value > 0)
    .withMessage("Stock harus lebih dari 0"),
];

export const getItemByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
]

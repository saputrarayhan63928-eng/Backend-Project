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
      return next();
    }

    const errorList = errors.array().map((err: any) => ({
      field: err.path || err.param || "unknown",
      message: err.msg,
    }));

    return errorResponse(res, "Validasi Gagal", 400, errorList);
  };
};

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nama produk wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Nama produk minimal 3 karakter"),

  body("author")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Author minimal 2 karakter"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: 9999 })
    .withMessage("publishedYear harus tahun 4 digit valid"),

  body("coverImageUrl")
    .optional()
    .isString()
    .withMessage("coverImageUrl harus string"),

  body("price")
    .isNumeric()
    .withMessage("Harga harus angka")
    .custom((value) => value > 0)
    .withMessage("Harga harus lebih dari 0"),

  body("stock")
    .isNumeric()
    .withMessage("Stock harus angka")
    .custom((value) => value >= 0)
    .withMessage("Stock harus 0 atau lebih"),

  body("categoryId")
    .optional()
    .isUUID()
    .withMessage("Category ID harus UUID valid"),
];

export const updateProductValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Nama produk minimal 3 karakter"),

  body("author")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Author minimal 2 karakter"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: 9999 })
    .withMessage("publishedYear harus tahun 4 digit valid"),

  body("coverImageUrl")
    .optional()
    .isString()
    .withMessage("coverImageUrl harus string"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Harga harus angka")
    .custom((value) => Number(value) > 0)
    .withMessage("Harga harus lebih dari 0"),

  body("stock")
    .optional()
    .isNumeric()
    .withMessage("Stock harus angka")
    .custom((value) => Number(value) >= 0)
    .withMessage("Stock harus 0 atau lebih"),

  body("categoryId")
    .optional()
    .isUUID()
    .withMessage("Category ID harus UUID valid"),
];

export const getProductByIdValidation = [
  param('id')
    .isUUID().withMessage('ID harus UUID valid')
];

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

export const createOrderValidation = [
  body("total")
    .isNumeric()
    .withMessage("Total harus angka")
    .custom((value) => value > 0)
    .withMessage("Total harus lebih dari 0"),

  body("userId")
    .optional()
    .isUUID()
    .withMessage("User ID harus UUID valid"),

  body("status")
    .optional()
    .isIn(['pending', 'completed', 'cancelled'])
    .withMessage("Status harus pending, completed, atau cancelled"),
];

export const updateOrderValidation = [
  body("total")
    .optional()
    .isNumeric()
    .withMessage("Total harus angka")
    .custom((value) => Number(value) > 0)
    .withMessage("Total harus lebih dari 0"),

  body("userId")
    .optional()
    .isUUID()
    .withMessage("User ID harus UUID valid"),

  body("status")
    .optional()
    .isIn(["pending", "completed", "cancelled"])
    .withMessage("Status harus pending, completed, atau cancelled"),
];

export const getOrderByIdValidation = [
  param('id')
    .isUUID().withMessage('ID harus UUID valid')
];

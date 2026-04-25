import { body, validationResult, } from "express-validator";
import {} from "express";
import { errorResponse } from "../utils/response.js";
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorList = errors.array().map((err) => ({
            field: err.path || err.param || "unknown",
            message: err.msg,
        }));
        return errorResponse(res, "Validasi Gagal", 400, errorList);
    };
};
export const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Nama wajib diisi")
        .isLength({ min: 3 })
        .withMessage("Nama minimal 3 karakter"),
    body("email").isEmail().withMessage("Email harus valid").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),
];
export const loginValidation = [
    body("email").isEmail().withMessage("Email harus valid").normalizeEmail(),
    body("password").notEmpty().withMessage("Password wajib diisi"),
];
//# sourceMappingURL=auth.validation.js.map
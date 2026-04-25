import { body, param, validationResult, } from "express-validator";
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
export const createUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Nama user wajib diisi")
        .isLength({ min: 3 })
        .withMessage("Nama user minimal 3 karakter"),
    body("email")
        .isEmail()
        .withMessage("Email harus valid")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),
    body("role")
        .optional()
        .isIn(["ADMIN", "MEMBER"])
        .withMessage("Role harus ADMIN atau MEMBER"),
];
export const updateUserValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Nama user minimal 3 karakter"),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email harus valid")
        .normalizeEmail(),
    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),
    body("role")
        .optional()
        .isIn(["ADMIN", "MEMBER"])
        .withMessage("Role harus ADMIN atau MEMBER"),
];
export const getUserByIdValidation = [
    param('id')
        .isUUID().withMessage('ID harus UUID valid')
];
//# sourceMappingURL=user.validation.js.map
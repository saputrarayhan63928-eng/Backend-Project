import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation, validate, } from "../validations/auth.validation.js";
const router = Router();
router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
export default router;
//# sourceMappingURL=auth.route.js.map
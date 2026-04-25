import { Router } from "express";
import { borrowBooks, getMyBorrowings, returnBooks, } from "../controllers/borrow.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { borrowValidation, returnBorrowValidation, validate, } from "../validations/borrow.validation.js";
const router = Router();
router.post("/borrow", verifyToken, validate(borrowValidation), borrowBooks);
router.post("/return", verifyToken, validate(returnBorrowValidation), returnBooks);
router.get("/my-borrowings", verifyToken, getMyBorrowings);
export default router;
//# sourceMappingURL=borrowing.route.js.map
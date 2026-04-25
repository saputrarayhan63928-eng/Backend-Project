import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProduct, } from "../controllers/product.controller.js";
import { validate, createProductValidation, updateProductValidation, getProductByIdValidation, } from "../validations/product.validation.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";
import { uploadBookCover } from "../middlewares/upload.middleware.js";
const router = Router();
router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/:id', validate(getProductByIdValidation), getProductById);
router.post('/', verifyToken, adminOnly, uploadBookCover.single("cover"), validate(createProductValidation), createProduct);
router.put('/:id', verifyToken, adminOnly, uploadBookCover.single("cover"), validate(updateProductValidation), updateProduct);
router.delete('/:id', verifyToken, adminOnly, validate(getProductByIdValidation), deleteProduct);
export default router;
//# sourceMappingURL=product.route.js.map
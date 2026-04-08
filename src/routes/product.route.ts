import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} from "../controllers/product.controller";
import {
  validate,
  createProductValidation,
  updateProductValidation,
  getProductByIdValidation,
} from "../validations/product.validation";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware";
import { uploadBookCover } from "../middlewares/upload.middleware";

const router = Router();

router.use(verifyToken);
router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/:id', validate(getProductByIdValidation), getProductById);
router.post('/', adminOnly, uploadBookCover.single("cover"), validate(createProductValidation), createProduct);
router.put('/:id', adminOnly, uploadBookCover.single("cover"), validate(updateProductValidation), updateProduct);
router.delete('/:id', adminOnly, validate(getProductByIdValidation), deleteProduct);

export default router;

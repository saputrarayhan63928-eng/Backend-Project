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
  getProductByIdValidation,
} from "../validations/product.validation";

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/:id', validate(getProductByIdValidation), getProductById);
router.post('/', validate(createProductValidation), createProduct);
router.put('/:id', validate(createProductValidation), updateProduct);
router.delete('/:id', validate(getProductByIdValidation), deleteProduct);

export default router;
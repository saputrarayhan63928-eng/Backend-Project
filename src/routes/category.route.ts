import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategory,
} from "../controllers/category.controller.js";
import {
  validate,
  createCategoryValidation,
  getCategoryByIdValidation,
} from "../validations/category.validation.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);
router.get('/', getAllCategories);
router.get('/search', searchCategory);
router.get('/:id', validate(getCategoryByIdValidation), getCategoryById);
router.post('/', adminOnly, validate(createCategoryValidation), createCategory);
router.put('/:id', adminOnly, validate(createCategoryValidation), updateCategory);
router.delete('/:id', adminOnly, validate(getCategoryByIdValidation), deleteCategory);

export default router;

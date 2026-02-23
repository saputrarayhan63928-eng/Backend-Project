import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategory,
} from "../controllers/category.controller";
import {
  validate,
  createCategoryValidation,
  getCategoryByIdValidation,
} from "../validations/category.validation";

const router = Router();

router.get('/', getAllCategories);
router.get('/search', searchCategory);
router.get('/:id', validate(getCategoryByIdValidation), getCategoryById);
router.post('/', validate(createCategoryValidation), createCategory);
router.put('/:id', validate(createCategoryValidation), updateCategory);
router.delete('/:id', validate(getCategoryByIdValidation), deleteCategory);

export default router;
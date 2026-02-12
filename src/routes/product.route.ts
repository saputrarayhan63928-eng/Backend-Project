import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItem,
} from "../controllers/product.controller";
import {
  validate,
  createItemValidation,
  getItemByIdValidation,
} from "../validations/product.validation";

const router = Router()

router.get('/' ,getAllItems)
router.get('/search', searchItem)
router.get('/:id', validate(getItemByIdValidation), getItemById)
router.post('/', validate(createItemValidation), createItem)
router.put('/:id' , validate(createItemValidation), updateItem)
router.delete('/:id', validate(getItemByIdValidation), deleteItem)

export default router
import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  searchOrder,
} from "../controllers/order.controller";
import {
  validate,
  createOrderValidation,
  getOrderByIdValidation,
} from "../validations/order.validation";

const router = Router();

router.get('/', getAllOrders);
router.get('/search', searchOrder);
router.get('/:id', validate(getOrderByIdValidation), getOrderById);
router.post('/', validate(createOrderValidation), createOrder);
router.put('/:id', validate(createOrderValidation), updateOrder);
router.delete('/:id', validate(getOrderByIdValidation), deleteOrder);

export default router;
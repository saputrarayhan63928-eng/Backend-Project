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
  updateOrderValidation,
  getOrderByIdValidation,
} from "../validations/order.validation";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyToken);
router.get('/', getAllOrders);
router.get('/search', adminOnly, searchOrder);
router.get('/:id', validate(getOrderByIdValidation), getOrderById);
router.post('/', validate(createOrderValidation), createOrder);
router.put('/:id', adminOnly, validate(updateOrderValidation), updateOrder);
router.delete('/:id', adminOnly, validate(getOrderByIdValidation), deleteOrder);

export default router;

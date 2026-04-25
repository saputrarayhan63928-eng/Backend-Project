import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  searchOrder,
} from "../controllers/order.controller.js";
import {
  validate,
  createOrderValidation,
  updateOrderValidation,
  getOrderByIdValidation,
} from "../validations/order.validation.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";

const orderIdParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string", format: "uuid" },
};

export const orderPaths = {
  "/api/orders": {
    get: {
      tags: ["Orders"],
      summary: "Daftar order",
      security: [{ BearerAuth: [] }],
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
    post: {
      tags: ["Orders"],
      summary: "Buat order",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/OrderBody" } } },
      },
      responses: {
        "201": { $ref: "#/components/responses/GenericCreated" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/orders/search": {
    get: {
      tags: ["Orders"],
      summary: "Cari order (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [{ name: "keyword", in: "query", required: true, schema: { type: "string" } }],
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
  },
  "/api/orders/{id}": {
    get: {
      tags: ["Orders"],
      summary: "Detail order",
      security: [{ BearerAuth: [] }],
      parameters: [orderIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
    put: {
      tags: ["Orders"],
      summary: "Update order (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [orderIdParam],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/OrderBody" } } },
      },
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
    delete: {
      tags: ["Orders"],
      summary: "Hapus order (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [orderIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
  },
};

const router = Router();

router.use(verifyToken);
router.get('/', getAllOrders);
router.get('/search', adminOnly, searchOrder);
router.get('/:id', validate(getOrderByIdValidation), getOrderById);
router.post('/', validate(createOrderValidation), createOrder);
router.put('/:id', adminOnly, validate(updateOrderValidation), updateOrder);
router.delete('/:id', adminOnly, validate(getOrderByIdValidation), deleteOrder);

export default router;

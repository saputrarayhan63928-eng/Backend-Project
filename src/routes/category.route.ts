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

const categoryIdParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string", format: "uuid" },
};

export const categoryPaths = {
  "/api/categories": {
    get: {
      tags: ["Categories"],
      summary: "Daftar kategori",
      security: [{ BearerAuth: [] }],
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
    post: {
      tags: ["Categories"],
      summary: "Tambah kategori (admin)",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryBody" } } },
      },
      responses: {
        "201": { $ref: "#/components/responses/GenericCreated" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/categories/search": {
    get: {
      tags: ["Categories"],
      summary: "Cari kategori",
      security: [{ BearerAuth: [] }],
      parameters: [{ name: "keyword", in: "query", required: true, schema: { type: "string" } }],
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
  },
  "/api/categories/{id}": {
    get: {
      tags: ["Categories"],
      summary: "Detail kategori",
      security: [{ BearerAuth: [] }],
      parameters: [categoryIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
    put: {
      tags: ["Categories"],
      summary: "Update kategori (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [categoryIdParam],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryBody" } } },
      },
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
    delete: {
      tags: ["Categories"],
      summary: "Hapus kategori (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [categoryIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
  },
};

const router = Router();

router.use(verifyToken);
router.get('/', getAllCategories);
router.get('/search', searchCategory);
router.get('/:id', validate(getCategoryByIdValidation), getCategoryById);
router.post('/', adminOnly, validate(createCategoryValidation), createCategory);
router.put('/:id', adminOnly, validate(createCategoryValidation), updateCategory);
router.delete('/:id', adminOnly, validate(getCategoryByIdValidation), deleteCategory);

export default router;

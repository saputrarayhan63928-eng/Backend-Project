import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} from "../controllers/product.controller.js";
import {
  validate,
  createProductValidation,
  updateProductValidation,
  getProductByIdValidation,
} from "../validations/product.validation.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";
import { uploadBookCover } from "../middlewares/upload.middleware.js";

const bookListQueryParameters = [
  { name: "page", in: "query", schema: { type: "integer", default: 1 } },
  { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
  { name: "search", in: "query", schema: { type: "string" } },
  { name: "categories", in: "query", schema: { type: "string" } },
  { name: "inStock", in: "query", schema: { type: "boolean" } },
  { name: "startYear", in: "query", schema: { type: "integer" } },
  { name: "endYear", in: "query", schema: { type: "integer" } },
  { name: "sortBy", in: "query", schema: { type: "string", enum: ["title", "publishedYear"] } },
  { name: "sortOrder", in: "query", schema: { type: "string", enum: ["asc", "desc"] } },
];

const productIdParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string", format: "uuid" },
};

export const productPaths = {
  "/api/products": {
    get: {
      tags: ["Books"],
      summary: "Daftar buku",
      description: "Mendukung filter kategori multiple, stok, dan rentang tahun.",
      parameters: bookListQueryParameters,
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
    post: {
      tags: ["Books"],
      summary: "Tambah buku (admin)",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/ProductBody" },
          },
        },
      },
      responses: {
        "201": { $ref: "#/components/responses/GenericCreated" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/products/search": {
    get: {
      tags: ["Books"],
      summary: "Cari buku",
      parameters: [
        { name: "keyword", in: "query", required: true, schema: { type: "string" } },
        { name: "page", in: "query", schema: { type: "integer", default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
      ],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/products/{id}": {
    get: {
      tags: ["Books"],
      summary: "Detail buku",
      parameters: [productIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "404": { $ref: "#/components/responses/NotFound" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
    put: {
      tags: ["Books"],
      summary: "Update buku (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [productIdParam],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/ProductBody" },
          },
        },
      },
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
    delete: {
      tags: ["Books"],
      summary: "Hapus buku (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [productIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/books": {
    get: {
      tags: ["Books"],
      summary: "Alias daftar buku",
      parameters: bookListQueryParameters,
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
      },
    },
  },
  "/books": {
    get: {
      tags: ["Books"],
      summary: "Alias daftar buku publik",
      parameters: bookListQueryParameters,
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
      },
    },
  },
};

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProduct);
router.get('/:id', validate(getProductByIdValidation), getProductById);
router.post(
  '/',
  verifyToken,
  adminOnly,
  uploadBookCover.single("cover"),
  validate(createProductValidation),
  createProduct,
);
router.put(
  '/:id',
  verifyToken,
  adminOnly,
  uploadBookCover.single("cover"),
  validate(updateProductValidation),
  updateProduct,
);
router.delete(
  '/:id',
  verifyToken,
  adminOnly,
  validate(getProductByIdValidation),
  deleteProduct,
);

export default router;

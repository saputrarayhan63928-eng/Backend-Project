import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
} from "../controllers/user.controller.js";
import {
  validate,
  createUserValidation,
  updateUserValidation,
  getUserByIdValidation,
} from "../validations/user.validation.js";
import { adminOnly, verifyToken } from "../middlewares/auth.middleware.js";

const userIdParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string", format: "uuid" },
};

export const userPaths = {
  "/api/users": {
    get: {
      tags: ["Users"],
      summary: "Daftar user (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [
        { name: "page", in: "query", schema: { type: "integer", default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
      ],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
    post: {
      tags: ["Users"],
      summary: "Tambah user (admin)",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/UserBody" } } },
      },
      responses: {
        "201": { $ref: "#/components/responses/GenericCreated" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/users/search": {
    get: {
      tags: ["Users"],
      summary: "Cari user (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [
        { name: "keyword", in: "query", required: true, schema: { type: "string" } },
        { name: "page", in: "query", schema: { type: "integer", default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
      ],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Detail user (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [userIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
    put: {
      tags: ["Users"],
      summary: "Update user (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [userIdParam],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { $ref: "#/components/schemas/UserBody" } } },
      },
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
    delete: {
      tags: ["Users"],
      summary: "Hapus user (admin)",
      security: [{ BearerAuth: [] }],
      parameters: [userIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
      },
    },
  },
};

const router = Router();

router.use(verifyToken, adminOnly);
router.get('/', getAllUsers);
router.get('/search', searchUser);
router.get('/:id', validate(getUserByIdValidation), getUserById);
router.post('/', validate(createUserValidation), createUser);
router.put('/:id', validate(updateUserValidation), updateUser);
router.delete('/:id', validate(getUserByIdValidation), deleteUser);

export default router;

import { Router } from "express";
import {
  createBorrow,
  getAllBorrows,
  getBorrowById,
  returnBorrow,
} from "../controllers/borrow.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createBorrowValidation,
  getBorrowByIdValidation,
  validate,
} from "../validations/borrow.validation.js";

const borrowIdParam = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "string", format: "uuid" },
};

const borrowQueryParameters = [
  { name: "page", in: "query", schema: { type: "integer", default: 1 } },
  { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
  { name: "startDate", in: "query", schema: { type: "string", format: "date-time" } },
  { name: "endDate", in: "query", schema: { type: "string", format: "date-time" } },
  { name: "status", in: "query", schema: { type: "string", enum: ["pinjam", "kembali", "borrowed", "returned"] } },
  { name: "memberName", in: "query", schema: { type: "string" } },
];

export const borrowRecordPaths = {
  "/api/borrows": {
    get: {
      tags: ["Borrow Records"],
      summary: "Daftar borrow records",
      security: [{ BearerAuth: [] }],
      parameters: borrowQueryParameters,
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
    post: {
      tags: ["Borrow Records"],
      summary: "Buat transaksi peminjaman",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/BorrowCreateBody" } },
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
  "/api/borrows/{id}": {
    get: {
      tags: ["Borrow Records"],
      summary: "Detail borrow record",
      security: [{ BearerAuth: [] }],
      parameters: [borrowIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/borrows/{id}/return": {
    patch: {
      tags: ["Borrow Records"],
      summary: "Proses pengembalian borrow record",
      security: [{ BearerAuth: [] }],
      parameters: [borrowIdParam],
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "404": { $ref: "#/components/responses/NotFound" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/api/borrow-records": {
    get: {
      tags: ["Borrow Records"],
      summary: "Alias daftar borrow records",
      security: [{ BearerAuth: [] }],
      parameters: borrowQueryParameters,
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
    post: {
      tags: ["Borrow Records"],
      summary: "Alias create borrow record",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/BorrowCreateBody" } },
        },
      },
      responses: { "201": { $ref: "#/components/responses/GenericCreated" } },
    },
  },
  "/api/borrow-records/{id}": {
    get: {
      tags: ["Borrow Records"],
      summary: "Alias detail borrow record",
      security: [{ BearerAuth: [] }],
      parameters: [borrowIdParam],
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
  },
  "/api/borrow-records/{id}/return": {
    patch: {
      tags: ["Borrow Records"],
      summary: "Alias return borrow record",
      security: [{ BearerAuth: [] }],
      parameters: [borrowIdParam],
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
  },
  "/borrow-records": {
    get: {
      tags: ["Borrow Records"],
      summary: "Alias publik daftar borrow records",
      security: [{ BearerAuth: [] }],
      parameters: borrowQueryParameters,
      responses: { "200": { $ref: "#/components/responses/GenericSuccess" } },
    },
  },
};

const router = Router();

router.use(verifyToken);
router.get("/", getAllBorrows);
router.get("/:id", validate(getBorrowByIdValidation), getBorrowById);
router.post("/", validate(createBorrowValidation), createBorrow);
router.patch("/:id/return", validate(getBorrowByIdValidation), returnBorrow);

export default router;

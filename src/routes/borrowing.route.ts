import { Router } from "express";
import {
  borrowBooks,
  getMyBorrowings,
  returnBooks,
} from "../controllers/borrow.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  borrowValidation,
  returnBorrowValidation,
  validate,
} from "../validations/borrow.validation.js";

export const memberBorrowingPaths = {
  "/borrow": {
    post: {
      tags: ["Member Borrowing"],
      summary: "Member meminjam buku",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/BorrowBooksBody" } },
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
  "/return": {
    post: {
      tags: ["Member Borrowing"],
      summary: "Member mengembalikan buku",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/ReturnBooksBody" } },
        },
      },
      responses: {
        "200": { $ref: "#/components/responses/GenericSuccess" },
        "400": { $ref: "#/components/responses/BadRequest" },
        "401": { $ref: "#/components/responses/Unauthorized" },
        "500": { $ref: "#/components/responses/InternalServerError" },
      },
    },
  },
  "/my-borrowings": {
    get: {
      tags: ["Member Borrowing"],
      summary: "Riwayat peminjaman member",
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
  },
};

const router = Router();

router.post("/borrow", verifyToken, validate(borrowValidation), borrowBooks);
router.post("/return", verifyToken, validate(returnBorrowValidation), returnBooks);
router.get("/my-borrowings", verifyToken, getMyBorrowings);

export default router;

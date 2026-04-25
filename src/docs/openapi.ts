import { adminPaths } from "../routes/admin.route.js";
import { authPaths } from "../routes/auth.route.js";
import { borrowRecordPaths } from "../routes/borrow.route.js";
import { memberBorrowingPaths } from "../routes/borrowing.route.js";
import { categoryPaths } from "../routes/category.route.js";
import { orderPaths } from "../routes/order.route.js";
import { productPaths } from "../routes/product.route.js";
import { userPaths } from "../routes/user.route.js";

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Library API",
    version: "1.0.0",
    description: "Dokumentasi endpoint Library API (modular per route).",
  },
  servers: [{ url: "/" }],
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Categories" },
    { name: "Orders" },
    { name: "Books" },
    { name: "Borrow Records" },
    { name: "Member Borrowing" },
    { name: "Admin" },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterBody: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Rayhan" },
          email: { type: "string", format: "email", example: "rayhan@mail.com" },
          password: { type: "string", minLength: 6, example: "password123" },
        },
      },
      LoginBody: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "rayhan@mail.com" },
          password: { type: "string", example: "password123" },
        },
      },
      UserBody: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          role: { type: "string", enum: ["ADMIN", "MEMBER"] },
        },
      },
      CategoryBody: {
        type: "object",
        required: ["name"],
        properties: { name: { type: "string", example: "Fiction" } },
      },
      OrderBody: {
        type: "object",
        required: ["total"],
        properties: {
          total: { type: "number", example: 150000 },
          userId: { type: "string", format: "uuid" },
          status: { type: "string", enum: ["pending", "completed", "cancelled"] },
        },
      },
      ProductBody: {
        type: "object",
        required: ["name", "price", "stock"],
        properties: {
          name: { type: "string" },
          author: { type: "string" },
          publishedYear: { type: "integer", example: 2022 },
          cover: { type: "string", format: "binary" },
          coverImageUrl: { type: "string" },
          description: { type: "string" },
          price: { type: "number", example: 99000 },
          stock: { type: "integer", example: 5 },
          categoryId: { type: "string", format: "uuid" },
        },
      },
      BorrowCreateBody: {
        type: "object",
        required: ["items"],
        properties: {
          userId: { type: "string", format: "uuid" },
          dueDate: { type: "string", format: "date-time" },
          notes: { type: "string" },
          items: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["productId", "quantity"],
              properties: {
                productId: { type: "string", format: "uuid" },
                quantity: { type: "integer", minimum: 1 },
              },
            },
          },
        },
      },
      BorrowBooksBody: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          required: ["bookId", "qty"],
          properties: {
            bookId: { type: "string", format: "uuid" },
            qty: { type: "integer", minimum: 1 },
          },
        },
      },
      ReturnBooksBody: {
        type: "object",
        required: ["borrowId"],
        properties: {
          borrowId: { type: "string", format: "uuid" },
        },
      },
    },
    responses: {
      GenericSuccess: {
        description: "Success",
        content: {
          "application/json": {
            example: { success: true, message: "Berhasil", data: {} },
          },
        },
      },
      GenericCreated: {
        description: "Created",
        content: {
          "application/json": {
            example: { success: true, message: "Data berhasil dibuat", data: {} },
          },
        },
      },
      LoginSuccess: {
        description: "Login sukses",
        content: {
          "application/json": {
            example: {
              success: true,
              message: "Login berhasil",
              data: { token: "jwt-token", user: { id: "uuid", email: "rayhan@mail.com" } },
            },
          },
        },
      },
      RegisterSuccess: {
        description: "Register sukses",
        content: {
          "application/json": {
            example: { success: true, message: "Register berhasil", data: { id: "uuid" } },
          },
        },
      },
      AdminStatsSuccess: {
        description: "Statistik admin",
        content: {
          "application/json": {
            example: {
              success: true,
              message: "Statistik admin berhasil diambil",
              data: {
                totalAvailableBooks: 40,
                activeBorrowTransactions: 10,
                mostPopularBook: { id: "uuid", name: "Atomic Habits", totalBorrowed: 27 },
              },
            },
          },
        },
      },
      BadRequest: {
        description: "Bad Request",
        content: {
          "application/json": {
            example: {
              success: false,
              message: "Validasi Gagal",
              errors: [{ field: "email", message: "Email harus valid" }],
            },
          },
        },
      },
      Unauthorized: {
        description: "Unauthorized",
        content: {
          "application/json": {
            example: { success: false, message: "Token tidak valid atau kadaluarsa" },
          },
        },
      },
      NotFound: {
        description: "Not Found",
        content: {
          "application/json": {
            example: { success: false, message: "Data tidak ditemukan" },
          },
        },
      },
      InternalServerError: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            example: { success: false, message: "Terjadi kesalahan server" },
          },
        },
      },
    },
  },
  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...orderPaths,
    ...productPaths,
    ...borrowRecordPaths,
    ...memberBorrowingPaths,
    ...adminPaths,
  },
};

export { openApiSpec };

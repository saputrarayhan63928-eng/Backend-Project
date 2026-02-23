import { type Request, type Response, type NextFunction } from "express";
import { errorResponse } from "../utils/response";
import { NODE_ENV } from "../utils/env";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("ERROR:", err.message);

  let statusCode = 500;
  let message = "Terjadi kesalahan server";

  if (err.code === 'P2002') {
    statusCode = 409;
    message = "Data sudah ada (unique constraint violation)";
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = "Data tidak ditemukan";
  } else if (err.message.includes("not found") || err.message.includes("tidak ditemukan")) {
    statusCode = 404;
    message = err.message;
  } else if (err.message) {
    statusCode = 400;
    message = err.message;
  }

  errorResponse(
    res,
    message,
    statusCode,
    NODE_ENV === "development" ? { stack: err.stack } : null,
  );
};

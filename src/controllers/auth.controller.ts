import { type Request, type Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async.handler.js";
import { successResponse } from "../utils/response.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  return successResponse(res, "Register berhasil", result, null, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  return successResponse(res, "Login berhasil", result);
});

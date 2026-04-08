import { type Request, type Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  return successResponse(res, "Register berhasil", result, null, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  return successResponse(res, "Login berhasil", result);
});

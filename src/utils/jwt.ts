import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./env.js";

export type JwtPayload = {
  userId: string;
  email: string;
  role: "ADMIN" | "MEMBER";
};

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(
    payload,
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions,
  );
};

export const verifyTokenPayload = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      startTime?: number;
      apiKey?: string;
      authUser?: {
        userId: string;
        email: string;
        role: "ADMIN" | "MEMBER";
      };
    }
  }
}

import { type ValidationChain } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const createUserValidation: ValidationChain[];
export declare const updateUserValidation: ValidationChain[];
export declare const getUserByIdValidation: ValidationChain[];
//# sourceMappingURL=user.validation.d.ts.map
import { type ValidationChain } from "express-validator";
import { type NextFunction, type Request, type Response } from "express";
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const registerValidation: ValidationChain[];
export declare const loginValidation: ValidationChain[];
//# sourceMappingURL=auth.validation.d.ts.map
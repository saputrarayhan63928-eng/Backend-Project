import { type ValidationChain } from "express-validator";
import { type NextFunction, type Request, type Response } from "express";
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const createBorrowValidation: ValidationChain[];
export declare const getBorrowByIdValidation: ValidationChain[];
export declare const borrowValidation: ValidationChain[];
export declare const returnBorrowValidation: ValidationChain[];
//# sourceMappingURL=borrow.validation.d.ts.map
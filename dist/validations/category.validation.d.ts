import { type ValidationChain } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const createCategoryValidation: ValidationChain[];
export declare const getCategoryByIdValidation: ValidationChain[];
//# sourceMappingURL=category.validation.d.ts.map
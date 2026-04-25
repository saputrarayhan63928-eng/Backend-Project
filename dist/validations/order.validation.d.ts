import { type ValidationChain } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
export declare const validate: (validations: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const createOrderValidation: ValidationChain[];
export declare const updateOrderValidation: ValidationChain[];
export declare const getOrderByIdValidation: ValidationChain[];
//# sourceMappingURL=order.validation.d.ts.map
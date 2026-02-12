import { type Request, type Response, type NextFunction } from "express";

export const asyncHandler = (fn: Function) => {
    return(req: Request, res: Response, Next: NextFunction) =>{
        Promise.resolve(fn(req, res , Next)).catch(Next)
    }
}
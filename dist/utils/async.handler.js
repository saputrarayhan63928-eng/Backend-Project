import {} from "express";
export const asyncHandler = (fn) => {
    return (req, res, Next) => {
        Promise.resolve(fn(req, res, Next)).catch(Next);
    };
};
//# sourceMappingURL=async.handler.js.map
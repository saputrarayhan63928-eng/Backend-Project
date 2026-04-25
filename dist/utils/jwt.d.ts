export type JwtPayload = {
    userId: string;
    email: string;
    role: "ADMIN" | "MEMBER";
};
export declare const signToken: (payload: JwtPayload) => string;
export declare const verifyTokenPayload: (token: string) => JwtPayload;
//# sourceMappingURL=jwt.d.ts.map
type RegisterInput = {
    name: string;
    email: string;
    password: string;
};
type LoginInput = {
    email: string;
    password: string;
};
export declare class AuthService {
    static register(data: RegisterInput): Promise<{
        user: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        token: string;
    }>;
    static login(data: LoginInput): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        };
        token: string;
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map
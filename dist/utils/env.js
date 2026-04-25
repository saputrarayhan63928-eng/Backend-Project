import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
//# sourceMappingURL=env.js.map
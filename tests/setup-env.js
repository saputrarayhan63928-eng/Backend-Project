if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/library_test";
}
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = "test_jwt_secret";
}
if (!process.env.JWT_EXPIRES_IN) {
    process.env.JWT_EXPIRES_IN = "1d";
}
export {};
//# sourceMappingURL=setup-env.js.map
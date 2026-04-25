const commonErrors = {
    BadRequest: {
        description: "Bad Request",
        content: {
            "application/json": {
                example: {
                    success: false,
                    message: "Validasi Gagal",
                    errors: [{ field: "email", message: "Email harus valid" }],
                },
            },
        },
    },
    Unauthorized: {
        description: "Unauthorized",
        content: {
            "application/json": {
                example: {
                    success: false,
                    message: "Token tidak valid atau kadaluarsa",
                },
            },
        },
    },
    NotFound: {
        description: "Not Found",
        content: {
            "application/json": {
                example: {
                    success: false,
                    message: "Data tidak ditemukan",
                },
            },
        },
    },
    InternalServerError: {
        description: "Internal Server Error",
        content: {
            "application/json": {
                example: {
                    success: false,
                    message: "Terjadi kesalahan server",
                },
            },
        },
    },
};
const securedResponses = {
    "400": commonErrors.BadRequest,
    "401": commonErrors.Unauthorized,
    "404": commonErrors.NotFound,
    "500": commonErrors.InternalServerError,
};
const publicResponses = {
    "400": commonErrors.BadRequest,
    "404": commonErrors.NotFound,
    "500": commonErrors.InternalServerError,
};
const bookListParameters = [
    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
    { name: "search", in: "query", schema: { type: "string" } },
    {
        name: "categories",
        in: "query",
        schema: { type: "string" },
        description: "Filter kategori multiple, contoh: Novel,Science",
    },
    {
        name: "inStock",
        in: "query",
        schema: { type: "boolean" },
        description: "true untuk hanya stok tersedia, false untuk stok habis",
    },
    { name: "startYear", in: "query", schema: { type: "integer" } },
    { name: "endYear", in: "query", schema: { type: "integer" } },
    {
        name: "sortBy",
        in: "query",
        schema: { type: "string", enum: ["title", "publishedYear"] },
    },
    {
        name: "sortOrder",
        in: "query",
        schema: { type: "string", enum: ["asc", "desc"] },
    },
];
const borrowRecordQueryParameters = [
    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
    {
        name: "startDate",
        in: "query",
        schema: { type: "string", format: "date-time" },
        description: "Filter tanggal awal peminjaman",
    },
    {
        name: "endDate",
        in: "query",
        schema: { type: "string", format: "date-time" },
        description: "Filter tanggal akhir peminjaman",
    },
    {
        name: "status",
        in: "query",
        schema: { type: "string", enum: ["pinjam", "kembali", "borrowed", "returned"] },
    },
    {
        name: "memberName",
        in: "query",
        schema: { type: "string" },
        description: "Hanya efektif untuk admin",
    },
];
const pathIdParameter = {
    name: "id",
    in: "path",
    required: true,
    schema: { type: "string", format: "uuid" },
};
const bookListOperation = {
    tags: ["Books"],
    summary: "Daftar buku dengan filtering lanjutan",
    description: "Mengambil daftar buku dengan pagination, pencarian, sorting, filter kategori multiple, stok, dan rentang tahun terbit.",
    parameters: bookListParameters,
    responses: {
        "200": {
            description: "Success",
            content: {
                "application/json": {
                    example: {
                        success: true,
                        message: "Daftar Buku",
                        data: {
                            products: [
                                {
                                    id: "4dc13ab2-fbd2-4f0a-a4f9-6b3a0704e3b7",
                                    name: "Atomic Habits",
                                    stock: 8,
                                },
                            ],
                            total: 1,
                            page: 1,
                            limit: 10,
                            categories: ["Self Improvement"],
                            inStock: true,
                            yearRange: { startYear: 2018, endYear: 2023 },
                        },
                    },
                },
            },
        },
        ...publicResponses,
    },
};
const openApiSpec = {
    openapi: "3.0.3",
    info: {
        title: "Library API",
        version: "1.0.0",
        description: "Dokumentasi endpoint Library API",
    },
    servers: [{ url: "/" }],
    tags: [
        { name: "System", description: "Health check dan metadata API" },
        { name: "Auth", description: "Autentikasi user" },
        { name: "Users", description: "Manajemen user (admin)" },
        { name: "Categories", description: "Manajemen kategori buku" },
        { name: "Orders", description: "Manajemen order" },
        { name: "Books", description: "Manajemen buku" },
        { name: "Borrow Records", description: "Manajemen transaksi peminjaman" },
        { name: "Member Borrowing", description: "Flow peminjaman khusus member" },
        { name: "Admin", description: "Analytics dan endpoint admin" },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            RegisterBody: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: { type: "string", example: "Rayhan Saputra" },
                    email: { type: "string", format: "email", example: "rayhan@mail.com" },
                    password: { type: "string", minLength: 6, example: "password123" },
                },
            },
            LoginBody: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email", example: "rayhan@mail.com" },
                    password: { type: "string", example: "password123" },
                },
            },
            UserBody: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                    role: { type: "string", enum: ["ADMIN", "MEMBER"] },
                },
            },
            CategoryBody: {
                type: "object",
                required: ["name"],
                properties: {
                    name: { type: "string", example: "Fiction" },
                },
            },
            OrderBody: {
                type: "object",
                required: ["total"],
                properties: {
                    total: { type: "number", example: 150000 },
                    userId: { type: "string", format: "uuid" },
                    status: { type: "string", enum: ["pending", "completed", "cancelled"] },
                },
            },
            ProductBody: {
                type: "object",
                required: ["name", "price", "stock"],
                properties: {
                    name: { type: "string" },
                    author: { type: "string" },
                    publishedYear: { type: "integer", example: 2021 },
                    coverImageUrl: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number", example: 99000 },
                    stock: { type: "integer", example: 10 },
                    categoryId: { type: "string", format: "uuid" },
                },
            },
            BorrowCreateBody: {
                type: "object",
                required: ["items"],
                properties: {
                    userId: { type: "string", format: "uuid" },
                    dueDate: { type: "string", format: "date-time" },
                    notes: { type: "string" },
                    items: {
                        type: "array",
                        minItems: 1,
                        items: {
                            type: "object",
                            required: ["productId", "quantity"],
                            properties: {
                                productId: { type: "string", format: "uuid" },
                                quantity: { type: "integer", minimum: 1 },
                            },
                        },
                    },
                },
            },
            BorrowBooksBody: {
                type: "array",
                minItems: 1,
                items: {
                    type: "object",
                    required: ["bookId", "qty"],
                    properties: {
                        bookId: { type: "string", format: "uuid" },
                        qty: { type: "integer", minimum: 1 },
                    },
                },
            },
            ReturnBooksBody: {
                type: "object",
                required: ["borrowId"],
                properties: {
                    borrowId: { type: "string", format: "uuid" },
                },
            },
        },
    },
    paths: {
        "/": {
            get: {
                tags: ["System"],
                summary: "Health check API",
                description: "Memastikan service API aktif.",
                responses: {
                    "200": {
                        description: "Service aktif",
                        content: {
                            "application/json": {
                                example: { message: "Library API is running" },
                            },
                        },
                    },
                    "500": commonErrors.InternalServerError,
                },
            },
        },
        "/api/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Register user baru",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/RegisterBody" },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User berhasil daftar",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Register berhasil",
                                    data: { id: "uuid", name: "Rayhan", email: "rayhan@mail.com", role: "MEMBER" },
                                },
                            },
                        },
                    },
                    ...publicResponses,
                },
            },
        },
        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LoginBody" },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Login sukses",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Login berhasil",
                                    data: {
                                        token: "jwt-token",
                                        user: { id: "uuid", name: "Rayhan", email: "rayhan@mail.com", role: "ADMIN" },
                                    },
                                },
                            },
                        },
                    },
                    ...publicResponses,
                },
            },
        },
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Alias register user",
                description: "Alias endpoint dari /api/auth/register",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/RegisterBody" },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User berhasil daftar",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Register berhasil",
                                },
                            },
                        },
                    },
                    ...publicResponses,
                },
            },
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Alias login user",
                description: "Alias endpoint dari /api/auth/login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LoginBody" },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Login sukses",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Login berhasil",
                                },
                            },
                        },
                    },
                    ...publicResponses,
                },
            },
        },
        "/api/users": {
            get: {
                tags: ["Users"],
                summary: "Daftar user",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Daftar user ditemukan",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Daftar User",
                                    data: { users: [], total: 0, page: 1, limit: 10 },
                                },
                            },
                        },
                    },
                    ...securedResponses,
                },
            },
            post: {
                tags: ["Users"],
                summary: "Tambah user baru",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UserBody" },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User berhasil dibuat",
                        content: {
                            "application/json": {
                                example: { success: true, message: "User berhasil ditambahkan", data: { id: "uuid" } },
                            },
                        },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/users/search": {
            get: {
                tags: ["Users"],
                summary: "Cari user",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "keyword", in: "query", required: true, schema: { type: "string" } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Hasil pencarian user",
                        content: {
                            "application/json": {
                                example: { success: true, message: "Hasil Pencarian User", data: { users: [] } },
                            },
                        },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Detail user",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail user ditemukan",
                        content: { "application/json": { example: { success: true, message: "User Ditemukan" } } },
                    },
                    ...securedResponses,
                },
            },
            put: {
                tags: ["Users"],
                summary: "Update user",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/UserBody" } } },
                },
                responses: {
                    "200": {
                        description: "User terupdate",
                        content: { "application/json": { example: { success: true, message: "User Berhasil di Update" } } },
                    },
                    ...securedResponses,
                },
            },
            delete: {
                tags: ["Users"],
                summary: "Hapus user (soft delete)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "User terhapus",
                        content: { "application/json": { example: { success: true, message: "User Berhasil di Hapus" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/categories": {
            get: {
                tags: ["Categories"],
                summary: "Daftar kategori",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Kategori ditemukan",
                        content: { "application/json": { example: { success: true, message: "Daftar Kategori" } } },
                    },
                    ...securedResponses,
                },
            },
            post: {
                tags: ["Categories"],
                summary: "Tambah kategori (admin)",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryBody" } } },
                },
                responses: {
                    "201": {
                        description: "Kategori dibuat",
                        content: { "application/json": { example: { success: true, message: "Kategori berhasil ditambahkan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/categories/search": {
            get: {
                tags: ["Categories"],
                summary: "Cari kategori",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "keyword", in: "query", required: true, schema: { type: "string" } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Pencarian kategori",
                        content: { "application/json": { example: { success: true, message: "Hasil Pencarian Kategori" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/categories/{id}": {
            get: {
                tags: ["Categories"],
                summary: "Detail kategori",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Kategori ditemukan",
                        content: { "application/json": { example: { success: true, message: "Kategori Ditemukan" } } },
                    },
                    ...securedResponses,
                },
            },
            put: {
                tags: ["Categories"],
                summary: "Update kategori (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryBody" } } },
                },
                responses: {
                    "200": {
                        description: "Kategori diperbarui",
                        content: { "application/json": { example: { success: true, message: "Kategori Berhasil di Update" } } },
                    },
                    ...securedResponses,
                },
            },
            delete: {
                tags: ["Categories"],
                summary: "Hapus kategori (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Kategori dihapus",
                        content: { "application/json": { example: { success: true, message: "Kategori Berhasil di Hapus" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/orders": {
            get: {
                tags: ["Orders"],
                summary: "Daftar order",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Order ditemukan",
                        content: { "application/json": { example: { success: true, message: "Daftar Order" } } },
                    },
                    ...securedResponses,
                },
            },
            post: {
                tags: ["Orders"],
                summary: "Buat order",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/OrderBody" } } },
                },
                responses: {
                    "201": {
                        description: "Order dibuat",
                        content: { "application/json": { example: { success: true, message: "Order berhasil ditambahkan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/orders/search": {
            get: {
                tags: ["Orders"],
                summary: "Cari order (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "keyword", in: "query", required: true, schema: { type: "string" } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Pencarian order",
                        content: { "application/json": { example: { success: true, message: "Hasil Pencarian Order" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/orders/{id}": {
            get: {
                tags: ["Orders"],
                summary: "Detail order",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Order ditemukan",
                        content: { "application/json": { example: { success: true, message: "Order Ditemukan" } } },
                    },
                    ...securedResponses,
                },
            },
            put: {
                tags: ["Orders"],
                summary: "Update order (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/OrderBody" } } },
                },
                responses: {
                    "200": {
                        description: "Order diupdate",
                        content: { "application/json": { example: { success: true, message: "Order Berhasil di Update" } } },
                    },
                    ...securedResponses,
                },
            },
            delete: {
                tags: ["Orders"],
                summary: "Hapus order (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Order dihapus",
                        content: { "application/json": { example: { success: true, message: "Order Berhasil di Hapus" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/products": {
            get: bookListOperation,
            post: {
                tags: ["Books"],
                summary: "Tambah buku baru (admin)",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/ProductBody" },
                                    {
                                        type: "object",
                                        properties: {
                                            cover: { type: "string", format: "binary" },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Buku berhasil dibuat",
                        content: { "application/json": { example: { success: true, message: "Produk berhasil ditambahkan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/products/search": {
            get: {
                tags: ["Books"],
                summary: "Cari buku",
                parameters: [
                    { name: "keyword", in: "query", required: true, schema: { type: "string" } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Hasil pencarian buku",
                        content: { "application/json": { example: { success: true, message: "Hasil Pencarian Produk" } } },
                    },
                    ...publicResponses,
                },
            },
        },
        "/api/products/{id}": {
            get: {
                tags: ["Books"],
                summary: "Detail buku",
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail buku ditemukan",
                        content: { "application/json": { example: { success: true, message: "Produk Ditemukan" } } },
                    },
                    ...publicResponses,
                },
            },
            put: {
                tags: ["Books"],
                summary: "Update buku (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                allOf: [
                                    { $ref: "#/components/schemas/ProductBody" },
                                    {
                                        type: "object",
                                        properties: {
                                            cover: { type: "string", format: "binary" },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Buku diupdate",
                        content: { "application/json": { example: { success: true, message: "Produk Berhasil di Update" } } },
                    },
                    ...securedResponses,
                },
            },
            delete: {
                tags: ["Books"],
                summary: "Hapus buku (admin)",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Buku dihapus",
                        content: { "application/json": { example: { success: true, message: "Produk Berhasil di Hapus (Soft Delete)" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/books": { get: bookListOperation },
        "/api/books/search": {
            get: {
                tags: ["Books"],
                summary: "Alias pencarian buku",
                description: "Alias endpoint dari /api/products/search",
                parameters: [
                    { name: "keyword", in: "query", required: true, schema: { type: "string" } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Hasil pencarian buku",
                        content: { "application/json": { example: { success: true, message: "Hasil Pencarian Produk" } } },
                    },
                    ...publicResponses,
                },
            },
        },
        "/api/books/{id}": {
            get: {
                tags: ["Books"],
                summary: "Alias detail buku",
                description: "Alias endpoint dari /api/products/{id}",
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail buku ditemukan",
                        content: { "application/json": { example: { success: true, message: "Produk Ditemukan" } } },
                    },
                    ...publicResponses,
                },
            },
        },
        "/books": { get: bookListOperation },
        "/books/search": {
            get: {
                tags: ["Books"],
                summary: "Alias pencarian buku",
                description: "Alias endpoint dari /api/products/search",
                parameters: [
                    { name: "keyword", in: "query", required: true, schema: { type: "string" } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Hasil pencarian buku",
                        content: { "application/json": { example: { success: true, message: "Hasil Pencarian Produk" } } },
                    },
                    ...publicResponses,
                },
            },
        },
        "/books/{id}": {
            get: {
                tags: ["Books"],
                summary: "Alias detail buku",
                description: "Alias endpoint dari /api/products/{id}",
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail buku ditemukan",
                        content: { "application/json": { example: { success: true, message: "Produk Ditemukan" } } },
                    },
                    ...publicResponses,
                },
            },
        },
        "/api/borrows": {
            get: {
                tags: ["Borrow Records"],
                summary: "Daftar transaksi peminjaman",
                description: "Admin bisa filter tanggal, status, memberName. Member otomatis hanya data miliknya.",
                security: [{ BearerAuth: [] }],
                parameters: borrowRecordQueryParameters,
                responses: {
                    "200": {
                        description: "Data peminjaman ditemukan",
                        content: { "application/json": { example: { success: true, message: "Daftar Riwayat Peminjaman" } } },
                    },
                    ...securedResponses,
                },
            },
            post: {
                tags: ["Borrow Records"],
                summary: "Buat transaksi peminjaman",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/BorrowCreateBody" } } },
                },
                responses: {
                    "201": {
                        description: "Peminjaman dibuat",
                        content: { "application/json": { example: { success: true, message: "Peminjaman berhasil dibuat" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/borrows/{id}": {
            get: {
                tags: ["Borrow Records"],
                summary: "Detail transaksi peminjaman",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail peminjaman ditemukan",
                        content: { "application/json": { example: { success: true, message: "Detail Peminjaman Ditemukan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/borrows/{id}/return": {
            patch: {
                tags: ["Borrow Records"],
                summary: "Kembalikan buku dari transaksi",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Buku berhasil dikembalikan",
                        content: { "application/json": { example: { success: true, message: "Buku berhasil dikembalikan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/borrow-records": {
            get: {
                tags: ["Borrow Records"],
                summary: "Alias daftar borrow records",
                description: "Alias endpoint dari /api/borrows",
                security: [{ BearerAuth: [] }],
                parameters: borrowRecordQueryParameters,
                responses: {
                    "200": {
                        description: "Data peminjaman ditemukan",
                        content: { "application/json": { example: { success: true, message: "Daftar Riwayat Peminjaman" } } },
                    },
                    ...securedResponses,
                },
            },
            post: {
                tags: ["Borrow Records"],
                summary: "Alias buat borrow record",
                description: "Alias endpoint dari /api/borrows",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/BorrowCreateBody" } } },
                },
                responses: {
                    "201": {
                        description: "Peminjaman dibuat",
                        content: { "application/json": { example: { success: true, message: "Peminjaman berhasil dibuat" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/borrow-records/{id}": {
            get: {
                tags: ["Borrow Records"],
                summary: "Alias detail borrow record",
                description: "Alias endpoint dari /api/borrows/{id}",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail peminjaman ditemukan",
                        content: { "application/json": { example: { success: true, message: "Detail Peminjaman Ditemukan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/borrow-records/{id}/return": {
            patch: {
                tags: ["Borrow Records"],
                summary: "Alias pengembalian borrow record",
                description: "Alias endpoint dari /api/borrows/{id}/return",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Buku berhasil dikembalikan",
                        content: { "application/json": { example: { success: true, message: "Buku berhasil dikembalikan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/borrow-records": {
            get: {
                tags: ["Borrow Records"],
                summary: "Alias publik daftar borrow records",
                description: "Alias endpoint dari /api/borrows",
                security: [{ BearerAuth: [] }],
                parameters: borrowRecordQueryParameters,
                responses: {
                    "200": {
                        description: "Data peminjaman ditemukan",
                        content: { "application/json": { example: { success: true, message: "Daftar Riwayat Peminjaman" } } },
                    },
                    ...securedResponses,
                },
            },
            post: {
                tags: ["Borrow Records"],
                summary: "Alias publik buat borrow record",
                description: "Alias endpoint dari /api/borrows",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/BorrowCreateBody" } } },
                },
                responses: {
                    "201": {
                        description: "Peminjaman dibuat",
                        content: { "application/json": { example: { success: true, message: "Peminjaman berhasil dibuat" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/borrow-records/{id}": {
            get: {
                tags: ["Borrow Records"],
                summary: "Alias publik detail borrow record",
                description: "Alias endpoint dari /api/borrows/{id}",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Detail peminjaman ditemukan",
                        content: { "application/json": { example: { success: true, message: "Detail Peminjaman Ditemukan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/borrow-records/{id}/return": {
            patch: {
                tags: ["Borrow Records"],
                summary: "Alias publik return borrow record",
                description: "Alias endpoint dari /api/borrows/{id}/return",
                security: [{ BearerAuth: [] }],
                parameters: [pathIdParameter],
                responses: {
                    "200": {
                        description: "Buku berhasil dikembalikan",
                        content: { "application/json": { example: { success: true, message: "Buku berhasil dikembalikan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/borrow": {
            post: {
                tags: ["Member Borrowing"],
                summary: "Member meminjam buku",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/BorrowBooksBody" } } },
                },
                responses: {
                    "201": {
                        description: "Peminjaman member berhasil",
                        content: { "application/json": { example: { success: true, message: "Peminjaman berhasil dibuat" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/return": {
            post: {
                tags: ["Member Borrowing"],
                summary: "Member mengembalikan buku",
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/ReturnBooksBody" } } },
                },
                responses: {
                    "200": {
                        description: "Pengembalian berhasil",
                        content: { "application/json": { example: { success: true, message: "Buku berhasil dikembalikan" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/my-borrowings": {
            get: {
                tags: ["Member Borrowing"],
                summary: "Riwayat peminjaman milik member",
                security: [{ BearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                ],
                responses: {
                    "200": {
                        description: "Riwayat member ditemukan",
                        content: { "application/json": { example: { success: true, message: "Riwayat peminjaman saya" } } },
                    },
                    ...securedResponses,
                },
            },
        },
        "/api/admin/stats": {
            get: {
                tags: ["Admin"],
                summary: "Statistik perpustakaan (admin)",
                description: "Menampilkan total buku tersedia, total transaksi aktif (belum dikembalikan), dan buku paling populer.",
                security: [{ BearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Statistik admin berhasil diambil",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Statistik admin berhasil diambil",
                                    data: {
                                        totalAvailableBooks: 41,
                                        activeBorrowTransactions: 12,
                                        mostPopularBook: {
                                            id: "30fbf302-b0b6-4d38-b47f-5064edbbdc77",
                                            name: "Atomic Habits",
                                            author: "James Clear",
                                            totalBorrowed: 27,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    ...securedResponses,
                },
            },
        },
        "/admin/stats": {
            get: {
                tags: ["Admin"],
                summary: "Alias statistik admin",
                description: "Alias endpoint dari /api/admin/stats",
                security: [{ BearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Statistik admin berhasil diambil",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Statistik admin berhasil diambil",
                                },
                            },
                        },
                    },
                    ...securedResponses,
                },
            },
        },
    },
};
export { openApiSpec };
//# sourceMappingURL=openapi.js.map
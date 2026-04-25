declare const openApiSpec: {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
    };
    servers: {
        url: string;
    }[];
    tags: {
        name: string;
        description: string;
    }[];
    components: {
        securitySchemes: {
            BearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
            };
        };
        schemas: {
            RegisterBody: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    password: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                };
            };
            LoginBody: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    password: {
                        type: string;
                        example: string;
                    };
                };
            };
            UserBody: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                    };
                    email: {
                        type: string;
                        format: string;
                    };
                    password: {
                        type: string;
                    };
                    role: {
                        type: string;
                        enum: string[];
                    };
                };
            };
            CategoryBody: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                        example: string;
                    };
                };
            };
            OrderBody: {
                type: string;
                required: string[];
                properties: {
                    total: {
                        type: string;
                        example: number;
                    };
                    userId: {
                        type: string;
                        format: string;
                    };
                    status: {
                        type: string;
                        enum: string[];
                    };
                };
            };
            ProductBody: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                    };
                    author: {
                        type: string;
                    };
                    publishedYear: {
                        type: string;
                        example: number;
                    };
                    coverImageUrl: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    price: {
                        type: string;
                        example: number;
                    };
                    stock: {
                        type: string;
                        example: number;
                    };
                    categoryId: {
                        type: string;
                        format: string;
                    };
                };
            };
            BorrowCreateBody: {
                type: string;
                required: string[];
                properties: {
                    userId: {
                        type: string;
                        format: string;
                    };
                    dueDate: {
                        type: string;
                        format: string;
                    };
                    notes: {
                        type: string;
                    };
                    items: {
                        type: string;
                        minItems: number;
                        items: {
                            type: string;
                            required: string[];
                            properties: {
                                productId: {
                                    type: string;
                                    format: string;
                                };
                                quantity: {
                                    type: string;
                                    minimum: number;
                                };
                            };
                        };
                    };
                };
            };
            BorrowBooksBody: {
                type: string;
                minItems: number;
                items: {
                    type: string;
                    required: string[];
                    properties: {
                        bookId: {
                            type: string;
                            format: string;
                        };
                        qty: {
                            type: string;
                            minimum: number;
                        };
                    };
                };
            };
            ReturnBooksBody: {
                type: string;
                required: string[];
                properties: {
                    borrowId: {
                        type: string;
                        format: string;
                    };
                };
            };
        };
    };
    paths: {
        "/": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/auth/register": {
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        role: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/auth/login": {
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        token: string;
                                        user: {
                                            id: string;
                                            name: string;
                                            email: string;
                                            role: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/auth/register": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/auth/login": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/users": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        users: never[];
                                        total: number;
                                        page: number;
                                        limit: number;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        id: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/users/search": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        default?: never;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    required?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        users: never[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/users/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/categories": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/categories/search": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        default?: never;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    required?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/categories/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/orders": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/orders/search": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        default?: never;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    required?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/orders/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/products": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        enum?: never;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: never;
                    };
                    description?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        products: {
                                            id: string;
                                            name: string;
                                            stock: number;
                                        }[];
                                        total: number;
                                        page: number;
                                        limit: number;
                                        categories: string[];
                                        inStock: boolean;
                                        yearRange: {
                                            startYear: number;
                                            endYear: number;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "multipart/form-data": {
                            schema: {
                                allOf: ({
                                    $ref: string;
                                    type?: never;
                                    properties?: never;
                                } | {
                                    type: string;
                                    properties: {
                                        cover: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                    $ref?: never;
                                })[];
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/products/search": {
            get: {
                tags: string[];
                summary: string;
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        default?: never;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    required?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/products/{id}": {
            get: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "multipart/form-data": {
                            schema: {
                                allOf: ({
                                    $ref: string;
                                    type?: never;
                                    properties?: never;
                                } | {
                                    type: string;
                                    properties: {
                                        cover: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                    $ref?: never;
                                })[];
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/books": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        enum?: never;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: never;
                    };
                    description?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        products: {
                                            id: string;
                                            name: string;
                                            stock: number;
                                        }[];
                                        total: number;
                                        page: number;
                                        limit: number;
                                        categories: string[];
                                        inStock: boolean;
                                        yearRange: {
                                            startYear: number;
                                            endYear: number;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/books/search": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        default?: never;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    required?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/books/{id}": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/books": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        enum?: never;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: never;
                    };
                    description?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        products: {
                                            id: string;
                                            name: string;
                                            stock: number;
                                        }[];
                                        total: number;
                                        page: number;
                                        limit: number;
                                        categories: string[];
                                        inStock: boolean;
                                        yearRange: {
                                            startYear: number;
                                            endYear: number;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/books/search": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        default?: never;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    required?: never;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/books/{id}": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/borrows": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        format?: never;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        format: string;
                        default?: never;
                        enum?: never;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: never;
                        format?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        format?: never;
                        enum?: never;
                    };
                    description: string;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/borrows/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/borrows/{id}/return": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/borrow-records": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        format?: never;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        format: string;
                        default?: never;
                        enum?: never;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: never;
                        format?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        format?: never;
                        enum?: never;
                    };
                    description: string;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/borrow-records/{id}": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/borrow-records/{id}/return": {
            patch: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/borrow-records": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        format?: never;
                        enum?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        format: string;
                        default?: never;
                        enum?: never;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: never;
                        format?: never;
                    };
                    description?: never;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: never;
                        format?: never;
                        enum?: never;
                    };
                    description: string;
                })[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/borrow-records/{id}": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/borrow-records/{id}/return": {
            patch: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/borrow": {
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/return": {
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/my-borrowings": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/api/admin/stats": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    data: {
                                        totalAvailableBooks: number;
                                        activeBorrowTransactions: number;
                                        mostPopularBook: {
                                            id: string;
                                            name: string;
                                            author: string;
                                            totalBorrowed: number;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/stats": {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                    errors: {
                                        field: string;
                                        message: string;
                                    }[];
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "404": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                example: {
                                    success: boolean;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export { openApiSpec };
//# sourceMappingURL=openapi.d.ts.map
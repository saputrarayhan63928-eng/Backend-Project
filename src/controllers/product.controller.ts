import { type Request, type Response } from "express";
import { ProductService } from "../services/product.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

const parseNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return Number(value);
  return undefined;
};

const buildProductPayload = (req: Request, includeOptional: boolean) => {
  const payload: {
    name?: string;
    author?: string;
    publishedYear?: number;
    coverImageUrl?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
  } = {};

  if (typeof req.body.name === "string") payload.name = req.body.name;
  if (typeof req.body.author === "string") payload.author = req.body.author;
  if (typeof req.body.description === "string") {
    payload.description = req.body.description;
  }
  if (typeof req.body.categoryId === "string") payload.categoryId = req.body.categoryId;

  const publishedYear = parseNumber(req.body.publishedYear);
  if (typeof publishedYear === "number" && !Number.isNaN(publishedYear)) {
    payload.publishedYear = publishedYear;
  }

  const price = parseNumber(req.body.price);
  if (typeof price === "number" && !Number.isNaN(price)) payload.price = price;

  const stock = parseNumber(req.body.stock);
  if (typeof stock === "number" && !Number.isNaN(stock)) payload.stock = stock;

  if (req.file?.filename) {
    payload.coverImageUrl = `/public/uploads/${req.file.filename}`;
  } else if (includeOptional && typeof req.body.coverImageUrl === "string") {
    payload.coverImageUrl = req.body.coverImageUrl;
  }

  return payload;
};

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const sortBy =
      req.query.sortBy === "publishedYear" || req.query.sortBy === "title"
        ? req.query.sortBy
        : undefined;
    const sortOrder =
      req.query.sortOrder === "asc" || req.query.sortOrder === "desc"
        ? req.query.sortOrder
        : undefined;

    const listParams: {
      page: number;
      limit: number;
      search?: string;
      sortBy?: "title" | "publishedYear";
      sortOrder?: "asc" | "desc";
    } = { page, limit };
    if (search) listParams.search = search;
    if (sortBy) listParams.sortBy = sortBy;
    if (sortOrder) listParams.sortOrder = sortOrder;

    const result = await ProductService.getAll(listParams);
    return successResponse(res, 'Daftar Buku', result);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const product = await ProductService.getById(id);
    return successResponse(res, 'Produk Ditemukan', product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const payload = buildProductPayload(req, true);
    const product = await ProductService.create(payload as {
      name: string;
      author?: string;
      publishedYear?: number;
      coverImageUrl?: string;
      description?: string;
      price: number;
      stock: number;
      categoryId?: string;
    });
    return successResponse(res, 'Produk berhasil ditambahkan', product, null, 201);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const payload = buildProductPayload(req, true);
    const product = await ProductService.update(id, payload);
    return successResponse(res, 'Produk Berhasil di Update', product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') throw new Error('ID is required and must be string');
    const product = await ProductService.delete(id);
    return successResponse(res, 'Produk Berhasil di Hapus (Soft Delete)', product);
});

export const searchProduct = asyncHandler(async (req: Request, res: Response) => {
    const { keyword } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await ProductService.search(keyword as string, page, limit);
    return successResponse(res, 'Hasil Pencarian Produk', result);
});

import request from "supertest";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import app from "../src/app";
import { ProductService } from "../src/services/product.service";
import { signToken } from "../src/utils/jwt";

const adminToken = signToken({
  userId: "22f53e66-a8e2-4f52-a8be-eb81df0f2ebc",
  email: "admin@mail.com",
  role: "ADMIN",
});

describe("POST /api/products", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("happy path: admin berhasil menambahkan buku", async () => {
    const createSpy = jest.spyOn(ProductService, "create").mockResolvedValue({
      id: "adb4b093-7d5d-4507-95a0-4358ef88754f",
      name: "Clean Code",
      author: "Robert C. Martin",
      publishedYear: 2008,
      coverImageUrl: null,
      description: "A handbook of agile software craftsmanship",
      price: 120000,
      stock: 7,
      categoryId: null,
      category: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z"),
      deletedAt: null,
    });

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Clean Code",
        author: "Robert C. Martin",
        publishedYear: 2008,
        description: "A handbook of agile software craftsmanship",
        price: 120000,
        stock: 7,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Produk berhasil ditambahkan");
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it("negative path: gagal menambahkan buku jika validasi body salah", async () => {
    const createSpy = jest.spyOn(ProductService, "create");

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "AB",
        price: -10,
        stock: -1,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validasi Gagal");
    expect(createSpy).not.toHaveBeenCalled();
  });
});

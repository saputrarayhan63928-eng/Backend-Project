import request from "supertest";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import app from "../src/app";
import { AuthService } from "../src/services/auth.service";

describe("POST /api/auth/login", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("happy path: login berhasil dengan kredensial valid", async () => {
    const loginSpy = jest.spyOn(AuthService, "login").mockResolvedValue({
      user: {
        id: "fca88be4-7b1f-40f7-ae79-e8496c2842ef",
        name: "Admin",
        email: "admin@mail.com",
        role: "ADMIN",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
      },
      token: "dummy-jwt-token",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "admin@mail.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login berhasil");
    expect(response.body.data.token).toBe("dummy-jwt-token");
    expect(loginSpy).toHaveBeenCalledWith({
      email: "admin@mail.com",
      password: "password123",
    });
  });

  it("negative path: login gagal jika payload tidak valid", async () => {
    const loginSpy = jest.spyOn(AuthService, "login");

    const response = await request(app).post("/api/auth/login").send({
      email: "email-salah",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validasi Gagal");
    expect(loginSpy).not.toHaveBeenCalled();
  });
});

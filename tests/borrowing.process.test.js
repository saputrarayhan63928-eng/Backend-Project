import request from "supertest";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import app from "../src/app";
import { BorrowService } from "../src/services/borrow.service";
import { signToken } from "../src/utils/jwt";
import { AppError } from "../src/utils/app.error";
const memberToken = signToken({
    userId: "5a60f4c1-b20e-4d54-9965-5d3fc4258f68",
    email: "member@mail.com",
    role: "MEMBER",
});
describe("POST /borrow", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("happy path: member berhasil memproses peminjaman", async () => {
        const bookId = "a078bc3a-6626-44f0-982f-61876652817f";
        const createSpy = jest.spyOn(BorrowService, "create").mockResolvedValue({
            id: "fdac8570-716f-4548-a53a-e5ca2d496362",
            userId: "5a60f4c1-b20e-4d54-9965-5d3fc4258f68",
            status: "BORROWED",
            dueDate: null,
            returnedAt: null,
            notes: null,
            createdAt: new Date("2026-01-01T00:00:00.000Z"),
            updatedAt: new Date("2026-01-01T00:00:00.000Z"),
            deletedAt: null,
            user: {
                id: "5a60f4c1-b20e-4d54-9965-5d3fc4258f68",
                name: "Member",
                email: "member@mail.com",
                role: "MEMBER",
            },
            items: [],
        });
        const response = await request(app)
            .post("/borrow")
            .set("Authorization", `Bearer ${memberToken}`)
            .send([{ bookId, qty: 2 }]);
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Peminjaman berhasil dibuat");
        expect(createSpy).toHaveBeenCalledWith({
            items: [{ productId: bookId, quantity: 2 }],
        }, expect.objectContaining({
            userId: "5a60f4c1-b20e-4d54-9965-5d3fc4258f68",
            role: "MEMBER",
        }));
    });
    it("negative path: gagal memproses peminjaman saat stok habis", async () => {
        jest
            .spyOn(BorrowService, "create")
            .mockRejectedValue(new AppError("Stok buku tidak cukup untuk productId a078bc3a-6626-44f0-982f-61876652817f", 400));
        const response = await request(app)
            .post("/borrow")
            .set("Authorization", `Bearer ${memberToken}`)
            .send([{ bookId: "a078bc3a-6626-44f0-982f-61876652817f", qty: 2 }]);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain("Stok buku tidak cukup");
    });
});
//# sourceMappingURL=borrowing.process.test.js.map
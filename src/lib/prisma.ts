import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { AppError } from "../utils/app.error";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new AppError("DATABASE_URL belum diset di environment", 500);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

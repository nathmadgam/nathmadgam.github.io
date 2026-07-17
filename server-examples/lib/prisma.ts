import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

type PrismaGlobal = typeof globalThis & { cynexPrisma?: PrismaClient };
const globalForPrisma = globalThis as PrismaGlobal;

export function getPrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured.");

  if (!globalForPrisma.cynexPrisma) {
    const adapter = new PrismaPg({
      connectionString,
      connectionTimeoutMillis: 5_000,
    });
    globalForPrisma.cynexPrisma = new PrismaClient({ adapter });
  }

  return globalForPrisma.cynexPrisma;
}

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // The placeholder allows `prisma generate` to run before a real .env is added.
    url: process.env.DATABASE_URL ?? "postgresql://user:password@localhost:5432/cynex",
  },
});

import { defineConfig, env } from "prisma/config";
import 'dotenv/config';

export default defineConfig({
  schema: "core/prisma/schema.prisma",
  migrations: {
    path: "core/prisma/migrations",
  },
  datasource: {
    url: env('DATABASE_URL')
  },
});

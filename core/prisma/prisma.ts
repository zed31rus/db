import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as prisma from '#core/generated/prisma/client.js'
import configEnv from '#config/env.config.js'

const pool = new pg.Pool({connectionString: configEnv.DATABASE_URL})
const adapter = new PrismaPg(pool, {schema: "auth"})

export const prismaClient = new prisma.PrismaClient({ adapter });
export * from '#core/generated/prisma/client.js';
export * from '#core/generated/prisma/internal/prismaNamespace.js'

import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as prisma from '#generated/prisma/client.js'
import configEnv from '#config/env.config'

const pool = new pg.Pool({connectionString: configEnv.DATABASE_URL})
const adapter = new PrismaPg(pool)

export const prismaClient = new prisma.PrismaClient({ adapter });
export * from '#generated/prisma/client.js'

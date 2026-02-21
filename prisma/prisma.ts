import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as prisma from '../generated/prisma/client.ts'
import 'dotenv/config'

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL})
const adapter = new PrismaPg(pool)

export const prismaClient = new prisma.PrismaClient({ adapter });
export * from '../generated/prisma/client.ts'

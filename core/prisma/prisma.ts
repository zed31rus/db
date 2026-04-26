import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as prisma from '#core/generated/prisma/client.js'
import Base, { BaseArgs } from "../base/base.js";

export default class Prisma extends Base {
    client: prisma.PrismaClient
    
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs);
        const pool = new pg.Pool({connectionString: this.config.env.DATABASE_URL})
        const adapter = new PrismaPg(pool, {schema: "auth"})

        this.client = new prisma.PrismaClient({ adapter });
    }

}
export * from '#core/generated/prisma/client.js';
export * from '#core/generated/prisma/internal/prismaNamespace.js'

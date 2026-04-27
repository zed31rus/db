import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as prisma from '#core/generated/prisma/client.js'
import users from "./user/user.class.js";
import refreshToken from "./refreshToken/refreshToken.class.js";
import oauthAccount from "./oauth/oauth.class.js";
import verificationCode from "./verificationCode/verificationCode.class.js";
import Base, { BaseArgs } from "#core/base/base.js";

class DB extends Base {
    client: prisma.PrismaClient
    static prisma = prisma.Prisma
    
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs);
        const pool = new pg.Pool({connectionString: this.config.env.DATABASE_URL})
        const adapter = new PrismaPg(pool, {schema: "auth"})
        this.client = new prisma.PrismaClient({ adapter });
    }

    users = new users();
    refreshToken = new refreshToken();
    oauthAccount = new oauthAccount();
    verificationCode = new verificationCode();
}

namespace DB {
    export type PrismaClient = prisma.PrismaClient;
    export type User = prisma.User;
    export type RefreshToken = prisma.RefreshToken;
    export type VerificationCode = prisma.VerificationCode;
    export type OauthAccount = prisma.OauthAccount;
    export type TransactionClient = prisma.Prisma.TransactionClient;
    export type OauthAccountCreateWithoutUserInput = prisma.Prisma.OauthAccountCreateWithoutUserInput;
    export type OauthAccountUpdateInput = prisma.Prisma.OauthAccountUpdateInput;
    export type InputJsonValue = prisma.Prisma.InputJsonValue;
    export type UserModel = prisma.Prisma.UserModel;
    export type RefreshTokenModel = prisma.Prisma.RefreshTokenModel;
    export type JsonObject = prisma.Prisma.JsonObject;
    export type VerificationCodeModel = prisma.Prisma.VerificationCodeModel;
}

export default DB;
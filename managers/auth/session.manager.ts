import { prismaClient, User } from "#prisma/prisma";
import { RefreshExpires } from "#lib/refreshToken/refreshToken.lib";
import { AccessExpires } from "#lib/jwt/jwt.lib";
import { TransactionClient } from "#generated/prisma/internal/prismaNamespace.ts";
import BaseManager from "#base/manager.base";

export type SessionType = {
    refresh: {
        token: string,
        expires: RefreshExpires
    },
    access: {
        token : string,
        expires: AccessExpires
    }
}

export default class SessionManager extends BaseManager {
    async createSession(user: User, tx: TransactionClient = prismaClient) {

        const rawUser = user;
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        const refreshTokenExpires = this.lib.refreshToken.getExpires();
        const refreshToken = this.lib.refreshToken.create();
        const refreshTokenHashed = await this.lib.hash.sha256.create(refreshToken);
        const refreshTokenHashedRecord = await this.repository.db.refreshToken.create.create(tx, refreshTokenHashed, refreshTokenExpires.atTime, rawUser)

        const accessTokenExpires = this.lib.jwt.getExpires();
        const accessToken = await this.lib.jwt.create(publicUser, accessTokenExpires.time, process.env.JWT_SECRET!);
        
        return { refresh: { token: refreshToken, expires: refreshTokenExpires }, access: {token: accessToken, expires: accessTokenExpires}}
    }
}
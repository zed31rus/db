import { RefreshExpires } from "#core/lib/refreshToken/refreshToken.lib.js";
import { AccessExpires } from "#core/lib/jwt/jwt.lib.js";
import BaseManager from "#core/base/manager.base.js";
import { TransactionClient, User } from "#core/prisma/prisma.js";
import configEnv from "#config/env.config.js"

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
    async createSession(user: User, tx: TransactionClient) {

        const rawUser = user;
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        const refreshTokenExpires = this.lib.refreshToken.getExpires();
        const refreshToken = this.lib.refreshToken.create();
        const refreshTokenHashed = await this.lib.hash.sha256.create(refreshToken);
        const refreshTokenHashedRecord = await this.repository.db.refreshToken.create.create(tx, refreshTokenHashed, refreshTokenExpires.atTime, rawUser)

        const accessTokenExpires = this.lib.jwt.getExpires();
        const accessToken = await this.lib.jwt.create(publicUser, accessTokenExpires.time, configEnv.JWT_SECRET);
        
        return { refresh: { token: refreshToken, expires: refreshTokenExpires }, access: {token: accessToken, expires: accessTokenExpires}}
    }
}
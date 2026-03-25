import { PublicUser } from "#lib/selector/user.selector";
import { prismaClient, User } from "#prisma/prisma";
import RefreshToken from "#lib/refreshToken/refreshToken.lib";
import Hash from "#lib/hash/hash.lib";
import UserSelector from "#lib/selector/user.selector";
import JWT from "#lib/jwt/jwt.lib";
import db from "#repo/db/db";
import { TransactionClient } from "#generated/prisma/internal/prismaNamespace.ts";

export default class SessionManager {
    static async createSession(user: User, tx: TransactionClient = prismaClient) {

        const rawUser = user;
        const publicUser = UserSelector.toPublicJSON(rawUser);

        const refreshTokenExpires = RefreshToken.getExpires();
        const refreshToken = RefreshToken.create();
        const refreshTokenHashed = await Hash.sha256.create(refreshToken);
        const refreshTokenHashedRecord = await db.refreshToken.create.create(tx, refreshTokenHashed, refreshTokenExpires.atTime, rawUser)

        const accessTokenExpires = JWT.getExpires();
        const accessToken = await JWT.create(publicUser, accessTokenExpires.time, process.env.JWT_SECRET!);
        
        return { refresh: { token: refreshToken, expires: refreshTokenExpires }, access: {token: accessToken, expires: accessTokenExpires}}
    }
}
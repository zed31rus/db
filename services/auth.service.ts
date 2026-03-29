import hash from "#lib/hash/hash.lib";
import { prismaClient } from '#prisma/prisma';
import db from '#repo/db/db';
import SessionManager from "#managers/auth/session.manager";
import UserSelector from "#lib/selector/user.selector";
import RefreshToken from "#lib/refreshToken/refreshToken.lib";

export default class AuthServices {

    static async register(login: string, email: string, password: string, nickname: string) {
    const hashedPassword = await hash.bcrypt.create(password, 10);
    const rawUser = await db.users.create.createUser(prismaClient, nickname, login, email, hashedPassword);
    
    const publicUser = UserSelector.toPublicJSON(rawUser);

    return { user: publicUser };
}

    static async login(login: string, password: string) {

        const rawUser = await db.users.get.byLogin(prismaClient, login);
        const publicUser = UserSelector.toPublicJSON(rawUser);
        const isPasswordCorrect = await hash.bcrypt.compare(password, rawUser.passwordHash!);
        if (!isPasswordCorrect) throw new Error("Invalid credentials");

        const session = await SessionManager.createSession(rawUser);

        return { user: publicUser, ...session };
    }

    static async refresh(incomingRefreshToken: string) {
        const hashedIncomingToken = await hash.sha256.create(incomingRefreshToken);
            const IncomingRefreshTokenRecord = await db.refreshToken.get.byHashedToken(prismaClient, hashedIncomingToken);

            const expired = RefreshToken.checkExpired(IncomingRefreshTokenRecord);
            if (expired) {
                await db.refreshToken.delete.delete(prismaClient, IncomingRefreshTokenRecord);
                throw new Error("Refresh token expired");
            }

            const rawUser = IncomingRefreshTokenRecord.user;
            const publicUser = UserSelector.toPublicJSON(rawUser);
            
            const session = await prismaClient.$transaction(async (tx) => {
                await db.refreshToken.delete.delete(tx, IncomingRefreshTokenRecord);

                const session = await SessionManager.createSession(rawUser, tx);
                return session;
            })
            
            return { user: publicUser, ...session };
    }
}

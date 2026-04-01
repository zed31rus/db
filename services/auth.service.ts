import { prismaClient } from '#prisma/prisma';
import BaseService from "#base/service.base";
import ApiError from '#errors/api.errors';
import { PrismaClientKnownRequestError } from '#generated/prisma/internal/prismaNamespace.js';


export default class AuthService extends BaseService {

    async register(login: string, email: string, password: string, nickname: string) {

        const hashedPassword = await this.lib.hash.bcrypt.create(password, 10);
        
        const rawUser = await this.repository.db.users.create.createUser(prismaClient, nickname, login, email, hashedPassword);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        return { user: publicUser };
    }

    async login(login: string, password: string) {

        const rawUser = await this.repository.db.users.get.byLogin(prismaClient, login);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);
        const isPasswordCorrect = await this.lib.hash.bcrypt.compare(password, rawUser.passwordHash!);
        if (!isPasswordCorrect) throw ApiError.Unauthorized("Invalid credentials");

        const session = await this.manager.session.createSession(rawUser);

        return { user: personalUser, ...session };

    }

    async refresh(incomingRefreshToken: string) {

        const hashedIncomingToken = await this.lib.hash.sha256.create(incomingRefreshToken);
        const IncomingRefreshTokenRecord = await this.repository.db.refreshToken.get.byHashedToken(prismaClient, hashedIncomingToken);

        const expired = this.lib.refreshToken.checkExpired(IncomingRefreshTokenRecord);
        if (expired) {
            await this.repository.db.refreshToken.delete.delete(prismaClient, IncomingRefreshTokenRecord);
            throw ApiError.Unauthorized();
        }

        const rawUser = IncomingRefreshTokenRecord.user;
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);
        
        const session = await prismaClient.$transaction(async (tx) => {
            await this.repository.db.refreshToken.delete.delete(tx, IncomingRefreshTokenRecord);

            const session = await this.manager.session.createSession(rawUser, tx);
            return session;

        })
        
        return { user: publicUser, ...session };
    }

    async logOut(incomingRefreshToken: string) {

        const hashedIncomingToken = await this.lib.hash.sha256.create(incomingRefreshToken);
        const IncomingRefreshTokenRecord = await this.repository.db.refreshToken.get.byHashedToken(prismaClient, hashedIncomingToken);
        await this.repository.db.refreshToken.delete.delete(prismaClient, IncomingRefreshTokenRecord);
        return {};

    }
}

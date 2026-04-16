import { prismaClient } from '#prisma/prisma';
import BaseService from "#base/service.base";
import ApiError from '#errors/api.errors';

export default class AuthService extends BaseService {

    async register(login: string, email: string, password: string, nickname: string) {

        const hashedPassword = await this.lib.hash.bcrypt.create(password, 10);
        
        const rawUser = await this.repository.db.users.create.createUser(prismaClient, nickname, login, email, hashedPassword, false);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        return { user: publicUser };
    }

    async login(login: string, password: string) {

        const rawUser = await this.repository.db.users.get.orThrow.byLogin(prismaClient, login);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);
        const isPasswordCorrect = await this.lib.hash.bcrypt.compare(password, rawUser.passwordHash!);
        if (!isPasswordCorrect) throw ApiError.Unauthorized("Invalid credentials");

        const session = await this.manager.session.createSession(rawUser);

        return { user: personalUser, ...session };

    }

    async refresh(incomingRefreshToken: string) {

        const hashedIncomingToken = await this.lib.hash.sha256.create(incomingRefreshToken);
        const incomingRefreshTokenRecord = await this.repository.db.refreshToken.get.orThrow.byHashedToken(prismaClient, hashedIncomingToken);

        const expired = this.lib.refreshToken.checkExpired(incomingRefreshTokenRecord);
        if (expired) {
            await this.repository.db.refreshToken.delete.delete(prismaClient, incomingRefreshTokenRecord);
            throw ApiError.Unauthorized();
        }

        const rawUser = incomingRefreshTokenRecord.user;
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);
        
        const session = await prismaClient.$transaction(async (tx) => {
            await this.repository.db.refreshToken.delete.delete(tx, incomingRefreshTokenRecord);

            const session = await this.manager.session.createSession(rawUser, tx);
            return session;

        })
        
        return { user: personalUser, ...session };
    }

    async logOut(incomingRefreshToken: string) {

        const hashedIncomingToken = await this.lib.hash.sha256.create(incomingRefreshToken);
        const incomingRefreshTokenRecord = await this.repository.db.refreshToken.get.orNull.byHashedToken(prismaClient, hashedIncomingToken);
        if (incomingRefreshTokenRecord) {
          await this.repository.db.refreshToken.delete.delete(prismaClient, incomingRefreshTokenRecord);
        }
        return {};

    }
}

import { PersonalUser, PublicUser } from "#lib/selector/user.selector";
import { prismaClient } from "#prisma/prisma";
import BaseService from '#base/service.base';
import ApiError from "#errors/api.errors";

export default class UsersService extends BaseService {
    
    async getByUuid(uuid: PublicUser['uuid']) {
        const rawUser = await this.repository.db.users.get.byUuid(prismaClient, uuid);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser)
        return { user: publicUser }
    }

    async getByEmail(email: PersonalUser['email']) {
        const rawUser = await this.repository.db.users.get.byEmail(prismaClient, email);
        if (!rawUser.allowEmailFind ) {
            throw ApiError.NotFound();
        }
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);
        return { user: publicUser }
    }

    async getByLogin(login: PersonalUser['login']) {
        const rawUser = await this.repository.db.users.get.byLogin(prismaClient, login);
        if (!rawUser.allowLoginFind ) {
            throw ApiError.NotFound();
        }
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        return { user: publicUser}
    }

    async getByNickname(nickname: PublicUser['nickname'] ) {
        const rawUser = await this.repository.db.users.get.byNick(prismaClient, nickname);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);
        return { user: publicUser }
    }

}
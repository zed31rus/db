import { PublicUser } from "#lib/selector/user.selector";
import { prismaClient } from "#prisma/prisma";
import BaseService from '#base/service.base';

export default class UsersService extends BaseService {
    
    async get(uuid: PublicUser['uuid']) {
        const rawUser = await this.repository.db.users.get.byUuid(prismaClient, uuid);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser)
        return { user: publicUser }
    }

}
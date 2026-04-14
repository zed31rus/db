import { prismaClient } from "#prisma/prisma";
import { PublicUser } from "#lib/selector/user.selector";
import BaseService from "#base/service.base";

export default class MeService extends BaseService {

    async get(publicUser: PublicUser) {
        const rawUser = await this.repository.db.users.get.orThrow.byPublicUser(prismaClient, publicUser);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser)
        return { user: personalUser }
    }

}
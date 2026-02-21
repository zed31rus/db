import { prismaClient, User } from "#prisma/prisma";
import db from "#lib/db/db";
import userSelector from "#lib/selector/user.selector";

export default class GetServices {

    static async me(uuid: User['uuid']) {
        const rawUser = await db.users.get.byUuid(prismaClient, uuid);
        return { rawUser }
    }

    static async user(uuid: User['uuid']) {
        const rawUser = await db.users.get.byUuid(prismaClient, uuid);
        return { rawUser }
    }

}
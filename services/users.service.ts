import db from '#repo/db/db';
import UserSelector, { PublicUser } from "#lib/selector/user.selector";
import { prismaClient } from "#prisma/prisma";

export default class UsersService {
    
    static async get(uuid: PublicUser['uuid']) {
        const rawUser = await db.users.get.byUuid(prismaClient, uuid);
        const publicUser = UserSelector.toPublicJSON(rawUser)
        return { user: publicUser }
    }

}
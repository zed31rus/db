import db from "#lib/db/db";
import UserSelector, { PublicUser } from "#lib/selector/user.selector";
import { prismaClient, User } from "#prisma/prisma";

export default class SocialService {
    
    static async get(uuid: PublicUser['uuid']) {
        const rawUser = await db.users.get.byUuid(prismaClient, uuid);
        const publicUser = UserSelector.toPublicJSON(rawUser)
        return { targetUser: publicUser }
    }

}
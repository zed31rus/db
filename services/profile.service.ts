import { prismaClient, User } from "#prisma/prisma";
import db from '#repo/db/db';
import UserSelector, { PublicUser } from "#lib/selector/user.selector";

export default class ProfileServices {

    static async get(publicUser: PublicUser) {
        const rawUser = await db.users.get.byPublicUser(prismaClient, publicUser);
        const personalUser = UserSelector.toPersonalJSON(rawUser)
        return { user: personalUser }
    }

}
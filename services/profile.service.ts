import { prismaClient, User } from "#prisma/prisma";
import db from "#lib/db/db";
import userSelector, { PublicUser } from "#lib/selector/user.selector";
import UserSelector from "#lib/selector/user.selector";

export default class ProfileServices {

    static async get(publicUser: PublicUser) {
        const rawUser = await db.users.get.byPublicUser(prismaClient, publicUser);
        const personalUser = UserSelector.toPersonalJSON(rawUser)
        return { publicUser: personalUser }
    }

}
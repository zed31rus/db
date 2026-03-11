import { prismaClient } from "#prisma/prisma";
import db from '#repo/db/db';
import UserSelector, { PublicUser } from "#lib/selector/user.selector";
import AccountManager from "#managers/account/otp.manager";
import ApiError from "#lib/errors/api.errors";

export default class AccoutService {

    static async emailVerificationSend(user: PublicUser) {
        const rawUser = await db.users.get.byPublicUser(prismaClient, user);
        const publicUser = UserSelector.toPublicJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: publicUser };

        await AccountManager.createOtp(rawUser, OtpTypes.EmailConfirm);

        return { user: publicUser };
    }

    static async emailVerificationConfirm(user: PublicUser, submitCode: string) {
        const rawUser = await db.users.get.byPublicUser(prismaClient, user);
        const publicUser = UserSelector.toPublicJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: publicUser };

        await AccountManager.confirmOtp(rawUser, submitCode, OtpTypes.EmailConfirm);
        
        return { user: publicUser };
    }
}
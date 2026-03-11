import { prismaClient, User } from "#prisma/prisma";
import db from '#repo/db/db';
import hash from "#lib/hash/hash.lib";
import mailer from "#lib/mail/mail.lib";
import UserSelector, { PublicUser } from "#lib/selector/user.selector";
import AccountManager from "#managers/account/otp.manager";

export default class AccoutService {

    static async emailVerificationSend(user: PublicUser) {
        const rawUser = await db.users.get.byPublicUser(prismaClient, user);
        const publicUser = UserSelector.toPublicJSON(rawUser);
        await AccountManager.createOtp(rawUser)
        return { user: publicUser }
    }

    static async emailVerificationConfirm(user: PublicUser, submitCode: string) {
        const rawUser = await db.users.get.byPublicUser(prismaClient, user)
        const publicUser = UserSelector.toPublicJSON(rawUser)

        const verificationRecord = await db.verificationCode.get.get(prismaClient, rawUser, 'EMAIL_CONFIRMATION');
        const isCodeValid = await hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
        if (!isCodeValid) throw new Error("Invalid or expired verification code");

        await prismaClient.$transaction(async (tx) => {
            await db.verificationCode.delete.delete(tx, verificationRecord)
            await db.users.update.setEmailConfirmed(tx, rawUser, true)
        })

        mailer.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        return { user: publicUser }
    }
}
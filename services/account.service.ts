import { prismaClient, User } from "#prisma/prisma";
import db from "#lib/db/db";
import hash from "#lib/hash/hash.lib";
import mailer from "#lib/mail/mail.lib";
import UserSelector, { PublicUser } from "#lib/selector/user.selector";

export default class AccoutService {
    static async confirmEmail(currentUser: PublicUser, submitCode: string) {
        const { user } = await prismaClient.$transaction(async (tx) => {
            const userRecord = await db.users.get.byPublicUser(tx, currentUser)
            const verificationRecord = await db.verificationCode.get.get(tx, userRecord, 'EMAIL_CONFIRMATION');
            const isCodeValid = await hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
            if (!isCodeValid) throw new Error("Invalid or expired verification code");
            await db.verificationCode.delete.delete(tx, verificationRecord)
            await db.users.update.setEmailConfirmed(tx, userRecord, true)
            return { user: userRecord }
        })

        mailer.sendMail(user.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        const publicUser = UserSelector.toPublicJSON(user)
        return { publicUser: publicUser }
    }
}
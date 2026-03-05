import { prismaClient, User } from "#prisma/prisma";
import db from "#lib/db/db";
import hash from "#lib/hash/hash.lib";
import mailer from "#lib/mail/mail.lib";
import { PublicUser } from "#lib/selector/user.selector";

export default class AccoutService {
    static async confirmEmail(publicUser: PublicUser, submittedCode: string) {
        const { rawUser } = await prismaClient.$transaction(async (tx) => {
            const rawUser = await db.users.get.byPublicUser(tx, publicUser)
            const verificationRecord = await db.verificationCode.get.get(tx, rawUser, 'EMAIL_CONFIRMATION');
            const isCodeValid = await hash.bcrypt.compare(submittedCode, verificationRecord.hashedCode);
            if (!isCodeValid) throw new Error("Invalid or expired verification code");
            await db.verificationCode.delete.delete(tx, verificationRecord)
            await db.users.update.setEmailConfirmed(tx, rawUser, true)
            return { rawUser }
        })

        mailer.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        return { rawUser: publicUser }
    }
}
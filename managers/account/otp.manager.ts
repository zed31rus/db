import { prismaClient, User } from "#prisma/prisma";
import Hash from "#lib/hash/hash.lib";
import db from "#repo/db/db";
import mailer from "#lib/mail/mail.lib";
import VerificationCode from "#lib/verificationCode/verificationCode.lib";
import UserSelector from "#lib/selector/user.selector";

export default class AccountManager {
    static async createOtp(user: User, type: string) {
        const rawUser = user;
        const rawOtp = await VerificationCode.generateVerificationCode(6);
        const hashedOtp = await Hash.bcrypt.create(rawOtp, 10);
        const otpExpires = VerificationCode.getExpires();

        await db.verificationCode.upsert.upsert(prismaClient, rawUser, hashedOtp, type, otpExpires.atTime);

        mailer.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);
        return { rawOtp }
    }

    static async confirmOtp(user: User, submitCode: string, type: string) {
        const rawUser = user;
        const publicUser = UserSelector.toPublicJSON(rawUser);
        const verificationRecord = await db.verificationCode.get.get(prismaClient, rawUser, type);
        const isCodeValid = await Hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
        if (!isCodeValid) throw new Error("Invalid or expired verification code");

        await prismaClient.$transaction(async (tx) => {
            await db.verificationCode.delete.delete(tx, verificationRecord)
            await db.users.update.setEmailConfirmed(tx, rawUser, true)
        })

        mailer.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        return { publicUser }
    }
}
import { prismaClient, User } from "#prisma/prisma";
import Hash from "#lib/hash/hash.lib";
import db from "#repo/db/db";
import mailer from "#lib/mail/mail.lib";
import VerificationCode from "#lib/verificationCode/verificationCode.lib";

export default class AccountManager {
    static async createOtp(user: User) {
        const rawUser = user;
        const rawOtp = await VerificationCode.generateVerificationCode(6);
        const hashedOtp = await Hash.bcrypt.create(rawOtp, 10);
        const otpExpires = VerificationCode.getExpires();

        await db.verificationCode.upsert.upsert(prismaClient, rawUser, hashedOtp, 'EMAIL_CONFIRMATION', otpExpires.atTime);

        mailer.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);
        return { rawOtp }
    }
}
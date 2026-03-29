import { prismaClient, User } from "#prisma/prisma";
import BaseManager from "#base/manager.base";

export default class OtpManager extends BaseManager {

    async createOtp(user: User, type: string) {
        const rawUser = user;
        const rawOtp = await this.lib.verificationCode.generateVerificationCode(6);
        const hashedOtp = await this.lib.hash.bcrypt.create(rawOtp, 10);
        const otpExpires = this.lib.verificationCode.getExpires();

        await this.repository.db.verificationCode.upsert.upsert(prismaClient, rawUser, hashedOtp, type, otpExpires.atTime);

        this.lib.mail.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);
        return { rawOtp }
    }

    async confirmOtp(user: User, submitCode: string, type: string) {
        const rawUser = user;
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);
        const verificationRecord = await this.repository.db.verificationCode.get.get(prismaClient, rawUser, type);
        const isCodeValid = await this.lib.hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
        if (!isCodeValid) throw new Error("Invalid or expired verification code");

        await prismaClient.$transaction(async (tx) => {
            await this.repository.db.verificationCode.delete.delete(tx, verificationRecord)
            await this.repository.db.users.update.setEmailConfirmed(tx, rawUser, true)
        })

        this.lib.mail.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        return { publicUser }
    }
}
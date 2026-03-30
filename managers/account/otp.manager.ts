import { prismaClient, User } from "#prisma/prisma";
import BaseManager from "#base/manager.base";
import ApiError from "#errors/api.errors";
import { success } from "zod";

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
        const verificationRecord = await this.repository.db.verificationCode.get.get(prismaClient, rawUser, type);
        const isCodeValid = await this.lib.hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
        if (!isCodeValid) throw ApiError.BadRequest("Invalid or expired verification code");

        await this.repository.db.verificationCode.delete.delete(prismaClient, verificationRecord)

        this.lib.mail.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        return { success: true };
    }
}
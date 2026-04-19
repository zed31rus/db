import BaseManager from "#core/base/manager.base.js";
import { TransactionClient, User } from "#core/prisma/prisma.js";
import ApiError from "#root/errors/api.errors.js";

export default class OtpManager extends BaseManager {

    async createOtp(tx: TransactionClient, user: User, type: string) {
        const rawUser = user;
        const rawOtp = await this.lib.verificationCode.generateVerificationCode(6);
        const hashedOtp = await this.lib.hash.bcrypt.create(rawOtp, 10);
        const otpExpires = this.lib.verificationCode.getExpires();

        await this.repository.db.verificationCode.upsert.upsert(tx, rawUser, hashedOtp, type, otpExpires.atTime);

        return { rawOtp }
    }

    async confirmOtp(tx: TransactionClient, user: User, submitCode: string, type: string) {
        const rawUser = user;
        const verificationRecord = await this.repository.db.verificationCode.get.orThrow.get(tx, rawUser, type);
        const expired = this.lib.verificationCode.checkExpired(verificationRecord);
        if (expired) throw ApiError.Expired();
        const isCodeValid = await this.lib.hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
        if (!isCodeValid) throw ApiError.BadRequest("Invalid or expired verification code");

        await this.repository.db.verificationCode.delete.delete(tx, verificationRecord)

        return { success: true };
    }
}
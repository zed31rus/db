import BaseManager from "#core/base/manager.base.js";
import DB from "../db/db.js";

export default class OtpManager extends BaseManager {

    async createOtp(tx: DB.TransactionClient, user: DB.User, type: string) {
        const rawUser = user;
        const rawOtp = await this.lib.verificationCode.generateVerificationCode(6);
        const hashedOtp = await this.lib.hash.bcrypt.create(rawOtp, 10);
        const otpExpires = this.lib.verificationCode.getExpires();

        await this.db.verificationCode.upsert.upsert(tx, rawUser, hashedOtp, type, otpExpires.atTime);

        return { rawOtp }
    }

    async confirmOtp(tx: DB.TransactionClient, user: DB.User, submitCode: string, type: string) {
        const rawUser = user;
        const verificationRecord = await this.db.verificationCode.get.orThrow.get(tx, rawUser, type);
        const expired = this.lib.verificationCode.checkExpired(verificationRecord);
        if (expired) throw this.errors.api.Expired();
        const isCodeValid = await this.lib.hash.bcrypt.compare(submitCode, verificationRecord.hashedCode);
        if (!isCodeValid) throw this.errors.api.BadRequest("Invalid or expired verification code");

        await this.db.verificationCode.delete.delete(tx, verificationRecord)

        return { success: true };
    }
}
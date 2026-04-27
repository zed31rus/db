import DB from "../../db.js";

export default class UpsertVerificationCode {
    async upsert(client: DB.TransactionClient, user: DB.User, hashedCode: string, type: string, expiresAt: Date) {
        return await client.verificationCode.upsert({
            where: { userUuid_type: { userUuid: user.uuid, type: type } },
            update: { hashedCode: hashedCode, expiresAt: expiresAt, createdAt: new Date() },
            create: { userUuid: user.uuid, hashedCode: hashedCode, type: type, expiresAt: expiresAt }
        });
    }
}
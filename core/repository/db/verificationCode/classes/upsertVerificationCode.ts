import { Prisma, prismaClient, User } from "#core/prisma/prisma.js";

export default class UpsertVerificationCode {
    async upsert(client: Prisma.TransactionClient, user: User, hashedCode: string, type: string, expiresAt: Date) {
        return await prismaClient.verificationCode.upsert({
            where: { userUuid_type: { userUuid: user.uuid, type: type } },
            update: { hashedCode: hashedCode, expiresAt: expiresAt, createdAt: new Date() },
            create: { userUuid: user.uuid, hashedCode: hashedCode, type: type, expiresAt: expiresAt }
        });
    }
}
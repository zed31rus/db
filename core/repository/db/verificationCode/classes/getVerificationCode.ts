import { User, Prisma } from "#core/prisma/prisma.js";

export default class GetVerificationCode {
    orThrow = {
        async get(client: Prisma.TransactionClient, user: User, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}},
                include: { user: true }
            });
        }
    }
    orNull = {
        async get(client: Prisma.TransactionClient, user: User, type: string) {
            return await client.verificationCode.findUnique({
                where: { userUuid_type: {userUuid: user.uuid, type: type}},
                include: { user: true }
            });
        }
    }
}
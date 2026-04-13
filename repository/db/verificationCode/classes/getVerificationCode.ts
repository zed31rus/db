import { User, Prisma } from "#prisma/prisma";

export default class GetVerificationCode {
    orThrow = {
        async get(client: Prisma.TransactionClient, user: User, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}}
            });
        }
    }
    orNull = {
        async get(client: Prisma.TransactionClient, user: User, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}}
            });
        }
    }
}
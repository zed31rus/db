import { User, Prisma } from "#prisma/prisma";

export default class GetVerificationCode {
    async get(client: Prisma.TransactionClient, user: User, type: string) {
        return await client.verificationCode.findUniqueOrThrow({
            where: { userUuid_type: {userUuid: user.uuid, type: type}}
        });
    }
}
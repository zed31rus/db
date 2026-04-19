import { Prisma, prismaClient, VerificationCode } from "#core/prisma/prisma.js";

export default class DeleteVerificationCode {
    async delete(client: Prisma.TransactionClient, code: VerificationCode) {
        return await client.verificationCode.delete({
            where: {userUuid_type: {userUuid: code.userUuid, type: code.type}}
        })
    }
}
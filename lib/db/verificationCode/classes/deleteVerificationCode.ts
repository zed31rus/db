import { Prisma, prismaClient, VerificationCode } from "#prisma/prisma";

export default class DeleteVerificationCode {
    static async delete(client: Prisma.TransactionClient, code: VerificationCode) {
        return await client.verificationCode.delete({
            where: {userUuid_type: {userUuid: code.userUuid, type: code.type}}
        })
    }
}
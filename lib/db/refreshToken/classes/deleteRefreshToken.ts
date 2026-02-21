import { Prisma } from "#prisma/prisma";

export default class DeleteRefreshToken {
    static async delete(client: Prisma.TransactionClient, refreshToken: Prisma.RefreshTokenModel) {
        await client.refreshToken.delete({
            where: {
                hashedToken: refreshToken.hashedToken
            }
        })
    }
}
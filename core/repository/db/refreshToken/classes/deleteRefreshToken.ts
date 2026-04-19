import { Prisma } from "#core/prisma/prisma.js";

export default class DeleteRefreshToken {
    async delete(client: Prisma.TransactionClient, refreshToken: Prisma.RefreshTokenModel) {
        await client.refreshToken.delete({
            where: {
                hashedToken: refreshToken.hashedToken
            }
        })
    }
}
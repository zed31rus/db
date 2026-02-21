import { Prisma } from "#prisma/prisma";

export default class CreateRefreshToken {
    static async createRefreshToken(client: Prisma.TransactionClient, hashedToken: string, expiresAt: Date, user: Prisma.UserModel) {
        await client.refreshToken.create({
            data: {
                hashedToken: hashedToken,
                expiresAt: expiresAt,
                user: {connect: {uuid: user.uuid}}
            }
        })
    }
}
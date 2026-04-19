import { Prisma } from "#core/prisma/prisma.js";

export default class CreateRefreshToken {
    async create(client: Prisma.TransactionClient, hashedToken: string, expiresAt: Date, user: Prisma.UserModel) {
        await client.refreshToken.create({
            data: {
                hashedToken: hashedToken,
                expiresAt: expiresAt,
                user: {connect: {uuid: user.uuid}}
            }
        })
    }
}
import DB from "../../db.js";

export default class CreateRefreshToken {
    async create(client: DB.TransactionClient, hashedToken: string, expiresAt: Date, user: DB.UserModel) {
        await client.refreshToken.create({
            data: {
                hashedToken: hashedToken,
                expiresAt: expiresAt,
                user: {connect: {uuid: user.uuid}}
            }
        })
    }
}
import DB from "../../db.js";

export default class DeleteRefreshToken {
    async delete(client: DB.TransactionClient, refreshToken: DB.RefreshTokenModel) {
        await client.refreshToken.delete({
            where: {
                hashedToken: refreshToken.hashedToken
            }
        })
    }
}
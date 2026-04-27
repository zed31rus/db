import DB from "../../db.js";

export default class updateOauthAccount {
    async update(client: DB.TransactionClient, account: DB.OauthAccount, data: DB.OauthAccountUpdateInput) {
        return await client.oauthAccount.update({
            where: { provider_providerUserId: {provider: account.provider, providerUserId: account.providerUserId} },
            data
        });
    }
}
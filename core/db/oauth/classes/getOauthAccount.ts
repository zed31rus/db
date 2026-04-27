import DB from "../../db.js";

export default class GetOauthAccount {
    orThrow = {
        async byProvider_providerUserId(client: DB.TransactionClient, provider: DB.OauthAccount['provider'], providerUserId: DB.OauthAccount['providerUserId']) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}},
                include: { user: true }
            });
        },

        async byUserUuid_provider(client: DB.TransactionClient, user: DB.User, provider: DB.OauthAccount['provider']) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { userUuid_provider: {provider: provider, userUuid: user.uuid} },
                include: { user: true }
            })
        }
    }

    orNull = {
        async byProvider_providerUserId(client: DB.TransactionClient, provider: DB.OauthAccount['provider'], providerUserId: DB.OauthAccount['providerUserId']) {
            return await client.oauthAccount.findUnique({
                where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}},
                include: { user: true }
            });
        },

        async byUserUuid_provider(client: DB.TransactionClient, user: DB.User, provider: DB.OauthAccount['provider']) {
            return await client.oauthAccount.findUnique({
                where: { userUuid_provider: {provider: provider, userUuid: user.uuid} },
                include: { user: true }
            })
        }
    }

}
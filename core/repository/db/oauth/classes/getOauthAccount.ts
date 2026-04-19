import { Prisma, OauthAccount, User } from "#core/prisma/prisma.js";

export default class GetOauthAccount {
    orThrow = {
        async byProvider_providerUserId(client: Prisma.TransactionClient, provider: OauthAccount['provider'], providerUserId: OauthAccount['providerUserId']) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}},
                include: { user: true }
            });
        },

        async byUserUuid_provider(client: Prisma.TransactionClient, user: User, provider: OauthAccount['provider']) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { userUuid_provider: {provider: provider, userUuid: user.uuid} },
                include: { user: true }
            })
        }
    }

    orNull = {
        async byProvider_providerUserId(client: Prisma.TransactionClient, provider: OauthAccount['provider'], providerUserId: OauthAccount['providerUserId']) {
            return await client.oauthAccount.findUnique({
                where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}},
                include: { user: true }
            });
        },

        async byUserUuid_provider(client: Prisma.TransactionClient, user: User, provider: OauthAccount['provider']) {
            return await client.oauthAccount.findUnique({
                where: { userUuid_provider: {provider: provider, userUuid: user.uuid} },
                include: { user: true }
            })
        }
    }

}
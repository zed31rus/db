import { Prisma, OauthAccount, User } from "#prisma/prisma";
export default class GetOauthAccount {
    async byProvider_providerUserId(client: Prisma.TransactionClient, provider: OauthAccount['provider'], providerUserId: OauthAccount['providerUserId']) {
        return await client.oauthAccount.findUniqueOrThrow({
            where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}}
        });
    }

    async byUserUuid_provider(client: Prisma.TransactionClient, user: User, provider: OauthAccount['provider']) {
        return await client.oauthAccount.findUniqueOrThrow({
            where: { userUuid_provider: {provider: provider, userUuid: user.uuid} }
        })
    }
}
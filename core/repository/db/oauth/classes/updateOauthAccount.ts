import { Prisma, OauthAccount } from "#core/prisma/prisma.js";

export default class updateOauthAccount {
    async update(client: Prisma.TransactionClient, account: OauthAccount, data: Prisma.OauthAccountUpdateInput) {
        return await client.oauthAccount.update({
            where: { provider_providerUserId: {provider: account.provider, providerUserId: account.providerUserId} },
            data
        });
    }
}
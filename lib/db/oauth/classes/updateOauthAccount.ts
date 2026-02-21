import { Prisma, OauthAccount } from "#prisma/prisma";

export default class updateOauthAccount {
    static async update(client: Prisma.TransactionClient, account: OauthAccount, data: Prisma.OauthAccountUpdateInput) {
        return await client.oauthAccount.update({
            where: { provider_providerUserId: {provider: account.provider, providerUserId: account.providerUserId} },
            data
        });
    }
}
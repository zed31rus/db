import { OauthAccount, Prisma, User } from "#core/prisma/prisma.js";
import { OauthProviders } from "#core/types/oauth.js";

export default class CreateOauthAccount {
    async create(
        client: Prisma.TransactionClient, 
        user: User, 
        account: { provider: OauthProviders, providerUserId: OauthAccount['providerUserId'] }, 
        payload: Omit<Prisma.OauthAccountCreateWithoutUserInput, 'provider' | 'providerUserId'>
    ) {
        return await client.oauthAccount.create({
            data: {
                ...account,
                ...payload,
                user: { connect: { uuid: user.uuid } }
            }
        });
    }
}
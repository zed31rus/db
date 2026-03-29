import {  Prisma, User, OauthAccount } from "#prisma/prisma";

export default class CreateOauthAccount {
    async create(
        client: Prisma.TransactionClient, 
        user: User, 
        account: { provider: OauthAccount['provider'], providerUserId: OauthAccount['providerUserId'] }, 
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
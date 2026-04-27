import { OauthProviders } from "#core/types/oauth.js";
import DB from "../../db.js";

export default class CreateOauthAccount {
    async create(
        client: DB.TransactionClient, 
        user: DB.User, 
        account: { provider: OauthProviders, providerUserId: DB.OauthAccount['providerUserId'] }, 
        payload: Omit<DB.OauthAccountCreateWithoutUserInput, 'provider' | 'providerUserId'>
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
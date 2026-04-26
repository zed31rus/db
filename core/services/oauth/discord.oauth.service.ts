import BaseService from "#core/base/service.base.js";
import { PublicUser } from "#core/lib/selector/user.selector.js";
import { OauthProviders } from "#core/types/oauth.js";
import { DiscordOauthApiMeReply } from "#core/infra/discord/oauth.discord.infra.js";


export default class DiscordOauthService extends BaseService {
    async callback(code: string, publicUser: PublicUser | null) {
        const exchangeReply = await this.infra.oauth.discord.exchangeCode(code);
        const meRes = await this.infra.oauth.discord.me(exchangeReply.access_token);

        const newRawUser = await this.resolveUser(publicUser, meRes);
        
        const newPersonalUser = this.lib.userSelector.toPersonalJSON(newRawUser);
        const newPublicUser = this.lib.userSelector.toPublicJSON(newRawUser)

        await this.repository.db.oauthAccount.upsert.upsert(
            prismaClient,
            { provider: OauthProviders.discord, providerUserId: meRes.id },
            newRawUser,
            {
                accessToken: exchangeReply.access_token,
                refreshToken: exchangeReply.refresh_token,
                expiresAt: new Date(Date.now() + exchangeReply.expires_in * 1000),
                scope: exchangeReply.scope,
                rawProfile: meRes
            }
        );

        this.infra.rabbitmq.sendOauthRegistered(newPublicUser);

        const sesssion = await this.manager.session.createSession(newRawUser, prismaClient);

        return { user: newPersonalUser, ...sesssion }
    }

    private async resolveUser(publicUser: PublicUser | null, meRes: DiscordOauthApiMeReply) {
        if (publicUser) {
            return await this.repository.db.users.get.orThrow.byPublicUser(prismaClient, publicUser);
        }

        const existingOauth = await this.repository.db.oauthAccount.get.orNull.byProvider_providerUserId(
            prismaClient, OauthProviders.discord, meRes.id
        );
        if (existingOauth) return existingOauth.user;

        const userByEmail = await this.repository.db.users.get.orNull.byEmail(prismaClient, meRes.email);
        if (userByEmail) return userByEmail;

        return await this.repository.db.users.create.createUser(
            prismaClient, meRes.global_name, meRes.username, meRes.email, null, true
        );
    }
}
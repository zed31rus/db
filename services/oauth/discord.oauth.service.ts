import BaseService from "#base/service.base";
import { PublicUser } from "#lib/selector/user.selector";
import { prismaClient } from "#prisma/prisma";
import { OauthProviders } from "#types/oauth.js";

export default class DiscordOauthService extends BaseService {
    async callback(code: string, publicUser: PublicUser | null) {
        const exchangeReply = await this.infra.oauth.discord.exchangeCode(code);
        const meRes = await this.infra.oauth.discord.me(exchangeReply.access_token);

        const rawUser = await this.resolveUser(publicUser, meRes);

        await this.repository.db.oauthAccount.upsert.upsert(
            prismaClient,
            { provider: OauthProviders.discord, providerUserId: meRes.id },
            rawUser,
            {
                accessToken: exchangeReply.access_token,
                refreshToken: exchangeReply.refresh_token,
                expiresAt: new Date(Date.now() + exchangeReply.expires_in * 1000),
                scope: exchangeReply.scope,
                rawProfile: meRes
            }
        );

        return { meRes };
    }

    private async resolveUser(publicUser: PublicUser | null, meRes: any) {
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
            prismaClient, meRes.username, meRes.global_name, meRes.email, null, true
        );
    }
}
import { OauthProviders } from "#core/types/oauth.js";
import DB from "../../db.js";

export default class UpsertOauthAccount {
    async upsert(
        client: DB.TransactionClient,
        where: { provider: OauthProviders, providerUserId: string },
        user: DB.User,
        oauthData: {
            accessToken?: string | null;
            refreshToken?: string | null;
            expiresAt?: Date | null;
            scope?: string | null;
            rawProfile?: DB.InputJsonValue;
        }

    ) {
        return await client.oauthAccount.upsert({
            where: { 
                provider_providerUserId: {
                    provider: where.provider, 
                    providerUserId: where.providerUserId
                } 
            },
            update: {
                accessToken: oauthData.accessToken,
                refreshToken: oauthData.refreshToken,
                expiresAt: oauthData.expiresAt,
                scope: oauthData.scope,
                rawProfile: oauthData.rawProfile,
            },
            create: {
                provider: where.provider,
                providerUserId: where.providerUserId,
                accessToken: oauthData.accessToken,
                refreshToken: oauthData.refreshToken,
                expiresAt: oauthData.expiresAt,
                scope: oauthData.scope,
                rawProfile: oauthData.rawProfile,
                userUuid: user.uuid
            }
        });
    }
}
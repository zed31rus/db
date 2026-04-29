import BaseInfra from "#root/core/base/infra.base.js";
import { DiscordOauthApiExchangeReply, DiscordOauthApiMeReply, DiscordOauthApiTokenReply } from "#core/types/oauth/discord.js";

export default class DiscordOauthInfra extends BaseInfra {


    API_ENDPOINT = 'https://discord.com/api/v10';
    CLIENT_ID = this.config.env.DISCORD_OAUTH_CLIENT_ID;
    CLIENT_SECRET = this.config.env.DISCORD_OAUTH_CLIENT_SECRET;
    REDIRECT_URI = this.config.env.DISCORD_OAUTH_REDIRECT_URL;
    

    async exchangeCode(code: string) {
    const response = await fetch(`${this.API_ENDPOINT}/oauth2/token`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64')}`,
            },

            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.REDIRECT_URI,
            })

        });

        if (!response.ok) {
        const errorText = await response.text();
        throw this.errors.api.BadRequest(`Discord API Error: ${response.status} - ${errorText}`);
        }

        return await response.json() as DiscordOauthApiExchangeReply;
    }

    async token(refreshToken: string) {
        const response = await fetch(`${this.API_ENDPOINT}/oauth2/token`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64')}`,
            },

            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            })

        });

        if (!response.ok) {
            const errorText = await response.text();
            throw this.errors.api.BadRequest(`Discord API Error: ${response.status} - ${errorText}`);
        }

        return await response.json() as DiscordOauthApiTokenReply;
    }

    async me(accessToken: string) {
        const response = await fetch(`${this.API_ENDPOINT}/users/@me`, {

            method: 'GET',

            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },

        });

        if (!response.ok) {
        const errorText = await response.text();
        throw this.errors.api.BadRequest(`Discord API Error: ${response.status} - ${errorText}`);
        }

        return await response.json() as DiscordOauthApiMeReply;
    }

}
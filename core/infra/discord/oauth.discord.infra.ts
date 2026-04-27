import { Prisma } from "#core/prisma/prisma.js"
import envConfig from "#root/config/env.config.js";
import BaseInfra from "#root/core/base/infra.base.js";
import ApiError from "#root/errors/api.errors.js";

export interface DiscordOauthApiExchangeReply {
  "access_token": string,
  "token_type": string,
  "expires_in": number,
  "refresh_token": string,
  "scope": string
}

export interface DiscordOauthApiTokenReply {
  "access_token": string,
  "token_type": string,
  "expires_in": number,
  "refresh_token": string,
  "scope": string
}

export interface DiscordOauthApiMeReply extends Prisma.JsonObject {
    
  id: string,
  username: string,
  avatar: string,
  discriminator: string,
  public_flags: number,
  flags: number,
  banner: null,
  accent_color: number,
  global_name: string,
  avatar_decoration_data: null,
  collectibles: null,
  display_name_styles: null,
  banner_color: string,
  clan: object,
  primary_guild: object,
  mfa_enabled: true,
  locale: string,
  premium_type: number,
  email: string,
  verified: true

}

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
        throw ApiError.BadRequest(`Discord API Error: ${response.status} - ${errorText}`);
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
            throw ApiError.BadRequest(`Discord API Error: ${response.status} - ${errorText}`);
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
        throw ApiError.BadRequest(`Discord API Error: ${response.status} - ${errorText}`);
        }

        return await response.json() as DiscordOauthApiMeReply;
    }

}
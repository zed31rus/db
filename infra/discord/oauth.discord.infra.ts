import envConfig from "#config/env.config";
import ApiError from "#errors/api.errors";
import { Prisma } from "#prisma/prisma";

interface ExchangeReply {
  "access_token": string,
  "token_type": string,
  "expires_in": number,
  "refresh_token": string,
  "scope": string
}

interface TokenReply {
  "access_token": string,
  "token_type": string,
  "expires_in": number,
  "refresh_token": string,
  "scope": string
}

interface meReply extends Prisma.JsonObject {
    
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

export default class DiscordOauthInfra {


    API_ENDPOINT = 'https://discord.com/api/v10';
    CLIENT_ID = envConfig.DISCORD_OAUTH_CLIENT_ID;
    CLIENT_SECRET = envConfig.DISCORD_OAUTH_CLIENT_SECRET;
    REDIRECT_URI = 'http://localhost:3100/oauth2/discord/callback';
    

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

        return await response.json() as ExchangeReply;
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

        return await response.json() as TokenReply;
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

        return await response.json() as meReply;
    }

}
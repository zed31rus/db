import BaseManager from "#base/manager.base";
import envConfig from "#config/env.config";

export default class DiscordOauthManager extends BaseManager {

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
        throw new Error(`Discord API Error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }

    async refreshToken(refreshToken: string) {
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
            throw new Error(`Discord API Error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }
}
import envConfig from "#config/env.config";
import { BaseModule } from "#web/base/module.base";
import { UserEnv } from "#web/types/Env.d";

type OauthEnv = UserEnv & {};

export default class OauthModule extends BaseModule<OauthEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.post(
        'discord/callback',
        this.wrapper.validator.validate('json', this.dto.oauth.discord.callback),
        async (c) => {
            const { code } = c.req.valid('json');

            const API_ENDPOINT = 'https://discord.com/api/v10';
            const CLIENT_ID = envConfig.DISCORD_OAUTH_CLIENT_ID;
            const CLIENT_SECRET = envConfig.DISCORD_OAUTH_CLIENT_SECRET;
            const REDIRECT_URI = 'http://localhost:3100/oauth/discord/callback';

            const url = `${API_ENDPOINT}/oauth2/token`;

            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            });

            const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authHeader}`,
            },
            body: body,
            });

            if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Discord API Error: ${response.status} - ${errorText}`);
            }

            return await response.json();
        }
        )
    }
}

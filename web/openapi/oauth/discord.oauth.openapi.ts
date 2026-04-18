import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute } from '@hono/zod-openapi'
import { OptionalUserEnv } from "#web/types/Env.d";

type DiscordOauthEnv = OptionalUserEnv & {}

export default class DiscordOauthOpenAPI extends BaseOpenAPI {


    callback = createRoute({
        method: 'get',
        path: '/callback',
        middleware: [
            this.middleware.auth.withOptionalUser<DiscordOauthEnv>(),
        ],
        summary: 'Discord OAuth callback',
        description: 'Handles the Discord OAuth2 callback. Authenticates or links the Discord account to an existing user if already logged in.',

        request: {
            query: this.dto.oauth.discord.callback,
        },

        responses: {
            200: { description: 'Successfully authenticated via Discord' },
            400: { description: 'Invalid or missing OAuth code' },
        },

    });


}
import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute, z } from '@hono/zod-openapi'
import { OptionalUserEnv } from "#web/types/Env.d";
import { PersonalUserSchema } from "#lib/selector/user.selector";

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
            query: z.object({
                code: z.string()
            })
        },

        responses: {
            200: { 
                description: 'Successfully authenticated via Discord',
                content: {
                    'application/json': {
                        schema: PersonalUserSchema
                    }
                }
             },
            400: { description: 'Invalid or missing OAuth code' },
        },
    });


}
import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute } from '@hono/zod-openapi'
import { UserEnv } from "#web/types/Env.d";

type ProfileEnv = UserEnv & {}

export default class MeOpenAPI extends BaseOpenAPI {

    get = createRoute({
        method: 'get',
        path: '/get',
        middleware: [...this.handler.auth.withValidUser<ProfileEnv>()],
        security: [{ cookieAuth: [] }],
        summary: 'Get current user',
        description: 'Returns the profile data of the currently authenticated user.',

        request: {
            cookies: this.dto.cookie.access,
        },

        responses: {
            200: {
                description: 'User profile returned successfully',
            },
            401: { description: 'User Unauthorized' },
        },

    });


}
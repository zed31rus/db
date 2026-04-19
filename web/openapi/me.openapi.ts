import { UserEnv } from "#web/types/Env.js";
import BaseOpenAPI from "#web/base/openapi.base.js";
import { createRoute, z } from "@hono/zod-openapi";
import { PersonalUserSchema } from "#root/core/lib/selector/user.selector.js";

type ProfileEnv = UserEnv & {}

export default class MeOpenAPI extends BaseOpenAPI {

    get = createRoute({
        method: 'get',
        path: '/get',
        middleware: [...this.handler.auth.withValidUser<ProfileEnv>()],
        security: [{ cookieAuth: [] }],
        summary: 'Get current user',
        description: 'Returns the profile data of the currently authenticated user.',

        responses: {
            200: {
                description: 'User profile returned successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: PersonalUserSchema
                        })
                    }
                }
            },
            401: { description: 'User Unauthorized' },
        },

    });


}
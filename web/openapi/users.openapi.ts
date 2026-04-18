import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute, z } from '@hono/zod-openapi'
import { UserEnv } from "#web/types/Env.d";
import { PublicUserSchema } from "#lib/selector/user.selector";

type UsersEnv = UserEnv & {}

export default class UsersOpenAPI extends BaseOpenAPI {


    getByUuid = createRoute({
        method: 'get',
        path: '/get/{uuid}',
        summary: 'Get user by UUID',
        description: 'Returns public user data by UUID. Does not require authentication.',

        request: {
            params: z.object({
                uuid: z.uuid()
            })
        },

        responses: {
            200: { 
                description: 'User found',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: PublicUserSchema
                        })
                    }
                }
            },
            400: { description: 'Invalid input data' },
            404: { description: 'User not found' },
        },

    });


    getByEmail = createRoute({
        method: 'get',
        path: '/get/{email}',
        middleware: [...this.handler.auth.withValidUser<UsersEnv>()],
        security: [{ cookieAuth: [] }],
        summary: 'Get user by email',
        description: 'Returns user data by email address. Requires authentication.',

        request: {
            params: z.object({
                email: z.email()
            })
        },

        responses: {
            200: { 
                description: 'User found',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: PublicUserSchema
                        })
                    }
                }
             },
            400: { description: 'Invalid input data' },
            401: { description: 'User Unauthorized' },
            404: { description: 'User not found' },
        },

    });


    getByLogin = createRoute({
        method: 'get',
        path: '/get/{login}',
        middleware: [...this.handler.auth.withValidUser<UsersEnv>()],
        security: [{ cookieAuth: [] }],
        summary: 'Get user by login',
        description: 'Returns user data by login. Requires authentication.',

        request: {
            params: z.object({
                login: z.string().min(3)
            })
        },

        responses: {
            200: { 
                description: 'User found',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: PublicUserSchema
                        })
                    }
                }
            },
            400: { description: 'Invalid input data' },
            401: { description: 'User Unauthorized' },
            404: { description: 'User not found' },
        },

    });


}
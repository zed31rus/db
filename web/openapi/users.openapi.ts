import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute } from '@hono/zod-openapi'
import { UserEnv } from "#web/types/Env.d";

type UsersEnv = UserEnv & {}

export default class UsersOpenAPI extends BaseOpenAPI {


    getByUuid = createRoute({
        method: 'get',
        path: '/get/uuid',
        summary: 'Get user by UUID',
        description: 'Returns public user data by UUID. Does not require authentication.',

        request: {
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.users.GetByUuid.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'User found' },
            400: { description: 'Invalid input data' },
            404: { description: 'User not found' },
        },

    });


    getByEmail = createRoute({
        method: 'get',
        path: '/get/email',
        middleware: [...this.handler.auth.withValidUser<UsersEnv>()],
        security: [{ cookieAuth: [] }],
        summary: 'Get user by email',
        description: 'Returns user data by email address. Requires authentication.',

        request: {
            cookies: this.dto.cookie.access,
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.users.GetByEmail.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'User found' },
            400: { description: 'Invalid input data' },
            401: { description: 'User Unauthorized' },
            404: { description: 'User not found' },
        },

    });


    getByLogin = createRoute({
        method: 'get',
        path: '/get/login',
        middleware: [...this.handler.auth.withValidUser<UsersEnv>()],
        security: [{ cookieAuth: [] }],
        summary: 'Get user by login',
        description: 'Returns user data by login. Requires authentication.',

        request: {
            cookies: this.dto.cookie.access,
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.users.GetByLogin.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'User found' },
            400: { description: 'Invalid input data' },
            401: { description: 'User Unauthorized' },
            404: { description: 'User not found' },
        },

    });


}
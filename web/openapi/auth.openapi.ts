import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute } from '@hono/zod-openapi'
import { UserEnv } from "#web/types/Env.d";

type AuthEnv = UserEnv & {}

export default class AuthOpenAPI extends BaseOpenAPI {


    register = createRoute({
        method: 'post',
        path: '/register',
        summary: 'Register',
        description: 'Creates a new user account with the provided credentials.',

        request: {
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.auth.Register.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'User successfully registered' },
            400: { description: 'Invalid input data' },
            409: { description: 'User already exists' },
        },

    });


    login = createRoute({
        method: 'post',
        path: '/login',
        summary: 'Login',
        description: 'Authenticates the user and sets session cookies.',

        request: {
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.auth.Login.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'Successfully authenticated' },
            400: { description: 'Invalid credentials or input data' },
            401: { description: 'Wrong login or password' },
        },

    });


    refresh = createRoute({
        method: 'post',
        path: '/refresh',
        summary: 'Refresh tokens',
        description: 'Issues new access and refresh tokens using the existing refresh token cookie.',

        request: {
            cookies: this.dto.cookie.refresh,
        },

        responses: {
            200: { description: 'Tokens successfully refreshed' },
            401: { description: 'Invalid or expired refresh token' },
        },

    });


    logout = createRoute({
        method: 'post',
        path: '/logout',
        summary: 'Logout',
        description: 'Invalidates the current session and clears session cookies.',

        request: {
            cookies: this.dto.cookie.refresh,
        },

        responses: {
            200: { description: 'Successfully logged out' },
            401: { description: 'Invalid or missing refresh token' },
        },

    });


}
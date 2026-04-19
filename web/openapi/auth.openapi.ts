import { createRoute, z } from "@hono/zod-openapi";
import BaseOpenAPI from "#web/base/openapi.base.js";
import { UserEnv } from "#web/types/Env.js";
import { PersonalUserSchema, PublicUserSchema } from "#core/lib/selector/user.selector.js";

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
                        schema: z.object({
                            login: z.string().min(3).max(20),
                            email: z.email(),
                            password: z.string().min(8),
                            nickname: z.string().min(2).max(30)
                        }),
                    }
                }
            }
        },
        
        responses: {
            200: {
                description: 'User successfully registered',
                content: {
                    'application/json': { 
                        schema: z.object({
                            user: PublicUserSchema
                        })
                    }
                }
            },
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
                        schema: z.object({
                            email: z.email(),
                            password: z.string().min(8),
                        }),
                    }
                }
            }
        },
        
        responses: {
            200: { 
                description: 'Successfully authenticated',
                content: {
                    'application/json': { 
                        schema: z.object({
                            user: PersonalUserSchema
                        })
                    }
                }
            },
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
            cookies: this.dto.cookie.required.refresh,
        },

        responses: {
            200: { 
                description: 'Tokens successfully refreshed',
                content: {
                    'application/json': { 
                        schema: z.object({
                            user: PersonalUserSchema
                        })
                    }
                }
            },
            401: { description: 'Invalid or expired refresh token' },
        },

    });


    logout = createRoute({
        method: 'post',
        path: '/logout',
        summary: 'Logout',
        description: 'Invalidates the current session and clears session cookies.',

        request: {
            cookies: this.dto.cookie.optional.refresh,
        },

        responses: {
            200: { 
                description: 'Successfully logged out',
                content: {
                    'application/json': {
                        schema: z.object({

                        })
                    }
                }
             },
            401: { description: 'Invalid or missing refresh token' },
        },

    });


}
import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute } from '@hono/zod-openapi'
import { AccountEnv } from "#web/module/account.module";
import { z } from '@hono/zod-openapi';
import { PersonalUserSchema } from "#lib/selector/user.selector";

export default class AccountOpenAPI extends BaseOpenAPI {


    emailVerificationSend = createRoute({
        method: 'post',
        path: '/emailVerification/Send',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Send verification email',
        description: 'Sends a verification code to the authenticated user\'s email address.',

        responses: {
            200: {
                description: 'Verification code sent',
                    content: {
                        'application/json': { 
                            schema: z.object({
                                user: PersonalUserSchema,
                            })
                        }
                    }
            },
            401: { description: 'User Unauthorized' },
        },

    });

//-----------------------------------------------------

    emailVerificationConfirm = createRoute({
        method: 'patch',
        path: '/emailVerification/Confirm',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Confirm Email',
        description: 'Verifies the user account using the code received via email.',

        request: {
            body: { 
                content: { 
                    'application/json': { 
                        schema: z.object({
                            submitCode: z.string().length(6),
                        })
                    }
                }
            },
        },
        responses: {
            200: {
                description: 'Email successfully verified',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: PersonalUserSchema,
                        })
                    }
                },
            },
            400: { description: 'Invalid code or data' },
            401: { description: 'User Unauthorized' },
        },

    });

//-----------------------------------------------------

    changePasswordRequest = createRoute({
        method: 'post',
        path: '/changePassword/request',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Request password change',
        description: 'Sends a password reset/change code to the user\'s email.',

        responses: {
            200: {
                description: 'Change code sent',
                content: {
                    'application/json': { 
                        schema: z.object({
                            user: PersonalUserSchema,
                        })
                    }
                },
            },
            401: { description: 'User Unauthorized' },
        },
    });

//-----------------------------------------------------

    changePasswordConfirm = createRoute({
        method: 'patch',
        path: '/changePassword/confirm',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Confirm password change',
        description: 'Updates the user password using the verification code.',

        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            submitCode: z.string().length(6),
                            password: z.string().min(8),
                        })
                    }
                }
            },
        },

        responses: {
            200: {
                description: 'Password successfully changed',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: PersonalUserSchema,
                        })
                    }
                },
            },
            400: { description: 'Invalid code or weak password' },
            401: { description: 'User Unauthorized' },
        },

    });


}
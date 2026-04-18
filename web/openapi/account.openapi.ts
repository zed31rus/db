import BaseOpenAPI from "#web/base/openapi.base";
import { createRoute } from '@hono/zod-openapi'
import { AccountEnv } from "#web/module/account.module";

export default class AccountOpenAPI extends BaseOpenAPI {


    emailVerificationSend = createRoute({
        method: 'post',
        path: '/emailVerification/Send',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Send verification email',
        description: 'Sends a verification code to the authenticated user\'s email address.',

        request: {
            cookies: this.dto.cookie.access,
        },

        responses: {
            200: {
                description: 'Verification code sent',
            },
            401: { description: 'User Unauthorized' },
        },

    });


    emailVerificationConfirm = createRoute({
        method: 'patch',
        path: '/emailVerification/Confirm',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Confirm Email',
        description: 'Verifies the user account using the code received via email.',

        request: {
            cookies: this.dto.cookie.access,
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.account.emailVerificationConfirm.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'Email successfully verified' },
            400: { description: 'Invalid code or data' },
            401: { description: 'User Unauthorized' },
        },

    });


    changePasswordRequest = createRoute({
        method: 'post',
        path: '/changePassword/request',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Request password change',
        description: 'Sends a password reset/change code to the user\'s email.',

        request: {
            cookies: this.dto.cookie.access,
        },

        responses: {
            200: { description: 'Change code sent' },
            401: { description: 'User Unauthorized' },
        },

    });


    changePasswordConfirm = createRoute({
        method: 'patch',
        path: '/changePassword/confirm',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ cookieAuth: [] }],
        summary: 'Confirm password change',
        description: 'Updates the user password using the verification code.',

        request: {
            cookies: this.dto.cookie.access,
            body: {
                content: {
                    'application/json': {
                        schema: this.dto.account.changePasswordConfirm.Body,
                    },
                },
            },
        },

        responses: {
            200: { description: 'Password successfully changed' },
            400: { description: 'Invalid code or weak password' },
            401: { description: 'User Unauthorized' },
        },

    });


}
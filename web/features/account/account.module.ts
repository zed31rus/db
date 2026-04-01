import { BaseModule } from "#web/base/module.base";
import AuthMiddleware from "#web/middleware/auth.middleware";
import AccountSchemas from "#web/features/account/account.dto";
import CookieSchemas from "#web/dto/cookie.dto";
import { rateLimiter } from "hono-rate-limiter";
import zValidatorWrapper from "#web/wrappers/zValidator.wrapper";
import { BaseEnv } from "#web/types/Env.d";

type AccountEnv = BaseEnv & {}

export default class AccountModule extends BaseModule<AccountEnv> {

    init() {

        const auth = new AuthMiddleware<AccountEnv>(this.factory, this.lib);

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 10,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }))

        this.router.post(
        '/emailVerificationSend',
        zValidatorWrapper('cookie', CookieSchemas.both),
        auth.withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.account.emailVerificationSend(publicUser);
            return c.json({ user });

        })

        this.router.post(
        '/emailVerificationConfirm',
        zValidatorWrapper('json', AccountSchemas.emailVerificationConfirm.Body),
        zValidatorWrapper('cookie', CookieSchemas.both),
        auth.withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { submitCode } = c.req.valid('json');
            const { user } = await this.service.account.emailVerificationConfirm(publicUser, submitCode);
            return c.json({ user });

        })

        this.router.post(
        '/changePassword'
        )

        this.router.post(
        '/changePassword/request',
        zValidatorWrapper('cookie', CookieSchemas.both),
        auth.withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.account.changePasswordRequest(publicUser);
            return c.json({ user });

        }
        )

        this.router.post(
        '/changePassword/confirm',
        zValidatorWrapper('json', AccountSchemas.changePasswordConfirm.Body),
        zValidatorWrapper('cookie', CookieSchemas.both),
        auth.withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { password, submitCode } = c.req.valid('json');
            const { user } = await this.service.account.changePasswordConfirm(publicUser, password, submitCode);
            return c.json({ user });

        }
        )

    }

}


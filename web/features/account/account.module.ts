import { BaseModule } from "#web/base/module.base";
import { rateLimiter } from "hono-rate-limiter";
import { UserEnv } from "#web/types/Env.d";

type AccountEnv = UserEnv & {}

export default class AccountModule extends BaseModule<AccountEnv> {

    init() {

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 10,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }))

        this.router.post(
        '/emailVerification/Send',
        ...this.handler.auth.withValidUser<AccountEnv>(this.dto.cookie.both),
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.account.emailVerificationSend(publicUser);
            return c.json({ user });

        })

        this.router.post(
        '/emailVerification/Confirm',
        this.wrapper.validator.validate('json', this.dto.account.emailVerificationConfirm.Body),
        ...this.handler.auth.withValidUser<AccountEnv>(this.dto.cookie.both),
        async (c) => {

            const publicUser = c.get('user');
            const { submitCode } = c.req.valid('json');
            const { user } = await this.service.account.emailVerificationConfirm(publicUser, submitCode);
            return c.json({ user });

        })

        this.router.post(
        '/changePassword/request',
        ...this.handler.auth.withValidUser<AccountEnv>(this.dto.cookie.both),
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.account.changePasswordRequest(publicUser);
            return c.json({ user });

        }
        )

        this.router.post(
        '/changePassword/confirm',
        this.wrapper.validator.validate('json', this.dto.account.changePasswordConfirm.Body),
        ...this.handler.auth.withValidUser<AccountEnv>(this.dto.cookie.both),
        async (c) => {

            const publicUser = c.get('user');
            const { password, submitCode } = c.req.valid('json');
            const { user } = await this.service.account.changePasswordConfirm(publicUser, password, submitCode);
            return c.json({ user });

        }
        )

    }

}


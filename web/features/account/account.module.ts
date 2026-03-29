import { BaseModule } from "#web/base/module.base";
import AuthMiddleware, { BaseEnv } from "#web/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import AccountSchemas from "./account.dto";
import CookieSchemas from "#web/dto/cookie.dto";

type AccountEnv = BaseEnv & {}

export default class AccountModule extends BaseModule<AccountEnv> {

    init() {

        this.router.post(
        '/emailVerificationSend',
        zValidator('cookie', CookieSchemas.both),
        new AuthMiddleware<AccountEnv>(this.factory, this.lib).withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.account.emailVerificationSend(publicUser);
            return c.json({ user })
        })

        this.router.post(
        '/emailVerificationConfirm',
        zValidator('json', AccountSchemas.emailVerificationConfirm.Body),
        zValidator('cookie', CookieSchemas.both),
        new AuthMiddleware<AccountEnv>(this.factory, this.lib).withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { submitCode } = c.req.valid('json');
            const { user } = await this.service.account.emailVerificationConfirm(publicUser, submitCode);
            return c.json({ user })
        })

    }

}


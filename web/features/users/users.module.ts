import { BaseModule } from "#web/base/module.base";
import UsersSchemas from "#web/features/users/users.dto";
import { rateLimiter } from "hono-rate-limiter";
import AuthMiddleware from "#web/middleware/auth.middleware";
import { AuthEnv } from "#web/types/Env.d";
import zValidatorWrapper from "#web/wrappers/zValidator.wrapper";

type UsersEnv = AuthEnv & {};

export default class UsersModule extends BaseModule<UsersEnv> {

    init() {

        const auth = new AuthMiddleware<UsersEnv>(this.factory, this.lib);

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }))

        this.router.post(
        '/get/uuid',
        zValidatorWrapper('json', UsersSchemas.GetByUuid.Body),
        async (c) => {

            const { uuid } = c.req.valid('json') 
            const user = await this.service.users.getByUuid(uuid);
            return c.json({ user })

        })

        this.router.post(
        '/get/email',
        zValidatorWrapper('json', UsersSchemas.GetByEmail.Body),
        auth.withUser,
        async (c) => {

            const { email } = c.req.valid('json');
            const user = await this.service.users.getByEmail(email);
            return c.json({ user });

        })

        this.router.post(
        '/get/login',
        zValidatorWrapper('json', UsersSchemas.GetByLogin.Body),
        auth.withUser,
        async (c) => {

            const { login } = c.req.valid('json');
            const user = await this.service.users.getByLogin(login);
            return c.json({ user });

        }
        )
    }

}
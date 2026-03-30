import { BaseModule } from "#web/base/module.base";
import AuthMiddleware, { BaseEnv } from "#web/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import UsersSchemas from "./users.dto";
import { rateLimiter } from "hono-rate-limiter";

type UsersEnv = BaseEnv & {};

export default class UsersModule extends BaseModule<UsersEnv> {

    init() {

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }))

        this.router.post(
        '/get/uuid',
        zValidator('json', UsersSchemas.GetByUuid.Body),
        async (c) => {

            const { uuid } = c.req.valid('json') 
            const user = this.service.users.getByUuid(uuid);
            return c.json({ user })

        })

        this.router.post(
        '/get/email',
        zValidator('json', UsersSchemas.GetByEmail.Body),
        new AuthMiddleware<UsersEnv>(this.factory, this.lib).withUser,
        async (c) => {

            const { email } = c.req.valid('json');
            const user = this.service.users.getByEmail(email);
            return c.json({ user });

        })

        this.router.post(
        '/get/login',
        zValidator('json', UsersSchemas.GetByLogin.Body),
        new AuthMiddleware<UsersEnv>(this.factory, this.lib).withUser,
        async (c) => {

            const { login } = c.req.valid('json');
            const user = this.service.users.getByLogin(login);
            return c.json({ user });

        }
        )
    }

}
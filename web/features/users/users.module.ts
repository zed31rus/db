import { BaseModule } from "#web/base/module.base";
import { BaseEnv } from "#web/middleware/auth.middleware";
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
        '/get',
        zValidator('json', UsersSchemas.Get.Body),
        async (c) => {

            const { uuid } = c.req.valid('json') 
            const user = this.service.users.get(uuid);
            return c.json({ user })

        })
    }

}
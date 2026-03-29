import MeServices from "#services/me";
import UsersService from "#services/users";
import { BaseModule } from "#web/base/module.base";
import CookieSchemas from "#web/dto/cookie.dto";
import AuthMiddleware, { BaseEnv } from "#web/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import UsersSchemas from "./users.dto";

type UsersEnv = BaseEnv & {};

export default class UsersModule extends BaseModule<UsersEnv> {

    init() {
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
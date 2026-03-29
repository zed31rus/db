import { BaseModule } from "#web/base/module.base";
import CookieSchemas from "#web/dto/cookie.dto";
import AuthMiddleware, { BaseEnv } from "#web/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";

type ProfileEnv = BaseEnv & {};

export default class MeModule extends BaseModule<ProfileEnv> {

    init() {
        this.router.post(
        '/get',
        zValidator('cookie', CookieSchemas.both),
        new AuthMiddleware<ProfileEnv>(this.factory, this.lib).withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.me.get(publicUser);
            return c.json({ user });
        })
    }

}
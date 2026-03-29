import LibContainer from "#containers/lib.container";
import MeServices from "#services/me";
import { BaseModule } from "#web/base/module.base";
import CookieSchemas from "#web/dto/cookie.dto";
import AuthMiddleware, { BaseEnv } from "#web/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";

type ProfileEnv = BaseEnv & {};

export default class ProfileModule extends BaseModule<ProfileEnv> {

    init() {
        this.router.post(
        '/get',
        zValidator('cookie', CookieSchemas.both),
        new AuthMiddleware<ProfileEnv>(this.factory, LibContainer).withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.me.get(publicUser);
            return c.json({ user });
        })
    }

}
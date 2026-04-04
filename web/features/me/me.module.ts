import { BaseModule } from "#web/base/module.base";
import CookieSchemas from "#web/dto/cookie.dto";
import AuthMiddleware from "#web/middleware/auth.middleware";
import { AuthEnv } from "#web/types/Env.d";
import zValidatorWrapper from "#web/wrappers/zValidator.wrapper";
import { rateLimiter } from "hono-rate-limiter";

type ProfileEnv = AuthEnv & {};

export default class MeModule extends BaseModule<ProfileEnv> {

    init() {

        const auth = new AuthMiddleware<ProfileEnv>(this.factory, this.lib)

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }))

        this.router.post(
        '/get',
        zValidatorWrapper('cookie', CookieSchemas.both),
        auth.withUser,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.me.get(publicUser);
            return c.json({ user });
        })
    }

}
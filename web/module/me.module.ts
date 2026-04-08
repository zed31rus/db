import { BaseModule } from "#web/base/module.base";
import { UserEnv } from "#web/types/Env.d";
import { rateLimiter } from "hono-rate-limiter";

type ProfileEnv = UserEnv & {};

export default class MeModule extends BaseModule<ProfileEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.post(
        '/get',
        ...this.handler.auth.withValidUser<ProfileEnv>(),
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.me.get(publicUser);
            return c.json({ user });
        })
    }

}
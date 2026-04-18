import { BaseModule } from "#web/base/module.base";
import { UserEnv } from "#web/types/Env.d";

type ProfileEnv = UserEnv & {};

export default class MeModule extends BaseModule<ProfileEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.openapi(
        this.openapi.me.get,
        async (c) => {

            const publicUser = c.get('user');
            const { user } = await this.service.me.get(publicUser);
            return c.json({ user });
        })
    }

}
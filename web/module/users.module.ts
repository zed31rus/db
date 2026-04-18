import { BaseModule } from "#web/base/module.base";
import { UserEnv } from "#web/types/Env.d";

type UsersEnv = UserEnv & {};

export default class UsersModule extends BaseModule<UsersEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.openapi(
        this.openapi.users.getByUuid,
        async (c) => {

            const { uuid } = c.req.valid('param') 
            const user = await this.service.users.getByUuid(uuid);
            return c.json({ user })

        })

        this.router.openapi(
        this.openapi.users.getByEmail,
        async (c) => {

            const { email } = c.req.valid('param');
            const user = await this.service.users.getByEmail(email);
            return c.json({ user });

        })

        this.router.openapi(
        this.openapi.users.getByLogin,
        async (c) => {

            const { login } = c.req.valid('param');
            const user = await this.service.users.getByLogin(login);
            return c.json({ user });

        }
        )
    }

}
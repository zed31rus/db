import { BaseModule } from "#web/base/module.base";
import { rateLimiter } from "hono-rate-limiter";
import { UserEnv } from "#web/types/Env.d";

type UsersEnv = UserEnv & {};

export default class UsersModule extends BaseModule<UsersEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.post(
        '/get/uuid',
        this.wrapper.validator.validate('json', this.dto.users.GetByUuid.Body),
        async (c) => {

            const { uuid } = c.req.valid('json') 
            const user = await this.service.users.getByUuid(uuid);
            return c.json({ user })

        })

        this.router.post(
        '/get/email',
        this.wrapper.validator.validate('json', this.dto.users.GetByEmail.Body),
        ...this.handler.auth.withValidUser<UsersEnv>(),
        async (c) => {

            const { email } = c.req.valid('json');
            const user = await this.service.users.getByEmail(email);
            return c.json({ user });

        })

        this.router.post(
        '/get/login',
        this.wrapper.validator.validate('json', this.dto.users.GetByLogin.Body),
        ...this.handler.auth.withValidUser<UsersEnv>(),
        async (c) => {

            const { login } = c.req.valid('json');
            const user = await this.service.users.getByLogin(login);
            return c.json({ user });

        }
        )
    }

}
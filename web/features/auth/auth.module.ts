import { BaseModule } from "#web/base/module.base";
import { rateLimiter } from "hono-rate-limiter";
import { UserEnv } from "#web/types/Env.d";

type AuthEnv = UserEnv & {}

export default class AuthModule extends BaseModule<AuthEnv> {

    init() {

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 20,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }));

        this.router.post(
        '/register',
        this.wrapper.validator.validate('json', this.dto.auth.Register.Body),
        async (c) => {
            
            const { login, email, password, nickname } = c.req.valid('json');
            const { user } = await this.service.auth.register(login, email, password, nickname);
            return c.json({ user });
        });


        this.router.post(
        '/login',
        this.wrapper.validator.validate('json', this.dto.auth.Login.Body),
        async (c) => {

            const { login, password } = c.req.valid('json');
            const { user, refresh, access } = await this.service.auth.login(login, password);
            this.webManager.session.sendSession(c, refresh, access);
            return c.json({user});
        });


        this.router.post(
        '/refresh',
        this.wrapper.validator.validate('cookie', this.dto.cookie.refresh),
        async (c) => {
            
            const { refreshToken } = c.req.valid('cookie');
            const { user, refresh, access } = await this.service.auth.refresh(refreshToken);
            this.webManager.session.sendSession(c, refresh, access);
            return c.json({ user });
        });


        this.router.post(
        '/logout',
        this.wrapper.validator.validate('cookie', this.dto.cookie.refresh),
        async (c) => {
            
            this.webManager.session.deleteSession(c);
            const {refreshToken} = c.req.valid('cookie');
            await this.service.auth.logOut(refreshToken);
            return c.json({}, 200);
        });
    }

}

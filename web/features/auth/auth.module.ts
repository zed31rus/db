import { zValidator } from "@hono/zod-validator";
import AuthSchemas from "#web/features/auth/auth.dto";
import { BaseModule } from "#web/base/module.base";
import CookieSchemas from "#web/dto/cookie.dto";
import { rateLimiter } from "hono-rate-limiter";
import { AuthEnv } from "#web/types/Env.d";
import zValidatorWrapper from "#web/wrappers/zValidator.wrapper";

type AuthEnv = AuthEnv & {}

export default class AuthModule extends BaseModule<AuthEnv> {

    init() {

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 20,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }));

        this.router.post(
        '/register',
        zValidatorWrapper('json', AuthSchemas.Register.Body),
        async (c) => {
            
            const { login, email, password, nickname } = c.req.valid('json');
            const { user } = await this.service.auth.register(login, email, password, nickname);
            return c.json({ user });
        });


        this.router.post(
        '/login',
        zValidatorWrapper('json', AuthSchemas.Login.Body),
        async (c) => {

            const { login, password } = c.req.valid('json');
            const { user, refresh, access } = await this.service.auth.login(login, password);
            this.webManager.session.sendSession(c, refresh, access);
            return c.json({user});
        });


        this.router.post(
        '/refresh',
        zValidatorWrapper('cookie', CookieSchemas.refresh),
        async (c) => {
            
            const { refreshToken } = c.req.valid('cookie');
            const { user, refresh, access } = await this.service.auth.refresh(refreshToken);
            this.webManager.session.sendSession(c, refresh, access);
            return c.json({ user });
        });


        this.router.post(
        '/logout',
        zValidatorWrapper('cookie', CookieSchemas.refresh),
        (c) => {
            
            this.webManager.session.deleteSession(c);
            const {refreshToken} = c.req.valid('cookie');
            this.service.auth.logOut(refreshToken);
            return c.json({}, 200);
        });
    }

}

import { zValidator } from "@hono/zod-validator";
import AuthSchemas from "./auth.dto";
import SessionWebManager from "#web/webManagers/session.webManager";
import { BaseModule } from "#web/base/module.base";
import { BaseEnv } from "#web/middleware/auth.middleware";
import CookieSchemas from "#web/dto/cookie.dto";
import { rateLimiter } from "hono-rate-limiter";

type AuthEnv = BaseEnv & {}

export default class AuthModule extends BaseModule<AuthEnv> {
    init() {

        this.router.use(rateLimiter({
            windowMs: 15 * 60 * 1000,
            limit: 20,
            keyGenerator: (c) => c.req.header("x-forwarded-for") ?? ""
        }));

        this.router.post(
        '/register',
        zValidator('json', AuthSchemas.Register.Body),
        async (c) => {
            
            const { login, email, password, nickname } = c.req.valid('json');
            const { user } = await this.service.auth.register(login, email, password, nickname);
            return c.json({ user });
        });


        this.router.post(
        '/login',
        zValidator('json', AuthSchemas.Login.Body),
        async (c) => {

            const { login, password } = c.req.valid('json');
            const { user, refresh, access } = await this.service.auth.login(login, password);
            this.webManager.session.sendSession(c, refresh, access);
            return c.json({user});
        });


        this.router.post(
        '/refresh',
        zValidator('cookie', CookieSchemas.refresh),
        async (c) => {
            
            const { refreshToken } = c.req.valid('cookie');
            const { user, refresh, access } = await this.service.auth.refresh(refreshToken);
            this.webManager.session.sendSession(c, refresh, access);
            return c.json({ user });
        });


        this.router.post(
        '/logout',
        zValidator('cookie', CookieSchemas.refresh),
        (c) => {
            
            this.webManager.session.deleteSession(c);
            const {refreshToken} = c.req.valid('cookie');
            this.service.auth.logOut(refreshToken);
            return c.json({}, 200);
        });
    }
}

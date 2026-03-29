import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import AuthSchemas from "./auth.dto";
import AuthServices from "#services/auth";
import SessionManager from "#web/managers/session.manager";
import { BaseModule } from "#web/base/module.base";
import { BaseEnv } from "#web/middleware/auth.middleware";
import CookieSchemas from "#web/dto/cookie.dto";

type AuthEnv = BaseEnv & {}

export default class AuthModule extends BaseModule<AuthEnv> {
    init() {

        this.router.post(
            '/register',
            zValidator('json', AuthSchemas.Register.Body),
            async (c) => {
            
            const { login, email, password, nickname } = c.req.valid('json');
            const { user } = await AuthServices.register(login, email, password, nickname);
            return c.json({ user });
        });


        this.router.post(
            '/login',
            zValidator('json', AuthSchemas.Login.Body),
            async (c) => {

            const { login, password } = c.req.valid('json');
            const { user, refresh, access } = await AuthServices.login(login, password);
            SessionManager.sendSession(c, refresh, access);
            return c.json({user})
        });


        this.router.post(
            '/refresh',
            zValidator('cookie', CookieSchemas.refresh),
            async (c) => {
            
            const { refreshToken } = c.req.valid('cookie');
            const { user, refresh, access } = await AuthServices.refresh(refreshToken);
            SessionManager.sendSession(c, refresh, access);
            return c.json({ user })
        });


        this.router.post(
            '/logout',
            (c) => {

            SessionManager.deleteSession(c);
            return c.json({}, 200);
        });
    }
}

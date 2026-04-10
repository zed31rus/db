import baseHandler from "#web/base/handler.base";
import { UserEnv } from "#web/types/Env.d";
import { zValidator } from "@hono/zod-validator";

export default class AuthHandler extends baseHandler {
    public withValidUser<T extends UserEnv>() {
        return this.createFactory<T>().createHandlers( zValidator('cookie', this.dto.cookie.both),
        this.middleware.auth.withUser<T>())
    }
}
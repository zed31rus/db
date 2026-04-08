import baseHandler from "#web/base/handler.base";
import { AvatarUserEnv, UserEnv } from "#web/types/Env.d";
import { zValidator } from "@hono/zod-validator";
import { ZodObject } from "zod";

export default class AuthHandler extends baseHandler {
    public withValidUser<T extends UserEnv>() {
        return this.createFactory<T>().createHandlers( zValidator('cookie', this.dto.cookie.both),
        this.middleware.auth.withUser<T>())
    }
}
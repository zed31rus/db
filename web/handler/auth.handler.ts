import baseHandler from "#web/base/handler.base";
import { AvatarUserEnv, UserEnv } from "#web/types/Env.d";
import { zValidator } from "@hono/zod-validator";
import { ZodObject } from "zod";

export default class AuthHandler extends baseHandler {
    public withValidUser<T extends UserEnv>(schema: ZodObject) {
        return this.createFactory<T>().createHandlers( zValidator('cookie', schema), this.middleware.auth.withUser<T>())
    }
}
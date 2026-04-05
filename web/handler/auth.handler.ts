import baseHandler from "#web/base/handler.base";
import AuthMiddleware from "#web/middleware/auth.middleware";
import { UserEnv } from "#web/types/Env.d";
import { zValidator } from "@hono/zod-validator";
import { ZodObject } from "zod";

export default class AuthHandler extends baseHandler {
    public authWithValidUser<T extends UserEnv>(schema: ZodObject) {
        return this.factory<T>().createHandlers( zValidator('json', schema), this.middleware.auth.withUser<T>())
    }
}
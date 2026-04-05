import baseMiddleware from "#web/base/middleware.base";
import { UserEnv } from "#web/types/Env.d";
import { getCookie } from "hono/cookie";

export default class FileMiddleware extends baseMiddleware {

    public withAvatar() { 
        return this.factory().createMiddleware( async (c, next) => {

        });
    }
};

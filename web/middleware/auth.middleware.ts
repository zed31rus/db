import JWT from "#core/lib/jwt/jwt.lib.js";
import baseMiddleware from "#web/base/middleware.base.js";
import { getCookie } from "hono/cookie";
import { OptionalUserEnv, UserEnv } from "#web/types/Env.js";
import ApiError from "#errors/api.errors.js";

export default class AuthMiddleware extends baseMiddleware {

    public withUser<T extends UserEnv>() { 
        return this.createFactory<T>().createMiddleware( async (c, next) => {
            const jwt = new JWT(this.config, this.errors);
            const Authorization = c.req.header('Authorization');
            const accessToken = Authorization?.replace('Bearer', '')

            if (!accessToken) throw ApiError.Unauthorized();

            const publicUser = await jwt.verify(accessToken, this.config.env.JWT_SECRET);

            c.set('user',publicUser);

            await next();
        });
    }

    public withOptionalUser<T extends OptionalUserEnv>() {
        return this.createFactory<T>().createMiddleware( async (c, next) => {
            const jwt = new JWT(this.config, this.errors);
            const Authorization = c.req.header('Authorization');
            const accessToken = Authorization?.replace('Bearer', '')

            let publicUser = null;
            if (accessToken) {
                publicUser = await jwt.verify(accessToken, this.config.env.JWT_SECRET);
            }

            c.set('user',publicUser);

            await next();
        });
    }
};

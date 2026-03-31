import { PublicUser } from "#lib/selector/user.selector";
import baseMiddleware from "#web/base/middleware.base";
import { getCookie } from "hono/cookie";

export type BaseEnv = {
    Variables: {
        user: PublicUser;
    }
};

export default class AuthMiddleware<T extends BaseEnv> extends baseMiddleware<T> {
    public get withUser() { 
        return this.factory.createMiddleware( async (c, next) => {
            const refreshToken = getCookie(c, 'refreshToken');
            const accessToken = getCookie(c, 'accessToken');

            if (!refreshToken) return c.json({error: 'Unauthorized'}, 401);
            if (!accessToken) return c.json({error: 'Unauthorized'}, 401);

            const publicUser = await this.lib.jwt.verify(accessToken, process.env.JWT_SECRET!);

            c.set('user',publicUser);

            await next();
        });
    }
};

import baseMiddleware from "#web/base/middleware.base";
import { AvatarEnv } from "#web/types/Env.d";

export default class fileMiddleware<T extends AvatarEnv> extends baseMiddleware {
    public get withAvatar() {
        return this.factory.createMiddleware<{ In: AvatarEnv['In'] }>( async (c, next) => {
            c.req.valid('')
        });
    }
}
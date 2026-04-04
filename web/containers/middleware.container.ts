import AuthMiddleware from "#web/middleware/auth.middleware";
import { AuthEnv } from "#web/types/Env.d";

export default class middlewareContainer<T extends AuthEnv> {
    constructor(
        readonly auth: AuthMiddleware<T>
    ) {}
}
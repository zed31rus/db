import AuthMiddleware from "#web/middleware/auth.middleware";
import { BaseEnv } from "#web/types/Env.d";

export default class middlewareContainer<T extends BaseEnv> {
    constructor(
        readonly auth: AuthMiddleware<T>
    ) {}
}
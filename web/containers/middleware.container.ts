import AuthMiddleware, { BaseEnv } from "#web/middleware/auth.middleware";

export default class middlewareContainer<T extends BaseEnv> {
    constructor(
        readonly auth: AuthMiddleware<T>
    ) {}
}
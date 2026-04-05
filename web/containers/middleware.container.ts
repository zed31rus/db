import AuthMiddleware from "#web/middleware/auth.middleware";
import FileMiddleware from "#web/middleware/file.middleware";

export default class MiddlewareContainer {
    constructor(
        readonly auth: AuthMiddleware,
        readonly file: FileMiddleware
    ) {}
}
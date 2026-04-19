import AuthMiddleware from "#web/middleware/auth.middleware.js";
import FileMiddleware from "#web/middleware/file.middleware.js";

export default class MiddlewareContainer {
    constructor(
        readonly auth: AuthMiddleware,
        readonly file: FileMiddleware
    ) {}
}
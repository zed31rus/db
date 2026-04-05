import AuthHandler from "#web/handler/auth.handler";
import FileHandler from "#web/handler/file.handler";

export default class HandlerContainer {
    constructor(
        readonly auth: AuthHandler,
        readonly file: FileHandler
    ) {}
}
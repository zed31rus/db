import LibContainer from "#containers/lib.container";
import MiddlewareContainer from "#web/containers/middleware.container";
import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseHandler {

    constructor(
        protected readonly lib: LibContainer,
        protected readonly middleware: MiddlewareContainer
    ) {}

    protected factory<T extends Env>() {
        return createFactory<T>();
    }
}
import LibContainer from "#containers/lib.container";
import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseMiddleware {

    constructor(
        protected readonly lib: LibContainer
    ) {}

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
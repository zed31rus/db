import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseMiddleware {

    constructor(
    ) {}

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
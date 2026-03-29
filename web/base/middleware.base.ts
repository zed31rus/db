import { Env } from "hono";
import { Factory } from "hono/factory";

export default abstract class baseMiddleware<T extends Env> {
    protected factory: Factory<T>;

    constructor(factory: Factory<T>) {
        this.factory = factory;
    }
}
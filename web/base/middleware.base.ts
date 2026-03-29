import { LibContainer } from "#containers/lib.container";
import { Env } from "hono";
import { Factory } from "hono/factory";

export default abstract class baseMiddleware<T extends Env> {

    constructor(protected factory: Factory<T>, protected readonly lib: LibContainer) {}
}
import DtoContainer from "#web/containers/dto.container";
import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseMiddleware {

    constructor(
        protected readonly dto: DtoContainer
    ) {}

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
import DtoContainer from "#web/containers/dto.container.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import WebManagerContainer from "#web/containers/managers.container.js";
import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseMiddleware {

    constructor(
        protected readonly dto: DtoContainer,
        protected readonly wrappers: WrapperContainer,
        protected readonly webManagers: WebManagerContainer
    ) {}

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
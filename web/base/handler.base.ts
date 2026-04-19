import MiddlewareContainer from "#web/containers/middleware.container.js";
import DtoContainer from "#web/containers/dto.container.js";
import ManagerContainer from "#web/containers/managers.container.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseHandler {

    constructor(
        protected readonly middleware: MiddlewareContainer,
        protected readonly wrapper: WrapperContainer,
        protected readonly dto: DtoContainer,
        protected readonly manager: ManagerContainer
    ) {}

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
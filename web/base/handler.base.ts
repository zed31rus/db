import DtoContainer from "#web/containers/dto.container";
import MiddlewareContainer from "#web/containers/middleware.container";
import WrapperContainer from "#web/containers/wrapper.container";
import { Env } from "hono";
import { createFactory } from "hono/factory";

export default abstract class baseHandler {

    constructor(
        protected readonly middleware: MiddlewareContainer,
        protected readonly wrapper: WrapperContainer,
        protected readonly dto: DtoContainer
    ) {}

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
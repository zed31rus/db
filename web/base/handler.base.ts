import MiddlewareContainer from "#web/containers/middleware.container.js";
import DtoContainer from "#web/containers/dto.container.js";
import ManagerContainer from "#web/containers/managers.container.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import { Env } from "hono";
import { createFactory } from "hono/factory";
import WebBase from "./base.js";
import { BaseArgs } from "#root/core/base/base.js";

export default abstract class baseHandler extends WebBase {

    constructor(
        protected readonly middleware: MiddlewareContainer,
        protected readonly wrapper: WrapperContainer,
        protected readonly dto: DtoContainer,
        protected readonly manager: ManagerContainer,
        ...baseArgs: BaseArgs) {
            super(...baseArgs);
        }

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}
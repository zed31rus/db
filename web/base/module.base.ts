import { OpenAPIHono } from "@hono/zod-openapi";
import { Env } from "hono";
import { createFactory } from "hono/factory";
import { OptionalUserEnv } from "#web/types/Env.js";
import DtoContainer from "#web/containers/dto.container.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import ServiceContainer from "#root/core/containers/services.container.js";
import WebManagerContainer from "#web/containers/managers.container.js";
import HandlerContainer from "#web/containers/handler.container.js";
import MiddlewareContainer from "#web/containers/middleware.container.js";
import OpenAPIContainer from "#web/containers/openapi.container.js";

export abstract class BaseModule<T extends OptionalUserEnv> {
    public router = new OpenAPIHono<T>();

    constructor(
        protected readonly dto: DtoContainer,
        protected readonly wrapper: WrapperContainer,
        protected readonly service: ServiceContainer,
        protected readonly webManager: WebManagerContainer,
        protected readonly handler: HandlerContainer,
        protected readonly middleware: MiddlewareContainer,
        protected readonly openapi: OpenAPIContainer
    ) {
        this.init();
    }

    protected factory<T extends Env>() {
        return createFactory<T>();
    }

    protected abstract init(): void;
}
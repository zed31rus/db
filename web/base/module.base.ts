import ServiceContainer from "#containers/service.container";
import DtoContainer from "#web/containers/dto.container";
import HandlerContainer from "#web/containers/handler.container";
import MiddlewareContainer from "#web/containers/middleware.container";
import OpenAPIContainer from "#web/containers/openapi.container";
import WebManagerContainer from "#web/containers/webManager.container";
import WrapperContainer from "#web/containers/wrapper.container";
import { OptionalUserEnv } from "#web/types/Env.d";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Env } from "hono";
import { createFactory } from "hono/factory";

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
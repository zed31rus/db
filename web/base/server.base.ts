import HandlerContainer from "#web/containers/handler.container";
import ModuleContainer from "#web/containers/module.container";
import WebManagerContainer from "#web/containers/webManager.container";
import WrapperContainer from "#web/containers/wrapper.container";
import { ServerType } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";

export default abstract class BaseServer {

    constructor(
        protected readonly server: OpenAPIHono,
        protected readonly webManager: WebManagerContainer,
        protected readonly module: ModuleContainer,
        protected readonly handler: HandlerContainer,
        protected readonly wrapper: WrapperContainer
    ) {

    };

    abstract configureWebServer(): any;
    abstract startWebServer(port: number): ServerType;
}
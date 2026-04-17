import HandlerContainer from "#web/containers/handler.container";
import ModuleContainer from "#web/containers/module.container";
import WebManagerContainer from "#web/containers/webManager.container";
import WrapperContainer from "#web/containers/wrapper.container";
import { ServerType } from "@hono/node-server";
import { Hono } from "hono";

export default abstract class BaseServer {

    constructor(
        protected readonly server: Hono,
        protected readonly webManager: WebManagerContainer,
        protected readonly module: ModuleContainer,
        protected readonly handler: HandlerContainer,
        protected readonly wrapper: WrapperContainer
    ) {

    };

    abstract configureWebServer(): any;
    abstract startWebServer(port: number): ServerType;
}
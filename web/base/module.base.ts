import LibContainer from "#containers/lib.container";
import ServiceContainer from "#containers/service.container";
import middlewareContainer from "#web/containers/middleware.container";
import WebManagerContainer from "#web/containers/webManager.container";
import { BaseEnv } from "#web/middleware/auth.middleware";
import { Hono } from "hono";
import { Factory } from "hono/factory";

export abstract class BaseModule<T extends BaseEnv> {
    public router = new Hono<T>();

    constructor(

        protected factory: Factory<T>,
        protected readonly service: ServiceContainer,
        protected readonly lib: LibContainer,
        protected readonly webManager: WebManagerContainer,
    ) {
        this.init();
    }

    protected abstract init(): void;
}
import LibContainer from "#containers/lib.container";
import ServiceContainer from "#containers/service.container";
import { Env, Hono } from "hono";
import { Factory } from "hono/factory";

export abstract class BaseModule<T extends Env> {
    public router = new Hono<T>();

    constructor(
        protected factory: Factory<T>,
        protected readonly service: ServiceContainer,
        protected readonly lib: LibContainer
    ) {
        this.init();
    }

    protected abstract init(): void;
}
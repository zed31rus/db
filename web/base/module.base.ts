import { ServiceContainer } from "#containers/service.container";
import { Env, Hono } from "hono";
import { createFactory, Factory } from "hono/factory";

export abstract class BaseModule<T extends Env> {
    public router = new Hono<T>();

    constructor(protected factory: Factory<T>, protected readonly service: ServiceContainer) {
        this.init();
    }

    protected abstract init(): void;
}
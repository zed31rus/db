import { Env, Hono } from "hono";
import { createFactory, Factory } from "hono/factory";

export abstract class BaseModule<T extends Env> {
    public router = new Hono<T>();
    protected factory: Factory<T>;

    constructor(factory: Factory<T>) {
        this.factory = factory;

        this.init();
    }

    protected abstract init(): void;
}
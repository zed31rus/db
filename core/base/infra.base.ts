import Base, { BaseArgs } from "./base.js";

export default abstract class BaseInfra extends Base {
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs)
    }
}
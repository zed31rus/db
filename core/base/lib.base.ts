import Base, { BaseArgs } from "./base.js";

export default abstract class BaseLib extends Base {
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs)
    }
}
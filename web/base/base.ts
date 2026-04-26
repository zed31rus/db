import Base, { BaseArgs } from "#root/core/base/base.js";

export default abstract class WebBase extends Base {
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs);
    }
}
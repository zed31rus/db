import { BaseArgs } from "#root/core/base/base.js";
import WebBase from "./base.js";

export default abstract class BaseWebManager extends WebBase {
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs);
    }
}
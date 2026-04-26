import { BaseArgs } from "#root/core/base/base.js";
import WebBase from "./base.js";

export default abstract class BaseWrapper extends WebBase {
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs);
    }
}
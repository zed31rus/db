import Base, { BaseArgs } from "./base.js";

export default abstract class BaseRepository extends Base {
    constructor(...baseArgs: BaseArgs) {
        super(...baseArgs)
    }
}
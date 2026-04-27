import InfraContainer from "#core/containers/infra.container.js";
import LibContainer from "#core/containers/lib.container.js";
import ManagerContainer from "#core/containers/manager.container.js";
import DB from "#core/db/db.js";
import Base, { BaseArgs } from "./base.js";

export default abstract class BaseService extends Base {
    constructor(
        protected readonly lib: LibContainer,
        protected readonly manager: ManagerContainer,
        protected readonly db: DB,
        protected readonly infra: InfraContainer,
        ...baseArgs: BaseArgs) {
            super(...baseArgs)
        }
}
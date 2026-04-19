import InfraContainer from "#core/containers/infra.container.js";
import LibContainer from "#core/containers/lib.container.js";
import ManagerContainer from "#core/containers/manager.container.js";
import RepositoryContainer from "#core/containers/repository.container.js";

export default abstract class BaseService {
    constructor(
        protected readonly lib: LibContainer,
        protected readonly manager: ManagerContainer,
        protected readonly repository: RepositoryContainer,
        protected readonly infra: InfraContainer
    ) {}
}
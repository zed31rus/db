import InfraContainer from "#core/containers/infra.container.js";
import LibContainer from "#core/containers/lib.container.js";
import RepositoryContainer from "#core/containers/repository.container.js";

export default abstract class BaseManager {
    constructor(
        protected readonly lib: LibContainer,
        protected readonly repository: RepositoryContainer,
        protected readonly infra: InfraContainer
    ) {}
}
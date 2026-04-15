import InfraContainer from "#containers/infra.container";
import LibContainer from "#containers/lib.container";
import ManagerContainer from "#containers/manager.container";
import RepositoryContainer from "#containers/repository.container";

export default abstract class BaseService {
    constructor(
        protected readonly lib: LibContainer,
        protected readonly manager: ManagerContainer,
        protected readonly repository: RepositoryContainer,
        protected readonly infra: InfraContainer
    ) {}
}
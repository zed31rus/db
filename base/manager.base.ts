import LibContainer from "#containers/lib.container";
import RepositoryContainer from "#containers/repository.container";

export default abstract class BaseManager {
    constructor(
        protected readonly lib: LibContainer,
        protected readonly repository: RepositoryContainer
    ) {}
}
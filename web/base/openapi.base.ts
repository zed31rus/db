import DtoContainer from "#web/containers/dto.container";
import HandlerContainer from "#web/containers/handler.container";
import MiddlewareContainer from "#web/containers/middleware.container";

export default abstract class BaseOpenAPI {
    constructor(
        protected readonly dto: DtoContainer,
        protected readonly middleware: MiddlewareContainer,
        protected readonly handler: HandlerContainer,
    ) {}
}
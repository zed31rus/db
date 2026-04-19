import DtoContainer from "#web/containers/dto.container.js";
import HandlerContainer from "#web/containers/handler.container.js";
import MiddlewareContainer from "#web/containers/middleware.container.js";

export default abstract class BaseOpenAPI {
    constructor(
        protected readonly dto: DtoContainer,
        protected readonly middleware: MiddlewareContainer,
        protected readonly handler: HandlerContainer,
    ) {}
}
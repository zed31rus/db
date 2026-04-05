import SessionWebManager from "#web/webManagers/session.webManager";
import WebManagerContainer from "#web/containers/webManager.container";
import MiddlewareContainer from "./middleware.container.js";
import AuthMiddleware from "#web/middleware/auth.middleware";
import FileMiddleware from "#web/middleware/file.middleware";
import CoreContainers from "#containers/index.container";
import HandlerContainer from "./handler.container.js";
import AuthHandler from "#web/handler/auth.handler";
import FileHandler from "#web/handler/file.handler";

const webManagerContainer = new WebManagerContainer(
    new SessionWebManager()
)

const middlewareContainer = new MiddlewareContainer(
    new AuthMiddleware(CoreContainers.libContainer),
    new FileMiddleware(CoreContainers.libContainer)
)

const handlerContainer = new HandlerContainer(
    new AuthHandler(CoreContainers.libContainer, middlewareContainer),
    new FileHandler(CoreContainers.libContainer, middlewareContainer)
)

export default { webManagerContainer, middlewareContainer, handlerContainer }
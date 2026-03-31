import AuthMiddleware from "#web/middleware/auth.middleware";
import SessionWebManager from "#web/webManagers/session.webManager";
import MiddlewareContainer from "./middleware.container";
import WebManagerContainer from "./webManager.container";

const webManagerContainer = new WebManagerContainer(
    new SessionWebManager()
)

export default { webManagerContainer }
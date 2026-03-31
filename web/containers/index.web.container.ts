import SessionWebManager from "#web/webManagers/session.webManager";
import WebManagerContainer from "./webManager.container.js";

const webManagerContainer = new WebManagerContainer(
    new SessionWebManager()
)

export default { webManagerContainer }
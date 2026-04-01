import SessionWebManager from "#web/webManagers/session.webManager";
import WebManagerContainer from "#web/containers/webManager.container";

const webManagerContainer = new WebManagerContainer(
    new SessionWebManager()
)

export default { webManagerContainer }
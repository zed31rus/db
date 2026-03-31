import SessionWebManager from "#web/webManagers/session.webManager";

export default class WebManagerContainer {
    constructor(
        readonly session: SessionWebManager,
    ) {}
}
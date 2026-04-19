import SessionWebManager from "#web/managers/session.webManager.js";

export default class WebManagerContainer {
    constructor(
        readonly session: SessionWebManager,
    ) {}
}
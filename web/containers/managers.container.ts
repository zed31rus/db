import SessionWebManager from "#root/web/managers/session.manager.js";

export default class WebManagerContainer {
    constructor(
        readonly session: SessionWebManager,
    ) {}
}
import SessionWebManager from "#web/webManagers/session.webManager";
import { readonly } from "zod";

export default class WebManagerContainer {
    constructor(
        readonly session: SessionWebManager,
    ) {}
}
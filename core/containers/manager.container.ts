import OtpManager from "#core/managers/account/otp.manager.js";
import SessionManager from "#core/managers/auth/session.manager.js";

export default class ManagerContainer {
    constructor(
        readonly otp: OtpManager,
        readonly session: SessionManager,
    ) {}
}
import OtpManager from "#managers/account/otp.manager";
import SessionManager from "#managers/auth/session.manager";

export default class ManagerContainer {
    constructor(
        readonly otp: OtpManager,
        readonly session: SessionManager
    ) {}
}
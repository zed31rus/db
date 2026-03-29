import OtpManager from "#managers/account/otp.manager";
import SessionManager from "#managers/auth/session.manager";
import LibContainer from "./lib.container";
import RepositoryContainer from "./repository.container";

const ManagerContainer = {
    otp: new OtpManager(LibContainer, RepositoryContainer),
    session: new SessionManager(LibContainer, RepositoryContainer)
}

export type ManagerContainer = typeof ManagerContainer;
export default ManagerContainer;
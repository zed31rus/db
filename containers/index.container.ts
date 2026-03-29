import Hash from "#lib/hash/hash.lib";
import JWT from "#lib/jwt/jwt.lib";
import Mail from "#lib/mail/mail.lib";
import RefreshToken from "#lib/refreshToken/refreshToken.lib";
import UserSelector from "#lib/selector/user.selector";
import VerificationCode from "#lib/verificationCode/verificationCode.lib";
import OtpManager from "#managers/account/otp.manager";
import SessionManager from "#managers/auth/session.manager";
import DB from "#repo/db/db";
import AccountService from "#services/account";
import AuthService from "#services/auth";
import MeService from "#services/me";
import UsersService from "#services/users";
import LibContainer from "./lib.container";
import ManagerContainer from "./manager.container";
import RepositoryContainer from "./repository.container";
import ServiceContainer from "./service.container";


const libContainer = new LibContainer(
    new Hash(),
    new JWT(),

    new Mail({
        user: process.env.SMTP_USER!,
        key: process.env.SMTP_API_KEY!,
        host: process.env.SMTP_HOST!,
        email: process.env.SMTP_EMAIL!,
        name: "zed31rus.ru Auth Service"
    }),

    new RefreshToken(),
    new UserSelector(),
    new VerificationCode(),

);

const repositoryContainer = new RepositoryContainer(
    new DB()
);

const managerContainer = new ManagerContainer(
    new OtpManager(libContainer, repositoryContainer),
    new SessionManager(libContainer, repositoryContainer)
);

const serviceContainer = new ServiceContainer(
    new AccountService(libContainer, managerContainer, repositoryContainer),
    new AuthService(libContainer, managerContainer, repositoryContainer),
    new MeService(libContainer, managerContainer, repositoryContainer),
    new UsersService(libContainer, managerContainer, repositoryContainer)
);

export default {libContainer, repositoryContainer, managerContainer, serviceContainer};
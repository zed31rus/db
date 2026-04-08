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
import LibContainer from "#containers/lib.container";
import ManagerContainer from "#containers/manager.container";
import RepositoryContainer from "#containers/repository.container";
import ServiceContainer from "#containers/service.container";
import configEnv from "#config/env.config"

const libs = new LibContainer(
    new Hash(),
    new JWT(),

    new Mail({
        user: configEnv.SMTP_USER,
        key: configEnv.SMTP_API_KEY,
        host: configEnv.SMTP_HOST,
        email: configEnv.SMTP_EMAIL,
        name: "zed31rus.ru Auth Service"
    }),

    new RefreshToken(),
    new UserSelector(),
    new VerificationCode(),

);

const repositorys = new RepositoryContainer(
    new DB()
);

const managers = new ManagerContainer(
    new OtpManager(libs, repositorys),
    new SessionManager(libs, repositorys)
);

const services = new ServiceContainer(
    new AccountService(libs, managers, repositorys),
    new AuthService(libs, managers, repositorys),
    new MeService(libs, managers, repositorys),
    new UsersService(libs, managers, repositorys)
);

export default { services }

import LibContainer from "#core/containers/lib.container.js";
import Hash from "#core/lib/hash/hash.lib.js";
import JWT from "#core/lib/jwt/jwt.lib.js";
import Mail from "#core/lib/mail/mail.lib.js";
import configEnv from "#config/env.config.js";
import RefreshToken from "#core/lib/refreshToken/refreshToken.lib.js";
import UserSelector from "#core/lib/selector/user.selector.js";
import VerificationCode from "#core/lib/verificationCode/verificationCode.lib.js";
import InfraContainer from "#core/containers/infra.container.js";
import DiscordOauthInfra from "#core/infra/discord/oauth.discord.infra.js";
import RepositoryContainer from "#core/containers/repository.container.js";
import DB from "#core/repository/db/db.js";
import ManagerContainer from "#core/containers/manager.container.js";
import OtpManager from "#root/core/managers/otp.manager.js";
import SessionManager from "#root/core/managers/session.manager.js";
import ServiceContainer from "#core/containers/services.container.js";
import AccountService from "#core/services/account.service.js";
import AuthService from "#core/services/auth.service.js";
import MeService from "#core/services/me.service.js";
import UsersService from "#core/services/users.service.js";
import DiscordOauthService from "#core/services/oauth/discord.oauth.service.js";
import RabbitMqInfra from "../infra/rabbitmq/rabbitmq.infra.js";
import BaseContainer from "#core/base/container.base.js";

export default class CoreContainer extends BaseContainer {

    libs = new LibContainer(
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

    repositories = new RepositoryContainer(
        new DB()
    );

    infra = new InfraContainer(
        RabbitMqInfra.getInstance(),
        { discord: new DiscordOauthInfra }
    )

    managers = new ManagerContainer(
        new OtpManager(this.libs, this.repositories, this.infra),
        new SessionManager(this.libs, this.repositories, this.infra)
    );

    services = new ServiceContainer(
        new AccountService(this.libs, this.managers, this.repositories, this.infra),
        new AuthService(this.libs, this.managers, this.repositories, this.infra),
        new MeService(this.libs, this.managers, this.repositories, this.infra),
        new UsersService(this.libs, this.managers, this.repositories, this.infra),
        { discord: new DiscordOauthService(this.libs, this.managers, this.repositories, this.infra)}
    );

}

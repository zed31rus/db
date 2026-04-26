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
import ApiError from "#root/errors/api.errors.js";
import ConfigError from "#root/errors/config.errors.js";
import PrismaError from "#root/errors/prisma.errors.js";

const errors = {
    api: new ApiError(),
    config: new ConfigError(),
    prisma: new PrismaError()
}

const config = {
    env: new configEnv(errors)
}

const libs = new LibContainer(
    new Hash(config, errors),
    new JWT(config, errors),

    new Mail(config, errors),

    new RefreshToken(config, errors),
    new UserSelector(config, errors),
    new VerificationCode(config, errors),
);

const repositories = new RepositoryContainer(
    new DB(config, errors)
);

const infra = new InfraContainer(
    RabbitMqInfra.getInstance(),
    { discord: new DiscordOauthInfra(config, errors) }
)

const managers = new ManagerContainer(
    new OtpManager(libs, repositories, infra, config, errors),
    new SessionManager(libs, repositories, infra, config, errors)
);

const services = new ServiceContainer(
    new AccountService(libs, managers, repositories, infra, config, errors),
    new AuthService(libs, managers, repositories, infra, config, errors),
    new MeService(libs, managers, repositories, infra, config, errors),
    new UsersService(libs, managers, repositories, infra, config, errors),
    {
        discord: new DiscordOauthService(libs, managers, repositories, infra, config, errors)
    }
);

export default { services }

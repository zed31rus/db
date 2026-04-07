import coreContainers from "#containers/index.container"
import WebManagerContainer from "#web/containers/webManager.container";
import SessionWebManager from "#web/webManagers/session.webManager";
import MiddlewareContainer from "#web/containers/middleware.container";
import AuthMiddleware from "#web/middleware/auth.middleware";
import FileMiddleware from "#web/middleware/file.middleware";
import HandlerContainer from "#web/containers/handler.container";
import AuthHandler from "#web/handler/auth.handler";
import FileHandler from "#web/handler/file.handler";
import ModuleContainer from "#web/containers/module.container";
import AccountModule from "#web/features/account/account.module";
import AuthModule from "#web/features/auth/auth.module";
import MeModule from "#web/features/me/me.module";
import UsersModule from "#web/features/users/users.module";
import DtoContainer from "#web/containers/dto.container";
import CookieDto from "#web/dto/cookie.dto";
import fileDto from "#web/dto/file.dto";
import AccountDto from "#web/features/account/account.dto";
import AuthDto from "#web/features/auth/auth.dto";
import MeDto from "#web/features/me/me.dto";
import UsersDto from "#web/features/users/users.dto";
import ValidatorWrapper from "#web/wrappers/validator.wrapper";
import WrapperContainer from "#web/containers/wrapper.container";

const dtoContainer = new DtoContainer(
    new CookieDto(),
    new fileDto(),
    new AccountDto(),
    new AuthDto(),
    new MeDto(),
    new UsersDto()
)

const wrapperContainer = new WrapperContainer(
    new ValidatorWrapper()
)

const webManagerContainer = new WebManagerContainer(
    new SessionWebManager()
)

const middlewareContainer = new MiddlewareContainer(
    new AuthMiddleware(),
    new FileMiddleware()
)

const handlerContainer = new HandlerContainer(
    new AuthHandler(middlewareContainer),
    new FileHandler(middlewareContainer)
)

const moduleContainer = new ModuleContainer(
    new AccountModule(dtoContainer, wrapperContainer, coreContainers.serviceContainer, webManagerContainer, handlerContainer, middlewareContainer),
    new AuthModule(dtoContainer, wrapperContainer, coreContainers.serviceContainer, webManagerContainer, handlerContainer, middlewareContainer),
    new MeModule(dtoContainer, wrapperContainer, coreContainers.serviceContainer, webManagerContainer, handlerContainer, middlewareContainer),
    new UsersModule(dtoContainer, wrapperContainer,coreContainers.serviceContainer, webManagerContainer, handlerContainer, middlewareContainer)
)

export default { moduleContainer }
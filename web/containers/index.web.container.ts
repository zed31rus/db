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
import AccountModule from "#web/module/account.module";
import AuthModule from "#web/module/auth.module";
import MeModule from "#web/module/me.module";
import UsersModule from "#web/module/users.module";
import DtoContainer from "#web/containers/dto.container";
import CookieDto from "#web/dto/cookie.dto";
import fileDto from "#web/dto/file.dto";
import AccountDto from "#web/dto/account.dto";
import AuthDto from "#web/dto/auth.dto";
import MeDto from "#web/dto/me.dto";
import UsersDto from "#web/dto/users.dto";
import ValidatorWrapper from "#web/wrappers/validator.wrapper";
import WrapperContainer from "#web/containers/wrapper.container";
import RateLimiterWrapper from "#web/wrappers/rateLimiter.wrapper";

const dto = new DtoContainer(
    new CookieDto(),
    new fileDto(),
    new AccountDto(),
    new AuthDto(),
    new MeDto(),
    new UsersDto()
)

const wrappers = new WrapperContainer(
    new ValidatorWrapper(),
    new RateLimiterWrapper()
)

const webManagers = new WebManagerContainer(
    new SessionWebManager()
)

const middlewares = new MiddlewareContainer(
    new AuthMiddleware(dto),
    new FileMiddleware(dto)
)

const handlers = new HandlerContainer(
    new AuthHandler(middlewares, wrappers, dto),
    new FileHandler(middlewares, wrappers, dto)
)

const modules = new ModuleContainer(
    new AccountModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares),
    new AuthModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares),
    new MeModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares),
    new UsersModule(dto, wrappers,coreContainers.services, webManagers, handlers, middlewares)
)

export default { modules }
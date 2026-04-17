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
import OauthDto from "#web/dto/oauth.dto";
import DiscordOauthModule from "#web/module/oauth/discord.oauth.module";
import ErrorHandler from "#web/handler/error.handler";
import CorsWrapper from "#web/wrappers/cors.wrapper";
import MainServer from "#web/webServer";
import { Hono } from "hono";
import ServerContainer from "./server.container.js";

const hono = new Hono();

const dto = new DtoContainer(
    new CookieDto(),
    new fileDto(),
    new AccountDto(),
    new AuthDto(),
    new MeDto(),
    new UsersDto(),
    new OauthDto()
)

const wrappers = new WrapperContainer(
    new ValidatorWrapper(),
    new RateLimiterWrapper(),
    new CorsWrapper()
)

const webManagers = new WebManagerContainer(
    new SessionWebManager()
)

const middlewares = new MiddlewareContainer(
    new AuthMiddleware(dto),
    new FileMiddleware(dto)
)

const handlers = new HandlerContainer(
    new AuthHandler(middlewares, wrappers, dto, webManagers),
    new FileHandler(middlewares, wrappers, dto, webManagers),
    new ErrorHandler(middlewares, wrappers, dto, webManagers)
)

const modules = new ModuleContainer(
    new AccountModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares),
    new AuthModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares),
    new MeModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares),
    new UsersModule(dto, wrappers,coreContainers.services, webManagers, handlers, middlewares),
    { discord: new DiscordOauthModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares)}
)

const serverContainer = new ServerContainer(
    new MainServer(hono, webManagers, modules, handlers, wrappers)
)

export default { serverContainer }
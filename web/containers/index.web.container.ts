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
import ValidatorWrapper from "#web/wrappers/validator.wrapper";
import WrapperContainer from "#web/containers/wrapper.container";
import RateLimiterWrapper from "#web/wrappers/rateLimiter.wrapper";
import DiscordOauthModule from "#web/module/oauth/discord.oauth.module";
import ErrorHandler from "#web/handler/error.handler";
import CorsWrapper from "#web/wrappers/cors.wrapper";
import MainServer from "#web/servers/main.server";
import ServerContainer from "./server.container.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import OpenAPIContainer from "./openapi.container.js";
import AccountOpenAPI from "#web/openapi/account.openapi";
import AuthOpenAPI from "#web/openapi/auth.openapi";
import MeOpenAPI from "#web/openapi/me.openapi";
import UsersOpenAPI from "#web/openapi/users.openapi";
import DiscordOauthOpenAPI from "#web/openapi/oauth/discord.oauth.openapi";

const hono = new OpenAPIHono();

const dto = new DtoContainer(
    new CookieDto(),
    new fileDto()
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
    new AuthMiddleware(dto, wrappers, webManagers),
    new FileMiddleware(dto, wrappers, webManagers)
)

const handlers = new HandlerContainer(
    new AuthHandler(middlewares, wrappers, dto, webManagers),
    new FileHandler(middlewares, wrappers, dto, webManagers),
    new ErrorHandler(middlewares, wrappers, dto, webManagers)
)

const openapi = new OpenAPIContainer(
    new AccountOpenAPI(dto, middlewares, handlers),
    new AuthOpenAPI(dto, middlewares, handlers),
    new MeOpenAPI(dto, middlewares, handlers),
    new UsersOpenAPI(dto, middlewares, handlers),
    { discord: new DiscordOauthOpenAPI(dto, middlewares, handlers) }
)

const modules = new ModuleContainer(
    new AccountModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares, openapi),
    new AuthModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares, openapi),
    new MeModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares, openapi),
    new UsersModule(dto, wrappers,coreContainers.services, webManagers, handlers, middlewares, openapi),
    { discord: new DiscordOauthModule(dto, wrappers, coreContainers.services, webManagers, handlers, middlewares, openapi)}
)

const serverContainer = new ServerContainer(
    new MainServer(hono, webManagers, modules, handlers, wrappers)
)

export default { serverContainer }
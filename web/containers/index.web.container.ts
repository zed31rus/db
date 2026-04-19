import { OpenAPIHono } from "@hono/zod-openapi";
import DtoContainer from "#web/containers/dto.container.js";
import CookieDto from "#web/dto/cookie.dto.js";
import fileDto from "#web/dto/file.dto.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import ValidatorWrapper from "#web/wrappers/validator.wrapper.js";
import RateLimiterWrapper from "#web/wrappers/rateLimiter.wrapper.js";
import CorsWrapper from "#web/wrappers/cors.wrapper.js";
import WebManagerContainer from "#web/containers/managers.container.js";
import SessionWebManager from "#web/managers/session.webManager.js";
import MiddlewareContainer from "#web/containers/middleware.container.js";
import FileMiddleware from "#web/middleware/file.middleware.js";
import AuthMiddleware from "#web/middleware/auth.middleware.js";
import HandlerContainer from "#web/containers/handler.container.js";
import AuthHandler from "#web/handlers/auth.handler.js";
import FileHandler from "#web/handlers/file.handler.js";
import ErrorHandler from "#web/handlers/error.handler.js";
import OpenAPIContainer from "#web/containers/openapi.container.js";
import AccountOpenAPI from "#web/openapi/account.openapi.js";
import AuthOpenAPI from "#web/openapi/auth.openapi.js";
import MeOpenAPI from "#web/openapi/me.openapi.js";
import UsersOpenAPI from "#web/openapi/users.openapi.js";
import DiscordOauthOpenAPI from "#web/openapi/oauth/discord.oauth.openapi.js";
import ModuleContainer from "./module.container.js";
import AccountModule from "#web/modules/account.module.js";
import AuthModule from "#web/modules/auth.module.js";
import MeModule from "#web/modules/me.module.js";
import UsersModule from "#web/modules/users.module.js";
import DiscordOauthModule from "#web/modules/oauth/discord.oauth.module.js";
import coreContainers from '#core/containers/index.container.js'
import ServerContainer from "#web/containers/server.container.js";
import MainServer from "#web/servers/main.server.js";

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
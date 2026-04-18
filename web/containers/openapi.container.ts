import AccountOpenAPI from "#web/openapi/account.openapi";
import AuthOpenAPI from "#web/openapi/auth.openapi";
import MeOpenAPI from "#web/openapi/me.openapi";
import DiscordOauthOpenAPI from "#web/openapi/oauth/discord.oauth.openapi";
import UsersOpenAPI from "#web/openapi/users.openapi";

export default class OpenAPIContainer {
    constructor(
        readonly account: AccountOpenAPI,
        readonly auth: AuthOpenAPI,
        readonly me: MeOpenAPI,
        readonly users: UsersOpenAPI,
        readonly oauth: {
            discord: DiscordOauthOpenAPI
        }
    ) {}
}
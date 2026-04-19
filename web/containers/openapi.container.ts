import AccountOpenAPI from "#web/openapi/account.openapi.js";
import AuthOpenAPI from "#web/openapi/auth.openapi.js";
import MeOpenAPI from "#web/openapi/me.openapi.js";
import DiscordOauthOpenAPI from "#web/openapi/oauth/discord.oauth.openapi.js";
import UsersOpenAPI from "#web/openapi/users.openapi.js";

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
import AccountModule from "#web/module/account.module";
import AuthModule from "#web/module/auth.module";
import MeModule from "#web/module/me.module";
import DiscordOauthModule from "#web/module/oauth/discord.oauth.module";
import UsersModule from "#web/module/users.module";

export default class ModuleContainer {
    constructor(
        readonly account: AccountModule,
        readonly auth: AuthModule,
        readonly me: MeModule,
        readonly users: UsersModule,
        readonly oauth: {
            discord: DiscordOauthModule
        }
    ) {}
}
import AccountModule from "#web/features/account/account.module";
import AuthModule from "#web/features/auth/auth.module";
import MeModule from "#web/features/me/me.module";
import UsersModule from "#web/features/users/users.module";

export default class ModuleContainer {
    constructor(
        readonly account: AccountModule,
        readonly auth: AuthModule,
        readonly me: MeModule,
        readonly users: UsersModule
    ) {}
}
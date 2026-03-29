import AccountService from "#services/account";
import AuthService from "#services/auth";
import MeService from "#services/me";
import UsersService from "#services/users";

export default class ServiceContainer {

    constructor(
        readonly account: AccountService,
        readonly auth: AuthService,
        readonly me: MeService,
        readonly users: UsersService
    ) {}

}
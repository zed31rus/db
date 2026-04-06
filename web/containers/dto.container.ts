import CookieDto from "#web/dto/cookie.dto";
import fileDto from "#web/dto/file.dto";
import AccountDto from "#web/features/account/account.dto";
import AuthDto from "#web/features/auth/auth.dto";
import MeDto from "#web/features/me/me.dto";
import UsersDto from "#web/features/users/users.dto";

export default class DtoContainer {
    constructor(
        readonly cookie: CookieDto,
        readonly file: fileDto,
        readonly account: AccountDto,
        readonly auth: AuthDto,
        readonly me: MeDto,
        readonly users: UsersDto
    ) {}
}
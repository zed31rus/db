import CookieDto from "#web/dto/cookie.dto";
import fileDto from "#web/dto/file.dto";
import AccountDto from "#web/dto/account.dto";
import AuthDto from "#web/dto/auth.dto";
import MeDto from "#web/dto/me.dto";
import UsersDto from "#web/dto/users.dto";

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
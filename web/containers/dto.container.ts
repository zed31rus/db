import CookieDto from "#web/dto/cookie.dto";
import fileDto from "#web/dto/file.dto";

export default class DtoContainer {
    constructor(
        readonly cookie: CookieDto,
        readonly file: fileDto,
    ) {}
}
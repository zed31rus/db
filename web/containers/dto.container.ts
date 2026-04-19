import CookieDto from "#web/dto/cookie.dto.js";
import fileDto from "#web/dto/file.dto.js";

export default class DtoContainer {
    constructor(
        readonly cookie: CookieDto,
        readonly file: fileDto,
    ) {}
}
import Hash from "#core/lib/hash/hash.lib.js";
import JWT from "#core/lib/jwt/jwt.lib.js";
import Mail from "#core/lib/mail/mail.lib.js";
import RefreshToken from "#core/lib/refreshToken/refreshToken.lib.js";
import UserSelector from "#core/lib/selector/user.selector.js";
import VerificationCode from "#core/lib/verificationCode/verificationCode.lib.js";

export default class LibContainer {
    constructor(
        readonly hash: Hash,
        readonly jwt: JWT,
        readonly mail: Mail,
        readonly refreshToken: RefreshToken,
        readonly userSelector: UserSelector,
        readonly verificationCode:VerificationCode
    ){}
}
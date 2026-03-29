import Hash from "#lib/hash/hash.lib";
import JWT from "#lib/jwt/jwt.lib";
import Mail from "#lib/mail/mail.lib";
import RefreshToken from "#lib/refreshToken/refreshToken.lib";
import UserSelector from "#lib/selector/user.selector";
import VerificationCode from "#lib/verificationCode/verificationCode.lib";

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
import Hash from "#lib/hash/hash.lib"
import JWT from "#lib/jwt/jwt.lib"
import Mail from "#lib/mail/mail.lib"
import RefreshToken from "#lib/refreshToken/refreshToken.lib"
import UserSelector from "#lib/selector/user.selector"
import VerificationCode from "#lib/verificationCode/verificationCode.lib"

const LibContainer = {
    hash: new Hash(),
    jwt: new JWT(),
    mail: new Mail({
        user: process.env.SMTP_USER!,
        key: process.env.SMTP_API_KEY!,
        host: process.env.SMTP_HOST!,
        email: process.env.SMTP_EMAIL!,
        name: "zed31rus.ru Auth Service"
    }),
    refreshToken: new RefreshToken(),
    userSelector: new UserSelector(),
    verificationCode: new VerificationCode()
};

export type LibContainer = typeof LibContainer;
export default LibContainer;
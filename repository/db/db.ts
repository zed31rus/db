import verificationCode from "./verificationCode/verificationCode.class";
import users from "./user/user.class";
import refreshToken from "./refreshToken/refreshToken.class";
import oauthAccount from "./oauth/oauth.class";

const db = {
    users: users,
    refreshToken: refreshToken,
    oauthAccount: oauthAccount,
    verificationCode: verificationCode
}

export default db;
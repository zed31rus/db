import verificationCode from "#repo/db/verificationCode/verificationCode.class";
import users from "#repo/db/user/user.class";
import refreshToken from "#repo/db/refreshToken/refreshToken.class";
import oauthAccount from "#repo/db/oauth/oauth.class";
import BaseRepository from "#base/repository.base";

export default class DB extends BaseRepository {
    users = new users();
    refreshToken = new refreshToken();
    oauthAccount = new oauthAccount();
    verificationCode = new verificationCode();
}
import verificationCode from "./verificationCode/verificationCode.class";
import users from "./user/user.class";
import refreshToken from "./refreshToken/refreshToken.class";
import oauthAccount from "./oauth/oauth.class";
import BaseRepository from "#base/repository.base";

export default class DB extends BaseRepository {
    users = new users();
    refreshToken = new refreshToken();
    oauthAccount = new oauthAccount();
    verificationCode = new verificationCode();
}
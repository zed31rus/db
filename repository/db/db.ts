import verificationCode from "./verificationCode/verificationCode.class.js";
import users from "./user/user.class.js";
import refreshToken from "./refreshToken/refreshToken.class.js";
import oauthAccount from "./oauth/oauth.class.js";
import BaseRepository from "#base/repository.base";

export default class DB extends BaseRepository {
    users = new users();
    refreshToken = new refreshToken();
    oauthAccount = new oauthAccount();
    verificationCode = new verificationCode();
}
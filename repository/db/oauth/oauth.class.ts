import GetOauthAccount from "./classes/getOauthAccount.js";
import CreateOauthAccount from "./classes/createOauthAccount.js";
import UpdateOauthAccount from "./classes/updateOauthAccount.js";

export default class oauthAccount {
    get = new GetOauthAccount();
    create = new CreateOauthAccount();
    update = new UpdateOauthAccount();
}
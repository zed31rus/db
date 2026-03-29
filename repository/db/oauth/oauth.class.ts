import GetOauthAccount from "./classes/getOauthAccount";
import CreateOauthAccount from "./classes/createOauthAccount";
import UpdateOauthAccount from "./classes/updateOauthAccount";

export default class oauthAccount {
    get = new GetOauthAccount();
    create = new CreateOauthAccount();
    update = new UpdateOauthAccount();
}
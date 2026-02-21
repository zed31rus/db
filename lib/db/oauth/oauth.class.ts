import GetOauthAccount from "./classes/getOauthAccount";
import CreateOauthAccount from "./classes/createOauthAccount";
import UpdateOauthAccount from "./classes/updateOauthAccount";

const oauthAccount = {
    get: GetOauthAccount,
    create: CreateOauthAccount,
    update: UpdateOauthAccount
}

export default oauthAccount
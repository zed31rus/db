import OtpManager from "#managers/account/otp.manager";
import SessionManager from "#managers/auth/session.manager";
import DiscordOauthManager from "#managers/oauth/discord.oauth.manager";

export default class ManagerContainer {
    constructor(
        readonly otp: OtpManager,
        readonly session: SessionManager,
        readonly oauth: {
            readonly discord: DiscordOauthManager
        }
    ) {}
}
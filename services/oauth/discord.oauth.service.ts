import BaseService from "#base/service.base";
import { PublicUser } from "#lib/selector/user.selector";

export default class DiscordOauthService extends BaseService {

    async callback(code: string, user: PublicUser | null) {
        const exchangeReply = await this.infra.oauth.discord.exchangeCode(code);
        const tokenReply = await this.infra.oauth.discord.token(exchangeReply.refresh_token);
        const meRes = await this.infra.oauth.discord.me(tokenReply.access_token)
        return { meRes }
    }

}
import BaseService from "#base/service.base";

export default class DiscordOauthService extends BaseService {

    async callback(code: string) {
        return this.manager.oauth.discord.exchangeCode(code);
    }

}
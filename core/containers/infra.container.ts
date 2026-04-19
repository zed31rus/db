import DiscordOauthInfra from "#core/infra/discord/oauth.discord.infra.js";

export default class InfraContainer {
    constructor(
        readonly oauth: {
            readonly discord: DiscordOauthInfra
        }
    ) {}
}